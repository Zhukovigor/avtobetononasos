import { NextResponse } from "next/server"
import { headers } from "next/headers"

// Инициация OAuth 2.0 авторизации с Google
export async function GET(request: Request) {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID
    let redirectUri = process.env.GOOGLE_REDIRECT_URI

    // Автоматическое определение redirect URI если не установлен
    if (!redirectUri) {
      const headersList = headers()
      const host = headersList.get("host") || "localhost:3000"
      const protocol = host.includes("localhost") ? "http" : "https"
      redirectUri = `${protocol}://${host}/api/auth/google/callback`

      console.log("🔧 Автоматически определен redirect URI:", redirectUri)
    }

    console.log("🔍 Проверка переменных окружения:")
    console.log("GOOGLE_CLIENT_ID:", clientId ? "✅ Установлен" : "❌ Отсутствует")
    console.log("GOOGLE_REDIRECT_URI:", redirectUri ? "✅ Установлен" : "❌ Отсутствует")
    console.log("Используемый redirect URI:", redirectUri)

    if (!clientId) {
      return NextResponse.json(
        {
          error: "GOOGLE_CLIENT_ID не установлен в переменных окружения",
          details: "Добавьте GOOGLE_CLIENT_ID в файл .env.local",
          help: "Получите Client ID в Google Cloud Console → APIs & Services → Credentials",
        },
        { status: 500 },
      )
    }

    // Параметры для авторизации Google Search Console
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope:
        "https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
      access_type: "offline",
      prompt: "consent",
      state: "seo-monitor", // Для безопасности
    })

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`

    console.log("🚀 Перенаправление на:", authUrl)

    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error("❌ Ошибка в API route /api/auth/google:", error)

    // Подробная информация об ошибке
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const errorStack = error instanceof Error ? error.stack : "No stack trace"

    return NextResponse.json(
      {
        error: "Ошибка при инициализации OAuth авторизации",
        details: errorMessage,
        stack: errorStack,
        env: {
          clientIdExists: !!process.env.GOOGLE_CLIENT_ID,
          redirectUriExists: !!process.env.GOOGLE_REDIRECT_URI,
          nodeEnv: process.env.NODE_ENV,
        },
      },
      { status: 500 },
    )
  }
}
