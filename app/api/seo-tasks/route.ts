import { NextResponse } from "next/server"

interface TaskUpdate {
  taskId: string
  status: "pending" | "in_progress" | "completed"
  progress?: number
  completedAt?: string
  notes?: string
}

// API для обновления статуса задач
export async function POST(request: Request) {
  try {
    const { taskId, status, progress, notes }: TaskUpdate = await request.json()

    // Здесь бы была логика сохранения в базу данных
    console.log("Обновление задачи:", { taskId, status, progress, notes })

    // Симуляция обновления
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Логируем изменение для аналитики
    const updateData = {
      taskId,
      status,
      progress,
      timestamp: new Date().toISOString(),
      notes,
    }

    return NextResponse.json({
      success: true,
      message: "Статус задачи успешно обновлен",
      data: updateData,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка при обновлении статуса задачи",
      },
      { status: 500 },
    )
  }
}

// API для получения истории изменений
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const taskId = searchParams.get("taskId")

  try {
    // Здесь бы была логика получения истории из базы данных
    const history = [
      {
        id: "1",
        taskId: taskId || "1",
        status: "completed",
        progress: 100,
        timestamp: new Date().toISOString(),
        notes: "Посадочная страница создана и опубликована",
        user: "Игорь Жуков",
      },
      {
        id: "2",
        taskId: taskId || "1",
        status: "in_progress",
        progress: 75,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        notes: "Контент написан, осталось добавить CTA",
        user: "Игорь Жуков",
      },
    ]

    return NextResponse.json({
      success: true,
      data: history,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка при получении истории задачи",
      },
      { status: 500 },
    )
  }
}
