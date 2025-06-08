"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Edit, Eye, FileText, Plus, Search, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Page {
  id: string
  title: string
  slug: string
  content: string
  status: "published" | "draft"
  template: string
  createdAt: string
  updatedAt: string
  seoTitle?: string
  seoDescription?: string
  featuredImage?: string
}

export default function PagesManagementContent() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState<Page | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<Page>>({
    title: "",
    slug: "",
    content: "",
    status: "draft",
    template: "default",
    seoTitle: "",
    seoDescription: "",
  })

  // Загрузка страниц
  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    setLoading(true)
    setError(null)

    try {
      // В реальном приложении здесь будет запрос к API
      // const response = await fetch("/api/pages")
      // const data = await response.json()

      // Моковые данные для демонстрации
      const mockPages: Page[] = [
        {
          id: "1",
          title: "Главная страница",
          slug: "/",
          content: "<h1>Автобетононасосы SANY</h1><p>Официальный дилер SANY в России</p>",
          status: "published",
          template: "home",
          createdAt: "2023-12-01T10:00:00Z",
          updatedAt: "2024-01-05T15:30:00Z",
          seoTitle: "Автобетононасосы SANY - продажа, аренда, сервис",
          seoDescription:
            "Официальный дилер SANY в России. Продажа автобетононасосов, запчасти, сервисное обслуживание.",
          featuredImage: "/images/pump1.jpg",
        },
        {
          id: "2",
          title: "О компании",
          slug: "/about",
          content: "<h1>О компании</h1><p>Мы являемся официальным дилером SANY в России</p>",
          status: "published",
          template: "default",
          createdAt: "2023-12-10T11:20:00Z",
          updatedAt: "2024-01-02T09:45:00Z",
          seoTitle: "О компании - Автобетононасосы SANY",
          seoDescription: "Информация о компании, официальном дилере SANY в России.",
        },
        {
          id: "3",
          title: "Контакты",
          slug: "/contacts",
          content: "<h1>Контакты</h1><p>Свяжитесь с нами для получения дополнительной информации</p>",
          status: "published",
          template: "contact",
          createdAt: "2023-12-15T14:30:00Z",
          updatedAt: "2024-01-03T16:20:00Z",
          seoTitle: "Контакты - Автобетононасосы SANY",
          seoDescription: "Контактная информация официального дилера SANY в России.",
        },
        {
          id: "4",
          title: "Новая страница",
          slug: "/new-page",
          content: "<h1>Новая страница</h1><p>Содержимое новой страницы</p>",
          status: "draft",
          template: "default",
          createdAt: "2024-01-08T09:15:00Z",
          updatedAt: "2024-01-08T09:15:00Z",
        },
      ]

      setPages(mockPages)
    } catch (err) {
      setError("Ошибка при загрузке страниц")
      console.error("Error fetching pages:", err)
    } finally {
      setLoading(false)
    }
  }

  // Обработка поиска
  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Обработка формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSlugGeneration = () => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")

      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  // CRUD операции
  const handleCreatePage = async () => {
    try {
      // В реальном приложении здесь будет запрос к API
      // const response = await fetch("/api/pages", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData)
      // })
      // const data = await response.json()

      // Моковая логика для демонстрации
      const newPage: Page = {
        id: Date.now().toString(),
        title: formData.title || "Без названия",
        slug: formData.slug || `/page-${Date.now()}`,
        content: formData.content || "",
        status: (formData.status as "published" | "draft") || "draft",
        template: formData.template || "default",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,
        featuredImage: formData.featuredImage,
      }

      setPages([...pages, newPage])
      setIsCreating(false)
      resetForm()

      // Показать уведомление об успехе
      alert("Страница успешно создана")
    } catch (err) {
      console.error("Error creating page:", err)
      setError("Ошибка при создании страницы")
    }
  }

  const handleUpdatePage = async () => {
    if (!currentPage) return

    try {
      // В реальном приложении здесь будет запрос к API
      // const response = await fetch(`/api/pages/${currentPage.id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData)
      // })
      // const data = await response.json()

      // Моковая логика для демонстрации
      const updatedPages = pages.map((page) => {
        if (page.id === currentPage.id) {
          return {
            ...page,
            ...formData,
            updatedAt: new Date().toISOString(),
          }
        }
        return page
      })

      setPages(updatedPages)
      setIsEditing(false)
      resetForm()

      // Показать уведомление об успехе
      alert("Страница успешно обновлена")
    } catch (err) {
      console.error("Error updating page:", err)
      setError("Ошибка при обновлении страницы")
    }
  }

  const handleDeletePage = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить эту страницу?")) return

    try {
      // В реальном приложении здесь будет запрос к API
      // await fetch(`/api/pages/${id}`, { method: "DELETE" })

      // Моковая логика для демонстрации
      const updatedPages = pages.filter((page) => page.id !== id)
      setPages(updatedPages)

      // Показать уведомление об успехе
      alert("Страница успешно удалена")
    } catch (err) {
      console.error("Error deleting page:", err)
      setError("Ошибка при удалении страницы")
    }
  }

  const handleEditClick = (page: Page) => {
    setCurrentPage(page)
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      status: page.status,
      template: page.template,
      seoTitle: page.seoTitle || "",
      seoDescription: page.seoDescription || "",
      featuredImage: page.featuredImage || "",
    })
    setIsEditing(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      status: "draft",
      template: "default",
      seoTitle: "",
      seoDescription: "",
    })
    setCurrentPage(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Управление страницами</h2>
          <p className="text-gray-400 mt-1">Создание и редактирование страниц сайта</p>
        </div>

        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Создать страницу
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-3xl">
            <DialogHeader>
              <DialogTitle>Создать новую страницу</DialogTitle>
              <DialogDescription>Заполните форму для создания новой страницы на сайте</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="content" className="mt-4">
              <TabsList className="bg-zinc-800">
                <TabsTrigger value="content" className="data-[state=active]:bg-blue-600">
                  <FileText className="mr-2 h-4 w-4" />
                  Содержимое
                </TabsTrigger>
                <TabsTrigger value="seo" className="data-[state=active]:bg-blue-600">
                  <Search className="mr-2 h-4 w-4" />
                  SEO
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Заголовок</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="bg-zinc-800 border-zinc-700"
                      placeholder="Введите заголовок страницы"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL (slug)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="slug"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        className="bg-zinc-800 border-zinc-700"
                        placeholder="/example-page"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleSlugGeneration}
                        className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                      >
                        Сгенерировать
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Содержимое</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border-zinc-700 min-h-[200px]"
                    placeholder="Введите содержимое страницы (поддерживается HTML)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Статус</Label>
                    <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Выберите статус" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="published">Опубликовано</SelectItem>
                        <SelectItem value="draft">Черновик</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="template">Шаблон</Label>
                    <Select value={formData.template} onValueChange={(value) => handleSelectChange("template", value)}>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Выберите шаблон" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="default">Стандартный</SelectItem>
                        <SelectItem value="home">Главная страница</SelectItem>
                        <SelectItem value="contact">Контакты</SelectItem>
                        <SelectItem value="catalog">Каталог</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="seoTitle">SEO заголовок</Label>
                  <Input
                    id="seoTitle"
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border-zinc-700"
                    placeholder="SEO заголовок (title)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seoDescription">SEO описание</Label>
                  <Textarea
                    id="seoDescription"
                    name="seoDescription"
                    value={formData.seoDescription}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border-zinc-700"
                    placeholder="Meta description"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="featuredImage">Изображение (URL)</Label>
                  <Input
                    id="featuredImage"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border-zinc-700"
                    placeholder="/images/example.jpg"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setIsCreating(false)} className="bg-transparent border-white/20">
                Отмена
              </Button>
              <Button onClick={handleCreatePage} className="bg-blue-600 hover:bg-blue-700">
                Создать страницу
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">Список страниц</CardTitle>
            <CardDescription>Всего страниц: {pages.length}</CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Input
              placeholder="Поиск страниц..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-zinc-800 border-zinc-700"
            />
            <Button variant="outline" onClick={fetchPages} className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700">
              Обновить
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <Alert className="bg-red-900/20 border-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-300">{error}</AlertDescription>
            </Alert>
          ) : filteredPages.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>Страницы не найдены</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-3 px-4">Заголовок</th>
                    <th className="text-left py-3 px-4">URL</th>
                    <th className="text-center py-3 px-4">Шаблон</th>
                    <th className="text-center py-3 px-4">Статус</th>
                    <th className="text-center py-3 px-4">Обновлено</th>
                    <th className="text-center py-3 px-4">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPages.map((page) => (
                    <tr key={page.id} className="border-b border-zinc-800">
                      <td className="py-3 px-4">
                        <div className="font-medium">{page.title}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{page.slug}</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="outline" className="bg-zinc-800 border-zinc-700">
                          {page.template}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge className={page.status === "published" ? "bg-green-600" : "bg-yellow-600"}>
                          {page.status === "published" ? "Опубликовано" : "Черновик"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-400">
                        {new Date(page.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClick(page)}
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-400 hover:text-green-300 hover:bg-green-900/20"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeletePage(page.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Диалог редактирования */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle>Редактировать страницу</DialogTitle>
            <DialogDescription>Внесите изменения в страницу "{currentPage?.title}"</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="content" className="mt-4">
            <TabsList className="bg-zinc-800">
              <TabsTrigger value="content" className="data-[state=active]:bg-blue-600">
                <FileText className="mr-2 h-4 w-4" />
                Содержимое
              </TabsTrigger>
              <TabsTrigger value="seo" className="data-[state=active]:bg-blue-600">
                <Search className="mr-2 h-4 w-4" />
                SEO
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Заголовок</Label>
                  <Input
                    id="edit-title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-slug">URL (slug)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="edit-slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      className="bg-zinc-800 border-zinc-700"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSlugGeneration}
                      className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                    >
                      Сгенерировать
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-content">Содержимое</Label>
                <Textarea
                  id="edit-content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="bg-zinc-800 border-zinc-700 min-h-[200px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Статус</Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="published">Опубликовано</SelectItem>
                      <SelectItem value="draft">Черновик</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-template">Шаблон</Label>
                  <Select value={formData.template} onValueChange={(value) => handleSelectChange("template", value)}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Выберите шаблон" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="default">Стандартный</SelectItem>
                      <SelectItem value="home">Главная страница</SelectItem>
                      <SelectItem value="contact">Контакты</SelectItem>
                      <SelectItem value="catalog">Каталог</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="edit-seoTitle">SEO заголовок</Label>
                <Input
                  id="edit-seoTitle"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleInputChange}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-seoDescription">SEO описание</Label>
                <Textarea
                  id="edit-seoDescription"
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleInputChange}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-featuredImage">Изображение (URL)</Label>
                <Input
                  id="edit-featuredImage"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleInputChange}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsEditing(false)} className="bg-transparent border-white/20">
              Отмена
            </Button>
            <Button onClick={handleUpdatePage} className="bg-blue-600 hover:bg-blue-700">
              Сохранить изменения
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
