"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Keyword {
  id: string
  keyword: string
  frequency: number
  competition: "low" | "medium" | "high"
  intent: "informational" | "commercial" | "navigational" | "transactional"
  category: string
  subcategory: string
  position?: number
  cpc?: number
  difficulty: number
  priority: "high" | "medium" | "low"
  status: "active" | "planned" | "optimized"
  relatedKeywords: string[]
  landingPage?: string
}

interface KeywordCategory {
  name: string
  description: string
  keywords: Keyword[]
  totalVolume: number
  avgDifficulty: number
}

export default function SemanticCore() {
  const [categories, setCategories] = useState<KeywordCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedIntent, setSelectedIntent] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(true)

  // Семантическое ядро для автобетононасосов
  const semanticCore: KeywordCategory[] = [
    {
      name: "Коммерческие запросы",
      description: "Запросы с намерением покупки",
      totalVolume: 15400,
      avgDifficulty: 75,
      keywords: [
        {
          id: "1",
          keyword: "купить автобетононасос",
          frequency: 2400,
          competition: "high",
          intent: "transactional",
          category: "Коммерческие запросы",
          subcategory: "Покупка",
          position: 12,
          cpc: 45.5,
          difficulty: 85,
          priority: "high",
          status: "active",
          relatedKeywords: ["автобетононасос цена", "автобетононасос стоимость"],
          landingPage: "/#catalog",
        },
        {
          id: "2",
          keyword: "автобетононасос цена",
          frequency: 3200,
          competition: "high",
          intent: "commercial",
          category: "Коммерческие запросы",
          subcategory: "Цены",
          position: 25,
          cpc: 38.2,
          difficulty: 80,
          priority: "high",
          status: "planned",
          relatedKeywords: ["стоимость автобетононасоса", "цена бетононасоса"],
        },
        {
          id: "3",
          keyword: "автобетононасос в лизинг",
          frequency: 800,
          competition: "medium",
          intent: "commercial",
          category: "Коммерческие запросы",
          subcategory: "Лизинг",
          difficulty: 65,
          priority: "medium",
          status: "planned",
          relatedKeywords: ["лизинг строительной техники", "автобетононасос рассрочка"],
        },
        {
          id: "4",
          keyword: "автобетононасос новый",
          frequency: 1200,
          competition: "medium",
          intent: "commercial",
          category: "Коммерческие запросы",
          subcategory: "Новая техника",
          difficulty: 70,
          priority: "medium",
          status: "active",
          relatedKeywords: ["новый бетононасос", "автобетононасос с завода"],
        },
      ],
    },
    {
      name: "Брендовые запросы",
      description: "Запросы с упоминанием бренда SANY",
      totalVolume: 4850,
      avgDifficulty: 45,
      keywords: [
        {
          id: "5",
          keyword: "автобетононасос SANY",
          frequency: 1200,
          competition: "medium",
          intent: "commercial",
          category: "Брендовые запросы",
          subcategory: "Общие",
          position: 8,
          cpc: 25.3,
          difficulty: 50,
          priority: "high",
          status: "optimized",
          relatedKeywords: ["SANY бетононасос", "техника SANY"],
          landingPage: "/",
        },
        {
          id: "6",
          keyword: "SANY SYM5365THBFS",
          frequency: 150,
          competition: "low",
          intent: "navigational",
          category: "Брендовые запросы",
          subcategory: "Модели",
          position: 3,
          cpc: 15.8,
          difficulty: 30,
          priority: "medium",
          status: "optimized",
          relatedKeywords: ["SYM5365THBFS характеристики", "SANY 530S"],
        },
        {
          id: "7",
          keyword: "SANY официальный дилер",
          frequency: 400,
          competition: "medium",
          intent: "navigational",
          category: "Брендовые запросы",
          subcategory: "Дилеры",
          difficulty: 55,
          priority: "high",
          status: "planned",
          relatedKeywords: ["дилер SANY", "представитель SANY"],
        },
      ],
    },
    {
      name: "Информационные запросы",
      description: "Запросы для получения информации",
      totalVolume: 8200,
      avgDifficulty: 35,
      keywords: [
        {
          id: "8",
          keyword: "что такое автобетононасос",
          frequency: 1800,
          competition: "low",
          intent: "informational",
          category: "Информационные запросы",
          subcategory: "Определения",
          difficulty: 25,
          priority: "medium",
          status: "planned",
          relatedKeywords: ["принцип работы автобетононасоса", "устройство автобетононасоса"],
        },
        {
          id: "9",
          keyword: "характеристики автобетононасоса",
          frequency: 950,
          competition: "low",
          intent: "informational",
          category: "Информационные запросы",
          subcategory: "Технические данные",
          difficulty: 30,
          priority: "medium",
          status: "active",
          relatedKeywords: ["технические характеристики", "параметры автобетононасоса"],
        },
        {
          id: "10",
          keyword: "как выбрать автобетононасос",
          frequency: 1200,
          competition: "medium",
          intent: "informational",
          category: "Информационные запросы",
          subcategory: "Выбор",
          difficulty: 40,
          priority: "high",
          status: "planned",
          relatedKeywords: ["критерии выбора автобетононасоса", "какой автобетононасос лучше"],
        },
      ],
    },
    {
      name: "Геозависимые запросы",
      description: "Запросы с географической привязкой",
      totalVolume: 3600,
      avgDifficulty: 60,
      keywords: [
        {
          id: "11",
          keyword: "автобетононасос Москва",
          frequency: 800,
          competition: "high",
          intent: "commercial",
          category: "Геозависимые запросы",
          subcategory: "Москва",
          difficulty: 75,
          priority: "high",
          status: "planned",
          relatedKeywords: ["купить автобетононасос Москва", "аренда автобетононасоса Москва"],
        },
        {
          id: "12",
          keyword: "автобетононасос СПб",
          frequency: 600,
          competition: "high",
          intent: "commercial",
          category: "Геозависимые запросы",
          subcategory: "Санкт-Петербург",
          difficulty: 70,
          priority: "medium",
          status: "planned",
          relatedKeywords: ["автобетононасос Санкт-Петербург", "бетононасос СПб"],
        },
      ],
    },
    {
      name: "Конкурентные запросы",
      description: "Запросы с упоминанием конкурентов",
      totalVolume: 2100,
      avgDifficulty: 55,
      keywords: [
        {
          id: "13",
          keyword: "автобетононасос Putzmeister vs SANY",
          frequency: 120,
          competition: "medium",
          intent: "informational",
          category: "Конкурентные запросы",
          subcategory: "Сравнение",
          difficulty: 50,
          priority: "low",
          status: "planned",
          relatedKeywords: ["сравнение автобетононасосов", "SANY или Putzmeister"],
        },
        {
          id: "14",
          keyword: "альтернатива Putzmeister",
          frequency: 200,
          competition: "medium",
          intent: "commercial",
          category: "Конкурентные запросы",
          subcategory: "Альтернативы",
          difficulty: 60,
          priority: "medium",
          status: "planned",
          relatedKeywords: ["замена Putzmeister", "аналог Putzmeister"],
        },
      ],
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      setCategories(semanticCore)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredKeywords = categories
    .filter((cat) => selectedCategory === "all" || cat.name === selectedCategory)
    .flatMap((cat) => cat.keywords)
    .filter((kw) => selectedIntent === "all" || kw.intent === selectedIntent)
    .filter((kw) => kw.keyword.toLowerCase().includes(searchTerm.toLowerCase()))

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case "commercial":
        return "bg-green-100 text-green-800"
      case "transactional":
        return "bg-blue-100 text-blue-800"
      case "informational":
        return "bg-yellow-100 text-yellow-800"
      case "navigational":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
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
      case "optimized":
        return "bg-green-100 text-green-800"
      case "active":
        return "bg-blue-100 text-blue-800"
      case "planned":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalKeywords = categories.reduce((sum, cat) => sum + cat.keywords.length, 0)
  const totalVolume = categories.reduce((sum, cat) => sum + cat.totalVolume, 0)
  const avgDifficulty = Math.round(categories.reduce((sum, cat) => sum + cat.avgDifficulty, 0) / categories.length)

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-xl">Загрузка семантического ядра...</p>
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
          <h1 className="text-4xl font-bold mb-4">Семантическое ядро</h1>
          <p className="text-gray-400 text-lg">
            Структурированный набор ключевых слов для SEO продвижения автобетононасосов SANY
          </p>
        </div>

        {/* Общая статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Всего ключевых слов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalKeywords}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Общий объем поиска</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{totalVolume.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Средняя сложность</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{avgDifficulty}%</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Категорий</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{categories.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Фильтры и поиск */}
        <div className="mb-8 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Поиск по ключевым словам..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 flex-1 min-w-64"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700"
          >
            <option value="all">Все категории</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={selectedIntent}
            onChange={(e) => setSelectedIntent(e.target.value)}
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700"
          >
            <option value="all">Все интенты</option>
            <option value="commercial">Коммерческие</option>
            <option value="transactional">Транзакционные</option>
            <option value="informational">Информационные</option>
            <option value="navigational">Навигационные</option>
          </select>

          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
          >
            Добавить ключевое слово
          </button>
        </div>

        {/* Категории семантического ядра */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {categories.map((category) => (
            <Card key={category.name} className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  {category.name}
                  <span className="text-sm bg-zinc-700 px-2 py-1 rounded">{category.keywords.length} слов</span>
                </CardTitle>
                <p className="text-gray-400 text-sm">{category.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Объем поиска:</span>
                    <span className="text-white">{category.totalVolume.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Средняя сложность:</span>
                    <span className="text-white">{category.avgDifficulty}%</span>
                  </div>
                  <div className="pt-2">
                    <div className="text-xs text-gray-500 mb-1">Топ ключевые слова:</div>
                    {category.keywords.slice(0, 3).map((kw) => (
                      <div key={kw.id} className="text-sm text-gray-300">
                        • {kw.keyword} ({kw.frequency.toLocaleString()})
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Таблица ключевых слов */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Детальный список ключевых слов ({filteredKeywords.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left py-3 px-4 text-gray-400">Ключевое слово</th>
                    <th className="text-center py-3 px-4 text-gray-400">Частота</th>
                    <th className="text-center py-3 px-4 text-gray-400">Интент</th>
                    <th className="text-center py-3 px-4 text-gray-400">Конкуренция</th>
                    <th className="text-center py-3 px-4 text-gray-400">Сложность</th>
                    <th className="text-center py-3 px-4 text-gray-400">Приоритет</th>
                    <th className="text-center py-3 px-4 text-gray-400">Статус</th>
                    <th className="text-center py-3 px-4 text-gray-400">Позиция</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKeywords.map((keyword) => (
                    <tr key={keyword.id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-white">{keyword.keyword}</div>
                          <div className="text-xs text-gray-400">{keyword.category}</div>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4 text-white">{keyword.frequency.toLocaleString()}</td>
                      <td className="text-center py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${getIntentColor(keyword.intent)}`}>
                          {keyword.intent}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className={`font-medium ${getCompetitionColor(keyword.competition)}`}>
                          {keyword.competition}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <div className="flex items-center justify-center">
                          <div className="w-16 bg-zinc-700 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full ${
                                keyword.difficulty < 30
                                  ? "bg-green-500"
                                  : keyword.difficulty < 70
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${keyword.difficulty}%` }}
                            ></div>
                          </div>
                          <span className="text-white text-sm">{keyword.difficulty}%</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(keyword.priority)}`}>
                          {keyword.priority}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(keyword.status)}`}>
                          {keyword.status}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        {keyword.position ? (
                          <span
                            className={`font-bold ${
                              keyword.position <= 3
                                ? "text-green-500"
                                : keyword.position <= 10
                                  ? "text-yellow-500"
                                  : "text-red-500"
                            }`}
                          >
                            {keyword.position}
                          </span>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Рекомендации по контенту */}
        <Card className="bg-zinc-900 border-zinc-800 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Рекомендации по созданию контента</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">🎯 Приоритетные страницы для создания:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Страница с ценами на автобетононасосы</li>
                  <li>• Руководство по выбору автобетононасоса</li>
                  <li>• Сравнение моделей SANY</li>
                  <li>• Условия лизинга и рассрочки</li>
                  <li>• Технические характеристики моделей</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">📈 Возможности для роста:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Региональные страницы (Москва, СПб)</li>
                  <li>• Блог с экспертными статьями</li>
                  <li>• Видео-обзоры техники</li>
                  <li>• Кейсы использования</li>
                  <li>• FAQ по автобетононасосам</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Кнопки действий */}
        <div className="mt-8 flex gap-4">
          <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            Экспортировать в Excel
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            Импортировать ключевые слова
          </button>
          <a
            href="/"
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            ← Вернуться на главную
          </a>
        </div>
      </div>
    </div>
  )
}
