import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Автобетононасосы SANY в Новосибирске - купить с доставкой по Сибири",
  description:
    "Продажа автобетононасосов SANY в Новосибирске. ✅ Доставка по Сибири ✅ Обучение операторов ✅ Гарантийное обслуживание. Звоните: +7 (383) 123-45-67",
  keywords: "автобетононасос Новосибирск, купить автобетононасос Новосибирск, SANY Новосибирск, бетононасос Сибирь",
}

export default function NovosibirskPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-6 h-6 text-green-500" />
            <span className="text-green-500 font-semibold">Новосибирск</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Автобетононасосы SANY
            <span className="block text-green-500">в Новосибирске</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Центр поставок SANY в Сибири. Доставка по всему Сибирскому региону, обучение операторов, гарантийное
            обслуживание. 45+ успешных проектов.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <Phone className="w-4 h-4 mr-2" />
              +7 (383) 123-45-67
            </Button>
            <Button size="lg" variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
              Рассчитать доставку
            </Button>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Центр поставок для Сибири</h2>
          <p className="text-green-100 mb-6">Обслуживаем весь Сибирский федеральный округ с гарантией качества</p>
        </div>

        <div className="mt-12 text-center">
          <Link href="/regions" className="text-green-500 hover:text-green-400 transition-colors">
            ← Вернуться к выбору региона
          </Link>
        </div>
      </div>
    </div>
  )
}
