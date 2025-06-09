import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// Инициация OAuth процесса
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const returnUrl = searchParams.get("return") || "/admin"

    console.log("🚀 Инициация Google OAuth")

    const clientId = process.env.GOOGLE_CLIENT_ID
    // Используем существующий callback URL из переменных окружения
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${getBaseUrl(request)}/api/auth/google/callback`

    if (!clientId) {
      console.error("❌ GOOGLE_CLIENT_ID не настроен")
      return NextResponse.redirect(
        `${getBaseUrl(request)}/admin?error=config_missing&message=${encodeURIComponent(
          "GOOGLE_CLIENT_ID не настроен в переменных окружения",
        )}`,
      )
    }

    // Создаем state для безопасности
    const state = JSON.stringify({
      timestamp: Date.now(),
      returnUrl,
      nonce: Math.random().toString(36).substring(7),
    })

    // Формируем URL для авторизации
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth")
    authUrl.searchParams.set("client_id", clientId)
    authUrl.searchParams.set("redirect_uri", redirectUri)
    authUrl.searchParams.set("response_type", "code")
    authUrl.searchParams.set(
      "scope",
      [
        "https://www.googleapis.com/auth/webmasters.readonly",
        "https://www.googleapis.com/auth/analytics.readonly",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ].join(" "),
    )
    authUrl.searchParams.set("state", state)
    authUrl.searchParams.set("access_type", "offline")
    authUrl.searchParams.set("prompt", "consent")

    console.log("✅ Перенаправление на Google OAuth:", authUrl.toString())
    console.log("🔗 Redirect URI:", redirectUri)

    return NextResponse.redirect(authUrl.toString())
  } catch (error) {
    console.error("❌ Ошибка инициации OAuth:", error)
    return NextResponse.redirect(
      `${getBaseUrl(request)}/admin?error=oauth_init&message=${encodeURIComponent(
        error instanceof Error ? error.message : "Ошибка инициации OAuth",
      )}`,
    )
  }
}

function getBaseUrl(request: Request): string {
  const url = new URL(request.url)
  return `${url.protocol}//${url.host}`
}
