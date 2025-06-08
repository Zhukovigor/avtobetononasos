"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { downloadPDF, type PDFData } from "../utils/pdf-generator"
import {
  Phone,
  Mail,
  MessageCircle,
  Download,
  CheckCircle,
  Truck,
  Shield,
  Clock,
  MapPin,
  Zap,
  Weight,
  Settings,
  ArrowUp,
  ArrowRight,
  Target,
  Activity,
  Car,
  Star,
  Calculator,
} from "lucide-react"

declare global {
  interface Window {
    ym: (id: number, action: string, params?: any) => void
    gtag: (command: string, targetId: string, config?: any) => void
  }
}

export interface ProductSpec {
  icon: React.ReactNode
  label: string
  value: string
  highlight?: boolean
}

export interface ProductData {
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
    general: ProductSpec[]
    boom: ProductSpec[]
    pump: ProductSpec[]
    chassis: ProductSpec[]
  }
  features: string[]
  advantages: string[]
  delivery: {
    location: string
    term: string
    warranty: string
    payment: string
  }
  pdfData: PDFData
}

interface ProductPageProps {
  data: ProductData
}

export default function ProductPage({ data }: ProductPageProps) {
  const [activeTab, setActiveTab] = useState("specs")
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadPDF = async () => {
    setIsDownloading(true)

    // Отправляем событие в аналитику
    if (typeof window !== "undefined") {
      if (window.ym) {
        window.ym(102485605, "reachGoal", "pdf_download", {
          pump_model: data.model,
        })
      }
      if (window.gtag) {
        window.gtag("event", "download_pdf", {
          event_category: "lead_generation",
          event_label: data.model,
        })
      }
    }

    try {
      await downloadPDF(data.pdfData)
    } catch (error) {
      console.error("Ошибка скачивания PDF:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleContactClick = (type: string) => {
    if (typeof window !== "undefined") {
      if (window.ym) {
        window.ym(102485605, "reachGoal", `contact_${type}`, {
          pump_model: data.model,
        })
      }
      if (window.gtag) {
        window.gtag("event", `contact_${type}`, {
          event_category: "lead_generation",
          event_label: data.model,
        })
      }
    }
  }

  const tabs = [
    { id: "specs", label: "Характеристики", icon: <Settings className="w-4 h-4" /> },
    { id: "features", label: "Особенности", icon: <Star className="w-4 h-4" /> },
    { id: "delivery", label: "Поставка", icon: <Truck className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-white border-b border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Product Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="space-y-4">
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200">
                  <CheckCircle className="w-4 h-4 mr-2" />В наличии на складе
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{data.title}</h1>
                <p className="text-xl text-gray-600 leading-relaxed">{data.subtitle}</p>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <ArrowUp className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{data.keySpecs.height}</div>
                  <div className="text-sm text-gray-500">Высота подачи</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{data.keySpecs.performance}</div>
                  <div className="text-sm text-gray-500">Производительность</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <ArrowRight className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{data.keySpecs.reach}</div>
                  <div className="text-sm text-gray-500">Горизонт. вылет</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Weight className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{data.keySpecs.weight}</div>
                  <div className="text-sm text-gray-500">Масса</div>
                </div>
              </div>

              {/* Убрали кнопки отсюда */}
            </motion.div>

            {/* Right Column - Image & Contact */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white border border-gray-200">
                <img
                  src={data.image || "/placeholder.svg"}
                  alt={data.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>

              {/* Contact Card */}
              <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-600 to-blue-700">
                <CardContent className="p-8">
                  <div className="text-white text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Calculator className="w-6 h-6 text-blue-200" />
                      <span className="text-xl font-semibold">Узнать стоимость</span>
                    </div>
                    <p className="text-blue-100 text-lg">
                      Получите индивидуальное коммерческое предложение с актуальной ценой
                    </p>
                    <div className="flex flex-col gap-3 pt-4">
                      <Button
                        asChild
                        className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                        onClick={() => handleContactClick("whatsapp_price")}
                      >
                        <a href="https://wa.me/79190422492" target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Запросить цену в WhatsApp
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-blue-600"
                        onClick={() => handleContactClick("phone_price")}
                      >
                        <a href="tel:+79107219400">
                          <Phone className="w-5 h-5 mr-2" />
                          Позвонить для уточнения цены
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Tabs Navigation */}
          <div className="flex justify-center mb-16">
            <div className="bg-gray-100 rounded-2xl p-2 inline-flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id ? "bg-white text-blue-600 shadow-md" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === "specs" && (
              <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {Object.entries(data.specifications).map(([category, specs]) => (
                  <Card key={category} className="border-0 shadow-lg bg-white">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-8 text-gray-900 flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            category === "general"
                              ? "bg-blue-100"
                              : category === "boom"
                                ? "bg-green-100"
                                : category === "pump"
                                  ? "bg-red-100"
                                  : "bg-purple-100"
                          }`}
                        >
                          {category === "general" && <Settings className="w-5 h-5 text-blue-600" />}
                          {category === "boom" && <ArrowUp className="w-5 h-5 text-green-600" />}
                          {category === "pump" && <Activity className="w-5 h-5 text-red-600" />}
                          {category === "chassis" && <Car className="w-5 h-5 text-purple-600" />}
                        </div>
                        {category === "general" && "Общие характеристики"}
                        {category === "boom" && "Характеристики стрелы"}
                        {category === "pump" && "Насосная система"}
                        {category === "chassis" && "Шасси и двигатель"}
                      </h3>
                      <div className="space-y-4">
                        {specs.map((spec, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between p-4 rounded-xl transition-all hover:shadow-sm ${
                              spec.highlight
                                ? "bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500"
                                : "bg-gray-50 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`${spec.highlight ? "text-blue-600" : "text-gray-500"}`}>{spec.icon}</div>
                              <span className="font-medium text-gray-700">{spec.label}</span>
                            </div>
                            <span className={`font-bold text-lg ${spec.highlight ? "text-blue-700" : "text-gray-900"}`}>
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "features" && (
              <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-8 text-gray-900 flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Star className="w-5 h-5 text-yellow-600" />
                      </div>
                      Ключевые особенности
                    </h3>
                    <div className="space-y-4">
                      {data.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-gray-700 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-8 text-gray-900 flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-blue-600" />
                      </div>
                      Преимущества
                    </h3>
                    <div className="space-y-4">
                      {data.advantages.map((advantage, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                        >
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                            <Zap className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-gray-700 leading-relaxed">{advantage}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "delivery" && (
              <div className="max-w-6xl mx-auto space-y-8">
                {/* Delivery Info */}
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-0 shadow-lg bg-white">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-8 text-gray-900 flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Truck className="w-5 h-5 text-blue-600" />
                        </div>
                        Условия поставки
                      </h3>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 mb-1">Место отгрузки</div>
                            <div className="text-gray-600">{data.delivery.location}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Clock className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 mb-1">Срок поставки</div>
                            <div className="text-gray-600">{data.delivery.term}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Shield className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 mb-1">Гарантия</div>
                            <div className="text-gray-600">{data.delivery.warranty}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg bg-white">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-8 text-gray-900 flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Phone className="w-5 h-5 text-green-600" />
                        </div>
                        Связаться с нами
                      </h3>
                      <div className="space-y-4">
                        <Button
                          asChild
                          className="w-full bg-green-600 hover:bg-green-700 text-white h-14 text-lg"
                          onClick={() => handleContactClick("whatsapp")}
                        >
                          <a href="https://wa.me/79190422492" target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="w-5 h-5 mr-3" />
                            WhatsApp: +7 919 042 24 92
                          </a>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full h-14 text-lg border-2"
                          onClick={() => handleContactClick("phone")}
                        >
                          <a href="tel:+79107219400">
                            <Phone className="w-5 h-5 mr-3" />
                            Телефон: +7 910 721 94 00
                          </a>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full h-14 text-lg border-2"
                          onClick={() => handleContactClick("email")}
                        >
                          <a href="mailto:2_2_2@mail.ru">
                            <Mail className="w-5 h-5 mr-3" />
                            Email: 2_2_2@mail.ru
                          </a>
                        </Button>
                      </div>

                      <Separator className="my-8" />

                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <div className="text-sm text-gray-500 mb-2">Условия оплаты</div>
                        <div className="font-semibold text-gray-900">{data.delivery.payment}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Final CTA */}
                <Card className="border-0 shadow-xl bg-gradient-to-r from-gray-900 to-gray-800">
                  <CardContent className="p-12 text-center text-white">
                    <div className="max-w-3xl mx-auto space-y-6">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Calculator className="w-8 h-8" />
                      </div>
                      <h3 className="text-3xl font-bold">Узнайте актуальную стоимость</h3>
                      <p className="text-gray-300 text-lg">
                        Получите персональное коммерческое предложение с учетом ваших требований
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                        <Button
                          onClick={handleDownloadPDF}
                          disabled={isDownloading}
                          size="lg"
                          className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-4 h-auto text-lg"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          {isDownloading ? "Подготовка..." : "Скачать КП"}
                        </Button>
                        <Button
                          asChild
                          size="lg"
                          className="bg-green-600 hover:bg-green-700 font-semibold px-8 py-4 h-auto text-lg"
                          onClick={() => handleContactClick("whatsapp_price")}
                        >
                          <a href="https://wa.me/79190422492" target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Запросить цену
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
