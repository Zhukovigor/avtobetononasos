"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SEODataSources() {
  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">📊 Источники данных для SEO мониторинга</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Текущее состояние */}
            <div className="bg-yellow-900/30 border border-yellow-800 rounded-lg p-4">
              <h3 className="text-yellow-400 font-bold mb-2">⚠️ Текущее состояние (ДЕМО)</h3>
              <p className="text-gray-300 text-sm">
                Сейчас данные генерируются случайным образом для демонстрации функциональности. Это позволяет показать,
                как будет работать система с реальными данными.
              </p>
            </div>

            {/* Реальные источники данных */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Google Search Console */}
              <div className="bg-zinc-800 p-4 rounded-lg">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  🔍 Google Search Console
                  <span className="text-xs bg-green-600 px-2 py-1 rounded">БЕСПЛАТНО</span>
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Реальные позиции в Google</li>
                  <li>• Показы и клики</li>
                  <li>• CTR по запросам</li>
                  <li>• Данные за любой период</li>
                </ul>
                <div className="mt-3 text-xs text-gray-400">API: searchconsole.googleapis.com</div>
              </div>

              {/* Яндекс.Вебмастер */}
              <div className="bg-zinc-800 p-4 rounded-lg">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  🟡 Яндекс.Вебмастер
                  <span className="text-xs bg-green-600 px-2 py-1 rounded">БЕСПЛАТНО</span>
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Позиции в Яндексе</li>
                  <li>• Поисковые запросы</li>
                  <li>• Индексация страниц</li>
                  <li>• Технические ошибки</li>
                </ul>
                <div className="mt-3 text-xs text-gray-400">API: api.webmaster.yandex.net</div>
              </div>

              {/* SEMrush */}
              <div className="bg-zinc-800 p-4 rounded-lg">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  📈 SEMrush
                  <span className="text-xs bg-red-600 px-2 py-1 rounded">ПЛАТНО</span>
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Позиции конкурентов</li>
                  <li>• Объемы поиска</li>
                  <li>• Сложность ключевых слов</li>
                  <li>• Исторические данные</li>
                </ul>
                <div className="mt-3 text-xs text-gray-400">API: api.semrush.com</div>
              </div>

              {/* Ahrefs */}
              <div className="bg-zinc-800 p-4 rounded-lg">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  🔗 Ahrefs
                  <span className="text-xs bg-red-600 px-2 py-1 rounded">ПЛАТНО</span>
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Детальная аналитика позиций</li>
                  <li>• Анализ обратных ссылок</li>
                  <li>• Исследование ключевых слов</li>
                  <li>• Мониторинг конкурентов</li>
                </ul>
                <div className="mt-3 text-xs text-gray-400">API: ahrefs.com/api</div>
              </div>
            </div>

            {/* Как подключить реальные данные */}
            <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4">
              <h3 className="text-blue-400 font-bold mb-3">🔧 Как подключить реальные данные</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="text-white font-semibold">1. Google Search Console (рекомендуется начать с этого)</h4>
                  <p className="text-gray-300">
                    • Создать проект в Google Cloud Console
                    <br />• Получить API ключи
                    <br />• Настроить OAuth 2.0
                    <br />• Добавить домен в Search Console
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold">2. Яндекс.Вебмастер</h4>
                  <p className="text-gray-300">
                    • Зарегистрироваться в Яндекс.Вебмастер
                    <br />• Получить OAuth токен
                    <br />• Добавить сайт для мониторинга
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold">3. Платные сервисы (SEMrush, Ahrefs)</h4>
                  <p className="text-gray-300">
                    • Оформить подписку
                    <br />• Получить API ключи
                    <br />• Настроить лимиты запросов
                  </p>
                </div>
              </div>
            </div>

            {/* Переменные окружения */}
            <div className="bg-zinc-800 p-4 rounded-lg">
              <h4 className="text-white font-bold mb-3">🔐 Необходимые переменные окружения</h4>
              <pre className="text-xs text-gray-300 bg-black p-3 rounded overflow-x-auto">
                {`# Google Search Console
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_ACCESS_TOKEN=your_access_token

# Яндекс.Вебмастер
YANDEX_WEBMASTER_TOKEN=your_oauth_token

# SEMrush
SEMRUSH_API_KEY=your_api_key

# Ahrefs
AHREFS_API_TOKEN=your_api_token`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
