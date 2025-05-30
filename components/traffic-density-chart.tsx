"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for the chart
const generateMockData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  return hours.map((hour) => {
    // Generate a realistic traffic pattern with morning and evening peaks
    let density = 0
    if (hour >= 7 && hour <= 9) {
      // Morning peak
      density = 70 + Math.random() * 30
    } else if (hour >= 16 && hour <= 19) {
      // Evening peak
      density = 80 + Math.random() * 20
    } else if (hour >= 10 && hour <= 15) {
      // Midday
      density = 40 + Math.random() * 30
    } else {
      // Night
      density = 10 + Math.random() * 20
    }

    return {
      hour: `${hour}:00`,
      density: Math.round(density),
    }
  })
}

export function TrafficDensityChart() {
  const [data, setData] = useState(generateMockData())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData]
        const currentHour = new Date().getHours()
        const currentHourIndex = newData.findIndex((item) => item.hour === `${currentHour}:00`)

        if (currentHourIndex !== -1) {
          // Update the current hour with a slight variation
          newData[currentHourIndex] = {
            ...newData[currentHourIndex],
            density: Math.max(0, Math.min(100, newData[currentHourIndex].density + (Math.random() * 10 - 5))),
          }
        }

        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="hour" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Time</span>
                      <span className="font-bold text-muted-foreground">{payload[0].payload.hour}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Density</span>
                      <span className="font-bold">{payload[0].value}%</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line type="monotone" dataKey="density" stroke="#0284c7" strokeWidth={2} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

