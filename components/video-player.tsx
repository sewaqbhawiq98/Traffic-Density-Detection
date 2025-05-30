"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, SkipBack, SkipForward, Maximize2, Volume2, VolumeX } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import type { Socket } from "socket.io-client"

interface VideoPlayerProps {
  videoUrl: string
  videoTitle: string
  videoDescription?: string
  modelEndpoint?: string
}

interface DetectionResult {
  timestamp: number
  objects: {
    type: string
    confidence: number
    bbox: [number, number, number, number] // [x, y, width, height]
  }[]
  trafficDensity: number
  speedViolations: number
}

export function VideoPlayer({
  videoUrl,
  videoTitle,
  videoDescription = "",
  modelEndpoint = "https://your-model-endpoint.com",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [socket, setSocket] = useState<Socket | null>(null)
  const [detectionResults, setDetectionResults] = useState<DetectionResult | null>(null)
  const [connected, setConnected] = useState(false)
  const [processing, setProcessing] = useState(false)

  // Initialize socket connection
  useEffect(() => {
    // In a real implementation, connect to your model server
    // For demo purposes, we'll simulate the connection
    const simulatedSocket = {
      connected: true,
      on: (event: string, callback: Function) => {
        if (event === "detection_result") {
          // Simulate receiving detection results
          const interval = setInterval(() => {
            if (videoRef.current && videoRef.current.currentTime > 0) {
              const simulatedResult: DetectionResult = {
                timestamp: videoRef.current.currentTime,
                objects: [
                  {
                    type: "car",
                    confidence: 0.92,
                    bbox: [100, 150, 200, 100],
                  },
                  {
                    type: "person",
                    confidence: 0.87,
                    bbox: [400, 200, 50, 100],
                  },
                ],
                trafficDensity: Math.random() * 100,
                speedViolations: Math.floor(Math.random() * 3),
              }
              callback(simulatedResult)
            }
          }, 1000)
          return () => clearInterval(interval)
        }
      },
      emit: (event: string, data: any) => {
        console.log(`Emitted ${event}:`, data)
        return true
      },
      disconnect: () => {},
    } as unknown as Socket

    setSocket(simulatedSocket as Socket)
    setConnected(true)

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [])

  // Set up video event listeners
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const onLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const onEnded = () => {
      setPlaying(false)
    }

    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("loadedmetadata", onLoadedMetadata)
    video.addEventListener("ended", onEnded)

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("loadedmetadata", onLoadedMetadata)
      video.removeEventListener("ended", onEnded)
    }
  }, [])

  // Handle socket detection results
  useEffect(() => {
    if (!socket) return

    const handleDetectionResult = (result: DetectionResult) => {
      setDetectionResults(result)
      drawDetections(result)
    }

    socket.on("detection_result", handleDetectionResult)

    return () => {
      socket.off("detection_result", handleDetectionResult)
    }
  }, [socket])

  // Draw detection boxes on canvas
  const drawDetections = (result: DetectionResult) => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!canvas || !video) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw detection boxes
    result.objects.forEach((obj) => {
      const [x, y, width, height] = obj.bbox

      // Set style based on object type
      if (obj.type === "car") {
        ctx.strokeStyle = "rgba(0, 255, 0, 0.8)"
      } else if (obj.type === "person") {
        ctx.strokeStyle = "rgba(0, 0, 255, 0.8)"
      } else {
        ctx.strokeStyle = "rgba(255, 0, 0, 0.8)"
      }

      ctx.lineWidth = 2
      ctx.strokeRect(x, y, width, height)

      // Draw label
      ctx.fillStyle = ctx.strokeStyle
      ctx.font = "12px Arial"
      ctx.fillText(`${obj.type} ${Math.round(obj.confidence * 100)}%`, x, y - 5)
    })
  }

  // Video controls
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (playing) {
      video.pause()
    } else {
      video.play()
      // When playing, send frames to the model
      if (socket && connected && !processing) {
        setProcessing(true)
        // In a real implementation, you would capture frames and send them
        socket.emit("process_frame", { timestamp: video.currentTime })
      }
    }
    setPlaying(!playing)
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0]
    setVolume(newVolume)
    video.volume = newVolume
    setMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    const newMuted = !muted
    setMuted(newMuted)
    video.muted = newMuted
  }

  const toggleFullscreen = () => {
    const container = document.getElementById("video-container")
    if (!container) return

    if (!fullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setFullscreen(!fullscreen)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{videoTitle}</CardTitle>
            <CardDescription>{videoDescription}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {connected ? (
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Model Connected
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                Model Disconnected
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div id="video-container" className="relative aspect-video bg-black">
          <video ref={videoRef} src={videoUrl} className="w-full h-full" onClick={togglePlay} />
          <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />

          {/* Detection overlay */}
          {detectionResults && (
            <div className="absolute top-4 right-4 bg-background/80 p-2 rounded-md text-xs">
              <div className="font-medium mb-1">Analysis Results:</div>
              <div>Traffic Density: {Math.round(detectionResults.trafficDensity)}%</div>
              <div>Speed Violations: {detectionResults.speedViolations}</div>
              <div>Objects Detected: {detectionResults.objects.length}</div>
            </div>
          )}

          {/* Play/pause overlay */}
          {!playing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Button
                variant="outline"
                size="icon"
                className="h-16 w-16 rounded-full bg-background/80"
                onClick={togglePlay}
              >
                <Play className="h-8 w-8" />
              </Button>
            </div>
          )}
        </div>

        {/* Video controls */}
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration}
              step={0.1}
              onValueChange={handleSeek}
              className="flex-1 mx-2"
            />
            <span>{formatTime(duration)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (videoRef.current) videoRef.current.currentTime -= 10
                }}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={togglePlay}>
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (videoRef.current) videoRef.current.currentTime += 10
                }}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleMute}>
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Slider value={[volume]} max={1} step={0.01} onValueChange={handleVolumeChange} className="w-24" />
              <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setProcessing(!processing)}>
          {processing ? "Pause Analysis" : "Start Analysis"}
        </Button>
        <div className="text-sm text-muted-foreground">
          {processing ? "AI model is analyzing the video..." : "Analysis paused"}
        </div>
      </CardFooter>
    </Card>
  )
}

