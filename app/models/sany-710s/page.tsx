import DynamicModelPage from "../[id]/DynamicModelPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SANY SYM5552THB 710S - технические характеристики автобетононасоса",
  description:
    "Подробные технические характеристики автобетононасоса SANY 710S: высота подачи 71м, производительность 180 м³/ч.",
  keywords: "SANY 710S, автобетононасос 71 метр, характеристики, цена, купить",
}

export default function Sany710SPage() {
  return <DynamicModelPage modelId="sany-710s" />
}
