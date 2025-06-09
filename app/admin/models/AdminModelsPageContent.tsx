"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, ArrowLeft, Settings, Truck, Activity, Car, AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ModelData {
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
    pressure: string
    cylinderDiameter: string
    strokeLength: string
    chassis: string
    engine: string
    power: string
    maxSpeed: string
    length: string
    width: string
    totalHeight: string
    depthReach: string
    minRadius: string
  }
  specifications: {
    general: Array<{ label: string; value: string; highlight?: boolean }>
    boom: Array<{ label: string; value: string; highlight?: boolean }>
    pump: Array<{ label: string; value: string; highlight?: boolean }>
    chassis: Array<{ label: string; value: string; highlight?: boolean }>
  }
  features: string[]
  advantages: string[]
  delivery: {
    location: string
    term: string
    warranty: string
    payment: string
  }
}

const initialModelData: ModelData = {
  id: "",
  model: "",
  title: "",
  subtitle: "",
  image: "",
  keySpecs: {
    height: "",
    performance: "",
    reach: "",
    weight: "",
    pressure: "",
    cylinderDiameter: "",
    strokeLength: "",
    chassis: "",
    engine: "",
    power: "",
    maxSpeed: "",
    length: "",
    width: "",
    totalHeight: "",
    depthReach: "",
    minRadius: "",
  },
  specifications: {
    general: [
      { label: "Длина", value: "", highlight: false },
      { label: "Ширина", value: "", highlight: false },
      { label: "Высота", value: "", highlight: false },
      { label: "Масса", value: "", highlight: true },
      { label: "Колесная формула", value: "", highlight: false },
      { label: "Дорожный просвет", value: "", highlight: false },
    ],
    boom: [
      { label: "Вертикальный вылет", value: "", highlight: true },
      { label: "Горизонтальный вылет", value: "", highlight: true },
      { label: "Глубина подачи", value: "", highlight: false },
      { label: "Минимальный радиус", value: "", highlight: false },
      { label: "Количество секций", value: "", highlight: false },
      { label: "Угол поворота", value: "", highlight: false },
    ],
    pump: [
      { label: "Производительность", value: "", highlight: true },
      { label: "Давление бетона", value: "", highlight: false },
      { label: "Диаметр цилиндра", value: "", highlight: false },
      { label: "Длина хода", value: "", highlight: false },
      { label: "Частота качания", value: "", highlight: false },
      { label: "Объем бункера", value: "", highlight: false },
    ],
    chassis: [
      { label: "Шасси", value: "", highlight: false },
      { label: "Двигатель", value: "", highlight: false },
      { label: "Мощность", value: "", highlight: false },
      { label: "Макс. скорость", value: "", highlight: false },
      { label: "Топливный бак", value: "", highlight: false },
      { label: "Коробка передач", value: "", highlight: false },
    ],
  },
  features: [""],
  advantages: [""],
  delivery: {
    location: "",
    term: "",
    warranty: "",
    payment: "",
  },
}

export default function AdminModelsPageContent() {
  const [models, setModels] = useState<ModelData[]>([])
  const [selectedModelId, setSelectedModelId] = useState<string>("")
  const [modelData, setModelData] = useState<ModelData>(initialModelData)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showOverview, setShowOverview] = useState(true)
  const [error, setError] = useState<string>("")
  const [activeTab, setActiveTab] = useState("general")

  // Загрузка списка моделей
  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    try {
      setIsLoading(true)
      setError("")

      console.log("🔄 Загрузка моделей...")
      const response = await fetch("/api/models")

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const text = await response.text()
      console.log("📄 Ответ сервера:", text.substring(0, 200) + "...")

      if (!text.trim()) {
        throw new Error("Пустой ответ от сервера")
      }

      let result
      try {
        result = JSON.parse(text)
      } catch (parseError) {
        console.error("❌ Ошибка парсинга JSON:", parseError)
        throw new Error("Неверный формат ответа от сервера")
      }

      if (result.success && Array.isArray(result.data)) {
        console.log("✅ Модели загружены:", result.data.length)
        setModels(result.data)
      } else {
        throw new Error(result.error || "Неверный формат данных")
      }
    } catch (error) {
      console.error("❌ Ошибка загрузки моделей:", error)
      setError(`Ошибка загрузки моделей: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`)
      setModels([])
    } finally {
      setIsLoading(false)
    }
  }

  // Загрузка данных конкретной модели
  const loadModel = async (modelId: string) => {
    if (!modelId) return

    setIsLoading(true)
    try {
      console.log("🔄 Загрузка модели:", modelId)
      const response = await fetch(`/api/models?id=${modelId}`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const text = await response.text()
      if (!text.trim()) {
        throw new Error("Пустой ответ от сервера")
      }

      const result = JSON.parse(text)
      if (result.success) {
        console.log("✅ Модель загружена:", result.data.title)
        setModelData(result.data)
        setIsEditing(true)
      } else {
        throw new Error(result.error || "Модель не найдена")
      }
    } catch (error) {
      console.error("❌ Ошибка загрузки модели:", error)
      setError(`Ошибка загрузки модели: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Сохранение модели
  const saveModel = async () => {
    // Проверяем обязательные поля
    if (!modelData.title.trim()) {
      setError("Название модели обязательно для заполнения")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      console.log("💾 Сохранение модели:", modelData.title)

      const method = modelData.id && selectedModelId ? "PUT" : "POST"
      const response = await fetch("/api/models", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modelData),
      })

      console.log("📡 Ответ сервера:", response.status, response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Ошибка HTTP:", errorText)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const text = await response.text()
      console.log("📄 Тело ответа:", text.substring(0, 200) + "...")

      if (!text.trim()) {
        throw new Error("Пустой ответ от сервера")
      }

      let result
      try {
        result = JSON.parse(text)
      } catch (parseError) {
        console.error("❌ Ошибка парсинга JSON:", parseError)
        throw new Error("Неверный формат ответа от сервера")
      }

      if (result.success) {
        console.log("✅ Модель успешно сохранена!")
        await fetchModels()
        if (!selectedModelId) {
          setModelData(initialModelData)
          setIsEditing(false)
          setShowOverview(true)
        }
        setError("")
      } else {
        throw new Error(result.error || "Ошибка сохранения")
      }
    } catch (error) {
      console.error("❌ Ошибка сохранения модели:", error)
      setError(`Ошибка сохранения модели: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Обновление поля модели
  const updateField = (path: string, value: any) => {
    setModelData((prev) => {
      const newData = { ...prev }
      const keys = path.split(".")
      let current: any = newData

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = value

      return newData
    })
  }

  // Обновление поля в массиве спецификаций
  const updateSpecField = (category: string, index: number, field: string, value: any) => {
    setModelData((prev) => {
      const newData = { ...prev }
      newData.specifications[category as keyof typeof newData.specifications][index][
        field as keyof { label: string; value: string; highlight?: boolean }
      ] = value
      return newData
    })
  }

  // Добавление элемента в массив
  const addArrayItem = (path: string) => {
    setModelData((prev) => {
      const newData = { ...prev }
      const keys = path.split(".")
      let current: any = newData

      for (const key of keys) {
        current = current[key]
      }
      current.push("")

      return newData
    })
  }

  // Удаление элемента из массива
  const removeArrayItem = (path: string, index: number) => {
    setModelData((prev) => {
      const newData = { ...prev }
      const keys = path.split(".")
      let current: any = newData

      for (const key of keys) {
        current = current[key]
      }
      current.splice(index, 1)

      return newData
    })
  }

  const handleEditModel = (modelId: string) => {
    setSelectedModelId(modelId)
    loadModel(modelId)
    setShowOverview(false)
  }

  const handleBackToOverview = () => {
    setShowOverview(true)
    setIsEditing(false)
    setModelData(initialModelData)
    setSelectedModelId("")
    setError("")
  }

  const handleCreateNew = () => {
    setModelData(initialModelData)
    setIsEditing(true)
    setSelectedModelId("")
    setShowOverview(false)
  }

  // Обновление массива features или advantages
  const updateArrayItem = (path: string, index: number, value: string) => {
    setModelData((prev) => {
      const newData = { ...prev }
      const keys = path.split(".")
      let current: any = newData

      for (const key of keys) {
        current = current[key]
      }
      current[index] = value

      return newData
    })
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <a href="/admin" className="text-blue-400 hover:text-blue-300">
              <ArrowLeft className="w-6 h-6" />
            </a>
            <h1 className="text-3xl font-bold">🚛 Управление моделями</h1>
            {!showOverview && (
              <Button
                onClick={handleBackToOverview}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                ← Назад к обзору
              </Button>
            )}
          </div>
          <p className="text-gray-400">
            {showOverview
              ? "Обзор и управление всеми моделями автобетононасосов"
              : "Редактирование характеристик автобетононасоса"}
          </p>
        </div>

        {/* Ошибки */}
        {error && (
          <Card className="bg-red-900/20 border-red-800 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
                <Button
                  onClick={() => setError("")}
                  variant="outline"
                  size="sm"
                  className="ml-auto border-red-600 text-red-400 hover:bg-red-600"
                >
                  Закрыть
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {showOverview ? (
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
                      <p className="text-2xl font-bold text-white">86м</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-600 rounded-lg">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Макс. производительность</p>
                      <p className="text-2xl font-bold text-white">200 м³/ч</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-600 rounded-lg">
                      <Car className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Диапазон массы</p>
                      <p className="text-2xl font-bold text-white">37-75т</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Кнопка создания новой модели */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Модели автобетононасосов</h2>
              <Button onClick={handleCreateNew} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Добавить модель
              </Button>
            </div>

            {/* Сетка моделей */}
            {isLoading ? (
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
            ) : models.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {models.map((model) => (
                  <Card key={model.id} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
                    <CardHeader className="pb-4">
                      <div className="aspect-video bg-zinc-800 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={model.image || "/placeholder.svg?height=200&width=300"}
                          alt={model.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=200&width=300"
                          }}
                        />
                      </div>
                      <CardTitle className="text-white text-lg">{model.model || model.title}</CardTitle>
                      <p className="text-gray-400 text-sm">{model.subtitle}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-3 bg-zinc-800 rounded-lg">
                          <p className="text-blue-400 font-semibold">{model.keySpecs?.height || "N/A"}</p>
                          <p className="text-gray-400 text-xs">Высота</p>
                        </div>
                        <div className="text-center p-3 bg-zinc-800 rounded-lg">
                          <p className="text-green-400 font-semibold">{model.keySpecs?.performance || "N/A"}</p>
                          <p className="text-gray-400 text-xs">Производительность</p>
                        </div>
                        <div className="text-center p-3 bg-zinc-800 rounded-lg">
                          <p className="text-purple-400 font-semibold">{model.keySpecs?.reach || "N/A"}</p>
                          <p className="text-gray-400 text-xs">Вылет</p>
                        </div>
                        <div className="text-center p-3 bg-zinc-800 rounded-lg">
                          <p className="text-orange-400 font-semibold">{model.keySpecs?.weight || "N/A"}</p>
                          <p className="text-gray-400 text-xs">Масса</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEditModel(model.id)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          size="sm"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Редактировать
                        </Button>
                        <Button
                          onClick={() => window.open(`/models/${model.id}`, "_blank")}
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          size="sm"
                        >
                          👁️
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-12 text-center">
                  <Truck className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Модели не найдены</h3>
                  <p className="text-gray-400 mb-4">Создайте первую модель автобетононасоса</p>
                  <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Создать модель
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Форма редактирования модели */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">
                  {selectedModelId ? `Редактирование модели: ${modelData.model}` : "Создание новой модели"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="bg-gray-800 border-gray-700">
                    <TabsTrigger value="general">Основное</TabsTrigger>
                    <TabsTrigger value="specs">Характеристики</TabsTrigger>
                    <TabsTrigger value="features">Особенности</TabsTrigger>
                    <TabsTrigger value="delivery">Доставка</TabsTrigger>
                  </TabsList>

                  {/* Основная информация */}
                  <TabsContent value="general" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          ID модели (автоматически)
                        </label>
                        <Input
                          value={modelData.id}
                          onChange={(e) => updateField("id", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="Будет сгенерирован автоматически"
                          disabled={!!selectedModelId}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {selectedModelId
                            ? "ID нельзя изменить для существующей модели"
                            : "Оставьте пустым для автогенерации"}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Модель *</label>
                        <Input
                          value={modelData.model}
                          onChange={(e) => updateField("model", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="SANY 530S"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Заголовок *</label>
                        <Input
                          value={modelData.title}
                          onChange={(e) => updateField("title", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="Автобетононасос SANY 530S"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Подзаголовок</label>
                        <Input
                          value={modelData.subtitle}
                          onChange={(e) => updateField("subtitle", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="Мощный автобетононасос с высотой подачи 53 метра"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1">URL изображения</label>
                        <Input
                          value={modelData.image}
                          onChange={(e) => updateField("image", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="/images/pump1.jpg"
                        />
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-6">
                      <h3 className="text-lg font-medium text-white mb-4">Ключевые характеристики</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Высота подачи</label>
                          <Input
                            value={modelData.keySpecs.height}
                            onChange={(e) => updateField("keySpecs.height", e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="53 м"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Производительность</label>
                          <Input
                            value={modelData.keySpecs.performance}
                            onChange={(e) => updateField("keySpecs.performance", e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="160 м³/ч"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Горизонтальный вылет</label>
                          <Input
                            value={modelData.keySpecs.reach}
                            onChange={(e) => updateField("keySpecs.reach", e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="47 м"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Масса</label>
                          <Input
                            value={modelData.keySpecs.weight}
                            onChange={(e) => updateField("keySpecs.weight", e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="38 т"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Характеристики */}
                  <TabsContent value="specs" className="space-y-6">
                    <Tabs defaultValue="general-specs" className="space-y-6">
                      <TabsList className="bg-gray-800 border-gray-700">
                        <TabsTrigger value="general-specs">Общие</TabsTrigger>
                        <TabsTrigger value="boom-specs">Стрела</TabsTrigger>
                        <TabsTrigger value="pump-specs">Насос</TabsTrigger>
                        <TabsTrigger value="chassis-specs">Шасси</TabsTrigger>
                      </TabsList>

                      {/* Общие характеристики */}
                      <TabsContent value="general-specs" className="space-y-4">
                        {modelData.specifications.general.map((spec, index) => (
                          <div key={index} className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-5">
                              <Input
                                value={spec.label}
                                onChange={(e) => updateSpecField("general", index, "label", e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white"
                              />
                            </div>
                            <div className="col-span-5">
                              <Input
                                value={spec.value}
                                onChange={(e) => updateSpecField("general", index, "value", e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white"
                              />
                            </div>
                            <div className="col-span-2 flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={spec.highlight}
                                onChange={(e) => updateSpecField("general", index, "highlight", e.target.checked)}
                                className="w-4 h-4"
                              />
                              <span className="text-sm text-gray-400">Выделить</span>
                            </div>
                          </div>
                        ))}
                      </TabsContent>

                      {/* Характеристики стрелы */}
                      <TabsContent value="boom-specs" className="space-y-4">
                        {modelData.specifications.boom.map((spec, index) => (
                          <div key={index} className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-5">
                              <Input
                                value={spec.label}
                                onChange={(e) => updateSpecField("boom", index, "label", e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white"
                              />
                            </div>
                            <div className="col-span-5">
                              <Input
                                value={spec.value}
                                onChange={(e) => updateSpecField("boom", index, "value", e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white"
                              />
                            </div>
                            <div className="col-span-2 flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={spec.highlight}
                                onChange={(e) => updateSpecField("boom", index, "highlight", e.target.checked)}
                                className="w-4 h-4"
                              />
                              <span className="text-sm text-gray-400">Выделить</span>
                            </div>
                          </div>
                        ))}
                      </TabsContent>

                      {/* Характеристики насоса */}
                      <TabsContent value="pump-specs" className="space-y-4">
                        {modelData.specifications.pump.map((spec, index) => (
                          <div key={index} className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-5">
                              <Input
                                value={spec.label}
                                onChange={(e) => updateSpecField("pump", index, "label", e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white"
                              />
                            </div>
                            <div className="col-span-5">
                              <Input
                                value={spec.value}
                                onChange={(e) => updateSpecField("pump", index, "value", e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white"
                              />
                            </div>
                            <div className="col-span-2 flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={spec.highlight}
                                onChange={(e) => updateSpecField("pump", index, "highlight", e.target.checked)}
                                className="w-4 h-4"
                              />
                              <span className="text-sm text-gray-400">Выделить</span>
                            </div>
                          </div>
                        ))}
                      </TabsContent>

                      {/* Характеристики шасси */}
                      <TabsContent value="chassis-specs" className="space-y-4">
                        {modelData.specifications.chassis.map((spec, index) => (
                          <div key={index} className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-5">
                              <Input
                                value={spec.label}
                                onChange={(e) => updateSpecField("chassis", index, "label", e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white"
                              />
                            </div>
                            <div className="col-span-5">
                              <Input
                                value={spec.value}
                                onChange={(e) => updateSpecField("chassis", index, "value", e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white"
                              />
                            </div>
                            <div className="col-span-2 flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={spec.highlight}
                                onChange={(e) => updateSpecField("chassis", index, "highlight", e.target.checked)}
                                className="w-4 h-4"
                              />
                              <span className="text-sm text-gray-400">Выделить</span>
                            </div>
                          </div>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </TabsContent>

                  {/* Особенности и преимущества */}
                  <TabsContent value="features" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">Особенности</h3>
                      {modelData.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                          <Input
                            value={feature}
                            onChange={(e) => updateArrayItem("features", index, e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem("features", index)}
                            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                          >
                            ✕
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => addArrayItem("features")}
                        className="mt-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                      >
                        + Добавить особенность
                      </Button>
                    </div>

                    <div className="border-t border-gray-700 pt-6">
                      <h3 className="text-lg font-medium text-white mb-4">Преимущества</h3>
                      {modelData.advantages.map((advantage, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                          <Input
                            value={advantage}
                            onChange={(e) => updateArrayItem("advantages", index, e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem("advantages", index)}
                            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                          >
                            ✕
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => addArrayItem("advantages")}
                        className="mt-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                      >
                        + Добавить преимущество
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Доставка и оплата */}
                  <TabsContent value="delivery" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Место доставки</label>
                        <Input
                          value={modelData.delivery.location}
                          onChange={(e) => updateField("delivery.location", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="Москва, Санкт-Петербург, регионы РФ"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Срок доставки</label>
                        <Input
                          value={modelData.delivery.term}
                          onChange={(e) => updateField("delivery.term", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="45-60 дней"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Гарантия</label>
                        <Input
                          value={modelData.delivery.warranty}
                          onChange={(e) => updateField("delivery.warranty", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="12 месяцев"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Условия оплаты</label>
                        <Input
                          value={modelData.delivery.payment}
                          onChange={(e) => updateField("delivery.payment", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="Предоплата 30%, остаток по факту готовности"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-700">
                  <Button
                    variant="outline"
                    onClick={handleBackToOverview}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Отмена
                  </Button>
                  <Button onClick={saveModel} className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                    {isLoading ? "Сохранение..." : selectedModelId ? "Сохранить изменения" : "Создать модель"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
