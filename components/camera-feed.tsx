"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Maximize2, Play, Square, Video, ZoomIn, ZoomOut } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CameraFeedProps {
  id: string
  name: string
  location: string
}

export function CameraFeed({ id, name, location }: CameraFeedProps) {
  const [isActive, setIsActive] = useState(true)
  const [trafficDensity, setTrafficDensity] = useState(Math.floor(Math.random() * 100))
  const [speedLimit, setSpeedLimit] = useState([20, 30, 40, 50][Math.floor(Math.random() * 4)])
  const [detectedSpeed, setDetectedSpeed] = useState(0)
  const [warningActive, setWarningActive] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sample videos for different camera types
  const sampleVideos = {
    "camera-1": "/videos/videoplayback (1).mp4",
    "camera-2": "/videos/videoplayback (2).mp4",
    "camera-3": "/videos/videoplayback.mp4",
    "camera-4": "/videos/videoplayback.mp4",// Using the first video for camera-3 as well
    default: "/videos/videoplayback (1).mp4",
  }

  // Simulate camera feed updates
  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      // Update traffic density with slight variations
      setTrafficDensity((prev) => {
        const newValue = Math.max(0, Math.min(100, prev + (Math.random() * 10 - 5)))
        return Math.floor(newValue)
      })

      // Simulate vehicle detection with random speeds
      const newSpeed = Math.floor(speedLimit * (0.8 + Math.random() * 0.5))
      setDetectedSpeed(newSpeed)

      // Check if speed limit is exceeded
      setWarningActive(newSpeed > speedLimit)
    }, 3000)

    return () => clearInterval(interval)
  }, [isActive, speedLimit])

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Sync video playback between normal and fullscreen views
  useEffect(() => {
    if (isDialogOpen && fullscreenVideoRef.current && videoRef.current) {
      fullscreenVideoRef.current.currentTime = videoRef.current.currentTime
      if (!videoRef.current.paused) {
        fullscreenVideoRef.current.play().catch((err) => console.error("Error playing fullscreen video:", err))
      }
    }
  }, [isDialogOpen])

  const getDensityColor = () => {
    if (trafficDensity < 30) return "bg-green-500"
    if (trafficDensity < 70) return "bg-amber-500"
    return "bg-red-500"
  }

  const handlePlayVideo = () => {
    setShowVideo(true)
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error)
      })
    }
  }

  const getVideoSource = () => {
    return sampleVideos[id as keyof typeof sampleVideos] || sampleVideos.default
  }

  const toggleFullscreen = () => {
    setIsDialogOpen(true)
  }

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3))
  }

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 1))
  }

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription>{location}</CardDescription>
            </div>
            <Badge variant={isActive ? "default" : "outline"} className="ml-auto">
              {isActive ? "Live" : "Offline"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0 relative">
          <div ref={containerRef} className="aspect-video bg-muted relative overflow-hidden">
            {showVideo ? (
              <video
                ref={videoRef}
                src={getVideoSource()}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                autoPlay
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black/10">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2 bg-background/80 hover:bg-background"
                  onClick={handlePlayVideo}
                >
                  <Video className="h-5 w-5" />
                  Play Camera Feed
                </Button>
              </div>
            )}

            {/* Overlay for speed limit detection */}
            {warningActive && showVideo && (
              <div className="absolute inset-0 bg-destructive/20 flex items-center justify-center">
                <div className="bg-background/90 p-3 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <span className="font-bold">Speed Limit Exceeded: {detectedSpeed} km/h</span>
                </div>
              </div>
            )}

            {/* Camera info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2 text-xs flex justify-between">
              <div>Speed Limit: {speedLimit} km/h</div>
              <div className="flex items-center gap-1">
                Traffic Density:
                <span className={`inline-block w-2 h-2 rounded-full ${getDensityColor()}`}></span>
                {trafficDensity}%
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-2 flex justify-between bg-muted/50">
          <div className="flex gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setIsActive(!isActive)}>
              {isActive ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handlePlayVideo}>
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={toggleFullscreen}>
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">ID: {id} • Updated just now</div>
        </CardFooter>
      </Card>

      {/* Fullscreen Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-6xl w-[90vw]">
          <DialogHeader>
            <DialogTitle>
              {name} - {location}
            </DialogTitle>
          </DialogHeader>
          <div className="relative overflow-hidden bg-black rounded-md">
            <div
              className="transition-transform duration-300 ease-in-out"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: "center",
                height: "70vh",
              }}
            >
              <video
                ref={fullscreenVideoRef}
                src={getVideoSource()}
                className="w-full h-full object-contain"
                loop
                controls
                autoPlay
              />
            </div>

            {/* Zoom controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button variant="secondary" size="icon" onClick={zoomIn} className="bg-background/80 hover:bg-background">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={zoomOut}
                className="bg-background/80 hover:bg-background"
                disabled={zoomLevel <= 1}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>

            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2 text-sm flex justify-between">
              <div>Speed Limit: {speedLimit} km/h</div>
              <div className="flex items-center gap-1">
                Traffic Density:
                <span className={`inline-block w-3 h-3 rounded-full ${getDensityColor()}`}></span>
                {trafficDensity}%
              </div>
              <div>Zoom: {Math.round(zoomLevel * 100)}%</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

