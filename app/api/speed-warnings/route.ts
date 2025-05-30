import { NextResponse } from "next/server"
import { z } from "zod"

// Schema for validating speed warning requests
const speedWarningSchema = z.object({
  cameraId: z.string(),
  location: z.string(),
  detectedSpeed: z.number().positive(),
  speedLimit: z.number().positive(),
  vehicleType: z.string().optional(),
  timestamp: z.string().optional(),
})

// Mock function to generate a warning message
function generateWarningMessage(detectedSpeed: number, speedLimit: number, location: string) {
  const speedDifference = detectedSpeed - speedLimit

  if (speedDifference > 20) {
    return `SEVERE WARNING: Vehicle exceeding speed limit by ${speedDifference} km/h in ${location}`
  } else if (speedDifference > 10) {
    return `WARNING: Vehicle exceeding speed limit by ${speedDifference} km/h in ${location}`
  } else {
    return `NOTICE: Vehicle slightly exceeding speed limit in ${location}`
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate request body
    const result = speedWarningSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Invalid request data", details: result.error.format() }, { status: 400 })
    }

    const { cameraId, location, detectedSpeed, speedLimit, vehicleType } = result.data
    const timestamp = result.data.timestamp || new Date().toISOString()

    // Calculate severity based on how much the speed limit is exceeded
    const speedDifference = detectedSpeed - speedLimit
    let severity = "low"

    if (speedDifference > 20) {
      severity = "high"
    } else if (speedDifference > 10) {
      severity = "medium"
    }

    // Generate warning message
    const message = generateWarningMessage(detectedSpeed, speedLimit, location)

    // Create warning record
    const warning = {
      id: `warning-${Date.now()}`,
      cameraId,
      location,
      detectedSpeed,
      speedLimit,
      speedDifference,
      severity,
      message,
      vehicleType: vehicleType || "Unknown",
      timestamp,
      acknowledged: false,
    }

    // In a real implementation, this would be stored in a database
    // and potentially trigger alerts or notifications

    return NextResponse.json(warning)
  } catch (error) {
    console.error("Error processing speed warning:", error)
    return NextResponse.json({ error: "Failed to process speed warning" }, { status: 500 })
  }
}

