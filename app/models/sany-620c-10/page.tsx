import type { Metadata } from "next"
import Sany620C10ClientPage from "./Sany620C10ClientPage"

export const metadata: Metadata = {
  title: "SANY SYM5463THBFB 620C-10 - Автобетононасос 62м | Купить в России",
  description:
    "SANY 620C-10 - автобетононасос с высотой подачи 62 метра. Производительность 180 м³/ч. Цена, характеристики, условия поставки. Звоните +7 919 042 24 92",
  keywords: "SANY 620C-10, автобетононасос 62м, купить автобетононасос, SANY SYM5463THBFB, бетононасос 62 метра",
  openGraph: {
    title: "SANY 620C-10 - Автобетононасос 62м",
    description: "Автобетононасос SANY 620C-10 с высотой подачи 62 метра. В наличии с ЭПТС.",
    images: ["/images/pump6.jpg"],
  },
}

export default function Sany620C10Page() {
  return <Sany620C10ClientPage />
}
