import { NextResponse } from "next/server"

// Принудительно делаем route динамическим
export const dynamic = "force-dynamic"

// Временное хранилище для логов активности (в реальном приложении это будет база данных)
let activityLogs: Array<{
  id: number
  action: string
  time: string
  timestamp: Date
  type: "seo" | "model" | "lead" | "system"
  status: "success" | "warning" | "error"
  userId?: string
  details?: any
}> = []

// Инициализация с пустым массивом
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const type = searchParams.get("type")
    const status = searchParams.get("status")

    // Фильтрация логов
    let filteredLogs = [...activityLogs]

    if (type) {
      filteredLogs = filteredLogs.filter((log) => log.type === type)
    }

    if (status) {
      filteredLogs = filteredLogs.filter((log) => log.status === status)
    }

    // Сортировка по времени (новые сначала)
    filteredLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

    // Ограничение количества
    const limitedLogs = filteredLogs.slice(0, limit)

    return NextResponse.json({
      success: true,
      data: limitedLogs,
      total: activityLogs.length,
      filtered: filteredLogs.length,
    })
  } catch (error) {
    console.error("Ошибка получения логов активности:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Ошибка получения логов активности",
      },
      { status: 500 },
    )
  }
}

// Добавление нового лога активности
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, type, status, userId, details } = body

    if (!action || !type || !status) {
      return NextResponse.json(
        {
          success: false,
          error: "Отсутствуют обязательные поля",
        },
        { status: 400 },
      )
    }

    const now = new Date()
    const timeString = getRelativeTimeString(now)

    const newLog = {
      id: Date.now(),
      action,
      time: timeString,
      timestamp: now,
      type,
      status,
      userId,
      details,
    }

    // Добавляем в начало массива
    activityLogs.unshift(newLog)

    // Ограничиваем размер массива (в реальном приложении это будет делать база данных)
    if (activityLogs.length > 100) {
      activityLogs = activityLogs.slice(0, 100)
    }

    return NextResponse.json({
      success: true,
      data: newLog,
    })
  } catch (error) {
    console.error("Ошибка добавления лога активности:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Ошибка добавления лога активности",
      },
      { status: 500 },
    )
  }
}

// Функция для форматирования относительного времени
function getRelativeTimeString(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) {
    return "только что"
  } else if (diffMin < 60) {
    return `${diffMin} ${getMinutesForm(diffMin)} назад`
  } else if (diffHour < 24) {
    return `${diffHour} ${getHoursForm(diffHour)} назад`
  } else if (diffDay < 7) {
    return `${diffDay} ${getDaysForm(diffDay)} назад`
  } else {
    return date.toLocaleDateString("ru-RU")
  }
}

// Вспомогательные функции для склонения слов
function getMinutesForm(minutes: number): string {
  if (minutes % 10 === 1 && minutes % 100 !== 11) {
    return "минуту"
  } else if ([2, 3, 4].includes(minutes % 10) && ![12, 13, 14].includes(minutes % 100)) {
    return "минуты"
  } else {
    return "минут"
  }
}

function getHoursForm(hours: number): string {
  if (hours % 10 === 1 && hours % 100 !== 11) {
    return "час"
  } else if ([2, 3, 4].includes(hours % 10) && ![12, 13, 14].includes(hours % 100)) {
    return "часа"
  } else {
    return "часов"
  }
}

function getDaysForm(days: number): string {
  if (days % 10 === 1 && days % 100 !== 11) {
    return "день"
  } else if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) {
    return "дня"
  } else {
    return "дней"
  }
}
