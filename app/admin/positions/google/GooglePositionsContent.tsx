"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Filter,
  Download,
  Eye,
  MousePointer,
} from "lucide-react"

interface PositionData {
  keyword: string
  currentPosition: number
  previousPosition: number
  change: number
  clicks: number
  impressions: number
  ctr: number
  url: string
  device: "desktop" | "mobile"
  country: string
  lastUpdate: string
}

export default function GooglePositionsContent() {
  const [positions, setPositions] = useState<PositionData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [deviceFilter, setDeviceFilter] = useState<string>("all")
  const [positionFilter, setPositionFilter] = useState<string>("all")

  useEffect(() => {
    fetchPositions()
  }, [])

  const fetchPositions = async () => {
    try {
      setLoading(true)
      setError(null)

      // Проверяем подключение к Google
      const statusResponse = await fetch("/api/auth/google/status")
      const statusResult = await statusResponse.json()

      if (!statusResult.connected) {
        setError("Google Search Console не подключен. Перейдите в раздел 'Google SEO' для настройки.")
        setLoading(false)
        return
      }

      // Получаем данные позиций
      const response = await fetch("/api/seo-positions")
      const result = await response.json()

      if (result.success) {
        setPositions(result.data)
      } else {
        setError(result.error || "Ошибка загрузки данных позиций")
      }
    } catch (err) {
      setError("Ошибка подключения к API")
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchPositions()
    setRefreshing(false)
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-400" />
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-400" />
    return <Minus className="w-4 h-4 text-gray-400" />
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-400"
    if (change < 0) return "text-red-400"
    return "text-gray-400"
  }

  const getPositionBadgeColor = (position: number) => {
    if (position <= 3) return "bg-green-600"
    if (position <= 10) return "bg-blue-600"
    if (position <= 20) return "bg-yellow-600"
    return "bg-red-600"
  }

  const filteredPositions = positions.filter((pos) => {
    const matchesSearch =
      pos.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pos.url.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDevice = deviceFilter === "all" || pos.device === deviceFilter
    const matchesPosition =
      positionFilter === "all" ||
      (positionFilter === "top3" && pos.currentPosition <= 3) ||
      (positionFilter === "top10" && pos.currentPosition <= 10) ||
      (positionFilter === "top20" && pos.currentPosition <= 20) ||
      (positionFilter === "below20" && pos.currentPosition > 20)

    return matchesSearch && matchesDevice && matchesPosition
  })

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ru-RU").format(num)
  }

  const formatPercentage = (num: number) => {
    return `${(num * 100).toFixed(2)}%`
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">🔍 Позиции в Google</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
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
          <h1 className="text-3xl font-bold text-white">🔍 Позиции в Google</h1>
          <p className="text-gray-400 mt-2">Отслеживание позиций ключевых слов в поиске Google</p>
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
          <Button variant="outline" className="border-green-600 text-green-400 hover:bg-green-600">
            <Download className="w-4 h-4 mr-2" />
            Экспорт
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

      {positions.length > 0 ? (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Search className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Всего запросов</p>
                    <p className="text-2xl font-bold text-white">{positions.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-gray-400 text-sm">В топ-10</p>
                    <p className="text-2xl font-bold text-white">
                      {positions.filter((p) => p.currentPosition <= 10).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <MousePointer className="w-8 h-8 text-purple-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Общие клики</p>
                    <p className="text-2xl font-bold text-white">
                      {formatNumber(positions.reduce((sum, p) => sum + p.clicks, 0))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Eye className="w-8 h-8 text-orange-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Общие показы</p>
                    <p className="text-2xl font-bold text-white">
                      {formatNumber(positions.reduce((sum, p) => sum + p.impressions, 0))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-sm">Фильтры:</span>
                </div>

                <div className="flex-1 max-w-md">
                  <Input
                    placeholder="Поиск по ключевому слову или URL..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <Select value={deviceFilter} onValueChange={setDeviceFilter}>
                  <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Устройство" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">Все устройства</SelectItem>
                    <SelectItem value="desktop">Десктоп</SelectItem>
                    <SelectItem value="mobile">Мобильные</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={positionFilter} onValueChange={setPositionFilter}>
                  <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Позиция" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">Все позиции</SelectItem>
                    <SelectItem value="top3">Топ-3</SelectItem>
                    <SelectItem value="top10">Топ-10</SelectItem>
                    <SelectItem value="top20">Топ-20</SelectItem>
                    <SelectItem value="below20">Ниже 20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Positions Table */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="w-5 h-5" />
                Позиции ключевых слов ({filteredPositions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPositions.map((position, index) => (
                  <div key={index} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge className={getPositionBadgeColor(position.currentPosition)}>
                          #{position.currentPosition}
                        </Badge>
                        <h4 className="text-white font-medium">{position.keyword}</h4>
                        <Badge variant="outline" className="text-gray-300 border-gray-600">
                          {position.device}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {getChangeIcon(position.change)}
                        <span className={`font-bold ${getChangeColor(position.change)}`}>
                          {position.change > 0 ? `+${position.change}` : position.change}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-gray-400 text-xs">Клики</p>
                        <p className="text-blue-400 font-bold">{formatNumber(position.clicks)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Показы</p>
                        <p className="text-green-400 font-bold">{formatNumber(position.impressions)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">CTR</p>
                        <p className="text-purple-400 font-bold">{formatPercentage(position.ctr)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Предыдущая позиция</p>
                        <p className="text-gray-300 font-bold">#{position.previousPosition}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <p className="text-gray-400 truncate flex-1 mr-4">{position.url}</p>
                      <p className="text-gray-500">
                        Обновлено: {new Date(position.lastUpdate).toLocaleDateString("ru-RU")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPositions.length === 0 && (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Нет данных по заданным фильтрам</p>
                  <p className="text-gray-500 text-sm mt-2">Попробуйте изменить параметры поиска</p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-8 text-center">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Нет данных о позициях</h3>
            <p className="text-gray-400 mb-6">
              Для получения данных о позициях необходимо подключить Google Search Console
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a href="/admin/google-seo">Настроить Google Search Console</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
