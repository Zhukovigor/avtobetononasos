"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, Truck, Activity, Settings } from "lucide-react"

interface ModelSummary {
  id: string
  model: string
  title: string
  subtitle: string
  image: string
  keySpecs: {
    height: string
    performance: string
    reach: string
    weight: string
  }
}

interface ModelsOverviewProps {
  onEditModel: (modelId: string) => void
}

export default function ModelsOverview({ onEditModel }: ModelsOverviewProps) {
  const [models, setModels] = useState<ModelSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/models")
      const result = await response.json()
      if (result.success) {
        // Получаем полные данные для каждой модели
        const fullModels = await Promise.all(
          result.data.map(async (model: any) => {
            const modelResponse = await fetch(`/api/models?id=${model.id}`)
            const modelResult = await modelResponse.json()
            return modelResult.success ? modelResult.data : null
          }),
        )
        setModels(fullModels.filter(Boolean))
      }
    } catch (error) {
      console.error("Ошибка загрузки моделей:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-zinc-900 border-zinc-800 animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-zinc-700 rounded mb-4"></div>
              <div className="h-3 bg-zinc-700 rounded mb-2"></div>
              <div className="h-3 bg-zinc-700 rounded mb-4"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-8 bg-zinc-700 rounded"></div>
                <div className="h-8 bg-zinc-700 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Все модели</h2>
          <p className="text-gray-400">Обзор всех автобетононасосов в системе</p>
        </div>
        <Badge variant="outline" className="text-blue-400 border-blue-400">
          {models.length} моделей
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <Card key={model.id} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg mb-1">{model.model}</CardTitle>
                  <p className="text-gray-400 text-sm">{model.subtitle}</p>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Ключевые характеристики */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-800 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-gray-400">Высота</span>
                  </div>
                  <div className="text-white font-semibold">{model.keySpecs.height}</div>
                </div>
                <div className="bg-zinc-800 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Settings className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-gray-400">Производ.</span>
                  </div>
                  <div className="text-white font-semibold">{model.keySpecs.performance}</div>
                </div>
                <div className="bg-zinc-800 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-gray-400">Вылет</span>
                  </div>
                  <div className="text-white font-semibold">{model.keySpecs.reach}</div>
                </div>
                <div className="bg-zinc-800 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-gray-400">Масса</span>
                  </div>
                  <div className="text-white font-semibold">{model.keySpecs.weight}</div>
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => onEditModel(model.id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Редактировать
                </Button>
                <Button
                  onClick={() => window.open(`/models/${model.id}`, "_blank")}
                  variant="outline"
                  className="border-zinc-600 text-gray-300 hover:bg-zinc-700"
                  size="sm"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {models.length === 0 && (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-12 text-center">
            <Truck className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Модели не найдены</h3>
            <p className="text-gray-400">Создайте первую модель автобетононасоса</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
