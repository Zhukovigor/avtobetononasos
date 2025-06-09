import { type NextRequest, NextResponse } from "next/server"

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

// Моковые данные страниц
const pagesData: Page[] = [
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
    seoDescription: "Официальный дилер SANY в России. Продажа автобетононасосов, запчасти, сервисное обслуживание.",
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const template = searchParams.get("template")
    const id = searchParams.get("id")

    if (id) {
      const page = pagesData.find((page) => page.id === id)
      if (!page) {
        return NextResponse.json({ success: false, error: "Страница не найдена" }, { status: 404 })
      }
      return NextResponse.json({ success: true, data: page })
    }

    let filteredPages = pagesData

    if (status && status !== "all") {
      filteredPages = filteredPages.filter((page) => page.status === status)
    }

    if (template && template !== "all") {
      filteredPages = filteredPages.filter((page) => page.template === template)
    }

    return NextResponse.json({
      success: true,
      data: filteredPages,
      total: filteredPages.length,
      stats: {
        published: pagesData.filter((p) => p.status === "published").length,
        draft: pagesData.filter((p) => p.status === "draft").length,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Ошибка получения страниц" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const pageData = await request.json()

    const newPage: Page = {
      id: Date.now().toString(),
      title: pageData.title,
      slug: pageData.slug || `/${Date.now()}`,
      content: pageData.content || "",
      status: pageData.status || "draft",
      template: pageData.template || "default",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seoTitle: pageData.seoTitle,
      seoDescription: pageData.seoDescription,
      featuredImage: pageData.featuredImage,
    }

    pagesData.push(newPage)

    return NextResponse.json({
      success: true,
      data: newPage,
      message: "Страница успешно создана",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Ошибка создания страницы" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const pageData = await request.json()
    const pageIndex = pagesData.findIndex((page) => page.id === pageData.id)

    if (pageIndex === -1) {
      return NextResponse.json({ success: false, error: "Страница не найдена" }, { status: 404 })
    }

    pagesData[pageIndex] = {
      ...pagesData[pageIndex],
      ...pageData,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: pagesData[pageIndex],
      message: "Страница успешно обновлена",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Ошибка обновления страницы" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "ID страницы не указан" }, { status: 400 })
    }

    const pageIndex = pagesData.findIndex((page) => page.id === id)

    if (pageIndex === -1) {
      return NextResponse.json({ success: false, error: "Страница не найдена" }, { status: 404 })
    }

    pagesData.splice(pageIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Страница успешно удалена",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Ошибка удаления страницы" }, { status: 500 })
  }
}
