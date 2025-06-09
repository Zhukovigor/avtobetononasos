"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Model {
  id: string
  name: string
  category: string
  price: string
  image: string
  specs: {
    reach: string
    output: string
    engine: string
    weight: string
  }
  description: string
  features: string[]
  isVisible?: boolean
  order?: number
}

export default function Portfolio() {
  const [forceUpdate, setForceUpdate] = useState(0)
  const { toast } = useToast()

  const [selectedCategory, setSelectedCategory] = useState<string>("Все")
  const [filteredModels, setFilteredModels] = useState<Model[]>([])
  const [allModels, setAllModels] = useState<Model[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const categories = ["Все", "Стационарные", "Мобильные"]

  // Загрузка данных с сервера
  useEffect(() => {
    fetchModels()
  }, [forceUpdate])

  const fetchModels = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/portfolio-cards")
      const result = await response.json()

      if (result.success) {
        setAllModels(result.data)
        console.log("✅ Модели загружены:", result.data.length)
      } else {
        console.error("❌ Ошибка загрузки моделей:", result.error)
        // Fallback к статическим данным
        setAllModels([])
      }
    } catch (error) {
      console.error("❌ Ошибка запроса:", error)
      // Fallback к статическим данным
      setAllModels([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (selectedCategory === "Все") {
      setFilteredModels(allModels)
    } else {
      setFilteredModels(allModels.filter((model) => model.category === selectedCategory))
    }
  }, [selectedCategory, allModels])

  const handleWhatsAppClick = (modelName: string) => {
    // Отправляем событие в аналитику
    if (typeof window !== "undefined" && window.ym) {
      window.ym(102485605, "reachGoal", "model_whatsapp_click")
    }

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "contact_whatsapp", {
        event_category: "lead_generation",
        event_label: modelName,
        value: 1,
      })
    }

    const message = encodeURIComponent(
      `Здравствуйте! Интересует модель ${modelName}. Можете предоставить подробную информацию о цене, сроках поставки и условиях лизинга?`,
    )
    window.open(`https://wa.me/79190422492?text=${message}`, "_blank")
  }

  const handleViewSpecs = (modelId: string) => {
    // Отправляем событие в аналитику
    if (typeof window !== "undefined" && window.ym) {
      window.ym(102485605, "reachGoal", "view_model_specs")
    }

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "view_specifications", {
        event_category: "engagement",
        event_label: modelId,
        value: 1,
      })
    }
  }

  if (isLoading) {
    return (
      <section id="catalog" className="py-20 bg-gradient-to-b from-black to-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Купить автобетононасос</h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
            <p className="text-gray-400 mt-4">Загружаем каталог моделей...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="catalog" className="py-20 bg-gradient-to-b from-black to-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Купить автобетононасос</h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Широкий выбор автобетононасосов SANY с прямой поставкой из Китая. Гарантия качества, лучшие цены, лизинг 0%.
          </p>

          {/* Фильтры категорий */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                    : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Сетка моделей */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModels.map((model, index) => (
            <div
              key={model.id}
              className="bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group border border-zinc-800"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <div className="relative h-72 overflow-hidden bg-zinc-800">
                <img
                  src={model.image || "/placeholder.svg"}
                  alt={model.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=400&width=600"
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {model.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-xl font-bold text-white mb-2">{model.name}</h3>
                  <p className="text-gray-200 text-sm">{model.description}</p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{model.name}</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">{model.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-zinc-800 rounded-xl border border-zinc-700">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{model.specs.reach}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Высота подачи</div>
                  </div>
                  <div className="text-center p-4 bg-zinc-800 rounded-xl border border-zinc-700">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{model.specs.output}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Производительность</div>
                  </div>
                </div>

                <div className="mb-6 text-center p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-800/30">
                  <div className="text-3xl font-bold text-white mb-1">{model.price}</div>
                  <div className="text-xs text-gray-400">* Индивидуальный расчет стоимости</div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleWhatsAppClick(model.name)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-600/25"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785" />
                      </svg>
                      WhatsApp
                    </span>
                  </button>
                  <Link
                    href={`/models/${model.id}`}
                    onClick={() => handleViewSpecs(model.id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-600/25 text-center"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredModels.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2.306"
                />
              </svg>
            </div>
            <p className="text-xl text-gray-400 mb-4">В выбранной категории пока нет моделей</p>
            <button
              onClick={() => setSelectedCategory("Все")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Показать все модели
            </button>
          </div>
        )}

        {/* Дополнительная информация */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-3xl p-8 max-w-6xl mx-auto border border-zinc-700">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Почему выбирают нас?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Прямые поставки</h4>
                <p className="text-gray-400 leading-relaxed">Работаем напрямую с заводом SANY без посредников</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Лучшие цены</h4>
                <p className="text-gray-400 leading-relaxed">Минимальные цены благодаря прямым контрактам</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Полная гарантия</h4>
                <p className="text-gray-400 leading-relaxed">Официальная гарантия и сервисное обслуживание</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
