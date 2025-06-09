import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

// Обработка callback от Google OAuth
export async function GET(request: Request) {
  try {
    console.log("🔄 Получен callback от Google OAuth")

    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const stateParam = searchParams.get("state")
    const error = searchParams.get("error")

    // Проверка на ошибки от Google
    if (error) {
      console.error("❌ Ошибка от Google OAuth:", error)
      return NextResponse.redirect(
        `${getBaseUrl(request)}/admin?error=google_oauth&message=${encodeURIComponent(error)}`,
      )
    }

    // Проверка наличия кода авторизации
    if (!code) {
      console.error("❌ Отсутствует код авторизации")
      return NextResponse.redirect(
        `${getBaseUrl(request)}/admin?error=no_code&message=${encodeURIComponent("Отсутствует код авторизации")}`,
      )
    }

    // Получаем переменные окружения
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${getBaseUrl(request)}/api/auth/google/callback`

    if (!clientId || !clientSecret) {
      console.error("❌ Отсутствуют переменные окружения для OAuth")
      return NextResponse.redirect(
        `${getBaseUrl(request)}/admin?error=env_missing&message=${encodeURIComponent(
          "Отсутствуют необходимые переменные окружения",
        )}`,
      )
    }

    // Обмен кода на токены
    console.log("🔑 Обмен кода на токены")
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error("❌ Ошибка получения токенов:", errorData)
      return NextResponse.redirect(
        `${getBaseUrl(request)}/admin?error=token_exchange&message=${encodeURIComponent(
          `Ошибка получения токенов: ${errorData}`,
        )}`,
      )
    }

    const tokenData = await tokenResponse.json()
    console.log("✅ Токены получены успешно")

    // Получение информации о пользователе
    console.log("👤 Получение информации о пользователе")
    const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userInfoResponse.ok) {
      console.error("❌ Ошибка получения информации о пользователе")
      return NextResponse.redirect(
        `${getBaseUrl(request)}/admin?error=userinfo&message=${encodeURIComponent(
          "Ошибка получения информации о пользователе",
        )}`,
      )
    }

    const userData = await userInfoResponse.json()
    console.log("✅ Информация о пользователе получена")

    // Сохраняем токены и информацию о пользователе в cookies
    const cookieStore = cookies()

    // Сохраняем access_token (короткий срок жизни)
    cookieStore.set("google_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: tokenData.expires_in,
      path: "/",
    })

    // Сохраняем refresh_token (долгий срок жизни)
    if (tokenData.refresh_token) {
      cookieStore.set("google_refresh_token", tokenData.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 дней
        path: "/",
      })
    }

    // Сохраняем информацию о пользователе
    cookieStore.set(
      "google_user_info",
      JSON.stringify({
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 дней
        path: "/",
      },
    )

    // Сохраняем время подключения и срок действия
    cookieStore.set(
      "google_session_info",
      JSON.stringify({
        connectedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
        scopes: tokenData.scope.split(" "),
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 дней
        path: "/",
      },
    )

    // Определяем URL для перенаправления
    let returnUrl = "/admin"
    if (stateParam) {
      try {
        const state = JSON.parse(stateParam)
        if (state.returnUrl) {
          returnUrl = state.returnUrl
        }
      } catch (e) {
        console.error("❌ Ошибка парсинга state:", e)
      }
    }

    console.log("✅ Авторизация успешно завершена, перенаправление на:", returnUrl)
    return NextResponse.redirect(`${getBaseUrl(request)}${returnUrl}?auth=success`)
  } catch (error) {
    console.error("❌ Ошибка в процессе OAuth callback:", error)
    return NextResponse.redirect(
      `${getBaseUrl(request)}/admin?error=callback_error&message=${encodeURIComponent(
        error instanceof Error ? error.message : "Неизвестная ошибка в процессе OAuth",
      )}`,
    )
  }
}

function getBaseUrl(request: Request): string {
  const url = new URL(request.url)
  return `${url.protocol}//${url.host}`
}
