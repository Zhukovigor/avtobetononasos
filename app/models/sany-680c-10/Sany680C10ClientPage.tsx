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

const sany680C10Data: ProductData = {
  model: "SANY SYM5590THB 680C-10",
  title: "SANY SYM5590THB 680C-10",
  subtitle: "Высокопроизводительный автобетононасос с высотой подачи 68 метров",
  image: "/images/pump5.jpg",
  keySpecs: {
    height: "68м",
    performance: "180 м³/ч",
    reach: "62.5м",
    weight: "52 000 кг",
  },
  specifications: {
    general: [
      { icon: <Ruler className="w-4 h-4" />, label: "Длина", value: "16 500 мм", highlight: false },
      { icon: <Ruler className="w-4 h-4" />, label: "Ширина", value: "2 550 мм", highlight: false },
      { icon: <ArrowUp className="w-4 h-4" />, label: "Высота", value: "4 000 мм", highlight: false },
      { icon: <Weight className="w-4 h-4" />, label: "Масса", value: "52 000 кг", highlight: true },
    ],
    boom: [
      { icon: <ArrowUp className="w-4 h-4" />, label: "Вертикальный вылет", value: "68.0 м", highlight: true },
      { icon: <ArrowRight className="w-4 h-4" />, label: "Горизонтальный вылет", value: "62.5 м", highlight: true },
      { icon: <ArrowDown className="w-4 h-4" />, label: "Глубина подачи", value: "52.5 м", highlight: false },
      { icon: <Target className="w-4 h-4" />, label: "Минимальный радиус", value: "8.0 м", highlight: false },
    ],
    pump: [
      { icon: <Activity className="w-4 h-4" />, label: "Производительность", value: "180 м³/ч", highlight: true },
      { icon: <Gauge className="w-4 h-4" />, label: "Давление бетона", value: "8.8 МПа", highlight: false },
      { icon: <Settings className="w-4 h-4" />, label: "Диаметр цилиндра", value: "275 мм", highlight: false },
      { icon: <Ruler className="w-4 h-4" />, label: "Длина хода", value: "2200 мм", highlight: false },
    ],
    chassis: [
      { icon: <Car className="w-4 h-4" />, label: "Шасси", value: "VOLVO FMX", highlight: false },
      { icon: <Engine className="w-4 h-4" />, label: "Двигатель", value: "VOLVO D13K", highlight: false },
      { icon: <Zap className="w-4 h-4" />, label: "Мощность", value: "520 л.с.", highlight: false },
      { icon: <Gauge className="w-4 h-4" />, label: "Макс. скорость", value: "85 км/ч", highlight: false },
    ],
  },
  features: [
    "Оптимальная высота подачи 68 метров",
    "Высокая производительность 180 м³/ч",
    "6-секционная телескопическая стрела",
    "Система автоматического управления",
    "Надежная гидравлическая система",
    "Система контроля качества бетона",
  ],
  advantages: [
    "Оптимальное решение для средневысотного строительства",
    "Отличное соотношение цена/производительность",
    "Высокая маневренность на стройплощадке",
    "Низкие затраты на обслуживание",
    "Быстрая установка и готовность к работе",
    "Комплексная гарантийная поддержка",
  ],
  delivery: {
    location: "Владивосток",
    term: "45-60 дней",
    warranty: "18 месяцев",
    payment: "Предоплата 40%, остальное при поставке",
  },
  pdfData: {
    model: "SANY SYM5590THB 680C-10",
    height: "68м",
    performance: "180 м³/ч",
    image: "/images/pump5.jpg",
    specs: {
      length: "16 500 мм",
      width: "2 550 мм",
      height: "4 000 мм",
      weight: "52 000 кг",
      verticalReach: "68.0 м",
      horizontalReach: "62.5 м",
      depthReach: "52.5 м",
      minRadius: "8.0 м",
      performanceLow: "180 м³/ч",
      pressureLow: "8.8 МПа",
      cylinderDiameter: "275 мм",
      strokeLength: "2200 мм",
      chassis: "VOLVO FMX",
      engine: "VOLVO D13K",
      power: "520 л.с.",
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

export default function Sany680C10ClientPage() {
  return <ProductPage data={sany680C10Data} />
}
