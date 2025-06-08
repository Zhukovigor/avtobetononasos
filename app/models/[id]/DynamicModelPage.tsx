"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import ProductPage, { type ProductData } from "../../components/product-page"
import { Ruler, ArrowUp, Activity, Car, Loader2 } from "lucide-react"

interface DynamicModelPageProps {
  modelId: string
}

export default function DynamicModelPage({ modelId }: DynamicModelPageProps) {
  const [productData, setProductData] = useState<ProductData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/models?id=${modelId}`)
        const result = await response.json()

        if (!result.success) {
          setError("Модель не найдена")
          return
        }

        const model = result.data

        // Преобразуем данные в формат ProductData
        const transformedData: ProductData = {
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
    notFound()
  }

  return <ProductPage data={productData} />
}
