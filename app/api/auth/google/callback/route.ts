import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Обработка callback от Google OAuth
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const error = searchParams.get("error")

    console.log("📥 Получен callback от Google OAuth")
    console.log("Code:", code ? "✅ Получен" : "❌ Отсутствует")
    console.log("State:", state)
    console.log("Error:", error || "Нет ошибок")

    // Проверка на ошибки авторизации
    if (error) {
      console.error("❌ Ошибка авторизации Google:", error)
      return NextResponse.redirect(
        `${getBaseUrl(request)}/admin?error=oauth_error&message=${encodeURIComponent(error)}`,
      )
    }

    // Проверка state для безопасности
    if (state !== "seo-monitor" && state !== "debug-test") {
      console.error("❌ Неверный state параметр:", state)
      return NextResponse.redirect(`${getBaseUrl(request)}/admin?error=invalid_state&message=Неверный параметр state`)
    }

    if (!code) {
      console.error("❌ Код авторизации не получен")
      return NextResponse.redirect(`${getBaseUrl(request)}/admin?error=no_code&message=Код авторизации не получен`)
    }

    // Получаем необходимые переменные окружения
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    let redirectUri = process.env.GOOGLE_REDIRECT_URI

    // Если redirectUri не установлен, определяем его автоматически
    if (!redirectUri) {
      redirectUri = `${getBaseUrl(request)}/api/auth/google/callback`
      console.log("🔧 Автоматически определен redirect URI:", redirectUri)
    }

    // Проверяем наличие необходимых переменных
    if (!clientId) {
      console.error("❌ Отсутствует GOOGLE_CLIENT_ID")
      return NextResponse.redirect(
        `${getBaseUrl(request)}/admin?error=missing_client_id&message=${encodeURIComponent(
          "Отсутствует GOOGLE_CLIENT_ID в переменных окружения",
        )}`,
      )
    }

    if (!clientSecret) {
      console.error("❌ Отсутствует GOOGLE_CLIENT_SECRET")
      return NextResponse.redirect(
        `${getBaseUrl(request)}/admin?error=missing_client_secret&message=${encodeURIComponent(
          "Отсутствует GOOGLE_CLIENT_SECRET в переменных окружения",
        )}`,
      )
    }

    console.log("🔄 Обмен кода на токены...")
    console.log("Client ID:", clientId ? "установлен" : "отсутствует")
    console.log("Client Secret:", clientSecret ? "установлен" : "отсутствует")
    console.log("Redirect URI:", redirectUri)

    // Обмен кода на токены
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error("❌ Ошибка получения токена:", errorData)
      return NextResponse.redirect(
        `${getBaseUrl(request)}/admin?error=token_error&message=${encodeURIComponent(
          `Ошибка получения токена: ${errorData}`,
        )}`,
      )
    }

    const tokens = await tokenResponse.json()
    console.log("✅ Токены успешно получены")

    // Сохраняем токены в cookies
    const cookieStore = cookies()

    try {
      // Access token (действует 1 час)
      cookieStore.set("google_access_token", tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: tokens.expires_in || 3600, // 1 час
        path: "/",
        sameSite: "lax",
      })

      // Refresh token (для обновления access token)
      if (tokens.refresh_token) {
        cookieStore.set("google_refresh_token", tokens.refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 30, // 30 дней
          path: "/",
          sameSite: "lax",
        })
      }

      console.log("✅ Токены сохранены в cookies")
    } catch (cookieError) {
      console.error("❌ Ошибка сохранения cookies:", cookieError)
      // Продолжаем выполнение, так как это не критическая ошибка
    }

    console.log("🔍 Получение информации о пользователе...")
    // Получаем информацию о пользователе
    try {
      const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      })

      if (userResponse.ok) {
        const userInfo = await userResponse.json()
        cookieStore.set("google_user_info", JSON.stringify(userInfo), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24, // 24 часа
          path: "/",
          sameSite: "lax",
        })
        console.log("✅ Информация о пользователе получена:", userInfo.email)
      } else {
        console.warn("⚠️ Не удалось получить информацию о пользователе")
      }
    } catch (userError) {
      console.error("❌ Ошибка получения информации о пользователе:", userError)
      // Продолжаем выполнение, так как это не критическая ошибка
    }

    // Перенаправляем обратно в админ панель с успешным статусом
    console.log("✅ Авторизация успешно завершена, перенаправление в админ панель")
    const successUrl = `${getBaseUrl(request)}/admin?success=oauth_connected&message=${encodeURIComponent(
      "Google Search Console успешно подключен!",
    )}`
    console.log("🔗 Перенаправление на:", successUrl)

    return NextResponse.redirect(successUrl)
  } catch (error) {
    console.error("❌ Критическая ошибка OAuth callback:", error)

    // Подробная информация об ошибке для отладки
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const errorStack = error instanceof Error ? error.stack : "No stack trace"

    console.error("Error message:", errorMessage)
    console.error("Error stack:", errorStack)

    const errorUrl = `${getBaseUrl(request)}/admin?error=oauth_callback&message=${encodeURIComponent(
      errorMessage,
    )}&details=${encodeURIComponent("Проверьте логи сервера для подробной информации")}`

    return NextResponse.redirect(errorUrl)
  }
}

// Вспомогательная функция для получения базового URL
function getBaseUrl(request: Request): string {
  const url = new URL(request.url)
  return `${url.protocol}//${url.host}`
}
