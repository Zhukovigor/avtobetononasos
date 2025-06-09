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
        { label: "Максимальный горизонтальный вылет", value: "54 м" },
        { label: "Общая масса", value: "53 т" },
      ],
      boom: [
        { label: "Количество секций стрелы", value: "5" },
        { label: "Длина стрелы", value: "62 м" },
        { label: "Угол поворота", value: "365°" },
        { label: "Время развертывания", value: "8 мин" },
      ],
      pump: [
        { label: "Тип насоса", value: "Поршневой" },
        { label: "Диаметр цилиндра", value: "230 мм" },
        { label: "Ход поршня", value: "2100 мм" },
        { label: "Максимальное давление", value: "8.5 МПа" },
      ],
      chassis: [
        { label: "Шасси", value: "SANY" },
        { label: "Двигатель", value: "Weichai WP12.375E40" },
        { label: "Мощность", value: "375 л.с." },
        { label: "Максимальная скорость", value: "90 км/ч" },
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
        { label: "Максимальная высота подачи", value: "52 м", highlight: true },
        { label: "Максимальная производительность", value: "160 м³/ч", highlight: true },
        { label: "Максимальный горизонтальный вылет", value: "46 м" },
        { label: "Общая масса", value: "37 т" },
      ],
      boom: [
        { label: "Количество секций стрелы", value: "5" },
        { label: "Длина стрелы", value: "52 м" },
        { label: "Угол поворота", value: "365°" },
        { label: "Время развертывания", value: "7 мин" },
      ],
      pump: [
        { label: "Тип насоса", value: "Поршневой" },
        { label: "Диаметр цилиндра", value: "200 мм" },
        { label: "Ход поршня", value: "2000 мм" },
        { label: "Максимальное давление", value: "8.0 МПа" },
      ],
      chassis: [
        { label: "Шасси", value: "SANY" },
        { label: "Двигатель", value: "Weichai WP10.336E40" },
        { label: "Мощность", value: "336 л.с." },
        { label: "Максимальная скорость", value: "90 км/ч" },
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
        { label: "Максимальная высота подачи", value: "58 м", highlight: true },
        { label: "Максимальная производительность", value: "170 м³/ч", highlight: true },
        { label: "Максимальный горизонтальный вылет", value: "52 м" },
        { label: "Общая масса", value: "68 т" },
      ],
      boom: [
        { label: "Количество секций стрелы", value: "5" },
        { label: "Длина стрелы", value: "58 м" },
        { label: "Угол поворота", value: "365°" },
        { label: "Время развертывания", value: "8 мин" },
      ],
      pump: [
        { label: "Тип насоса", value: "Поршневой" },
        { label: "Диаметр цилиндра", value: "220 мм" },
        { label: "Ход поршня", value: "2050 мм" },
        { label: "Максимальное давление", value: "8.3 МПа" },
      ],
      chassis: [
        { label: "Шасси", value: "SANY" },
        { label: "Двигатель", value: "Weichai WP12.360E40" },
        { label: "Мощность", value: "360 л.с." },
        { label: "Максимальная скорость", value: "90 км/ч" },
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
        { label: "Максимальная высота подачи", value: "48 м", highlight: true },
        { label: "Максимальная производительность", value: "150 м³/ч", highlight: true },
        { label: "Максимальный горизонтальный вылет", value: "42 м" },
        { label: "Общая масса", value: "62 т" },
      ],
      boom: [
        { label: "Количество секций стрелы", value: "5" },
        { label: "Длина стрелы", value: "48 м" },
        { label: "Угол поворота", value: "365°" },
        { label: "Время развертывания", value: "6 мин" },
      ],
      pump: [
        { label: "Тип насоса", value: "Поршневой" },
        { label: "Диаметр цилиндра", value: "190 мм" },
        { label: "Ход поршня", value: "1900 мм" },
        { label: "Максимальное давление", value: "7.8 МПа" },
      ],
      chassis: [
        { label: "Шасси", value: "SANY" },
        { label: "Двигатель", value: "Weichai WP10.310E40" },
        { label: "Мощность", value: "310 л.с." },
        { label: "Максимальная скорость", value: "90 км/ч" },
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
        { label: "Максимальная высота подачи", value: "86 м", highlight: true },
        { label: "Максимальная производительность", value: "200 м³/ч", highlight: true },
        { label: "Максимальный горизонтальный вылет", value: "78 м" },
        { label: "Общая масса", value: "71 т" },
      ],
      boom: [
        { label: "Количество секций стрелы", value: "6" },
        { label: "Длина стрелы", value: "86 м" },
        { label: "Угол поворота", value: "365°" },
        { label: "Время развертывания", value: "10 мин" },
      ],
      pump: [
        { label: "Тип насоса", value: "Поршневой" },
        { label: "Диаметр цилиндра", value: "260 мм" },
        { label: "Ход поршня", value: "2300 мм" },
        { label: "Максимальное давление", value: "9.0 МПа" },
      ],
      chassis: [
        { label: "Шасси", value: "SANY" },
        { label: "Двигатель", value: "Weichai WP13.420E40" },
        { label: "Мощность", value: "420 л.с." },
        { label: "Максимальная скорость", value: "90 км/ч" },
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
        { label: "Максимальная высота подачи", value: "72 м", highlight: true },
        { label: "Максимальная производительность", value: "190 м³/ч", highlight: true },
        { label: "Максимальный горизонтальный вылет", value: "65 м" },
        { label: "Общая масса", value: "75 т" },
      ],
      boom: [
        { label: "Количество секций стрелы", value: "6" },
        { label: "Длина стрелы", value: "72 м" },
        { label: "Угол поворота", value: "365°" },
        { label: "Время развертывания", value: "9 мин" },
      ],
      pump: [
        { label: "Тип насоса", value: "Поршневой" },
        { label: "Диаметр цилиндра", value: "250 мм" },
        { label: "Ход поршня", value: "2200 мм" },
        { label: "Максимальное давление", value: "8.8 МПа" },
      ],
      chassis: [
        { label: "Шасси", value: "SANY" },
        { label: "Двигатель", value: "Weichai WP12.395E40" },
        { label: "Мощность", value: "395 л.с." },
        { label: "Максимальная скорость", value: "90 км/ч" },
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      // Возвращаем конкретную модель
      const model = modelsData[id as keyof typeof modelsData]
      if (model) {
        return NextResponse.json({
          success: true,
          data: model,
        })
      } else {
        return NextResponse.json(
          {
            success: false,
            error: "Модель не найдена",
          },
          { status: 404 },
        )
      }
    } else {
      // Возвращаем все модели
      return NextResponse.json({
        success: true,
        data: Object.values(modelsData),
      })
    }
  } catch (error) {
    console.error("Ошибка API models:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Внутренняя ошибка сервера",
      },
      { status: 500 },
    )
  }
}
