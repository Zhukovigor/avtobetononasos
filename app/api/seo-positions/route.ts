import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Интерфейс для данных о позициях
interface PositionData {
  keyword: string
  position: number | null
  url: string
  searchEngine: "google" | "yandex"
  location: string
  device: "desktop" | "mobile"
  date: string
  clicks?: number
  impressions?: number
  ctr?: number
}

// Обновленный API endpoint для работы с OAuth токенами
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const keywords = searchParams.get("keywords")?.split(",") || []
  const searchEngine = searchParams.get("engine") || "google"
  const location = searchParams.get("location") || "Russia"
  const days = Number.parseInt(searchParams.get("days") || "90", 10) // Увеличили период до 90 дней

  try {
    // Если запрашиваются данные из Google Search Console
    if (searchEngine === "google") {
      const gscData = await getGoogleSearchConsoleDataWithOAuth(keywords, days)
      return NextResponse.json({
        success: true,
        data: gscData,
        source: "Google Search Console API (OAuth)",
        timestamp: new Date().toISOString(),
        debug: {
          keywordsRequested: keywords,
          daysRequested: days,
          totalResults: gscData.length,
        },
      })
    }
    // Если запрашиваются данные из Яндекс.Вебмастер (пока используем демо)
    else if (searchEngine === "yandex") {
      const positions = generateDemoData(keywords, "yandex", location)
      return NextResponse.json({
        success: true,
        data: positions,
        source: "Demo Data (Yandex)",
        timestamp: new Date().toISOString(),
      })
    }
    // Для других поисковых систем используем демо-данные
    else {
      const positions = generateDemoData(keywords, searchEngine as any, location)
      return NextResponse.json({
        success: true,
        data: positions,
        source: "Demo Data",
        timestamp: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error("Ошибка при получении данных о позициях:", error)

    // В случае ошибки возвращаем демо-данные с пометкой об ошибке
    const positions = generateDemoData(keywords, searchEngine as any, location)
    return NextResponse.json({
      success: false,
      error: "Ошибка при получении данных из API. Используются демо-данные.",
      errorDetails: error instanceof Error ? error.message : String(error),
      data: positions,
      source: "Demo Data (Fallback)",
      timestamp: new Date().toISOString(),
    })
  }
}

// Функция для получения данных из Google Search Console с OAuth токеном
async function getGoogleSearchConsoleDataWithOAuth(keywords: string[], days = 90): Promise<PositionData[]> {
  try {
    // Получаем токен из cookies
    const cookieStore = cookies()
    const accessToken = cookieStore.get("google_access_token")?.value

    if (!accessToken) {
      throw new Error("OAuth токен не найден. Необходимо подключить Google Search Console.")
    }

    // Формируем даты для запроса
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - days)

    const formattedStartDate = startDate.toISOString().split("T")[0]
    const formattedEndDate = endDate.toISOString().split("T")[0]

    console.log(`🔍 Запрос данных GSC за период: ${formattedStartDate} - ${formattedEndDate}`)

    // Список возможных URL сайта для проверки
    const possibleSites = [
      "https://v0-avtobetononasos.vercel.app/",
      "https://v0-avtobetononasos.vercel.app",
      "sc-domain:v0-avtobetononasos.vercel.app",
    ]

    let allData: PositionData[] = []

    // Пробуем каждый возможный URL сайта
    for (const site of possibleSites) {
      try {
        console.log(`🌐 Проверяем сайт: ${site}`)

        // Сначала получаем все данные без фильтрации по ключевым словам
        const response = await fetch(
          `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              startDate: formattedStartDate,
              endDate: formattedEndDate,
              dimensions: ["query", "page"],
              rowLimit: 1000, // Увеличили лимит
              startRow: 0,
            }),
          },
        )

        if (response.status === 401) {
          throw new Error("Токен доступа истек")
        }

        if (response.status === 403) {
          console.log(`❌ Нет доступа к сайту: ${site}`)
          continue
        }

        if (!response.ok) {
          const errorText = await response.text()
          console.log(`❌ Ошибка для сайта ${site}: ${response.status} ${errorText}`)
          continue
        }

        const data = await response.json()
        console.log(`📊 Получено строк данных для ${site}: ${data.rows?.length || 0}`)

        if (data.rows && data.rows.length > 0) {
          // Преобразуем данные в нужный формат
          const siteData: PositionData[] = data.rows.map((row: any) => {
            const keyword = row.keys[0]
            const url = row.keys[1] || site
            const position = Math.round(row.position)

            return {
              keyword,
              position,
              url,
              searchEngine: "google",
              location: "Global",
              device: "desktop",
              date: formattedEndDate,
              clicks: row.clicks || 0,
              impressions: row.impressions || 0,
              ctr: row.ctr || 0,
            }
          })

          allData = [...allData, ...siteData]
          console.log(`✅ Добавлено ${siteData.length} записей для сайта ${site}`)
        }
      } catch (siteError) {
        console.log(`❌ Ошибка для сайта ${site}:`, siteError)
        continue
      }
    }

    // Если есть конкретные ключевые слова для фильтрации, фильтруем результаты
    if (keywords.length > 0 && keywords[0] !== "") {
      const filteredData = allData.filter((item) =>
        keywords.some((keyword) => item.keyword.toLowerCase().includes(keyword.toLowerCase().trim())),
      )
      console.log(`🔍 Отфильтровано по ключевым словам: ${filteredData.length} из ${allData.length}`)
      return filteredData
    }

    console.log(`📈 Итого данных: ${allData.length}`)
    return allData.slice(0, 100) // Ограничиваем до 100 записей для отображения
  } catch (error) {
    console.error("Ошибка при получении данных из Google Search Console:", error)
    throw error
  }
}

// Функция для генерации демо-данных (используется как запасной вариант)
function generateDemoData(
  keywords: string[],
  searchEngine: "google" | "yandex" = "google",
  location = "Russia",
): PositionData[] {
  return keywords.map((keyword) => ({
    keyword: keyword.trim(),
    position: Math.random() > 0.1 ? Math.floor(Math.random() * 50) + 1 : null,
    url: "https://v0-avtobetononasos.vercel.app",
    searchEngine,
    location,
    device: "desktop",
    date: new Date().toISOString().split("T")[0],
    clicks: Math.floor(Math.random() * 100),
    impressions: Math.floor(Math.random() * 1000) + 100,
    ctr: Math.random() * 0.1,
  }))
}

// API для добавления новых ключевых слов для отслеживания
export async function POST(request: Request) {
  try {
    const { keywords, settings } = await request.json()

    console.log("Добавлены новые ключевые слова:", keywords)
    console.log("Настройки:", settings)

    return NextResponse.json({
      success: true,
      message: "Ключевые слова добавлены для отслеживания",
      addedKeywords: keywords.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка при добавлении ключевых слов",
      },
      { status: 500 },
    )
  }
}
