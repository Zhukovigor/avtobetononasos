import { type NextRequest, NextResponse } from "next/server"

// Добавляем динамическую конфигурацию
export const dynamic = "force-dynamic"
export const runtime = "nodejs"

// Данные карточек для главной страницы
const portfolioCards = [
  {
    id: "sany-530s",
    name: "SANY SYG5530THB-62",
    category: "Стационарные",
    price: "Цена по запросу",
    image: "/images/pump1.jpg",
    specs: {
      reach: "62 м",
      output: "180 м³/ч",
      engine: "Weichai 375 л.с.",
      weight: "53 т",
    },
    description: "Высокопроизводительный автобетононасос для крупных строительных объектов",
    features: ["Высокая надежность", "Экономичный расход топлива", "Простое обслуживание"],
    isVisible: true,
    order: 1,
  },
  {
    id: "sany-370c-10",
    name: "SANY SYG5370THB-52",
    category: "Мобильные",
    price: "Цена по запросу",
    image: "/images/pump2.jpg",
    specs: {
      reach: "52 м",
      output: "160 м³/ч",
      engine: "Weichai 336 л.с.",
      weight: "37 т",
    },
    description: "Универсальный автобетононасос для средних и крупных объектов",
    features: ["Компактные размеры", "Высокая маневренность", "Надежная конструкция"],
    isVisible: true,
    order: 2,
  },
  {
    id: "sany-710s",
    name: "SANY SYG5710THB-86",
    category: "Стационарные",
    price: "Цена по запросу",
    image: "/images/pump3.jpg",
    specs: {
      reach: "86 м",
      output: "200 м³/ч",
      engine: "Weichai 420 л.с.",
      weight: "71 т",
    },
    description: "Мощный автобетононасос для высотного строительства",
    features: ["Максимальная высота подачи", "Высокая производительность", "Премиум качество"],
    isVisible: true,
    order: 3,
  },
  {
    id: "sany-750s",
    name: "SANY SYG5750THB-72",
    category: "Стационарные",
    price: "Цена по запросу",
    image: "/images/pump4.jpg",
    specs: {
      reach: "72 м",
      output: "190 м³/ч",
      engine: "Weichai 395 л.с.",
      weight: "75 т",
    },
    description: "Профессиональный автобетононасос для сложных проектов",
    features: ["Стабильная работа", "Низкий уровень шума", "Долговечность"],
    isVisible: true,
    order: 4,
  },
  {
    id: "sany-680c-10",
    name: "SANY SYG5680THB-58",
    category: "Мобильные",
    price: "Цена по запросу",
    image: "/images/pump5.jpg",
    specs: {
      reach: "58 м",
      output: "170 м³/ч",
      engine: "Weichai 360 л.с.",
      weight: "68 т",
    },
    description: "Сбалансированный автобетононасос для различных задач",
    features: ["Оптимальное соотношение цена/качество", "Универсальность", "Простота управления"],
    isVisible: true,
    order: 5,
  },
  {
    id: "sany-620c-10",
    name: "SANY SYG5620THB-48",
    category: "Мобильные",
    price: "Цена по запросу",
    image: "/images/pump6.jpg",
    specs: {
      reach: "48 м",
      output: "150 м³/ч",
      engine: "Weichai 310 л.с.",
      weight: "62 т",
    },
    description: "Компактный автобетононасос для городского строительства",
    features: ["Компактность", "Экономичность", "Быстрая окупаемость"],
    isVisible: true,
    order: 6,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    console.log("🔍 GET запрос к /api/portfolio-cards, id:", id)

    if (id) {
      const card = portfolioCards.find((card) => card.id === id)
      if (card) {
        console.log("✅ Карточка найдена:", card.name)
        return NextResponse.json({
          success: true,
          data: card,
        })
      } else {
        console.log("❌ Карточка не найдена:", id)
        return NextResponse.json(
          {
            success: false,
            error: "Карточка не найдена",
          },
          { status: 404 },
        )
      }
    } else {
      // Возвращаем только видимые карточки, отсортированные по порядку
      const visibleCards = portfolioCards.filter((card) => card.isVisible).sort((a, b) => a.order - b.order)

      console.log("📋 Возвращаем карточки, количество:", visibleCards.length)
      return NextResponse.json({
        success: true,
        data: visibleCards,
      })
    }
  } catch (error) {
    console.error("❌ Ошибка GET /api/portfolio-cards:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Внутренняя ошибка сервера",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    console.log("✏️ PUT запрос к /api/portfolio-cards")

    const body = await request.text()
    console.log("📄 Тело запроса:", body.substring(0, 200) + "...")

    if (!body.trim()) {
      console.log("❌ Пустое тело запроса")
      return NextResponse.json(
        {
          success: false,
          error: "Пустое тело запроса",
        },
        { status: 400 },
      )
    }

    let updatedCard
    try {
      updatedCard = JSON.parse(body)
    } catch (parseError) {
      console.error("❌ Ошибка парсинга JSON:", parseError)
      return NextResponse.json(
        {
          success: false,
          error: "Неверный формат JSON",
        },
        { status: 400 },
      )
    }

    console.log("🔄 Обновление карточки:", updatedCard.id)

    if (!updatedCard.id) {
      console.log("❌ Отсутствует ID карточки")
      return NextResponse.json(
        {
          success: false,
          error: "ID карточки обязателен",
        },
        { status: 400 },
      )
    }

    const cardIndex = portfolioCards.findIndex((card) => card.id === updatedCard.id)
    if (cardIndex === -1) {
      console.log("❌ Карточка не найдена:", updatedCard.id)
      return NextResponse.json(
        {
          success: false,
          error: "Карточка не найдена",
        },
        { status: 404 },
      )
    }

    // Обновляем карточку
    portfolioCards[cardIndex] = { ...portfolioCards[cardIndex], ...updatedCard }

    console.log("✅ Карточка успешно обновлена:", updatedCard.name)
    return NextResponse.json({
      success: true,
      data: portfolioCards[cardIndex],
    })
  } catch (error) {
    console.error("❌ Ошибка PUT /api/portfolio-cards:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Внутренняя ошибка сервера",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("📝 POST запрос к /api/portfolio-cards")

    const body = await request.text()
    if (!body.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Пустое тело запроса",
        },
        { status: 400 },
      )
    }

    const action = JSON.parse(body)

    if (action.type === "reorder") {
      // Изменение порядка карточек
      const { cardIds } = action
      cardIds.forEach((id: string, index: number) => {
        const cardIndex = portfolioCards.findIndex((card) => card.id === id)
        if (cardIndex !== -1) {
          portfolioCards[cardIndex].order = index + 1
        }
      })

      console.log("✅ Порядок карточек обновлен")
      return NextResponse.json({
        success: true,
        data: portfolioCards.sort((a, b) => a.order - b.order),
      })
    }

    return NextResponse.json(
      {
        success: false,
        error: "Неизвестный тип действия",
      },
      { status: 400 },
    )
  } catch (error) {
    console.error("❌ Ошибка POST /api/portfolio-cards:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Внутренняя ошибка сервера",
      },
      { status: 500 },
    )
  }
}
