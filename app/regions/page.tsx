import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Truck, Clock, Phone } from "lucide-react"

const regions = [
  {
    id: "moscow",
    name: "Москва",
    description: "Столичный регион с максимальным спросом на строительную технику",
    deliveryTime: "1-2 дня",
    projects: "150+ проектов",
    phone: "+7 (495) 123-45-67",
    features: ["Собственный склад", "Быстрая доставка", "Сервисный центр"],
  },
  {
    id: "spb",
    name: "Санкт-Петербург",
    description: "Северная столица с активным строительством",
    deliveryTime: "2-3 дня",
    projects: "80+ проектов",
    phone: "+7 (812) 123-45-67",
    features: ["Региональный склад", "Техподдержка", "Лизинг"],
  },
  {
    id: "novosibirsk",
    name: "Новосибирск",
    description: "Крупнейший город Сибири, центр строительной активности",
    deliveryTime: "3-5 дней",
    projects: "45+ проектов",
    phone: "+7 (383) 123-45-67",
    features: ["Доставка по Сибири", "Обучение операторов", "Гарантия"],
  },
  {
    id: "ekaterinburg",
    name: "Екатеринбург",
    description: "Столица Урала с развитой промышленностью",
    deliveryTime: "3-4 дня",
    projects: "60+ проектов",
    phone: "+7 (343) 123-45-67",
    features: ["Уральский хаб", "Запчасти в наличии", "Сервис 24/7"],
  },
  {
    id: "kazan",
    name: "Казань",
    description: "Столица Татарстана с активным жилищным строительством",
    deliveryTime: "2-4 дня",
    projects: "35+ проектов",
    phone: "+7 (843) 123-45-67",
    features: ["Региональный центр", "Обслуживание ПФО", "Консультации"],
  },
  {
    id: "rostov",
    name: "Ростов-на-Дону",
    description: "Южный регион с высоким спросом на бетононасосы",
    deliveryTime: "3-5 дней",
    projects: "40+ проектов",
    phone: "+7 (863) 123-45-67",
    features: ["Южный филиал", "Доставка по ЮФО", "Демонстрация"],
  },
]

export default function RegionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Автобетононасосы SANY
          <span className="block text-orange-500">по всей России</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Поставляем автобетононасосы SANY в крупнейшие города России. Быстрая доставка, региональная поддержка,
          выгодные условия лизинга.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>Доставка по всей России</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Поставка от 1 дня</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>Региональная поддержка</span>
          </div>
        </div>
      </div>

      {/* Regions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {regions.map((region) => (
          <Card key={region.id} className="bg-zinc-900 border-zinc-800 hover:border-orange-500 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                <CardTitle className="text-white">{region.name}</CardTitle>
              </div>
              <CardDescription className="text-gray-400">{region.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Доставка:</span>
                  <span className="text-white">{region.deliveryTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Проекты:</span>
                  <span className="text-white">{region.projects}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Телефон:</span>
                  <span className="text-white">{region.phone}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-white mb-2">Преимущества:</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  {region.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={`/regions/${region.id}`}>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Подробнее о регионе</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center bg-zinc-900 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Не нашли свой город?</h2>
        <p className="text-gray-400 mb-6">
          Мы работаем по всей России. Свяжитесь с нами для уточнения условий доставки в ваш регион.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
            <Phone className="w-4 h-4 mr-2" />
            Связаться с нами
          </Button>
          <Button size="lg" variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
            Рассчитать доставку
          </Button>
        </div>
      </div>
    </div>
  )
}
