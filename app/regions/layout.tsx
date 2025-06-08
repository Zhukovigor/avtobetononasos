import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Автобетононасосы SANY по регионам России",
  description:
    "Продажа и поставка автобетононасосов SANY в Москве, СПб, Новосибирске и других городах России. Быстрая доставка, выгодные цены.",
  keywords: "автобетононасос Москва, автобетононасос СПб, автобетононасос регионы, SANY регионы",
}

export default function RegionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-black">{children}</div>
}
