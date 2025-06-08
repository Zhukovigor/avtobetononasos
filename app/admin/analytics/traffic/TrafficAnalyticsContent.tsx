"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Globe,
  Search,
  ExternalLink,
  Share2,
  Mail,
  DollarSign,
  RefreshCw,
  AlertTriangle,
  BarChart3,
} from "lucide-react"

interface TrafficData {
  sources: {
    organic: { sessions: number; users: number; percentage: number; change: number }
    direct: { sessions: number; users: number; percentage: number; change: number }
    referral: { sessions: number; users: number; percentage: number; change: number }
    social: { sessions: number; users: number; percentage: number; change: number }
    email: { sessions: number; users: number; percentage: number; change: number }
    paid: { sessions: number; users: number; percentage: number; change: number }
  }
  referrers: Array<{
    domain: string
    sessions: number
    users: number
    bounceRate: number
  }>
  keywords: Array<{
    keyword: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }>
  campaigns: Array<{
    name: string
    source: string
    medium: string
    sessions: number
    conversions: number
    cost: number
  }>
}

export default function TrafficAnalyticsContent() {
  const [data, setData] = useState<TrafficData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchTrafficData()
  }, [])

  const fetchTrafficData = async () => {
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

      // Получаем данные трафика
      const response = await fetch("/api/traffic-data")
      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error || "Ошибка загрузки данных трафика")
      }
    } catch (err) {
      setError("Ошибка подключения к API")
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchTrafficData()
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">🚀 Анализ трафика</h1>
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

  // Моковые данные для демонстрации
  const mockData: TrafficData = {
    sources: {
      organic: { sessions: 6547, users: 4932, percentage: 52.3, change: 12.4 },
      direct: { sessions: 3591, users: 2876, percentage: 28.7, change: -3.2 },
      referral: { sessions: 1553, users: 1234, percentage: 12.4, change: 8.7 },
      social: { sessions: 525, users: 432, percentage: 4.2, change: 15.3 },
      email: { sessions: 225, users: 198, percentage: 1.8, change: -5.1 },
      paid: { sessions: 75, users: 67, percentage: 0.6, change: 23.8 },
    },
    referrers: [
      { domain: "yandex.ru", sessions: 2341, users: 1987, bounceRate: 42.1 },
      { domain: "google.com", sessions: 1876, users: 1654, bounceRate: 38.5 },
      { domain: "avito.ru", sessions: 543, users: 432, bounceRate: 51.2 },
      { domain: "drom.ru", sessions: 321, users: 287, bounceRate: 45.7 },
      { domain: "auto.ru", sessions: 198, users: 176, bounceRate: 39.8 },
    ],
    keywords: [
      { keyword: "автобетононасос купить", clicks: 1234, impressions: 15678, ctr: 7.9, position: 3.2 },
      { keyword: "бетононасос цена", clicks: 987, impressions: 12345, ctr: 8.0, position: 2.8 },
      { keyword: "автобетононасос sany", clicks: 765, impressions: 9876, ctr: 7.7, position: 4.1 },
      { keyword: "купить бетононасос москва", clicks: 543, impressions: 8765, ctr: 6.2, position: 5.3 },
      { keyword: "автобетононасос аренда", clicks: 432, impressions: 7654, ctr: 5.6, position: 6.7 },
    ],
    campaigns: [
      { name: "Поиск - Автобетононасосы", source: "google", medium: "cpc", sessions: 45, conversions: 3, cost: 12500 },
      { name: "Ретаргетинг", source: "yandex", medium: "cpc", sessions: 23, conversions: 1, cost: 5600 },
      { name: "Email рассылка", source: "email", medium: "email", sessions: 87, conversions: 5, cost: 0 },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">🚀 Анализ трафика</h1>
          <p className="text-gray-400 mt-2">Детальный анализ источников трафика и их эффективности</p>
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

      {/* Traffic Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-green-600 to-green-700 border-green-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Search className="w-8 h-8 text-white" />
              <div className="flex-1">
                <p className="text-green-100 text-sm">Органический поиск</p>
                <p className="text-2xl font-bold text-white">{formatNumber(mockData.sources.organic.sessions)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`text-xs ${mockData.sources.organic.change > 0 ? "bg-green-800" : "bg-red-800"}`}>
                    {formatChange(mockData.sources.organic.change)}
                  </Badge>
                  <span className="text-green-200 text-xs">
                    {formatPercentage(mockData.sources.organic.percentage)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Globe className="w-8 h-8 text-white" />
              <div className="flex-1">
                <p className="text-blue-100 text-sm">Прямые заходы</p>
                <p className="text-2xl font-bold text-white">{formatNumber(mockData.sources.direct.sessions)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`text-xs ${mockData.sources.direct.change > 0 ? "bg-green-800" : "bg-red-800"}`}>
                    {formatChange(mockData.sources.direct.change)}
                  </Badge>
                  <span className="text-blue-200 text-xs">{formatPercentage(mockData.sources.direct.percentage)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <ExternalLink className="w-8 h-8 text-white" />
              <div className="flex-1">
                <p className="text-purple-100 text-sm">Переходы с сайтов</p>
                <p className="text-2xl font-bold text-white">{formatNumber(mockData.sources.referral.sessions)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`text-xs ${mockData.sources.referral.change > 0 ? "bg-green-800" : "bg-red-800"}`}>
                    {formatChange(mockData.sources.referral.change)}
                  </Badge>
                  <span className="text-purple-200 text-xs">
                    {formatPercentage(mockData.sources.referral.percentage)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Share2 className="w-8 h-8 text-white" />
              <div className="flex-1">
                <p className="text-orange-100 text-sm">Социальные сети</p>
                <p className="text-2xl font-bold text-white">{formatNumber(mockData.sources.social.sessions)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`text-xs ${mockData.sources.social.change > 0 ? "bg-green-800" : "bg-red-800"}`}>
                    {formatChange(mockData.sources.social.change)}
                  </Badge>
                  <span className="text-orange-200 text-xs">
                    {formatPercentage(mockData.sources.social.percentage)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-600 to-yellow-700 border-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Mail className="w-8 h-8 text-white" />
              <div className="flex-1">
                <p className="text-yellow-100 text-sm">Email рассылки</p>
                <p className="text-2xl font-bold text-white">{formatNumber(mockData.sources.email.sessions)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`text-xs ${mockData.sources.email.change > 0 ? "bg-green-800" : "bg-red-800"}`}>
                    {formatChange(mockData.sources.email.change)}
                  </Badge>
                  <span className="text-yellow-200 text-xs">{formatPercentage(mockData.sources.email.percentage)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-600 to-red-700 border-red-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <DollarSign className="w-8 h-8 text-white" />
              <div className="flex-1">
                <p className="text-red-100 text-sm">Платная реклама</p>
                <p className="text-2xl font-bold text-white">{formatNumber(mockData.sources.paid.sessions)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`text-xs ${mockData.sources.paid.change > 0 ? "bg-green-800" : "bg-red-800"}`}>
                    {formatChange(mockData.sources.paid.change)}
                  </Badge>
                  <span className="text-red-200 text-xs">{formatPercentage(mockData.sources.paid.percentage)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referrers and Keywords */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Топ источников переходов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.referrers.map((referrer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-blue-600">#{index + 1}</Badge>
                    <div>
                      <p className="text-white font-medium">{referrer.domain}</p>
                      <p className="text-gray-400 text-sm">Отказы: {formatPercentage(referrer.bounceRate)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-400 font-bold">{formatNumber(referrer.sessions)}</p>
                    <p className="text-gray-400 text-xs">{formatNumber(referrer.users)} польз.</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="w-5 h-5" />
              Топ поисковых запросов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.keywords.map((keyword, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-600">#{index + 1}</Badge>
                    <div className="flex-1">
                      <p className="text-white font-medium truncate">{keyword.keyword}</p>
                      <p className="text-gray-400 text-sm">
                        CTR: {formatPercentage(keyword.ctr)} • Позиция: {keyword.position.toFixed(1)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">{formatNumber(keyword.clicks)}</p>
                    <p className="text-gray-400 text-xs">{formatNumber(keyword.impressions)} показов</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Рекламные кампании
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.campaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-4">
                  <Badge className="bg-purple-600">#{index + 1}</Badge>
                  <div>
                    <p className="text-white font-medium">{campaign.name}</p>
                    <p className="text-gray-400 text-sm">
                      {campaign.source} / {campaign.medium}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-blue-400 font-bold">{formatNumber(campaign.sessions)}</p>
                    <p className="text-gray-400 text-xs">Сессии</p>
                  </div>
                  <div className="text-center">
                    <p className="text-green-400 font-bold">{campaign.conversions}</p>
                    <p className="text-gray-400 text-xs">Конверсии</p>
                  </div>
                  <div className="text-center">
                    <p className="text-orange-400 font-bold">
                      {campaign.cost > 0 ? `₽${formatNumber(campaign.cost)}` : "Бесплатно"}
                    </p>
                    <p className="text-gray-400 text-xs">Стоимость</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
