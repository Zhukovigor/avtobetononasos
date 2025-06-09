import { NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

// Интерфейс для данных модели
interface ModelData {
  id: string
  model: string
  title: string
  subtitle: string
  image: string
  keySpecs: {
    height: string
    performance: string
    reach: string
    weight: string
  }
  specifications: {
    general: Array<{
      label: string
      value: string
      highlight?: boolean
    }>
    boom: Array<{
      label: string
      value: string
      highlight?: boolean
    }>
    pump: Array<{
      label: string
      value: string
      highlight?: boolean
    }>
    chassis: Array<{
      label: string
      value: string
      highlight?: boolean
    }>
  }
  features: string[]
  advantages: string[]
  delivery: {
    location: string
    term: string
    warranty: string
    payment: string
  }
}

// Путь к файлу с данными
const DATA_DIR = path.join(process.cwd(), "data")
const MODELS_FILE = path.join(DATA_DIR, "models.json")

// Начальные данные моделей
const initialModels: ModelData[] = [
  {
    id: "sany-530s",
    model: "SANY SYM5365THBFS 530S",
    title: "SANY SYM5365THBFS 530S",
    subtitle: "Автобетононасос с высотой подачи 53 метра",
    image: "/images/pump1.jpg",
    keySpecs: {
      height: "53м",
      performance: "180 м³/ч",
      reach: "48.5м",
      weight: "36 500 кг",
    },
    specifications: {
      general: [
        { label: "Длина", value: "14 500 мм", highlight: false },
        { label: "Ширина", value: "2 500 мм", highlight: false },
        { label: "Высота", value: "4 000 мм", highlight: false },
        { label: "Масса", value: "36 500 кг", highlight: true },
      ],
      boom: [
        { label: "Вертикальный вылет", value: "53.0 м", highlight: true },
        { label: "Горизонтальный вылет", value: "48.5 м", highlight: true },
        { label: "Глубина подачи", value: "38.5 м", highlight: false },
        { label: "Минимальный радиус", value: "7.5 м", highlight: false },
      ],
      pump: [
        { label: "Производительность", value: "180 м³/ч", highlight: true },
        { label: "Давление бетона", value: "8.5 МПа", highlight: false },
        { label: "Диаметр цилиндра", value: "260 мм", highlight: false },
        { label: "Длина хода", value: "2100 мм", highlight: false },
      ],
      chassis: [
        { label: "Шасси", value: "VOLVO FM", highlight: false },
        { label: "Двигатель", value: "VOLVO D13K", highlight: false },
        { label: "Мощность", value: "460 л.с.", highlight: false },
        { label: "Макс. скорость", value: "85 км/ч", highlight: false },
      ],
    },
    features: [
      "Высокая производительность до 180 м³/ч",
      "Надежная гидравлическая система SANY",
      "Автоматическая система смазки",
      "Система контроля давления и температуры",
      "Эргономичная кабина оператора",
      "Система автоматической промывки",
    ],
    advantages: [
      "Оптимальное соотношение цена/качество",
      "Низкие эксплуатационные расходы",
      "Высокая надежность и долговечность",
      "Простота в обслуживании",
      "Быстрая окупаемость инвестиций",
      "Полная техническая поддержка",
    ],
    delivery: {
      location: "Владивосток",
      term: "30-45 дней",
      warranty: "12 месяцев",
      payment: "Предоплата 30%, остальное при поставке",
    },
  },
  {
    id: "sany-370c-10",
    model: "SANY SYM5230THBF 370C-10",
    title: "SANY SYM5230THBF 370C-10",
    subtitle: "Компактный автобетононасос с высотой подачи 37 метров",
    image: "/images/pump2.jpg",
    keySpecs: {
      height: "37м",
      performance: "125 м³/ч",
      reach: "33.5м",
      weight: "28 500 кг",
    },
    specifications: {
      general: [
        { label: "Длина", value: "12 500 мм", highlight: false },
        { label: "Ширина", value: "2 500 мм", highlight: false },
        { label: "Высота", value: "3 800 мм", highlight: false },
        { label: "Масса", value: "28 500 кг", highlight: true },
      ],
      boom: [
        { label: "Вертикальный вылет", value: "37.0 м", highlight: true },
        { label: "Горизонтальный вылет", value: "33.5 м", highlight: true },
        { label: "Глубина подачи", value: "28.5 м", highlight: false },
        { label: "Минимальный радиус", value: "6.5 м", highlight: false },
      ],
      pump: [
        { label: "Производительность", value: "125 м³/ч", highlight: true },
        { label: "Давление бетона", value: "8.0 МПа", highlight: false },
        { label: "Диаметр цилиндра", value: "230 мм", highlight: false },
        { label: "Длина хода", value: "1800 мм", highlight: false },
      ],
      chassis: [
        { label: "Шасси", value: "ISUZU FVZ", highlight: false },
        { label: "Двигатель", value: "ISUZU 6UZ1", highlight: false },
        { label: "Мощность", value: "370 л.с.", highlight: false },
        { label: "Макс. скорость", value: "90 км/ч", highlight: false },
      ],
    },
    features: [
      "Компактные размеры для работы в ограниченном пространстве",
      "Высокая маневренность и проходимость",
      "Экономичный расход топлива",
      "Простота управления и обслуживания",
      "Надежная система охлаждения",
      "Автоматическая диагностика неисправностей",
    ],
    advantages: [
      "Идеален для малоэтажного строительства",
      "Низкая стоимость владения",
      "Быстрая установка и готовность к работе",
      "Минимальные требования к площадке",
      "Высокая точность подачи бетона",
      "Отличная ремонтопригодность",
    ],
    delivery: {
      location: "Владивосток",
      term: "30-45 дней",
      warranty: "12 месяцев",
      payment: "Предоплата 30%, остальное при поставке",
    },
  },
  {
    id: "sany-710s",
    model: "SANY SYM5502THBFS 710S",
    title: "SANY SYM5502THBFS 710S",
    subtitle: "Мощный автобетононасос с высотой подачи 71 метр",
    image: "/images/pump3.jpg",
    keySpecs: {
      height: "71м",
      performance: "200 м³/ч",
      reach: "65м",
      weight: "42 000 кг",
    },
    specifications: {
      general: [
        { label: "Длина", value: "16 000 мм", highlight: false },
        { label: "Ширина", value: "2 500 мм", highlight: false },
        { label: "Высота", value: "4 200 мм", highlight: false },
        { label: "Масса", value: "42 000 кг", highlight: true },
      ],
      boom: [
        { label: "Вертикальный вылет", value: "71.0 м", highlight: true },
        { label: "Горизонтальный вылет", value: "65.0 м", highlight: true },
        { label: "Глубина подачи", value: "45.0 м", highlight: false },
        { label: "Минимальный радиус", value: "8.0 м", highlight: false },
      ],
      pump: [
        { label: "Производительность", value: "200 м³/ч", highlight: true },
        { label: "Давление бетона", value: "9.0 МПа", highlight: false },
        { label: "Диаметр цилиндра", value: "280 мм", highlight: false },
        { label: "Длина хода", value: "2300 мм", highlight: false },
      ],
      chassis: [
        { label: "Шасси", value: "VOLVO FMX", highlight: false },
        { label: "Двигатель", value: "VOLVO D16K", highlight: false },
        { label: "Мощность", value: "540 л.с.", highlight: false },
        { label: "Макс. скорость", value: "85 км/ч", highlight: false },
      ],
    },
    features: [
      "Максимальная высота подачи в классе",
      "Усиленная конструкция стрелы",
      "Система активной стабилизации",
      "Автоматическое управление подачей",
      "Система мониторинга износа",
      "Быстрая установка и складывание",
    ],
    advantages: [
      "Идеален для высотного строительства",
      "Максимальная производительность",
      "Превосходная надежность",
      "Минимальное время простоя",
      "Высокая точность позиционирования",
      "Полный сервисный пакет",
    ],
    delivery: {
      location: "Владивосток",
      term: "45-60 дней",
      warranty: "18 месяцев",
      payment: "Предоплата 40%, остальное при поставке",
    },
  },
  {
    id: "sany-750s",
    model: "SANY SYM5502THBFS 750S",
    title: "SANY SYM5502THBFS 750S",
    subtitle: "Флагманский автобетононасос с высотой подачи 75 метров",
    image: "/images/pump4.jpg",
    keySpecs: {
      height: "75м",
      performance: "220 м³/ч",
      reach: "68м",
      weight: "45 000 кг",
    },
    specifications: {
      general: [
        { label: "Длина", value: "16 500 мм", highlight: false },
        { label: "Ширина", value: "2 500 мм", highlight: false },
        { label: "Высота", value: "4 300 мм", highlight: false },
        { label: "Масса", value: "45 000 кг", highlight: true },
      ],
      boom: [
        { label: "Вертикальный вылет", value: "75.0 м", highlight: true },
        { label: "Горизонтальный вылет", value: "68.0 м", highlight: true },
        { label: "Глубина подачи", value: "48.0 м", highlight: false },
        { label: "Минимальный радиус", value: "8.5 м", highlight: false },
      ],
      pump: [
        { label: "Производительность", value: "220 м³/ч", highlight: true },
        { label: "Давление бетона", value: "9.5 МПа", highlight: false },
        { label: "Диаметр цилиндра", value: "300 мм", highlight: false },
        { label: "Длина хода", value: "2500 мм", highlight: false },
      ],
      chassis: [
        { label: "Шасси", value: "VOLVO FMX", highlight: false },
        { label: "Двигатель", value: "VOLVO D16K", highlight: false },
        { label: "Мощность", value: "600 л.с.", highlight: false },
        { label: "Макс. скорость", value: "85 км/ч", highlight: false },
      ],
    },
    features: [
      "Рекордная высота подачи 75 метров",
      "Революционная система управления",
      "Интеллектуальная диагностика",
      "Система предиктивного обслуживания",
      "Автоматическая оптимизация работы",
      "Дистанционное управление и мониторинг",
    ],
    advantages: [
      "Лидер по техническим характеристикам",
      "Максимальная эффективность работы",
      "Инновационные технологии SANY",
      "Минимальные эксплуатационные расходы",
      "Превосходная окупаемость",
      "Премиальная техническая поддержка",
    ],
    delivery: {
      location: "Владивосток",
      term: "60-75 дней",
      warranty: "24 месяца",
      payment: "Предоплата 50%, остальное при поставке",
    },
  },
  {
    id: "sany-680c-10",
    model: "SANY SYM5502THBF 680C-10",
    title: "SANY SYM5502THBF 680C-10",
    subtitle: "Профессиональный автобетононасос с высотой подачи 68 метров",
    image: "/images/pump5.jpg",
    keySpecs: {
      height: "68м",
      performance: "190 м³/ч",
      reach: "62м",
      weight: "40 500 кг",
    },
    specifications: {
      general: [
        { label: "Длина", value: "15 500 мм", highlight: false },
        { label: "Ширина", value: "2 500 мм", highlight: false },
        { label: "Высота", value: "4 100 мм", highlight: false },
        { label: "Масса", value: "40 500 кг", highlight: true },
      ],
      boom: [
        { label: "Вертикальный вылет", value: "68.0 м", highlight: true },
        { label: "Горизонтальный вылет", value: "62.0 м", highlight: true },
        { label: "Глубина подачи", value: "42.0 м", highlight: false },
        { label: "Минимальный радиус", value: "7.8 м", highlight: false },
      ],
      pump: [
        { label: "Производительность", value: "190 м³/ч", highlight: true },
        { label: "Давление бетона", value: "8.8 МПа", highlight: false },
        { label: "Диаметр цилиндра", value: "270 мм", highlight: false },
        { label: "Длина хода", value: "2200 мм", highlight: false },
      ],
      chassis: [
        { label: "Шасси", value: "VOLVO FMX", highlight: false },
        { label: "Двигатель", value: "VOLVO D13K", highlight: false },
        { label: "Мощность", value: "500 л.с.", highlight: false },
        { label: "Макс. скорость", value: "85 км/ч", highlight: false },
      ],
    },
    features: [
      "Оптимальная высота для большинства объектов",
      "Сбалансированная производительность",
      "Надежная система управления",
      "Эффективная система охлаждения",
      "Удобство обслуживания",
      "Система контроля качества бетона",
    ],
    advantages: [
      "Универсальность применения",
      "Отличное соотношение цена/производительность",
      "Проверенная надежность",
      "Простота эксплуатации",
      "Быстрая адаптация к объекту",
      "Комплексная техническая поддержка",
    ],
    delivery: {
      location: "Владивосток",
      term: "45-60 дней",
      warranty: "18 месяцев",
      payment: "Предоплата 35%, остальное при поставке",
    },
  },
  {
    id: "sany-620c-10",
    model: "SANY SYM5420THBF 620C-10",
    title: "SANY SYM5420THBF 620C-10",
    subtitle: "Надежный автобетононасос с высотой подачи 62 метра",
    image: "/images/pump6.jpg",
    keySpecs: {
      height: "62м",
      performance: "170 м³/ч",
      reach: "56м",
      weight: "38 000 кг",
    },
    specifications: {
      general: [
        { label: "Длина", value: "15 000 мм", highlight: false },
        { label: "Ширина", value: "2 500 мм", highlight: false },
        { label: "Высота", value: "4 000 мм", highlight: false },
        { label: "Масса", value: "38 000 кг", highlight: true },
      ],
      boom: [
        { label: "Вертикальный вылет", value: "62.0 м", highlight: true },
        { label: "Горизонтальный вылет", value: "56.0 м", highlight: true },
        { label: "Глубина подачи", value: "40.0 м", highlight: false },
        { label: "Минимальный радиус", value: "7.6 м", highlight: false },
      ],
      pump: [
        { label: "Производительность", value: "170 м³/ч", highlight: true },
        { label: "Давление бетона", value: "8.6 МПа", highlight: false },
        { label: "Диаметр цилиндра", value: "250 мм", highlight: false },
        { label: "Длина хода", value: "2000 мм", highlight: false },
      ],
      chassis: [
        { label: "Шасси", value: "VOLVO FM", highlight: false },
        { label: "Двигатель", value: "VOLVO D13K", highlight: false },
        { label: "Мощность", value: "480 л.с.", highlight: false },
        { label: "Макс. скорость", value: "85 км/ч", highlight: false },
      ],
    },
    features: [
      "Высокая надежность конструкции",
      "Эффективная система подачи",
      "Простое управление и настройка",
      "Система автоматической очистки",
      "Контроль параметров в реальном времени",
      "Быстрая мобилизация на объекте",
    ],
    advantages: [
      "Проверенная временем надежность",
      "Оптимальные эксплуатационные расходы",
      "Высокая производительность труда",
      "Простота технического обслуживания",
      "Отличная маневренность",
      "Полная сервисная поддержка",
    ],
    delivery: {
      location: "Владивосток",
      term: "40-55 дней",
      warranty: "15 месяцев",
      payment: "Предоплата 35%, остальное при поставке",
    },
  },
]

// Функция для чтения данных из файла
async function readModelsData(): Promise<ModelData[]> {
  try {
    // Создаем директорию, если она не существует
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true })
    }

    // Если файл не существует, создаем его с начальными данными
    if (!existsSync(MODELS_FILE)) {
      await writeFile(MODELS_FILE, JSON.stringify(initialModels, null, 2), "utf-8")
      return initialModels
    }

    // Читаем данные из файла
    const fileContent = await readFile(MODELS_FILE, "utf-8")
    return JSON.parse(fileContent)
  } catch (error) {
    console.error("Ошибка чтения файла с моделями:", error)
    return initialModels
  }
}

// Функция для записи данных в файл
async function writeModelsData(models: ModelData[]): Promise<void> {
  try {
    // Создаем директорию, если она не существует
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true })
    }

    await writeFile(MODELS_FILE, JSON.stringify(models, null, 2), "utf-8")
    console.log("✅ Данные моделей успешно сохранены в файл:", MODELS_FILE)
  } catch (error) {
    console.error("❌ Ошибка записи файла с моделями:", error)
    throw error
  }
}

// Получение всех моделей или конкретной модели
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const modelId = searchParams.get("id")

  try {
    const models = await readModelsData()

    if (modelId) {
      const model = models.find((m: ModelData) => m.id === modelId)
      if (!model) {
        return NextResponse.json({ error: "Модель не найдена" }, { status: 404 })
      }
      return NextResponse.json({ success: true, data: model })
    }

    return NextResponse.json({
      success: true,
      data: models.map((m: ModelData) => ({ id: m.id, title: m.title, model: m.model })),
    })
  } catch (error) {
    console.error("Ошибка получения данных:", error)
    return NextResponse.json({ error: "Ошибка получения данных" }, { status: 500 })
  }
}

// Обновление модели
export async function PUT(request: Request) {
  try {
    const updatedModel: ModelData = await request.json()

    // Читаем текущие данные
    const models = await readModelsData()

    // Находим и обновляем модель
    const modelIndex = models.findIndex((m) => m.id === updatedModel.id)

    if (modelIndex === -1) {
      return NextResponse.json({ error: "Модель не найдена" }, { status: 404 })
    }

    models[modelIndex] = updatedModel

    // Сохраняем обновленные данные
    await writeModelsData(models)

    console.log("✅ Модель успешно обновлена:", updatedModel.model)

    return NextResponse.json({
      success: true,
      message: "Модель успешно обновлена",
      data: updatedModel,
    })
  } catch (error) {
    console.error("❌ Ошибка обновления модели:", error)
    return NextResponse.json({ error: "Ошибка обновления модели" }, { status: 500 })
  }
}

// Создание новой модели
export async function POST(request: Request) {
  try {
    const newModel: Omit<ModelData, "id"> = await request.json()
    const modelWithId = {
      ...newModel,
      id: newModel.model
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    }

    // Читаем текущие данные
    const models = await readModelsData()

    // Проверяем, что модель с таким ID не существует
    if (models.find((m) => m.id === modelWithId.id)) {
      return NextResponse.json({ error: "Модель с таким ID уже существует" }, { status: 400 })
    }

    // Добавляем новую модель
    models.push(modelWithId)

    // Сохраняем обновленные данные
    await writeModelsData(models)

    console.log("✅ Новая модель успешно создана:", modelWithId.model)

    return NextResponse.json({
      success: true,
      message: "Модель успешно создана",
      data: modelWithId,
    })
  } catch (error) {
    console.error("❌ Ошибка создания модели:", error)
    return NextResponse.json({ error: "Ошибка создания модели" }, { status: 500 })
  }
}

// Удаление модели
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const modelId = searchParams.get("id")

    if (!modelId) {
      return NextResponse.json({ error: "ID модели не указан" }, { status: 400 })
    }

    // Читаем текущие данные
    const models = await readModelsData()

    // Находим модель для удаления
    const modelIndex = models.findIndex((m) => m.id === modelId)

    if (modelIndex === -1) {
      return NextResponse.json({ error: "Модель не найдена" }, { status: 404 })
    }

    const deletedModel = models[modelIndex]
    models.splice(modelIndex, 1)

    // Сохраняем обновленные данные
    await writeModelsData(models)

    console.log("✅ Модель успешно удалена:", deletedModel.model)

    return NextResponse.json({
      success: true,
      message: "Модель успешно удалена",
      data: deletedModel,
    })
  } catch (error) {
    console.error("❌ Ошибка удаления модели:", error)
    return NextResponse.json({ error: "Ошибка удаления модели" }, { status: 500 })
  }
}
