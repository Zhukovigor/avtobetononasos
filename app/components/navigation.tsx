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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-white">SANY</div>
            <div className="text-sm text-gray-400">Автобетононасосы</div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
            >
              Оборудование
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
            </button>
            <button
              onClick={() => scrollToSection("catalog")}
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
            >
              Каталог
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
            >
              Контакты
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
            </button>
            <a
              href="https://wa.me/79190422492"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-white text-black px-4 py-2 font-semibold transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
