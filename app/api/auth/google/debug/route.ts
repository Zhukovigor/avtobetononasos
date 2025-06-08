import { NextResponse } from "next/server"
import { headers } from "next/headers"

// API для отладки проблем с Google OAuth
export async function GET(request: Request) {
  try {
    const headersList = headers()
    const host = headersList.get("host") || "localhost:3000"
    const protocol = host.includes("localhost") ? "http" : "https"
    const autoRedirectUri = `${protocol}://${host}/api/auth/google/callback`

    // Проверка переменных окружения
    const envVars = {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "не установлен",
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? "[скрыто]" : "не установлен",
      GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI || "не установлен",
      AUTO_REDIRECT_URI: autoRedirectUri,
      NODE_ENV: process.env.NODE_ENV || "не установлен",
    }

    // Генерация тестового URL для авторизации
    let testAuthUrl = "не удалось сгенерировать"

    if (process.env.GOOGLE_CLIENT_ID) {
      const redirectUri = process.env.GOOGLE_REDIRECT_URI || autoRedirectUri

      const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "https://www.googleapis.com/auth/webmasters.readonly",
        access_type: "offline",
        prompt: "consent",
        state: "debug-test",
      })

      testAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
    }

    // Проверка доступности Google API
    let googleApiStatus = "проверка..."
    try {
      const response = await fetch("https://accounts.google.com/o/oauth2/v2/auth", { method: "HEAD" })
      googleApiStatus = response.ok ? "доступен" : `недоступен (статус: ${response.status})`
    } catch (error) {
      googleApiStatus = `ошибка: ${error instanceof Error ? error.message : "неизвестная ошибка"}`
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environment: envVars,
      googleApiStatus,
      testAuthUrl,
      headers: {
        host,
        userAgent: headersList.get("user-agent") || "не указан",
        referer: headersList.get("referer") || "не указан",
      },
      instructions: [
        "1. Убедитесь, что GOOGLE_CLIENT_ID установлен",
        "2. Проверьте, что GOOGLE_REDIRECT_URI указан правильно",
        "3. Убедитесь, что redirect URI добавлен в Google Cloud Console",
        "4. Проверьте, что Google API доступен",
        "5. Попробуйте использовать тестовый URL для авторизации",
      ],
    })
  } catch (error) {
    return NextResponse.json({
      error: "Ошибка при отладке",
      details: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
