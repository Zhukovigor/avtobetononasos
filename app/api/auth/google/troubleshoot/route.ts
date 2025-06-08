import { NextResponse } from "next/server"
import { headers } from "next/headers"

// API для диагностики проблем с fetch
export async function GET(request: Request) {
  const headersList = headers()
  const userAgent = headersList.get("user-agent") || "Unknown"
  const host = headersList.get("host") || "Unknown"
  const referer = headersList.get("referer") || "Unknown"
  const origin = headersList.get("origin") || "Unknown"
  const acceptHeader = headersList.get("accept") || "Unknown"
  const contentType = headersList.get("content-type") || "Unknown"

  // Проверка переменных окружения
  const envVars = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? "✅ Установлен" : "❌ Отсутствует",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? "✅ Установлен" : "❌ Отсутствует",
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI ? "✅ Установлен" : "❌ Отсутствует",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "✅ Установлен" : "❌ Отсутствует",
  }

  // Проверка CORS
  const corsStatus = {
    origin: origin !== "Unknown" ? "✅ Origin заголовок присутствует" : "❌ Origin заголовок отсутствует",
    referer: referer !== "Unknown" ? "✅ Referer заголовок присутствует" : "❌ Referer заголовок отсутствует",
  }

  // Проверка сетевого подключения
  let networkStatus = "Проверка..."
  try {
    const googleResponse = await fetch("https://www.google.com", { method: "HEAD" })
    networkStatus = googleResponse.ok
      ? "✅ Сетевое подключение работает (Google доступен)"
      : "❌ Проблемы с сетевым подключением (Google недоступен)"
  } catch (error) {
    networkStatus = `❌ Ошибка сетевого подключения: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`
  }

  // Рекомендации по устранению проблем
  const recommendations = [
    "Отключите блокировщики рекламы и CORS-расширения",
    "Попробуйте использовать режим инкогнито или другой браузер",
    "Проверьте сетевое подключение",
    "Убедитесь, что все переменные окружения настроены правильно",
    "Проверьте настройки OAuth в Google Cloud Console",
  ]

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    headers: {
      userAgent,
      host,
      referer,
      origin,
      accept: acceptHeader,
      contentType,
    },
    environment: envVars,
    cors: corsStatus,
    network: networkStatus,
    recommendations,
    directAuthUrl: "/api/auth/google/direct",
  })
}
