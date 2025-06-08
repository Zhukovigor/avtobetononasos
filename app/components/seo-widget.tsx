"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface QuickStats {
  averagePosition: number
  topKeywords: number
  totalKeywords: number
  trend: "up" | "down" | "stable"
}

export default function SEOWidget() {
  const [stats, setStats] = useState<QuickStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Симуляция загрузки быстрой статистики
    setTimeout(() => {
      setStats({
        averagePosition: 14.2,
        topKeywords: 3,
        totalKeywords: 8,
        trend: "up",
      })
      setLoading(false)
    }, 1000)
  }, [])

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

  if (!stats) return null

  const getTrendIcon = () => {
    switch (stats.trend) {
      case "up":
        return <span className="text-green-500">📈</span>
      case "down":
        return <span className="text-red-500">📉</span>
      default:
        return <span className="text-gray-500">➡️</span>
    }
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg flex items-center gap-2">SEO Позиции {getTrendIcon()}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Средняя позиция:</span>
            <span className="text-white font-bold">{stats.averagePosition}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">В ТОП-10:</span>
            <span className="text-green-500 font-bold">
              {stats.topKeywords}/{stats.totalKeywords}
            </span>
          </div>

          <div className="pt-2">
            <a href="/seo-monitor" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
              Подробная статистика →
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
