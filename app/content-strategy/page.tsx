"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ContentPlan {
  id: string
  title: string
  type: "landing" | "article" | "guide" | "comparison" | "faq"
  keywords: string[]
  priority: "high" | "medium" | "low"
  status: "planned" | "writing" | "review" | "published"
  deadline: string
  wordCount: number
  targetAudience: string
  contentBrief: string
  expectedTraffic: number
  competitorAnalysis: string[]
  lsiKeywords: string[]
}

export default function ContentStrategy() {
  const [contentPlan, setContentPlan] = useState<ContentPlan[]>([])
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  const contentPlanList: ContentPlan[] = [
    {
      id: "1",
      title: "Купить автобетононасос SANY - каталог и цены",
      type: "landing",
      keywords: ["купить автобетононасос", "автобетононасос цена", "заказать автобетононасос"],
      priority: "high",
      status: "planned",
      deadline: "2024-12-20",
      wordCount: 2000,
      targetAudience: "Строительные компании, подрядчики",
      contentBrief: "Коммерческая посадочная страница с каталогом, ценами, формой заказа и преимуществами SANY",
      expectedTraffic: 1500,
      competitorAnalysis: ["betononasos.ru", "sany-russia.com"],
      lsiKeywords: ["стоимость", "прайс", "заказать", "доставка", "гарантия"],
    },
    {
      id: "2",
      title: "Как выбрать автобетононасос: полное руководство 2024",
      type: "guide",
      keywords: ["как выбрать автобетононасос", "критерии выбора", "какой автобетононасос лучше"],
      priority: "high",
      status: "writing",
      deadline: "2024-12-25",
      wordCount: 3500,
      targetAudience: "Покупатели, принимающие решение о покупке",
      contentBrief: "Экспертное руководство с критериями выбора, сравнением характеристик, советами экспертов",
      expectedTraffic: 800,
      competitorAnalysis: ["stroyteh.ru", "betonnoe-oborudovanie.ru"],
      lsiKeywords: ["характеристики", "параметры", "высота подачи", "производительность", "мощность"],
    },
    {
      id: "3",
      title: "Автобетононасосы SANY vs конкуренты: честное сравнение",
      type: "comparison",
      keywords: ["SANY vs Putzmeister", "сравнение автобетононасосов", "лучший автобетононасос"],
      priority: "medium",
      status: "planned",
      deadline: "2025-01-10",
      wordCount: 2500,
      targetAudience: "Покупатели, сравнивающие бренды",
      contentBrief: "Объективное сравнение SANY с Putzmeister, Schwing, другими брендами по ключевым параметрам",
      expectedTraffic: 600,
      competitorAnalysis: ["putzmeister.ru", "schwing.ru"],
      lsiKeywords: ["качество", "надежность", "цена", "сервис", "запчасти"],
    },
    {
      id: "4",
      title: "Аренда автобетононасоса: когда выгоднее арендовать",
      type: "article",
      keywords: ["аренда автобетононасоса", "арендовать бетононасос", "стоимость аренды"],
      priority: "medium",
      status: "planned",
      deadline: "2025-01-15",
      wordCount: 1800,
      targetAudience: "Малые строительные компании, частные застройщики",
      contentBrief: "Статья о преимуществах аренды vs покупки, расчет экономической эффективности",
      expectedTraffic: 400,
      competitorAnalysis: ["arenda-tehniki.ru", "stroymash.ru"],
      lsiKeywords: ["стоимость", "выгода", "экономия", "краткосрочная аренда", "долгосрочная аренда"],
    },
    {
      id: "5",
      title: "Техническое обслуживание автобетононасосов SANY",
      type: "article",
      keywords: ["обслуживание автобетононасоса", "ремонт SANY", "запчасти SANY"],
      priority: "medium",
      status: "planned",
      deadline: "2025-01-20",
      wordCount: 2200,
      targetAudience: "Владельцы техники SANY, сервисные центры",
      contentBrief: "Руководство по ТО, регламент обслуживания, где купить запчасти, сервисные центры",
      expectedTraffic: 300,
      competitorAnalysis: ["sany-service.ru", "zapchasti-sany.ru"],
      lsiKeywords: ["ремонт", "запчасти", "сервис", "техобслуживание", "гарантия"],
    },
    {
      id: "6",
      title: "Автобетононасосы в Москве: где купить и цены",
      type: "landing",
      keywords: ["автобетононасос Москва", "купить в Москве", "цены Москва"],
      priority: "high",
      status: "planned",
      deadline: "2024-12-30",
      wordCount: 1500,
      targetAudience: "Покупатели из Москвы и МО",
      contentBrief: "Региональная посадочная страница с местными контактами, ценами, условиями доставки",
      expectedTraffic: 500,
      competitorAnalysis: ["moscow-tehnika.ru", "betononasos-msk.ru"],
      lsiKeywords: ["Москва", "Московская область", "доставка", "склад", "офис"],
    },
    {
      id: "7",
      title: "FAQ: Часто задаваемые вопросы об автобетононасосах",
      type: "faq",
      keywords: ["вопросы об автобетононасосах", "FAQ автобетононасос", "ответы"],
      priority: "low",
      status: "planned",
      deadline: "2025-02-01",
      wordCount: 1200,
      targetAudience: "Все потенциальные покупатели",
      contentBrief: "Сборник популярных вопросов и экспертных ответов о выборе, эксплуатации, покупке",
      expectedTraffic: 200,
      competitorAnalysis: ["faq-tehnika.ru"],
      lsiKeywords: ["вопросы", "ответы", "помощь", "консультация", "советы"],
    },
    {
      id: "8",
      title: "Лизинг автобетононасосов: условия и преимущества",
      type: "article",
      keywords: ["лизинг автобетононасоса", "автобетононасос в лизинг", "условия лизинга"],
      priority: "medium",
      status: "review",
      deadline: "2024-12-28",
      wordCount: 2000,
      targetAudience: "Компании, рассматривающие лизинг",
      contentBrief: "Подробная статья о лизинговых программах, расчетах, документах, преимуществах",
      expectedTraffic: 350,
      competitorAnalysis: ["lizing-tehniki.ru", "sberleasing.ru"],
      lsiKeywords: ["рассрочка", "кредит", "финансирование", "первоначальный взнос", "ставка"],
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      setContentPlan(contentPlanList)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredContent = contentPlan.filter((content) => {
    const typeMatch = selectedType === "all" || content.type === selectedType
    const statusMatch = selectedStatus === "all" || content.status === selectedStatus
    return typeMatch && statusMatch
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "landing":
        return "🎯"
      case "article":
        return "📝"
      case "guide":
        return "📚"
      case "comparison":
        return "⚖️"
      case "faq":
        return "❓"
      default:
        return "📄"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "review":
        return "bg-blue-100 text-blue-800"
      case "writing":
        return "bg-yellow-100 text-yellow-800"
      case "planned":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalTraffic = contentPlan.reduce((sum, content) => sum + content.expectedTraffic, 0)
  const publishedContent = contentPlan.filter((c) => c.status === "published").length
  const inProgressContent = contentPlan.filter((c) => c.status === "writing" || c.status === "review").length

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-xl">Загрузка контент-стратегии...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Контент-стратегия</h1>
          <p className="text-gray-400 text-lg">
            План создания контента на основе семантического ядра и SEO рекомендаций
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Всего материалов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{contentPlan.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Опубликовано</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{publishedContent}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">В работе</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{inProgressContent}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Ожидаемый трафик</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{totalTraffic.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Фильтры */}
        <div className="mb-8 flex gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700"
          >
            <option value="all">Все типы</option>
            <option value="landing">🎯 Посадочные страницы</option>
            <option value="article">📝 Статьи</option>
            <option value="guide">📚 Руководства</option>
            <option value="comparison">⚖️ Сравнения</option>
            <option value="faq">❓ FAQ</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700"
          >
            <option value="all">Все статусы</option>
            <option value="planned">Запланировано</option>
            <option value="writing">В написании</option>
            <option value="review">На проверке</option>
            <option value="published">Опубликовано</option>
          </select>
        </div>

        {/* Контент-план */}
        <div className="space-y-6">
          {filteredContent.map((content) => (
            <Card key={content.id} className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getTypeIcon(content.type)}</span>
                    <div>
                      <CardTitle className="text-white text-lg">{content.title}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(content.priority)}`}>
                          {content.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(content.status)}`}>
                          {content.status}
                        </span>
                        <span className="text-xs text-gray-400">{content.wordCount.toLocaleString()} слов</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Дедлайн:</div>
                    <div className="text-white">{content.deadline}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-300">{content.contentBrief}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">🎯 Целевая аудитория:</h4>
                      <p className="text-gray-300 text-sm">{content.targetAudience}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">📈 Ожидаемый трафик:</h4>
                      <p className="text-gray-300 text-sm">
                        {content.expectedTraffic.toLocaleString()} посетителей/месяц
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">🔑 Основные ключевые слова:</h4>
                    <div className="flex flex-wrap gap-2">
                      {content.keywords.map((keyword, index) => (
                        <span key={index} className="bg-blue-900 text-blue-200 px-2 py-1 rounded text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">🔍 LSI-ключевые слова:</h4>
                    <div className="flex flex-wrap gap-2">
                      {content.lsiKeywords.map((keyword, index) => (
                        <span key={index} className="bg-zinc-700 text-gray-300 px-2 py-1 rounded text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">🔍 Анализ конкурентов:</h4>
                    <div className="flex flex-wrap gap-2">
                      {content.competitorAnalysis.map((competitor, index) => (
                        <span key={index} className="bg-red-900 text-red-200 px-2 py-1 rounded text-sm">
                          {competitor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Кнопки действий */}
        <div className="mt-8 flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            Экспортировать план
          </button>
          <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            Создать техзадания
          </button>
          <a
            href="/seo-recommendations"
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            ← К рекомендациям
          </a>
        </div>
      </div>
    </div>
  )
}
