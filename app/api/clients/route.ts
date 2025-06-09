import { type NextRequest, NextResponse } from "next/server"

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

// Моковые данные клиентов
const clientsData: Client[] = [
  {
    id: "1",
    name: "ООО СтройКомплекс",
    type: "company",
    email: "info@stroykomplex.ru",
    phone: "+7 (495) 123-45-67",
    address: "ул. Строителей, 15",
    city: "Москва",
    region: "Московская область",
    postalCode: "123456",
    country: "Россия",
    website: "https://stroykomplex.ru",
    contactPerson: "Иванов Иван Иванович",
    position: "Генеральный директор",
    companyName: "ООО СтройКомплекс",
    companySize: "50-100",
    industry: "Строительство",
    source: "Выставка",
    status: "active",
    createdAt: "2023-05-10T10:30:00Z",
    updatedAt: "2024-01-15T14:20:00Z",
    lastContact: "2024-01-15T14:20:00Z",
    notes: "Крупный клиент, заинтересован в долгосрочном сотрудничестве",
    tags: ["vip", "строительство", "москва"],
  },
  {
    id: "2",
    name: "ЗАО БетонСтрой",
    type: "company",
    email: "zakaz@betonstroy.ru",
    phone: "+7 (812) 987-65-43",
    address: "пр. Невский, 78",
    city: "Санкт-Петербург",
    region: "Ленинградская область",
    postalCode: "198765",
    country: "Россия",
    website: "https://betonstroy.ru",
    contactPerson: "Петров Петр Петрович",
    position: "Коммерческий директор",
    companyName: "ЗАО БетонСтрой",
    companySize: "100-250",
    industry: "Производство бетона",
    source: "Рекомендация",
    status: "active",
    createdAt: "2023-06-22T09:15:00Z",
    updatedAt: "2024-01-10T11:45:00Z",
    lastContact: "2024-01-10T11:45:00Z",
    notes: "Регулярные заказы, предпочитает работать с SANY",
    tags: ["постоянный", "спб"],
  },
  {
    id: "3",
    name: "Сидоров Алексей Владимирович",
    type: "individual",
    email: "sidorov@mail.ru",
    phone: "+7 (903) 555-12-34",
    address: "ул. Ленина, 42, кв. 56",
    city: "Новосибирск",
    region: "Новосибирская область",
    postalCode: "630000",
    country: "Россия",
    contactPerson: "Сидоров Алексей Владимирович",
    position: "Индивидуальный предприниматель",
    source: "Сайт",
    status: "potential",
    createdAt: "2023-08-15T16:45:00Z",
    updatedAt: "2023-12-20T10:30:00Z",
    lastContact: "2023-12-20T10:30:00Z",
    notes: "Рассматривает покупку автобетононасоса для малого бизнеса",
    tags: ["ип", "новосибирск"],
  },
  {
    id: "4",
    name: "ГК МегаСтрой",
    type: "company",
    email: "contracts@megastroy.ru",
    phone: "+7 (343) 777-88-99",
    address: "ул. Промышленная, 123",
    city: "Екатеринбург",
    region: "Свердловская область",
    postalCode: "620000",
    country: "Россия",
    website: "https://megastroy.ru",
    contactPerson: "Козлов Дмитрий Сергеевич",
    position: "Технический директор",
    companyName: "ГК МегаСтрой",
    companySize: "250+",
    industry: "Строительство",
    source: "Google Ads",
    status: "active",
    createdAt: "2023-03-12T08:20:00Z",
    updatedAt: "2024-01-08T15:10:00Z",
    lastContact: "2024-01-08T15:10:00Z",
    notes: "Крупная строительная группа, работают по всему Уралу",
    tags: ["крупный", "урал", "строительство"],
  },
  {
    id: "5",
    name: "ООО РемСтройСервис",
    type: "company",
    email: "info@remstroy.ru",
    phone: "+7 (861) 444-55-66",
    address: "ул. Красная, 89",
    city: "Краснодар",
    region: "Краснодарский край",
    postalCode: "350000",
    country: "Россия",
    contactPerson: "Морозова Елена Александровна",
    position: "Руководитель отдела закупок",
    companyName: "ООО РемСтройСервис",
    companySize: "20-50",
    industry: "Ремонт и строительство",
    source: "Рекомендация",
    status: "inactive",
    createdAt: "2023-07-30T12:00:00Z",
    updatedAt: "2023-11-15T09:30:00Z",
    lastContact: "2023-11-15T09:30:00Z",
    notes: "Временно приостановили деятельность",
    tags: ["краснодар", "ремонт"],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const status = searchParams.get("status")
    const city = searchParams.get("city")
    const industry = searchParams.get("industry")

    let filteredClients = [...clientsData]

    // Фильтрация по типу
    if (type && type !== "all") {
      filteredClients = filteredClients.filter((client) => client.type === type)
    }

    // Фильтрация по статусу
    if (status && status !== "all") {
      filteredClients = filteredClients.filter((client) => client.status === status)
    }

    // Фильтрация по городу
    if (city && city !== "all") {
      filteredClients = filteredClients.filter((client) => client.city === city)
    }

    // Фильтрация по отрасли
    if (industry && industry !== "all") {
      filteredClients = filteredClients.filter((client) => client.industry === industry)
    }

    // Статистика
    const stats = {
      total: clientsData.length,
      active: clientsData.filter((c) => c.status === "active").length,
      inactive: clientsData.filter((c) => c.status === "inactive").length,
      potential: clientsData.filter((c) => c.status === "potential").length,
      companies: clientsData.filter((c) => c.type === "company").length,
      individuals: clientsData.filter((c) => c.type === "individual").length,
    }

    return NextResponse.json({
      success: true,
      data: filteredClients,
      stats,
    })
  } catch (error) {
    console.error("Ошибка получения клиентов:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Ошибка получения клиентов",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newClient: Client = {
      id: Date.now().toString(),
      name: body.name,
      type: body.type || "individual",
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city,
      region: body.region,
      postalCode: body.postalCode,
      country: body.country || "Россия",
      website: body.website,
      contactPerson: body.contactPerson,
      position: body.position,
      companyName: body.companyName,
      companySize: body.companySize,
      industry: body.industry,
      source: body.source || "Сайт",
      status: body.status || "potential",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
      notes: body.notes,
      tags: body.tags || [],
    }

    // В реальном приложении здесь была бы запись в базу данных
    clientsData.push(newClient)

    return NextResponse.json({
      success: true,
      data: newClient,
    })
  } catch (error) {
    console.error("Ошибка создания клиента:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Ошибка создания клиента",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const clientIndex = clientsData.findIndex((client) => client.id === body.id)

    if (clientIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Клиент не найден",
        },
        { status: 404 },
      )
    }

    const updatedClient = {
      ...clientsData[clientIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    clientsData[clientIndex] = updatedClient

    return NextResponse.json({
      success: true,
      data: updatedClient,
    })
  } catch (error) {
    console.error("Ошибка обновления клиента:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Ошибка обновления клиента",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "ID клиента не указан",
        },
        { status: 400 },
      )
    }

    const clientIndex = clientsData.findIndex((client) => client.id === id)

    if (clientIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Клиент не найден",
        },
        { status: 404 },
      )
    }

    clientsData.splice(clientIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Клиент успешно удален",
    })
  } catch (error) {
    console.error("Ошибка удаления клиента:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Ошибка удаления клиента",
      },
      { status: 500 },
    )
  }
}
