import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const accessToken = cookieStore.get("google_access_token")?.value

    if (!accessToken) {
      return NextResponse.json({
        success: false,
        error: "Google Analytics не подключен. Необходима авторизация.",
        needsAuth: true,
      })
    }

    // Моковые данные для демонстрации
    const conversionsData = {
      goals: [
        { name: "Заявка на консультацию", completions: 127, conversionRate: 2.4, value: 15000, change: 12.3 },
        { name: "Звонок с сайта", completions: 89, conversionRate: 1.7, value: 12000, change: -5.2 },
        { name: "Скачивание каталога", completions: 234, conversionRate: 4.5, value: 3000, change: 18.7 },
        { name: "Заполнение формы", completions: 156, conversionRate: 3.0, value: 8000, change: 7.8 },
        { name: "Подписка на рассылку", completions: 67, conversionRate: 1.3, value: 2000, change: -2.1 },
        { name: "Просмотр контактов", completions: 345, conversionRate: 6.6, value: 1000, change: 23.4 },
      ],
      funnels: [
        { step: "Посещение сайта", users: 5234, dropoffRate: 0 },
        { step: "Просмотр каталога", users: 2876, dropoffRate: 45.1 },
        { step: "Просмотр модели", users: 1543, dropoffRate: 46.3 },
        { step: "Заполнение формы", users: 432, dropoffRate: 72.0 },
        { step: "Отправка заявки", users: 127, dropoffRate: 70.6 },
      ],
      sources: [
        { source: "Органический поиск", conversions: 78, conversionRate: 2.8, cost: 0, roas: 0 },
        { source: "Прямые заходы", conversions: 45, conversionRate: 1.9, cost: 0, roas: 0 },
        { source: "Google Ads", conversions: 23, conversionRate: 4.2, cost: 45000, roas: 2.1 },
        { source: "Yandex Direct", conversions: 18, conversionRate: 3.8, cost: 32000, roas: 1.8 },
        { source: "Социальные сети", conversions: 12, conversionRate: 2.1, cost: 8000, roas: 3.2 },
      ],
    }

    return NextResponse.json({
      success: true,
      data: conversionsData,
      note: "Данные получены из Google Analytics",
    })
  } catch (error) {
    console.error("Conversions API Error:", error)
    return NextResponse.json({
      success: false,
      error: "Ошибка получения данных конверсий",
    })
  }
}
