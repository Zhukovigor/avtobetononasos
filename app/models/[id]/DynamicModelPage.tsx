"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ProductPage from "../../components/product-page"
import { Ruler, ArrowUp, Activity, Car, Loader2, AlertCircle } from "lucide-react"

interface DynamicModelPageProps {
  modelId: string
}

export default function DynamicModelPage({ modelId }: DynamicModelPageProps) {
  const [productData, setProductData] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        console.log("Загружаем модель:", modelId)

        const response = await fetch(`/api/models?id=${modelId}`)
        const result = await response.json()

        console.log("Ответ API:", result)

        if (!result.success) {
          setError(result.error || "Модель не найдена")
          return
        }

        const model = result.data

        // Преобразуем данные в формат ProductData
        const transformedData = {
          model: model.model,
          title: model.title,
          subtitle: model.subtitle,
          image: model.image,
          keySpecs: {
            height: model.keySpecs.height,
            performance: model.keySpecs.performance,
            reach: model.keySpecs.reach,
            weight: model.keySpecs.weight,
          },
          specifications: {
            general: model.specifications.general.map((spec: any) => ({
              ...spec,
              icon: <Ruler className="w-4 h-4" />,
            })),
            boom: model.specifications.boom.map((spec: any) => ({
              ...spec,
              icon: <ArrowUp className="w-4 h-4" />,
            })),
            pump: model.specifications.pump.map((spec: any) => ({
              ...spec,
              icon: <Activity className="w-4 h-4" />,
            })),
            chassis: model.specifications.chassis.map((spec: any) => ({
              ...spec,
              icon: <Car className="w-4 h-4" />,
            })),
          },
          features: model.features,
          advantages: model.advantages,
          delivery: model.delivery,
          pdfData: {
            model: model.model,
            height: model.keySpecs.height,
            performance: model.keySpecs.performance,
            image: model.image,
            specs: {
              length: model.keySpecs.length,
              width: model.keySpecs.width,
              height: model.keySpecs.totalHeight,
              weight: model.keySpecs.weight,
              verticalReach: model.keySpecs.height,
              horizontalReach: model.keySpecs.reach,
              depthReach: model.keySpecs.depthReach,
              minRadius: model.keySpecs.minRadius,
              performanceLow: model.keySpecs.performance,
              pressureLow: model.keySpecs.pressure,
              cylinderDiameter: model.keySpecs.cylinderDiameter,
              strokeLength: model.keySpecs.strokeLength,
              chassis: model.keySpecs.chassis,
              engine: model.keySpecs.engine,
              power: model.keySpecs.power,
              maxSpeed: model.keySpecs.maxSpeed,
            },
            delivery: model.delivery,
          },
        }

        setProductData(transformedData)
      } catch (error) {
        console.error("Ошибка загрузки модели:", error)
        setError("Ошибка загрузки данных модели")
      } finally {
        setIsLoading(false)
      }
    }

    fetchModelData()
  }, [modelId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Загрузка модели...</h2>
          <p className="text-gray-600">Пожалуйста, подождите</p>
        </div>
      </div>
    )
  }

  if (error || !productData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Модель не найдена</h1>
          <p className="text-gray-600 mb-8">
            {error || `Модель с ID "${modelId}" не существует или временно недоступна.`}
          </p>
          <div className="space-y-4">
            <button
              onClick={() => router.push("/")}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Вернуться на главную
            </button>
            <button
              onClick={() => router.push("/#catalog")}
              className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Посмотреть каталог
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <ProductPage data={productData} />
}
