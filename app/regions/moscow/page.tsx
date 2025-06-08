import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Truck, Phone, Star, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Автобетононасосы SANY в Москве - купить с доставкой | Официальный дилер",
  description:
    "Продажа автобетононасосов SANY в Москве. ✅ Собственный склад ✅ Доставка 1-2 дня ✅ Лизинг без переплат ✅ Сервисный центр. Звоните: +7 (495) 123-45-67",
  keywords: "автобетононасос Москва, купить автобетононасос Москва, SANY Москва, бетононасос Москва цена",
}

const models = [
  {
    name: "SANY SYG5230THB-37",
    reach: "37 м",
    price: "от 8 500 000 ₽",
    delivery: "1-2 дня",
    features: ["Высота подачи 37м", "Производительность 180 м³/ч", "Немецкие комплектующие"],
  },
  {
    name: "SANY SYG5330THB-42",
    reach: "42 м",
    price: "от 9 800 000 ₽",
    delivery: "1-2 дня",
    features: ["Высота подачи 42м", "Производительность 200 м³/ч", "Система самодиагностики"],
  },
  {
    name: "SANY SYG5419THB-48",
    reach: "48 м",
    price: "от 12 500 000 ₽",
    delivery: "2-3 дня",
    features: ["Высота подачи 48м", "Производительность 220 м³/ч", "Премиум комплектация"],
  },
]

const advantages = [
  {
    icon: <MapPin className="w-6 h-6 text-orange-500" />,
    title: "Собственный склад в Москве",
    description: "Техника всегда в наличии, быстрая отгрузка",
  },
  {
    icon: <Truck className="w-6 h-6 text-orange-500" />,
    title: "Доставка 1-2 дня",
    description: "Самая быстрая доставка по Москве и МО",
  },
  {
    icon: <Phone className="w-6 h-6 text-orange-500" />,
    title: "Сервисный центр",
    description: "Полное техническое обслуживание и ремонт",
  },
  {
    icon: <Star className="w-6 h-6 text-orange-500" />,
    title: "Лизинг без переплат",
    description: "Выгодные условия лизинга от 0.01%",
  },
]

export default function MoscowPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-6 h-6 text-orange-500" />
            <span className="text-orange-500 font-semibold">Москва</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Автобетононасосы SANY
            <span className="block text-orange-500">в Москве</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Официальный дилер SANY в Москве. Собственный склад, доставка 1-2 дня, сервисный центр, выгодные условия
            лизинга. Более 150 успешных проектов в столице.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Склад в Москве</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Доставка 1-2 дня</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Сервисный центр</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Лизинг 0.01%</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Phone className="w-4 h-4 mr-2" />
              +7 (495) 123-45-67
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
          <h2 className="text-3xl font-bold text-white text-center mb-8">Автобетононасосы SANY в наличии в Москве</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {models.map((model, index) => (
              <Card key={index} className="bg-zinc-900 border-zinc-800 hover:border-orange-500 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white">{model.name}</CardTitle>
                  <CardDescription className="text-orange-500 font-semibold">
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
                          <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-orange-600 hover:bg-orange-700">Узнать цену</Button>
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
                <Truck className="w-5 h-5 text-orange-500" />
                Доставка по Москве и МО
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-400">
              <ul className="space-y-2">
                <li>• Москва (в пределах МКАД) - 1 день</li>
                <li>• Московская область - 1-2 дня</li>
                <li>• Доставка собственным транспортом</li>
                <li>• Разгрузка краном-манипулятором</li>
                <li>• Страхование груза включено</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Phone className="w-5 h-5 text-orange-500" />
                Контакты в Москве
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-400">
              <div className="space-y-2">
                <p>
                  <strong className="text-white">Телефон:</strong> +7 (495) 123-45-67
                </p>
                <p>
                  <strong className="text-white">Email:</strong> moscow@sany-pumps.ru
                </p>
                <p>
                  <strong className="text-white">Адрес склада:</strong> г. Москва, Варшавское шоссе, 125
                </p>
                <p>
                  <strong className="text-white">Режим работы:</strong> Пн-Пт 9:00-18:00
                </p>
                <p>
                  <strong className="text-white">Сервис:</strong> Круглосуточно
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Получите персональное предложение</h2>
          <p className="text-orange-100 mb-6">
            Оставьте заявку и получите расчет стоимости с учетом доставки по Москве
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
              Получить расчет
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600"
            >
              <Phone className="w-4 h-4 mr-2" />
              Позвонить сейчас
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link href="/regions" className="text-orange-500 hover:text-orange-400 transition-colors">
            ← Вернуться к выбору региона
          </Link>
        </div>
      </div>
    </div>
  )
}
