"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Save, Loader2, Edit3, Plus, Trash2, Settings, Truck, Activity, ArrowUp } from "lucide-react"

interface ModelEditModalProps {
  model: any
  isOpen: boolean
  onClose: () => void
  onSave: (updatedModel: any) => void
  trigger?: React.ReactNode
}

export default function ModelEditModal({ model, isOpen, onClose, onSave, trigger }: ModelEditModalProps) {
  const [editedModel, setEditedModel] = useState(model)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const { toast } = useToast()

  useEffect(() => {
    setEditedModel(model)
  }, [model])

  const handleSave = async () => {
    try {
      setIsSaving(true)

      const response = await fetch("/api/models", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedModel),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Ошибка сохранения")
      }

      toast({
        title: "✅ Модель обновлена",
        description: "Изменения успешно сохранены",
      })

      onSave(result.data)
      onClose()
    } catch (error) {
      console.error("Ошибка сохранения:", error)
      toast({
        title: "❌ Ошибка сохранения",
        description: error instanceof Error ? error.message : "Неизвестная ошибка",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const updateField = (path: string, value: any) => {
    setEditedModel((prev: any) => {
      const newModel = { ...prev }
      const keys = path.split(".")
      let current = newModel

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {}
        }
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      return newModel
    })
  }

  const addFeature = () => {
    setEditedModel((prev: any) => ({
      ...prev,
      features: [...(prev.features || []), ""],
    }))
  }

  const removeFeature = (index: number) => {
    setEditedModel((prev: any) => ({
      ...prev,
      features: prev.features.filter((_: any, i: number) => i !== index),
    }))
  }

  const addAdvantage = () => {
    setEditedModel((prev: any) => ({
      ...prev,
      advantages: [...(prev.advantages || []), ""],
    }))
  }

  const removeAdvantage = (index: number) => {
    setEditedModel((prev: any) => ({
      ...prev,
      advantages: prev.advantages.filter((_: any, i: number) => i !== index),
    }))
  }

  const updateSpecification = (category: string, index: number, field: string, value: any) => {
    setEditedModel((prev: any) => {
      const newModel = { ...prev }
      if (!newModel.specifications) newModel.specifications = {}
      if (!newModel.specifications[category]) newModel.specifications[category] = []

      const newSpecs = [...newModel.specifications[category]]
      if (!newSpecs[index]) newSpecs[index] = {}
      newSpecs[index] = { ...newSpecs[index], [field]: value }

      newModel.specifications[category] = newSpecs
      return newModel
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="w-5 h-5" />
            Редактирование модели
          </DialogTitle>
          <DialogDescription>Внесите изменения в характеристики модели</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Основное</TabsTrigger>
            <TabsTrigger value="specs">Характеристики</TabsTrigger>
            <TabsTrigger value="features">Особенности</TabsTrigger>
            <TabsTrigger value="delivery">Поставка</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Основная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Название модели</Label>
                    <Input
                      id="title"
                      value={editedModel.title || ""}
                      onChange={(e) => updateField("title", e.target.value)}
                      placeholder="Название модели"
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Модель</Label>
                    <Input
                      id="model"
                      value={editedModel.model || ""}
                      onChange={(e) => updateField("model", e.target.value)}
                      placeholder="Код модели"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subtitle">Описание</Label>
                  <Textarea
                    id="subtitle"
                    value={editedModel.subtitle || ""}
                    onChange={(e) => updateField("subtitle", e.target.value)}
                    placeholder="Краткое описание модели"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="image">URL изображения</Label>
                  <Input
                    id="image"
                    value={editedModel.image || ""}
                    onChange={(e) => updateField("image", e.target.value)}
                    placeholder="/images/pump1.jpg"
                  />
                </div>

                <Separator />

                <div>
                  <Label className="text-lg font-semibold">Ключевые характеристики</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <Label htmlFor="height">Высота подачи</Label>
                      <Input
                        id="height"
                        value={editedModel.keySpecs?.height || ""}
                        onChange={(e) => updateField("keySpecs.height", e.target.value)}
                        placeholder="62 м"
                      />
                    </div>
                    <div>
                      <Label htmlFor="performance">Производительность</Label>
                      <Input
                        id="performance"
                        value={editedModel.keySpecs?.performance || ""}
                        onChange={(e) => updateField("keySpecs.performance", e.target.value)}
                        placeholder="180 м³/ч"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reach">Горизонт. вылет</Label>
                      <Input
                        id="reach"
                        value={editedModel.keySpecs?.reach || ""}
                        onChange={(e) => updateField("keySpecs.reach", e.target.value)}
                        placeholder="54 м"
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Масса</Label>
                      <Input
                        id="weight"
                        value={editedModel.keySpecs?.weight || ""}
                        onChange={(e) => updateField("keySpecs.weight", e.target.value)}
                        placeholder="53 т"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specs" className="space-y-6">
            {["general", "boom", "pump", "chassis"].map((category) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {category === "general" && <Settings className="w-5 h-5" />}
                    {category === "boom" && <ArrowUp className="w-5 h-5" />}
                    {category === "pump" && <Activity className="w-5 h-5" />}
                    {category === "chassis" && <Truck className="w-5 h-5" />}
                    {category === "general" && "Общие характеристики"}
                    {category === "boom" && "Характеристики стрелы"}
                    {category === "pump" && "Насосная система"}
                    {category === "chassis" && "Шасси и двигатель"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {editedModel.specifications?.[category]?.map((spec: any, index: number) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                        <div>
                          <Label>Параметр</Label>
                          <Input
                            value={spec.label || ""}
                            onChange={(e) => updateSpecification(category, index, "label", e.target.value)}
                            placeholder="Название параметра"
                          />
                        </div>
                        <div>
                          <Label>Значение</Label>
                          <Input
                            value={spec.value || ""}
                            onChange={(e) => updateSpecification(category, index, "value", e.target.value)}
                            placeholder="Значение"
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`highlight-${category}-${index}`}
                              checked={spec.highlight || false}
                              onChange={(e) => updateSpecification(category, index, "highlight", e.target.checked)}
                              className="rounded"
                            />
                            <Label htmlFor={`highlight-${category}-${index}`} className="text-sm">
                              Выделить
                            </Label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Особенности</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {editedModel.features?.map((feature: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...editedModel.features]
                        newFeatures[index] = e.target.value
                        updateField("features", newFeatures)
                      }}
                      placeholder="Особенность модели"
                    />
                    <Button variant="outline" size="icon" onClick={() => removeFeature(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addFeature} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить особенность
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Преимущества</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {editedModel.advantages?.map((advantage: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={advantage}
                      onChange={(e) => {
                        const newAdvantages = [...editedModel.advantages]
                        newAdvantages[index] = e.target.value
                        updateField("advantages", newAdvantages)
                      }}
                      placeholder="Преимущество модели"
                    />
                    <Button variant="outline" size="icon" onClick={() => removeAdvantage(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addAdvantage} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить преимущество
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Условия поставки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Место отгрузки</Label>
                    <Input
                      id="location"
                      value={editedModel.delivery?.location || ""}
                      onChange={(e) => updateField("delivery.location", e.target.value)}
                      placeholder="Владивосток, Россия"
                    />
                  </div>
                  <div>
                    <Label htmlFor="term">Срок поставки</Label>
                    <Input
                      id="term"
                      value={editedModel.delivery?.term || ""}
                      onChange={(e) => updateField("delivery.term", e.target.value)}
                      placeholder="30-45 дней"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="warranty">Гарантия</Label>
                    <Input
                      id="warranty"
                      value={editedModel.delivery?.warranty || ""}
                      onChange={(e) => updateField("delivery.warranty", e.target.value)}
                      placeholder="12 месяцев или 2000 м/ч"
                    />
                  </div>
                  <div>
                    <Label htmlFor="payment">Условия оплаты</Label>
                    <Input
                      id="payment"
                      value={editedModel.delivery?.payment || ""}
                      onChange={(e) => updateField("delivery.payment", e.target.value)}
                      placeholder="Предоплата 30%, остаток при получении"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Отмена
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
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
      </DialogContent>
    </Dialog>
  )
}
