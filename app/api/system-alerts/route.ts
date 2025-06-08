import { NextResponse } from "next/server"

// Принудительно делаем route динамическим
export const dynamic = "force-dynamic"

// Временное хранилище для системных уведомлений (в реальном приложении это будет база данных)
const systemAlerts = [
  {
    id: 1,
    message: "Для получения SEO данных необходимо подключить Google Search Console",
    type: "info",
    priority: "medium",
    timestamp: new Date().toISOString(),
    read: false,
    category: "integration",
  },
  {
    id: 2,
    message: "Добавлены новые модели в каталог",
    type: "success",
    priority: "low",
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 час назад
    read: false,
    category: "catalog",
  },
  {
    id: 3,
    message: "Рекомендуется обновить мета-описания для страниц моделей",
    type: "warning",
    priority: "medium",
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 день назад
    read: false,
    category: "seo",
  },
]

// Получение системных уведомлений
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const type = searchParams.get("type")
    const priority = searchParams.get("priority")
    const category = searchParams.get("category")
    const onlyUnread = searchParams.get("unread") === "true"

    // Фильтрация уведомлений
    let filteredAlerts = [...systemAlerts]

    if (type) {
      filteredAlerts = filteredAlerts.filter((alert) => alert.type === type)
    }

    if (priority) {
      filteredAlerts = filteredAlerts.filter((alert) => alert.priority === priority)
    }

    if (category) {
      filteredAlerts = filteredAlerts.filter((alert) => alert.category === category)
    }

    if (onlyUnread) {
      filteredAlerts = filteredAlerts.filter((alert) => !alert.read)
    }

    // Сортировка по приоритету и времени
    filteredAlerts.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      const priorityDiff =
        priorityOrder[a.priority as keyof typeof priorityOrder] -
        priorityOrder[b.priority as keyof typeof priorityOrder]

      if (priorityDiff !== 0) return priorityDiff

      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })

    // Ограничение количества
    const limitedAlerts = filteredAlerts.slice(0, limit)

    return NextResponse.json({
      success: true,
      data: limitedAlerts,
      total: systemAlerts.length,
      unread: systemAlerts.filter((alert) => !alert.read).length,
    })
  } catch (error) {
    console.error("Ошибка получения системных уведомлений:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Ошибка получения системных уведомлений",
      },
      { status: 500 },
    )
  }
}

// Добавление нового системного уведомления
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, type, priority, category } = body

    if (!message || !type || !priority) {
      return NextResponse.json(
        {
          success: false,
          error: "Отсутствуют обязательные поля",
        },
        { status: 400 },
      )
    }

    const newAlert = {
      id: Date.now(),
      message,
      type,
      priority,
      timestamp: new Date().toISOString(),
      read: false,
      category: category || "general",
    }

    // Добавляем в начало массива
    systemAlerts.unshift(newAlert)

    return NextResponse.json({
      success: true,
      data: newAlert,
    })
  } catch (error) {
    console.error("Ошибка добавления системного уведомления:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Ошибка добавления системного уведомления",
      },
      { status: 500 },
    )
  }
}

// Обновление статуса прочтения уведомления
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, read } = body

    if (id === undefined || read === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: "Отсутствуют обязательные поля",
        },
        { status: 400 },
      )
    }

    const alertIndex = systemAlerts.findIndex((alert) => alert.id === id)

    if (alertIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Уведомление не найдено",
        },
        { status: 404 },
      )
    }

    systemAlerts[alertIndex].read = read

    return NextResponse.json({
      success: true,
      data: systemAlerts[alertIndex],
    })
  } catch (error) {
    console.error("Ошибка обновления системного уведомления:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Ошибка обновления системного уведомления",
      },
      { status: 500 },
    )
  }
}
