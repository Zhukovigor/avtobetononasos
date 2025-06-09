import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// API для проверки статуса подключения к Google
export async function GET() {
  try {
    const cookieStore = cookies()
    const accessToken = cookieStore.get("google_access_token")?.value
    const userInfoCookie = cookieStore.get("google_user_info")?.value

    if (!accessToken) {
      return NextResponse.json({
        connected: false,
        message: "Google Search Console не подключен",
        userInfo: null,
      })
    }

    // Проверяем валидность токена
    const response = await fetch("https://www.googleapis.com/oauth2/v1/tokeninfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      // Токен недействителен
      return NextResponse.json({
        connected: false,
        message: "Токен доступа истек. Необходимо обновить подключение.",
        userInfo: null,
      })
    }

    const tokenInfo = await response.json()
    const userInfo = userInfoCookie ? JSON.parse(userInfoCookie) : null

    return NextResponse.json({
      connected: true,
      message: "Google Search Console успешно подключен",
      userInfo,
      tokenInfo: {
        scope: tokenInfo.scope,
        expires_in: tokenInfo.expires_in,
      },
    })
  } catch (error) {
    console.error("Ошибка проверки статуса:", error)
    return NextResponse.json({
      connected: false,
      message: "Ошибка проверки статуса подключения",
      userInfo: null,
    })
  }
}
