import DynamicModelPage from "../[id]/DynamicModelPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SANY SYM5552THB 750S - Автобетононасос 75м | Купить в России",
  description:
    "SANY 750S - автобетононасос с высотой подачи 75 метров. Производительность 220 м³/ч. Цена, характеристики, условия поставки.",
  keywords: "SANY 750S, автобетононасос 75м, купить автобетононасос, SANY SYM5552THB, бетононасос 75 метров",
  openGraph: {
    title: "SANY 750S - Автобетононасос 75м",
    description: "Автобетононасос SANY 750S с высотой подачи 75 метров. В наличии с ЭПТС.",
    images: ["/images/pump4.jpg"],
  },
}

export default function Sany750SPage() {
  return <DynamicModelPage modelId="sany-750s" />
}
