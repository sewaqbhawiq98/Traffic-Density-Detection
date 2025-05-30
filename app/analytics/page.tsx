"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { onAuthStateChanged } from "firebase/auth"
import { auth, getUserRole } from "@/lib/firebase"
import type { UserRole } from "@/types/user"
import { UserRoleBadge } from "@/components/user-role-badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageBackground } from "@/components/page-background"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for traffic analytics
const hourlyTrafficData = [
  { hour: "00:00", vehicles: 120 },
  { hour: "02:00", vehicles: 80 },
  { hour: "04:00", vehicles: 60 },
  { hour: "06:00", vehicles: 180 },
  { hour: "08:00", vehicles: 460 },
  { hour: "10:00", vehicles: 380 },
  { hour: "12:00", vehicles: 350 },
  { hour: "14:00", vehicles: 320 },
  { hour: "16:00", vehicles: 480 },
  { hour: "18:00", vehicles: 520 },
  { hour: "20:00", vehicles: 280 },
  { hour: "22:00", vehicles: 160 },
]

const weeklyTrafficData = [
  { day: "Monday", vehicles: 2400 },
  { day: "Tuesday", vehicles: 2100 },
  { day: "Wednesday", vehicles: 2200 },
  { day: "Thursday", vehicles: 2300 },
  { day: "Friday", vehicles: 2800 },
  { day: "Saturday", vehicles: 1800 },
  { day: "Sunday", vehicles: 1500 },
]

const vehicleTypeData = [
  { name: "Cars", value: 4000, color: "#0088FE" },
  { name: "Motorcycles", value: 3000, color: "#00C49F" },
  { name: "Trucks", value: 1000, color: "#FFBB28" },
  { name: "Buses", value: 500, color: "#FF8042" },
  { name: "Bicycles", value: 300, color: "#8884d8" },
]

const speedViolationData = [
  { location: "Highway Junction", violations: 78 },
  { location: "School Zone", violations: 45 },
  { location: "Downtown", violations: 62 },
  { location: "Hospital Area", violations: 38 },
  { location: "Shopping Mall", violations: 56 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export default function AnalyticsPage() {
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
      } else {
        router.push("/login")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <PageBackground imageUrl="/images/traffic-monitoring.jpg" opacity={0.1}>
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
                <Link href="/analytics" className="transition-colors hover:text-foreground/80 font-bold">
                  Analytics
                </Link>
                {userRole === "authority" && (
                  <Link href="/admin" className="transition-colors hover:text-foreground/80">
                    Admin
                  </Link>
                )}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Welcome, {user?.displayName || user?.email}</span>
                {userRole && <UserRoleBadge role={userRole} />}
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="flex-1 container py-6">
          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Traffic Analytics</h1>
                <p className="text-muted-foreground">Comprehensive analysis of traffic patterns and violations</p>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="hourly">Hourly Analysis</TabsTrigger>
                <TabsTrigger value="weekly">Weekly Analysis</TabsTrigger>
                <TabsTrigger value="vehicles">Vehicle Types</TabsTrigger>
                <TabsTrigger value="violations">Speed Violations</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Traffic Density by Hour</CardTitle>
                      <CardDescription>Average number of vehicles per hour</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={hourlyTrafficData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="hour" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="vehicles" name="Vehicles" fill="#0284c7" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Vehicle Type Distribution</CardTitle>
                      <CardDescription>Breakdown of vehicle types detected</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={vehicleTypeData}
                              cx="50%"
                              cy="50%"
                              labelLine={true}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {vehicleTypeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Speed Violations by Location</CardTitle>
                    <CardDescription>Number of speed limit violations detected at each location</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={speedViolationData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="location" type="category" width={150} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="violations" name="Violations" fill="#ef4444" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="hourly">
                <Card>
                  <CardHeader>
                    <CardTitle>Hourly Traffic Analysis</CardTitle>
                    <CardDescription>Detailed breakdown of traffic patterns throughout the day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={hourlyTrafficData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="hour" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="vehicles" name="Vehicles" fill="#0284c7" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-6 space-y-4">
                      <h3 className="text-lg font-medium">Key Insights:</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Peak morning traffic occurs between 8:00 AM and 10:00 AM</li>
                        <li>Peak evening traffic occurs between 4:00 PM and 6:00 PM</li>
                        <li>Lowest traffic volume is observed between 2:00 AM and 4:00 AM</li>
                        <li>Average hourly traffic: 274 vehicles</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="weekly">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Traffic Analysis</CardTitle>
                    <CardDescription>Traffic patterns across different days of the week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyTrafficData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="vehicles" name="Vehicles" fill="#0284c7" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-6 space-y-4">
                      <h3 className="text-lg font-medium">Key Insights:</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Friday has the highest traffic volume with 2,800 vehicles</li>
                        <li>Weekend traffic is approximately 35% lower than weekday traffic</li>
                        <li>Average weekday traffic: 2,360 vehicles</li>
                        <li>Average weekend traffic: 1,650 vehicles</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vehicles">
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Type Distribution</CardTitle>
                    <CardDescription>Analysis of different vehicle types detected in traffic</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={vehicleTypeData}
                              cx="50%"
                              cy="50%"
                              labelLine={true}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={120}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {vehicleTypeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Vehicle Distribution Analysis</h3>
                        <p>
                          The chart shows the distribution of different vehicle types detected by our traffic monitoring
                          system. Cars make up the largest portion at 45%, followed by motorcycles at 34%.
                        </p>
                        <div className="space-y-2">
                          {vehicleTypeData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className="w-3 h-3 rounded-full mr-2"
                                  style={{ backgroundColor: item.color }}
                                ></div>
                                <span>{item.name}</span>
                              </div>
                              <div className="font-medium">{item.value} vehicles</div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="font-medium mb-2">Key Insights:</h4>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>Personal vehicles (cars and motorcycles) account for 79% of traffic</li>
                            <li>Commercial vehicles (trucks and buses) account for 17% of traffic</li>
                            <li>Non-motorized vehicles (bicycles) account for 4% of traffic</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="violations">
                <Card>
                  <CardHeader>
                    <CardTitle>Speed Violation Analysis</CardTitle>
                    <CardDescription>Detailed breakdown of speed limit violations by location</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={speedViolationData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="location" type="category" width={150} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="violations" name="Violations" fill="#ef4444" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-6 space-y-4">
                      <h3 className="text-lg font-medium">Violation Hotspots:</h3>
                      <p>
                        Based on our traffic video analysis, the following locations have been identified as hotspots
                        for speed limit violations. Highway Junction has the highest number of violations, followed by
                        Downtown and Shopping Mall areas.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="border rounded-md p-4 bg-red-50">
                          <h4 className="font-medium text-red-800">High Priority Areas</h4>
                          <ul className="mt-2 space-y-1">
                            <li className="flex justify-between">
                              <span>Highway Junction</span>
                              <span className="font-bold">{speedViolationData[0].violations} violations</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Downtown</span>
                              <span className="font-bold">{speedViolationData[2].violations} violations</span>
                            </li>
                          </ul>
                        </div>
                        <div className="border rounded-md p-4 bg-amber-50">
                          <h4 className="font-medium text-amber-800">Medium Priority Areas</h4>
                          <ul className="mt-2 space-y-1">
                            <li className="flex justify-between">
                              <span>Shopping Mall</span>
                              <span className="font-bold">{speedViolationData[4].violations} violations</span>
                            </li>
                            <li className="flex justify-between">
                              <span>School Zone</span>
                              <span className="font-bold">{speedViolationData[1].violations} violations</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Hospital Area</span>
                              <span className="font-bold">{speedViolationData[3].violations} violations</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </PageBackground>
  )
}

