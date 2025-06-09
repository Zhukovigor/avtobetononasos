"use client"

import { useState, useEffect } from "react"
import ProductPage, { type ProductData } from "../../components/product-page"
import { useModelData } from "../../components/model-data-provider"
import {
  Ruler,
  Weight,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Target,
  Activity,
  Gauge,
  Settings,
  Car,
  FuelIcon as Engine,
  Zap,
} from "lucide-react"

// Функция для преобразования данных API в формат ProductData
const transformModelData = (apiData: any): ProductData => {
  const iconMap: { [key: string]: any } = {
    Длина: <Ruler className="w-4 h-4" />,
    Ширина: <Ruler className="w-4 h-4" />,
    Высота: <ArrowUp className="w-4 h-4" />,
    Масса: <Weight className="w-4 h-4" />,
    "Вертикальный вылет": <ArrowUp className="w-4 h-4" />,
    "Горизонтальный вылет": <ArrowRight className="w-4 h-4" />,
    "Глубина подачи": <ArrowDown className="w-4 h-4" />,
    "Минимальный радиус": <Target className="w-4 h-4" />,
    Производительность: <Activity className="w-4 h-4" />,
    "Давление бетона": <Gauge className="w-4 h-4" />,
    "Диаметр цилиндра": <Settings className="w-4 h-4" />,
    "Длина хода": <Ruler className="w-4 h-4" />,
    Шасси: <Car className="w-4 h-4" />,
    Двигатель: <Engine className="w-4 h-4" />,
    Мощность: <Zap className="w-4 h-4" />,
    "Макс. скорость": <Gauge className="w-4 h-4" />,
  }

  return {
    model: apiData.model,
    title: apiData.title,
    subtitle: apiData.subtitle,
    image: apiData.image,
    keySpecs: apiData.keySpecs,
    specifications: {
      general: apiData.specifications.general.map((spec: any) => ({
        ...spec,
        icon: iconMap[spec.label] || <Settings className="w-4 h-4" />,
      })),
      boom: apiData.specifications.boom.map((spec: any) => ({
        ...spec,
        icon: iconMap[spec.label] || <ArrowUp className="w-4 h-4" />,
      })),
      pump: apiData.specifications.pump.map((spec: any) => ({
        ...spec,
        icon: iconMap[spec.label] || <Activity className="w-4 h-4" />,
      })),
      chassis: apiData.specifications.chassis.map((spec: any) => ({
        ...spec,
        icon: iconMap[spec.label] || <Car className="w-4 h-4" />,
      })),
    },
    features: apiData.features,
    advantages: apiData.advantages,
    delivery: apiData.delivery,
    pdfData: {
      model: apiData.model,
      height: apiData.keySpecs.height,
      performance: apiData.keySpecs.performance,
      image: apiData.image,
      specs: {
        length: apiData.specifications.general.find((s: any) => s.label === "Длина")?.value || "",
        width: apiData.specifications.general.find((s: any) => s.label === "Ширина")?.value || "",
        height: apiData.specifications.general.find((s: any) => s.label === "Высота")?.value || "",
        weight: apiData.specifications.general.find((s: any) => s.label === "Масса")?.value || "",
        verticalReach: apiData.specifications.boom.find((s: any) => s.label === "Вертикальный вылет")?.value || "",
        horizontalReach: apiData.specifications.boom.find((s: any) => s.label === "Горизонтальный вылет")?.value || "",
        depthReach: apiData.specifications.boom.find((s: any) => s.label === "Глубина подачи")?.value || "",
        minRadius: apiData.specifications.boom.find((s: any) => s.label === "Минимальный радиус")?.value || "",
        performanceLow: apiData.specifications.pump.find((s: any) => s.label === "Производительность")?.value || "",
        pressureLow: apiData.specifications.pump.find((s: any) => s.label === "Давление бетона")?.value || "",
        cylinderDiameter: apiData.specifications.pump.find((s: any) => s.label === "Диаметр цилиндра")?.value || "",
        strokeLength: apiData.specifications.pump.find((s: any) => s.label === "Длина хода")?.value || "",
        chassis: apiData.specifications.chassis.find((s: any) => s.label === "Шасси")?.value || "",
        engine: apiData.specifications.chassis.find((s: any) => s.label === "Двигатель")?.value || "",
        power: apiData.specifications.chassis.find((s: any) => s.label === "Мощность")?.value || "",
        maxSpeed: apiData.specifications.chassis.find((s: any) => s.label === "Макс. скорость")?.value || "",
      },
      delivery: apiData.delivery,
    },
  }
}

export default function Sany530SPage() {
  const [productData, setProductData] = useState<ProductData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { getModelData } = useModelData()

  useEffect(() => {
    const loadData = async () => {
      try {
        const modelData = await getModelData("sany-530s")
        if (modelData) {
          setProductData(transformModelData(modelData))
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [getModelData])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка данных модели...</p>
        </div>
      </div>
    )
  }

  if (!productData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Ошибка загрузки данных модели</p>
        </div>
      </div>
    )
  }

  return <ProductPage data={productData} />
}
