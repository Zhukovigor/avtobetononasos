import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

// Автоматическое обновление токенов
export async function POST() {
  try {
    const cookieStore = cookies()
    const refreshToken = cookieStore.get("google_refresh_token")?.value
    const sessionMeta = cookieStore.get("oauth_session_meta")?.value

    if (!refreshToken) {
      return NextResponse.json(
        {
          error: "Refresh token не найден",
          action: "reauth_required",
        },
        { status: 401 },
      )
    }

    console.log("🔄 Обновление Google Access Token")

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("❌ Ошибка обновления токена:", errorData)

      // Если refresh token недействителен, требуется повторная авторизация
      if (response.status === 400) {
        // Очищаем все токены
        cookieStore.delete("google_access_token")
        cookieStore.delete("google_refresh_token")
        cookieStore.delete("google_user_info")
        cookieStore.delete("oauth_session_meta")

        return NextResponse.json(
          {
            error: "Refresh token недействителен",
            action: "reauth_required",
          },
          { status: 401 },
        )
      }

      return NextResponse.json(
        {
          error: "Ошибка обновления токена",
          details: errorData,
        },
        { status: 500 },
      )
    }

    const tokens = await response.json()
    const isProduction = process.env.NODE_ENV === "production"

    // Сохраняем новый access token
    cookieStore.set("google_access_token", tokens.access_token, {
      httpOnly: true,
      secure: isProduction,
      maxAge: tokens.expires_in || 3600,
      path: "/",
      sameSite: "lax",
    })

    // Обновляем метаданные сессии
    const currentMeta = sessionMeta ? JSON.parse(sessionMeta) : {}
    cookieStore.set(
      "oauth_session_meta",
      JSON.stringify({
        ...currentMeta,
        lastRefresh: new Date().toISOString(),
        expiresAt: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
      }),
      {
        httpOnly: true,
        secure: isProduction,
        maxAge: 60 * 60 * 24,
        path: "/",
        sameSite: "lax",
      },
    )

    console.log("✅ Access token успешно обновлен")

    return NextResponse.json({
      success: true,
      message: "Токен обновлен",
      expires_in: tokens.expires_in,
      refreshed_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Ошибка обновления токена:", error)
    return NextResponse.json(
      {
        error: "Критическая ошибка обновления токена",
        details: error instanceof Error ? error.message : "Неизвестная ошибка",
      },
      { status: 500 },
    )
  }
}

// Проверка статуса токена
export async function GET() {
  try {
    const cookieStore = cookies()
    const accessToken = cookieStore.get("google_access_token")?.value
    const sessionMeta = cookieStore.get("oauth_session_meta")?.value
    const userInfo = cookieStore.get("google_user_info")?.value

    if (!accessToken) {
      return NextResponse.json({
        connected: false,
        message: "Токен доступа отсутствует",
      })
    }

    const meta = sessionMeta ? JSON.parse(sessionMeta) : {}
    const user = userInfo ? JSON.parse(userInfo) : null

    // Проверяем, не истек ли токен
    const expiresAt = meta.expiresAt ? new Date(meta.expiresAt) : null
    const isExpired = expiresAt ? expiresAt.getTime() < Date.now() : false

    return NextResponse.json({
      connected: true,
      user,
      session: {
        ...meta,
        isExpired,
        timeToExpiry: expiresAt ? Math.max(0, expiresAt.getTime() - Date.now()) : 0,
      },
    })
  } catch (error) {
    console.error("❌ Ошибка проверки статуса:", error)
    return NextResponse.json(
      {
        connected: false,
        error: "Ошибка проверки статуса",
      },
      { status: 500 },
    )
  }
}
