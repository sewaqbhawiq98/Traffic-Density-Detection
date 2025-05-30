"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"

export function DateTimeWidget() {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Date & Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xl font-bold">{formatTime(date)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

