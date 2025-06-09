"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Save, Plus, Trash2, ArrowLeft, Settings, Truck, Activity, Car } from "lucide-react"
import ModelsOverview from "./components/models-overview"

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
  },
  specifications: {
    general: [
      { label: "Длина", value: "", highlight: false },
      { label: "Ширина", value: "", highlight: false },
      { label: "Высота", value: "", highlight: false },
      { label: "Масса", value: "", highlight: true },
    ],
    boom: [
      { label: "Вертикальный вылет", value: "", highlight: true },
      { label: "Горизонтальный вылет", value: "", highlight: true },
      { label: "Глубина подачи", value: "", highlight: false },
      { label: "Минимальный радиус", value: "", highlight: false },
    ],
    pump: [
      { label: "Производительность", value: "", highlight: true },
      { label: "Давление бетона", value: "", highlight: false },
      { label: "Диаметр цилиндра", value: "", highlight: false },
      { label: "Длина хода", value: "", highlight: false },
    ],
    chassis: [
      { label: "Шасси", value: "", highlight: false },
      { label: "Двигатель", value: "", highlight: false },
      { label: "Мощность", value: "", highlight: false },
      { label: "Макс. скорость", value: "", highlight: false },
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

export default function AdminModelsPage() {
  const [models, setModels] = useState<Array<{ id: string; title: string; model: string }>>([])
  const [selectedModelId, setSelectedModelId] = useState<string>("")
  const [modelData, setModelData] = useState<ModelData>(initialModelData)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showOverview, setShowOverview] = useState(true)

  // Загрузка списка моделей
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
    }
  }

  // Загрузка данных конкретной модели
  const loadModel = async (modelId: string) => {
    if (!modelId) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/models?id=${modelId}`)
      const result = await response.json()
      if (result.success) {
        setModelData(result.data)
        setIsEditing(true)
      }
    } catch (error) {
      console.error("Ошибка загрузки модели:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Сохранение модели
  const saveModel = async () => {
    setIsLoading(true)
    try {
      const method = modelData.id ? "PUT" : "POST"
      const response = await fetch("/api/models", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modelData),
      })

      const result = await response.json()
      if (result.success) {
        console.log("✅ Модель успешно сохранена!")
        fetchModels()
        if (!modelData.id) {
          setModelData(initialModelData)
          setIsEditing(false)
        }
      }
    } catch (error) {
      console.error("❌ Ошибка сохранения модели")
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

        {showOverview ? (
          <ModelsOverview onEditModel={handleEditModel} />
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Список моделей */}
            <div className="lg:col-span-1">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Модели
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => {
                      setModelData(initialModelData)
                      setIsEditing(true)
                      setSelectedModelId("")
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Новая модель
                  </Button>

                  <div className="space-y-2">
                    {models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModelId(model.id)
                          loadModel(model.id)
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedModelId === model.id
                            ? "bg-blue-600 text-white"
                            : "bg-zinc-800 hover:bg-zinc-700 text-gray-300"
                        }`}
                      >
                        <div className="font-medium text-sm">{model.model}</div>
                        <div className="text-xs opacity-75">{model.title}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content - Форма редактирования */}
            <div className="lg:col-span-3">
              {isEditing ? (
                <div className="space-y-6">
                  {/* Основная информация */}
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-white">📋 Основная информация</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white">Модель</Label>
                          <Input
                            value={modelData.model}
                            onChange={(e) => updateField("model", e.target.value)}
                            className="bg-zinc-800 text-white border-zinc-700"
                            placeholder="SANY SYM5365THBFS 530S"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Заголовок</Label>
                          <Input
                            value={modelData.title}
                            onChange={(e) => updateField("title", e.target.value)}
                            className="bg-zinc-800 text-white border-zinc-700"
                            placeholder="SANY SYM5365THBFS 530S"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-white">Описание</Label>
                        <Textarea
                          value={modelData.subtitle}
                          onChange={(e) => updateField("subtitle", e.target.value)}
                          className="bg-zinc-800 text-white border-zinc-700"
                          placeholder="Автобетононасос с высотой подачи 53 метра"
                        />
                      </div>

                      <div>
                        <Label className="text-white">Изображение (URL)</Label>
                        <Input
                          value={modelData.image}
                          onChange={(e) => updateField("image", e.target.value)}
                          className="bg-zinc-800 text-white border-zinc-700"
                          placeholder="/images/pump1.jpg"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Ключевые характеристики */}
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-white">🎯 Ключевые характеристики</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white">Высота подачи</Label>
                          <Input
                            value={modelData.keySpecs.height}
                            onChange={(e) => updateField("keySpecs.height", e.target.value)}
                            className="bg-zinc-800 text-white border-zinc-700"
                            placeholder="53м"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Производительность</Label>
                          <Input
                            value={modelData.keySpecs.performance}
                            onChange={(e) => updateField("keySpecs.performance", e.target.value)}
                            className="bg-zinc-800 text-white border-zinc-700"
                            placeholder="180 м³/ч"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Горизонтальный вылет</Label>
                          <Input
                            value={modelData.keySpecs.reach}
                            onChange={(e) => updateField("keySpecs.reach", e.target.value)}
                            className="bg-zinc-800 text-white border-zinc-700"
                            placeholder="48.5м"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Масса</Label>
                          <Input
                            value={modelData.keySpecs.weight}
                            onChange={(e) => updateField("keySpecs.weight", e.target.value)}
                            className="bg-zinc-800 text-white border-zinc-700"
                            placeholder="36 500 кг"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Технические характеристики */}
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-white">⚙️ Технические характеристики</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {Object.entries(modelData.specifications).map(([category, specs]) => (
                        <div key={category}>
                          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            {category === "general" && <Settings className="w-5 h-5" />}
                            {category === "boom" && <Activity className="w-5 h-5" />}
                            {category === "pump" && <Activity className="w-5 h-5" />}
                            {category === "chassis" && <Car className="w-5 h-5" />}
                            {category === "general" && "Общие характеристики"}
                            {category === "boom" && "Характеристики стрелы"}
                            {category === "pump" && "Насосная система"}
                            {category === "chassis" && "Шасси и двигатель"}
                          </h4>
                          <div className="space-y-3">
                            {specs.map((spec, index) => (
                              <div key={index} className="grid md:grid-cols-3 gap-3 items-center">
                                <Input
                                  value={spec.label}
                                  onChange={(e) =>
                                    updateField(`specifications.${category}.${index}.label`, e.target.value)
                                  }
                                  className="bg-zinc-800 text-white border-zinc-700"
                                  placeholder="Название характеристики"
                                />
                                <Input
                                  value={spec.value}
                                  onChange={(e) =>
                                    updateField(`specifications.${category}.${index}.value`, e.target.value)
                                  }
                                  className="bg-zinc-800 text-white border-zinc-700"
                                  placeholder="Значение"
                                />
                                <div className="flex items-center gap-2">
                                  <label className="flex items-center gap-2 text-white">
                                    <input
                                      type="checkbox"
                                      checked={spec.highlight || false}
                                      onChange={(e) =>
                                        updateField(`specifications.${category}.${index}.highlight`, e.target.checked)
                                      }
                                      className="rounded"
                                    />
                                    Выделить
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Особенности и преимущества */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-zinc-900 border-zinc-800">
                      <CardHeader>
                        <CardTitle className="text-white">✨ Особенности</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {modelData.features.map((feature, index) => (
                          <div key={index} className="flex gap-2">
                            <Textarea
                              value={feature}
                              onChange={(e) => updateField(`features.${index}`, e.target.value)}
                              className="bg-zinc-800 text-white border-zinc-700 flex-1"
                              placeholder="Особенность модели"
                              rows={2}
                            />
                            <Button
                              onClick={() => removeArrayItem("features", index)}
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          onClick={() => addArrayItem("features")}
                          variant="outline"
                          className="w-full border-blue-600 text-blue-400 hover:bg-blue-600"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Добавить особенность
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-zinc-900 border-zinc-800">
                      <CardHeader>
                        <CardTitle className="text-white">🎯 Преимущества</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {modelData.advantages.map((advantage, index) => (
                          <div key={index} className="flex gap-2">
                            <Textarea
                              value={advantage}
                              onChange={(e) => updateField(`advantages.${index}`, e.target.value)}
                              className="bg-zinc-800 text-white border-zinc-700 flex-1"
                              placeholder="Преимущество модели"
                              rows={2}
                            />
                            <Button
                              onClick={() => removeArrayItem("advantages", index)}
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          onClick={() => addArrayItem("advantages")}
                          variant="outline"
                          className="w-full border-blue-600 text-blue-400 hover:bg-blue-600"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Добавить преимущество
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Условия поставки */}
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Truck className="w-5 h-5" />
                        Условия поставки
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white">Место отгрузки</Label>
                          <Input
                            value={modelData.delivery.location}
                            onChange={(e) => updateField("delivery.location", e.target.value)}
                            className="bg-zinc-800 text-white border-zinc-700"
                            placeholder="Владивосток"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Срок поставки</Label>
                          <Input
                            value={modelData.delivery.term}
                            onChange={(e) => updateField("delivery.term", e.target.value)}
                            className="bg-zinc-800 text-white border-zinc-700"
                            placeholder="30-45 дней"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Гарантия</Label>
                          <Input
                            value={modelData.delivery.warranty}
                            onChange={(e) => updateField("delivery.warranty", e.target.value)}
                            className="bg-zinc-800 text-white border-zinc-700"
                            placeholder="12 месяцев"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Условия оплаты</Label>
                          <Input
                            value={modelData.delivery.payment}
                            onChange={(e) => updateField("delivery.payment", e.target.value)}
                            className="bg-zinc-800 text-white border-zinc-700"
                            placeholder="Предоплата 30%, остальное при поставке"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Кнопки действий */}
                  <div className="flex gap-4">
                    <Button onClick={saveModel} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? "Сохранение..." : "💾 Сохранить модель"}
                    </Button>
                    {modelData.id && (
                      <Button
                        onClick={async () => {
                          if (confirm("Вы уверены, что хотите удалить эту модель?")) {
                            try {
                              const response = await fetch(`/api/models?id=${modelData.id}`, {
                                method: "DELETE",
                              })
                              const result = await response.json()
                              if (result.success) {
                                alert("Модель успешно удалена!")
                                fetchModels()
                                setIsEditing(false)
                                setModelData(initialModelData)
                                setSelectedModelId("")
                              }
                            } catch (error) {
                              console.error("Ошибка удаления:", error)
                              alert("Ошибка удаления модели")
                            }
                          }
                        }}
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Удалить модель
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        setIsEditing(false)
                        setModelData(initialModelData)
                        setSelectedModelId("")
                      }}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Отмена
                    </Button>
                  </div>
                </div>
              ) : (
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-12 text-center">
                    <Settings className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Выберите модель для редактирования</h3>
                    <p className="text-gray-400">Выберите модель из списка слева или создайте новую</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
