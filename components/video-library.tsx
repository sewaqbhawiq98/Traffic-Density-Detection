"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, getDocs, type Timestamp } from "firebase/firestore"
import { Search, Play, Clock, Calendar } from "lucide-react"

interface Video {
  id: string
  title: string
  description: string
  location: string
  category: string
  url: string
  uploadedAt: Timestamp
  processed: boolean
}

interface VideoLibraryProps {
  onSelectVideo: (video: Video) => void
}

export function VideoLibrary({ onSelectVideo }: VideoLibraryProps) {
  const [videos, setVideos] = useState<Video[]>([])
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosRef = collection(db, "videos")
        const q = query(videosRef, orderBy("uploadedAt", "desc"))
        const querySnapshot = await getDocs(q)

        const fetchedVideos: Video[] = []
        querySnapshot.forEach((doc) => {
          fetchedVideos.push({
            id: doc.id,
            ...doc.data(),
          } as Video)
        })

        setVideos(fetchedVideos)
        setFilteredVideos(fetchedVideos)
      } catch (error) {
        console.error("Error fetching videos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  useEffect(() => {
    // Filter videos based on search query and active tab
    let filtered = videos

    if (searchQuery) {
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (activeTab !== "all") {
      filtered = filtered.filter((video) => {
        if (activeTab === "processed") return video.processed
        if (activeTab === "unprocessed") return !video.processed
        return video.category === activeTab
      })
    }

    setFilteredVideos(filtered)
  }, [searchQuery, activeTab, videos])

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return "Unknown date"
    return new Date(timestamp.seconds * 1000).toLocaleDateString()
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Video Library</CardTitle>
          <CardDescription>Loading videos...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Library</CardTitle>
        <CardDescription>Browse and select traffic videos for analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search videos..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="processed">Processed</TabsTrigger>
            <TabsTrigger value="unprocessed">Unprocessed</TabsTrigger>
            <TabsTrigger value="school_zone">School Zone</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            {filteredVideos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No videos found</div>
            ) : (
              <div className="grid gap-4">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center gap-3 p-3 border rounded-md hover:bg-accent cursor-pointer"
                    onClick={() => onSelectVideo(video)}
                  >
                    <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                      <Play className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{video.title}</h4>
                      <p className="text-sm text-muted-foreground truncate">{video.location}</p>
                    </div>
                    <div className="flex flex-col items-end text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(video.uploadedAt)}
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {video.processed ? "Processed" : "Unprocessed"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

