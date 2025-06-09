"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  BarChart3,
  Target,
  FileText,
  Edit3,
  Truck,
  Database,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react"

interface MenuItem {
  title: string
  icon: React.ReactNode
  href: string
  badge?: string
  description: string
  category: string
}

const menuItems: MenuItem[] = [
  {
    title: "Дашборд",
    icon: <Home className="w-5 h-5" />,
    href: "/admin",
    description: "Обзор системы и аналитика",
    category: "Главная",
  },
  {
    title: "SEO Мониторинг",
    icon: <BarChart3 className="w-5 h-5" />,
    href: "/seo-monitor",
    badge: "Live",
    description: "Отслеживание позиций в реальном времени",
    category: "SEO",
  },
  {
    title: "Семантическое ядро",
    icon: <Target className="w-5 h-5" />,
    href: "/semantic-core",
    description: "Управление ключевыми словами",
    category: "SEO",
  },
  {
    title: "SEO Рекомендации",
    icon: <FileText className="w-5 h-5" />,
    href: "/seo-recommendations",
    description: "Автоматические рекомендации по оптимизации",
    category: "SEO",
  },
  {
    title: "Контент-стратегия",
    icon: <Edit3 className="w-5 h-5" />,
    href: "/content-strategy",
    description: "Планирование и создание контента",
    category: "Контент",
  },
  {
    title: "Модели техники",
    icon: <Truck className="w-5 h-5" />,
    href: "/admin/models",
    description: "Управление каталогом автобетононасосов",
    category: "Каталог",
  },
  {
    title: "Источники данных",
    icon: <Database className="w-5 h-5" />,
    href: "/admin/data-sources",
    badge: "API",
    description: "Настройка интеграций с внешними сервисами",
    category: "Интеграции",
  },
  {
    title: "Google SEO",
    icon: <Search className="w-5 h-5" />,
    href: "/admin/google-seo",
    badge: "OAuth",
    description: "Интеграция с Google Search Console",
    category: "Интеграции",
  },
  {
    title: "Настройки",
    icon: <Settings className="w-5 h-5" />,
    href: "/admin/settings",
    description: "Конфигурация системы",
    category: "Система",
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState("")
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)

  useEffect(() => {
    // Безопасное получение текущего пути
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname)

      // Обновляем путь при изменении URL
      const handleLocationChange = () => {
        setCurrentPath(window.location.pathname)
      }

      window.addEventListener("popstate", handleLocationChange)

      // Также отслеживаем изменения через MutationObserver для SPA навигации
      const observer = new MutationObserver(() => {
        if (window.location.pathname !== currentPath) {
          setCurrentPath(window.location.pathname)
        }
      })

      observer.observe(document.body, { childList: true, subtree: true })

      return () => {
        window.removeEventListener("popstate", handleLocationChange)
        observer.disconnect()
      }
    }
  }, [currentPath])

  const groupedMenuItems = menuItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, MenuItem[]>,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-white hover:bg-gray-800"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">SANY Admin</h1>
                <p className="text-gray-400 text-xs">SEO Management System</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative text-white hover:bg-gray-800">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-xs">{notifications}</Badge>
              )}
            </Button>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-white hover:bg-gray-800"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="hidden md:block">Игорь Жуков</span>
                <ChevronDown className="w-4 h-4" />
              </Button>

              {userMenuOpen && (
                <div className="absolute right-0 top-12 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
                  <div className="p-4 border-b border-gray-700">
                    <p className="text-white font-medium">Игорь Жуков</p>
                    <p className="text-gray-400 text-sm">SEO Administrator</p>
                    <p className="text-gray-500 text-xs">zhukovigor@mail.ru</p>
                  </div>
                  <div className="p-2">
                    <Button variant="ghost" className="w-full justify-start text-red-400 hover:bg-red-900/20">
                      <LogOut className="w-4 h-4 mr-2" />
                      Выйти
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-gray-900/95 backdrop-blur-md border-r border-gray-800 transform transition-transform duration-300 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 overflow-y-auto`}
      >
        <div className="p-6">
          {Object.entries(groupedMenuItems).map(([category, items]) => (
            <div key={category} className="mb-8">
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4">{category}</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      currentPath === item.href
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <div
                      className={`${currentPath === item.href ? "text-white" : "text-gray-400 group-hover:text-white"}`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs bg-blue-600 text-white">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs opacity-75 mt-1">{item.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* System Status */}
        <div className="p-6 border-t border-gray-800">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <h4 className="text-white font-medium mb-3">Статус системы</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Google OAuth</span>
                  <Badge className="bg-green-600 text-white">Активно</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">SEO Мониторинг</span>
                  <Badge className="bg-green-600 text-white">Работает</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">API Лимиты</span>
                  <Badge className="bg-yellow-600 text-white">75%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-80 pt-16 min-h-screen">
        <div className="p-6">{children}</div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
