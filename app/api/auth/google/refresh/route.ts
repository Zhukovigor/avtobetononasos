import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

// Обновление токена доступа
export async function POST() {
  try {
    console.log("🔄 Запрос на обновление токена")

    const cookieStore = cookies()
    const refreshToken = cookieStore.get("google_refresh_token")?.value

    if (!refreshToken) {
      console.error("❌ Отсутствует refresh token")
      return NextResponse.json(
        {
          success: false,
          error: "Отсутствует refresh token",
        },
        { status: 400 },
      )
    }

    // Получаем переменные окружения
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      console.error("❌ Отсутствуют переменные окружения")
      return NextResponse.json(
        {
          success: false,
          error: "Отсутствуют необходимые переменные окружения",
        },
        { status: 500 },
      )
    }

    // Запрос на обновление токена
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error("❌ Ошибка обновления токена:", errorData)
      return NextResponse.json(
        {
          success: false,
          error: `Ошибка обновления токена: ${errorData}`,
        },
        { status: tokenResponse.status },
      )
    }

    const tokenData = await tokenResponse.json()
    console.log("✅ Токен успешно обновлен")

    // Обновляем access_token в cookies
    cookieStore.set("google_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: tokenData.expires_in,
      path: "/",
    })

    // Обновляем информацию о сессии
    const sessionInfoCookie = cookieStore.get("google_session_info")?.value
    if (sessionInfoCookie) {
      try {
        const sessionInfo = JSON.parse(sessionInfoCookie)
        cookieStore.set(
          "google_session_info",
          JSON.stringify({
            ...sessionInfo,
            expiresAt: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
            lastRefresh: new Date().toISOString(),
          }),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60, // 30 дней
            path: "/",
          },
        )
      } catch (e) {
        console.error("❌ Ошибка обновления информации о сессии:", e)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Токен успешно обновлен",
      expiresIn: tokenData.expires_in,
    })
  } catch (error) {
    console.error("❌ Ошибка обновления токена:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Ошибка обновления токена",
        message: error instanceof Error ? error.message : "Неизвестная ошибка",
      },
      { status: 500 },
    )
  }
}
