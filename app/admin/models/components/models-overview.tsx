"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Truck, Activity, Gauge, Weight } from "lucide-react"

interface ModelOverview {
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
  const [models, setModels] = useState<ModelOverview[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    try {
      const response = await fetch("/api/models")
      const result = await response.json()
      if (result.success) {
        setModels(result.data)
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
              <div className="h-48 bg-zinc-800 rounded-lg mb-4"></div>
              <div className="h-6 bg-zinc-800 rounded mb-2"></div>
              <div className="h-4 bg-zinc-800 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-zinc-800 rounded"></div>
                <div className="h-4 bg-zinc-800 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Статистика */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Всего моделей</p>
                <p className="text-2xl font-bold text-white">{models.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-600 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Макс. высота</p>
                <p className="text-2xl font-bold text-white">75м</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-600 rounded-lg">
                <Gauge className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Макс. производительность</p>
                <p className="text-2xl font-bold text-white">220 м³/ч</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-600 rounded-lg">
                <Weight className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Диапазон массы</p>
                <p className="text-2xl font-bold text-white">28-55т</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Сетка моделей */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <Card key={model.id} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
            <CardHeader className="pb-4">
              <div className="aspect-video bg-zinc-800 rounded-lg mb-4 overflow-hidden">
                <img
                  src={model.image || "/placeholder.svg"}
                  alt={model.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=200&width=300"
                  }}
                />
              </div>
              <CardTitle className="text-white text-lg">{model.model}</CardTitle>
              <p className="text-gray-400 text-sm">{model.subtitle}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-zinc-800 rounded-lg">
                  <p className="text-blue-400 font-semibold">{model.keySpecs.height}</p>
                  <p className="text-gray-400 text-xs">Высота</p>
                </div>
                <div className="text-center p-3 bg-zinc-800 rounded-lg">
                  <p className="text-green-400 font-semibold">{model.keySpecs.performance}</p>
                  <p className="text-gray-400 text-xs">Производительность</p>
                </div>
                <div className="text-center p-3 bg-zinc-800 rounded-lg">
                  <p className="text-purple-400 font-semibold">{model.keySpecs.reach}</p>
                  <p className="text-gray-400 text-xs">Вылет</p>
                </div>
                <div className="text-center p-3 bg-zinc-800 rounded-lg">
                  <p className="text-orange-400 font-semibold">{model.keySpecs.weight}</p>
                  <p className="text-gray-400 text-xs">Масса</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => onEditModel(model.id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Редактировать
                </Button>
                <Button
                  onClick={() => window.open(`/models/${model.id}`, "_blank")}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  size="sm"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Быстрые действия */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">🚀 Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button onClick={() => onEditModel("")} className="bg-green-600 hover:bg-green-700 h-16">
              <div className="text-center">
                <div className="text-2xl mb-1">➕</div>
                <div>Добавить модель</div>
              </div>
            </Button>
            <Button
              onClick={() => window.open("/models", "_blank")}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 h-16"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">👁️</div>
                <div>Просмотр каталога</div>
              </div>
            </Button>
            <Button
              onClick={fetchModels}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 h-16"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🔄</div>
                <div>Обновить данные</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
