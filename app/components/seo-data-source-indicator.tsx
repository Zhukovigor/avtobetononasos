"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SEODataSourceIndicatorProps {
  source?: string
  timestamp?: string
  isError?: boolean
}

export default function SEODataSourceIndicator({
  source = "Demo Data",
  timestamp,
  isError = false,
}: SEODataSourceIndicatorProps) {
  const [timeAgo, setTimeAgo] = useState<string>("")

  useEffect(() => {
    if (!timestamp) return

    const updateTimeAgo = () => {
      const now = new Date()
      const updateTime = new Date(timestamp)
      const diffMs = now.getTime() - updateTime.getTime()
      const diffMins = Math.floor(diffMs / 60000)

      if (diffMins < 1) {
        setTimeAgo("только что")
      } else if (diffMins < 60) {
        setTimeAgo(`${diffMins} мин. назад`)
      } else if (diffMins < 1440) {
        setTimeAgo(`${Math.floor(diffMins / 60)} ч. назад`)
      } else {
        setTimeAgo(`${Math.floor(diffMins / 1440)} дн. назад`)
      }
    }

    updateTimeAgo()
    const interval = setInterval(updateTimeAgo, 60000)

    return () => clearInterval(interval)
  }, [timestamp])

  // Определяем цвет и иконку в зависимости от источника данных
  const getSourceInfo = () => {
    if (isError) {
      return {
        color: "bg-red-600 hover:bg-red-700",
        icon: "⚠️",
        label: "Ошибка API",
      }
    }

    if (source.includes("Google Search Console")) {
      return {
        color: "bg-blue-600 hover:bg-blue-700",
        icon: "🔍",
        label: "Google Search Console",
      }
    }

    if (source.includes("Yandex")) {
      return {
        color: "bg-yellow-600 hover:bg-yellow-700",
        icon: "🟡",
        label: "Яндекс.Вебмастер",
      }
    }

    if (source.includes("SEMrush")) {
      return {
        color: "bg-green-600 hover:bg-green-700",
        icon: "📈",
        label: "SEMrush API",
      }
    }

    return {
      color: "bg-gray-600 hover:bg-gray-700",
      icon: "🎲",
      label: "Демо-данные",
    }
  }

  const sourceInfo = getSourceInfo()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={`${sourceInfo.color} cursor-help`}>
            {sourceInfo.icon} {sourceInfo.label} {timeAgo && `• ${timeAgo}`}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Источник данных: {source}</p>
          {timestamp && <p>Обновлено: {new Date(timestamp).toLocaleString("ru-RU")}</p>}
          {isError && <p className="text-red-400">Произошла ошибка при получении данных</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
