import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Модели автобетононасосов SANY - технические характеристики",
  description:
    "Подробные технические характеристики автобетононасосов SANY. Сравнение моделей, цены, параметры стрелы и насосной системы.",
  keywords: "автобетононасос SANY, технические характеристики, модели, сравнение, цены",
}

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-zinc-900">{children}</div>
}
