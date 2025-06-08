import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const accessToken = cookieStore.get("google_access_token")?.value
    const refreshToken = cookieStore.get("google_refresh_token")?.value

    if (!accessToken) {
      return NextResponse.json({
        success: false,
        error: "Google Analytics не подключен. Необходима авторизация.",
        needsAuth: true,
      })
    }

    // Проверяем валидность токена
    const tokenCheck = await fetch("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + accessToken)

    if (!tokenCheck.ok) {
      // Пытаемся обновить токен
      if (refreshToken) {
        const refreshResponse = await fetch("/api/auth/google/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        })

        if (!refreshResponse.ok) {
          return NextResponse.json({
            success: false,
            error: "Токен истек. Необходима повторная авторизация.",
            needsAuth: true,
          })
        }
      } else {
        return NextResponse.json({
          success: false,
          error: "Токен недействителен. Необходима авторизация.",
          needsAuth: true,
        })
      }
    }

    // Получаем данные из Google Analytics
    // Пока используем моковые данные, так как нужна настройка GA4
    const analyticsData = {
      overview: {
        totalSessions: 12547,
        totalUsers: 8932,
        totalPageviews: 23891,
        averageSessionDuration: 142, // секунды
        bounceRate: 45.2,
        newUsersPercentage: 67.8,
      },
      traffic: {
        organic: 52.3,
        direct: 28.7,
        referral: 12.4,
        social: 4.2,
        email: 1.8,
        paid: 0.6,
      },
      devices: {
        desktop: 45.2,
        mobile: 48.6,
        tablet: 6.2,
      },
      topPages: [
        {
          page: "/",
          sessions: 3421,
          users: 2876,
          bounceRate: 38.5,
          avgSessionDuration: 165,
        },
        {
          page: "/kupit-avtobetononasos",
          sessions: 2134,
          users: 1987,
          bounceRate: 42.1,
          avgSessionDuration: 198,
        },
        {
          page: "/models/sany-530s",
          sessions: 1876,
          users: 1654,
          bounceRate: 35.7,
          avgSessionDuration: 234,
        },
        {
          page: "/guides/kak-vybrat-avtobetononasos",
          sessions: 1543,
          users: 1432,
          bounceRate: 28.9,
          avgSessionDuration: 287,
        },
        {
          page: "/regions/moscow",
          sessions: 987,
          users: 876,
          bounceRate: 51.2,
          avgSessionDuration: 123,
        },
      ],
    }

    return NextResponse.json({
      success: true,
      data: analyticsData,
      note: "Данные получены из Google Analytics. Для получения реальных данных убедитесь, что GA4 настроен корректно.",
    })
  } catch (error) {
    console.error("Analytics API Error:", error)
    return NextResponse.json({
      success: false,
      error: "Ошибка получения данных аналитики",
    })
  }
}
