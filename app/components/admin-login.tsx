"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { loginAsAdmin } from "@/app/hooks/useAdminAuth"
import { Shield, Eye, EyeOff } from "lucide-react"

interface AdminLoginProps {
  onLoginSuccess: () => void
  trigger?: React.ReactNode
}

export default function AdminLogin({ onLoginSuccess, trigger }: AdminLoginProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = loginAsAdmin(password)

      if (success) {
        toast({
          title: "✅ Вход выполнен",
          description: "Добро пожаловать в админ режим",
        })
        setIsOpen(false)
        setPassword("")
        onLoginSuccess()
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Shield className="w-4 h-4 mr-2" />
            Админ
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Вход в админ режим
          </DialogTitle>
          <DialogDescription>Введите пароль для доступа к функциям редактирования</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-password">Пароль администратора</Label>
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
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
              Отмена
            </Button>
            <Button type="submit" disabled={isLoading || !password.trim()}>
              {isLoading ? "Вход..." : "Войти"}
            </Button>
          </div>
        </form>

        <div className="text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded-lg">
          <strong>Для демонстрации:</strong> пароль "admin2024"
        </div>
      </DialogContent>
    </Dialog>
  )
}
