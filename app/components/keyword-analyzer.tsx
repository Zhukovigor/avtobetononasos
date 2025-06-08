"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface KeywordAnalysis {
  keyword: string
  volume: number
  difficulty: number
  competition: string
  intent: string
  suggestions: string[]
  opportunities: string[]
}

export default function KeywordAnalyzer() {
  const [keyword, setKeyword] = useState("")
  const [analysis, setAnalysis] = useState<KeywordAnalysis | null>(null)
  const [loading, setLoading] = useState(false)

  const analyzeKeyword = async () => {
    if (!keyword.trim()) return

    setLoading(true)

    // Симуляция анализа ключевого слова
    setTimeout(() => {
      const mockAnalysis: KeywordAnalysis = {
        keyword: keyword,
        volume: Math.floor(Math.random() * 5000) + 500,
        difficulty: Math.floor(Math.random() * 100),
        competition: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
        intent: ["informational", "commercial", "transactional", "navigational"][Math.floor(Math.random() * 4)],
        suggestions: [
          `${keyword} купить`,
          `${keyword} цена`,
          `${keyword} отзывы`,
          `${keyword} характеристики`,
          `лучший ${keyword}`,
        ],
        opportunities: [
          "Создать подробную страницу товара",
          "Добавить сравнительную таблицу",
          "Написать экспертный обзор",
          "Создать FAQ секцию",
        ],
      }
      setAnalysis(mockAnalysis)
      setLoading(false)
    }, 1500)
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return "text-green-500"
    if (difficulty < 70) return "text-yellow-500"
    return "text-red-500"
  }

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case "low":
        return "text-green-500"
      case "medium":
        return "text-yellow-500"
      case "high":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Анализатор ключевых слов</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Введите ключевое слово для анализа..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700"
              onKeyPress={(e) => e.key === "Enter" && analyzeKeyword()}
            />
            <button
              onClick={analyzeKeyword}
              disabled={loading || !keyword.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-2 rounded-lg transition-colors"
            >
              {loading ? "Анализ..." : "Анализировать"}
            </button>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Анализируем ключевое слово...</p>
            </div>
          )}

          {analysis && !loading && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm">Объем поиска</div>
                  <div className="text-white font-bold text-lg">{analysis.volume.toLocaleString()}</div>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm">Сложность</div>
                  <div className={`font-bold text-lg ${getDifficultyColor(analysis.difficulty)}`}>
                    {analysis.difficulty}%
                  </div>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm">Конкуренция</div>
                  <div className={`font-bold text-lg capitalize ${getCompetitionColor(analysis.competition)}`}>
                    {analysis.competition}
                  </div>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm">Интент</div>
                  <div className="text-white font-bold text-lg capitalize">{analysis.intent}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Связанные запросы</h4>
                  <ul className="space-y-1">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-gray-300 text-sm">
                        • {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Возможности</h4>
                  <ul className="space-y-1">
                    {analysis.opportunities.map((opportunity, index) => (
                      <li key={index} className="text-gray-300 text-sm">
                        • {opportunity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
