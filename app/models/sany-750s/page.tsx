import DynamicModelPage from "../[id]/DynamicModelPage"
import type { Metadata } from "next"

// Добавляем динамическую конфигурацию
export const dynamic = "force-dynamic"
export const dynamicParams = true
export const revalidate = 0

export const metadata: Metadata = {
  title: "SANY SYM5502THBDZ 750S - технические характеристики автобетононасоса",
  description:
    "Подробные технические характеристики автобетононасоса SANY 750S: высота подачи 75м, производительность 180 м³/ч.",
  keywords: "SANY 750S, автобетононасос 75 метров, характеристики, цена, купить",
}

export default function Sany750SPage() {
  return <DynamicModelPage modelId="sany-750s" />
}
