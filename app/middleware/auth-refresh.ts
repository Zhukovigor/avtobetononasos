import { type NextRequest, NextResponse } from "next/server"

// Middleware для автоматического обновления Google OAuth токенов
export async function authRefreshMiddleware(request: NextRequest) {
  const accessToken = request.cookies.get("google_access_token")?.value
  const refreshToken = request.cookies.get("google_refresh_token")?.value
  const sessionMeta = request.cookies.get("oauth_session_meta")?.value

  // Если нет токенов, пропускаем
  if (!accessToken || !refreshToken) {
    return NextResponse.next()
  }

  try {
    // Проверяем, не истек ли токен
    const meta = sessionMeta ? JSON.parse(sessionMeta) : {}
    const expiresAt = meta.expiresAt ? new Date(meta.expiresAt) : null
    const timeToExpiry = expiresAt ? expiresAt.getTime() - Date.now() : 0

    // Если токен истекает в течение 5 минут, обновляем его
    if (timeToExpiry < 5 * 60 * 1000) {
      console.log("🔄 Автоматическое обновление токена...")

      const refreshResponse = await fetch(`${request.nextUrl.origin}/api/auth/google/refresh-enhanced`, {
        method: "POST",
        headers: {
          Cookie: request.headers.get("cookie") || "",
        },
      })

      if (refreshResponse.ok) {
        const result = await refreshResponse.json()
        console.log("✅ Токен автоматически обновлен")

        // Копируем обновленные cookies в ответ
        const response = NextResponse.next()
        const setCookieHeaders = refreshResponse.headers.getSetCookie()

        setCookieHeaders.forEach((cookie) => {
          response.headers.append("Set-Cookie", cookie)
        })

        return response
      } else {
        console.log("⚠️ Не удалось обновить токен автоматически")
      }
    }
  } catch (error) {
    console.error("❌ Ошибка автоматического обновления токена:", error)
  }

  return NextResponse.next()
}

// Проверка, нужно ли применять middleware
export function shouldApplyAuthRefresh(pathname: string): boolean {
  const protectedPaths = ["/admin", "/seo-monitor", "/api/google-seo-data", "/api/seo-positions"]

  return protectedPaths.some((path) => pathname.startsWith(path))
}
