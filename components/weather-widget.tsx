"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, CloudRain, Sun, Thermometer, Wind } from "lucide-react"

interface WeatherData {
  temperature: number
  condition: "sunny" | "cloudy" | "rainy" | "stormy"
  humidity: number
  windSpeed: number
  location: string
}

// Mock weather data - in a real app, this would come from a weather API
const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock data
  const conditions = ["sunny", "cloudy", "rainy", "stormy"]
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)] as WeatherData["condition"]

  return {
    temperature: Math.floor(15 + Math.random() * 20),
    condition: randomCondition,
    humidity: Math.floor(30 + Math.random() * 50),
    windSpeed: Math.floor(5 + Math.random() * 20),
    location: "Current Location",
  }
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getWeather = async () => {
      try {
        // In a real app, we would get the user's location first
        const weatherData = await fetchWeatherData(0, 0)
        setWeather(weatherData)
      } catch (error) {
        console.error("Error fetching weather:", error)
      } finally {
        setLoading(false)
      }
    }

    getWeather()

    // Refresh weather data every 10 minutes
    const interval = setInterval(getWeather, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = () => {
    if (!weather) return <Cloud className="h-6 w-6" />

    switch (weather.condition) {
      case "sunny":
        return <Sun className="h-6 w-6 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-6 w-6 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-6 w-6 text-blue-500" />
      case "stormy":
        return <CloudRain className="h-6 w-6 text-purple-500" />
      default:
        return <Cloud className="h-6 w-6" />
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-2">
            <div className="animate-pulse h-16 w-full bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Weather</CardTitle>
        <CardDescription>{weather?.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getWeatherIcon()}
            <div className="text-2xl font-bold">{weather?.temperature}°C</div>
          </div>
          <div className="flex flex-col text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Thermometer className="h-3 w-3" />
              <span>Humidity: {weather?.humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="h-3 w-3" />
              <span>Wind: {weather?.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

