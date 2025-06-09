import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

// Отключение Google интеграции
export async function POST() {
  try {
    console.log("🔌 Запрос на отключение Google интеграции")

    const cookieStore = cookies()
    const accessToken = cookieStore.get("google_access_token")?.value

    // Если есть активный токен, отзываем его
    if (accessToken) {
      try {
        console.log("🔄 Отзыв токена доступа")
        await fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
      } catch (e) {
        console.error("⚠️ Ошибка отзыва токена:", e)
        // Продолжаем выполнение даже при ошибке отзыва
      }
    }

    // Удаляем все cookies связанные с Google
    console.log("🗑️ Удаление cookies")
    cookieStore.delete("google_access_token")
    cookieStore.delete("google_refresh_token")
    cookieStore.delete("google_user_info")
    cookieStore.delete("google_session_info")

    console.log("✅ Google интеграция успешно отключена")

    return NextResponse.json({
      success: true,
      message: "Google интеграция успешно отключена",
    })
  } catch (error) {
    console.error("❌ Ошибка отключения Google интеграции:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Ошибка отключения Google интеграции",
        message: error instanceof Error ? error.message : "Неизвестная ошибка",
      },
      { status: 500 },
    )
  }
}
