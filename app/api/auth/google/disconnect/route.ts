import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// API для отключения от Google Search Console
export async function POST() {
  try {
    const cookieStore = cookies()
    const accessToken = cookieStore.get("google_access_token")?.value

    // Отзываем токен в Google (опционально)
    if (accessToken) {
      try {
        await fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
          method: "POST",
        })
      } catch (error) {
        console.log("Не удалось отозвать токен в Google:", error)
      }
    }

    // Удаляем все cookies
    cookieStore.delete("google_access_token")
    cookieStore.delete("google_refresh_token")
    cookieStore.delete("google_user_info")

    return NextResponse.json({
      success: true,
      message: "Успешно отключено от Google Search Console",
    })
  } catch (error) {
    console.error("Ошибка отключения:", error)
    return NextResponse.json({ error: "Ошибка при отключении от Google Search Console" }, { status: 500 })
  }
}
