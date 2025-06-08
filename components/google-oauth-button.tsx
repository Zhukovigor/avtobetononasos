"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface GoogleOAuthButtonProps {
  onConnectionChange?: (connected: boolean) => void
}

export default function GoogleOAuthButton({ onConnectionChange }: GoogleOAuthButtonProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [userInfo, setUserInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [fetchError, setFetchError] = useState<boolean>(false)

  // Проверяем статус подключения при загрузке
  useEffect(() => {
    checkConnectionStatus()
  }, [])

  const checkConnectionStatus = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/google/status", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })
      const data = await response.json()

      setIsConnected(data.connected)
      setUserInfo(data.userInfo)
      setConnectionStatus(data.message || "")
      setError("")
      setFetchError(false)

      onConnectionChange?.(data.connected)
    } catch (error) {
      console.error("Ошибка проверки статуса:", error)
      setConnectionStatus("Ошибка проверки статуса подключения")
      setFetchError(true)
      setError(
        error instanceof Error ? error.message : "Failed to fetch: Проблема с сетевым подключением или CORS-ошибка",
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnect = async () => {
    setIsLoading(true)
    setError("")
    setFetchError(false)

    try {
      // Перенаправляем на страницу авторизации
      window.location.href = "/api/auth/google"
    } catch (error) {
      console.error("Ошибка подключения:", error)
      setError(error instanceof Error ? error.message : "Неизвестная ошибка")
      setFetchError(error instanceof Error && error.message.includes("fetch"))
      setIsLoading(false)
    }
  }

  const handleDisconnect = async () => {
    setIsLoading(true)
    setError("")
    setFetchError(false)

    try {
      const response = await fetch("/api/auth/google/disconnect", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })

      if (response.ok) {
        setIsConnected(false)
        setUserInfo(null)
        setConnectionStatus("Отключено от Google Search Console")
        onConnectionChange?.(false)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Ошибка отключения")
      }
    } catch (error) {
      console.error("Ошибка отключения:", error)
      setError(error instanceof Error ? error.message : "Ошибка при отключении")
      setFetchError(error instanceof Error && error.message.includes("fetch"))
    } finally {
      setIsLoading(false)
    }
  }

  const refreshToken = async () => {
    setIsLoading(true)
    setError("")
    setFetchError(false)

    try {
      const response = await fetch("/api/auth/google/refresh", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })

      const data = await response.json()

      if (response.ok) {
        setConnectionStatus("Токен успешно обновлен")
        await checkConnectionStatus()
      } else {
        throw new Error(data.error || "Ошибка обновления токена")
      }
    } catch (error) {
      console.error("Ошибка обновления токена:", error)
      setError(error instanceof Error ? error.message : "Ошибка обновления токена")
      setFetchError(error instanceof Error && error.message.includes("fetch"))
    } finally {
      setIsLoading(false)
    }
  }

  // Прямой переход на страницу авторизации (без fetch)
  const directConnect = () => {
    window.location.href = "/api/auth/google"
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          🔍 Google Search Console
          {isConnected ? (
            <Badge className="bg-green-600">Подключено</Badge>
          ) : (
            <Badge className="bg-red-600">Не подключено</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {fetchError && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Ошибка "Failed to fetch"</AlertTitle>
            <AlertDescription>
              <div className="space-y-2 text-sm">
                <p>Возможные причины:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Проблемы с сетевым подключением</li>
                  <li>CORS-ошибки (блокировка запросов)</li>
                  <li>Браузерные расширения блокируют запросы</li>
                </ul>
                <p className="font-medium">Решения:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Отключите блокировщики рекламы и CORS-расширения</li>
                  <li>Попробуйте другой браузер</li>
                  <li>
                    <Button variant="link" className="h-auto p-0 text-blue-400" onClick={directConnect}>
                      Нажмите здесь для прямого перехода
                    </Button>
                  </li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {error && !fetchError && (
          <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg">
            <p className="text-red-200 text-sm font-medium">Ошибка:</p>
            <p className="text-red-300 text-sm">{error}</p>
            {error.includes("переменных окружения") && (
              <div className="mt-2 text-xs text-red-400">
                <p>Проверьте файл .env.local:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>GOOGLE_CLIENT_ID</li>
                  <li>GOOGLE_CLIENT_SECRET</li>
                  <li>GOOGLE_REDIRECT_URI</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {isConnected && userInfo ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
              {userInfo.picture && (
                <img src={userInfo.picture || "/placeholder.svg"} alt="Avatar" className="w-10 h-10 rounded-full" />
              )}
              <div>
                <p className="text-white font-medium">{userInfo.name}</p>
                <p className="text-gray-400 text-sm">{userInfo.email}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={refreshToken} disabled={isLoading} variant="outline" size="sm">
                {isLoading ? "Обновление..." : "Обновить токен"}
              </Button>
              <Button onClick={handleDisconnect} disabled={isLoading} variant="destructive" size="sm">
                {isLoading ? "Отключение..." : "Отключить"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-gray-400 text-sm">
              Подключите Google Search Console для получения реальных данных о позициях вашего сайта
            </p>
            <Button onClick={handleConnect} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
              {isLoading ? "Подключение..." : "🔗 Подключить Google Search Console"}
            </Button>
            {fetchError && (
              <Button onClick={directConnect} disabled={isLoading} variant="outline" className="w-full border-blue-700">
                🔄 Прямой переход (обход fetch)
              </Button>
            )}
          </div>
        )}

        {connectionStatus && !error && (
          <p className={`text-sm ${isConnected ? "text-green-400" : "text-gray-400"}`}>{connectionStatus}</p>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Безопасная OAuth 2.0 авторизация</p>
          <p>• Доступ только для чтения данных</p>
          <p>• Автоматическое обновление токенов</p>
        </div>
      </CardContent>
    </Card>
  )
}
