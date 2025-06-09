"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    autoUpdate: true,
    emailNotifications: true,
    weeklyReports: true,
    criticalAlerts: true,
    updateFrequency: "daily",
    reportEmail: "zhukovigor@mail.ru",
    apiKeys: {
      yandexWordstat: "",
      googleSearchConsole: "",
      semrush: "",
    },
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleApiKeyChange = (service: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      apiKeys: {
        ...prev.apiKeys,
        [service]: value,
      },
    }))
  }

  const saveSettings = () => {
    // Здесь бы была логика сохранения настроек
    alert("Настройки сохранены!")
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">⚙️ Настройки админ-панели</h1>
          <p className="text-gray-400">Конфигурация SEO инструментов и уведомлений</p>
        </div>

        <div className="space-y-6">
          {/* Общие настройки */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">🔧 Общие настройки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Автоматическое обновление данных</h3>
                  <p className="text-gray-400 text-sm">Автоматически проверять позиции и обновлять статистику</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoUpdate}
                    onChange={(e) => handleSettingChange("autoUpdate", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Email уведомления</h3>
                  <p className="text-gray-400 text-sm">Получать уведомления о важных изменениях</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange("emailNotifications", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Еженедельные отчеты</h3>
                  <p className="text-gray-400 text-sm">Автоматическая отправка сводных отчетов</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.weeklyReports}
                    onChange={(e) => handleSettingChange("weeklyReports", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Частота обновления данных</label>
                <select
                  value={settings.updateFrequency}
                  onChange={(e) => handleSettingChange("updateFrequency", e.target.value)}
                  className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 w-full"
                >
                  <option value="hourly">Каждый час</option>
                  <option value="daily">Ежедневно</option>
                  <option value="weekly">Еженедельно</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Email для отчетов</label>
                <input
                  type="email"
                  value={settings.reportEmail}
                  onChange={(e) => handleSettingChange("reportEmail", e.target.value)}
                  className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 w-full"
                  placeholder="email@example.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* API ключи */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">🔑 API ключи и интеграции</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Яндекс.Wordstat API</label>
                <input
                  type="password"
                  value={settings.apiKeys.yandexWordstat}
                  onChange={(e) => handleApiKeyChange("yandexWordstat", e.target.value)}
                  className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 w-full"
                  placeholder="Введите API ключ Яндекс.Wordstat"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Google Search Console</label>
                <input
                  type="password"
                  value={settings.apiKeys.googleSearchConsole}
                  onChange={(e) => handleApiKeyChange("googleSearchConsole", e.target.value)}
                  className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 w-full"
                  placeholder="Введите API ключ Google Search Console"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">SEMrush API</label>
                <input
                  type="password"
                  value={settings.apiKeys.semrush}
                  onChange={(e) => handleApiKeyChange("semrush", e.target.value)}
                  className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 w-full"
                  placeholder="Введите API ключ SEMrush"
                />
              </div>
            </CardContent>
          </Card>

          {/* Уведомления */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">🔔 Настройки уведомлений</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Критические алерты</h3>
                  <p className="text-gray-400 text-sm">Уведомления о серьезных падениях позиций</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.criticalAlerts}
                    onChange={(e) => handleSettingChange("criticalAlerts", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="bg-zinc-800 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Условия для критических алертов:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Падение позиции более чем на 5 мест</li>
                  <li>• Выход из ТОП-10 по ключевым запросам</li>
                  <li>• Снижение трафика более чем на 20%</li>
                  <li>• Технические ошибки на сайте</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Кнопки действий */}
          <div className="flex gap-4">
            <button
              onClick={saveSettings}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Сохранить настройки
            </button>
            <button className="bg-zinc-700 hover:bg-zinc-600 px-6 py-3 rounded-lg font-semibold transition-colors">
              Сбросить к умолчаниям
            </button>
            <a
              href="/admin"
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              ← К дашборду
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
