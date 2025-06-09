import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

// Получение данных только из Google Search Console и Analytics
export async function GET() {
  try {
    const cookieStore = cookies()
    const accessToken = cookieStore.get("google_access_token")?.value

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Токен доступа отсутствует. Необходимо подключить Google аккаунт.",
          data: null,
        },
        { status: 401 },
      )
    }

    try {
      // Проверяем валидность токена
      const tokenCheckResponse = await fetch("https://www.googleapis.com/oauth2/v1/tokeninfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!tokenCheckResponse.ok) {
        return NextResponse.json(
          {
            success: false,
            error: "Токен доступа недействителен или истек срок его действия.",
            data: null,
          },
          { status: 401 },
        )
      }

      // Параллельное получение данных из разных источников
      const [searchConsoleData, analyticsData] = await Promise.all([
        getSearchConsoleData(accessToken),
        getAnalyticsData(accessToken),
      ])

      const combinedData = {
        searchConsole: searchConsoleData,
        analytics: analyticsData,
        status: {
          connected: true,
          lastUpdate: new Date().toISOString(),
          dataRange: "last_30_days",
        },
      }

      return NextResponse.json({
        success: true,
        data: combinedData,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("❌ Ошибка получения Google SEO данных:", error)

      return NextResponse.json({
        success: false,
        error: error instanceof Error ? error.message : "Ошибка получения данных",
        data: null,
      })
    }
  } catch (error) {
    console.error("❌ Ошибка получения Google SEO данных:", error)

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Ошибка получения данных",
      data: null,
    })
  }
}

// Получение данных из Google Search Console
async function getSearchConsoleData(accessToken: string) {
  const siteUrl = "https://v0-avtobetononasos.vercel.app/"
  const endDate = new Date().toISOString().split("T")[0]
  const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

  try {
    // Основные метрики
    const metricsResponse = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: [],
          rowLimit: 1,
        }),
      },
    )

    if (!metricsResponse.ok) {
      throw new Error(`Ошибка получения метрик: ${metricsResponse.status} ${metricsResponse.statusText}`)
    }

    const metricsData = await metricsResponse.json()

    // Обработка основных метрик
    const totalMetrics = metricsData.rows?.[0] || {
      clicks: 0,
      impressions: 0,
      ctr: 0,
      position: 0,
    }

    return {
      totalClicks: totalMetrics.clicks || 0,
      totalImpressions: totalMetrics.impressions || 0,
      averageCTR: totalMetrics.ctr || 0,
      averagePosition: totalMetrics.position || 0,
      keywords: [],
      topQueries: [],
      topPages: [],
    }
  } catch (error) {
    console.error("Ошибка получения данных Search Console:", error)
    throw new Error("Не удалось получить данные из Google Search Console")
  }
}

// Получение данных из Google Analytics
async function getAnalyticsData(accessToken: string) {
  try {
    // В реальной версии здесь будет интеграция с Google Analytics Data API
    return {
      sessions: 0,
      users: 0,
      bounceRate: 0,
      sessionDuration: 0,
      organicTraffic: 0,
      topPages: [],
    }
  } catch (error) {
    console.error("Ошибка получения данных Analytics:", error)
    throw new Error("Не удалось получить данные из Google Analytics")
  }
}
