import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const accessToken = cookieStore.get("google_access_token")?.value

    if (!accessToken) {
      return NextResponse.json({
        success: false,
        error: "Google Analytics не подключен. Необходима авторизация.",
        needsAuth: true,
      })
    }

    // Моковые данные для демонстрации
    const trafficData = {
      sources: {
        organic: { sessions: 6547, users: 4932, percentage: 52.3, change: 12.4 },
        direct: { sessions: 3591, users: 2876, percentage: 28.7, change: -3.2 },
        referral: { sessions: 1553, users: 1234, percentage: 12.4, change: 8.7 },
        social: { sessions: 525, users: 432, percentage: 4.2, change: 15.3 },
        email: { sessions: 225, users: 198, percentage: 1.8, change: -5.1 },
        paid: { sessions: 75, users: 67, percentage: 0.6, change: 23.8 },
      },
      referrers: [
        { domain: "yandex.ru", sessions: 2341, users: 1987, bounceRate: 42.1 },
        { domain: "google.com", sessions: 1876, users: 1654, bounceRate: 38.5 },
        { domain: "avito.ru", sessions: 543, users: 432, bounceRate: 51.2 },
        { domain: "drom.ru", sessions: 321, users: 287, bounceRate: 45.7 },
        { domain: "auto.ru", sessions: 198, users: 176, bounceRate: 39.8 },
      ],
      keywords: [
        { keyword: "автобетононасос купить", clicks: 1234, impressions: 15678, ctr: 7.9, position: 3.2 },
        { keyword: "бетононасос цена", clicks: 987, impressions: 12345, ctr: 8.0, position: 2.8 },
        { keyword: "автобетононасос sany", clicks: 765, impressions: 9876, ctr: 7.7, position: 4.1 },
        { keyword: "купить бетононасос москва", clicks: 543, impressions: 8765, ctr: 6.2, position: 5.3 },
        { keyword: "автобетононасос аренда", clicks: 432, impressions: 7654, ctr: 5.6, position: 6.7 },
      ],
      campaigns: [
        {
          name: "Поиск - Автобетононасосы",
          source: "google",
          medium: "cpc",
          sessions: 45,
          conversions: 3,
          cost: 12500,
        },
        { name: "Ретаргетинг", source: "yandex", medium: "cpc", sessions: 23, conversions: 1, cost: 5600 },
        { name: "Email рассылка", source: "email", medium: "email", sessions: 87, conversions: 5, cost: 0 },
      ],
    }

    return NextResponse.json({
      success: true,
      data: trafficData,
      note: "Данные получены из Google Analytics и Search Console",
    })
  } catch (error) {
    console.error("Traffic API Error:", error)
    return NextResponse.json({
      success: false,
      error: "Ошибка получения данных трафика",
    })
  }
}
