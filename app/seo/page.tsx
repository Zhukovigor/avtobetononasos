"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, Target, FileText, Code, Globe, TrendingUp, RefreshCw } from "lucide-react"
import Link from "next/link"
import SEODataSourceIndicator from "../components/seo-data-source-indicator"

export default function SEOPage() {
  const [activeTab, setActiveTab] = useState("monitor")

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">SEO Управление</h1>
            <p className="text-gray-400">Комплексное управление SEO для сайта автобетононасосов SANY</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" /> На главную
            </Button>
          </Link>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-zinc-900/50 backdrop-blur-sm p-1 rounded-lg">
            <TabsList className="grid grid-cols-5 bg-transparent">
              <TabsTrigger value="monitor" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Search className="mr-2 h-4 w-4" />
                Мониторинг
              </TabsTrigger>
              <TabsTrigger value="semantic" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Target className="mr-2 h-4 w-4" />
                Семантика
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <FileText className="mr-2 h-4 w-4" />
                Рекомендации
              </TabsTrigger>
              <TabsTrigger value="technical" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Code className="mr-2 h-4 w-4" />
                Технический SEO
              </TabsTrigger>
              <TabsTrigger value="strategy" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <TrendingUp className="mr-2 h-4 w-4" />
                Стратегия
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="monitor" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-white">Мониторинг позиций</CardTitle>
                    <CardDescription>Отслеживание позиций в поисковых системах</CardDescription>
                  </div>
                  <SEODataSourceIndicator source="Google Search Console" timestamp="2024-01-08T16:30:00Z" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Отслеживаемые ключевые слова</div>
                      <div className="text-2xl font-bold">6</div>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">В ТОП-10</div>
                      <div className="text-2xl font-bold text-green-500">3</div>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Средняя позиция</div>
                      <div className="text-2xl font-bold text-yellow-500">14.2</div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link href="/seo-monitor">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Search className="mr-2 h-4 w-4" />
                        Открыть полный мониторинг
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Трафик</CardTitle>
                  <CardDescription>Посещаемость сайта</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center bg-zinc-800 rounded-lg">
                    <div className="text-center">
                      <p className="text-gray-400 mb-2">График посещаемости</p>
                      <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Обновить данные
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Источники трафика</CardTitle>
                  <CardDescription>Каналы привлечения посетителей</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Search className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Органический поиск</span>
                      </div>
                      <span className="font-medium">64%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-green-500" />
                        <span>Прямые переходы</span>
                      </div>
                      <span className="font-medium">21%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-yellow-500" />
                        <span>Реклама</span>
                      </div>
                      <span className="font-medium">15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="semantic" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Семантическое ядро</CardTitle>
                <CardDescription>Управление ключевыми словами</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-400">Семантическое ядро содержит 42 ключевых слова в 5 группах</p>

                  <div className="mt-6">
                    <Link href="/semantic-core">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Target className="mr-2 h-4 w-4" />
                        Открыть семантическое ядро
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">SEO Рекомендации</CardTitle>
                <CardDescription>Автоматические рекомендации по оптимизации</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-400">Система сформировала 8 рекомендаций для улучшения SEO</p>

                  <div className="mt-6">
                    <Link href="/seo-recommendations">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <FileText className="mr-2 h-4 w-4" />
                        Открыть рекомендации
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Технический SEO</CardTitle>
                <CardDescription>Техническая оптимизация сайта</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Скорость загрузки</div>
                      <div className="text-2xl font-bold text-green-500">87/100</div>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Мобильная версия</div>
                      <div className="text-2xl font-bold text-yellow-500">92/100</div>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Индексация</div>
                      <div className="text-2xl font-bold text-green-500">100%</div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Code className="mr-2 h-4 w-4" />
                      Запустить технический аудит
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Контент-стратегия</CardTitle>
                <CardDescription>Планирование и создание контента</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-400">Контент-план на текущий месяц содержит 5 статей</p>

                  <div className="mt-6">
                    <Link href="/content-strategy">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Открыть контент-стратегию
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
