"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, RefreshCw, Download, Upload, CheckCircle, AlertCircle } from "lucide-react"
import { useSettings } from "@/app/hooks/useSettings"

export default function AdminSettingsContent() {
  const { settings, loading, error, updateSettings, resetSettings } = useSettings()
  const [localSettings, setLocalSettings] = useState(settings || {})
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings)
    }
  }, [settings])

  const handleSettingChange = (key: string, value: any) => {
    setLocalSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleApiKeyChange = (service: string, value: string) => {
    setLocalSettings((prev) => ({
      ...prev,
      apiKeys: {
        ...prev.apiKeys,
        [service]: value,
      },
    }))
  }

  const handleSocialLinkChange = (platform: string, value: string) => {
    setLocalSettings((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }))
  }

  const saveSettings = async () => {
    try {
      setSaveStatus("saving")
      setErrorMessage(null)

      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          settings: localSettings,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSaveStatus("success")
        setTimeout(() => setSaveStatus("idle"), 3000)
      } else {
        setSaveStatus("error")
        setErrorMessage(result.message || "Неизвестная ошибка")
        setTimeout(() => setSaveStatus("idle"), 5000)
      }
    } catch (error) {
      console.error("Ошибка сохранения:", error)
      setSaveStatus("error")
      setErrorMessage("Ошибка сети при сохранении настроек")
      setTimeout(() => setSaveStatus("idle"), 5000)
    }
  }

  const exportSettings = () => {
    const dataStr = JSON.stringify(localSettings, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `sany-settings-${new Date().toISOString().split("T")[0]}.json`
    link.click()
  }

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string)
          setLocalSettings(importedSettings)
          alert("Настройки успешно импортированы!")
        } catch (error) {
          alert("Ошибка импорта настроек")
        }
      }
      reader.readAsText(file)
    }
  }

  const handleResetSettings = async () => {
    if (confirm("Вы уверены, что хотите сбросить настройки к умолчаниям?")) {
      try {
        setSaveStatus("saving")
        setErrorMessage(null)

        const response = await fetch("/api/settings", {
          method: "POST",
        })

        const result = await response.json()

        if (result.success) {
          setLocalSettings(result.data)
          setSaveStatus("success")
          setTimeout(() => setSaveStatus("idle"), 3000)
        } else {
          setSaveStatus("error")
          setErrorMessage(result.message || "Неизвестная ошибка")
          setTimeout(() => setSaveStatus("idle"), 5000)
        }
      } catch (error) {
        console.error("Ошибка сброса настроек:", error)
        setSaveStatus("error")
        setErrorMessage("Ошибка сети при сбросе настроек")
        setTimeout(() => setSaveStatus("idle"), 5000)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4"></div>
          <p>Загрузка настроек...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 mb-4">Ошибка: {error}</p>
          <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
            Перезагрузить страницу
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <a href="/admin" className="text-blue-400 hover:text-blue-300">
              <ArrowLeft className="w-6 h-6" />
            </a>
            <h1 className="text-3xl font-bold">⚙️ Настройки системы</h1>
            {localSettings?.lastUpdated && (
              <span className="text-sm text-gray-400">
                Обновлено: {new Date(localSettings.lastUpdated).toLocaleString("ru-RU")}
              </span>
            )}
          </div>
          <p className="text-gray-400">Конфигурация сайта, SEO инструментов и уведомлений</p>

          {/* Сообщение об ошибке */}
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-md flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-300">{errorMessage}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Общие настройки сайта */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">🌐 Общие настройки сайта</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Название сайта</Label>
                  <Input
                    value={localSettings.siteName || ""}
                    onChange={(e) => handleSettingChange("siteName", e.target.value)}
                    className="bg-zinc-800 text-white border-zinc-700"
                  />
                </div>
                <div>
                  <Label className="text-white">Email для связи</Label>
                  <Input
                    type="email"
                    value={localSettings.contactEmail || ""}
                    onChange={(e) => handleSettingChange("contactEmail", e.target.value)}
                    className="bg-zinc-800 text-white border-zinc-700"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white">Описание сайта</Label>
                <Textarea
                  value={localSettings.siteDescription || ""}
                  onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                  className="bg-zinc-800 text-white border-zinc-700"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Телефон для связи</Label>
                  <Input
                    value={localSettings.contactPhone || ""}
                    onChange={(e) => handleSettingChange("contactPhone", e.target.value)}
                    className="bg-zinc-800 text-white border-zinc-700"
                  />
                </div>
                <div>
                  <Label className="text-white">Часы работы</Label>
                  <Input
                    value={localSettings.workingHours || ""}
                    onChange={(e) => handleSettingChange("workingHours", e.target.value)}
                    className="bg-zinc-800 text-white border-zinc-700"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Кнопки действий */}
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={saveSettings}
              className={`${
                saveStatus === "saving"
                  ? "bg-yellow-600"
                  : saveStatus === "success"
                    ? "bg-green-600"
                    : saveStatus === "error"
                      ? "bg-red-600"
                      : "bg-green-600"
              } hover:opacity-80`}
              disabled={saveStatus === "saving"}
            >
              {saveStatus === "saving" ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Сохранение...
                </>
              ) : saveStatus === "success" ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Сохранено!
                </>
              ) : saveStatus === "error" ? (
                <>
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Ошибка
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить настройки
                </>
              )}
            </Button>

            <Button
              onClick={exportSettings}
              variant="outline"
              className="border-blue-600 text-blue-400 hover:bg-blue-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Экспорт настроек
            </Button>

            <Button variant="outline" className="border-green-600 text-green-400 hover:bg-green-600">
              <label className="flex items-center cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Импорт настроек
                <input type="file" accept=".json" onChange={importSettings} className="hidden" />
              </label>
            </Button>

            <Button
              onClick={handleResetSettings}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Сбросить к умолчаниям
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
