"use client"

import type React from "react"

import { useState } from "react"
import { useSettings } from "@/app/hooks/useSettings"

declare global {
  interface Window {
    ym: (id: number, action: string, params?: any) => void
    gtag: (command: string, targetId: string, config?: any) => void
  }
}

export default function Contact() {
  const { settings } = useSettings()
  // Состояние формы
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  // Состояние ошибок
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  // Состояние отправки
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // Обработка изменения полей
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Очищаем ошибку при вводе
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  // Валидация формы
  const validateForm = () => {
    let isValid = true
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    }

    // Проверка имени
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа"
      isValid = false
    }

    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Пожалуйста, введите корректный email адрес"
      isValid = false
    }

    // Проверка телефона
    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = "Пожалуйста, введите корректный номер телефона"
      isValid = false
    }

    // Проверка сообщения
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Сообщение должно содержать минимум 10 символов"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Создание лида из формы контакта
  const createLead = async (contactData: typeof formData) => {
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          message: contactData.message,
          source: "Контактная форма",
          priority: "medium",
          tags: ["сайт", "контактная_форма"],
        }),
      })

      const result = await response.json()
      if (!result.success) {
        console.error("Ошибка создания лида:", result.error)
      } else {
        console.log("Лид успешно создан:", result.data)
      }
    } catch (error) {
      console.error("Ошибка при создании лида:", error)
    }
  }

  // Отправка формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Валидация перед отправкой
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        // Отправляем событие в Яндекс.Метрику
        if (typeof window !== "undefined" && window.ym) {
          window.ym(settings?.yandexMetrikaId || "102485605", "reachGoal", "form_submit", {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          })
        }

        // Отправляем событие в Google Analytics
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "generate_lead", {
            event_category: "lead_generation",
            event_label: "contact_form",
            value: 1,
          })
        }

        // Создаем лид из данных формы
        await createLead(formData)

        setIsSubmitted(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      } else {
        setSubmitError(result.message || "Произошла ошибка при отправке")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError("Произошла ошибка при отправке. Попробуйте еще раз.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Обработка клика по социальным сетям
  const handleSocialClick = (platform: string) => {
    // Отправляем событие в Яндекс.Метрику
    if (typeof window !== "undefined" && window.ym) {
      window.ym(settings?.yandexMetrikaId || "102485605", "reachGoal", `social_${platform}`)
    }

    // Отправляем событие в Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "social_click", {
        event_category: "social_media",
        event_label: platform,
        value: 1,
      })
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-black py-20">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Свяжитесь с нами
          </h2>
          <p className="mb-12 text-center text-xl text-gray-400">
            Заинтересованы в покупке автобетононасоса? Мы осуществляем поставки качественного оборудования SANY из
            Китая.
          </p>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="mb-6 text-2xl font-semibold text-white">Контактная информация</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                      <span className="text-xl">📧</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white">{settings?.contactEmail || "zhukovigor@mail.ru"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                      <span className="text-xl">📱</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Телефон</p>
                      <p className="text-white">{settings?.contactPhone || "+7 (919) 042-24-92"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-6 text-2xl font-semibold text-white">Социальные сети</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <a
                    href={settings?.socialLinks?.whatsapp || "https://wa.me/79190422492"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick("whatsapp")}
                    className="group flex items-center gap-3 rounded-lg bg-white/5 p-4 transition-all duration-300 hover:bg-white/10 hover:scale-105"
                  >
                    <span className="text-2xl transition-transform duration-300 group-hover:scale-125">📱</span>
                    <div>
                      <p className="font-semibold text-white">WhatsApp</p>
                      <p className="text-sm text-gray-400">Быстрая связь</p>
                    </div>
                  </a>
                  <a
                    href={settings?.socialLinks?.vk || "https://vk.com/sprostehnika"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick("vk")}
                    className="group flex items-center gap-3 rounded-lg bg-white/5 p-4 transition-all duration-300 hover:bg-white/10 hover:scale-105"
                  >
                    <span className="text-2xl transition-transform duration-300 group-hover:scale-125">🔵</span>
                    <div>
                      <p className="font-semibold text-white">ВКонтакте</p>
                      <p className="text-sm text-gray-400">Новости и обновления</p>
                    </div>
                  </a>
                  <a
                    href={settings?.socialLinks?.telegram || "https://t.me/sany_global"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick("telegram")}
                    className="group flex items-center gap-3 rounded-lg bg-white/5 p-4 transition-all duration-300 hover:bg-white/10 hover:scale-105"
                  >
                    <span className="text-2xl transition-transform duration-300 group-hover:scale-125">✈️</span>
                    <div>
                      <p className="font-semibold text-white">Telegram</p>
                      <p className="text-sm text-gray-400">Оперативная связь</p>
                    </div>
                  </a>
                  <a
                    href={settings?.socialLinks?.dzen || "https://dzen.ru/sprostehnika"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick("dzen")}
                    className="group flex items-center gap-3 rounded-lg bg-white/5 p-4 transition-all duration-300 hover:bg-white/10 hover:scale-105"
                  >
                    <span className="text-2xl transition-transform duration-300 group-hover:scale-125">🟠</span>
                    <div>
                      <p className="font-semibold text-white">Дзен</p>
                      <p className="text-sm text-gray-400">Статьи и обзоры</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              {isSubmitted ? (
                <div className="text-center">
                  <div className="mb-4 text-6xl">✅</div>
                  <h3 className="mb-2 text-2xl font-bold text-white">Спасибо за обращение!</h3>
                  <p className="mb-6 text-gray-400">Мы свяжемся с вами в ближайшее время.</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="group relative overflow-hidden bg-white text-black px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <span className="relative z-10">Отправить еще одно сообщение</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-white">
                      Имя
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ваше имя"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30"
                      disabled={isSubmitting}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30"
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block mb-2 text-white">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (999) 123-45-67"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30"
                      disabled={isSubmitting}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-white">
                      Сообщение
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Расскажите о ваших потребностях..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                      disabled={isSubmitting}
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                  </div>

                  {submitError && (
                    <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded border border-red-400/20">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="group relative w-full overflow-hidden bg-white text-black py-4 font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10">{isSubmitting ? "Отправляем..." : "Отправить сообщение"}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
                    {!isSubmitting && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={i * 5} y1="0" x2={i * 5} y2="100" stroke="white" strokeWidth="0.5" />
          ))}
        </svg>
      </div>
    </section>
  )
}
