"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

declare global {
  interface Window {
    ym: (id: number, action: string, params?: any) => void
    gtag: (command: string, targetId: string, config?: any) => void
  }
}

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "Все модели" },
    { id: "small", name: "Малые" },
    { id: "medium", name: "Средние" },
    { id: "large", name: "Большие" },
  ]

  const pumps = [
    {
      id: 1,
      title: "SANY SYM5365THBFS 530S",
      category: "medium",
      image: "/images/pump1.jpg",
      specs: "Высота подачи: 53м, Производительность: 180 м³/ч",
      price: "medium_price",
      slug: "sany-530s",
    },
    {
      id: 2,
      title: "SANY SYM5230THBF 370C-10",
      category: "medium",
      image: "/images/pump2.jpg",
      specs: "Высота подачи: 37м, Производительность: 125 м³/ч",
      price: "medium_price",
      slug: "sany-370c-10",
    },
    {
      id: 3,
      title: "SANY SYM5552THB 710S",
      category: "large",
      image: "/images/pump3.jpg",
      specs: "Высота подачи: 71м, Производительность: 180 м³/ч",
      price: "high_price",
      slug: "sany-710s",
    },
    {
      id: 4,
      title: "SANY SYM5552THB 750S",
      category: "large",
      image: "/images/pump4.jpg",
      specs: "Высота подачи: 75м, Производительность: 180 м³/ч",
      price: "high_price",
      slug: "sany-750s",
    },
    {
      id: 5,
      title: "SANY SYM5590THB 680C-10",
      category: "large",
      image: "/images/pump5.jpg",
      specs: "Высота подачи: 68м, Производительность: 180 м³/ч",
      price: "high_price",
      slug: "sany-680c-10",
    },
    {
      id: 6,
      title: "SANY SYM5463THBFB 620C-10",
      category: "medium",
      image: "/images/pump6.jpg",
      specs: "Высота подачи: 62м, Производительность: 180 м³/ч",
      price: "medium_price",
      slug: "sany-620c-10",
    },
  ]

  const filteredPumps = pumps.filter((pump) => (selectedCategory === "all" ? true : pump.category === selectedCategory))

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)

    // Отправляем событие в Яндекс.Метрику
    if (typeof window !== "undefined" && window.ym) {
      window.ym(102485605, "reachGoal", `filter_${categoryId}`)
    }

    // Отправляем событие в Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "filter_category", {
        event_category: "catalog",
        event_label: categoryId,
        value: 1,
      })
    }
  }

  const handleWhatsAppClick = (pump: any) => {
    // Отправляем событие в Яндекс.Метрику
    if (typeof window !== "undefined" && window.ym) {
      window.ym(102485605, "reachGoal", "whatsapp_click", {
        pump_model: pump.title,
      })
    }

    // Отправляем событие в Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "contact_whatsapp", {
        event_category: "lead_generation",
        event_label: pump.title,
        custom_parameters: {
          pump_category: pump.category,
          pump_specs: pump.specs,
          price_range: pump.price,
        },
      })

      // Отправляем событие просмотра товара
      window.gtag("event", "view_item", {
        currency: "RUB",
        value: 1,
        items: [
          {
            item_id: pump.id.toString(),
            item_name: pump.title,
            item_category: pump.category,
            item_variant: pump.specs,
            quantity: 1,
          },
        ],
      })
    }
  }

  const handleSpecsClick = (pump: any) => {
    // Отправляем событие в Яндекс.Метрику
    if (typeof window !== "undefined" && window.ym) {
      window.ym(102485605, "reachGoal", "specs_view", {
        pump_model: pump.title,
      })
    }

    // Отправляем событие в Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "view_specifications", {
        event_category: "product_info",
        event_label: pump.title,
        custom_parameters: {
          pump_category: pump.category,
          pump_specs: pump.specs,
        },
      })
    }
  }

  return (
    <section id="catalog" className="bg-zinc-900 py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Купить автобетононасос
        </h2>
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`group relative overflow-hidden px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                selectedCategory === category.id
                  ? "bg-white text-black shadow-lg"
                  : "border border-white text-white hover:text-black"
              }`}
            >
              <span className="relative z-10">{category.name}</span>
              {selectedCategory !== category.id && (
                <>
                  <div className="absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transform -skew-x-12 -translate-x-full transition-transform duration-700 group-hover:translate-x-full group-hover:opacity-30"></div>
                </>
              )}
            </button>
          ))}
        </div>
        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredPumps.map((pump) => (
              <motion.div
                key={pump.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="group relative">
                      <img
                        src={pump.image || "/placeholder.svg"}
                        alt={pump.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <h3 className="text-xl font-semibold text-white mb-2">{pump.title}</h3>
                        <p className="text-sm text-gray-200 text-center px-4">{pump.specs}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{pump.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{pump.specs}</p>

                      {/* Кнопки */}
                      <div className="space-y-3">
                        <Link
                          href={`/models/${pump.slug}`}
                          onClick={() => handleSpecsClick(pump)}
                          className="group relative w-full overflow-hidden bg-blue-600 text-white py-3 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl block text-center rounded-lg hover:bg-blue-700"
                        >
                          <span className="relative z-10">Характеристики</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 transform scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100"></div>
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                            <span className="text-blue-200">📋</span>
                          </div>
                        </Link>

                        <a
                          href="https://wa.me/79190422492"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleWhatsAppClick(pump)}
                          className="group relative w-full overflow-hidden bg-white text-black py-3 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl block text-center rounded-lg"
                        >
                          <span className="relative z-10">Узнать цену в WhatsApp</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 transform scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100"></div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-20">
                            <div className="w-2 h-2 bg-black rounded-full animate-ping"></div>
                          </div>
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                            <span className="text-green-600">📱</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
