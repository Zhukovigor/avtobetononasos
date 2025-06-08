import fs from "fs"
import path from "path"

const modelsFilePath = path.join(process.cwd(), "data", "models.json")

// Функция для загрузки данных из файла
export function loadModelsData() {
  try {
    if (!fs.existsSync(modelsFilePath)) {
      return []
    }
    const fileData = fs.readFileSync(modelsFilePath, "utf8")
    return JSON.parse(fileData || "[]")
  } catch (error) {
    console.error("Ошибка при чтении файла моделей:", error)
    return []
  }
}

// Функция для сохранения данных в файл
export function saveModelsData(data: any[]) {
  try {
    const dirPath = path.dirname(modelsFilePath)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
    fs.writeFileSync(modelsFilePath, JSON.stringify(data, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Ошибка при записи файла моделей:", error)
    return false
  }
}

// Вспомогательные функции для работы с моделями
export function getModelById(id: string) {
  const models = loadModelsData()
  return models.find((model) => model.id === id) || null
}

export function loadModels() {
  return loadModelsData()
}

export function addModel(modelData: any) {
  const models = loadModelsData()

  // Генерируем ID, если его нет
  if (!modelData.id) {
    modelData.id = `model-${Date.now()}`
  }

  models.push(modelData)
  saveModelsData(models)
  return modelData
}

export function updateModel(id: string, updateData: any) {
  const models = loadModelsData()
  const index = models.findIndex((model) => model.id === id)

  if (index === -1) {
    return null
  }

  models[index] = { ...models[index], ...updateData }
  saveModelsData(models)
  return models[index]
}

export function deleteModel(id: string) {
  const models = loadModelsData()
  const initialLength = models.length
  const filteredModels = models.filter((model) => model.id !== id)

  if (filteredModels.length === initialLength) {
    return false
  }

  saveModelsData(filteredModels)
  return true
}
