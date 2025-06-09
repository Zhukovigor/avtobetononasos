"use client"

// Импортируем конфигурацию для отключения статической генерации
import "../config"
import { Suspense } from "react"
import DataSourcesPageContent from "./DataSourcesPageContent"

export default function DataSourcesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
        </div>
      }
    >
      <DataSourcesPageContent />
    </Suspense>
  )
}
