import { type NextRequest, NextResponse } from "next/server"

interface User {
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

// Моковые данные пользователей
const usersData: User[] = [
  {
    id: "1",
    name: "Игорь Жуков",
    email: "zhukovigor@mail.ru",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-08T16:30:00Z",
    createdAt: "2023-12-01T10:00:00Z",
    permissions: ["all"],
    department: "IT",
    phone: "+7 (495) 123-45-67",
  },
  {
    id: "2",
    name: "Сергей Петров",
    email: "sergey@company.ru",
    role: "manager",
    status: "active",
    lastLogin: "2024-01-08T14:15:00Z",
    createdAt: "2023-12-15T09:30:00Z",
    permissions: ["leads", "analytics", "models"],
    department: "Продажи",
    phone: "+7 (495) 987-65-43",
  },
  {
    id: "3",
    name: "Мария Иванова",
    email: "maria@company.ru",
    role: "editor",
    status: "active",
    lastLogin: "2024-01-07T18:45:00Z",
    createdAt: "2024-01-02T11:20:00Z",
    permissions: ["content", "articles", "seo"],
    department: "Маркетинг",
    phone: "+7 (812) 555-12-34",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")
    const status = searchParams.get("status")
    const department = searchParams.get("department")
    const id = searchParams.get("id")

    if (id) {
      const user = usersData.find((user) => user.id === id)
      if (!user) {
        return NextResponse.json({ success: false, error: "Пользователь не найден" }, { status: 404 })
      }
      return NextResponse.json({ success: true, data: user })
    }

    let filteredUsers = usersData

    if (role && role !== "all") {
      filteredUsers = filteredUsers.filter((user) => user.role === role)
    }

    if (status && status !== "all") {
      filteredUsers = filteredUsers.filter((user) => user.status === status)
    }

    if (department && department !== "all") {
      filteredUsers = filteredUsers.filter((user) => user.department === department)
    }

    return NextResponse.json({
      success: true,
      data: filteredUsers,
      total: filteredUsers.length,
      stats: {
        active: usersData.filter((u) => u.status === "active").length,
        inactive: usersData.filter((u) => u.status === "inactive").length,
        suspended: usersData.filter((u) => u.status === "suspended").length,
        byRole: {
          admin: usersData.filter((u) => u.role === "admin").length,
          manager: usersData.filter((u) => u.role === "manager").length,
          editor: usersData.filter((u) => u.role === "editor").length,
          viewer: usersData.filter((u) => u.role === "viewer").length,
        },
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Ошибка получения пользователей" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role || "viewer",
      status: "active",
      createdAt: new Date().toISOString(),
      permissions: userData.permissions || [],
      department: userData.department,
      phone: userData.phone,
    }

    usersData.push(newUser)

    return NextResponse.json({
      success: true,
      data: newUser,
      message: "Пользователь успешно создан",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Ошибка создания пользователя" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userData = await request.json()
    const userIndex = usersData.findIndex((user) => user.id === userData.id)

    if (userIndex === -1) {
      return NextResponse.json({ success: false, error: "Пользователь не найден" }, { status: 404 })
    }

    usersData[userIndex] = {
      ...usersData[userIndex],
      ...userData,
    }

    return NextResponse.json({
      success: true,
      data: usersData[userIndex],
      message: "Пользователь успешно обновлен",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Ошибка обновления пользователя" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "ID пользователя не указан" }, { status: 400 })
    }

    const userIndex = usersData.findIndex((user) => user.id === id)

    if (userIndex === -1) {
      return NextResponse.json({ success: false, error: "Пользователь не найден" }, { status: 404 })
    }

    usersData.splice(userIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Пользователь успешно удален",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Ошибка удаления пользователя" }, { status: 500 })
  }
}
