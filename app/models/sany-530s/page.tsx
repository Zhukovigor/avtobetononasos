import DynamicModelPage from "../[id]/DynamicModelPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SANY SYM5365THBFS 530S - технические характеристики автобетононасоса",
  description:
    "Подробные технические характеристики автобетононасоса SANY 530S: высота подачи 53м, производительность 180 м³/ч.",
  keywords: "SANY 530S, автобетононасос 53 метра, характеристики, купить",
}

export default function Sany530SPage() {
  return <DynamicModelPage modelId="sany-530s" />
}
