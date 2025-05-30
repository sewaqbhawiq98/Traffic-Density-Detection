"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface LocationData {
  latitude: number
  longitude: number
  address: string
}

const fetchLocationData = async (place: string): Promise<LocationData> => {
  const apiKey = "eb6ccc5f09fb4a1ea577ca8b7fb9dfff" // Replace with your actual API key
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(place)}&key=${apiKey}&countrycode=in&limit=1`

  const res = await fetch(url)
  const data = await res.json()

  if (!data.results.length) {
    throw new Error("Location not found")
  }

  const { geometry, formatted } = data.results[0]

  return {
    latitude: geometry.lat,
    longitude: geometry.lng,
    address: formatted,
  }
}

export function LocationWidget() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("New Delhi")

  const handleSearch = async () => {
    setLoading(true)
    try {
      const locationData = await fetchLocationData(query)
      setLocation(locationData)
    } catch (error) {
      console.error("Error fetching location:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSearch()
  }, [])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Current Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            className="border rounded px-2 py-1 text-sm w-full"
            placeholder="Enter location (e.g., Mumbai)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="bg-primary text-white px-3 rounded text-sm"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "..." : "Go"}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-2">
            <div className="animate-pulse h-8 w-full bg-muted rounded"></div>
          </div>
        ) : location && (
          <>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{location.address}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Lat: {location.latitude.toFixed(4)}, Long: {location.longitude.toFixed(4)}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
