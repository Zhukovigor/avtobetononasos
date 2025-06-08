"use client"

import { useState, useEffect } from "react"

interface MediaItem {
  id: string
  name: string
  type: "image" | "video" | "document" | "other"
  url: string
  size: number
  dimensions?: string
  createdAt: string
  updatedAt: string
  alt?: string
  tags: string[]
}

export default function MediaManagementContent() {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    alt: "",
    tags: "",
  })

  // Загрузка медиа
  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    setLoading(true)
    setError(null)

    try {
      // В реальном приложении здесь будет запрос к API
      // const response = await fetch("/api/media")
      // const data = await response.json()

      // Моковые данные для демонстрации
      const mockMedia: MediaItem[] = [
        {
          id: "1",
          name: "pump1.jpg",
          type: "image",
          url: "/images/pump1.jpg",
          size: 1024000,
          dimensions: "2560x1920",
          createdAt: "2023-12-01T10:00:00Z",
          updatedAt: "2023-12-01T10:00:00Z",
          alt: "Автобетононасос SANY 530S",
          tags: ["автобетононасос", "SANY", "530S"],
        },
        {
          id: "2",
          name: "pump2.jpg",
          type: "image",
          url: "/images/pump2.jpg",
          size: 820000,
          dimensions: "1280x960",
          createdAt: "2023-12-02T11:30:00Z",
          updatedAt: "2023-12-02T11:30:00Z",
          alt: "Автобетононасос SANY 370C-10",
          tags: ["автобетононасос", "SANY", "370C-10"],
        },
        {
          id: "3",
          name: "pump3.jpg",
          type: "image",
          url: "/images/pump3.jpg",
          size: 750000,
          dimensions: "1280x959",
          createdAt: "2023-12-03T14:15:00Z",
          updatedAt: "2023-12-03T14:15:00Z",
          alt: "Автобетононасос SANY 710S",
          tags: ["автобетононасос", "SANY", "710S"],
        },
        {
          id: "4",
          name: "catalog.pdf",
          type: "document",
          url: "/documents/catalog.pdf",
          size: 2500000,
          createdAt: "2023-12-10T09:45:00Z",
          updatedAt: "2023-12-10T09:45:00Z",
          tags: ["каталог", "документация", "PDF"],
        },
        {
          id: "5",
          name: "presentation.mp4",
          type: "video",
          url: "/videos/presentation.mp4",
          size: 15000000,
          createdAt: "2023-12-15T16:20:00Z",
          updatedAt: "2023-12-15T16:20:00Z",
          tags: ["презентация", "видео"],
        },
      ]

      setMedia(mockMedia)
    } catch (err) {
      setError("Ошибка при загрузке медиафайлов")
      console.error("Error fetching media", err)
    } finally {
      setLoading(false)
    }
  }
}
