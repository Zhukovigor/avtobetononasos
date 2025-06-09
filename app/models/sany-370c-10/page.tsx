import DynamicModelPage from "../[id]/DynamicModelPage"
import type { Metadata } from "next"

// Добавляем динамическую конфигурацию
export const dynamic = "force-dynamic"
export const dynamicParams = true
export const revalidate = 0

export const metadata: Metadata = {
  title: "SANY SYM5230THBF 370C-10 - технические характеристики автобетононасоса",
  description:
    "Подробные технические характеристики автобетононасоса SANY 370C-10: высота подачи 37м, производительность 125 м³/ч.",
  keywords: "SANY 370C-10, автобетононасос 37 метров, характеристики, цена, купить",
}

export default function Sany370C10Page() {
  return <DynamicModelPage modelId="sany-370c-10" />
}
