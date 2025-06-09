"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  Edit3,
  Save,
  Eye,
  EyeOff,
  GripVertical,
  Plus,
  Trash2,
  AlertCircle,
  DollarSign,
  ImageIcon,
  FileText,
  Settings,
} from "lucide-react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"

interface PortfolioCard {
  id: string
  name: string
  category: string
  price: string
  image: string
  specs: {
    reach: string
    output: string
    engine: string
    weight: string
  }
  description: string
  features: string[]
  isVisible: boolean
  order: number
}

export default function PortfolioCardsContent() {
  const [cards, setCards] = useState<PortfolioCard[]>([])
  const [editingCard, setEditingCard] = useState<PortfolioCard | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const { toast } = useToast()

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = async () => {
    try {
      setIsLoading(true)
      setError("")

      const response = await fetch("/api/portfolio-cards")
      const result = await response.json()

      if (result.success) {
        // Получаем все карточки (включая скрытые) для админ панели
        const allCardsResponse = await fetch("/api/portfolio-cards?includeHidden=true")
        const allCardsResult = await allCardsResponse.json()

        if (allCardsResult.success) {
          setCards(allCardsResult.data.sort((a: PortfolioCard, b: PortfolioCard) => a.order - b.order))
        } else {
          setCards(result.data)
        }
      } else {
        throw new Error(result.error || "Ошибка загрузки карточек")
      }
    } catch (error) {
      console.error("Ошибка загрузки карточек:", error)
      setError(`Ошибка загрузки: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`)
    } finally {
      setIsLoading(false)
    }
  }

  const saveCard = async (card: PortfolioCard) => {
    try {
      setIsLoading(true)
      setError("")

      const response = await fetch("/api/portfolio-cards", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(card),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "✅ Карточка обновлена",
          description: "Изменения успешно сохранены",
        })

        // Обновляем локальные данные
        setCards((prev) => prev.map((c) => (c.id === card.id ? result.data : c)))
        setEditingCard(null)
      } else {
        throw new Error(result.error || "Ошибка сохранения")
      }
    } catch (error) {
      console.error("Ошибка сохранения:", error)
      setError(`Ошибка сохранения: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleVisibility = async (cardId: string) => {
    const card = cards.find((c) => c.id === cardId)
    if (!card) return

    const updatedCard = { ...card, isVisible: !card.isVisible }
    await saveCard(updatedCard)
  }

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(cards)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Обновляем порядок
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }))

    setCards(updatedItems)

    // Сохраняем новый порядок на сервере
    try {
      const response = await fetch("/api/portfolio-cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "reorder",
          cardIds: updatedItems.map((item) => item.id),
        }),
      })

      const result = await response.json()
      if (!result.success) {
        throw new Error(result.error)
      }

      toast({
        title: "✅ Порядок обновлен",
        description: "Новый порядок карточек сохранен",
      })
    } catch (error) {
      console.error("Ошибка изменения порядка:", error)
      toast({
        title: "❌ Ошибка",
        description: "Не удалось сохранить новый порядок",
        variant: "destructive",
      })
      // Возвращаем предыдущий порядок
      fetchCards()
    }
  }

  const updateEditingCard = (field: string, value: any) => {
    if (!editingCard) return

    setEditingCard((prev) => {
      if (!prev) return prev

      const keys = field.split(".")
      const newCard = { ...prev }
      let current: any = newCard

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {}
        }
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      return newCard
    })
  }

  const addFeature = () => {
    if (!editingCard) return
    setEditingCard((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        features: [...prev.features, ""],
      }
    })
  }

  const removeFeature = (index: number) => {
    if (!editingCard) return
    setEditingCard((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        features: prev.features.filter((_, i) => i !== index),
      }
    })
  }

  const updateFeature = (index: number, value: string) => {
    if (!editingCard) return
    setEditingCard((prev) => {
      if (!prev) return prev
      const newFeatures = [...prev.features]
      newFeatures[index] = value
      return {
        ...prev,
        features: newFeatures,
      }
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
            <h1 className="text-3xl font-bold">🎯 Управление карточками на главной</h1>
          </div>
          <p className="text-gray-400">Редактирование карточек моделей, отображаемых на главной странице сайта</p>
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

        {editingCard ? (
          /* Форма редактирования */
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="w-5 h-5" />
                Редактирование карточки: {editingCard.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Основная информация */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Название модели</Label>
                  <Input
                    id="name"
                    value={editingCard.name}
                    onChange={(e) => updateEditingCard("name", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Категория</Label>
                  <Input
                    id="category"
                    value={editingCard.category}
                    onChange={(e) => updateEditingCard("category", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="price" className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Цена
                  </Label>
                  <Input
                    id="price"
                    value={editingCard.price}
                    onChange={(e) => updateEditingCard("price", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Цена по запросу"
                  />
                </div>
                <div>
                  <Label htmlFor="image" className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    URL изображения
                  </Label>
                  <Input
                    id="image"
                    value={editingCard.image}
                    onChange={(e) => updateEditingCard("image", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="/images/pump1.jpg"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Описание
                </Label>
                <Textarea
                  id="description"
                  value={editingCard.description}
                  onChange={(e) => updateEditingCard("description", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                />
              </div>

              <Separator />

              {/* Характеристики */}
              <div>
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Ключевые характеристики
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <Label htmlFor="reach">Высота подачи</Label>
                    <Input
                      id="reach"
                      value={editingCard.specs.reach}
                      onChange={(e) => updateEditingCard("specs.reach", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="output">Производительность</Label>
                    <Input
                      id="output"
                      value={editingCard.specs.output}
                      onChange={(e) => updateEditingCard("specs.output", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="engine">Двигатель</Label>
                    <Input
                      id="engine"
                      value={editingCard.specs.engine}
                      onChange={(e) => updateEditingCard("specs.engine", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Масса</Label>
                    <Input
                      id="weight"
                      value={editingCard.specs.weight}
                      onChange={(e) => updateEditingCard("specs.weight", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Особенности */}
              <div>
                <Label className="text-lg font-semibold">Особенности</Label>
                <div className="space-y-2 mt-4">
                  {editingCard.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="Особенность модели"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeFeature(index)}
                        className="border-red-600 text-red-400 hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={addFeature}
                    className="w-full border-blue-600 text-blue-400 hover:bg-blue-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить особенность
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Настройки отображения */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-lg font-semibold">Отображение на сайте</Label>
                  <p className="text-gray-400 text-sm">Показывать эту карточку на главной странице</p>
                </div>
                <Switch
                  checked={editingCard.isVisible}
                  onCheckedChange={(checked) => updateEditingCard("isVisible", checked)}
                />
              </div>

              {/* Кнопки действий */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
                <Button
                  variant="outline"
                  onClick={() => setEditingCard(null)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Отмена
                </Button>
                <Button
                  onClick={() => saveCard(editingCard)}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Сохранение...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Сохранить
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Список карточек */
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Карточки на главной странице</h2>
              <Badge variant="secondary">{cards.length} карточек</Badge>
            </div>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Управление карточками</CardTitle>
                <p className="text-gray-400 text-sm">
                  Перетаскивайте карточки для изменения порядка. Используйте переключатели для скрытия/показа карточек.
                </p>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="cards">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                          {cards.map((card, index) => (
                            <Draggable key={card.id} draggableId={card.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className={`bg-zinc-800 border border-zinc-700 rounded-lg p-4 transition-all ${
                                    snapshot.isDragging ? "shadow-lg scale-105" : ""
                                  }`}
                                >
                                  <div className="flex items-center gap-4">
                                    <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing">
                                      <GripVertical className="w-5 h-5 text-gray-400" />
                                    </div>

                                    <div className="w-16 h-16 bg-zinc-700 rounded-lg overflow-hidden flex-shrink-0">
                                      <img
                                        src={card.image || "/placeholder.svg?height=64&width=64"}
                                        alt={card.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          const target = e.target as HTMLImageElement
                                          target.src = "/placeholder.svg?height=64&width=64"
                                        }}
                                      />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                      <h3 className="font-semibold text-white truncate">{card.name}</h3>
                                      <p className="text-gray-400 text-sm truncate">{card.description}</p>
                                      <div className="flex items-center gap-4 mt-2">
                                        <Badge variant="outline">{card.category}</Badge>
                                        <span className="text-green-400 font-semibold">{card.price}</span>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => toggleVisibility(card.id)}
                                        className={
                                          card.isVisible
                                            ? "border-green-600 text-green-400 hover:bg-green-600"
                                            : "border-gray-600 text-gray-400 hover:bg-gray-600"
                                        }
                                      >
                                        {card.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                      </Button>

                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setEditingCard(card)}
                                        className="border-blue-600 text-blue-400 hover:bg-blue-600"
                                      >
                                        <Edit3 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
