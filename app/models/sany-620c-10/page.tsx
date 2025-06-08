import DynamicModelPage from "../[id]/DynamicModelPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SANY SYM5463THBFB 620C-10 - Автобетононасос 62м | Купить в России",
  description:
    "SANY 620C-10 - автобетононасос с высотой подачи 62 метра. Производительность 170 м³/ч. Цена, характеристики, условия поставки.",
  keywords: "SANY 620C-10, автобетононасос 62м, купить автобетононасос, SANY SYM5463THBFB, бетононасос 62 метра",
  openGraph: {
    title: "SANY 620C-10 - Автобетононасос 62м",
    description: "Автобетононасос SANY 620C-10 с высотой подачи 62 метра. В наличии с ЭПТС.",
    images: ["/images/pump6.jpg"],
  },
}

export default function Sany620C10Page() {
  return <DynamicModelPage modelId="sany-620c-10" />
}
