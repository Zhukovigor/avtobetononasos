"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Progress } from "./ui/progress"
import { CheckCircle, AlertTriangle, RefreshCw, User, Shield, ExternalLink, Settings, Info } from "lucide-react"

interface GoogleOAuthEnhancedProps {
  onConnectionChange?: (connected: boolean) => void
  showAdvanced?: boolean
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
  debug?: {
    hasAccessToken: boolean
    hasRefreshToken: boolean
    hasUserInfo: boolean
    tokenValid?: boolean
    tokenStatus?: number
  }
  error?: string
  message?: string
}

export default function GoogleOAuthEnhanced({ onConnectionChange, showAdvanced = true }: GoogleOAuthEnhancedProps) {
  const [status, setStatus] = useState<ConnectionStatus>({ connected: false })
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showDebug, setShowDebug] = useState(false)

  useEffect(() => {
    checkStatus()

    // Автоматическая проверка каждые 30 секунд
    const interval = setInterval(checkStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const checkStatus = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/google/status", {
        cache: "no-store",
      })
      const result = await response.json()

      console.log("📊 Статус Google OAuth:", result)
      setStatus(result)
      onConnectionChange?.(result.connected)
    } catch (error) {
      console.error("Ошибка проверки статуса:", error)
      setStatus({
        connected: false,
        error: "Ошибка проверки статуса подключения",
        message: "Не удалось проверить статус подключения к Google",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = () => {
    console.log("🚀 Инициация подключения к Google")
    window.location.href = "/api/auth/google/oauth"
  }

  const handleDisconnect = async () => {
    if (!confirm("Вы уверены, что хотите отключить Google интеграцию?")) {
      return
    }

    try {
      setRefreshing(true)
      console.log("🔌 Отключение Google интеграции")

      const response = await fetch("/api/auth/google/disconnect", {
        method: "POST",
      })

      const result = await response.json()

      if (result.success) {
        console.log("✅ Google интеграция отключена")
        setStatus({ connected: false, message: "Google интеграция отключена" })
        onConnectionChange?.(false)
      } else {
        console.error("❌ Ошибка отключения:", result.error)
        setStatus((prev) => ({ ...prev, error: result.error }))
      }
    } catch (error) {
      console.error("❌ Ошибка отключения:", error)
      setStatus((prev) => ({
        ...prev,
        error: "Ошибка отключения",
      }))
    } finally {
      setRefreshing(false)
    }
  }

  const handleRefreshToken = async () => {
    try {
      setRefreshing(true)
      console.log("🔄 Обновление токена")

      const response = await fetch("/api/auth/google/refresh-enhanced", {
        method: "POST",
      })

      if (response.ok) {
        console.log("✅ Токен обновлен")
        await checkStatus()
      } else {
        const error = await response.json()
        console.error("❌ Ошибка обновления токена:", error)
        setStatus((prev) => ({ ...prev, error: error.error }))
      }
    } catch (error) {
      console.error("❌ Ошибка обновления токена:", error)
      setStatus((prev) => ({
        ...prev,
        error: "Ошибка обновления токена",
      }))
    } finally {
      setRefreshing(false)
    }
  }

  const formatTimeRemaining = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60))
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) {
      return `${hours}ч ${minutes}м`
    }
    return `${minutes}м`
  }

  const getTokenHealthPercentage = () => {
    if (!status.session?.timeToExpiry) return 0
    const maxTime = 60 * 60 * 1000 // 1 час в миллисекундах
    return Math.max(0, Math.min(100, (status.session.timeToExpiry / maxTime) * 100))
  }

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
            <span className="text-gray-300">Проверка статуса Google подключения...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-400" />
          Google OAuth 2.0 Интеграция
          {status.connected ? (
            <Badge className="bg-green-600">Подключено</Badge>
          ) : (
            <Badge className="bg-red-600">Отключено</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Сообщения о статусе */}
        {status.message && (
          <Alert
            className={`${status.connected ? "bg-green-900/20 border-green-800" : "bg-blue-900/20 border-blue-800"}`}
          >
            <Info className="h-4 w-4" />
            <AlertDescription className={status.connected ? "text-green-300" : "text-blue-300"}>
              {status.message}
            </AlertDescription>
          </Alert>
        )}

        {status.error && (
          <Alert className="bg-red-900/20 border-red-800">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="text-red-300">Ошибка</AlertTitle>
            <AlertDescription className="text-red-400">{status.error}</AlertDescription>
          </Alert>
        )}

        {status.connected && status.user ? (
          <div className="space-y-6">
            {/* Информация о пользователе */}
            <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
              <img src={status.user.picture || "/placeholder.svg"} alt="Avatar" className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <p className="text-white font-medium">{status.user.name}</p>
                <p className="text-gray-400 text-sm">{status.user.email}</p>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-blue-900/20">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>

            {/* Статус токена */}
            {status.session && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Статус токена</span>
                  <div className="flex items-center gap-2">
                    {status.session.isExpired ? (
                      <Badge className="bg-red-600">Истек</Badge>
                    ) : (
                      <Badge className="bg-green-600">Активен</Badge>
                    )}
                  </div>
                </div>

                {!status.session.isExpired && status.session.timeToExpiry && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Время до истечения</span>
                      <span className="text-white">{formatTimeRemaining(status.session.timeToExpiry)}</span>
                    </div>
                    <Progress value={getTokenHealthPercentage()} className="h-2" />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Подключено</span>
                    <p className="text-white">{new Date(status.session.connectedAt).toLocaleDateString("ru-RU")}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Последнее обновление</span>
                    <p className="text-white">
                      {status.session.lastRefresh
                        ? new Date(status.session.lastRefresh).toLocaleTimeString("ru-RU")
                        : "Никогда"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Разрешения */}
            {showAdvanced && status.session?.scopes && (
              <div className="space-y-3">
                <h4 className="text-white font-medium flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Разрешения
                </h4>
                <div className="space-y-2">
                  {status.session.scopes.map((scope, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">
                        {scope.includes("webmasters") && "Google Search Console"}
                        {scope.includes("analytics") && "Google Analytics"}
                        {scope.includes("userinfo") && "Информация профиля"}
                        {scope.includes("drive") && "Google Drive (только чтение)"}
                        {!scope.includes("webmasters") &&
                          !scope.includes("analytics") &&
                          !scope.includes("userinfo") &&
                          !scope.includes("drive") &&
                          scope}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Действия */}
            <div className="flex gap-3">
              <Button
                onClick={handleRefreshToken}
                disabled={refreshing}
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-400 hover:bg-blue-600"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                Обновить токен
              </Button>
              <Button
                onClick={handleDisconnect}
                disabled={refreshing}
                variant="outline"
                size="sm"
                className="border-red-600 text-red-400 hover:bg-red-600"
              >
                Отключить
              </Button>
              {showAdvanced && (
                <Button onClick={() => setShowDebug(!showDebug)} variant="ghost" size="sm" className="text-gray-400">
                  Debug
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center py-6">
              <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-white font-medium mb-2">Google не подключен</h3>
              <p className="text-gray-400 text-sm mb-6">
                Подключите Google аккаунт для получения реальных SEO данных из Search Console и Analytics
              </p>
              <Button onClick={handleConnect} disabled={refreshing} className="bg-blue-600 hover:bg-blue-700">
                <Shield className="w-4 h-4 mr-2" />
                Подключить Google
              </Button>
            </div>

            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2">Что вы получите:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Реальные данные о позициях в Google</li>
                <li>• Статистика кликов и показов</li>
                <li>• Анализ поисковых запросов</li>
                <li>• Данные Google Analytics</li>
                <li>• Автоматическое обновление токенов</li>
              </ul>
            </div>
          </div>
        )}

        {/* Debug информация */}
        {showDebug && status.debug && (
          <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Debug информация:</h4>
            <div className="text-xs text-gray-400 space-y-1">
              <p>Access Token: {status.debug.hasAccessToken ? "✅ Есть" : "❌ Нет"}</p>
              <p>Refresh Token: {status.debug.hasRefreshToken ? "✅ Есть" : "❌ Нет"}</p>
              <p>User Info: {status.debug.hasUserInfo ? "✅ Есть" : "❌ Нет"}</p>
              <p>Token Valid: {status.debug.tokenValid ? "✅ Да" : "❌ Нет"}</p>
              {status.debug.tokenStatus && <p>Token Status: {status.debug.tokenStatus}</p>}
            </div>
          </div>
        )}

        {/* Техническая информация */}
        {showAdvanced && (
          <div className="text-xs text-gray-500 space-y-1 pt-4 border-t border-gray-700">
            <p>• Безопасная OAuth 2.0 авторизация</p>
            <p>• Автоматическое обновление токенов</p>
            <p>• Доступ только для чтения данных</p>
            <p>• Соответствие стандартам безопасности Google</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
