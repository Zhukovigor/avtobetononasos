"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Plus,
  Search,
  Edit,
  Trash2,
  Phone,
  Mail,
  Building,
  Calendar,
  User,
  Users,
  MapPin,
  Globe,
} from "lucide-react"

interface Client {
  id: string
  name: string
  type: "individual" | "company"
  email: string
  phone: string
  address?: string
  city?: string
  region?: string
  postalCode?: string
  country?: string
  website?: string
  contactPerson?: string
  position?: string
  companyName?: string
  companySize?: string
  industry?: string
  source: string
  status: "active" | "inactive" | "potential"
  createdAt: string
  updatedAt: string
  lastContact?: string
  notes?: string
  tags: string[]
}

interface ClientStats {
  total: number
  active: number
  inactive: number
  potential: number
  companies: number
  individuals: number
}

export default function ClientsManagementContent() {
  const [clients, setClients] = useState<Client[]>([])
  const [stats, setStats] = useState<ClientStats>({
    total: 0,
    active: 0,
    inactive: 0,
    potential: 0,
    companies: 0,
    individuals: 0,
  })
  const [loading, setLoading] = useState(true)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [cityFilter, setCityFilter] = useState("all")
  const [industryFilter, setIndustryFilter] = useState("all")

  const [formData, setFormData] = useState({
    name: "",
    type: "individual",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
    country: "Россия",
    website: "",
    contactPerson: "",
    position: "",
    companyName: "",
    companySize: "",
    industry: "",
    source: "Сайт",
    status: "potential",
    notes: "",
    tags: "",
  })

  useEffect(() => {
    fetchClients()
  }, [typeFilter, statusFilter, cityFilter, industryFilter])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (typeFilter !== "all") params.append("type", typeFilter)
      if (statusFilter !== "all") params.append("status", statusFilter)
      if (cityFilter !== "all") params.append("city", cityFilter)
      if (industryFilter !== "all") params.append("industry", industryFilter)

      const response = await fetch(`/api/clients?${params}`)
      const result = await response.json()

      if (result.success) {
        setClients(result.data)
        setStats(result.stats)
      }
    } catch (error) {
      console.error("Ошибка загрузки клиентов:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateClient = async () => {
    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsCreateDialogOpen(false)
        resetForm()
        fetchClients()
      }
    } catch (error) {
      console.error("Ошибка создания клиента:", error)
    }
  }

  const handleUpdateClient = async () => {
    if (!selectedClient) return

    try {
      const response = await fetch("/api/clients", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...selectedClient,
          ...formData,
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsEditDialogOpen(false)
        setSelectedClient(null)
        resetForm()
        fetchClients()
      }
    } catch (error) {
      console.error("Ошибка обновления клиента:", error)
    }
  }

  const handleDeleteClient = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этого клиента?")) return

    try {
      const response = await fetch(`/api/clients?id=${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        fetchClients()
      }
    } catch (error) {
      console.error("Ошибка удаления клиента:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      type: "individual",
      email: "",
      phone: "",
      address: "",
      city: "",
      region: "",
      postalCode: "",
      country: "Россия",
      website: "",
      contactPerson: "",
      position: "",
      companyName: "",
      companySize: "",
      industry: "",
      source: "Сайт",
      status: "potential",
      notes: "",
      tags: "",
    })
  }

  const openEditDialog = (client: Client) => {
    setSelectedClient(client)
    setFormData({
      name: client.name,
      type: client.type,
      email: client.email,
      phone: client.phone,
      address: client.address || "",
      city: client.city || "",
      region: client.region || "",
      postalCode: client.postalCode || "",
      country: client.country || "Россия",
      website: client.website || "",
      contactPerson: client.contactPerson || "",
      position: client.position || "",
      companyName: client.companyName || "",
      companySize: client.companySize || "",
      industry: client.industry || "",
      source: client.source,
      status: client.status,
      notes: client.notes || "",
      tags: client.tags.join(", "),
    })
    setIsEditDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "inactive":
        return "bg-red-600"
      case "potential":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  const getTypeIcon = (type: string) => {
    return type === "company" ? <Building className="w-4 h-4" /> : <User className="w-4 h-4" />
  }

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.companyName?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/admin" className="text-blue-400 hover:text-blue-300">
            <ArrowLeft className="w-6 h-6" />
          </a>
          <div>
            <h1 className="text-3xl font-bold text-white">👥 База клиентов</h1>
            <p className="text-gray-400">Управление клиентской базой и контактами</p>
          </div>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Добавить клиента
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Создать нового клиента</DialogTitle>
              <DialogDescription>Добавьте информацию о новом клиенте</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Тип клиента *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Физическое лицо</SelectItem>
                    <SelectItem value="company">Компания</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Название/Имя *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                  placeholder={formData.type === "company" ? "Название компании" : "ФИО"}
                />
              </div>
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label>Телефон *</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label>Контактное лицо</Label>
                <Input
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label>Должность</Label>
                <Input
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label>Город</Label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label>Регион</Label>
                <Input
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label>Адрес</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label>Почтовый индекс</Label>
                <Input
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              {formData.type === "company" && (
                <>
                  <div>
                    <Label>Сайт</Label>
                    <Input
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <Label>Отрасль</Label>
                    <Input
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div>
                    <Label>Размер компании</Label>
                    <Select
                      value={formData.companySize}
                      onValueChange={(value) => setFormData({ ...formData, companySize: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Выберите размер" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 сотрудников</SelectItem>
                        <SelectItem value="11-50">11-50 сотрудников</SelectItem>
                        <SelectItem value="51-100">51-100 сотрудников</SelectItem>
                        <SelectItem value="101-250">101-250 сотрудников</SelectItem>
                        <SelectItem value="250+">250+ сотрудников</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              <div>
                <Label>Источник</Label>
                <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Сайт">Сайт</SelectItem>
                    <SelectItem value="Google Ads">Google Ads</SelectItem>
                    <SelectItem value="Яндекс">Яндекс</SelectItem>
                    <SelectItem value="Социальные сети">Социальные сети</SelectItem>
                    <SelectItem value="Рекомендация">Рекомендация</SelectItem>
                    <SelectItem value="Выставка">Выставка</SelectItem>
                    <SelectItem value="Холодный звонок">Холодный звонок</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Статус</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="potential">Потенциальный</SelectItem>
                    <SelectItem value="active">Активный</SelectItem>
                    <SelectItem value="inactive">Неактивный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Теги (через запятую)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                  placeholder="vip, строительство, москва"
                />
              </div>
              <div className="col-span-2">
                <Label>Заметки</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleCreateClient} className="bg-green-600 hover:bg-green-700">
                Создать клиента
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-blue-900/20 border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-400" />
              <div>
                <p className="text-blue-100 text-sm">Всего</p>
                <p className="text-xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-900/20 border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-green-100 text-sm">Активные</p>
                <p className="text-xl font-bold text-white">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-900/20 border-yellow-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-yellow-400" />
              <div>
                <p className="text-yellow-100 text-sm">Потенциальные</p>
                <p className="text-xl font-bold text-white">{stats.potential}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-900/20 border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-red-400" />
              <div>
                <p className="text-red-100 text-sm">Неактивные</p>
                <p className="text-xl font-bold text-white">{stats.inactive}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-900/20 border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building className="w-6 h-6 text-purple-400" />
              <div>
                <p className="text-purple-100 text-sm">Компании</p>
                <p className="text-xl font-bold text-white">{stats.companies}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-indigo-900/20 border-indigo-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-indigo-400" />
              <div>
                <p className="text-indigo-100 text-sm">Физ. лица</p>
                <p className="text-xl font-bold text-white">{stats.individuals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Фильтры и поиск */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Поиск по имени, email, телефону, городу..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600"
                />
              </div>
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48 bg-gray-700 border-gray-600">
                <SelectValue placeholder="Тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="company">Компании</SelectItem>
                <SelectItem value="individual">Физ. лица</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-gray-700 border-gray-600">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="potential">Потенциальные</SelectItem>
                <SelectItem value="inactive">Неактивные</SelectItem>
              </SelectContent>
            </Select>

            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="w-48 bg-gray-700 border-gray-600">
                <SelectValue placeholder="Город" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все города</SelectItem>
                <SelectItem value="Москва">Москва</SelectItem>
                <SelectItem value="Санкт-Петербург">Санкт-Петербург</SelectItem>
                <SelectItem value="Новосибирск">Новосибирск</SelectItem>
                <SelectItem value="Екатеринбург">Екатеринбург</SelectItem>
                <SelectItem value="Краснодар">Краснодар</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Список клиентов */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Список клиентов ({filteredClients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-700 h-24 rounded-lg"></div>
              ))}
            </div>
          ) : filteredClients.length > 0 ? (
            <div className="space-y-4">
              {filteredClients.map((client) => (
                <div key={client.id} className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {getTypeIcon(client.type)}
                        <h3 className="text-lg font-semibold text-white">{client.name}</h3>
                        <Badge className={getStatusColor(client.status)}>
                          {client.status === "active"
                            ? "Активный"
                            : client.status === "potential"
                              ? "Потенциальный"
                              : "Неактивный"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {client.type === "company" ? "Компания" : "Физ. лицо"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{client.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{client.phone}</span>
                        </div>
                        {client.city && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{client.city}</span>
                          </div>
                        )}
                        {client.website && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <Globe className="w-4 h-4" />
                            <a
                              href={client.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-400 hover:text-blue-300"
                            >
                              Сайт
                            </a>
                          </div>
                        )}
                      </div>

                      {client.contactPerson && (
                        <div className="mb-3">
                          <p className="text-gray-300 text-sm">
                            <span className="font-medium">Контакт:</span> {client.contactPerson}
                            {client.position && ` (${client.position})`}
                          </p>
                        </div>
                      )}

                      {client.notes && <p className="text-gray-400 text-sm mb-3">{client.notes}</p>}

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Создан: {new Date(client.createdAt).toLocaleDateString("ru-RU")}</span>
                        </div>
                        <span>Источник: {client.source}</span>
                        {client.industry && <span>Отрасль: {client.industry}</span>}
                      </div>

                      {client.tags.length > 0 && (
                        <div className="flex gap-2 mt-3">
                          {client.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(client)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClient(client.id)}
                        className="border-red-600 text-red-400 hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Клиенты не найдены</h3>
              <p className="text-gray-400">Попробуйте изменить фильтры или создать нового клиента</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Диалог редактирования */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать клиента</DialogTitle>
            <DialogDescription>Обновите информацию о клиенте</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Тип клиента *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Физическое лицо</SelectItem>
                  <SelectItem value="company">Компания</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Название/Имя *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label>Телефон *</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label>Контактное лицо</Label>
              <Input
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label>Должность</Label>
              <Input
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label>Город</Label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label>Регион</Label>
              <Input
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label>Адрес</Label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label>Почтовый индекс</Label>
              <Input
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            {formData.type === "company" && (
              <>
                <div>
                  <Label>Сайт</Label>
                  <Input
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <Label>Отрасль</Label>
                  <Input
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <Label>Размер компании</Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) => setFormData({ ...formData, companySize: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 сотрудников</SelectItem>
                      <SelectItem value="11-50">11-50 сотрудников</SelectItem>
                      <SelectItem value="51-100">51-100 сотрудников</SelectItem>
                      <SelectItem value="101-250">101-250 сотрудников</SelectItem>
                      <SelectItem value="250+">250+ сотрудников</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            <div>
              <Label>Источник</Label>
              <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Сайт">Сайт</SelectItem>
                  <SelectItem value="Google Ads">Google Ads</SelectItem>
                  <SelectItem value="Яндекс">Яндекс</SelectItem>
                  <SelectItem value="Социальные сети">Социальные сети</SelectItem>
                  <SelectItem value="Рекомендация">Рекомендация</SelectItem>
                  <SelectItem value="Выставка">Выставка</SelectItem>
                  <SelectItem value="Холодный звонок">Холодный звонок</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Статус</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="potential">Потенциальный</SelectItem>
                  <SelectItem value="active">Активный</SelectItem>
                  <SelectItem value="inactive">Неактивный</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Теги (через запятую)</Label>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div className="col-span-2">
              <Label>Заметки</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="bg-gray-800 border-gray-700"
                rows={3}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleUpdateClient} className="bg-blue-600 hover:bg-blue-700">
              Сохранить изменения
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
