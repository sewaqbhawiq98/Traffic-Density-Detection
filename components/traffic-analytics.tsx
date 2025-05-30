"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
const vehicleTypeData = [
  { name: "Cars", value: 4000 },
  { name: "Motorcycles", value: 3000 },
  { name: "Trucks", value: 1000 },
  { name: "Buses", value: 500 },
  { name: "Bicycles", value: 300 },
]

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

const speedViolationHotspots = [
  { location: "Highway Junction", violations: 78, coordinates: "28.6139, 77.2090" },
  { location: "School Zone - Main St", violations: 45, coordinates: "28.6129, 77.2290" },
  { location: "Downtown Crossing", violations: 62, coordinates: "28.6339, 77.2190" },
  { location: "Hospital Area", violations: 38, coordinates: "28.6239, 77.2390" },
  { location: "Shopping Mall Entrance", violations: 56, coordinates: "28.6039, 77.2490" },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export function TrafficAnalytics() {
  const [activeTab, setActiveTab] = useState("hourly")

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Patterns</CardTitle>
            <CardDescription>Analysis of traffic flow over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="hourly" onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="hourly">Hourly</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="vehicle">Vehicle Types</TabsTrigger>
              </TabsList>

              <TabsContent value="hourly" className="space-y-4">
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
                <p className="text-sm text-muted-foreground">
                  Peak traffic hours are observed between 8:00-10:00 AM and 4:00-6:00 PM, corresponding to typical
                  commute times.
                </p>
              </TabsContent>

              <TabsContent value="weekly" className="space-y-4">
                <div className="h-[300px]">
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
                <p className="text-sm text-muted-foreground">
                  Friday shows the highest traffic volume, while weekend traffic is significantly lower.
                </p>
              </TabsContent>

              <TabsContent value="vehicle" className="space-y-4">
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
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-muted-foreground">
                  Cars make up the majority of traffic, followed by motorcycles and commercial vehicles.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Speed Violation Hotspots</CardTitle>
            <CardDescription>Locations with highest number of speed limit violations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-[300px] bg-muted rounded-md relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Interactive map will be implemented here
                </div>
                <div className="absolute top-2 right-2 bg-background/80 p-2 rounded text-xs">
                  Based on traffic video analysis
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Top Violation Areas</h4>
                <div className="space-y-2">
                  {speedViolationHotspots.map((hotspot, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <div className="font-medium">{hotspot.location}</div>
                        <div className="text-xs text-muted-foreground">{hotspot.coordinates}</div>
                      </div>
                      <div className="text-destructive font-bold">{hotspot.violations} violations</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

