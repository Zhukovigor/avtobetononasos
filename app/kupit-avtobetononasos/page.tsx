"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

declare global {
  interface Window {
    ym: (id: number, action: string, params?: any) => void
    gtag: (command: string, targetId: string, config?: any) => void
  }
}

interface PumpModel {
  id: string
  name: string
  model: string
  image: string
  height: string
  performance: string
  price: string
  oldPrice?: string
  discount?: string
  features: string[]
  inStock: boolean
  delivery: string
  warranty: string
}

export default function BuyPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showQuickOrder, setShowQuickOrder] = useState(false)
  const [selectedPump, setSelectedPump] = useState<PumpModel | null>(null)

  const pumpModels: PumpModel[] = [
    {
      id: "1",
      name: "SANY SYM5365THBFS 530S",
      model: "530S",
      image: "/images/pump1.jpg",
      height: "53 метра",
      performance: "180 м³/ч",
      price: "от 18 500 000 ₽",
      oldPrice: "20 000 000 ₽",
      discount: "-7%",
      features: ["Немецкие комплектующие", "Гарантия 2 года", "Сервис по всей России", "Лизинг 0%"],
      inStock: true,
      delivery: "30 дней",
      warranty: "24 месяца",
    },
    {
      id: "2",
      name: "SANY SYM5230THBF 370C-10",
      model: "370C-10",
      image: "/images/pump2.jpg",
      height: "37 метров",
      performance: "125 м³/ч",
      price: "от 14 200 000 ₽",
      oldPrice: "15 500 000 ₽",
      discount: "-8%",
      features: ["Экономичный расход топлива", "Простое обслуживание", "Надежная гидравлика", "Быстрая окупаемость"],
      inStock: true,
      delivery: "25 дней",
      warranty: "24 месяца",
    },
    {
      id: "3",
      name: "SANY SYM5552THB 710S",
      model: "710S",
      image: "/images/pump3.jpg",
      height: "71 метр",
      performance: "180 м³/ч",
      price: "от 24 800 000 ₽",
      oldPrice: "26 500 000 ₽",
      discount: "-6%",
      features: ["Максимальная высота подачи", "Премиум комплектация", "Расширенная гарантия", "VIP сервис"],
      inStock: true,
      delivery: "35 дней",
      warranty: "36 месяцев",
    },
    {
      id: "4",
      name: "SANY SYM5552THB 750S",
      model: "750S",
      image: "/images/pump4.jpg",
      height: "75 метров",
      performance: "180 м³/ч",
      price: "от 26 900 000 ₽",
      features: ["Топовая модель", "Максимальная производительность", "Полная комплектация", "Приоритетный сервис"],
      inStock: false,
      delivery: "45 дней",
      warranty: "36 месяцев",
    },
    {
      id: "5",
      name: "SANY SYM5590THB 680C-10",
      model: "680C-10",
      image: "/images/pump5.jpg",
      height: "68 метров",
      performance: "180 м³/ч",
      price: "от 22 100 000 ₽",
      oldPrice: "23 800 000 ₽",
      discount: "-7%",
      features: ["Оптимальное соотношение цена/качество", "Проверенная надежность", "Низкие эксплуатационные расходы"],
      inStock: true,
      delivery: "30 дней",
      warranty: "24 месяца",
    },
    {
      id: "6",
      name: "SANY SYM5463THBFB 620C-10",
      model: "620C-10",
      image: "/images/pump6.jpg",
      height: "62 метра",
      performance: "180 м³/ч",
      price: "от 19 700 000 ₽",
      features: ["Универсальная модель", "Высокая надежность", "Доступная цена", "Быстрая поставка"],
      inStock: true,
      delivery: "20 дней",
      warranty: "24 месяца",
    },
  ]

  const handleQuickOrder = (pump: PumpModel) => {
    setSelectedPump(pump)
    setShowQuickOrder(true)

    // Отправляем событие в аналитику
    if (typeof window !== "undefined" && window.ym) {
      window.ym(102485605, "reachGoal", "quick_order_click", {
        pump_model: pump.model,
        pump_price: pump.price,
      })
    }

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "begin_checkout", {
        currency: "RUB",
        value: Number.parseInt(pump.price.replace(/\D/g, "")),
        items: [
          {
            item_id: pump.id,
            item_name: pump.name,
            category: "concrete_pump",
            quantity: 1,
            price: Number.parseInt(pump.price.replace(/\D/g, "")),
          },
        ],
      })
    }
  }

  const handleWhatsAppOrder = (pump: PumpModel) => {
    const message = `Здравствуйте! Интересует автобетононасос ${pump.name}. Цена: ${pump.price}. Можете предоставить подробную информацию?`
    const whatsappUrl = `https://wa.me/79190422492?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    // Аналитика
    if (typeof window !== "undefined" && window.ym) {
      window.ym(102485605, "reachGoal", "whatsapp_order", {
        pump_model: pump.model,
      })
    }
  }

  const advantages = [
    {
      icon: "🏭",
      title: "Прямые поставки из Китая",
      description: "Работаем напрямую с заводом SANY, без посредников",
    },
    {
      icon: "💰",
      title: "Лучшие цены на рынке",
      description: "Экономия до 30% по сравнению с официальными дилерами",
    },
    {
      icon: "🚚",
      title: "Быстрая доставка",
      description: "Поставка автобетононасосов от 20 до 45 дней",
    },
    {
      icon: "🛡️",
      title: "Гарантия качества",
      description: "Официальная гарантия от 24 до 36 месяцев",
    },
    {
      icon: "🔧",
      title: "Сервисное обслуживание",
      description: "Сеть сервисных центров по всей России",
    },
    {
      icon: "📋",
      title: "Лизинг без переплат",
      description: "Оформление лизинга с первоначальным взносом от 10%",
    },
  ]

  const testimonials = [
    {
      name: "Алексей Петров",
      company: "ООО 'СтройТехника'",
      text: "Купили SANY 530S полгода назад. Отличная машина, работает без проблем. Цена была на 25% ниже, чем у официального дилера.",
      rating: 5,
    },
    {
      name: "Михаил Сидоров",
      company: "ЗАО 'БетонСтрой'",
      text: "Заказывали 2 автобетононасоса SANY. Доставили точно в срок, качество на высоте. Рекомендую!",
      rating: 5,
    },
    {
      name: "Дмитрий Козлов",
      company: "ИП Козлов Д.А.",
      text: "Помогли с оформлением лизинга, все прошло быстро и без проблем. Техника работает отлично.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero секция */}
      <section className="relative bg-gradient-to-r from-black via-zinc-900 to-black py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Купить автобетононасос{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">SANY</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Прямые поставки из Китая • Лучшие цены • Гарантия качества • Лизинг 0%
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                Смотреть каталог и цены
              </button>
              <button
                onClick={() => document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" })}
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              >
                Получить консультацию
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Почему выбирают нас</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="bg-zinc-800 border-zinc-700 hover:bg-zinc-750 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{advantage.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{advantage.title}</h3>
                  <p className="text-gray-300">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Каталог и цены */}
      <section id="catalog" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Каталог автобетононасосов SANY</h2>
            <p className="text-xl text-gray-300">Актуальные цены и наличие на складе</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pumpModels.map((pump) => (
              <Card
                key={pump.id}
                className="bg-zinc-900 border-zinc-800 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <img src={pump.image || "/placeholder.svg"} alt={pump.name} className="w-full h-48 object-cover" />
                  {pump.discount && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {pump.discount}
                    </div>
                  )}
                  {!pump.inStock && (
                    <div className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Под заказ
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{pump.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Высота подачи:</span>
                      <span className="text-white font-semibold">{pump.height}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Производительность:</span>
                      <span className="text-white font-semibold">{pump.performance}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Поставка:</span>
                      <span className="text-white font-semibold">{pump.delivery}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Гарантия:</span>
                      <span className="text-white font-semibold">{pump.warranty}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      {pump.oldPrice && <span className="text-gray-400 line-through text-sm">{pump.oldPrice}</span>}
                      <span className="text-2xl font-bold text-blue-400">{pump.price}</span>
                    </div>
                    <div className="space-y-1">
                      {pump.features.map((feature, index) => (
                        <div key={index} className="text-xs text-gray-300 flex items-center gap-1">
                          <span className="text-green-400">✓</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleQuickOrder(pump)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      Быстрый заказ
                    </button>
                    <button
                      onClick={() => handleWhatsAppOrder(pump)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <span>📱</span>
                      Заказать в WhatsApp
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Отзывы наших клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-zinc-800 border-zinc-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Консультация */}
      <section id="consultation" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Получить консультацию</h2>
              <p className="text-xl text-gray-300">
                Наши эксперты помогут выбрать подходящую модель и рассчитают стоимость с учетом ваших потребностей
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">Контактная информация</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-xl">📞</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Телефон</div>
                      <div className="text-gray-300">+7 (919) 042-24-92</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-xl">📱</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">WhatsApp</div>
                      <div className="text-gray-300">Быстрая связь 24/7</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-xl">📧</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Email</div>
                      <div className="text-gray-300">zhukovigor@mail.ru</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-zinc-900 rounded-lg">
                  <h4 className="font-bold text-white mb-4">🎯 Что мы предлагаем:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Бесплатную консультацию по выбору модели
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Расчет экономической эффективности
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Помощь в оформлении лизинга
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Организацию доставки и растаможки
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Гарантийное и постгарантийное обслуживание
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-white">Заказать обратный звонок</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-white mb-2">Ваше имя</label>
                        <input
                          type="text"
                          className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:border-blue-500 focus:outline-none"
                          placeholder="Введите ваше имя"
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2">Телефон</label>
                        <input
                          type="tel"
                          className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:border-blue-500 focus:outline-none"
                          placeholder="+7 (999) 123-45-67"
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2">Интересующая модель</label>
                        <select className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:border-blue-500 focus:outline-none">
                          <option value="">Выберите модель</option>
                          {pumpModels.map((pump) => (
                            <option key={pump.id} value={pump.model}>
                              {pump.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-white mb-2">Комментарий</label>
                        <textarea
                          className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:border-blue-500 focus:outline-none"
                          rows={3}
                          placeholder="Дополнительная информация о ваших потребностях"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                      >
                        Заказать звонок
                      </button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Часто задаваемые вопросы</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "Какие гарантии вы предоставляете?",
                answer:
                  "Мы предоставляем официальную гарантию от 24 до 36 месяцев в зависимости от модели. Гарантия покрывает все основные узлы и агрегаты автобетононасоса.",
              },
              {
                question: "Сколько времени занимает поставка?",
                answer:
                  "Стандартное время поставки составляет от 20 до 45 дней в зависимости от модели и наличия на складе в Китае. Мы информируем о точных сроках при оформлении заказа.",
              },
              {
                question: "Возможно ли оформление лизинга?",
                answer:
                  "Да, мы работаем с ведущими лизинговыми компаниями. Возможно оформление лизинга с первоначальным взносом от 10% и ставкой от 8% годовых.",
              },
              {
                question: "Есть ли сервисное обслуживание в регионах?",
                answer:
                  "У нас есть партнерская сеть сервисных центров по всей России. Мы обеспечиваем гарантийное и постгарантийное обслуживание, а также поставку оригинальных запчастей.",
              },
              {
                question: "Можно ли посмотреть технику перед покупкой?",
                answer:
                  "Да, мы организуем демонстрацию техники на объектах наших клиентов или на специальных площадках. Также возможна поездка на завод SANY в Китай.",
              },
            ].map((faq, index) => (
              <Card key={index} className="bg-zinc-800 border-zinc-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Готовы купить автобетононасос SANY?</h2>
          <p className="text-xl mb-8">Получите персональное предложение с максимальной скидкой</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/79190422492"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <span>📱</span>
              Написать в WhatsApp
            </a>
            <a
              href="tel:+79190422492"
              className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <span>📞</span>
              Позвонить сейчас
            </a>
          </div>
        </div>
      </section>

      {/* Модальное окно быстрого заказа */}
      {showQuickOrder && selectedPump && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Быстрый заказ</h3>
              <button onClick={() => setShowQuickOrder(false)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold text-white">{selectedPump.name}</h4>
              <p className="text-blue-400 text-lg font-bold">{selectedPump.price}</p>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700"
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
              >
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Навигация */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-white">SANY</div>
              <div className="text-sm text-gray-400">Автобетононасосы</div>
            </a>
            <div className="flex items-center space-x-6">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">
                Главная
              </a>
              <a href="/#catalog" className="text-gray-300 hover:text-white transition-colors">
                Каталог
              </a>
              <a href="/#contact" className="text-gray-300 hover:text-white transition-colors">
                Контакты
              </a>
              <a
                href="https://wa.me/79190422492"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
