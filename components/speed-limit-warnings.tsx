"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, ArrowUp } from "lucide-react"

// Mock data for speed limit warnings
const generateMockWarnings = () => {
  const locations = [
    "School Zone - Main St",
    "Hospital Area - Central Ave",
    "Residential Area - Oak Rd",
    "Accident Prone - Highway Junction",
    "Downtown - Pedestrian Crossing",
  ]

  const vehicles = ["Sedan", "SUV", "Truck", "Motorcycle", "Bus"]

  const timestamps = Array.from({ length: 10 }, () => {
    const date = new Date()
    date.setMinutes(date.getMinutes() - Math.floor(Math.random() * 300))
    return date
  })

  return timestamps
    .map((timestamp) => {
      const speedLimit = [20, 30, 40, 50, 60][Math.floor(Math.random() * 5)]
      const actualSpeed = speedLimit + 5 + Math.floor(Math.random() * 20)

      return {
        id: crypto.randomUUID(), // ✅ Unique ID
        timestamp,
        location: locations[Math.floor(Math.random() * locations.length)],
        speedLimit,
        actualSpeed,
        vehicle: vehicles[Math.floor(Math.random() * vehicles.length)],
        severity: actualSpeed - speedLimit > 15 ? "high" : "medium",
      }
    })
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

interface SpeedLimitWarningsProps {
  detailed?: boolean
}

export function SpeedLimitWarnings({ detailed = false }: SpeedLimitWarningsProps) {
  const [warnings, setWarnings] = useState(generateMockWarnings())

  useEffect(() => {
    const interval = setInterval(() => {
      const newWarning = generateMockWarnings()[0]
      setWarnings((prev) => [newWarning, ...prev.slice(0, detailed ? prev.length - 1 : 4)])
    }, 15000)

    return () => clearInterval(interval)
  }, [detailed])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: "short", day: "numeric" })
  }

  if (!detailed) {
    return (
      <div className="space-y-4">
        {warnings.slice(0, 5).map((warning) => (
          <div key={warning.id} className="flex items-center gap-4 rounded-lg border p-3">
            <div
              className={`rounded-full p-1 ${warning.severity === "high" ? "bg-destructive/20" : "bg-amber-500/20"}`}
            >
              <AlertTriangle
                className={`h-4 w-4 ${warning.severity === "high" ? "text-destructive" : "text-amber-500"}`}
              />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{warning.location}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{formatTime(warning.timestamp)}</span>
                <span className="mx-1">•</span>
                <span>
                  {warning.actualSpeed} km/h in a {warning.speedLimit} km/h zone
                </span>
              </div>
            </div>
            <Badge variant={warning.severity === "high" ? "destructive" : "outline"}>
              +{warning.actualSpeed - warning.speedLimit} km/h
            </Badge>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Vehicle</TableHead>
          <TableHead>Speed Limit</TableHead>
          <TableHead>Actual Speed</TableHead>
          <TableHead>Excess</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {warnings.map((warning) => (
          <TableRow key={warning.id}>
            <TableCell>
              <div className="flex flex-col">
                <span>{formatTime(warning.timestamp)}</span>
                <span className="text-xs text-muted-foreground">{formatDate(warning.timestamp)}</span>
              </div>
            </TableCell>
            <TableCell>{warning.location}</TableCell>
            <TableCell>{warning.vehicle}</TableCell>
            <TableCell>{warning.speedLimit} km/h</TableCell>
            <TableCell className="font-medium">{warning.actualSpeed} km/h</TableCell>
            <TableCell>
              <Badge
                variant={warning.severity === "high" ? "destructive" : "outline"}
                className="flex items-center gap-1"
              >
                <ArrowUp className="h-3 w-3" />
                {warning.actualSpeed - warning.speedLimit} km/h
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
