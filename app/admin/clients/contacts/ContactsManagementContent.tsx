"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, User, Phone, Mail, MapPin, Building, Calendar, Briefcase, Users } from "lucide-react"

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  position?: string
  company?: string
  city?: string
  region?: string
  type: "individual" | "company"
  status: "active" | "inactive" | "potential"
  createdAt: string
  lastContact?: string
  tags: string[]
}

export default function ContactsManagementContent() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [cityFilter, setCityFilter] = useState("all")

  useEffect(() => {
    fetchContacts()
  }, [typeFilter, statusFilter, cityFilter])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (typeFilter !== "all") params.append("type", typeFilter)
      if (statusFilter !== "all") params.append("status", statusFilter)
      if (cityFilter !== "all") params.append("city", cityFilter)

      const response = await fetch(`/api/clients?${params}`)
      const result = await response.json()

      if (result.success) {
        // Преобразуем данные клиентов в контакты
        const contactsData = result.data.map((client: any) => ({
          id: client.id,
          name: client.contactPerson || client.name,
          email: client.email,
          phone: client.phone,
          position: client.position,
          company: client.type === "company" ? client.name : client.companyName,
          city: client.city,
          region: client.region,
          type: client.type,
          status: client.status,
          createdAt: client.createdAt,
          lastContact: client.lastContact,
          tags: client.tags,
        }))
        setContacts(contactsData)
      }
    } catch (error) {
      console.error("Ошибка загрузки контактов:", error)
    } finally {
      setLoading(false)
    }
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

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.city?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/admin/clients" className="text-blue-400 hover:text-blue-300">
            <ArrowLeft className="w-6 h-6" />
          </a>
          <div>
            <h1 className="text-3xl font-bold text-white">📞 Контактная информация</h1>
            <p className="text-gray-400">Управление контактами и связями с клиентами</p>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-blue-900/20 border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-blue-100 text-sm">Всего контактов</p>
                <p className="text-2xl font-bold text-white">{contacts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-900/20 border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <User className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-green-100 text-sm">Активные</p>
                <p className="text-2xl font-bold text-white">{contacts.filter((c) => c.status === "active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-900/20 border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Building className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-purple-100 text-sm">Корпоративные</p>
                <p className="text-2xl font-bold text-white">{contacts.filter((c) => c.type === "company").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-900/20 border-yellow-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <User className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-yellow-100 text-sm">Физ. лица</p>
                <p className="text-2xl font-bold text-white">
                  {contacts.filter((c) => c.type === "individual").length}
                </p>
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
                  placeholder="Поиск по имени, email, телефону, компании..."
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
                <SelectItem value="company">Корпоративные</SelectItem>
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

      {/* Список контактов */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Контакты ({filteredContacts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-700 h-24 rounded-lg"></div>
              ))}
            </div>
          ) : filteredContacts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContacts.map((contact) => (
                <Card key={contact.id} className="bg-gray-700 border-gray-600 hover:bg-gray-600 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(contact.type)}
                        <h3 className="font-semibold text-white text-sm">{contact.name}</h3>
                      </div>
                      <Badge className={getStatusColor(contact.status)} size="sm">
                        {contact.status === "active"
                          ? "Активный"
                          : contact.status === "potential"
                            ? "Потенциальный"
                            : "Неактивный"}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="w-3 h-3" />
                        <span className="text-xs truncate">{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone className="w-3 h-3" />
                        <span className="text-xs">{contact.phone}</span>
                      </div>
                      {contact.company && (
                        <div className="flex items-center gap-2 text-gray-300">
                          <Building className="w-3 h-3" />
                          <span className="text-xs truncate">{contact.company}</span>
                        </div>
                      )}
                      {contact.position && (
                        <div className="flex items-center gap-2 text-gray-300">
                          <Briefcase className="w-3 h-3" />
                          <span className="text-xs truncate">{contact.position}</span>
                        </div>
                      )}
                      {contact.city && (
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs">{contact.city}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(contact.createdAt).toLocaleDateString("ru-RU")}</span>
                      </div>
                      {contact.lastContact && (
                        <span>Контакт: {new Date(contact.lastContact).toLocaleDateString("ru-RU")}</span>
                      )}
                    </div>

                    {contact.tags.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {contact.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {contact.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{contact.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1 text-xs">
                        Связаться
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-xs">
                        Подробнее
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Контакты не найдены</h3>
              <p className="text-gray-400">Попробуйте изменить фильтры поиска</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
