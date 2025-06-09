import { type NextRequest, NextResponse } from "next/server"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company?: string
  source: string
  status: "new" | "in_progress" | "completed" | "rejected"
  priority: "low" | "medium" | "high"
  message: string
  createdAt: string
  updatedAt: string
  assignedTo?: string
  value?: number
  tags: string[]
}

// Моковые данные лидов
const leadsData: Lead[] = [
  {
    id: "1",
    name: "Иван Петров",
    email: "ivan@stroicompany.ru",
    phone: "+7 (495) 123-45-67",
    company: "СтройКомпани ООО",
    source: "Сайт",
    status: "new",
    priority: "high",
    message: "Интересует автобетононасос SANY 530S для строительства жилого комплекса",
    createdAt: "2024-01-08T10:30:00Z",
    updatedAt: "2024-01-08T10:30:00Z",
    value: 15000000,
    tags: ["коммерческий", "крупный_проект"],
  },
  {
    id: "2",
    name: "Мария Сидорова",
    email: "maria@betonmix.ru",
    phone: "+7 (812) 987-65-43",
    company: "БетонМикс",
    source: "Google Ads",
    status: "in_progress",
    priority: "medium",
    message: "Нужна консультация по выбору автобетононасоса для работы в СПб",
    createdAt: "2024-01-07T14:20:00Z",
    updatedAt: "2024-01-08T09:15:00Z",
    assignedTo: "Менеджер 1",
    value: 8500000,
    tags: ["консультация", "спб"],
  },
  {
    id: "3",
    name: "Алексей Козлов",
    email: "alex.kozlov@mail.ru",
    phone: "+7 (903) 555-12-34",
    source: "Яндекс",
    status: "new",
    priority: "medium",
    message: "Интересует аренда автобетононасоса на 2 месяца",
    createdAt: "2024-01-08T16:45:00Z",
    updatedAt: "2024-01-08T16:45:00Z",
    value: 2000000,
    tags: ["аренда", "краткосрочно"],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const priority = searchParams.get("priority")
    const source = searchParams.get("source")

    let filteredLeads = leadsData

    if (status && status !== "all") {
      filteredLeads = filteredLeads.filter((lead) => lead.status === status)
    }

    if (priority && priority !== "all") {
      filteredLeads = filteredLeads.filter((lead) => lead.priority === priority)
    }

    if (source && source !== "all") {
      filteredLeads = filteredLeads.filter((lead) => lead.source === source)
    }

    return NextResponse.json({
      success: true,
      data: filteredLeads,
      total: filteredLeads.length,
      stats: {
        new: leadsData.filter((l) => l.status === "new").length,
        in_progress: leadsData.filter((l) => l.status === "in_progress").length,
        completed: leadsData.filter((l) => l.status === "completed").length,
        rejected: leadsData.filter((l) => l.status === "rejected").length,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Ошибка получения лидов" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const leadData = await request.json()

    const newLead: Lead = {
      id: Date.now().toString(),
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      company: leadData.company,
      source: leadData.source || "Сайт",
      status: "new",
      priority: leadData.priority || "medium",
      message: leadData.message,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      value: leadData.value,
      tags: leadData.tags || [],
    }

    leadsData.push(newLead)

    return NextResponse.json({
      success: true,
      data: newLead,
      message: "Лид успешно создан",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Ошибка создания лида" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const leadData = await request.json()
    const leadIndex = leadsData.findIndex((lead) => lead.id === leadData.id)

    if (leadIndex === -1) {
      return NextResponse.json({ success: false, error: "Лид не найден" }, { status: 404 })
    }

    leadsData[leadIndex] = {
      ...leadsData[leadIndex],
      ...leadData,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: leadsData[leadIndex],
      message: "Лид успешно обновлен",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Ошибка обновления лида" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "ID лида не указан" }, { status: 400 })
    }

    const leadIndex = leadsData.findIndex((lead) => lead.id === id)

    if (leadIndex === -1) {
      return NextResponse.json({ success: false, error: "Лид не найден" }, { status: 404 })
    }

    leadsData.splice(leadIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Лид успешно удален",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Ошибка удаления лида" }, { status: 500 })
  }
}
