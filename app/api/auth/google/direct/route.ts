import { NextResponse } from "next/server"
import { headers } from "next/headers"

// Прямой редирект на Google OAuth без использования fetch
export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID
  let redirectUri = process.env.GOOGLE_REDIRECT_URI

  // Автоматическое определение redirect URI если не установлен
  if (!redirectUri) {
    const headersList = headers()
    const host = headersList.get("host") || "localhost:3000"
    const protocol = host.includes("localhost") ? "http" : "https"
    redirectUri = `${protocol}://${host}/api/auth/google/callback`
  }

  if (!clientId || !redirectUri) {
    return new Response(
      `
      <html>
        <head>
          <title>Ошибка настройки OAuth</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: system-ui, sans-serif; line-height: 1.5; padding: 2rem; max-width: 600px; margin: 0 auto; }
            .error { color: #e11d48; background: #fef2f2; border: 1px solid #fecdd3; padding: 1rem; border-radius: 0.5rem; }
            .code { background: #f1f5f9; padding: 0.5rem; border-radius: 0.25rem; font-family: monospace; }
            h1 { color: #0f172a; }
            a { color: #2563eb; }
          </style>
        </head>
        <body>
          <h1>Ошибка настройки OAuth</h1>
          <div class="error">
            <p><strong>Не настроены переменные окружения:</strong></p>
            <ul>
              ${!clientId ? "<li>GOOGLE_CLIENT_ID отсутствует</li>" : ""}
              ${!redirectUri ? "<li>GOOGLE_REDIRECT_URI отсутствует</li>" : ""}
            </ul>
          </div>
          <h2>Как исправить:</h2>
          <ol>
            <li>Создайте проект в <a href="https://console.cloud.google.com" target="_blank">Google Cloud Console</a></li>
            <li>Включите Google Search Console API</li>
            <li>Создайте OAuth 2.0 Client ID</li>
            <li>Добавьте redirect URI: <code class="code">${redirectUri || "http://localhost:3000/api/auth/google/callback"}</code></li>
            <li>Скопируйте Client ID и Client Secret в .env.local</li>
          </ol>
          <p>После настройки <a href="/admin">вернитесь в админ-панель</a>.</p>
        </body>
      </html>
      `,
      {
        status: 500,
        headers: {
          "Content-Type": "text/html",
        },
      },
    )
  }

  // Параметры для авторизации Google Search Console
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope:
      "https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    access_type: "offline",
    prompt: "consent",
    state: "seo-monitor", // Для безопасности
  })

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`

  return NextResponse.redirect(authUrl)
}
