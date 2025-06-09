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
  ChevronRight,
  Globe,
  Users,
  TrendingUp,
  Activity,
  BookOpen,
  ImageIcon,
  PieChart,
  Star,
  RefreshCw,
  Filter,
  Package,
  List,
  Loader2,
} from "lucide-react"
import { Suspense } from "react"
import { useAdminAuth } from "../hooks/useAdminAuth"
import { useRouter } from "next/navigation"

// Импортируем конфигурацию для отключения статической генерации
import "../admin/config"

interface MenuItem {
  title: string
  icon: React.ReactNode
  href?: string
  badge?: string
  description: string
  category: string
  children?: MenuItem[]
  isNew?: boolean
  isPopular?: boolean
}

const menuItems: MenuItem[] = [
  // Главная
  {
    title: "Дашборд",
    icon: <Home className="w-5 h-5" />,
    href: "/admin",
    description: "Обзор системы и основная аналитика",
    category: "Главная",
    isPopular: true,
  },
  {
    title: "Аналитика",
    icon: <BarChart3 className="w-5 h-5" />,
    description: "Детальная аналитика и отчеты",
    category: "Главная",
    children: [
      {
        title: "Общая статистика",
        icon: <PieChart className="w-4 h-4" />,
        href: "/admin/analytics/overview",
        description: "Общие показатели сайта",
        category: "Аналитика",
      },
      {
        title: "Трафик",
        icon: <TrendingUp className="w-4 h-4" />,
        href: "/admin/analytics/traffic",
        description: "Анализ посещаемости",
        category: "Аналитика",
      },
      {
        title: "Конверсии",
        icon: <Target className="w-4 h-4" />,
        href: "/admin/analytics/conversions",
        description: "Отслеживание целей",
        category: "Аналитика",
      },
    ],
  },

  // Контент
  {
    title: "Управление контентом",
    icon: <BookOpen className="w-5 h-5" />,
    description: "Создание и редактирование контента",
    category: "Контент",
    children: [
      {
        title: "Статьи",
        icon: <FileText className="w-4 h-4" />,
        href: "/admin/content/articles",
        description: "Управление статьями",
        category: "Контент",
      },
      {
        title: "Страницы",
        icon: <Globe className="w-4 h-4" />,
        href: "/admin/content/pages",
        description: "Управление страницами",
        category: "Контент",
      },
      {
        title: "Медиа",
        icon: <ImageIcon className="w-4 h-4" />,
        href: "/admin/content/media",
        description: "Изображения и видео",
        category: "Контент",
      },
    ],
  },

  // Каталог
  {
    title: "Модели техники",
    icon: <Truck className="w-5 h-5" />,
    href: "/admin/models",
    description: "Управление каталогом автобетононасосов",
    category: "Каталог",
    isPopular: true,
  },
  {
    title: "Характеристики",
    icon: <List className="w-5 h-5" />,
    description: "Управление характеристиками техники",
    category: "Каталог",
    children: [
      {
        title: "Технические характеристики",
        icon: <Settings className="w-4 h-4" />,
        href: "/admin/specifications/technical",
        description: "Технические параметры",
        category: "Характеристики",
      },
      {
        title: "Фильтры",
        icon: <Filter className="w-4 h-4" />,
        href: "/admin/specifications/filters",
        description: "Настройка фильтров",
        category: "Характеристики",
      },
    ],
  },

  // Лиды и клиенты
  {
    title: "Лиды",
    icon: <Users className="w-5 h-5" />,
    description: "Управление заявками и клиентами",
    category: "CRM",
    badge: "89",
    children: [
      {
        title: "Все лиды",
        icon: <List className="w-4 h-4" />,
        href: "/admin/leads",
        description: "Список всех заявок",
        category: "Лиды",
      },
      {
        title: "Новые заявки",
        icon: <Star className="w-4 h-4" />,
        href: "/admin/leads/new",
        badge: "12",
        description: "Необработанные заявки",
        category: "Лиды",
      },
    ],
  },

  // Система
  {
    title: "Настройки",
    icon: <Settings className="w-5 h-5" />,
    href: "/admin/settings",
    description: "Конфигурация системы",
    category: "Система",
  },
  {
    title: "SEO",
    icon: <Search className="w-5 h-5" />,
    href: "/seo",
    description: "Управление SEO",
    category: "Система",
  },
]

const Plus = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading } = useAdminAuth()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState("")
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      setIsRedirecting(true)
      router.push("/")
    }
  }, [isAdmin, isLoading, router])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname)

      const handleLocationChange = () => {
        setCurrentPath(window.location.pathname)
      }

      window.addEventListener("popstate", handleLocationChange)

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

  const toggleMenu = (menuTitle: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuTitle) ? prev.filter((title) => title !== menuTitle) : [...prev, menuTitle],
    )
  }

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

  const isMenuExpanded = (menuTitle: string) => expandedMenus.includes(menuTitle)

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = hasChildren && isMenuExpanded(item.title)
    const isActive =
      currentPath === item.href || (hasChildren && item.children?.some((child) => currentPath === child.href))

    return (
      <div key={item.title}>
        {hasChildren ? (
          <button
            onClick={() => toggleMenu(item.title)}
            className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-left ${
              isActive
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <div className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}>{item.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.title}</span>
                {item.badge && (
                  <Badge variant="secondary" className="text-xs bg-blue-600 text-white">
                    {item.badge}
                  </Badge>
                )}
                {item.isNew && (
                  <Badge variant="secondary" className="text-xs bg-green-600 text-white">
                    NEW
                  </Badge>
                )}
                {item.isPopular && (
                  <Badge variant="secondary" className="text-xs bg-orange-600 text-white">
                    ★
                  </Badge>
                )}
              </div>
              <p className="text-xs opacity-75 mt-1">{item.description}</p>
            </div>
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? "rotate-90" : ""
              } ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}
            />
          </button>
        ) : (
          <a
            href={item.href}
            className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              level > 0 ? "ml-6" : ""
            } ${
              currentPath === item.href
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <div className={`${currentPath === item.href ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
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
                {item.isNew && (
                  <Badge variant="secondary" className="text-xs bg-green-600 text-white">
                    NEW
                  </Badge>
                )}
                {item.isPopular && (
                  <Badge variant="secondary" className="text-xs bg-orange-600 text-white">
                    ★
                  </Badge>
                )}
              </div>
              <p className="text-xs opacity-75 mt-1">{item.description}</p>
            </div>
          </a>
        )}

        {hasChildren && isExpanded && (
          <div className="ml-4 mt-2 space-y-1 border-l border-gray-700 pl-4">
            {item.children?.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  if (isLoading || isRedirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <h2 className="mt-4 text-xl font-semibold text-gray-700">
            {isRedirecting ? "Перенаправление..." : "Проверка доступа..."}
          </h2>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null // Это не должно отображаться, так как мы перенаправляем
  }

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
            {/* Quick Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Синхронизация
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Добавить
              </Button>
            </div>

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
                  <div className="p-2 space-y-1">
                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
                      <User className="w-4 h-4 mr-2" />
                      Профиль
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
                      <Settings className="w-4 h-4 mr-2" />
                      Настройки
                    </Button>
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
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Поиск по меню..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {Object.entries(groupedMenuItems).map(([category, items]) => (
            <div key={category} className="mb-8">
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                {category === "Главная" && <Home className="w-3 h-3" />}
                {category === "SEO" && <Search className="w-3 h-3" />}
                {category === "Контент" && <Edit3 className="w-3 h-3" />}
                {category === "Каталог" && <Package className="w-3 h-3" />}
                {category === "CRM" && <Users className="w-3 h-3" />}
                {category === "Маркетинг" && <TrendingUp className="w-3 h-3" />}
                {category === "Интеграции" && <Database className="w-3 h-3" />}
                {category === "Система" && <Settings className="w-3 h-3" />}
                {category}
              </h3>
              <div className="space-y-2">{items.map((item) => renderMenuItem(item))}</div>
            </div>
          ))}
        </div>

        {/* System Status */}
        <div className="p-6 border-t border-gray-800">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Статус системы
              </h4>
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
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Последнее обновление</span>
                  <span className="text-gray-400 text-xs">2 мин назад</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-80 pt-16 min-h-screen">
        <div className="p-6">
          <Suspense
            fallback={
              <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4"></div>
                  <p>Загрузка...</p>
                </div>
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
