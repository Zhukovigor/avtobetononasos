import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

// Проверка статуса подключения к Google
export async function GET() {
  try {
    console.log("📊 Проверка статуса Google OAuth")

    const cookieStore = cookies()
    const accessToken = cookieStore.get("google_access_token")?.value
    const refreshToken = cookieStore.get("google_refresh_token")?.value
    const userInfoCookie = cookieStore.get("google_user_info")?.value
    const sessionInfoCookie = cookieStore.get("google_session_info")?.value

    // Проверяем наличие всех необходимых cookies
    if (!accessToken || !userInfoCookie || !sessionInfoCookie) {
      console.log("❌ Отсутствуют необходимые cookies")
      return NextResponse.json({
        connected: false,
        message: "Нет активного подключения к Google",
        debug: {
          hasAccessToken: !!accessToken,
          hasRefreshToken: !!refreshToken,
          hasUserInfo: !!userInfoCookie,
        },
      })
    }

    // Парсим информацию о пользователе и сессии
    let userInfo
    let sessionInfo

    try {
      userInfo = JSON.parse(userInfoCookie)
      sessionInfo = JSON.parse(sessionInfoCookie)
    } catch (e) {
      console.error("❌ Ошибка парсинга cookies:", e)
      return NextResponse.json({
        connected: false,
        error: "Ошибка парсинга данных сессии",
        debug: {
          hasAccessToken: !!accessToken,
          hasRefreshToken: !!refreshToken,
          hasUserInfo: !!userInfoCookie,
        },
      })
    }

    // Проверяем валидность токена
    let tokenValid = false
    let tokenStatus = null

    try {
      const tokenCheckResponse = await fetch("https://www.googleapis.com/oauth2/v1/tokeninfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      tokenStatus = tokenCheckResponse.status
      tokenValid = tokenCheckResponse.ok

      if (!tokenValid && refreshToken) {
        console.log("🔄 Токен недействителен, но есть refresh token")
        // Здесь можно добавить автоматическое обновление токена
      }
    } catch (e) {
      console.error("❌ Ошибка проверки токена:", e)
    }

    // Вычисляем время до истечения токена
    const now = new Date()
    const expiresAt = new Date(sessionInfo.expiresAt)
    const isExpired = now > expiresAt
    const timeToExpiry = Math.max(0, expiresAt.getTime() - now.getTime())

    console.log("✅ Статус подключения получен")

    return NextResponse.json({
      connected: true,
      user: userInfo,
      session: {
        ...sessionInfo,
        isExpired,
        timeToExpiry,
      },
      debug: {
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken,
        hasUserInfo: !!userInfoCookie,
        tokenValid,
        tokenStatus,
      },
    })
  } catch (error) {
    console.error("❌ Ошибка проверки статуса:", error)
    return NextResponse.json({
      connected: false,
      error: "Ошибка проверки статуса подключения",
      message: error instanceof Error ? error.message : "Неизвестная ошибка",
    })
  }
}
