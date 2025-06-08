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

const sany370C10Data: ProductData = {
  model: "SANY SYM5230THBF 370C-10",
  title: "SANY SYM5230THBF 370C-10",
  subtitle: "Компактный автобетононасос с высотой подачи 37 метров",
  image: "/images/pump2.jpg",
  keySpecs: {
    height: "37м",
    performance: "125 м³/ч",
    reach: "33.5м",
    weight: "28 500 кг",
  },
  specifications: {
    general: [
      { icon: <Ruler className="w-4 h-4" />, label: "Длина", value: "12 500 мм", highlight: false },
      { icon: <Ruler className="w-4 h-4" />, label: "Ширина", value: "2 500 мм", highlight: false },
      { icon: <ArrowUp className="w-4 h-4" />, label: "Высота", value: "3 800 мм", highlight: false },
      { icon: <Weight className="w-4 h-4" />, label: "Масса", value: "28 500 кг", highlight: true },
    ],
    boom: [
      { icon: <ArrowUp className="w-4 h-4" />, label: "Вертикальный вылет", value: "37.0 м", highlight: true },
      { icon: <ArrowRight className="w-4 h-4" />, label: "Горизонтальный вылет", value: "33.5 м", highlight: true },
      { icon: <ArrowDown className="w-4 h-4" />, label: "Глубина подачи", value: "28.5 м", highlight: false },
      { icon: <Target className="w-4 h-4" />, label: "Минимальный радиус", value: "6.5 м", highlight: false },
    ],
    pump: [
      { icon: <Activity className="w-4 h-4" />, label: "Производительность", value: "125 м³/ч", highlight: true },
      { icon: <Gauge className="w-4 h-4" />, label: "Давление бетона", value: "8.0 МПа", highlight: false },
      { icon: <Settings className="w-4 h-4" />, label: "Диаметр цилиндра", value: "230 мм", highlight: false },
      { icon: <Ruler className="w-4 h-4" />, label: "Длина хода", value: "1800 мм", highlight: false },
    ],
    chassis: [
      { icon: <Car className="w-4 h-4" />, label: "Шасси", value: "SANY", highlight: false },
      { icon: <Engine className="w-4 h-4" />, label: "Двигатель", value: "YCK05260-61", highlight: false },
      { icon: <Zap className="w-4 h-4" />, label: "Мощность", value: "370 л.с.", highlight: false },
      { icon: <Gauge className="w-4 h-4" />, label: "Макс. скорость", value: "85 км/ч", highlight: false },
    ],
  },
  features: [
    "Компактные размеры для работы в ограниченном пространстве",
    "Высокая маневренность и проходимость",
    "Экономичный расход топлива",
    "Простота управления и обслуживания",
    "Надежная система охлаждения",
    "Автоматическая диагностика неисправностей",
  ],
  advantages: [
    "Идеален для малоэтажного строительства",
    "Низкая стоимость владения",
    "Быстрая установка и готовность к работе",
    "Минимальные требования к площадке",
    "Высокая точность подачи бетона",
    "Отличная ремонтопригодность",
  ],
  delivery: {
    location: "Владивосток",
    term: "30-45 дней",
    warranty: "12 месяцев",
    payment: "Предоплата 30%, остальное при поставке",
  },
  pdfData: {
    model: "SANY SYM5230THBF 370C-10",
    height: "37м",
    performance: "125 м³/ч",
    image: "/images/pump2.jpg",
    specs: {
      length: "12 500 мм",
      width: "2 500 мм",
      height: "3 800 мм",
      weight: "28 500 кг",
      verticalReach: "37.0 м",
      horizontalReach: "33.5 м",
      depthReach: "28.5 м",
      minRadius: "6.5 м",
      performanceLow: "125 м³/ч",
      pressureLow: "8.0 МПа",
      cylinderDiameter: "230 мм",
      strokeLength: "1800 мм",
      chassis: "ISUZU FVZ",
      engine: "ISUZU 6UZ1",
      power: "370 л.с.",
      maxSpeed: "90 км/ч",
    },
    delivery: {
      location: "Владивосток",
      term: "30-45 дней",
      warranty: "12 месяцев",
      payment: "Предоплата 30%, остальное при поставке",
    },
  },
}

export default function Sany370C10ClientPage() {
  return <ProductPage data={sany370C10Data} />
}
