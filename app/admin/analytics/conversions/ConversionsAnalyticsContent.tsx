"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Target,
  TrendingUp,
  Users,
  Phone,
  Mail,
  Download,
  RefreshCw,
  AlertTriangle,
  Calendar,
  DollarSign,
} from "lucide-react"

interface ConversionData {
  goals: Array<{
    name: string
    completions: number
    conversionRate: number
    value: number
    change: number
  }>
  funnels: Array<{
    step: string
    users: number
    dropoffRate: number
  }>
  sources: Array<{
    source: string
    conversions: number
    conversionRate: number
    cost: number
    roas: number
  }>
}

export default function ConversionsAnalyticsContent() {
  const [data, setData] = useState<ConversionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchConversionData()
  }, [])

  const fetchConversionData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Проверяем подключение к Google
      const statusResponse = await fetch("/api/auth/google/status")
      const statusResult = await statusResponse.json()

      if (!statusResult.connected) {
        setError("Google Analytics не подключен. Перейдите в раздел 'Google SEO' для настройки.")
        setLoading(false)
        return
      }

      // Получаем данные конверсий
      const response = await fetch("/api/conversions-data")
      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error || "Ошибка загрузки данных конверсий")
      }
    } catch (err) {
      setError("Ошибка подключения к API")
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchConversionData()
    setRefreshing(false)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ru-RU").format(num)
  }

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`
  }

  const formatChange = (change: number) => {
    const sign = change > 0 ? "+" : ""
    return `${sign}${change.toFixed(1)}%`
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(num)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">🎯 Анализ конверсий</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700 animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-8 bg-gray-700 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Моковые данные для демонстрации
  const mockData: ConversionData = {
    goals: [
      { name: "Заявка на консультацию", completions: 127, conversionRate: 2.4, value: 15000, change: 12.3 },
      { name: "Звонок с сайта", completions: 89, conversionRate: 1.7, value: 12000, change: -5.2 },
      { name: "Скачивание каталога", completions: 234, conversionRate: 4.5, value: 3000, change: 18.7 },
      { name: "Заполнение формы", completions: 156, conversionRate: 3.0, value: 8000, change: 7.8 },
      { name: "Подписка на рассылку", completions: 67, conversionRate: 1.3, value: 2000, change: -2.1 },
      { name: "Просмотр контактов", completions: 345, conversionRate: 6.6, value: 1000, change: 23.4 },
    ],
    funnels: [
      { step: "Посещение сайта", users: 5234, dropoffRate: 0 },
      { step: "Просмотр каталога", users: 2876, dropoffRate: 45.1 },
      { step: "Просмотр модели", users: 1543, dropoffRate: 46.3 },
      { step: "Заполнение формы", users: 432, dropoffRate: 72.0 },
      { step: "Отправка заявки", users: 127, dropoffRate: 70.6 },
    ],
    sources: [
      { source: "Органический поиск", conversions: 78, conversionRate: 2.8, cost: 0, roas: 0 },
      { source: "Прямые заходы", conversions: 45, conversionRate: 1.9, cost: 0, roas: 0 },
      { source: "Google Ads", conversions: 23, conversionRate: 4.2, cost: 45000, roas: 2.1 },
      { source: "Yandex Direct", conversions: 18, conversionRate: 3.8, cost: 32000, roas: 1.8 },
      { source: "Социальные сети", conversions: 12, conversionRate: 2.1, cost: 8000, roas: 3.2 },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">🎯 Анализ конверсий</h1>
          <p className="text-gray-400 mt-2">Отслеживание целей и эффективности воронки продаж</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            variant="outline"
            className="border-blue-600 text-blue-400 hover:bg-blue-600"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Обновить
          </Button>
        </div>
      </div>

      {error && (
        <Alert className="bg-red-900/20 border-red-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-300">
            <div className="flex items-center justify-between">
              <span>{error}</span>
              {error.includes("не подключен") && (
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <a href="/admin/google-seo">Настроить</a>
                </Button>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.goals.map((goal, index) => {
          const icons = [Phone, Mail, Download, Target, Users, Calendar]
          const Icon = icons[index % icons.length]
          const colors = [
            "from-blue-600 to-blue-700 border-blue-500",
            "from-green-600 to-green-700 border-green-500",
            "from-purple-600 to-purple-700 border-purple-500",
            "from-orange-600 to-orange-700 border-orange-500",
            "from-red-600 to-red-700 border-red-500",
            "from-indigo-600 to-indigo-700 border-indigo-500",
          ]

          return (
            <Card key={index} className={`bg-gradient-to-r ${colors[index % colors.length]}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Icon className="w-8 h-8 text-white" />
                  <div className="flex-1">
                    <p className="text-white/80 text-sm">{goal.name}</p>
                    <p className="text-2xl font-bold text-white">{formatNumber(goal.completions)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`text-xs ${goal.change > 0 ? "bg-green-800" : "bg-red-800"}`}>
                        {formatChange(goal.change)}
                      </Badge>
                      <span className="text-white/70 text-xs">
                        {formatPercentage(goal.conversionRate)} • {formatCurrency(goal.value)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Conversion Funnel */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Воронка конверсий
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.funnels.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-white font-medium">{step.step}</p>
                      {step.dropoffRate > 0 && (
                        <p className="text-red-400 text-sm">Отсев: {formatPercentage(step.dropoffRate)}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-400 font-bold text-xl">{formatNumber(step.users)}</p>
                    <p className="text-gray-400 text-sm">пользователей</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2 w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(step.users / mockData.funnels[0].users) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conversion by Source */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Конверсии по источникам трафика
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.sources.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-4">
                  <Badge className="bg-blue-600">#{index + 1}</Badge>
                  <div>
                    <p className="text-white font-medium">{source.source}</p>
                    <p className="text-gray-400 text-sm">Конверсия: {formatPercentage(source.conversionRate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-green-400 font-bold">{formatNumber(source.conversions)}</p>
                    <p className="text-gray-400 text-xs">Конверсии</p>
                  </div>
                  <div className="text-center">
                    <p className="text-orange-400 font-bold">
                      {source.cost > 0 ? formatCurrency(source.cost) : "Бесплатно"}
                    </p>
                    <p className="text-gray-400 text-xs">Стоимость</p>
                  </div>
                  <div className="text-center">
                    <p className="text-purple-400 font-bold">{source.roas > 0 ? `${source.roas.toFixed(1)}x` : "—"}</p>
                    <p className="text-gray-400 text-xs">ROAS</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-blue-900/20 border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Рекомендации по улучшению конверсий
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-white font-medium">Высокий приоритет:</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Оптимизировать форму заявки - высокий отсев на этапе заполнения (72%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Улучшить страницы моделей - много пользователей уходят после просмотра каталога</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>Добавить онлайн-чат для увеличения конверсии звонков</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-white font-medium">Средний приоритет:</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Увеличить бюджет на Google Ads - хороший ROAS (2.1x)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Настроить ретаргетинг для пользователей, просмотревших каталог</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Развивать социальные сети - высокий ROAS (3.2x)</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
