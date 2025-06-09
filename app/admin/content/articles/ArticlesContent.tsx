"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Plus, Filter, Edit, Trash2, Eye, Calendar, User, Tag, BarChart3 } from "lucide-react"

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  status: "draft" | "published" | "archived"
  author: string
  publishDate: string
  lastModified: string
  category: string
  tags: string[]
  views: number
  seoScore: number
}

export default function ArticlesContent() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      // Здесь будет реальный API запрос
      // const response = await fetch("/api/articles")
      // const result = await response.json()

      // Пока используем пустой массив
      setArticles([])
    } catch (error) {
      console.error("Ошибка загрузки статей:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-600">Опубликовано</Badge>
      case "draft":
        return <Badge className="bg-yellow-600">Черновик</Badge>
      case "archived":
        return <Badge className="bg-gray-600">Архив</Badge>
      default:
        return <Badge className="bg-gray-600">{status}</Badge>
    }
  }

  const getSEOScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || article.status === statusFilter
    const matchesCategory = categoryFilter === "all" || article.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">📝 Управление статьями</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700 animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-8 bg-gray-700 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">📝 Управление статьями</h1>
          <p className="text-gray-400 mt-2">Создание, редактирование и публикация статей</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Создать статью
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <FileText className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-gray-400 text-sm">Всего статей</p>
                <p className="text-2xl font-bold text-white">{articles.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Eye className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">Опубликовано</p>
                <p className="text-2xl font-bold text-white">
                  {articles.filter((a) => a.status === "published").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Edit className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-gray-400 text-sm">Черновики</p>
                <p className="text-2xl font-bold text-white">{articles.filter((a) => a.status === "draft").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <BarChart3 className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-gray-400 text-sm">Общие просмотры</p>
                <p className="text-2xl font-bold text-white">
                  {articles.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300 text-sm">Фильтры:</span>
            </div>

            <div className="flex-1 max-w-md">
              <Input
                placeholder="Поиск статей..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="published">Опубликовано</SelectItem>
                <SelectItem value="draft">Черновики</SelectItem>
                <SelectItem value="archived">Архив</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">Все категории</SelectItem>
                <SelectItem value="seo">SEO</SelectItem>
                <SelectItem value="equipment">Техника</SelectItem>
                <SelectItem value="guides">Руководства</SelectItem>
                <SelectItem value="news">Новости</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Articles List */}
      {articles.length > 0 ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Статьи ({filteredArticles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <div key={article.id} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-medium text-lg">{article.title}</h3>
                        {getStatusBadge(article.status)}
                        <Badge variant="outline" className="text-gray-300 border-gray-600">
                          {article.category}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{article.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {article.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(article.publishDate).toLocaleDateString("ru-RU")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views.toLocaleString()} просмотров
                        </span>
                        <span className={`flex items-center gap-1 ${getSEOScoreColor(article.seoScore)}`}>
                          <BarChart3 className="w-3 h-3" />
                          SEO: {article.seoScore}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-600 text-green-400 hover:bg-green-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {article.tags.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <Tag className="w-3 h-3 text-gray-500" />
                      {article.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-gray-600 text-gray-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-8 text-center">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Нет статей</h3>
            <p className="text-gray-400 mb-6">Создайте первую статью для вашего сайта</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Создать первую статью
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
