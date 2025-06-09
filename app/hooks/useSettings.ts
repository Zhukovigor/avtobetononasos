"use client"

import { useState, useEffect, useCallback } from "react"

interface Settings {
  // Общие настройки
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string

  // SEO настройки
  autoUpdate: boolean
  emailNotifications: boolean
  weeklyReports: boolean
  criticalAlerts: boolean
  updateFrequency: string
  reportEmail: string

  // API ключи
  apiKeys: {
    yandexWordstat: string
    googleSearchConsole: string
    semrush: string
    googleAnalytics: string
  }

  // Настройки моделей
  defaultWarranty: string
  defaultLocation: string
  defaultPayment: string

  // Настройки форм
  leadNotificationEmail: string
  autoResponse: boolean
  autoResponseText: string

  // Социальные сети
  socialLinks: {
    whatsapp: string
    telegram: string
    vk: string
    dzen: string
  }

  // Настройки отображения
  currency: string
  language: string
  showPrices: boolean
  workingHours: string

  // Настройки безопасности
  enableCaptcha: boolean
  maxRequestsPerHour: number

  // Мета-теги по умолчанию
  defaultMetaTitle: string
  defaultMetaDescription: string
  defaultMetaKeywords: string

  // Настройки аналитики
  yandexMetrikaId: string
  googleAnalyticsId: string

  // Последнее обновление
  lastUpdated: string
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Загрузка настроек
  const fetchSettings = useCallback(async (section?: string) => {
    try {
      setLoading(true)
      setError(null)

      const url = section ? `/api/settings?section=${section}` : "/api/settings"
      const response = await fetch(url)
      const result = await response.json()

      if (result.success) {
        if (section) {
          setSettings((prev) => (prev ? { ...prev, [section]: result.data } : null))
        } else {
          setSettings(result.data)
        }
      } else {
        setError(result.message || "Ошибка загрузки настроек")
      }
    } catch (err) {
      setError("Ошибка загрузки настроек")
      console.error("Ошибка загрузки настроек:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Обновление настроек
  const updateSettings = useCallback(async (newSettings: Partial<Settings>, section?: string) => {
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          settings: newSettings,
          section,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSettings(result.data)
        return true
      } else {
        setError(result.message || "Ошибка сохранения настроек")
        return false
      }
    } catch (err) {
      setError("Ошибка сохранения настроек")
      console.error("Ошибка сохранения настроек:", err)
      return false
    }
  }, [])

  // Сброс к настройкам по умолчанию
  const resetSettings = useCallback(async () => {
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
      })

      const result = await response.json()

      if (result.success) {
        setSettings(result.data)
        return true
      } else {
        setError(result.message || "Ошибка сброса настроек")
        return false
      }
    } catch (err) {
      setError("Ошибка сброса настроек")
      console.error("Ошибка сброса настроек:", err)
      return false
    }
  }, [])

  // Получение конкретной настройки
  const getSetting = useCallback(
    (key: keyof Settings) => {
      return settings?.[key]
    },
    [settings],
  )

  // Загрузка настроек при монтировании
  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  return {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings,
    resetSettings,
    getSetting,
  }
}
