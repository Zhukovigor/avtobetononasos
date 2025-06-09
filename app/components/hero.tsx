"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    ym: (id: number, action: string, params?: any) => void
    gtag: (command: string, targetId: string, config?: any) => void
  }
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Устанавливаем размеры canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    const particles: Particle[] = []
    const particleCount = 150
    let animationId: number

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      opacitySpeed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.8
        this.speedY = (Math.random() - 0.5) * 0.8
        this.opacity = Math.random() * 0.8 + 0.2
        this.opacitySpeed = (Math.random() - 0.5) * 0.01
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Обновляем прозрачность
        this.opacity += this.opacitySpeed
        if (this.opacity <= 0.1 || this.opacity >= 1) {
          this.opacitySpeed = -this.opacitySpeed
        }

        // Перемещаем частицы при выходе за границы
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Создаем частицы
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Функция анимации
    function animate() {
      if (!ctx) return

      // Очищаем canvas с градиентом
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)")
      gradient.addColorStop(0.5, "rgba(10, 10, 20, 0.95)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 1)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Обновляем и рисуем частицы
      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      // Рисуем соединения между близкими частицами
      drawConnections()

      animationId = requestAnimationFrame(animate)
    }

    // Функция для рисования соединений
    function drawConnections() {
      if (!ctx) return

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.save()
            ctx.globalAlpha = ((100 - distance) / 100) * 0.3
            ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
    }

    // Добавляем интерактивность с мышью
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Притягиваем ближайшие частицы к курсору
      particles.forEach((particle) => {
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          particle.speedX += dx * 0.0001
          particle.speedY += dy * 0.0001
        }
      })
    }

    // Обработчик изменения размера окна
    const handleResize = () => {
      resizeCanvas()
      // Пересоздаем частицы при изменении размера
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    // Добавляем обработчики событий
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    // Запускаем анимацию
    animate()

    // Очистка при размонтировании компонента
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
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
    <div id="hero" className="relative h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ background: "linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #000000 100%)" }}
      />

      {/* Дополнительный градиентный оверлей */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>

      {/* Контент */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <div className="animate-fade-in-up">
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl drop-shadow-2xl">
            АВТОБЕТОНОНАСОСЫ
          </h1>
          <p className="mb-8 max-w-[800px] text-xl text-blue-100 sm:text-2xl drop-shadow-lg">
            Продажа и поставка автобетононасосов SANY из Китая
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row animate-fade-in-up animation-delay-300">
          <button
            onClick={() => scrollToSection("catalog")}
            className="group relative overflow-hidden bg-white text-black px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-lg"
          >
            <span className="relative z-10">Посмотреть каталог</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-white to-gray-300 opacity-0 blur transition-opacity duration-300 group-hover:opacity-70"></div>
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="group relative overflow-hidden border-2 border-white text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 rounded-lg"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
              Связаться с нами
            </span>
            <div className="absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
            <div className="absolute inset-0 border-2 border-white transform rotate-0 transition-transform duration-300 group-hover:rotate-180 opacity-50"></div>
          </button>
        </div>
      </div>

      {/* Индикатор прокрутки */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  )
}
