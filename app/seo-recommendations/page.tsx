"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Recommendation {
  id: string
  category: "optimization" | "content" | "technical" | "monitoring"
  priority: "high" | "medium" | "low"
  title: string
  description: string
  impact: string
  effort: "low" | "medium" | "high"
  status: "pending" | "in_progress" | "completed"
  deadline?: string
  assignee?: string
  keywords: string[]
  expectedResult: string
  progress: number
}

interface TechnicalIssue {
  type: "speed" | "mobile" | "meta" | "structure" | "links"
  severity: "critical" | "high" | "medium" | "low"
  page: string
  issue: string
  solution: string
  status: "open" | "fixing" | "resolved"
}

export default function SEORecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [technicalIssues, setTechnicalIssues] = useState<TechnicalIssue[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedPriority, setSelectedPriority] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  const updateTaskStatus = (taskId: string, newStatus: "pending" | "in_progress" | "completed", progress?: number) => {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === taskId ? { ...rec, status: newStatus, progress: progress || rec.progress } : rec)),
    )

    // Сохраняем в localStorage для персистентности
    const updatedRecs = recommendations.map((rec) =>
      rec.id === taskId ? { ...rec, status: newStatus, progress: progress || rec.progress } : rec,
    )
    localStorage.setItem("seo_recommendations", JSON.stringify(updatedRecs))

    // Отправляем событие в аналитику
    if (typeof window !== "undefined" && window.ym) {
      window.ym(102485605, "reachGoal", "task_status_updated", {
        task_id: taskId,
        new_status: newStatus,
        progress: progress,
      })
    }
  }

  const recommendationsList: Recommendation[] = [
    {
      id: "1",
      category: "optimization",
      priority: "high",
      title: "Создать посадочную страницу 'Купить автобетононасос'",
      description:
        "Создать отдельную страницу для ВЧ-запроса 'купить автобетононасос' с четким CTA, каталогом и прайсом",
      impact: "Потенциальный рост трафика на 40-60% по коммерческим запросам",
      effort: "high",
      status: "pending",
      deadline: "2024-12-20",
      keywords: ["купить автобетононасос", "автобетононасос цена", "заказать автобетононасос"],
      expectedResult: "Рост позиций с 12 до 5-7 места, увеличение конверсии на 25%",
      progress: 0,
    },
    {
      id: "2",
      category: "optimization",
      priority: "high",
      title: "Создать страницу с ценами и прайс-листом",
      description: "Разработать детальную страницу с ценами на все модели автобетононасосов SANY",
      impact: "Улучшение позиций по запросам 'цена', 'стоимость', 'прайс'",
      effort: "medium",
      status: "pending",
      deadline: "2024-12-15",
      keywords: ["автобетононасос цена", "стоимость автобетононасоса", "прайс автобетононасос"],
      expectedResult: "Рост позиций с 25 до 10-15 места",
      progress: 0,
    },
    {
      id: "3",
      category: "optimization",
      priority: "medium",
      title: "Улучшить внутреннюю перелинковку",
      description: "Оптимизировать внутренние ссылки, особенно для страниц с падающими позициями",
      impact: "Улучшение передачи ссылочного веса, рост позиций на 2-5 мест",
      effort: "low",
      status: "in_progress",
      keywords: ["автобетононасос купить", "бетононасос из Китая"],
      expectedResult: "Стабилизация позиций, рост на 3-5 позиций",
      progress: 30,
    },
    {
      id: "4",
      category: "content",
      priority: "high",
      title: "Создать руководство 'Как выбрать автобетононасос'",
      description: "Написать экспертную статью с критериями выбора, сравнением моделей",
      impact: "Захват трафика по информационным запросам, повышение экспертности",
      effort: "medium",
      status: "pending",
      deadline: "2024-12-25",
      keywords: ["как выбрать автобетононасос", "критерии выбора", "какой автобетононасос лучше"],
      expectedResult: "Позиции в ТОП-10 по информационным запросам",
      progress: 0,
    },
    {
      id: "5",
      category: "content",
      priority: "medium",
      title: "Добавить разделы по аренде и обслуживанию",
      description: "Расширить семантическое ядро статьями об аренде, обслуживании, запчастях",
      impact: "Расширение семантического ядра на 50+ новых запросов",
      effort: "high",
      status: "pending",
      keywords: ["аренда автобетононасоса", "обслуживание", "запчасти SANY"],
      expectedResult: "Дополнительный трафик 2000+ посетителей/месяц",
      progress: 0,
    },
    {
      id: "6",
      category: "content",
      priority: "medium",
      title: "Создать региональные страницы",
      description: "Разработать страницы для Москвы, СПб и других регионов",
      impact: "Захват геозависимого трафика, улучшение локального SEO",
      effort: "medium",
      status: "pending",
      keywords: ["автобетононасос Москва", "автобетононасос СПб"],
      expectedResult: "Рост позиций в регионах, +30% регионального трафика",
      progress: 0,
    },
    {
      id: "7",
      category: "technical",
      priority: "high",
      title: "Оптимизация скорости загрузки",
      description: "Улучшить Core Web Vitals, оптимизировать изображения и код",
      impact: "Улучшение пользовательского опыта и ранжирования",
      effort: "medium",
      status: "in_progress",
      keywords: ["все страницы"],
      expectedResult: "PageSpeed Score 90+, улучшение позиций на 2-3 места",
      progress: 60,
    },
    {
      id: "8",
      category: "technical",
      priority: "medium",
      title: "Проверка и оптимизация мета-тегов",
      description: "Убедиться, что у всех страниц есть уникальные title, description, H1",
      impact: "Улучшение CTR в поисковой выдаче",
      effort: "low",
      status: "pending",
      keywords: ["все ключевые страницы"],
      expectedResult: "Рост CTR на 15-20%",
      progress: 0,
    },
    {
      id: "9",
      category: "monitoring",
      priority: "medium",
      title: "Расширение списка отслеживаемых запросов",
      description: "Добавить средне- и низкочастотные запросы для детального анализа",
      impact: "Более точный мониторинг эффективности SEO",
      effort: "low",
      status: "pending",
      keywords: ["LSI-ключи", "длинный хвост"],
      expectedResult: "Полная картина видимости в поиске",
      progress: 0,
    },
    {
      id: "10",
      category: "monitoring",
      priority: "low",
      title: "Настройка отслеживания CTR",
      description: "Мониторинг кликабельности сниппетов и их корректировка",
      impact: "Увеличение органического трафика без роста позиций",
      effort: "low",
      status: "pending",
      keywords: ["все отслеживаемые запросы"],
      expectedResult: "Рост CTR на 10-15%",
      progress: 0,
    },
  ]

  const technicalIssuesList: TechnicalIssue[] = [
    {
      type: "speed",
      severity: "high",
      page: "/",
      issue: "Главная страница загружается 3.2 секунды",
      solution: "Оптимизировать изображения, минифицировать CSS/JS",
      status: "fixing",
    },
    {
      type: "mobile",
      severity: "medium",
      page: "/#catalog",
      issue: "Каталог не полностью адаптирован под мобильные устройства",
      solution: "Улучшить responsive дизайн каталога",
      status: "open",
    },
    {
      type: "meta",
      severity: "high",
      page: "/#contact",
      issue: "Отсутствует уникальный title для страницы контактов",
      solution: "Добавить уникальные мета-теги",
      status: "open",
    },
    {
      type: "structure",
      severity: "medium",
      page: "/",
      issue: "Отсутствует разметка Schema.org для товаров",
      solution: "Добавить структурированные данные для автобетононасосов",
      status: "open",
    },
    {
      type: "links",
      severity: "low",
      page: "/#gallery",
      issue: "Слабая внутренняя перелинковка в галерее",
      solution: "Добавить ссылки на детальные страницы моделей",
      status: "open",
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      // Проверяем, есть ли сохраненные данные
      const savedRecommendations = localStorage.getItem("seo_recommendations")
      if (savedRecommendations) {
        try {
          const parsed = JSON.parse(savedRecommendations)
          setRecommendations(parsed)
        } catch (error) {
          console.error("Ошибка загрузки сохраненных рекомендаций:", error)
          setRecommendations(recommendationsList)
        }
      } else {
        setRecommendations(recommendationsList)
      }
      setTechnicalIssues(technicalIssuesList)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredRecommendations = recommendations.filter((rec) => {
    const categoryMatch = selectedCategory === "all" || rec.category === selectedCategory
    const priorityMatch = selectedPriority === "all" || rec.priority === selectedPriority
    return categoryMatch && priorityMatch
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "optimization":
        return "🎯"
      case "content":
        return "📝"
      case "technical":
        return "⚙️"
      case "monitoring":
        return "📊"
      default:
        return "📋"
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
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const completedTasks = recommendations.filter((r) => r.status === "completed").length
  const inProgressTasks = recommendations.filter((r) => r.status === "in_progress").length
  const pendingTasks = recommendations.filter((r) => r.status === "pending").length
  const highPriorityTasks = recommendations.filter((r) => r.priority === "high").length

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-xl">Загрузка рекомендаций...</p>
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
          <h1 className="text-4xl font-bold mb-4">SEO Рекомендации и План Действий</h1>
          <p className="text-gray-400 text-lg">
            Детальный план оптимизации на основе анализа семантического ядра и текущих позиций
          </p>
        </div>

        {/* Статистика выполнения */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Выполнено</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{completedTasks}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">В работе</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{inProgressTasks}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Запланировано</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{pendingTasks}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Высокий приоритет</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{highPriorityTasks}</div>
            </CardContent>
          </Card>
        </div>

        {/* Фильтры */}
        <div className="mb-8 flex gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700"
          >
            <option value="all">Все категории</option>
            <option value="optimization">🎯 Оптимизация страниц</option>
            <option value="content">📝 Контент-стратегия</option>
            <option value="technical">⚙️ Технические доработки</option>
            <option value="monitoring">📊 Мониторинг</option>
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700"
          >
            <option value="all">Все приоритеты</option>
            <option value="high">Высокий</option>
            <option value="medium">Средний</option>
            <option value="low">Низкий</option>
          </select>
        </div>

        {/* Список рекомендаций */}
        <div className="space-y-6 mb-8">
          {filteredRecommendations.map((recommendation) => (
            <Card key={recommendation.id} className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getCategoryIcon(recommendation.category)}</span>
                    <div>
                      <CardTitle className="text-white text-lg">{recommendation.title}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(recommendation.priority)}`}>
                          {recommendation.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(recommendation.status)}`}>
                          {recommendation.status}
                        </span>
                        <span className={`text-xs ${getEffortColor(recommendation.effort)}`}>
                          Усилия: {recommendation.effort}
                        </span>
                      </div>
                    </div>
                  </div>
                  {recommendation.deadline && (
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Дедлайн:</div>
                      <div className="text-white">{recommendation.deadline}</div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-300">{recommendation.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">💡 Ожидаемый результат:</h4>
                      <p className="text-gray-300 text-sm">{recommendation.expectedResult}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">📈 Влияние:</h4>
                      <p className="text-gray-300 text-sm">{recommendation.impact}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">🔑 Ключевые слова:</h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.keywords.map((keyword, index) => (
                        <span key={index} className="bg-zinc-700 text-gray-300 px-2 py-1 rounded text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  {recommendation.progress > 0 && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Прогресс:</span>
                        <span className="text-white">{recommendation.progress}%</span>
                      </div>
                      <div className="w-full bg-zinc-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${recommendation.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    {recommendation.status === "pending" && (
                      <button
                        onClick={() => updateTaskStatus(recommendation.id, "in_progress", 10)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium transition-colors"
                      >
                        Начать выполнение
                      </button>
                    )}

                    {recommendation.status === "in_progress" && (
                      <>
                        <button
                          onClick={() =>
                            updateTaskStatus(
                              recommendation.id,
                              "in_progress",
                              Math.min(recommendation.progress + 25, 100),
                            )
                          }
                          className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-sm font-medium transition-colors"
                        >
                          +25% прогресса
                        </button>
                        <button
                          onClick={() => updateTaskStatus(recommendation.id, "completed", 100)}
                          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-medium transition-colors"
                        >
                          Завершить
                        </button>
                      </>
                    )}

                    {recommendation.status === "completed" && (
                      <button
                        onClick={() => updateTaskStatus(recommendation.id, "in_progress", 80)}
                        className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm font-medium transition-colors"
                      >
                        Вернуть в работу
                      </button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Технические проблемы */}
        <Card className="bg-zinc-900 border-zinc-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white">⚙️ Технические проблемы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {technicalIssues.map((issue, index) => (
                <div key={index} className="border border-zinc-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                      <span className="text-white font-medium">{issue.page}</span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        issue.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : issue.status === "fixing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-2">{issue.issue}</p>
                  <p className="text-gray-400 text-sm">💡 Решение: {issue.solution}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Выводы и следующие шаги */}
        <Card className="bg-zinc-900 border-zinc-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white">📋 Выводы и следующие шаги</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-zinc-800 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">🎯 Приоритетные задачи на ближайшие 2 недели:</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Создать посадочную страницу "Купить автобетононасос"</li>
                  <li>• Добавить страницу с ценами и прайс-листом</li>
                  <li>• Оптимизировать скорость загрузки главной страницы</li>
                  <li>• Добавить уникальные мета-теги для всех страниц</li>
                </ul>
              </div>

              <div className="bg-zinc-800 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">📈 Ожидаемые результаты через месяц:</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Рост позиций по коммерческим запросам на 5-10 мест</li>
                  <li>• Увеличение органического трафика на 40-60%</li>
                  <li>• Улучшение конверсии на 20-25%</li>
                  <li>• Расширение семантического ядра до 50+ запросов</li>
                </ul>
              </div>

              <div className="bg-zinc-800 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">🔄 Долгосрочная стратегия (3-6 месяцев):</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Создание экспертного блога с регулярными публикациями</li>
                  <li>• Развитие регионального SEO</li>
                  <li>• Работа с конкурентными запросами</li>
                  <li>• Построение ссылочной массы</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Кнопки действий */}
        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            Экспортировать план
          </button>
          <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            Создать задачи в Trello
          </button>
          <a
            href="/semantic-core"
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            ← К семантическому ядру
          </a>
        </div>
      </div>
    </div>
  )
}
