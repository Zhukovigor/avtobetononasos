"use client"

// Импортируем конфигурацию для отключения статической генерации
import "./config"
import { Suspense } from "react"
import AdminDashboardContent from "./AdminDashboardContent"

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
        </div>
      }
    >
      <AdminDashboardContent />
    </Suspense>
  )
}
