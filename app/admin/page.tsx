"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth, getUserRole } from "@/lib/firebase"
import type { UserRole } from "@/types/user"
import { UserRoleBadge } from "@/components/user-role-badge"
import { AlertTriangle, Settings, Shield, Users, Video, Key } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { VideoUpload } from "@/components/video-upload"
import { VideoLibrary } from "@/components/video-library"
import { VideoPlayer } from "@/components/video-player"
import { PageBackground } from "@/components/page-background"
import { TrafficAnalytics } from "@/components/traffic-analytics"
import { VehicleDatabase } from "@/components/vehicle-database"

// Mock users data
const mockUsers = [
  { id: "user-1", name: "John Doe", email: "john@example.com", role: "driver", lastActive: new Date() },
  { id: "user-2", name: "Jane Smith", email: "jane@example.com", role: "authority", lastActive: new Date() },
  { id: "user-3", name: "Bob Johnson", email: "bob@example.com", role: "driver", lastActive: new Date() },
  { id: "user-4", name: "Alice Brown", email: "alice@example.com", role: "authority", lastActive: new Date() },
  { id: "user-5", name: "Charlie Wilson", email: "charlie@example.com", role: "driver", lastActive: new Date() },
]

// Mock system logs
const mockLogs = [
  { id: "log-1", timestamp: new Date(), level: "info", message: "System started successfully", user: "System" },
  {
    id: "log-2",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    level: "warning",
    message: "High traffic detected in Downtown area",
    user: "Traffic Monitor",
  },
  {
    id: "log-3",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    level: "error",
    message: "Camera 3 connection lost",
    user: "System",
  },
  {
    id: "log-4",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    level: "info",
    message: "User john@example.com logged in",
    user: "Auth Service",
  },
  {
    id: "log-5",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    level: "warning",
    message: "Multiple speed violations detected at Highway Junction",
    user: "Speed Monitor",
  },
]

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
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

  // If not an authority, don't render the admin page
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
                <Link href="/admin" className="transition-colors hover:text-foreground/80 font-bold">
                  Admin
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
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage users, system settings, and view logs.</p>
              </div>
              <div>
                <Link href="/admin/authority-ids">
                  <Button>
                    <Key className="mr-2 h-4 w-4" />
                    Manage Authority IDs
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-background/90">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockUsers.length}</div>
                  <p className="text-xs text-muted-foreground">+2 from last week</p>
                </CardContent>
              </Card>
              <Card className="bg-background/90">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Authority Users</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockUsers.filter((u) => u.role === "authority").length}</div>
                  <p className="text-xs text-muted-foreground">No change</p>
                </CardContent>
              </Card>
              <Card className="bg-background/90">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Warnings</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockLogs.filter((log) => log.level === "warning").length}</div>
                  <p className="text-xs text-muted-foreground">+1 from yesterday</p>
                </CardContent>
              </Card>
              <Card className="bg-background/90">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Traffic Videos</CardTitle>
                  <Video className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+3 new uploads</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="users" className="space-y-4">
              <TabsList>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="logs">System Logs</TabsTrigger>
                <TabsTrigger value="videos">Traffic Videos</TabsTrigger>
                <TabsTrigger value="database">Vehicle Database</TabsTrigger>
                <TabsTrigger value="settings">System Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="users" className="space-y-4">
                <Card className="bg-background/90">
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>View and manage system users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Last Active</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <UserRoleBadge role={user.role as UserRole} />
                            </TableCell>
                            <TableCell>{user.lastActive.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="logs" className="space-y-4">
                <Card className="bg-background/90">
                  <CardHeader>
                    <CardTitle>System Logs</CardTitle>
                    <CardDescription>View system activity and error logs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>Level</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Source</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell>{log.timestamp.toLocaleString()}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  log.level === "error"
                                    ? "bg-red-100 text-red-800"
                                    : log.level === "warning"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {log.level}
                              </span>
                            </TableCell>
                            <TableCell>{log.message}</TableCell>
                            <TableCell>{log.user}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="videos" className="space-y-4">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-6">
                    <VideoUpload onUploadComplete={(video) => setSelectedVideo(video)} />
                  </div>
                  <div className="space-y-6">
                    {selectedVideo ? (
                      <VideoPlayer
                        videoUrl={selectedVideo.url}
                        videoTitle={selectedVideo.title}
                        videoDescription={selectedVideo.description}
                      />
                    ) : (
                      <VideoLibrary onSelectVideo={setSelectedVideo} />
                    )}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="database" className="space-y-4">
                <VehicleDatabase />
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
                <Card className="bg-background/90">
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>Configure system-wide settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <h3 className="text-lg font-medium">Notification Settings</h3>
                        <p className="text-sm text-muted-foreground">
                          Configure how and when notifications are sent to users
                        </p>
                        <div className="flex justify-end">
                          <Button>Configure Notifications</Button>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <h3 className="text-lg font-medium">Camera Settings</h3>
                        <p className="text-sm text-muted-foreground">Configure default settings for new cameras</p>
                        <div className="flex justify-end">
                          <Button>Configure Cameras</Button>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <h3 className="text-lg font-medium">Speed Limit Settings</h3>
                        <p className="text-sm text-muted-foreground">
                          Configure default speed limits for different zone types
                        </p>
                        <div className="flex justify-end">
                          <Button>Configure Speed Limits</Button>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <h3 className="text-lg font-medium">System Maintenance</h3>
                        <p className="text-sm text-muted-foreground">Schedule system maintenance and backups</p>
                        <div className="flex justify-end">
                          <Button>Configure Maintenance</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <TrafficAnalytics />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </PageBackground>
  )
}

