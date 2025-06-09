"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart,
  RefreshCw,
  AlertTriangle,
  Clock,
  Mail,
} from "lucide-react"

interface ReportData {
  scheduled: Array<{
    name: string
    frequency: string
    lastSent: string
    nextSend: string
    recipients: number
    status: "active" | "paused"
  }>
  available: Array<{
    name: string
    description: string
    type: "analytics" | "seo" | "traffic" | "conversions"
    lastGenerated: string
    size: string
  }>
}

export default function ReportsAnalyticsContent() {
  const [data, setData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchReportsData()
  }, [])

  const fetchReportsData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Получаем данные отчетов
      const response = await fetch("/api/reports-data")
      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error || "Ошибка загрузки данных отчетов")
      }
    } catch (err) {
      setError("Ошибка подключения к API")
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchReportsData()
    setRefreshing(false)
  }

  const handleDownloadReport = async (reportType: string) => {
    try {
      const response = await fetch(`/api/reports/generate?type=${reportType}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${reportType}-report-${new Date().toISOString().split("T")[0]}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error("Ошибка скачивания отчета:", err)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">📊 Отчеты и аналитика</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700 animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-700 rounded mb-4"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="h-3 bg-gray-700 rounded"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Моковые данные для демонстрации
  const mockData: ReportData = {
    scheduled: [
      {
        name: "Еженедельный отчет по трафику",
        frequency: "Еженедельно",
        lastSent: "2024-01-08",
        nextSend: "2024-01-15",
        recipients: 3,
        status: "active",
      },
      {
        name: "Месячный SEO отчет",
        frequency: "Ежемесячно",
        lastSent: "2024-01-01",
        nextSend: "2024-02-01",
        recipients: 5,
        status: "active",
      },
      {
        name: "Отчет по конверсиям",
        frequency: "Ежедневно",
        lastSent: "2024-01-08",
        nextSend: "2024-01-09",
        recipients: 2,
        status: "paused",
      },
    ],
    available: [
      {
        name: "Полный аналитический отчет",
        description: "Комплексный анализ всех метрик сайта за выбранный период",
        type: "analytics",
        lastGenerated: "2024-01-08",
        size: "2.4 MB",
      },
      {
        name: "SEO аудит и рекомендации",
        description: "Детальный анализ SEO показателей и план улучшений",
        type: "seo",
        lastGenerated: "2024-01-07",
        size: "1.8 MB",
      },
      {
        name: "Анализ источников трафика",
        description: "Подробная статистика по всем каналам привлечения",
        type: "traffic",
        lastGenerated: "2024-01-08",
        size: "1.2 MB",
      },
      {
        name: "Отчет по конверсиям",
        description: "Анализ воронки продаж и эффективности целей",
        type: "conversions",
        lastGenerated: "2024-01-08",
        size: "0.9 MB",
      },
    ],
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "analytics":
        return BarChart3
      case "seo":
        return TrendingUp
      case "traffic":
        return PieChart
      case "conversions":
        return TrendingUp
      default:
        return FileText
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "analytics":
        return "bg-blue-600"
      case "seo":
        return "bg-green-600"
      case "traffic":
        return "bg-purple-600"
      case "conversions":
        return "bg-orange-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">📊 Отчеты и аналитика</h1>
          <p className="text-gray-400 mt-2">Автоматические отчеты и экспорт данных</p>
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
          <AlertDescription className="text-red-300">{error}</AlertDescription>
        </Alert>
      )}

      {/* Scheduled Reports */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Запланированные отчеты
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.scheduled.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">{report.name}</p>
                    <p className="text-gray-400 text-sm">
                      {report.frequency} • {report.recipients} получателей
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-gray-300 text-sm">Последний: {report.lastSent}</p>
                    <p className="text-gray-400 text-xs">Следующий: {report.nextSend}</p>
                  </div>
                  <Badge className={report.status === "active" ? "bg-green-600" : "bg-yellow-600"}>
                    {report.status === "active" ? "Активен" : "Приостановлен"}
                  </Badge>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                    Настроить
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-700">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Calendar className="w-4 h-4 mr-2" />
              Создать новый отчет
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Доступные отчеты
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {mockData.available.map((report, index) => {
              const Icon = getTypeIcon(report.type)
              return (
                <div key={index} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${getTypeColor(report.type)}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">{report.name}</h3>
                      <p className="text-gray-400 text-sm mb-3">{report.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {report.lastGenerated}
                          </span>
                          <span>{report.size}</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleDownloadReport(report.type)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Скачать
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-blue-900/20 border-blue-800">
          <CardContent className="p-6 text-center">
            <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">Создать отчет</h3>
            <p className="text-gray-400 text-sm mb-4">Сгенерировать новый отчет с актуальными данными</p>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full">Создать</Button>
          </CardContent>
        </Card>

        <Card className="bg-green-900/20 border-green-800">
          <CardContent className="p-6 text-center">
            <Calendar className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">Настроить расписание</h3>
            <p className="text-gray-400 text-sm mb-4">Автоматическая отправка отчетов по расписанию</p>
            <Button className="bg-green-600 hover:bg-green-700 w-full">Настроить</Button>
          </CardContent>
        </Card>

        <Card className="bg-purple-900/20 border-purple-800">
          <CardContent className="p-6 text-center">
            <Download className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">Экспорт данных</h3>
            <p className="text-gray-400 text-sm mb-4">Выгрузка данных в различных форматах</p>
            <Button className="bg-purple-600 hover:bg-purple-700 w-full">Экспорт</Button>
          </CardContent>
        </Card>
      </div>

      {/* Report Templates */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Шаблоны отчетов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-700 rounded-lg border-2 border-dashed border-gray-600 hover:border-blue-500 transition-colors cursor-pointer">
              <div className="text-center">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-300 text-sm">Создать новый шаблон</p>
              </div>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Базовая аналитика</p>
                <p className="text-gray-400 text-xs">Основные метрики</p>
              </div>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">SEO отчет</p>
                <p className="text-gray-400 text-xs">Позиции и трафик</p>
              </div>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="text-center">
                <PieChart className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Детальный анализ</p>
                <p className="text-gray-400 text-xs">Полная статистика</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
