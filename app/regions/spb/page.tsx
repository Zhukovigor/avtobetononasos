import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Truck, Phone, Star, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Автобетононасосы SANY в СПб - купить в Санкт-Петербурге | Официальный дилер",
  description:
    "Продажа автобетононасосов SANY в Санкт-Петербурге. ✅ Региональный склад ✅ Доставка 2-3 дня ✅ Лизинг ✅ Техподдержка. Звоните: +7 (812) 123-45-67",
  keywords: "автобетононасос СПб, купить автобетононасос Санкт-Петербург, SANY СПб, бетононасос СПб цена",
}

const models = [
  {
    name: "SANY SYG5230THB-37",
    reach: "37 м",
    price: "от 8 700 000 ₽",
    delivery: "2-3 дня",
    features: ["Высота подачи 37м", "Производительность 180 м³/ч", "Адаптация к климату СЗ"],
  },
  {
    name: "SANY SYG5330THB-42",
    reach: "42 м",
    price: "от 10 000 000 ₽",
    delivery: "2-3 дня",
    features: ["Высота подачи 42м", "Производительность 200 м³/ч", "Усиленная защита от коррозии"],
  },
  {
    name: "SANY SYG5419THB-48",
    reach: "48 м",
    price: "от 12 800 000 ₽",
    delivery: "3-4 дня",
    features: ["Высота подачи 48м", "Производительность 220 м³/ч", "Северное исполнение"],
  },
]

const advantages = [
  {
    icon: <MapPin className="w-6 h-6 text-blue-500" />,
    title: "Региональный склад",
    description: "Склад в СПб для быстрой отгрузки",
  },
  {
    icon: <Truck className="w-6 h-6 text-blue-500" />,
    title: "Доставка 2-3 дня",
    description: "Быстрая доставка по СПб и ЛО",
  },
  {
    icon: <Phone className="w-6 h-6 text-blue-500" />,
    title: "Техподдержка",
    description: "Квалифицированная техническая поддержка",
  },
  {
    icon: <Star className="w-6 h-6 text-blue-500" />,
    title: "Лизинг",
    description: "Выгодные условия лизинга",
  },
]

export default function SpbPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-6 h-6 text-blue-500" />
            <span className="text-blue-500 font-semibold">Санкт-Петербург</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Автобетононасосы SANY
            <span className="block text-blue-500">в СПб</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Официальный дилер SANY в Санкт-Петербурге. Региональный склад, доставка 2-3 дня, техническая поддержка,
            лизинг. Более 80 успешных проектов в Северной столице.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Склад в СПб</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Доставка 2-3 дня</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Техподдержка</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Северное исполнение</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Phone className="w-4 h-4 mr-2" />
              +7 (812) 123-45-67
            </Button>
            <Button size="lg" variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
              Рассчитать стоимость
            </Button>
          </div>
        </div>

        {/* Advantages */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {advantages.map((advantage, index) => (
            <Card key={index} className="bg-zinc-900 border-zinc-800 text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">{advantage.icon}</div>
                <h3 className="text-white font-semibold mb-2">{advantage.title}</h3>
                <p className="text-gray-400 text-sm">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Models Catalog */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Автобетононасосы SANY в наличии в СПб</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {models.map((model, index) => (
              <Card key={index} className="bg-zinc-900 border-zinc-800 hover:border-blue-500 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white">{model.name}</CardTitle>
                  <CardDescription className="text-blue-500 font-semibold">
                    Высота подачи: {model.reach}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Цена:</span>
                      <span className="text-white font-semibold">{model.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Доставка:</span>
                      <span className="text-green-500">{model.delivery}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Особенности:</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {model.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Узнать цену</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Regional Info */}
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-500" />
                Доставка по СПб и ЛО
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-400">
              <ul className="space-y-2">
                <li>• Санкт-Петербург - 2 дня</li>
                <li>• Ленинградская область - 2-3 дня</li>
                <li>• Северо-Западный регион - 3-5 дней</li>
                <li>• Специальный транспорт для негабарита</li>
                <li>• Адаптация к климатическим условиям</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-500" />
                Контакты в СПб
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-400">
              <div className="space-y-2">
                <p>
                  <strong className="text-white">Телефон:</strong> +7 (812) 123-45-67
                </p>
                <p>
                  <strong className="text-white">Email:</strong> spb@sany-pumps.ru
                </p>
                <p>
                  <strong className="text-white">Адрес склада:</strong> г. СПб, Московский пр., 78
                </p>
                <p>
                  <strong className="text-white">Режим работы:</strong> Пн-Пт 9:00-18:00
                </p>
                <p>
                  <strong className="text-white">Техподдержка:</strong> 24/7
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Специальные условия для СПб</h2>
          <p className="text-blue-100 mb-6">
            Получите персональное предложение с учетом климатических особенностей региона
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Получить расчет
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Phone className="w-4 h-4 mr-2" />
              Позвонить сейчас
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link href="/regions" className="text-blue-500 hover:text-blue-400 transition-colors">
            ← Вернуться к выбору региона
          </Link>
        </div>
      </div>
    </div>
  )
}
