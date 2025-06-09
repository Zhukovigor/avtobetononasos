"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import SEODataSourceIndicator from "../components/seo-data-source-indicator"

interface PositionData {
  keyword: string
  position: number | null
  url: string
  searchEngine: "google" | "yandex"
  location: string
  device: "desktop" | "mobile"
  date: string
  clicks?: number
  impressions?: number
  ctr?: number
}

interface ApiResponse {
  success: boolean
  data: PositionData[]
  timestamp: string
  source: string
  error?: string
  errorDetails?: string
  debug?: {
    keywordsRequested: string[]
    daysRequested: number
    totalResults: number
  }
}

export default function SEOMonitorPage() {
  const [keywords, setKeywords] = useState<string[]>([
    "автобетононасос",
    "аренда автобетононасоса",
    "автобетононасос цена",
    "автобетононасос купить",
    "автобетононасос 42 метра",
    "автобетононасос SANY",
  ])
  const [newKeyword, setNewKeyword] = useState("")
  const [positions, setPositions] = useState<PositionData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)
  const [dataSource, setDataSource] = useState<string>("Demo Data")
  const [isApiError, setIsApiError] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [showAllData, setShowAllData] = useState(false)

  // Функция для получения данных о позициях
  const fetchKeywordsData = async (getAllData = false) => {
    setLoading(true)
    setError(null)
    setIsApiError(false)

    try {
      // Если нужны все данные, не передаем ключевые слова
      const keywordsParam = getAllData ? "" : keywords.join(",")
      const response = await fetch(
        `/api/seo-positions?keywords=${encodeURIComponent(keywordsParam)}&engine=google&days=90`,
      )
      const data: ApiResponse = await response.json()

      console.log("Ответ API:", data)

      if (data.success) {
        setPositions(data.data)
        setLastUpdate(data.timestamp)
        setDataSource(data.source)
        setDebugInfo(data.debug)
      } else {
        setPositions(data.data || [])
        setError(data.error || "Произошла ошибка при получении данных")
        setLastUpdate(data.timestamp)
        setDataSource(data.source)
        setIsApiError(true)
        setDebugInfo(data.debug)
      }
    } catch (err) {
      setError("Ошибка при получении данных о позициях")
      setIsApiError(true)
    } finally {
      setLoading(false)
    }
  }

  // Загрузка данных при первом рендере
  useEffect(() => {
    fetchKeywordsData()
  }, [])

  // Добавление нового ключевого слова
  const addKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword])
      setNewKeyword("")
    }
  }

  // Удаление ключевого слова
  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  // Получение класса для позиции
  const getPositionClass = (position: number | null) => {
    if (position === null) return "text-gray-400"
    if (position <= 3) return "text-green-500 font-bold"
    if (position <= 10) return "text-blue-500"
    if (position <= 20) return "text-yellow-500"
    return "text-red-500"
  }

  // Получение иконки для позиции
  const getPositionIcon = (position: number | null) => {
    if (position === null) return "❓"
    if (position <= 3) return "🥇"
    if (position <= 10) return "🥈"
    if (position <= 20) return "🥉"
    return "📉"
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">📊 SEO Мониторинг позиций</h1>
          <p className="text-gray-400">Отслеживание позиций ключевых слов в поисковых системах Google и Яндекс</p>
        </div>

        {/* Диагностическая информация */}
        {debugInfo && (
          <Alert className="mb-6 bg-blue-900/20 border-blue-800">
            <AlertDescription>
              <div className="text-sm">
                <p>
                  <strong>Отладочная информация:</strong>
                </p>
                <p>Запрошенных ключевых слов: {debugInfo.keywordsRequested?.length || 0}</p>
                <p>Период: {debugInfo.daysRequested} дней</p>
                <p>Найдено результатов: {debugInfo.totalResults}</p>
                {debugInfo.totalResults === 0 && (
                  <div className="mt-2 p-2 bg-yellow-900/30 rounded">
                    <p className="text-yellow-300">⚠️ Данные не найдены. Возможные причины:</p>
                    <ul className="list-disc list-inside mt-1 text-xs">
                      <li>Сайт недавно добавлен в Google Search Console</li>
                      <li>Недостаточно данных за выбранный период</li>
                      <li>Сайт не индексируется поисковыми системами</li>
                    </ul>
                  </div>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-zinc-900 border-zinc-800 col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">🔍 Отслеживаемые ключевые слова</CardTitle>
              <div className="flex items-center gap-2">
                <SEODataSourceIndicator source={dataSource} timestamp={lastUpdate || undefined} isError={isApiError} />
                <Button
                  onClick={() => fetchKeywordsData(false)}
                  disabled={loading}
                  variant="outline"
                  className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                >
                  {loading ? "Обновление..." : "Обновить данные"}
                </Button>
                <Button
                  onClick={() => fetchKeywordsData(true)}
                  disabled={loading}
                  variant="outline"
                  className="bg-blue-800 border-blue-700 text-white hover:bg-blue-700"
                >
                  {loading ? "Загрузка..." : "Все данные GSC"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Добавить ключевое слово"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                    onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                  />
                  <Button onClick={addKeyword} className="bg-blue-600 hover:bg-blue-700">
                    Добавить
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="google">
                <TabsList className="bg-zinc-800">
                  <TabsTrigger value="google" className="data-[state=active]:bg-blue-600">
                    Google
                  </TabsTrigger>
                  <TabsTrigger value="yandex" className="data-[state=active]:bg-blue-600">
                    Яндекс
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="google" className="mt-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-zinc-800">
                          <th className="text-left py-2 px-4">Ключевое слово</th>
                          <th className="text-center py-2 px-4">Позиция</th>
                          <th className="text-center py-2 px-4">Клики</th>
                          <th className="text-center py-2 px-4">Показы</th>
                          <th className="text-center py-2 px-4">CTR</th>
                          <th className="text-center py-2 px-4">Действия</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading
                          ? Array(6)
                              .fill(0)
                              .map((_, i) => (
                                <tr key={`skeleton-${i}`} className="border-b border-zinc-800">
                                  <td className="py-2 px-4">
                                    <Skeleton className="h-4 w-32 bg-zinc-800" />
                                  </td>
                                  <td className="py-2 px-4 text-center">
                                    <Skeleton className="h-4 w-8 bg-zinc-800 mx-auto" />
                                  </td>
                                  <td className="py-2 px-4 text-center">
                                    <Skeleton className="h-4 w-12 bg-zinc-800 mx-auto" />
                                  </td>
                                  <td className="py-2 px-4 text-center">
                                    <Skeleton className="h-4 w-16 bg-zinc-800 mx-auto" />
                                  </td>
                                  <td className="py-2 px-4 text-center">
                                    <Skeleton className="h-4 w-10 bg-zinc-800 mx-auto" />
                                  </td>
                                  <td className="py-2 px-4 text-center">
                                    <Skeleton className="h-8 w-20 bg-zinc-800 mx-auto" />
                                  </td>
                                </tr>
                              ))
                          : positions.length > 0
                            ? positions
                                .filter((pos) => pos.searchEngine === "google")
                                .map((pos, index) => (
                                  <tr key={`${pos.keyword}-${index}`} className="border-b border-zinc-800">
                                    <td className="py-2 px-4">{pos.keyword}</td>
                                    <td className={`py-2 px-4 text-center ${getPositionClass(pos.position)}`}>
                                      {getPositionIcon(pos.position)} {pos.position ?? "N/A"}
                                    </td>
                                    <td className="py-2 px-4 text-center">
                                      {pos.clicks !== undefined ? pos.clicks : "N/A"}
                                    </td>
                                    <td className="py-2 px-4 text-center">
                                      {pos.impressions !== undefined ? pos.impressions : "N/A"}
                                    </td>
                                    <td className="py-2 px-4 text-center">
                                      {pos.ctr !== undefined ? `${(pos.ctr * 100).toFixed(2)}%` : "N/A"}
                                    </td>
                                    <td className="py-2 px-4 text-center">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeKeyword(pos.keyword)}
                                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                      >
                                        Удалить
                                      </Button>
                                    </td>
                                  </tr>
                                ))
                            : !loading && (
                                <tr>
                                  <td colSpan={6} className="py-8 text-center text-gray-400">
                                    <div className="space-y-2">
                                      <p>Данные не найдены</p>
                                      <p className="text-sm">
                                        Попробуйте нажать "Все данные GSC" для получения всех доступных данных
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              )}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="yandex" className="mt-4">
                  <div className="text-center py-8 text-gray-400">
                    <p>Интеграция с Яндекс.Вебмастер в разработке</p>
                  </div>
                </TabsContent>
              </Tabs>

              {error && (
                <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-300">{error}</div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">📈 Статистика</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Всего ключевых слов</div>
                  <div className="text-2xl font-bold">{positions.length}</div>
                </div>

                <div className="bg-zinc-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">ТОП-3 позиции</div>
                  <div className="text-2xl font-bold text-green-500">
                    {positions.filter((pos) => pos.position !== null && pos.position <= 3).length}
                  </div>
                </div>

                <div className="bg-zinc-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">ТОП-10 позиции</div>
                  <div className="text-2xl font-bold text-blue-500">
                    {positions.filter((pos) => pos.position !== null && pos.position <= 10).length}
                  </div>
                </div>

                <div className="bg-zinc-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Всего кликов</div>
                  <div className="text-2xl font-bold text-yellow-500">
                    {positions.reduce((sum, pos) => sum + (pos.clicks || 0), 0)}
                  </div>
                </div>

                <div className="bg-zinc-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Источник данных</div>
                  <div className="text-xl font-medium">
                    <SEODataSourceIndicator
                      source={dataSource}
                      timestamp={lastUpdate || undefined}
                      isError={isApiError}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <a
            href="/admin"
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            ← К дашборду
          </a>
        </div>
      </div>
    </div>
  )
}
