import { type NextRequest, NextResponse } from "next/server"

// Добавляем динамическую конфигурацию
export const dynamic = "force-dynamic"
export const runtime = "nodejs"

// Данные моделей (в реальном проекте это было бы из базы данных)
const modelsData = {
  "sany-530s": {
    id: "sany-530s",
    model: "SANY SYG5530THB-62",
    title: "SANY SYG5530THB-62 - Автобетононасос 62м",
    subtitle: "Высокопроизводительный автобетононасос для крупных строительных объектов",
    image: "/images/pump1.jpg",
    keySpecs: {
      height: "62 м",
      performance: "180 м³/ч",
      reach: "54 м",
      weight: "53 т",
      length: "16.5 м",
      width: "2.5 м",
      totalHeight: "4.0 м",
      depthReach: "45 м",
      minRadius: "7.5 м",
      pressure: "8.5 МПа",
      cylinderDiameter: "230 мм",
      strokeLength: "2100 мм",
      chassis: "SANY",
      engine: "Weichai WP12.375E40",
      power: "375 л.с.",
      maxSpeed: "90 км/ч",
    },
    specifications: {
      general: [
        { label: "Максимальная высота подачи", value: "62 м", highlight: true },
        { label: "Максимальная производительность", value: "180 м³/ч", highlight: true },
        { label: "Максимальный горизонтальный вылет", value: "54 м", highlight: false },
        { label: "Общая масса", value: "53 т", highlight: false },
        { label: "Колесная формула", value: "8x4", highlight: false },
        { label: "Дорожный просвет", value: "280 мм", highlight: false },
      ],
      boom: [
        { label: "Вертикальный вылет", value: "62 м", highlight: true },
        { label: "Горизонтальный вылет", value: "54 м", highlight: true },
        { label: "Глубина подачи", value: "45 м", highlight: false },
        { label: "Минимальный радиус", value: "7.5 м", highlight: false },
        { label: "Количество секций", value: "5", highlight: false },
        { label: "Угол поворота", value: "365°", highlight: false },
      ],
      pump: [
        { label: "Производительность", value: "180 м³/ч", highlight: true },
        { label: "Давление бетона", value: "8.5 МПа", highlight: false },
        { label: "Диаметр цилиндра", value: "230 мм", highlight: false },
        { label: "Длина хода", value: "2100 мм", highlight: false },
        { label: "Частота качания", value: "31 цикл/мин", highlight: false },
        { label: "Объем бункера", value: "0.5 м³", highlight: false },
      ],
      chassis: [
        { label: "Шасси", value: "SANY", highlight: false },
        { label: "Двигатель", value: "Weichai WP12.375E40", highlight: false },
        { label: "Мощность", value: "375 л.с.", highlight: false },
        { label: "Макс. скорость", value: "90 км/ч", highlight: false },
        { label: "Топливный бак", value: "400 л", highlight: false },
        { label: "Коробка передач", value: "Автоматическая", highlight: false },
      ],
    },
    features: [
      "Высокая надежность и долговечность",
      "Экономичный расход топлива",
      "Простое техническое обслуживание",
      "Современная система управления",
      "Низкий уровень шума",
    ],
    advantages: [
      "Прямые поставки с завода SANY",
      "Полная техническая поддержка",
      "Гарантия качества",
      "Конкурентоспособные цены",
      "Быстрая окупаемость",
    ],
    delivery: {
      location: "Владивосток, Россия",
      term: "30-45 дней",
      warranty: "12 месяцев или 2000 м/ч",
      payment: "Предоплата 30%, остаток при получении",
    },
  },
  "sany-370c-10": {
    id: "sany-370c-10",
    model: "SANY SYG5370THB-52",
    title: "SANY SYG5370THB-52 - Автобетононасос 52м",
    subtitle: "Универсальный автобетононасос для средних и крупных объектов",
    image: "/images/pump2.jpg",
    keySpecs: {
      height: "52 м",
      performance: "160 м³/ч",
      reach: "46 м",
      weight: "37 т",
      length: "14.5 м",
      width: "2.5 м",
      totalHeight: "3.8 м",
      depthReach: "38 м",
      minRadius: "6.5 м",
      pressure: "8.0 МПа",
      cylinderDiameter: "200 мм",
      strokeLength: "2000 мм",
      chassis: "SANY",
      engine: "Weichai WP10.336E40",
      power: "336 л.с.",
      maxSpeed: "90 км/ч",
    },
    specifications: {
      general: [
        { label: "Длина", value: "14.5 м", highlight: false },
        { label: "Ширина", value: "2.5 м", highlight: false },
        { label: "Высота", value: "3.8 м", highlight: false },
        { label: "Масса", value: "37 т", highlight: true },
        { label: "Колесная формула", value: "6x4", highlight: false },
        { label: "Дорожный просвет", value: "260 мм", highlight: false },
      ],
      boom: [
        { label: "Вертикальный вылет", value: "52 м", highlight: true },
        { label: "Горизонтальный вылет", value: "46 м", highlight: true },
        { label: "Глубина подачи", value: "38 м", highlight: false },
        { label: "Минимальный радиус", value: "6.5 м", highlight: false },
        { label: "Количество секций", value: "5", highlight: false },
        { label: "Угол поворота", value: "365°", highlight: false },
      ],
      pump: [
        { label: "Производительность", value: "160 м³/ч", highlight: true },
        { label: "Давление бетона", value: "8.0 МПа", highlight: false },
        { label: "Диаметр цилиндра", value: "200 мм", highlight: false },
        { label: "Длина хода", value: "2000 мм", highlight: false },
        { label: "Частота качания", value: "28 цикл/мин", highlight: false },
        { label: "Объем бункера", value: "0.4 м³", highlight: false },
      ],
      chassis: [
        { label: "Шасси", value: "SANY", highlight: false },
        { label: "Двигатель", value: "Weichai WP10.336E40", highlight: false },
        { label: "Мощность", value: "336 л.с.", highlight: false },
        { label: "Макс. скорость", value: "90 км/ч", highlight: false },
        { label: "Топливный бак", value: "350 л", highlight: false },
        { label: "Коробка передач", value: "Автоматическая", highlight: false },
      ],
    },
    features: [
      "Компактные размеры",
      "Высокая маневренность",
      "Надежная конструкция",
      "Эффективная система охлаждения",
      "Удобное управление",
    ],
    advantages: [
      "Оптимальное соотношение цена/качество",
      "Универсальность применения",
      "Низкие эксплуатационные расходы",
      "Простота обслуживания",
      "Высокая производительность",
    ],
    delivery: {
      location: "Владивосток, Россия",
      term: "30-45 дней",
      warranty: "12 месяцев или 2000 м/ч",
      payment: "Предоплата 30%, остаток при получении",
    },
  },
  "sany-680c-10": {
    id: "sany-680c-10",
    model: "SANY SYG5680THB-58",
    title: "SANY SYG5680THB-58 - Автобетононасос 58м",
    subtitle: "Сбалансированный автобетононасос для различных задач",
    image: "/images/pump5.jpg",
    keySpecs: {
      height: "58 м",
      performance: "170 м³/ч",
      reach: "52 м",
      weight: "68 т",
      length: "15.8 м",
      width: "2.5 м",
      totalHeight: "3.9 м",
      depthReach: "42 м",
      minRadius: "7.0 м",
      pressure: "8.3 МПа",
      cylinderDiameter: "220 мм",
      strokeLength: "2050 мм",
      chassis: "SANY",
      engine: "Weichai WP12.360E40",
      power: "360 л.с.",
      maxSpeed: "90 км/ч",
    },
    specifications: {
      general: [
        { label: "Длина", value: "15.8 м", highlight: false },
        { label: "Ширина", value: "2.5 м", highlight: false },
        { label: "Высота", value: "3.9 м", highlight: false },
        { label: "Масса", value: "68 т", highlight: true },
        { label: "Колесная формула", value: "8x4", highlight: false },
        { label: "Дорожный просвет", value: "270 мм", highlight: false },
      ],
      boom: [
        { label: "Вертикальный вылет", value: "58 м", highlight: true },
        { label: "Горизонтальный вылет", value: "52 м", highlight: true },
        { label: "Глубина подачи", value: "42 м", highlight: false },
        { label: "Минимальный радиус", value: "7.0 м", highlight: false },
        { label: "Количество секций", value: "5", highlight: false },
        { label: "Угол поворота", value: "365°", highlight: false },
      ],
      pump: [
        { label: "Производительность", value: "170 м³/ч", highlight: true },
        { label: "Давление бетона", value: "8.3 МПа", highlight: false },
        { label: "Диаметр цилиндра", value: "220 мм", highlight: false },
        { label: "Длина хода", value: "2050 мм", highlight: false },
        { label: "Частота качания", value: "30 цикл/мин", highlight: false },
        { label: "Объем бункера", value: "0.45 м³", highlight: false },
      ],
      chassis: [
        { label: "Шасси", value: "SANY", highlight: false },
        { label: "Двигатель", value: "Weichai WP12.360E40", highlight: false },
        { label: "Мощность", value: "360 л.с.", highlight: false },
        { label: "Макс. скорость", value: "90 км/ч", highlight: false },
        { label: "Топливный бак", value: "380 л", highlight: false },
        { label: "Коробка передач", value: "Автоматическая", highlight: false },
      ],
    },
    features: [
      "Оптимальное соотношение цена/качество",
      "Универсальность применения",
      "Простота управления",
      "Высокая надежность",
      "Экономичность эксплуатации",
    ],
    advantages: [
      "Сбалансированные характеристики",
      "Подходит для большинства задач",
      "Умеренное потребление топлива",
      "Простое обслуживание",
      "Быстрая окупаемость",
    ],
    delivery: {
      location: "Владивосток, Россия",
      term: "30-45 дней",
      warranty: "12 месяцев или 2000 м/ч",
      payment: "Предоплата 30%, остаток при получении",
    },
  },
  "sany-620c-10": {
    id: "sany-620c-10",
    model: "SANY SYG5620THB-48",
    title: "SANY SYG5620THB-48 - Автобетононасос 48м",
    subtitle: "Компактный автобетононасос для городского строительства",
    image: "/images/pump6.jpg",
    keySpecs: {
      height: "48 м",
      performance: "150 м³/ч",
      reach: "42 м",
      weight: "62 т",
      length: "13.8 м",
      width: "2.5 м",
      totalHeight: "3.7 м",
      depthReach: "35 м",
      minRadius: "6.0 м",
      pressure: "7.8 МПа",
      cylinderDiameter: "190 мм",
      strokeLength: "1900 мм",
      chassis: "SANY",
      engine: "Weichai WP10.310E40",
      power: "310 л.с.",
      maxSpeed: "90 км/ч",
    },
    specifications: {
      general: [
        { label: "Длина", value: "13.8 м", highlight: false },
        { label: "Ширина", value: "2.5 м", highlight: false },
        { label: "Высота", value: "3.7 м", highlight: false },
        { label: "Масса", value: "62 т", highlight: true },
        { label: "Колесная формула", value: "6x4", highlight: false },
        { label: "Дорожный просвет", value: "250 мм", highlight: false },
      ],
      boom: [
        { label: "Вертикальный вылет", value: "48 м", highlight: true },
        { label: "Горизонтальный вылет", value: "42 м", highlight: true },
        { label: "Глубина подачи", value: "35 м", highlight: false },
        { label: "Минимальный радиус", value: "6.0 м", highlight: false },
        { label: "Количество секций", value: "5", highlight: false },
        { label: "Угол поворота", value: "365°", highlight: false },
      ],
      pump: [
        { label: "Производительность", value: "150 м³/ч", highlight: true },
        { label: "Давление бетона", value: "7.8 МПа", highlight: false },
        { label: "Диаметр цилиндра", value: "190 мм", highlight: false },
        { label: "Длина хода", value: "1900 мм", highlight: false },
        { label: "Частота качания", value: "26 цикл/мин", highlight: false },
        { label: "Объем бункера", value: "0.35 м³", highlight: false },
      ],
      chassis: [
        { label: "Шасси", value: "SANY", highlight: false },
        { label: "Двигатель", value: "Weichai WP10.310E40", highlight: false },
        { label: "Мощность", value: "310 л.с.", highlight: false },
        { label: "Макс. скорость", value: "90 км/ч", highlight: false },
        { label: "Топливный бак", value: "320 л", highlight: false },
        { label: "Коробка передач", value: "Автоматическая", highlight: false },
      ],
    },
    features: [
      "Компактность",
      "Экономичность",
      "Быстрая окупаемость",
      "Маневренность в городских условиях",
      "Простота эксплуатации",
    ],
    advantages: [
      "Идеален для городского строительства",
      "Низкие эксплуатационные расходы",
      "Высокая мобильность",
      "Простое обслуживание",
      "Доступная цена",
    ],
    delivery: {
      location: "Владивосток, Россия",
      term: "30-45 дней",
      warranty: "12 месяцев или 2000 м/ч",
      payment: "Предоплата 30%, остаток при получении",
    },
  },
  "sany-710s": {
    id: "sany-710s",
    model: "SANY SYG5710THB-86",
    title: "SANY SYG5710THB-86 - Автобетононасос 86м",
    subtitle: "Мощный автобетононасос для высотного строительства",
    image: "/images/pump3.jpg",
    keySpecs: {
      height: "86 м",
      performance: "200 м³/ч",
      reach: "78 м",
      weight: "71 т",
      length: "18.2 м",
      width: "2.5 м",
      totalHeight: "4.2 м",
      depthReach: "65 м",
      minRadius: "9.0 м",
      pressure: "9.0 МПа",
      cylinderDiameter: "260 мм",
      strokeLength: "2300 мм",
      chassis: "SANY",
      engine: "Weichai WP13.420E40",
      power: "420 л.с.",
      maxSpeed: "90 км/ч",
    },
    specifications: {
      general: [
        { label: "Длина", value: "18.2 м", highlight: false },
        { label: "Ширина", value: "2.5 м", highlight: false },
        { label: "Высота", value: "4.2 м", highlight: false },
        { label: "Масса", value: "71 т", highlight: true },
        { label: "Колесная формула", value: "8x4", highlight: false },
        { label: "Дорожный просвет", value: "300 мм", highlight: false },
      ],
      boom: [
        { label: "Вертикальный вылет", value: "86 м", highlight: true },
        { label: "Горизонтальный вылет", value: "78 м", highlight: true },
        { label: "Глубина подачи", value: "65 м", highlight: false },
        { label: "Минимальный радиус", value: "9.0 м", highlight: false },
        { label: "Количество секций", value: "6", highlight: false },
        { label: "Угол поворота", value: "365°", highlight: false },
      ],
      pump: [
        { label: "Производительность", value: "200 м³/ч", highlight: true },
        { label: "Давление бетона", value: "9.0 МПа", highlight: false },
        { label: "Диаметр цилиндра", value: "260 мм", highlight: false },
        { label: "Длина хода", value: "2300 мм", highlight: false },
        { label: "Частота качания", value: "32 цикл/мин", highlight: false },
        { label: "Объем бункера", value: "0.6 м³", highlight: false },
      ],
      chassis: [
        { label: "Шасси", value: "SANY", highlight: false },
        { label: "Двигатель", value: "Weichai WP13.420E40", highlight: false },
        { label: "Мощность", value: "420 л.с.", highlight: false },
        { label: "Макс. скорость", value: "90 км/ч", highlight: false },
        { label: "Топливный бак", value: "450 л", highlight: false },
        { label: "Коробка передач", value: "Автоматическая", highlight: false },
      ],
    },
    features: [
      "Максимальная высота подачи",
      "Высокая производительность",
      "Премиум качество",
      "Современные технологии",
      "Надежность в экстремальных условиях",
    ],
    advantages: [
      "Лидер по высоте подачи",
      "Подходит для небоскребов",
      "Максимальная эффективность",
      "Передовые технологии",
      "Престижное оборудование",
    ],
    delivery: {
      location: "Владивосток, Россия",
      term: "30-45 дней",
      warranty: "12 месяцев или 2000 м/ч",
      payment: "Предоплата 30%, остаток при получении",
    },
  },
  "sany-750s": {
    id: "sany-750s",
    model: "SANY SYG5750THB-72",
    title: "SANY SYG5750THB-72 - Автобетононасос 72м",
    subtitle: "Профессиональный автобетононасос для сложных проектов",
    image: "/images/pump4.jpg",
    keySpecs: {
      height: "72 м",
      performance: "190 м³/ч",
      reach: "65 м",
      weight: "75 т",
      length: "17.5 м",
      width: "2.5 м",
      totalHeight: "4.1 м",
      depthReach: "55 м",
      minRadius: "8.5 м",
      pressure: "8.8 МПа",
      cylinderDiameter: "250 мм",
      strokeLength: "2200 мм",
      chassis: "SANY",
      engine: "Weichai WP12.395E40",
      power: "395 л.с.",
      maxSpeed: "90 км/ч",
    },
    specifications: {
      general: [
        { label: "Длина", value: "17.5 м", highlight: false },
        { label: "Ширина", value: "2.5 м", highlight: false },
        { label: "Высота", value: "4.1 м", highlight: false },
        { label: "Масса", value: "75 т", highlight: true },
        { label: "Колесная формула", value: "8x4", highlight: false },
        { label: "Дорожный просвет", value: "290 мм", highlight: false },
      ],
      boom: [
        { label: "Вертикальный вылет", value: "72 м", highlight: true },
        { label: "Горизонтальный вылет", value: "65 м", highlight: true },
        { label: "Глубина подачи", value: "55 м", highlight: false },
        { label: "Минимальный радиус", value: "8.5 м", highlight: false },
        { label: "Количество секций", value: "6", highlight: false },
        { label: "Угол поворота", value: "365°", highlight: false },
      ],
      pump: [
        { label: "Производительность", value: "190 м³/ч", highlight: true },
        { label: "Давление бетона", value: "8.8 МПа", highlight: false },
        { label: "Диаметр цилиндра", value: "250 мм", highlight: false },
        { label: "Длина хода", value: "2200 мм", highlight: false },
        { label: "Частота качания", value: "31 цикл/мин", highlight: false },
        { label: "Объем бункера", value: "0.55 м³", highlight: false },
      ],
      chassis: [
        { label: "Шасси", value: "SANY", highlight: false },
        { label: "Двигатель", value: "Weichai WP12.395E40", highlight: false },
        { label: "Мощность", value: "395 л.с.", highlight: false },
        { label: "Макс. скорость", value: "90 км/ч", highlight: false },
        { label: "Топливный бак", value: "420 л", highlight: false },
        { label: "Коробка передач", value: "Автоматическая", highlight: false },
      ],
    },
    features: [
      "Стабильная работа",
      "Низкий уровень шума",
      "Долговечность",
      "Высокая точность подачи",
      "Профессиональное качество",
    ],
    advantages: [
      "Оптимален для высотного строительства",
      "Высокая надежность",
      "Профессиональный уровень",
      "Отличная управляемость",
      "Долгосрочная эксплуатация",
    ],
    delivery: {
      location: "Владивосток, Россия",
      term: "30-45 дней",
      warranty: "12 месяцев или 2000 м/ч",
      payment: "Предоплата 30%, остаток при получении",
    },
  },
}

// Функция для генерации уникального ID
function generateModelId(title: string): string {
  const baseId = title
    .toLowerCase()
    .replace(/[^a-zа-я0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/автобетононасос/g, "")
    .replace(/sany/g, "sany")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")

  let uniqueId = baseId
  let counter = 1

  while (modelsData[uniqueId as keyof typeof modelsData]) {
    uniqueId = `${baseId}-${counter}`
    counter++
  }

  return uniqueId
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    console.log("🔍 GET запрос к /api/models, id:", id)

    if (id) {
      const model = modelsData[id as keyof typeof modelsData]
      if (model) {
        console.log("✅ Модель найдена:", model.title)
        return NextResponse.json({
          success: true,
          data: model,
        })
      } else {
        console.log("❌ Модель не найдена:", id)
        return NextResponse.json(
          {
            success: false,
            error: "Модель не найдена",
          },
          { status: 404 },
        )
      }
    } else {
      console.log("📋 Возвращаем все модели, количество:", Object.values(modelsData).length)
      return NextResponse.json({
        success: true,
        data: Object.values(modelsData),
      })
    }
  } catch (error) {
    console.error("❌ Ошибка GET /api/models:", error)
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
    console.log("📝 POST запрос к /api/models")

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

    let newModel
    try {
      newModel = JSON.parse(body)
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

    console.log("🆕 Создание новой модели:", newModel.title)

    // Валидация обязательных полей
    if (!newModel.title?.trim()) {
      console.log("❌ Отсутствует название модели")
      return NextResponse.json(
        {
          success: false,
          error: "Название модели обязательно",
        },
        { status: 400 },
      )
    }

    // Генерируем ID автоматически, если он не указан
    if (!newModel.id?.trim()) {
      newModel.id = generateModelId(newModel.title)
      console.log("🔧 Сгенерирован ID:", newModel.id)
    }

    // Проверяем уникальность ID
    if (modelsData[newModel.id as keyof typeof modelsData]) {
      console.log("❌ Модель с таким ID уже существует:", newModel.id)
      return NextResponse.json(
        {
          success: false,
          error: "Модель с таким ID уже существует",
        },
        { status: 400 },
      )
    }

    // Устанавливаем значения по умолчанию
    const modelWithDefaults = {
      id: newModel.id,
      model: newModel.model || newModel.title,
      title: newModel.title,
      subtitle: newModel.subtitle || "",
      image: newModel.image || "/placeholder.svg?height=400&width=600",
      keySpecs: {
        height: "",
        performance: "",
        reach: "",
        weight: "",
        length: "",
        width: "",
        totalHeight: "",
        depthReach: "",
        minRadius: "",
        pressure: "",
        cylinderDiameter: "",
        strokeLength: "",
        chassis: "",
        engine: "",
        power: "",
        maxSpeed: "",
        ...newModel.keySpecs,
      },
      specifications: {
        general: [
          { label: "Длина", value: "", highlight: false },
          { label: "Ширина", value: "", highlight: false },
          { label: "Высота", value: "", highlight: false },
          { label: "Масса", value: "", highlight: true },
          { label: "Колесная формула", value: "", highlight: false },
          { label: "Дорожный просвет", value: "", highlight: false },
        ],
        boom: [
          { label: "Вертикальный вылет", value: "", highlight: true },
          { label: "Горизонтальный вылет", value: "", highlight: true },
          { label: "Глубина подачи", value: "", highlight: false },
          { label: "Минимальный радиус", value: "", highlight: false },
          { label: "Количество секций", value: "", highlight: false },
          { label: "Угол поворота", value: "", highlight: false },
        ],
        pump: [
          { label: "Производительность", value: "", highlight: true },
          { label: "Давление бетона", value: "", highlight: false },
          { label: "Диаметр цилиндра", value: "", highlight: false },
          { label: "Длина хода", value: "", highlight: false },
          { label: "Частота качания", value: "", highlight: false },
          { label: "Объем бункера", value: "", highlight: false },
        ],
        chassis: [
          { label: "Шасси", value: "", highlight: false },
          { label: "Двигатель", value: "", highlight: false },
          { label: "Мощность", value: "", highlight: false },
          { label: "Макс. скорость", value: "", highlight: false },
          { label: "Топливный бак", value: "", highlight: false },
          { label: "Коробка передач", value: "", highlight: false },
        ],
        ...newModel.specifications,
      },
      features: newModel.features || [""],
      advantages: newModel.advantages || [""],
      delivery: {
        location: "Владивосток, Россия",
        term: "30-45 дней",
        warranty: "12 месяцев или 2000 м/ч",
        payment: "Предоплата 30%, остаток при получении",
        ...newModel.delivery,
      },
    }

    // Добавляем модель в данные
    modelsData[newModel.id as keyof typeof modelsData] = modelWithDefaults as any

    console.log("✅ Модель успешно создана:", modelWithDefaults.title)
    return NextResponse.json({
      success: true,
      data: modelWithDefaults,
    })
  } catch (error) {
    console.error("❌ Ошибка POST /api/models:", error)
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
    console.log("✏️ PUT запрос к /api/models")

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

    let updatedModel
    try {
      updatedModel = JSON.parse(body)
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

    console.log("🔄 Обновление модели:", updatedModel.id)

    if (!updatedModel.id) {
      console.log("❌ Отсутствует ID модели")
      return NextResponse.json(
        {
          success: false,
          error: "ID модели обязателен",
        },
        { status: 400 },
      )
    }

    if (!modelsData[updatedModel.id as keyof typeof modelsData]) {
      console.log("❌ Модель не найдена:", updatedModel.id)
      return NextResponse.json(
        {
          success: false,
          error: "Модель не найдена",
        },
        { status: 404 },
      )
    }

    // Обновляем модель
    modelsData[updatedModel.id as keyof typeof modelsData] = updatedModel as any

    console.log("✅ Модель успешно обновлена:", updatedModel.title)
    return NextResponse.json({
      success: true,
      data: updatedModel,
    })
  } catch (error) {
    console.error("❌ Ошибка PUT /api/models:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Внутренняя ошибка сервера",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const modelId = searchParams.get("id")

    console.log("🗑️ DELETE запрос к /api/models, id:", modelId)

    if (!modelId) {
      console.log("❌ Отсутствует ID модели")
      return NextResponse.json(
        {
          success: false,
          error: "ID модели обязателен",
        },
        { status: 400 },
      )
    }

    if (!modelsData[modelId as keyof typeof modelsData]) {
      console.log("❌ Модель не найдена:", modelId)
      return NextResponse.json(
        {
          success: false,
          error: "Модель не найдена",
        },
        { status: 404 },
      )
    }

    const deletedModel = modelsData[modelId as keyof typeof modelsData]
    delete modelsData[modelId as keyof typeof modelsData]

    console.log("✅ Модель успешно удалена:", deletedModel.title)
    return NextResponse.json({
      success: true,
      data: deletedModel,
    })
  } catch (error) {
    console.error("❌ Ошибка DELETE /api/models:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Внутренняя ошибка сервера",
      },
      { status: 500 },
    )
  }
}
