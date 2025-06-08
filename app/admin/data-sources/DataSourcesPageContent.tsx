"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SEODataSources from "@/app/components/seo-data-sources"

export default function DataSourcesPageContent() {
  const [apiKeys, setApiKeys] = useState({
    googleClientId: "",
    googleClientSecret: "",
    yandexToken: "",
    semrushKey: "",
    ahrefsToken: "",
  })

  const [testResults, setTestResults] = useState<Record<string, string>>({})

  const testConnection = async (source: string) => {
    setTestResults((prev) => ({ ...prev, [source]: "testing" }))

    // Симуляция тестирования подключения
    setTimeout(() => {
      const success = Math.random() > 0.5
      setTestResults((prev) => ({
        ...prev,
        [source]: success ? "success" : "error",
      }))
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "testing":
        return <span className="text-yellow-500">⏳</span>
      case "success":
        return <span className="text-green-500">✅</span>
      case "error":
        return <span className="text-red-500">❌</span>
      default:
        return <span className="text-gray-500">⚪</span>
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">🔌 Источники данных</h1>
          <p className="text-gray-400">Настройка подключений к внешним API для получения реальных SEO данных</p>
        </div>

        <SEODataSources />

        {/* Настройка API ключей */}
        <Card className="bg-zinc-900 border-zinc-800 mt-8">
          <CardHeader>
            <CardTitle className="text-white">🔑 Настройка API подключений</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Google Search Console */}
              <div className="border border-zinc-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold">Google Search Console</h3>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(testResults.google)}
                    <button
                      onClick={() => testConnection("google")}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                    >
                      Тест
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Google Client ID"
                    value={apiKeys.googleClientId}
                    onChange={(e) => setApiKeys((prev) => ({ ...prev, googleClientId: e.target.value }))}
                    className="bg-zinc-800 text-white px-3 py-2 rounded border border-zinc-700"
                  />
                  <input
                    type="password"
                    placeholder="Google Client Secret"
                    value={apiKeys.googleClientSecret}
                    onChange={(e) => setApiKeys((prev) => ({ ...prev, googleClientSecret: e.target.value }))}
                    className="bg-zinc-800 text-white px-3 py-2 rounded border border-zinc-700"
                  />
                </div>
              </div>

              {/* Яндекс.Вебмастер */}
              <div className="border border-zinc-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold">Яндекс.Вебмастер</h3>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(testResults.yandex)}
                    <button
                      onClick={() => testConnection("yandex")}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                    >
                      Тест
                    </button>
                  </div>
                </div>
                <input
                  type="password"
                  placeholder="Yandex OAuth Token"
                  value={apiKeys.yandexToken}
                  onChange={(e) => setApiKeys((prev) => ({ ...prev, yandexToken: e.target.value }))}
                  className="w-full bg-zinc-800 text-white px-3 py-2 rounded border border-zinc-700"
                />
              </div>

              {/* SEMrush */}
              <div className="border border-zinc-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold">SEMrush</h3>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(testResults.semrush)}
                    <button
                      onClick={() => testConnection("semrush")}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                    >
                      Тест
                    </button>
                  </div>
                </div>
                <input
                  type="password"
                  placeholder="SEMrush API Key"
                  value={apiKeys.semrushKey}
                  onChange={(e) => setApiKeys((prev) => ({ ...prev, semrushKey: e.target.value }))}
                  className="w-full bg-zinc-800 text-white px-3 py-2 rounded border border-zinc-700"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-semibold">
                Сохранить настройки
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded font-semibold">Сбросить</button>
            </div>
          </CardContent>
        </Card>

        {/* Статус подключений */}
        <Card className="bg-zinc-900 border-zinc-800 mt-8">
          <CardHeader>
            <CardTitle className="text-white">📊 Статус подключений</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-zinc-800 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🔍</div>
                <div className="text-white font-semibold">Google Search Console</div>
                <div className="text-red-400 text-sm">Не подключено</div>
              </div>
              <div className="bg-zinc-800 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🟡</div>
                <div className="text-white font-semibold">Яндекс.Вебмастер</div>
                <div className="text-red-400 text-sm">Не подключено</div>
              </div>
              <div className="bg-zinc-800 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">📈</div>
                <div className="text-white font-semibold">SEMrush</div>
                <div className="text-red-400 text-sm">Не подключено</div>
              </div>
              <div className="bg-zinc-800 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🎯</div>
                <div className="text-white font-semibold">Демо-данные</div>
                <div className="text-green-400 text-sm">Активно</div>
              </div>
            </div>
          </CardContent>
        </Card>

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
