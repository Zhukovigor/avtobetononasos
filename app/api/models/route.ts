import { NextResponse } from "next/server"

// Принудительно делаем route динамическим
export const dynamic = "force-dynamic"

// Статические данные моделей
const modelsData = [
  {
    id: "sany-530s",
    model: "SANY SYM5365THBFS 530S",
    title: "Автобетононасос SANY 530S",
    subtitle: "Высота подачи 53 метра",
    image: "/images/pump1.jpg",
    keySpecs: {
      height: "53 м",
      performance: "180 м³/ч",
      reach: "49 м",
      weight: "36 500 кг",
    },
    category: "medium",
    slug: "sany-530s",
    specs: "Высота подачи: 53м, Производительность: 180 м³/ч",
    price: "от 18 500 000 ₽",
  },
  {
    id: "sany-370c-10",
    model: "SANY SYM5230THBF 370C-10",
    title: "Автобетононасос SANY 370C-10",
    subtitle: "Высота подачи 37 метров",
    image: "/images/pump2.jpg",
    keySpecs: {
      height: "37 м",
      performance: "125 м³/ч",
      reach: "33 м",
      weight: "28 500 кг",
    },
    category: "medium",
    slug: "sany-370c-10",
    specs: "Высота подачи: 37м, Производительность: 125 м³/ч",
    price: "от 14 200 000 ₽",
  },
  {
    id: "sany-710s",
    model: "SANY SYM5552THB 710S",
    title: "Автобетононасос SANY 710S",
    subtitle: "Высота подачи 71 метр",
    image: "/images/pump3.jpg",
    keySpecs: {
      height: "71 м",
      performance: "200 м³/ч",
      reach: "65 м",
      weight: "52 000 кг",
    },
    category: "large",
    slug: "sany-710s",
    specs: "Высота подачи: 71м, Производительность: 200 м³/ч",
    price: "от 24 800 000 ₽",
  },
  {
    id: "sany-750s",
    model: "SANY SYM5552THB 750S",
    title: "Автобетононасос SANY 750S",
    subtitle: "Высота подачи 75 метров",
    image: "/images/pump4.jpg",
    keySpecs: {
      height: "75 м",
      performance: "220 м³/ч",
      reach: "68 м",
      weight: "54 500 кг",
    },
    category: "large",
    slug: "sany-750s",
    specs: "Высота подачи: 75м, Производительность: 220 м³/ч",
    price: "от 26 900 000 ₽",
  },
  {
    id: "sany-680c-10",
    model: "SANY SYM5590THB 680C-10",
    title: "Автобетононасос SANY 680C-10",
    subtitle: "Высота подачи 68 метров",
    image: "/images/pump5.jpg",
    keySpecs: {
      height: "68 м",
      performance: "190 м³/ч",
      reach: "62 м",
      weight: "49 500 кг",
    },
    category: "large",
    slug: "sany-680c-10",
    specs: "Высота подачи: 68м, Производительность: 190 м³/ч",
    price: "от 22 100 000 ₽",
  },
  {
    id: "sany-620c-10",
    model: "SANY SYM5463THBFB 620C-10",
    title: "Автобетононасос SANY 620C-10",
    subtitle: "Высота подачи 62 метра",
    image: "/images/pump6.jpg",
    keySpecs: {
      height: "62 м",
      performance: "170 м³/ч",
      reach: "56 м",
      weight: "45 000 кг",
    },
    category: "medium",
    slug: "sany-620c-10",
    specs: "Высота подачи: 62м, Производительность: 170 м³/ч",
    price: "от 19 700 000 ₽",
  },
]

// GET - получение списка моделей или конкретной модели
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const modelId = searchParams.get("id")

    if (modelId) {
      // Возвращаем конкретную модель
      const model = modelsData.find((m) => m.id === modelId)
      if (!model) {
        return NextResponse.json({ success: false, error: "Модель не найдена" }, { status: 404 })
      }
      return NextResponse.json({ success: true, data: model })
    }

    // Возвращаем все модели
    return NextResponse.json({ success: true, data: modelsData })
  } catch (error) {
    console.error("Ошибка получения моделей:", error)
    return NextResponse.json({ success: false, error: "Ошибка сервера" }, { status: 500 })
  }
}

// POST - создание новой модели
export async function POST(request: Request) {
  try {
    const newModel = await request.json()

    // Валидация обязательных полей (только title для новой модели)
    if (!newModel.title) {
      return NextResponse.json({ success: false, error: "Название модели обязательно" }, { status: 400 })
    }

    // Генерируем ID автоматически, если он не указан
    if (!newModel.id) {
      newModel.id = generateModelId(newModel.title)
    }

    // Проверяем, что модель с таким ID не существует
    if (modelsData.find((m) => m.id === newModel.id)) {
      return NextResponse.json({ success: false, error: "Модель с таким ID уже существует" }, { status: 400 })
    }

    // Определяем категорию на основе высоты подачи
    let category = "medium"
    const height = Number.parseFloat(newModel.keySpecs?.height?.replace(/[^\d.]/g, "") || "0")
    if (height >= 65) {
      category = "large"
    } else if (height <= 30) {
      category = "small"
    }

    // Определяем ценовую категорию
    let price = "от 18 500 000 ₽"
    if (height >= 65) {
      price = "от 24 800 000 ₽"
    } else if (height <= 30) {
      price = "от 14 200 000 ₽"
    }

    // Формируем спецификацию для отображения на главной странице
    const specs = `Высота подачи: ${newModel.keySpecs?.height || "N/A"}, Производительность: ${newModel.keySpecs?.performance || "N/A"}`

    // Устанавливаем значения по умолчанию для обязательных полей
    const modelWithDefaults = {
      ...newModel,
      model: newModel.model || newModel.title,
      subtitle: newModel.subtitle || "",
      image: newModel.image || "/placeholder.svg?height=400&width=600",
      keySpecs: {
        height: "",
        performance: "",
        reach: "",
        weight: "",
        ...newModel.keySpecs,
      },
      category,
      slug: newModel.id,
      specs,
      price,
    }

    modelsData.push(modelWithDefaults)

    console.log("✅ Новая модель создана:", modelWithDefaults.title)
    return NextResponse.json({ success: true, data: modelWithDefaults })
  } catch (error) {
    console.error("Ошибка создания модели:", error)
    return NextResponse.json({ success: false, error: "Ошибка сервера" }, { status: 500 })
  }
}

// PUT - обновление существующей модели
export async function PUT(request: Request) {
  try {
    const updatedModel = await request.json()

    if (!updatedModel.id) {
      return NextResponse.json({ success: false, error: "ID модели обязателен" }, { status: 400 })
    }

    const modelIndex = modelsData.findIndex((m) => m.id === updatedModel.id)

    if (modelIndex === -1) {
      return NextResponse.json({ success: false, error: "Модель не найдена" }, { status: 404 })
    }

    // Определяем категорию на основе высоты подачи
    let category = "medium"
    const height = Number.parseFloat(updatedModel.keySpecs?.height?.replace(/[^\d.]/g, "") || "0")
    if (height >= 65) {
      category = "large"
    } else if (height <= 30) {
      category = "small"
    }

    // Определяем ценовую категорию
    let price = "от 18 500 000 ₽"
    if (height >= 65) {
      price = "от 24 800 000 ₽"
    } else if (height <= 30) {
      price = "от 14 200 000 ₽"
    }

    // Формируем спецификацию для отображения на главной странице
    const specs = `Высота подачи: ${updatedModel.keySpecs?.height || "N/A"}, Производительность: ${updatedModel.keySpecs?.performance || "N/A"}`

    // Обновляем модель с дополнительными полями для главной страницы
    const completeUpdatedModel = {
      ...updatedModel,
      category,
      slug: updatedModel.id,
      specs,
      price,
    }

    modelsData[modelIndex] = completeUpdatedModel

    console.log("✅ Модель обновлена:", updatedModel.title)
    return NextResponse.json({ success: true, data: completeUpdatedModel })
  } catch (error) {
    console.error("Ошибка обновления модели:", error)
    return NextResponse.json({ success: false, error: "Ошибка сервера" }, { status: 500 })
  }
}

// DELETE - удаление модели
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const modelId = searchParams.get("id")

    if (!modelId) {
      return NextResponse.json({ success: false, error: "ID модели обязателен" }, { status: 400 })
    }

    const modelIndex = modelsData.findIndex((m) => m.id === modelId)

    if (modelIndex === -1) {
      return NextResponse.json({ success: false, error: "Модель не найдена" }, { status: 404 })
    }

    const deletedModel = modelsData.splice(modelIndex, 1)[0]

    console.log("✅ Модель удалена:", deletedModel.title)
    return NextResponse.json({ success: true, data: deletedModel })
  } catch (error) {
    console.error("Ошибка удаления модели:", error)
    return NextResponse.json({ success: false, error: "Ошибка сервера" }, { status: 500 })
  }
}

// Функция для генерации уникального ID
function generateModelId(title: string): string {
  // Создаем ID на основе названия модели
  const baseId = title
    .toLowerCase()
    .replace(/[^a-zа-я0-9\s]/g, "") // Убираем спецсимволы
    .replace(/\s+/g, "-") // Заменяем пробелы на дефисы
    .replace(/автобетононасос/g, "") // Убираем слово "автобетононасос"
    .replace(/sany/g, "sany") // Оставляем SANY
    .replace(/^-+|-+$/g, "") // Убираем дефисы в начале и конце
    .replace(/-+/g, "-") // Заменяем множественные дефисы на одинарные

  // Проверяем уникальность
  let uniqueId = baseId
  let counter = 1

  while (modelsData.some((model) => model.id === uniqueId)) {
    uniqueId = `${baseId}-${counter}`
    counter++
  }

  return uniqueId
}
