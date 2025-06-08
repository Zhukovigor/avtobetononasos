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

const sany530SData: ProductData = {
  model: "SANY SYM5365THBFS 530S",
  title: "SANY SYM5365THBFS 530S",
  subtitle: "Автобетононасос с высотой подачи 53 метра",
  image: "/images/pump1.jpg",
  keySpecs: {
    height: "53м",
    performance: "180 м³/ч",
    reach: "48.5м",
    weight: "36 500 кг",
  },
  specifications: {
    general: [
      { icon: <Ruler className="w-4 h-4" />, label: "Длина", value: "14 500 мм", highlight: false },
      { icon: <Ruler className="w-4 h-4" />, label: "Ширина", value: "2 500 мм", highlight: false },
      { icon: <ArrowUp className="w-4 h-4" />, label: "Высота", value: "4 000 мм", highlight: false },
      { icon: <Weight className="w-4 h-4" />, label: "Масса", value: "36 500 кг", highlight: true },
    ],
    boom: [
      { icon: <ArrowUp className="w-4 h-4" />, label: "Вертикальный вылет", value: "53.0 м", highlight: true },
      { icon: <ArrowRight className="w-4 h-4" />, label: "Горизонтальный вылет", value: "48.5 м", highlight: true },
      { icon: <ArrowDown className="w-4 h-4" />, label: "Глубина подачи", value: "38.5 м", highlight: false },
      { icon: <Target className="w-4 h-4" />, label: "Минимальный радиус", value: "7.5 м", highlight: false },
    ],
    pump: [
      { icon: <Activity className="w-4 h-4" />, label: "Производительность", value: "180 м³/ч", highlight: true },
      { icon: <Gauge className="w-4 h-4" />, label: "Давление бетона", value: "8.5 МПа", highlight: false },
      { icon: <Settings className="w-4 h-4" />, label: "Диаметр цилиндра", value: "260 мм", highlight: false },
      { icon: <Ruler className="w-4 h-4" />, label: "Длина хода", value: "2100 мм", highlight: false },
    ],
    chassis: [
      { icon: <Car className="w-4 h-4" />, label: "Шасси", value: "VOLVO FM", highlight: false },
      { icon: <Engine className="w-4 h-4" />, label: "Двигатель", value: "VOLVO D13K", highlight: false },
      { icon: <Zap className="w-4 h-4" />, label: "Мощность", value: "460 л.с.", highlight: false },
      { icon: <Gauge className="w-4 h-4" />, label: "Макс. скорость", value: "85 км/ч", highlight: false },
    ],
  },
  features: [
    "Высокая производительность до 180 м³/ч",
    "Надежная гидравлическая система SANY",
    "Автоматическая система смазки",
    "Система контроля давления и температуры",
    "Эргономичная кабина оператора",
    "Система автоматической промывки",
  ],
  advantages: [
    "Оптимальное соотношение цена/качество",
    "Низкие эксплуатационные расходы",
    "Высокая надежность и долговечность",
    "Простота в обслуживании",
    "Быстрая окупаемость инвестиций",
    "Полная техническая поддержка",
  ],
  delivery: {
    location: "Владивосток",
    term: "30-45 дней",
    warranty: "12 месяцев",
    payment: "Предоплата 30%, остальное при поставке",
  },
  pdfData: {
    model: "SANY SYM5365THBFS 530S",
    height: "53м",
    performance: "180 м³/ч",
    image: "/images/pump1.jpg",
    specs: {
      length: "14 500 мм",
      width: "2 500 мм",
      height: "4 000 мм",
      weight: "36 500 кг",
      verticalReach: "53.0 м",
      horizontalReach: "48.5 м",
      depthReach: "38.5 м",
      minRadius: "7.5 м",
      performanceLow: "180 м³/ч",
      pressureLow: "8.5 МПа",
      cylinderDiameter: "260 мм",
      strokeLength: "2100 мм",
      chassis: "VOLVO FM",
      engine: "VOLVO D13K",
      power: "460 л.с.",
      maxSpeed: "85 км/ч",
    },
    delivery: {
      location: "Владивосток",
      term: "30-45 дней",
      warranty: "12 месяцев",
      payment: "Предоплата 30%, остальное при поставке",
    },
  },
}

export default function Sany530SClientPage() {
  return <ProductPage data={sany530SData} />
}
