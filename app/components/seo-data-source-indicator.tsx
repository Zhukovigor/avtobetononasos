import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, Clock, Database, WifiOff } from "lucide-react"

interface SEODataSourceIndicatorProps {
  source: string
  timestamp?: string
  isError?: boolean
  showDetails?: boolean
}

export default function SEODataSourceIndicator({
  source,
  timestamp,
  isError = false,
  showDetails = true,
}: SEODataSourceIndicatorProps) {
  const getSourceInfo = () => {
    if (isError) {
      return {
        icon: <AlertTriangle className="w-3 h-3" />,
        label: "Ошибка",
        color: "bg-red-600",
        description: "Ошибка получения данных",
      }
    }

    switch (source) {
      case "Google Search Console API":
      case "Google Search Console API (OAuth)":
        return {
          icon: <CheckCircle className="w-3 h-3" />,
          label: "Google GSC",
          color: "bg-green-600",
          description: "Реальные данные из Google Search Console",
        }
      case "Google Analytics API":
        return {
          icon: <CheckCircle className="w-3 h-3" />,
          label: "Google Analytics",
          color: "bg-blue-600",
          description: "Реальные данные из Google Analytics",
        }
      case "Yandex Webmaster API":
        return {
          icon: <CheckCircle className="w-3 h-3" />,
          label: "Яндекс.Вебмастер",
          color: "bg-yellow-600",
          description: "Реальные данные из Яндекс.Вебмастер",
        }
      case "Not Available":
      case "No Data":
        return {
          icon: <WifiOff className="w-3 h-3" />,
          label: "Нет данных",
          color: "bg-gray-600",
          description: "Источник данных не подключен",
        }
      case "Error":
        return {
          icon: <AlertTriangle className="w-3 h-3" />,
          label: "Ошибка",
          color: "bg-red-600",
          description: "Ошибка получения данных",
        }
      default:
        return {
          icon: <Database className="w-3 h-3" />,
          label: "Неизвестно",
          color: "bg-gray-600",
          description: "Неизвестный источник данных",
        }
    }
  }

  const sourceInfo = getSourceInfo()

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp)
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffMinutes = Math.floor(diffMs / (1000 * 60))

      if (diffMinutes < 1) return "только что"
      if (diffMinutes < 60) return `${diffMinutes} мин назад`
      if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} ч назад`
      return date.toLocaleDateString("ru-RU")
    } catch {
      return "неизвестно"
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Badge className={`${sourceInfo.color} flex items-center gap-1 text-xs`}>
        {sourceInfo.icon}
        {sourceInfo.label}
      </Badge>
      {showDetails && timestamp && (
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock className="w-3 h-3" />
          {formatTimestamp(timestamp)}
        </div>
      )}
    </div>
  )
}
