import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json()

    // Валидация данных
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ success: false, message: "Все поля обязательны для заполнения" }, { status: 400 })
    }

    // Простая валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Некорректный email адрес" }, { status: 400 })
    }

    // Создаем транспорт для отправки email через Mail.ru
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: "zhukovigor@mail.ru",
        pass: "rKLK7KtnEU50Ucfqoslx",
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    // Проверяем соединение
    await transporter.verify()

    // Настройки письма
    const mailOptions = {
      from: '"Сайт Автобетононасосы" <zhukovigor@mail.ru>',
      to: "zhukovigor@mail.ru",
      subject: `🔔 Новая заявка с сайта автобетононасосов SANY`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 3px solid #007bff; padding-bottom: 15px; margin-top: 0;">
              🔔 Новая заявка с сайта
            </h2>
            
            <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #007bff;">
              <h3 style="margin-top: 0; color: #333; font-size: 18px;">👤 Контактная информация:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555; width: 100px;">Имя:</td>
                  <td style="padding: 8px 0; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 8px 0; color: #333;"><a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Телефон:</td>
                  <td style="padding: 8px 0; color: #333;"><a href="tel:${phone}" style="color: #007bff; text-decoration: none;">${phone}</a></td>
                </tr>
              </table>
            </div>
            
            <div style="background: #fff; padding: 20px; border: 2px solid #e9ecef; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333; font-size: 18px;">💬 Сообщение:</h3>
              <p style="line-height: 1.6; color: #555; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin-top: 30px;">
              <h3 style="margin-top: 0; color: #333; font-size: 16px;">🚀 Быстрые действия:</h3>
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <a href="https://wa.me/${phone.replace(/\D/g, "")}" 
                   style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px 0;">
                  📱 WhatsApp
                </a>
                <a href="mailto:${email}" 
                   style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px 0;">
                  📧 Ответить
                </a>
                <a href="tel:${phone}" 
                   style="background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px 0;">
                  📞 Позвонить
                </a>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 5px; border-top: 3px solid #007bff;">
              <p style="margin: 0; font-size: 14px; color: #666; text-align: center;">
                📅 <strong>Дата:</strong> ${new Date().toLocaleString("ru-RU")}<br>
                🌐 <strong>Сайт:</strong> v0-avtobetononasos.vercel.app<br>
                ⚡ <strong>Статус:</strong> Требует ответа
              </p>
            </div>
          </div>
        </div>
      `,
    }

    // Отправляем email
    const info = await transporter.sendMail(mailOptions)
    console.log("✅ Email отправлен успешно:", info.messageId)

    return NextResponse.json(
      {
        success: true,
        message: "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("❌ Ошибка отправки email:", error)

    // Более детальная информация об ошибке
    let errorMessage = "Произошла ошибка при отправке заявки."

    if (error instanceof Error) {
      if (error.message.includes("authentication")) {
        errorMessage = "Ошибка аутентификации email. Свяжитесь с нами напрямую."
      } else if (error.message.includes("connection")) {
        errorMessage = "Ошибка соединения. Попробуйте позже."
      } else {
        errorMessage = `Ошибка: ${error.message}`
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 },
    )
  }
}
