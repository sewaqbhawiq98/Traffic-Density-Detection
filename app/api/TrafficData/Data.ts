import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// In a real application, this would come from a database
const trafficData = {
  hourly: [
    { hour: "00:00", vehicles: 120, density: 20 },
    { hour: "02:00", vehicles: 80, density: 10 },
    { hour: "04:00", vehicles: 60, density: 15 },
    { hour: "06:00", vehicles: 180, density: 30 },
    { hour: "08:00", vehicles: 460, density: 70 },
    { hour: "10:00", vehicles: 380, density: 50 },
    { hour: "12:00", vehicles: 350, density: 40 },
    { hour: "14:00", vehicles: 320, density: 45 },
    { hour: "16:00", vehicles: 480, density: 65 },
    { hour: "18:00", vehicles: 520, density: 80 },
    { hour: "20:00", vehicles: 280, density: 40 },
    { hour: "22:00", vehicles: 160, density: 25 },
  ],
  cameras: [
    { id: "camera-1", name: "Main Street", status: "active", density: 65 },
    { id: "camera-2", name: "Highway Junction", status: "active", density: 82 },
    { id: "camera-3", name: "Downtown", status: "active", density: 45 },
    { id: "camera-4", name: "School Zone", status: "active", density: 30 },
  ],
  alerts: [
    { id: "alert-1", time: "10:15", message: "High density detected on Main Street", type: "warning" },
    { id: "alert-2", time: "10:05", message: "Speed violation on Highway Junction", type: "danger" },
    { id: "alert-3", time: "09:50", message: "Camera 3 connection restored", type: "success" },
    { id: "alert-4", time: "09:30", message: "System monitoring started", type: "info" },
  ],
}

export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams
  const dataType = searchParams.get("type") || "all"

  // Return the requested data
  switch (dataType) {
    case "hourly":
      return NextResponse.json({ data: trafficData.hourly })
    case "cameras":
      return NextResponse.json({ data: trafficData.cameras })
    case "alerts":
      return NextResponse.json({ data: trafficData.alerts })
    case "all":
    default:
      return NextResponse.json({ data: trafficData })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // In a real implementation, you would:
    // 1. Validate the data
    // 2. Store it in a database
    // 3. Process it for analytics

    // For demo purposes, we'll just echo it back
    return NextResponse.json({
      success: true,
      message: "Traffic data received successfully",
      data,
    })
  } catch (error) {
    console.error("Error processing traffic data:", error)
    return NextResponse.json({ error: "Failed to process traffic data" }, { status: 500 })
  }
}
