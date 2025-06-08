"use client"

import ProductPage, { type ProductData } from "../../components/product-page"
import {
  Ruler,
  Weight,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Target,
  Activity,
  Gauge,
  Settings,
  Car,
  FuelIcon as Engine,
  Zap,
} from "lucide-react"

const sany620C10Data: ProductData = {
  model: "SANY SYM5463THBFB 620C-10",
  title: "SANY SYM5463THBFB 620C-10",
  subtitle: "Универсальный автобетононасос с высотой подачи 62 метра",
  image: "/images/pump6.jpg",
  keySpecs: {
    height: "62м",
    performance: "180 м³/ч",
    reach: "56.5м",
    weight: "48 500 кг",
  },
  specifications: {
    general: [
      { icon: <Ruler className="w-4 h-4" />, label: "Длина", value: "15 800 мм", highlight: false },
      { icon: <Ruler className="w-4 h-4" />, label: "Ширина", value: "2 550 мм", highlight: false },
      { icon: <ArrowUp className="w-4 h-4" />, label: "Высота", value: "4 000 мм", highlight: false },
      { icon: <Weight className="w-4 h-4" />, label: "Масса", value: "48 500 кг", highlight: true },
    ],
    boom: [
      { icon: <ArrowUp className="w-4 h-4" />, label: "Вертикальный вылет", value: "62.0 м", highlight: true },
      { icon: <ArrowRight className="w-4 h-4" />, label: "Горизонтальный вылет", value: "56.5 м", highlight: true },
      { icon: <ArrowDown className="w-4 h-4" />, label: "Глубина подачи", value: "46.5 м", highlight: false },
      { icon: <Target className="w-4 h-4" />, label: "Минимальный радиус", value: "7.8 м", highlight: false },
    ],
    pump: [
      { icon: <Activity className="w-4 h-4" />, label: "Производительность", value: "180 м³/ч", highlight: true },
      { icon: <Gauge className="w-4 h-4" />, label: "Давление бетона", value: "8.6 МПа", highlight: false },
      { icon: <Settings className="w-4 h-4" />, label: "Диаметр цилиндра", value: "270 мм", highlight: false },
      { icon: <Ruler className="w-4 h-4" />, label: "Длина хода", value: "2100 мм", highlight: false },
    ],
    chassis: [
      { icon: <Car className="w-4 h-4" />, label: "Шасси", value: "VOLVO FM", highlight: false },
      { icon: <Engine className="w-4 h-4" />, label: "Двигатель", value: "VOLVO D13K", highlight: false },
      { icon: <Zap className="w-4 h-4" />, label: "Мощность", value: "500 л.с.", highlight: false },
      { icon: <Gauge className="w-4 h-4" />, label: "Макс. скорость", value: "85 км/ч", highlight: false },
    ],
  },
  features: [
    "Универсальная высота подачи 62 метра",
    "Стабильная производительность 180 м³/ч",
    "6-секционная складывающаяся стрела",
    "Интеллектуальная система управления",
    "Система автоматической смазки",
    "Контроль параметров в реальном времени",
  ],
  advantages: [
    "Универсальное решение для большинства объектов",
    "Превосходная надежность и долговечность",
    "Оптимальные эксплуатационные характеристики",
    "Простота в управлении и обслуживании",
    "Высокая мобильность и маневренность",
    "Полная техническая поддержка",
  ],
  delivery: {
    location: "Владивосток",
    term: "45-60 дней",
    warranty: "18 месяцев",
    payment: "Предоплата 40%, остальное при поставке",
  },
  pdfData: {
    model: "SANY SYM5463THBFB 620C-10",
    height: "62м",
    performance: "180 м³/ч",
    image: "/images/pump6.jpg",
    specs: {
      length: "15 800 мм",
      width: "2 550 мм",
      height: "4 000 мм",
      weight: "48 500 кг",
      verticalReach: "62.0 м",
      horizontalReach: "56.5 м",
      depthReach: "46.5 м",
      minRadius: "7.8 м",
      performanceLow: "180 м³/ч",
      pressureLow: "8.6 МПа",
      cylinderDiameter: "270 мм",
      strokeLength: "2100 мм",
      chassis: "VOLVO FM",
      engine: "VOLVO D13K",
      power: "500 л.с.",
      maxSpeed: "85 км/ч",
    },
    delivery: {
      location: "Владивосток",
      term: "45-60 дней",
      warranty: "18 месяцев",
      payment: "Предоплата 40%, остальное при поставке",
    },
  },
}

export default function Sany620C10ClientPage() {
  return <ProductPage data={sany620C10Data} />
}
