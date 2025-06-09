import DynamicModelPage from "../[id]/DynamicModelPage"
import type { Metadata } from "next"

// Добавляем динамическую конфигурацию
export const dynamic = "force-dynamic"
export const dynamicParams = true
export const revalidate = 0

export const metadata: Metadata = {
  title: "SANY SYM5502THBDW 680C-10 - технические характеристики автобетононасоса",
  description:
    "Подробные технические характеристики автобетононасоса SANY 680C-10: высота подачи 68м, производительность 180 м³/ч.",
  keywords: "SANY 680C-10, автобетононасос 68 метров, характеристики, цена, купить",
}

export default function Sany680C10Page() {
  return <DynamicModelPage modelId="sany-680c-10" />
}
