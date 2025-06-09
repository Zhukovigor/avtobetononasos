"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { loginAsAdmin } from "../hooks/useAdminAuth"
import { Eye, EyeOff, Shield } from "lucide-react"

interface AdminLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Проверяем логин и пароль
      if (username !== "Admin") {
        toast({
          title: "❌ Ошибка входа",
          description: "Неверное имя пользователя",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const success = loginAsAdmin(password)

      if (success) {
        toast({
          title: "✅ Вход выполнен",
          description: "Добро пожаловать в админ панель",
        })
        onClose()
        setUsername("")
        setPassword("")
        window.location.href = "/admin" // Перенаправляем в админ панель
      } else {
        toast({
          title: "❌ Неверный пароль",
          description: "Проверьте правильность введенного пароля",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "❌ Ошибка входа",
        description: "Произошла ошибка при входе в систему",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Вход в админ панель
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-username">Логин</Label>
            <Input
              id="admin-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите логин"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-password">Пароль</Label>
            <div className="relative">
              <Input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                required
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Отмена
            </Button>
            <Button type="submit" disabled={isLoading || !username.trim() || !password.trim()}>
              {isLoading ? "Вход..." : "Войти"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
