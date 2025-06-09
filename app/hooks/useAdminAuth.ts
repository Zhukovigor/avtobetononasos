"use client"

import { useState, useEffect } from "react"

interface AdminAuthState {
  isAdmin: boolean
  isLoading: boolean
  error: string | null
}

export function useAdminAuth(): AdminAuthState {
  const [state, setState] = useState<AdminAuthState>({
    isAdmin: false,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    checkAdminStatus()
  }, [])

  const checkAdminStatus = async () => {
    try {
      // Проверяем localStorage на наличие админского токена
      const adminToken = localStorage.getItem("admin_token")
      const adminSession = localStorage.getItem("admin_session")

      if (!adminToken || !adminSession) {
        setState({
          isAdmin: false,
          isLoading: false,
          error: null,
        })
        return
      }

      // Проверяем срок действия сессии
      const sessionData = JSON.parse(adminSession)
      const now = Date.now()

      if (sessionData.expires && now > sessionData.expires) {
        localStorage.removeItem("admin_token")
        localStorage.removeItem("admin_session")
        setState({
          isAdmin: false,
          isLoading: false,
          error: "Сессия истекла",
        })
        return
      }

      // Проверка токена
      if (adminToken === "admin_access_token_2024") {
        setState({
          isAdmin: true,
          isLoading: false,
          error: null,
        })
      } else {
        setState({
          isAdmin: false,
          isLoading: false,
          error: "Неверный токен",
        })
      }
    } catch (error) {
      console.error("Ошибка проверки прав администратора:", error)
      setState({
        isAdmin: false,
        isLoading: false,
        error: "Ошибка проверки прав",
      })
    }
  }

  return state
}

// Функция для входа в админ панель
export function loginAsAdmin(password: string): boolean {
  // Проверка пароля
  if (password === "Zhukovigor65146") {
    const sessionData = {
      loginTime: Date.now(),
      expires: Date.now() + 24 * 60 * 60 * 1000, // 24 часа
    }

    localStorage.setItem("admin_token", "admin_access_token_2024")
    localStorage.setItem("admin_session", JSON.stringify(sessionData))
    return true
  }
  return false
}

// Функция для выхода из админ панели
export function logoutAdmin(): void {
  localStorage.removeItem("admin_token")
  localStorage.removeItem("admin_session")
  window.location.href = "/" // Перенаправляем на главную страницу
}
