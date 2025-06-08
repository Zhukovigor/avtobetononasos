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

const sany710SData: ProductData = {
  model: "SANY SYM5552THB 710S",
  title: "SANY SYM5552THB 710S",
  subtitle: "Мощный автобетононасос с высотой подачи 71 метр",
  image: "/images/pump3.jpg",
  keySpecs: {
    height: "71м",
    performance: "180 м³/ч",
    reach: "65.5м",
    weight: "54 500 кг",
  },
  specifications: {
    general: [
      { icon: <Ruler className="w-4 h-4" />, label: "Длина", value: "16 800 мм", highlight: false },
      { icon: <Ruler className="w-4 h-4" />, label: "Ширина", value: "2 550 мм", highlight: false },
      { icon: <ArrowUp className="w-4 h-4" />, label: "Высота", value: "4 000 мм", highlight: false },
      { icon: <Weight className="w-4 h-4" />, label: "Масса", value: "54 500 кг", highlight: true },
    ],
    boom: [
      { icon: <ArrowUp className="w-4 h-4" />, label: "Вертикальный вылет", value: "71.0 м", highlight: true },
      { icon: <ArrowRight className="w-4 h-4" />, label: "Горизонтальный вылет", value: "65.5 м", highlight: true },
      { icon: <ArrowDown className="w-4 h-4" />, label: "Глубина подачи", value: "55.5 м", highlight: false },
      { icon: <Target className="w-4 h-4" />, label: "Минимальный радиус", value: "8.5 м", highlight: false },
    ],
    pump: [
      { icon: <Activity className="w-4 h-4" />, label: "Производительность", value: "180 м³/ч", highlight: true },
      { icon: <Gauge className="w-4 h-4" />, label: "Давление бетона", value: "9.0 МПа", highlight: false },
      { icon: <Settings className="w-4 h-4" />, label: "Диаметр цилиндра", value: "280 мм", highlight: false },
      { icon: <Ruler className="w-4 h-4" />, label: "Длина хода", value: "2300 мм", highlight: false },
    ],
    chassis: [
      { icon: <Car className="w-4 h-4" />, label: "Шасси", value: "VOLVO FMX", highlight: false },
      { icon: <Engine className="w-4 h-4" />, label: "Двигатель", value: "VOLVO D13K", highlight: false },
      { icon: <Zap className="w-4 h-4" />, label: "Мощность", value: "540 л.с.", highlight: false },
      { icon: <Gauge className="w-4 h-4" />, label: "Макс. скорость", value: "85 км/ч", highlight: false },
    ],
  },
  features: [
    "Максимальная высота подачи в своем классе",
    "Усиленная конструкция стрелы",
    "Система активной стабилизации",
    "Интеллектуальная система управления",
    "Повышенная производительность насоса",
    "Система предотвращения блокировки",
  ],
  advantages: [
    "Идеален для высотного строительства",
    "Максимальная эффективность работы",
    "Минимальное время простоя",
    "Высокая точность позиционирования",
    "Превосходная устойчивость",
    "Профессиональная техподдержка 24/7",
  ],
  delivery: {
    location: "Владивосток",
    term: "45-60 дней",
    warranty: "18 месяцев",
    payment: "Предоплата 40%, остальное при поставке",
  },
  pdfData: {
    model: "SANY SYM5552THB 710S",
    height: "71м",
    performance: "180 м³/ч",
    image: "/images/pump3.jpg",
    specs: {
      length: "16 800 мм",
      width: "2 550 мм",
      height: "4 000 мм",
      weight: "54 500 кг",
      verticalReach: "71.0 м",
      horizontalReach: "65.5 м",
      depthReach: "55.5 м",
      minRadius: "8.5 м",
      performanceLow: "180 м³/ч",
      pressureLow: "9.0 МПа",
      cylinderDiameter: "280 мм",
      strokeLength: "2300 мм",
      chassis: "VOLVO FMX",
      engine: "VOLVO D13K",
      power: "540 л.с.",
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

export default function Sany710SClientPage() {
  return <ProductPage data={sany710SData} />
}
