import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

// Улучшенный callback с детальной диагностикой
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const error = searchParams.get("error")

    console.log("📥 Google OAuth Callback Enhanced")
    console.log("Code:", code ? "✅ Получен" : "❌ Отсутствует")
    console.log("State:", state ? "✅ Получен" : "❌ Отсутствует")
    console.log("Error:", error || "Нет")

    if (error) {
      console.error("❌ OAuth Error:", error)
      return NextResponse.redirect(
        `${getBaseUrl(request)}/admin?error=oauth_failed&message=${encodeURIComponent(error)}`,
      )
    }

    if (!code) {
      console.error("❌ Код авторизации не получен")
      return NextResponse.redirect(`${getBaseUrl(request)}/admin?error=no_code&message=Код авторизации не получен`)
    }

    // Валидация state
    let stateData = null
    try {
      stateData = JSON.parse(state || "{}")
      if (!stateData.timestamp || Date.now() - stateData.timestamp > 600000) {
        throw new Error("State expired")
      }
    } catch {
      console.error("❌ Недействительный state параметр")
      return NextResponse.redirect(
        `${getBaseUrl(request)}/admin?error=invalid_state&message=Недействительный state параметр`,
      )
    }

    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${getBaseUrl(request)}/api/auth/google/callback-enhanced`

    if (!clientId || !clientSecret) {
      console.error("❌ Google credentials не настроены")
      return NextResponse.redirect(
        `${getBaseUrl(request)}/admin?error=config_missing&message=Google credentials не настроены`,
      )
    }

    console.log("🔄 Обмен кода на токены...")

    // Обмен кода на токены
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error("❌ Token Exchange Error:", errorData)
      return NextResponse.redirect(
        `${getBaseUrl(request)}/admin?error=token_exchange&message=${encodeURIComponent(
          `Ошибка обмена токенов: ${errorData}`,
        )}`,
      )
    }

    const tokens = await tokenResponse.json()
    console.log("✅ Токены получены успешно")
    console.log("Access Token:", tokens.access_token ? "✅ Получен" : "❌ Отсутствует")
    console.log("Refresh Token:", tokens.refresh_token ? "✅ Получен" : "❌ Отсутствует")
    console.log("Expires in:", tokens.expires_in, "секунд")

    // Получение информации о пользователе
    console.log("👤 Получение информации о пользователе...")
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    })

    let userInfo = null
    if (userResponse.ok) {
      userInfo = await userResponse.json()
      console.log("✅ Информация о пользователе получена:", userInfo.email)
    } else {
      console.warn("⚠️ Не удалось получить информацию о пользователе")
    }

    // Сохранение токенов с улучшенной безопасностью
    console.log("💾 Сохранение токенов в cookies...")
    const cookieStore = cookies()
    const isProduction = process.env.NODE_ENV === "production"

    // Access Token
    cookieStore.set("google_access_token", tokens.access_token, {
      httpOnly: true,
      secure: isProduction,
      maxAge: tokens.expires_in || 3600,
      path: "/",
      sameSite: "lax",
    })

    // Refresh Token
    if (tokens.refresh_token) {
      cookieStore.set("google_refresh_token", tokens.refresh_token, {
        httpOnly: true,
        secure: isProduction,
        maxAge: 60 * 60 * 24 * 30, // 30 дней
        path: "/",
        sameSite: "lax",
      })
      console.log("✅ Refresh token сохранен")
    } else {
      console.warn("⚠️ Refresh token не получен")
    }

    // User Info
    if (userInfo) {
      cookieStore.set("google_user_info", JSON.stringify(userInfo), {
        httpOnly: true,
        secure: isProduction,
        maxAge: 60 * 60 * 24, // 24 часа
        path: "/",
        sameSite: "lax",
      })
      console.log("✅ Информация о пользователе сохранена")
    }

    // Метаданные сессии
    const sessionMeta = {
      connectedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
      scopes: tokens.scope?.split(" ") || [],
      version: "2.0",
    }

    cookieStore.set("oauth_session_meta", JSON.stringify(sessionMeta), {
      httpOnly: true,
      secure: isProduction,
      maxAge: 60 * 60 * 24,
      path: "/",
      sameSite: "lax",
    })

    console.log("✅ OAuth успешно завершен")

    const returnUrl = stateData.returnUrl || "/admin"
    return NextResponse.redirect(
      `${getBaseUrl(request)}${returnUrl}?success=oauth_connected&user=${encodeURIComponent(userInfo?.email || "unknown")}`,
    )
  } catch (error) {
    console.error("❌ Критическая ошибка OAuth:", error)
    return NextResponse.redirect(
      `${getBaseUrl(request)}/admin?error=oauth_critical&message=${encodeURIComponent(
        error instanceof Error ? error.message : "Критическая ошибка",
      )}`,
    )
  }
}

function getBaseUrl(request: Request): string {
  const url = new URL(request.url)
  return `${url.protocol}//${url.host}`
}
