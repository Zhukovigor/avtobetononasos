import DynamicModelPage from "../[id]/DynamicModelPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SANY SYM5590THB 680C-10 - Автобетононасос 68м | Купить в России",
  description:
    "SANY 680C-10 - автобетононасос с высотой подачи 68 метров. Производительность 190 м³/ч. Цена, характеристики, условия поставки.",
  keywords: "SANY 680C-10, автобетононасос 68м, купить автобетононасос, SANY SYM5590THB, бетононасос 68 метров",
  openGraph: {
    title: "SANY 680C-10 - Автобетононасос 68м",
    description: "Автобетононасос SANY 680C-10 с высотой подачи 68 метров. В наличии с ЭПТС.",
    images: ["/images/pump5.jpg"],
  },
}

export default function Sany680C10Page() {
  return <DynamicModelPage modelId="sany-680c-10" />
}
