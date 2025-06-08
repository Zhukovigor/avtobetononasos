"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Building, Globe, MapPin, Users, Briefcase, Phone, Mail, Calendar } from "lucide-react"

interface Company {
  id: string
  name: string
  email: string
  phone: string
  website?: string
  city?: string
  region?: string
  industry?: string
  companySize?: string
  contactPerson?: string
  position?: string
  status: "active" | "inactive" | "potential"
  createdAt: string
  tags: string[]
}

export default function CompaniesManagementContent() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [sizeFilter, setSizeFilter] = useState("all")

  useEffect(() => {
    fetchCompanies()
  }, [statusFilter, industryFilter, sizeFilter])

  const fetchCompanies = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      params.append("type", "company")
      if (statusFilter !== "all") params.append("status", statusFilter)
      if (industryFilter !== "all") params.append("industry", industryFilter)

      const response = await fetch(`/api/clients?${params}`)
      const result = await response.json()

      if (result.success) {
        setCompanies(result.data)
      }
    } catch (error) {
      console.error("Ошибка загрузки компаний:", error)
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

  const getSizeIcon = (size?: string) => {
    if (!size) return <Users className="w-4 h-4" />
    const num = Number.parseInt(size.split("-")[0] || "0")
    if (num >= 250) return <Building className="w-4 h-4 text-purple-400" />
    if (num >= 100) return <Building className="w-4 h-4 text-blue-400" />
    if (num >= 50) return <Building className="w-4 h-4 text-green-400" />
    return <Building className="w-4 h-4 text-yellow-400" />
  }

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry?.toLowerCase().includes(searchTerm.toLowerCase()),
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
            <h1 className="text-3xl font-bold text-white">🏢 Корпоративные клиенты</h1>
            <p className="text-gray-400">Управление компаниями и корпоративными клиентами</p>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-blue-900/20 border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Building className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-blue-100 text-sm">Всего компаний</p>
                <p className="text-2xl font-bold text-white">{companies.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-900/20 border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Building className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-green-100 text-sm">Активные</p>
                <p className="text-2xl font-bold text-white">{companies.filter((c) => c.status === "active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-900/20 border-yellow-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Building className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-yellow-100 text-sm">Потенциальные</p>
                <p className="text-2xl font-bold text-white">
                  {companies.filter((c) => c.status === "potential").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-900/20 border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-purple-100 text-sm">Крупные (250+)</p>
                <p className="text-2xl font-bold text-white">
                  {companies.filter((c) => c.companySize === "250+").length}
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
                  placeholder="Поиск по названию, email, городу, отрасли..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600"
                />
              </div>
            </div>

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

            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-48 bg-gray-700 border-gray-600">
                <SelectValue placeholder="Отрасль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все отрасли</SelectItem>
                <SelectItem value="Строительство">Строительство</SelectItem>
                <SelectItem value="Производство бетона">Производство бетона</SelectItem>
                <SelectItem value="Ремонт и строительство">Ремонт и строительство</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sizeFilter} onValueChange={setSizeFilter}>
              <SelectTrigger className="w-48 bg-gray-700 border-gray-600">
                <SelectValue placeholder="Размер" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все размеры</SelectItem>
                <SelectItem value="1-10">1-10 сотрудников</SelectItem>
                <SelectItem value="11-50">11-50 сотрудников</SelectItem>
                <SelectItem value="51-100">51-100 сотрудников</SelectItem>
                <SelectItem value="101-250">101-250 сотрудников</SelectItem>
                <SelectItem value="250+">250+ сотрудников</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Список компаний */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Корпоративные клиенты ({filteredCompanies.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-700 h-32 rounded-lg"></div>
              ))}
            </div>
          ) : filteredCompanies.length > 0 ? (
            <div className="space-y-4">
              {filteredCompanies.map((company) => (
                <div key={company.id} className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Building className="w-6 h-6 text-blue-400" />
                        <h3 className="text-xl font-semibold text-white">{company.name}</h3>
                        <Badge className={getStatusColor(company.status)}>
                          {company.status === "active"
                            ? "Активная"
                            : company.status === "potential"
                              ? "Потенциальная"
                              : "Неактивная"}
                        </Badge>
                        {company.companySize && (
                          <Badge variant="outline" className="text-xs">
                            {getSizeIcon(company.companySize)}
                            <span className="ml-1">{company.companySize}</span>
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{company.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{company.phone}</span>
                        </div>
                        {company.city && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{company.city}</span>
                          </div>
                        )}
                        {company.website && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <Globe className="w-4 h-4" />
                            <a
                              href={company.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-400 hover:text-blue-300"
                            >
                              Сайт
                            </a>
                          </div>
                        )}
                      </div>

                      {company.contactPerson && (
                        <div className="mb-3">
                          <p className="text-gray-300 text-sm">
                            <span className="font-medium">Контактное лицо:</span> {company.contactPerson}
                            {company.position && ` (${company.position})`}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-6 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Создана: {new Date(company.createdAt).toLocaleDateString("ru-RU")}</span>
                        </div>
                        {company.industry && (
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-3 h-3" />
                            <span>Отрасль: {company.industry}</span>
                          </div>
                        )}
                      </div>

                      {company.tags.length > 0 && (
                        <div className="flex gap-2">
                          {company.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-600">
                        Подробнее
                      </Button>
                      <Button variant="outline" size="sm" className="border-blue-600 text-blue-400 hover:bg-blue-600">
                        Связаться
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Building className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Компании не найдены</h3>
              <p className="text-gray-400">Попробуйте изменить фильтры поиска</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
