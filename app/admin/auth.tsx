"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PageBackground } from "@/components/page-background"
import { Lock } from "lucide-react"

export default function AdminAuth() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [attempts, setAttempts] = useState(0)
  const router = useRouter()

  // Check if already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated")
    if (isAuthenticated === "true") {
      router.push("/admin")
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === "Mahakal@123") {
      localStorage.setItem("adminAuthenticated", "true")
      router.push("/admin")
    } else {
      setError("Invalid password")
      setAttempts(attempts + 1)

      // Lock out after 5 attempts
      if (attempts >= 4) {
        setError("Too many failed attempts. Please try again later.")
        setTimeout(() => {
          setAttempts(0)
          setError("")
        }, 30000) // 30 seconds lockout
      }
    }
  }

  return (
    <PageBackground imageUrl="/images/admin-dashboard.jpg" opacity={0.1}>
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Lock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Admin Authentication</CardTitle>
            <CardDescription className="text-center">Please enter the admin password to continue</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  disabled={attempts >= 5}
                  required
                />
              </div>
              {error && <div className="text-sm text-destructive text-center">{error}</div>}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={attempts >= 5}>
                Authenticate
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </PageBackground>
  )
}

