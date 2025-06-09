import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// API для обновления access token с помощью refresh token
export async function POST() {
  try {
    const cookieStore = cookies()
    const refreshToken = cookieStore.get("google_refresh_token")?.value

    if (!refreshToken) {
      return NextResponse.json({ error: "Refresh token не найден. Необходима повторная авторизация." }, { status: 401 })
    }

    // Обновляем access token
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`Ошибка обновления токена: ${errorData}`)
    }

    const tokens = await response.json()

    // Сохраняем новый access token
    cookieStore.set("google_access_token", tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: tokens.expires_in || 3600,
      path: "/",
    })

    return NextResponse.json({
      success: true,
      message: "Токен успешно обновлен",
      expires_in: tokens.expires_in,
    })
  } catch (error) {
    console.error("Ошибка обновления токена:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Ошибка обновления токена" },
      { status: 500 },
    )
  }
}
