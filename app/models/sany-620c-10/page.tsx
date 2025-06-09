import DynamicModelPage from "../[id]/DynamicModelPage"
import type { Metadata } from "next"

// Добавляем динамическую конфигурацию
export const dynamic = "force-dynamic"
export const dynamicParams = true
export const revalidate = 0

export const metadata: Metadata = {
  title: "SANY SYM5418THBDW 620C-10 - технические характеристики автобетононасоса",
  description:
    "Подробные технические характеристики автобетононасоса SANY 620C-10: высота подачи 62м, производительность 170 м³/ч.",
  keywords: "SANY 620C-10, автобетононасос 62 метра, характеристики, цена, купить",
}

export default function Sany620C10Page() {
  return <DynamicModelPage modelId="sany-620c-10" />
}
