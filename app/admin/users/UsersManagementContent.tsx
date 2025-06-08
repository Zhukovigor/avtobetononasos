"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Building,
  Calendar,
  Shield,
  Users,
  Crown,
  Eye,
  Settings,
} from "lucide-react"

interface UserManagementUser {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "editor" | "viewer"
  status: "active" | "inactive" | "suspended"
  avatar?: string
  lastLogin?: string
  createdAt: string
  permissions: string[]
  department?: string
  phone?: string
}

interface UserStats {
  active: number
  inactive: number
  suspended: number
  byRole: {
    admin: number
    manager: number
    editor: number
    viewer: number
  }
}

export default function UsersManagementContent() {
  const [users, setUsers] = useState<UserManagementUser[]>([])
  const [stats, setStats] = useState<UserStats>({
    active: 0,
    inactive: 0,
    suspended: 0,
    byRole: { admin: 0, manager: 0, editor: 0, viewer: 0 },
  })
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<UserManagementUser | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "viewer",
    department: "",
    phone: "",
    permissions: [] as string[],
  })

  useEffect(() => {
    fetchUsers()
  }, [roleFilter, statusFilter, departmentFilter])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (roleFilter !== "all") params.append("role", roleFilter)
      if (statusFilter !== "all") params.append("status", statusFilter)
      if (departmentFilter !== "all") params.append("department", departmentFilter)

      const response = await fetch(`/api/users?${params}`)
      const result = await response.json()

      if (result.success) {
        setUsers(result.data)
        setStats(result.stats)
      }
    } catch (error) {
      console.error("Ошибка загрузки пользователей:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setIsCreateDialogOpen(false)
        resetForm()
        fetchUsers()
      }
    } catch (error) {
      console.error("Ошибка создания пользователя:", error)
    }
  }

  const handleUpdateUser = async () => {
    if (!selectedUser) return

    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...selectedUser,
          ...formData,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsEditDialogOpen(false)
        setSelectedUser(null)
        resetForm()
        fetchUsers()
      }
    } catch (error) {
      console.error("Ошибка обновления пользователя:", error)
    }
  }

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этого пользователя?")) return

    try {
      const response = await fetch(`/api/users?id=${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        fetchUsers()
      }
    } catch (error) {
      console.error("Ошибка удаления пользователя:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "viewer",
      department: "",
      phone: "",
      permissions: [],
    })
  }

  const openEditDialog = (user: UserManagementUser) => {
    setSelectedUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department || "",
      phone: user.phone || "",
      permissions: user.permissions,
    })
    setIsEditDialogOpen(true)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-600"
      case "manager":
        return "bg-blue-600"
      case "editor":
        return "bg-green-600"
      case "viewer":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "inactive":
        return "bg-gray-600"
      case "suspended":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="w-4 h-4" />
      case "manager":
        return <Users className="w-4 h-4" />
      case "editor":
        return <Edit className="w-4 h-4" />
      case "viewer":
        return <Eye className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department?.toLowerCase().includes(searchTerm.toLowerCase()),
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
            <h1 className="text-3xl font-bold text-white">👥 Управление пользователями</h1>
            <p className="text-gray-400">Управление доступом и правами пользователей системы</p>
          </div>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Добавить пользователя
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Создать пользователя</DialogTitle>
              <DialogDescription>Добавьте нового пользователя в систему</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Имя *</Label>
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
                <Label>Роль</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Просмотр</SelectItem>
                    <SelectItem value="editor">Редактор</SelectItem>
                    <SelectItem value="manager">Менеджер</SelectItem>
                    <SelectItem value="admin">Администратор</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Отдел</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Выберите отдел" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Продажи">Продажи</SelectItem>
                    <SelectItem value="Маркетинг">Маркетинг</SelectItem>
                    <SelectItem value="Поддержка">Поддержка</SelectItem>
                    <SelectItem value="Управление">Управление</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label>Телефон</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                  placeholder="+7 (xxx) xxx-xx-xx"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleCreateUser} className="bg-green-600 hover:bg-green-700">
                Создать пользователя
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-green-900/20 border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Shield className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-green-100 text-sm">Активные</p>
                <p className="text-2xl font-bold text-white">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-900/20 border-red-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Crown className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-red-100 text-sm">Администраторы</p>
                <p className="text-2xl font-bold text-white">{stats.byRole.admin}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-900/20 border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-blue-100 text-sm">Менеджеры</p>
                <p className="text-2xl font-bold text-white">{stats.byRole.manager}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-900/20 border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Edit className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-purple-100 text-sm">Редакторы</p>
                <p className="text-2xl font-bold text-white">{stats.byRole.editor}</p>
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
                  placeholder="Поиск по имени, email или отделу..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600"
                />
              </div>
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48 bg-gray-700 border-gray-600">
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все роли</SelectItem>
                <SelectItem value="admin">Администратор</SelectItem>
                <SelectItem value="manager">Менеджер</SelectItem>
                <SelectItem value="editor">Редактор</SelectItem>
                <SelectItem value="viewer">Просмотр</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-gray-700 border-gray-600">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="inactive">Неактивные</SelectItem>
                <SelectItem value="suspended">Заблокированные</SelectItem>
              </SelectContent>
            </Select>

            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48 bg-gray-700 border-gray-600">
                <SelectValue placeholder="Отдел" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все отделы</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Продажи">Продажи</SelectItem>
                <SelectItem value="Маркетинг">Маркетинг</SelectItem>
                <SelectItem value="Поддержка">Поддержка</SelectItem>
                <SelectItem value="Управление">Управление</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Список пользователей */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Пользователи ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-700 h-20 rounded-lg"></div>
              ))}
            </div>
          ) : filteredUsers.length > 0 ? (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                        </div>
                        <Badge className={getRoleColor(user.role)}>
                          {getRoleIcon(user.role)}
                          <span className="ml-1">
                            {user.role === "admin"
                              ? "Администратор"
                              : user.role === "manager"
                                ? "Менеджер"
                                : user.role === "editor"
                                  ? "Редактор"
                                  : "Просмотр"}
                          </span>
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status === "active"
                            ? "Активен"
                            : user.status === "inactive"
                              ? "Неактивен"
                              : "Заблокирован"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                        {user.phone && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <Phone className="w-4 h-4" />
                            <span className="text-sm">{user.phone}</span>
                          </div>
                        )}
                        {user.department && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <Building className="w-4 h-4" />
                            <span className="text-sm">{user.department}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-gray-300">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            Создан: {new Date(user.createdAt).toLocaleDateString("ru-RU")}
                          </span>
                        </div>
                        {user.lastLogin && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <Settings className="w-4 h-4" />
                            <span className="text-sm">
                              Вход: {new Date(user.lastLogin).toLocaleDateString("ru-RU")}
                            </span>
                          </div>
                        )}
                      </div>

                      {user.permissions.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {user.permissions.slice(0, 3).map((permission, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                          {user.permissions.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{user.permissions.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(user)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="border-red-600 text-red-400 hover:bg-red-600"
                        disabled={user.role === "admin"}
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
              <h3 className="text-xl font-semibold text-white mb-2">Пользователи не найдены</h3>
              <p className="text-gray-400">Попробуйте изменить фильтры или создать нового пользователя</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Диалог редактирования */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Редактировать пользователя</DialogTitle>
            <DialogDescription>Обновите информацию о пользователе</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Имя *</Label>
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
              <Label>Роль</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Просмотр</SelectItem>
                  <SelectItem value="editor">Редактор</SelectItem>
                  <SelectItem value="manager">Менеджер</SelectItem>
                  <SelectItem value="admin">Администратор</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Отдел</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Выберите отдел" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Продажи">Продажи</SelectItem>
                  <SelectItem value="Маркетинг">Маркетинг</SelectItem>
                  <SelectItem value="Поддержка">Поддержка</SelectItem>
                  <SelectItem value="Управление">Управление</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label>Телефон</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-gray-800 border-gray-700"
                placeholder="+7 (xxx) xxx-xx-xx"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleUpdateUser} className="bg-blue-600 hover:bg-blue-700">
              Сохранить изменения
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
