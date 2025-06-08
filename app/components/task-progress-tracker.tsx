"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TaskProgress {
  taskId: string
  title: string
  status: "pending" | "in_progress" | "completed"
  progress: number
  lastUpdated: string
  impact: string
}

export default function TaskProgressTracker() {
  const [tasks, setTasks] = useState<TaskProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Загружаем актуальные данные о задачах
    const loadTasks = () => {
      const savedRecommendations = localStorage.getItem("seo_recommendations")
      if (savedRecommendations) {
        try {
          const recommendations = JSON.parse(savedRecommendations)
          const taskProgress = recommendations.map((rec: any) => ({
            taskId: rec.id,
            title: rec.title,
            status: rec.status,
            progress: rec.progress || 0,
            lastUpdated: new Date().toLocaleDateString("ru-RU"),
            impact: rec.impact,
          }))
          setTasks(taskProgress)
        } catch (error) {
          console.error("Ошибка загрузки задач:", error)
        }
      }
      setLoading(false)
    }

    loadTasks()

    // Обновляем каждые 30 секунд
    const interval = setInterval(loadTasks, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500"
      case "in_progress":
        return "text-blue-500"
      case "pending":
        return "text-gray-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Завершено"
      case "in_progress":
        return "В работе"
      case "pending":
        return "Запланировано"
      default:
        return "Неизвестно"
    }
  }

  if (loading) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-zinc-700 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const completedTasks = tasks.filter((t) => t.status === "completed").length
  const totalTasks = tasks.length

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg flex items-center gap-2">
          📊 Прогресс задач
          <span className="text-sm bg-zinc-700 px-2 py-1 rounded">
            {completedTasks}/{totalTasks}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Общий прогресс */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Общий прогресс:</span>
              <span className="text-white">{Math.round((completedTasks / totalTasks) * 100)}%</span>
            </div>
            <div className="w-full bg-zinc-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Последние обновления */}
          <div className="space-y-2">
            <h4 className="text-white font-medium text-sm">Последние обновления:</h4>
            {tasks
              .filter((t) => t.status !== "pending")
              .slice(0, 3)
              .map((task, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <span className="text-gray-300 truncate flex-1 mr-2">{task.title}</span>
                  <span className={`font-medium ${getStatusColor(task.status)}`}>{getStatusText(task.status)}</span>
                </div>
              ))}
          </div>

          <div className="pt-2">
            <a href="/seo-recommendations" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
              Управлять задачами →
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
