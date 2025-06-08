import { type NextRequest, NextResponse } from "next/server"

// Настройки по умолчанию
const DEFAULT_SETTINGS = {
  // Общие настройки
  siteName: "SANY Автобетононасосы",
  siteDescription: "Продажа и аренда автобетононасосов SANY в России",
  contactEmail: "zhukovigor@mail.ru",
  contactPhone: "+7 (919) 042-24-92",

  // SEO настройки
  autoUpdate: true,
  emailNotifications: true,
  weeklyReports: true,
  criticalAlerts: true,
  updateFrequency: "daily",
  reportEmail: "seo@sany-pumps.ru",

  // API ключи
  apiKeys: {
    yandexWordstat: "",
    googleSearchConsole: "",
    semrush: "",
    googleAnalytics: "",
  },

  // Настройки моделей
  defaultWarranty: "12 месяцев",
  defaultLocation: "Москва, Санкт-Петербург, Новосибирск",
  defaultPayment: "Лизинг от 15%, рассрочка до 24 месяцев",

  // Настройки форм
  leadNotificationEmail: "zhukovigor@mail.ru",
  autoResponse: true,
  autoResponseText: "Спасибо за обращение! Мы свяжемся с вами в течение 30 минут.",

  // Социальные сети
  socialLinks: {
    whatsapp: "https://wa.me/79190422492",
    telegram: "https://t.me/sany_global",
    vk: "https://vk.com/sprostehnika",
    dzen: "https://dzen.ru/sprostehnika",
  },

  // Настройки отображения
  currency: "RUB",
  language: "ru",
  showPrices: true,
  workingHours: "Пн-Пт: 9:00-18:00",

  // Настройки безопасности
  enableCaptcha: true,
  maxRequestsPerHour: 100,

  // Мета-теги по умолчанию
  defaultMetaTitle: "Автобетононасосы SANY - Продажа и аренда",
  defaultMetaDescription: "Официальный дилер SANY в России. Продажа и аренда автобетононасосов с гарантией.",
  defaultMetaKeywords: "автобетононасос SANY, купить бетононасос, аренда автобетононасоса",

  // Настройки аналитики
  yandexMetrikaId: "102485605",
  googleAnalyticsId: "",

  // Последнее обновление
  lastUpdated: new Date().toISOString(),
}

// Глобальная переменная для хранения настроек в памяти
let SETTINGS_CACHE = { ...DEFAULT_SETTINGS }

// GET - получение настроек
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get("section")

    // Если запрашивается конкретная секция
    if (section) {
      const sectionData = SETTINGS_CACHE[section as keyof typeof SETTINGS_CACHE]
      if (sectionData !== undefined) {
        return NextResponse.json({
          success: true,
          data: sectionData,
        })
      } else {
        return NextResponse.json(
          {
            success: false,
            message: `Секция ${section} не найдена`,
          },
          { status: 404 },
        )
      }
    }

    // Возвращаем все настройки
    return NextResponse.json({
      success: true,
      data: SETTINGS_CACHE,
    })
  } catch (error) {
    console.error("Ошибка получения настроек:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка получения настроек",
      },
      { status: 500 },
    )
  }
}

// PUT - обновление настроек
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { settings: newSettings, section } = body

    if (section) {
      // Обновляем только конкретную секцию
      SETTINGS_CACHE = {
        ...SETTINGS_CACHE,
        [section]: newSettings,
      }
    } else {
      // Обновляем все настройки
      SETTINGS_CACHE = {
        ...SETTINGS_CACHE,
        ...newSettings,
        lastUpdated: new Date().toISOString(),
      }
    }

    return NextResponse.json({
      success: true,
      message: "Настройки успешно сохранены",
      data: SETTINGS_CACHE,
    })
  } catch (error) {
    console.error("Ошибка обновления настроек:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка обновления настроек",
      },
      { status: 500 },
    )
  }
}

// POST - сброс к настройкам по умолчанию
export async function POST(request: NextRequest) {
  try {
    SETTINGS_CACHE = { ...DEFAULT_SETTINGS, lastUpdated: new Date().toISOString() }

    return NextResponse.json({
      success: true,
      message: "Настройки сброшены к умолчаниям",
      data: SETTINGS_CACHE,
    })
  } catch (error) {
    console.error("Ошибка сброса настроек:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка сброса настроек",
      },
      { status: 500 },
    )
  }
}
