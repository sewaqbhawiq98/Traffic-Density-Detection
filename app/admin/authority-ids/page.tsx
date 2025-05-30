"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth, getUserRole } from "@/lib/firebase"
import type { UserRole } from "@/types/user"
import { UserRoleBadge } from "@/components/user-role-badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageBackground } from "@/components/page-background"
import { AuthorityIdManager } from "@/components/authority-id-manager"

export default function AuthorityIdsPage() {
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        // Get user role from Firestore
        const role = await getUserRole(user.uid)
        setUserRole(role)

        // Redirect if not an authority
        if (role !== "authority") {
          router.push("/dashboard")
        } else {
          // Set admin authentication in localStorage
          localStorage.setItem("adminAuthenticated", "true")
        }
      } else {
        router.push("/login")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  // If not an authority, don't render the page
  if (userRole !== "authority") {
    return null
  }

  return (
    <PageBackground imageUrl="/images/admin-dashboard.jpg" opacity={0.06}>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold">Traffic Safety System</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
                <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
                  Dashboard
                </Link>
                <Link href="/cameras" className="transition-colors hover:text-foreground/80">
                  Cameras
                </Link>
                <Link href="/analytics" className="transition-colors hover:text-foreground/80">
                  Analytics
                </Link>
                <Link href="/admin" className="transition-colors hover:text-foreground/80">
                  Admin
                </Link>
                <Link href="/admin/authority-ids" className="transition-colors hover:text-foreground/80 font-bold">
                  Authority IDs
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Welcome, {user?.displayName || user?.email}</span>
                {userRole && <UserRoleBadge role={userRole} />}
              </div>
              <ThemeToggle />
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 container py-6">
          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Authority ID Management</h1>
                <p className="text-muted-foreground">Generate and manage Authority IDs for registration</p>
              </div>
            </div>

            <AuthorityIdManager />
          </div>
        </main>
      </div>
    </PageBackground>
  )
}

