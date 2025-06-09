import DynamicModelPage from "../[id]/DynamicModelPage"
import type { Metadata } from "next"

// Добавляем динамическую конфигурацию
export const dynamic = "force-dynamic"
export const dynamicParams = true
export const revalidate = 0

export const metadata: Metadata = {
  title: "SANY SYM5502THBDZ 710S - технические характеристики автобетононасоса",
  description:
    "Подробные технические характеристики автобетононасоса SANY 710S: высота подачи 71м, производительность 180 м³/ч.",
  keywords: "SANY 710S, автобетононасос 71 метр, характеристики, цена, купить",
}

export default function Sany710SPage() {
  return <DynamicModelPage modelId="sany-710s" />
}
