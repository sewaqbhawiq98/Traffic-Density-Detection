"use client"

import { useState, useEffect, Fragment } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { onAuthStateChanged } from "firebase/auth"
import { Camera, Plus, Search, Settings, Trash2 } from "lucide-react"
import { CameraFeed } from "@/components/camera-feed"
import { auth, getUserRole } from "@/lib/firebase"
import type { UserRole } from "@/types/user"
import { UserRoleBadge } from "@/components/user-role-badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PageBackground } from "@/components/page-background"

// Importing react-leaflet components for map view
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet"

// Mock camera data
const mockCameras = [
  { id: "camera-1", name: "Main Street", location: "School Zone", type: "school" },
  { id: "camera-2", name: "Highway Junction", location: "Accident Prone Area", type: "accident" },
  { id: "camera-3", name: "Downtown", location: "High Pedestrian Area", type: "pedestrian" },
  { id: "camera-4", name: "Central Avenue", location: "Hospital Zone", type: "hospital" },
  { id: "camera-5", name: "Oak Road", location: "Residential Area", type: "residential" },
  { id: "camera-6", name: "Commerce Street", location: "Shopping District", type: "pedestrian" },
  { id: "camera-7", name: "Park Boulevard", location: "Recreation Area", type: "pedestrian" },
  { id: "camera-8", name: "Industrial Way", location: "Factory Zone", type: "accident" },
  { id: "camera-9", name: "College Road", location: "University Campus", type: "school" },
]

// Helper function to return dummy coordinates for each camera based on its type.
// Adjust these coordinates as needed.
function getCameraCoordinates(camera: { type: string }) {
  switch (camera.type) {
    case "school":
      return [37.7749, -122.4194]  // Example: San Francisco
    case "accident":
      return [37.7849, -122.4094]
    case "pedestrian":
      return [37.7649, -122.4294]
    case "hospital":
      return [37.7549, -122.4394]
    case "residential":
      return [37.7449, -122.4494]
    default:
      return [37.7749, -122.4194]
  }
}

export default function CamerasPage() {
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showAddCameraDialog, setShowAddCameraDialog] = useState(false)
  const [newCameraName, setNewCameraName] = useState("")
  const [newCameraLocation, setNewCameraLocation] = useState("")
  const [newCameraType, setNewCameraType] = useState("")
  const [newCameraDescription, setNewCameraDescription] = useState("")
  const [cameras, setCameras] = useState(mockCameras)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        // Get user role from Firestore
        const role = await getUserRole(user.uid)
        setUserRole(role)
      } else {
        router.push("/login")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleAddCamera = () => {
    if (!newCameraName || !newCameraLocation || !newCameraType) return

    const newCamera = {
      id: `camera-${cameras.length + 1}`,
      name: newCameraName,
      location: newCameraLocation,
      type: newCameraType,
    }

    setCameras([...cameras, newCamera])
    setShowAddCameraDialog(false)
    setNewCameraName("")
    setNewCameraLocation("")
    setNewCameraType("")
    setNewCameraDescription("")
  }

  const handleDeleteCamera = (id: string) => {
    setCameras(cameras.filter((camera) => camera.id !== id))
  }

  const handleConfigureCamera = (id: string) => {
    // In a real app, this would open a configuration dialog
    alert(`Configuring camera ${id}`)
  }

  // New function to call RapidAPI and create a geofence boundary
  const createGeofence = () => {
    const data = JSON.stringify({
      name: 'HighTrafficZone',
      description: { info: 'Traffic density geofence area' },
      polygon: {
        coordinates: [
          { lat: 37.7749, lon: -122.4194 },
          { lat: 37.7849, lon: -122.4094 },
          { lat: 37.7649, lon: -122.4294 }
        ]
      },
      rapidapi_user_id: 'your_user_id_here'
    })

    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        console.log("Geofence API response:", this.responseText)
      }
    })

    xhr.open('POST', 'https://geotracker2.p.rapidapi.com/api/v1/boundaries/')
    xhr.setRequestHeader('x-rapidapi-key', 'a4b07f8084msh42da899658cce72p1e3acajsn39c74d9c9aa7')
    xhr.setRequestHeader('x-rapidapi-host', 'geotracker2.p.rapidapi.com')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(data)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  // Filter cameras based on search query and type filter
  const filteredCameras = cameras.filter((camera) => {
    const matchesSearch =
      camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camera.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filterType === "all" || camera.type === filterType

    return matchesSearch && matchesType
  })

  return (
    <PageBackground imageUrl="/images/traffic-cameras.jpg" opacity={0.08}>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold">Traffic Safety System</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
                <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
                  Dashboard
                </Link>
                <Link href="/cameras" className="transition-colors hover:text-foreground/80">
                  Cameras
                </Link>
                {userRole === "authority" && (
                  <Link href="/analytics" className="transition-colors hover:text-foreground/80">
                    Analytics
                  </Link>
                )}
                {userRole === "authority" && (
                  <Link href="/admin" className="transition-colors hover:text-foreground/80">
                    Admin
                  </Link>
                )}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Welcome, {user?.displayName || user?.email}</span>
                {userRole && <UserRoleBadge role={userRole} />}
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="flex-1 container py-6">
          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Camera Management</h1>
                <p className="text-muted-foreground">View and manage all traffic monitoring cameras.</p>
              </div>
              {userRole === "authority" && (
                <Dialog open={showAddCameraDialog} onOpenChange={setShowAddCameraDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Camera
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Camera</DialogTitle>
                      <DialogDescription>Add a new camera to the monitoring system.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={newCameraName}
                          onChange={(e) => setNewCameraName(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={newCameraLocation}
                          onChange={(e) => setNewCameraLocation(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                          Type
                        </Label>
                        <Select value={newCameraType} onValueChange={setNewCameraType}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select camera type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="school">School Zone</SelectItem>
                            <SelectItem value="hospital">Hospital Zone</SelectItem>
                            <SelectItem value="residential">Residential Area</SelectItem>
                            <SelectItem value="pedestrian">Pedestrian Area</SelectItem>
                            <SelectItem value="accident">Accident Prone Area</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          value={newCameraDescription}
                          onChange={(e) => setNewCameraDescription(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleAddCamera}>
                        Add Camera
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search cameras..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="school">School Zones</SelectItem>
                  <SelectItem value="hospital">Hospital Zones</SelectItem>
                  <SelectItem value="residential">Residential Areas</SelectItem>
                  <SelectItem value="pedestrian">Pedestrian Areas</SelectItem>
                  <SelectItem value="accident">Accident Prone Areas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="grid" className="space-y-4">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="map">Map View</TabsTrigger>
                </TabsList>
                <div className="text-sm text-muted-foreground">
                  Showing {filteredCameras.length} of {cameras.length} cameras
                </div>
              </div>

              <TabsContent value="grid" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredCameras.map((camera) => (
                    <CameraFeed key={camera.id} id={camera.id} name={camera.name} location={camera.location} />
                  ))}
                </div>

                {filteredCameras.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No cameras found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="list">
                <Card className="bg-background/90">
                  <CardHeader>
                    <CardTitle>Camera List</CardTitle>
                    <CardDescription>Detailed list of all traffic monitoring cameras</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {filteredCameras.map((camera) => (
                        <div
                          key={camera.id}
                          className="flex items-center justify-between p-2 border rounded-md bg-background/80"
                        >
                          <div>
                            <h3 className="font-medium">{camera.name}</h3>
                            <p className="text-sm text-muted-foreground">{camera.location}</p>
                          </div>
                          <div className="flex gap-2">
                            {userRole === "authority" ? (
                              <>
                                <Button variant="outline" size="sm" onClick={() => handleConfigureCamera(camera.id)}>
                                  <Settings className="h-4 w-4 mr-1" />
                                  Configure
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteCamera(camera.id)}>
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </>
                            ) : (
                              <Button size="sm">
                                <Camera className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Map View Tab with Free Map API integration and RapidAPI Geofence */}
              <TabsContent value="map" className="h-[500px] rounded-xl overflow-hidden">
                <div className="p-4">
                  <Button onClick={createGeofence}>Create Geofence</Button>
                </div>
                <MapContainer
                  center={[37.7749, -122.4194]}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />
                  {filteredCameras.map((camera) => {
                    const coords = getCameraCoordinates(camera)
                    // Assume each camera may have a trafficScore property (adjust threshold as necessary)
                    const isHighDensity = camera.trafficScore && camera.trafficScore > 70 
                    return (
                      <Fragment key={camera.id}>
                        <Marker position={coords} />
                        {isHighDensity && (
                          <Circle
                            center={coords}
                            radius={300} // meters
                            pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.4 }}
                          />
                        )}
                      </Fragment>
                    )
                  })}
                </MapContainer>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </PageBackground>
  )
}
