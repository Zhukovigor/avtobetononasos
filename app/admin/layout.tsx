import type React from "react"
import { BarChart3, Settings, Database, Truck } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      <div className="w-64 border-r border-r-zinc-700 p-4">
        <nav className="space-y-2">
          <a
            href="/admin"
            className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <BarChart3 className="w-5 h-5" />
            Дашборд
          </a>
          <a
            href="/admin/models"
            className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <Truck className="w-5 h-5" />
            Модели техники
          </a>
          <a
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
            Настройки
          </a>
          <a
            href="/admin/data-sources"
            className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <Database className="w-5 h-5" />
            Источники данных
          </a>
        </nav>
      </div>
      <main className="flex-1 p-4">{children}</main>
    </div>
  )
}
