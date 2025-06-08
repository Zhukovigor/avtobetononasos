import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Моковые данные для демонстрации
    const reportsData = {
      scheduled: [
        {
          name: "Еженедельный отчет по трафику",
          frequency: "Еженедельно",
          lastSent: "2024-01-08",
          nextSend: "2024-01-15",
          recipients: 3,
          status: "active" as const,
        },
        {
          name: "Месячный SEO отчет",
          frequency: "Ежемесячно",
          lastSent: "2024-01-01",
          nextSend: "2024-02-01",
          recipients: 5,
          status: "active" as const,
        },
        {
          name: "Отчет по конверсиям",
          frequency: "Ежедневно",
          lastSent: "2024-01-08",
          nextSend: "2024-01-09",
          recipients: 2,
          status: "paused" as const,
        },
      ],
      available: [
        {
          name: "Полный аналитический отчет",
          description: "Комплексный анализ всех метрик сайта за выбранный период",
          type: "analytics" as const,
          lastGenerated: "2024-01-08",
          size: "2.4 MB",
        },
        {
          name: "SEO аудит и рекомендации",
          description: "Детальный анализ SEO показателей и план улучшений",
          type: "seo" as const,
          lastGenerated: "2024-01-07",
          size: "1.8 MB",
        },
        {
          name: "Анализ источников трафика",
          description: "Подробная статистика по всем каналам привлечения",
          type: "traffic" as const,
          lastGenerated: "2024-01-08",
          size: "1.2 MB",
        },
        {
          name: "Отчет по конверсиям",
          description: "Анализ воронки продаж и эффективности целей",
          type: "conversions" as const,
          lastGenerated: "2024-01-08",
          size: "0.9 MB",
        },
      ],
    }

    return NextResponse.json({
      success: true,
      data: reportsData,
    })
  } catch (error) {
    console.error("Reports API Error:", error)
    return NextResponse.json({
      success: false,
      error: "Ошибка получения данных отчетов",
    })
  }
}
