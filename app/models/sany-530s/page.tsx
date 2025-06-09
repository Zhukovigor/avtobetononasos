import DynamicModelPage from "../[id]/DynamicModelPage"
import type { Metadata } from "next"

// Добавляем динамическую конфигурацию
export const dynamic = "force-dynamic"
export const dynamicParams = true
export const revalidate = 0

export const metadata: Metadata = {
  title: "SANY SYM5350THBDZ 530S - технические характеристики автобетононасоса",
  description:
    "Подробные технические характеристики автобетононасоса SANY 530S: высота подачи 53м, производительность 160 м³/ч.",
  keywords: "SANY 530S, автобетононасос 53 метра, характеристики, цена, купить",
}

export default function Sany530SPage() {
  return <DynamicModelPage modelId="sany-530s" />
}
