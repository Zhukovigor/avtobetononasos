import type { Metadata } from "next"
import Sany750SClientPage from "./Sany750SClientPage"

export const metadata: Metadata = {
  title: "SANY SYM5552THB 750S - Автобетононасос 75м | Купить в России",
  description:
    "SANY 750S - автобетононасос с высотой подачи 75 метров. Производительность 180 м³/ч. Цена, характеристики, условия поставки. Звоните +7 919 042 24 92",
  keywords: "SANY 750S, автобетононасос 75м, купить автобетононасос, SANY SYM5552THB, бетононасос 75 метров",
  openGraph: {
    title: "SANY 750S - Автобетононасос 75м",
    description: "Автобетононасос SANY 750S с высотой подачи 75 метров. В наличии с ЭПТС.",
    images: ["/images/pump4.jpg"],
  },
}

export default function Sany750SPage() {
  return <Sany750SClientPage />
}
