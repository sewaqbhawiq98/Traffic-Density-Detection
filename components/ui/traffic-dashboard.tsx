"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Download, Play, Pause, BarChart3, Car, AlertTriangle, Camera, Clock, Activity } from "lucide-react"
import { CameraFeed } from "@/components/camera-feed"
import { TrafficChart } from "@/components/traffic-chart"

interface TrafficDashboardProps {
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
  isDetecting: boolean
  toggleDetection: () => void
}

export function TrafficDashboard({ isDarkMode, setIsDarkMode, isDetecting, toggleDetection }: TrafficDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [stats, setStats] = useState({
    vehicleCount: 0,
    density: 0,
    violations: 0,
    cameras: 4,
  })

  // Update time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Simulate real-time data updates when detection is active
  useEffect(() => {
    if (!isDetecting) return

    const dataInterval = setInterval(() => {
      setStats((prev) => ({
        vehicleCount: prev.vehicleCount + Math.floor(Math.random() * 3),
        density: Math.min(100, Math.max(0, prev.density + (Math.random() * 6 - 3))),
        violations: prev.violations + (Math.random() > 0.8 ? 1 : 0),
        cameras: prev.cameras,
      }))
    }, 2000)

    return () => clearInterval(dataInterval)
  }, [isDetecting])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-emerald-500" />
            <h1 className="text-xl md:text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white">
              Traffic Density Detection System
            </h1>
            <Badge
              variant={isDetecting ? "default" : "outline"}
              className={`ml-2 ${isDetecting ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
            >
              {isDetecting ? "LIVE" : "STANDBY"}
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center text-sm text-slate-500 dark:text-slate-400 font-mono">
              <Clock className="h-4 w-4 mr-1" />
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="dark-mode" className="sr-only">
                Dark Mode
              </Label>
              <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              <Label htmlFor="dark-mode" className="text-sm cursor-pointer">
                {isDarkMode ? "Dark" : "Light"}
              </Label>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Control Panel */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Traffic Monitoring Dashboard</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Real-time traffic density analysis and reporting
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              size="lg"
              onClick={toggleDetection}
              className={`font-mono font-bold transition-all duration-300 ${
                isDetecting
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white"
              }`}
            >
              {isDetecting ? (
                <>
                  <Pause className="mr-2 h-5 w-5" /> Stop Detection
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" /> Start Detection
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="font-mono border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Download className="mr-2 h-5 w-5" /> Download Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Vehicle Count"
            value={stats.vehicleCount.toString()}
            icon={<Car />}
            color="emerald"
            isActive={isDetecting}
          />
          <StatCard
            title="Traffic Density"
            value={`${Math.round(stats.density)}%`}
            icon={<BarChart3 />}
            color="blue"
            isActive={isDetecting}
          />
          <StatCard
            title="Speed Violations"
            value={stats.violations.toString()}
            icon={<AlertTriangle />}
            color="red"
            isActive={isDetecting}
          />
          <StatCard
            title="Active Cameras"
            value={stats.cameras.toString()}
            icon={<Camera />}
            color="purple"
            isActive={isDetecting}
          />
        </div>

        {/* Camera Feeds and Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-bold font-mono text-slate-900 dark:text-white">Live Camera Feed</h3>
              </div>
              <div className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  <CameraFeed id="camera-1" name="Main Street" isActive={isDetecting} />
                  <CameraFeed id="camera-2" name="Highway Junction" isActive={isDetecting} />
                  <CameraFeed id="camera-3" name="Downtown" isActive={isDetecting} />
                  <CameraFeed id="camera-4" name="School Zone" isActive={isDetecting} />
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-bold font-mono text-slate-900 dark:text-white">Traffic Density Trend</h3>
              </div>
              <div className="p-4">
                <TrafficChart isActive={isDetecting} />
              </div>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-bold font-mono text-slate-900 dark:text-white">Recent Alerts</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {isDetecting ? (
                    <>
                      <Alert time="Just now" message="High density detected on Main Street" type="warning" />
                      <Alert time="2 min ago" message="Speed violation on Highway Junction" type="danger" />
                      <Alert time="5 min ago" message="Camera 3 connection restored" type="success" />
                      <Alert time="10 min ago" message="System monitoring started" type="info" />
                    </>
                  ) : (
                    <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                      <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No recent alerts</p>
                      <p className="text-sm">Start detection to monitor alerts</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">© 2024 Traffic Density Detection System</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <a
                href="#"
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Documentation
              </a>
              <a
                href="#"
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Support
              </a>
              <a
                href="#"
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  color: "emerald" | "blue" | "red" | "purple"
  isActive: boolean
}

function StatCard({ title, value, icon, color, isActive }: StatCardProps) {
  const colorMap = {
    emerald: {
      bg: "bg-emerald-500",
      text: "text-emerald-500",
      border: "border-emerald-500",
      shadow: "shadow-emerald-500/20",
      glow: "shadow-emerald-500/50",
    },
    blue: {
      bg: "bg-blue-500",
      text: "text-blue-500",
      border: "border-blue-500",
      shadow: "shadow-blue-500/20",
      glow: "shadow-blue-500/50",
    },
    red: {
      bg: "bg-red-500",
      text: "text-red-500",
      border: "border-red-500",
      shadow: "shadow-red-500/20",
      glow: "shadow-red-500/50",
    },
    purple: {
      bg: "bg-purple-500",
      text: "text-purple-500",
      border: "border-purple-500",
      shadow: "shadow-purple-500/20",
      glow: "shadow-purple-500/50",
    },
  }

  return (
    <Card
      className={`
      relative overflow-hidden border-slate-200 dark:border-slate-800 
      bg-white dark:bg-slate-900 shadow-md
      transition-all duration-300
      ${isActive ? `shadow-lg ${colorMap[color].shadow}` : ""}
      hover:shadow-lg hover:${colorMap[color].shadow}
      ${isActive ? `border-l-4 ${colorMap[color].border}` : ""}
    `}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
            <h3
              className={`text-2xl font-mono font-bold mt-1 ${isActive ? colorMap[color].text : "text-slate-700 dark:text-slate-200"}`}
            >
              {value}
            </h3>
          </div>
          <div
            className={`
            p-2 rounded-full 
            ${isActive ? `${colorMap[color].bg} text-white` : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}
          `}
          >
            {icon}
          </div>
        </div>

        {isActive && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-transparent to-transparent">
            <div className={`h-full ${colorMap[color].bg} animate-pulse rounded-full`} style={{ width: "30%" }}></div>
          </div>
        )}
      </div>
    </Card>
  )
}

interface AlertProps {
  time: string
  message: string
  type: "info" | "success" | "warning" | "danger"
}

function Alert({ time, message, type }: AlertProps) {
  const typeStyles = {
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    success: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800",
    warning: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
    danger: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
  }

  const typeTextStyles = {
    info: "text-blue-700 dark:text-blue-300",
    success: "text-emerald-700 dark:text-emerald-300",
    warning: "text-amber-700 dark:text-amber-300",
    danger: "text-red-700 dark:text-red-300",
  }

  return (
    <div className={`p-3 rounded-md border ${typeStyles[type]}`}>
      <div className="flex justify-between">
        <p className={`text-sm font-medium ${typeTextStyles[type]}`}>{message}</p>
        <span className="text-xs text-slate-500 dark:text-slate-400">{time}</span>
      </div>
    </div>
  )
}

