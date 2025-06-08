"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Activity, TrendingUp, Settings } from "lucide-react"

interface ModelStats {
  totalModels: number
  avgHeight: number
  avgPerformance: number
  avgWeight: number
  heightRange: { min: number; max: number }
  performanceRange: { min: number; max: number }
}

export default function ModelsStats() {
  const [stats, setStats] = useState<ModelStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/models")
      const result = await response.json()

      if (result.success) {
        // Получаем полные данные для всех моделей
        const fullModels = await Promise.all(
          result.data.map(async (model: any) => {
            const modelResponse = await fetch(`/api/models?id=${model.id}`)
            const modelResult = await modelResponse.json()
            return modelResult.success ? modelResult.data : null
          }),
        )

        const models = fullModels.filter(Boolean)

        // Вычисляем статистику
        const heights = models.map((m) => Number.parseFloat(m.keySpecs.height.replace("м", "")))
        const performances = models.map((m) => Number.parseFloat(m.keySpecs.performance.replace(" м³/ч", "")))
        const weights = models.map((m) => Number.parseFloat(m.keySpecs.weight.replace(" кг", "").replace(" ", "")))

        const stats: ModelStats = {
          totalModels: models.length,
          avgHeight: Math.round(heights.reduce((a, b) => a + b, 0) / heights.length),
          avgPerformance: Math.round(performances.reduce((a, b) => a + b, 0) / performances.length),
          avgWeight: Math.round(weights.reduce((a, b) => a + b, 0) / weights.length),
          heightRange: { min: Math.min(...heights), max: Math.max(...heights) },
          performanceRange: { min: Math.min(...performances), max: Math.max(...performances) },
        }

        setStats(stats)
      }
    } catch (error) {
      console.error("Ошибка загрузки статистики:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading || !stats) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-zinc-900 border-zinc-800 animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-zinc-700 rounded mb-2"></div>
              <div className="h-8 bg-zinc-700 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2 text-sm">
            <Truck className="w-4 h-4 text-blue-400" />
            Всего моделей
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.totalModels}</div>
          <p className="text-xs text-gray-400">автобетононасосов</p>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2 text-sm">
            <Activity className="w-4 h-4 text-green-400" />
            Средняя высота
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.avgHeight}м</div>
          <p className="text-xs text-gray-400">
            {stats.heightRange.min}м - {stats.heightRange.max}м
          </p>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-orange-400" />
            Средняя производительность
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.avgPerformance}</div>
          <p className="text-xs text-gray-400">м³/ч</p>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2 text-sm">
            <Settings className="w-4 h-4 text-purple-400" />
            Средняя масса
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{(stats.avgWeight / 1000).toFixed(1)}т</div>
          <p className="text-xs text-gray-400">тонн</p>
        </CardContent>
      </Card>
    </div>
  )
}
