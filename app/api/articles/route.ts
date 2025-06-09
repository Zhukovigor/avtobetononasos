import { type NextRequest, NextResponse } from "next/server"

interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  status: "draft" | "published" | "archived"
  author: string
  category: string
  tags: string[]
  seoTitle: string
  seoDescription: string
  featuredImage?: string
  publishedAt?: string
  createdAt: string
  updatedAt: string
  views: number
  readingTime: number
}

// Моковые данные статей
const articlesData: Article[] = [
  {
    id: "1",
    title: "Как выбрать автобетононасос для строительства",
    slug: "kak-vybrat-avtobetononasos",
    content: `# Как выбрать автобетононасос для строительства

Автобетононасос - это специализированная техника, которая значительно упрощает процесс подачи бетонной смеси на строительной площадке...

## Основные критерии выбора

1. **Высота подачи** - один из главных параметров
2. **Производительность** - объем бетона в час
3. **Мобильность** - возможность перемещения по площадке

## Популярные модели SANY

- SANY 530S - для высотного строительства
- SANY 370C-10 - универсальная модель
- SANY 710S - для крупных объектов`,
    excerpt:
      "Подробное руководство по выбору автобетононасоса с учетом всех важных параметров и особенностей строительных работ.",
    status: "published",
    author: "Игорь Жуков",
    category: "Руководства",
    tags: ["автобетононасос", "выбор", "строительство", "SANY"],
    seoTitle: "Как выбрать автобетононасос: полное руководство 2024",
    seoDescription:
      "Экспертное руководство по выбору автобетононасоса. Критерии выбора, сравнение моделей, советы профессионалов.",
    featuredImage: "/images/pump1.jpg",
    publishedAt: "2024-01-05T10:00:00Z",
    createdAt: "2024-01-04T15:30:00Z",
    updatedAt: "2024-01-05T10:00:00Z",
    views: 1247,
    readingTime: 8,
  },
  {
    id: "2",
    title: "Обслуживание автобетононасосов SANY",
    slug: "obsluzhivanie-avtobetononasosov-sany",
    content: `# Обслуживание автобетононасосов SANY

Правильное обслуживание автобетононасоса - залог его долгой и надежной работы...`,
    excerpt: "Инструкция по техническому обслуживанию автобетононасосов SANY для продления срока службы.",
    status: "published",
    author: "Сергей Петров",
    category: "Техническое обслуживание",
    tags: ["обслуживание", "SANY", "техника", "ремонт"],
    seoTitle: "Обслуживание автобетононасосов SANY - инструкция",
    seoDescription:
      "Полная инструкция по техническому обслуживанию автобетононасосов SANY. Регламент, советы, рекомендации.",
    publishedAt: "2024-01-03T14:00:00Z",
    createdAt: "2024-01-02T09:15:00Z",
    updatedAt: "2024-01-03T14:00:00Z",
    views: 892,
    readingTime: 12,
  },
  {
    id: "3",
    title: "Аренда автобетононасоса: что нужно знать",
    slug: "arenda-avtobetononasosa",
    content: `# Аренда автобетононасоса: что нужно знать

Аренда автобетононасоса может быть выгодной альтернативой покупке...`,
    excerpt: "Все о аренде автобетононасосов: условия, цены, документы и рекомендации.",
    status: "draft",
    author: "Мария Иванова",
    category: "Аренда",
    tags: ["аренда", "автобетононасос", "условия"],
    seoTitle: "Аренда автобетононасоса - условия и цены",
    seoDescription: "Аренда автобетононасоса: условия, документы, цены. Как выбрать подрядчика и избежать проблем.",
    createdAt: "2024-01-08T11:20:00Z",
    updatedAt: "2024-01-08T16:45:00Z",
    views: 0,
    readingTime: 6,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const category = searchParams.get("category")
    const author = searchParams.get("author")
    const id = searchParams.get("id")

    if (id) {
      const article = articlesData.find((article) => article.id === id)
      if (!article) {
        return NextResponse.json({ success: false, error: "Статья не найдена" }, { status: 404 })
      }
      return NextResponse.json({ success: true, data: article })
    }

    let filteredArticles = articlesData

    if (status && status !== "all") {
      filteredArticles = filteredArticles.filter((article) => article.status === status)
    }

    if (category && category !== "all") {
      filteredArticles = filteredArticles.filter((article) => article.category === category)
    }

    if (author && author !== "all") {
      filteredArticles = filteredArticles.filter((article) => article.author === author)
    }

    return NextResponse.json({
      success: true,
      data: filteredArticles,
      total: filteredArticles.length,
      stats: {
        published: articlesData.filter((a) => a.status === "published").length,
        draft: articlesData.filter((a) => a.status === "draft").length,
        archived: articlesData.filter((a) => a.status === "archived").length,
        totalViews: articlesData.reduce((sum, a) => sum + a.views, 0),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Ошибка получения статей" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const articleData = await request.json()

    const newArticle: Article = {
      id: Date.now().toString(),
      title: articleData.title,
      slug: articleData.slug || articleData.title.toLowerCase().replace(/\s+/g, "-"),
      content: articleData.content,
      excerpt: articleData.excerpt,
      status: articleData.status || "draft",
      author: articleData.author,
      category: articleData.category,
      tags: articleData.tags || [],
      seoTitle: articleData.seoTitle || articleData.title,
      seoDescription: articleData.seoDescription || articleData.excerpt,
      featuredImage: articleData.featuredImage,
      publishedAt: articleData.status === "published" ? new Date().toISOString() : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      readingTime: Math.ceil(articleData.content.split(" ").length / 200),
    }

    articlesData.push(newArticle)

    return NextResponse.json({
      success: true,
      data: newArticle,
      message: "Статья успешно создана",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Ошибка создания статьи" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const articleData = await request.json()
    const articleIndex = articlesData.findIndex((article) => article.id === articleData.id)

    if (articleIndex === -1) {
      return NextResponse.json({ success: false, error: "Статья не найдена" }, { status: 404 })
    }

    const wasPublished = articlesData[articleIndex].status === "published"
    const isNowPublished = articleData.status === "published"

    articlesData[articleIndex] = {
      ...articlesData[articleIndex],
      ...articleData,
      publishedAt: !wasPublished && isNowPublished ? new Date().toISOString() : articlesData[articleIndex].publishedAt,
      updatedAt: new Date().toISOString(),
      readingTime: Math.ceil(articleData.content.split(" ").length / 200),
    }

    return NextResponse.json({
      success: true,
      data: articlesData[articleIndex],
      message: "Статья успешно обновлена",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Ошибка обновления статьи" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "ID статьи не указан" }, { status: 400 })
    }

    const articleIndex = articlesData.findIndex((article) => article.id === id)

    if (articleIndex === -1) {
      return NextResponse.json({ success: false, error: "Статья не найдена" }, { status: 404 })
    }

    articlesData.splice(articleIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Статья успешно удалена",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Ошибка удаления статьи" }, { status: 500 })
  }
}
