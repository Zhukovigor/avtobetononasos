"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ModelData {
  id: string
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
    general: Array<{ label: string; value: string; highlight?: boolean }>
    boom: Array<{ label: string; value: string; highlight?: boolean }>
    pump: Array<{ label: string; value: string; highlight?: boolean }>
    chassis: Array<{ label: string; value: string; highlight?: boolean }>
  }
  features: string[]
  advantages: string[]
  delivery: {
    location: string
    term: string
    warranty: string
    payment: string
  }
}

interface ModelContextType {
  getModelData: (modelId: string) => Promise<ModelData | null>
  isLoading: boolean
}

const ModelContext = createContext<ModelContextType | undefined>(undefined)

export function ModelDataProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)

  const getModelData = async (modelId: string): Promise<ModelData | null> => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/models?id=${modelId}`)
      const result = await response.json()

      if (result.success) {
        return result.data
      }
      return null
    } catch (error) {
      console.error("Ошибка загрузки данных модели:", error)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return <ModelContext.Provider value={{ getModelData, isLoading }}>{children}</ModelContext.Provider>
}

export function useModelData() {
  const context = useContext(ModelContext)
  if (context === undefined) {
    throw new Error("useModelData must be used within a ModelDataProvider")
  }
  return context
}
