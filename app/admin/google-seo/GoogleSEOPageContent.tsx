"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GoogleOAuthEnhanced from "@/components/google-oauth-enhanced"
import { Search, Settings, BarChart3, ArrowLeft, LineChart } from "lucide-react"

interface GoogleSEOData {
  searchConsole: {
    totalClicks: number
    totalImpressions: number
    averageCTR: number
    averagePosition: number
    topQueries: Array<{
      query: string
      clicks: number
      impressions: number
      ctr: number
      position: number
    }>
    topPages: Array<{
      page: string
      clicks: number
      impressions: number
      ctr: number
      position: number
    }>
  }
  analytics: {
    sessions: number
    users: number
    bounceRate: number
    sessionDuration: number
    topPages: Array<{
      page: string
      sessions: number
      users: number
      bounceRate: number
    }>
  }
  status: {
    connected: boolean
    lastUpdate: string
    dataRange: string
  }
}

interface ConnectionStatus {
  connected: boolean
  user?: {
    name: string
    email: string
    picture: string
  }
  session?: {
    connectedAt: string
    expiresAt: string
    lastRefresh?: string
    scopes: string[]
    isExpired: boolean
    timeToExpiry: number
  }
  error?: string
}

export default function GoogleSEOPageContent() {
  const [data, setData] = useState<GoogleSEOData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({ connected: false })
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    checkConnectionStatus()
    if (connectionStatus.connected) {
      fetchGoogleSEOData()
    }
  }, [])

  const checkConnectionStatus = async () => {
    try {
      const response = await fetch("/api/auth/google/refresh-enhanced")
      const result = await response.json()
      setConnectionStatus(result)
      setIsConnected(result.connected)

      if (result.connected) {
        fetchGoogleSEOData()
      } else {
        setLoading(false)
      }
    } catch (error) {
      console.error("Ошибка проверки статуса:", error)
      setLoading(false)
    }
  }

  const fetchGoogleSEOData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/google-seo-data")
      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error || "Ошибка загрузки данных")
      }
    } catch (err) {
      setError("Ошибка подключения к API")
    } finally {
      setLoading(false)
    }
  }

  const handleRefreshData = async () => {
    setRefreshing(true)
    await fetchGoogleSEOData()
    setRefreshing(false)
  }

  const handleConnectionChange = (connected: boolean) => {
    setConnectionStatus((prev) => ({ ...prev, connected }))
    setIsConnected(connected)
    if (connected) {
      setTimeout(() => {
        checkConnectionStatus()
        fetchGoogleSEOData()
      }, 2000)
    } else {
      setData(null)
    }
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ru-RU").format(num)
  }

  const formatPercentage = (num: number) => {
    return `${(num * 100).toFixed(2)}%`
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
          <h1 className="text-3xl font-bold text-white">🔍 Google SEO Интеграция</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <a href="/admin" className="text-blue-400 hover:text-blue-300">
              <ArrowLeft className="w-6 h-6" />
            </a>
            <h1 className="text-3xl font-bold">Google SEO Интеграция</h1>
          </div>
          <p className="text-gray-400">
            Управление интеграцией с Google Search Console и Analytics для получения SEO данных
          </p>
        </div>

        {/* Google OAuth Component */}
        <div className="mb-8">
          <GoogleOAuthEnhanced onConnectionChange={handleConnectionChange} />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="search-console" className="data-[state=active]:bg-gray-700">
              <Search className="w-4 h-4 mr-2" />
              Search Console
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-700">
              <LineChart className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gray-700">
              <Settings className="w-4 h-4 mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {isConnected ? (
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Статистика Search Console</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">Данные загружаются из Google Search Console...</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Статистика Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">Данные загружаются из Google Analytics...</p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-300 mb-4">
                    Для просмотра данных необходимо подключить Google аккаунт с доступом к Search Console и Analytics
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="search-console">
            {isConnected ? (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Данные Google Search Console</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Загрузка данных из Google Search Console...</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-300">
                    Для доступа к данным Search Console необходимо подключить Google аккаунт
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics">
            {isConnected ? (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Данные Google Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Загрузка данных из Google Analytics...</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-300">Для доступа к данным Analytics необходимо подключить Google аккаунт</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Настройки интеграции</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Здесь будут настройки интеграции с Google Search Console и Analytics</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
