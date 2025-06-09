"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Globe,
  Clock,
  RefreshCw,
  AlertTriangle,
  Activity,
} from "lucide-react"

interface AnalyticsData {
  overview: {
    totalSessions: number
    totalUsers: number
    totalPageviews: number
    averageSessionDuration: number
    bounceRate: number
    newUsersPercentage: number
  }
  traffic: {
    organic: number
    direct: number
    referral: number
    social: number
    email: number
    paid: number
  }
  devices: {
    desktop: number
    mobile: number
    tablet: number
  }
  topPages: Array<{
    page: string
    sessions: number
    users: number
    bounceRate: number
    avgSessionDuration: number
  }>
}

export default function AnalyticsOverviewContent() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  const fetchAnalyticsData = async () => {
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

      // Получаем данные аналитики
      const response = await fetch("/api/analytics-data")
      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error || "Ошибка загрузки данных аналитики")
      }
    } catch (err) {
      setError("Ошибка подключения к API")
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchAnalyticsData()
    setRefreshing(false)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ru-RU").format(num)
  }

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">📊 Общая аналитика</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">📊 Общая аналитика</h1>
          <p className="text-gray-400 mt-2">Полный обзор посещаемости и поведения пользователей</p>
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

      {data ? (
        <>
          {/* Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Globe className="w-8 h-8 text-white" />
                  <div>
                    <p className="text-blue-100 text-sm">Сессии</p>
                    <p className="text-2xl font-bold text-white">{formatNumber(data.overview.totalSessions)}</p>
                    <p className="text-blue-200 text-xs">За последние 30 дней</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-600 to-green-700 border-green-500">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Users className="w-8 h-8 text-white" />
                  <div>
                    <p className="text-green-100 text-sm">Пользователи</p>
                    <p className="text-2xl font-bold text-white">{formatNumber(data.overview.totalUsers)}</p>
                    <p className="text-green-200 text-xs">
                      Новых: {formatPercentage(data.overview.newUsersPercentage)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Eye className="w-8 h-8 text-white" />
                  <div>
                    <p className="text-purple-100 text-sm">Просмотры страниц</p>
                    <p className="text-2xl font-bold text-white">{formatNumber(data.overview.totalPageviews)}</p>
                    <p className="text-purple-200 text-xs">Уникальные просмотры</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Clock className="w-8 h-8 text-white" />
                  <div>
                    <p className="text-orange-100 text-sm">Время на сайте</p>
                    <p className="text-2xl font-bold text-white">
                      {formatDuration(data.overview.averageSessionDuration)}
                    </p>
                    <p className="text-orange-200 text-xs">Среднее время сессии</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-red-600 to-red-700 border-red-500">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                  <div>
                    <p className="text-red-100 text-sm">Показатель отказов</p>
                    <p className="text-2xl font-bold text-white">{formatPercentage(data.overview.bounceRate)}</p>
                    <p className="text-red-200 text-xs">Процент отказов</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-indigo-600 to-indigo-700 border-indigo-500">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                  <div>
                    <p className="text-indigo-100 text-sm">Конверсия</p>
                    <p className="text-2xl font-bold text-white">2.4%</p>
                    <p className="text-indigo-200 text-xs">Цели достигнуты</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Traffic Sources */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MousePointer className="w-5 h-5" />
                  Источники трафика
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-white">Органический поиск</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{formatPercentage(data.traffic.organic)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-white">Прямые заходы</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{formatPercentage(data.traffic.direct)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-white">Переходы с сайтов</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{formatPercentage(data.traffic.referral)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-white">Социальные сети</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{formatPercentage(data.traffic.social)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-white">Email рассылки</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{formatPercentage(data.traffic.email)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-white">Платная реклама</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{formatPercentage(data.traffic.paid)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Устройства пользователей
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Десктоп</span>
                      <span className="text-white font-bold">{formatPercentage(data.devices.desktop)}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${data.devices.desktop}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Мобильные</span>
                      <span className="text-white font-bold">{formatPercentage(data.devices.mobile)}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${data.devices.mobile}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Планшеты</span>
                      <span className="text-white font-bold">{formatPercentage(data.devices.tablet)}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${data.devices.tablet}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
                    <h4 className="text-blue-400 font-medium mb-2">Рекомендации:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>
                        • {data.devices.mobile > 60 ? "Приоритет мобильной оптимизации" : "Улучшить мобильную версию"}
                      </li>
                      <li>
                        •{" "}
                        {data.devices.desktop > 50
                          ? "Поддерживать десктопную версию"
                          : "Фокус на мобильных пользователях"}
                      </li>
                      <li>• Тестировать на всех устройствах</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Pages */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Топ страниц по посещаемости
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-blue-600">#{index + 1}</Badge>
                      <div className="flex-1">
                        <p className="text-white font-medium truncate">{page.page}</p>
                        <p className="text-gray-400 text-sm">
                          Отказы: {formatPercentage(page.bounceRate)} • Время: {formatDuration(page.avgSessionDuration)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-400 font-bold">{formatNumber(page.sessions)} сессий</p>
                      <p className="text-gray-400 text-xs">{formatNumber(page.users)} пользователей</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-8 text-center">
            <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Нет данных аналитики</h3>
            <p className="text-gray-400 mb-6">Для получения данных аналитики необходимо подключить Google Analytics</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a href="/admin/google-seo">Настроить Google Analytics</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
