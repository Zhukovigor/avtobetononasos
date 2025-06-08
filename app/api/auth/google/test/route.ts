import { NextResponse } from "next/server"
import { headers } from "next/headers"

// API для тестирования настроек OAuth
export async function GET() {
  const headersList = headers()
  const host = headersList.get("host") || "localhost:3000"
  const protocol = host.includes("localhost") ? "http" : "https"
  const autoRedirectUri = `${protocol}://${host}/api/auth/google/callback`

  const requiredVars = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  }

  const results = Object.entries(requiredVars).map(([key, value]) => ({
    variable: key,
    status: value ? "✅ Установлена" : "❌ Отсутствует",
    value: value ? (key.includes("SECRET") ? "***скрыто***" : `${value.substring(0, 30)}...`) : "Не установлена",
  }))

  const allConfigured = Object.values(requiredVars).every(Boolean)

  return NextResponse.json({
    configured: allConfigured,
    message: allConfigured
      ? "Все переменные окружения настроены правильно"
      : "Некоторые переменные окружения отсутствуют",
    variables: results,
    environment: {
      host,
      protocol,
      autoRedirectUri,
      currentRedirectUri: process.env.GOOGLE_REDIRECT_URI,
    },
    instructions: {
      step1: "Создайте проект в Google Cloud Console",
      step2: "Включите Google Search Console API",
      step3: "Создайте OAuth 2.0 Client ID",
      step4: `Добавьте redirect URI: ${autoRedirectUri}`,
      step5: "Скопируйте Client ID и Client Secret в .env.local",
      step6: "Перезапустите сервер разработки",
    },
    envExample: `# Добавьте в .env.local:
GOOGLE_CLIENT_ID=ваш-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=ваш-client-secret
GOOGLE_REDIRECT_URI=${autoRedirectUri}
NEXTAUTH_SECRET=ваш-секретный-ключ-для-jwt`,
  })
}
