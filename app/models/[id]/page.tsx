import type { Metadata } from "next"
import DynamicModelPage from "./DynamicModelPage"

// Полностью отключаем статическую генерацию
export const dynamic = "force-dynamic"
export const dynamicParams = true
export const revalidate = 0
export const fetchCache = "force-no-store"
export const runtime = "nodejs"

interface Props {
  params: { id: string }
}

// Генерируем метаданные динамически
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    // Используем абсолютный URL для API вместо относительного
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || "https://avtobetononasos.vercel.app"

    // Используем кэширование no-store для предотвращения проблем со статической генерацией
    const response = await fetch(`${baseUrl}/api/models?id=${params.id}`, {
      cache: "no-store",
      next: { revalidate: 0 },
    })

    if (!response.ok) {
      return {
        title: "Модель автобетононасоса",
        description: "Технические характеристики автобетононасоса",
      }
    }

    const result = await response.json()

    if (!result.success) {
      return {
        title: "Модель не найдена",
        description: "Запрашиваемая модель автобетононасоса не найдена",
      }
    }

    const model = result.data
    return {
      title: `${model.title || "Автобетононасос"} - технические характеристики`,
      description: `Технические характеристики автобетононасоса ${model.model || ""}`,
      keywords: `${model.model || "автобетононасос"}, характеристики, цена, купить`,
    }
  } catch (error) {
    console.error("Ошибка генерации метаданных:", error)
    return {
      title: "Автобетононасос - технические характеристики",
      description: "Подробная информация о модели автобетононасоса",
    }
  }
}

export default function ModelPage({ params }: Props) {
  return <DynamicModelPage modelId={params.id} />
}

// Полностью удаляем generateStaticParams
