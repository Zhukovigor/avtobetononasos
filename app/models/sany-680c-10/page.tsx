import type { Metadata } from "next"
import Sany680C10ClientPage from "./Sany680C10ClientPage"

export const metadata: Metadata = {
  title: "SANY SYM5590THB 680C-10 - Автобетононасос 68м | Купить в России",
  description:
    "SANY 680C-10 - автобетононасос с высотой подачи 68 метров. Производительность 180 м³/ч. Цена, характеристики, условия поставки. Звоните +7 919 042 24 92",
  keywords: "SANY 680C-10, автобетононасос 68м, купить автобетононасос, SANY SYM5590THB, бетононасос 68 метров",
  openGraph: {
    title: "SANY 680C-10 - Автобетононасос 68м",
    description: "Автобетононасос SANY 680C-10 с высотой подачи 68 метров. В наличии с ЭПТС.",
    images: ["/images/pump5.jpg"],
  },
}

export default function Sany680C10Page() {
  return <Sany680C10ClientPage />
}
