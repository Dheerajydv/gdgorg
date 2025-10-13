"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { validateCredentials } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const user = validateCredentials(username, password)

    if (user) {
      login(user)
      router.push("/dashboard")
    } else {
      setError("Invalid username or password. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center">
            <Image src="/gdg-logo.png" alt="GDG Logo" width={120} height={120} className="h-24 w-24" />
          </div>
          <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground">GDG ADMIN PORTAL</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to manage your GDG chapter</p>
        </div>

        {/* Login form */}
        <div className="border border-border bg-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-bold uppercase">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="member@gdg@2025"
                required
                className="rounded-none border-2 focus:border-[#4285F4]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-bold uppercase">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="rounded-none border-2 focus:border-[#4285F4]"
              />
            </div>

            {error && (
              <Alert className="rounded-none border-2 border-[#EA4335] bg-[#EA4335]/10">
                <AlertDescription className="text-[#EA4335] font-medium">{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-none bg-[#4285F4] py-6 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#357ae8]"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 border-t border-border pt-6">
            <p className="text-xs text-muted-foreground">
              Demo credentials:
              <br />
              <span className="font-mono">member@gdg@2025</span>
              <br />
              <span className="font-mono text-[10px]">name_surname_12345678900987654321</span>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">Google Developer Groups Admin Portal © 2025</p>
      </div>
    </div>
  )
}
