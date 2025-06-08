"use client"

import { useState, useEffect } from "react"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })

      // Отправляем событие в Яндекс.Метрику
      if (typeof window !== "undefined" && window.ym) {
        window.ym(102485605, "reachGoal", `scroll_to_${sectionId}`)
      }

      // Отправляем событие в Google Analytics
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "scroll_to_section", {
          event_category: "navigation",
          event_label: sectionId,
          value: 1,
        })
      }
    }
  }

  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(102485605, "reachGoal", "whatsapp_header_click")
    }
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "messenger_click", {
        event_category: "contact",
        event_label: "whatsapp_header",
        value: 1,
      })
    }
  }

  const handleTelegramClick = () => {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(102485605, "reachGoal", "telegram_header_click")
    }
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "messenger_click", {
        event_category: "contact",
        event_label: "telegram_header",
        value: 1,
      })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Вертикальная надпись SANY */}
          <div className="flex flex-col items-start">
            <div className="text-2xl font-bold text-white tracking-tight">SANY</div>
            <div className="text-sm text-orange-400 font-medium -mt-1">Автобетононасосы</div>
          </div>

          {/* Горизонтальное меню */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group font-medium"
            >
              Главная
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></div>
            </button>
            <button
              onClick={() => scrollToSection("catalog")}
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group font-medium"
            >
              Каталог
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></div>
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group font-medium"
            >
              Галерея
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></div>
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group font-medium"
            >
              Контакты
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></div>
            </button>
          </div>

          {/* Кнопки мессенджеров */}
          <div className="flex items-center space-x-3">
            {/* WhatsApp */}
            <a
              href="https://wa.me/79190422492?text=Здравствуйте! Интересуют автобетононасосы SANY. Можете предоставить информацию о моделях и ценах?"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="group relative overflow-hidden bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785" />
              </svg>
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/sany_global"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleTelegramClick}
              className="group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              <span className="hidden sm:inline">Telegram</span>
            </a>

            {/* Мобильное меню */}
            <button className="lg:hidden text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Мобильное меню (скрытое по умолчанию) */}
        <div className="lg:hidden border-t border-white/10 py-4 space-y-2">
          <button
            onClick={() => scrollToSection("hero")}
            className="block w-full text-left text-gray-300 hover:text-white py-2 font-medium"
          >
            Главная
          </button>
          <button
            onClick={() => scrollToSection("catalog")}
            className="block w-full text-left text-gray-300 hover:text-white py-2 font-medium"
          >
            Каталог
          </button>
          <button
            onClick={() => scrollToSection("gallery")}
            className="block w-full text-left text-gray-300 hover:text-white py-2 font-medium"
          >
            Галерея
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="block w-full text-left text-gray-300 hover:text-white py-2 font-medium"
          >
            Контакты
          </button>
        </div>
      </div>
    </nav>
  )
}
