"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AlertTriangle,
  Camera,
  Car,
  MapPin,
  Users,
  Plus,
  Search,
} from "lucide-react";
import { TrafficDensityChart } from "@/components/traffic-density-chart";
import { SpeedLimitWarnings } from "@/components/speed-limit-warnings";
import { CameraFeed } from "@/components/camera-feed";
import { WeatherWidget } from "@/components/weather-widget";
import { DateTimeWidget } from "@/components/date-time-widget";
import { LocationWidget } from "@/components/location-widget";
import { SafetyGuidelines } from "@/components/safety-guidelines";
import { UserRoleBadge } from "@/components/user-role-badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { auth, getUserRole } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { UserRole } from "@/types/user";
import { PageBackground } from "@/components/page-background";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isDetecting, setIsDetecting] = useState(false);

  // States for Add Camera Dialog
  const [showAddCameraDialog, setShowAddCameraDialog] = useState(false);
  const [newCameraName, setNewCameraName] = useState("");
  const [newCameraLocation, setNewCameraLocation] = useState("");
  const [newCameraType, setNewCameraType] = useState("");
  const [newCameraDescription, setNewCameraDescription] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Toggle dark mode on document element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Check auth state and retrieve user role
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const role = await getUserRole(user.uid);
        setUserRole(role);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleChangeLocation = () => {
    const locations = [
      "All Locations",
      "Downtown",
      "Main Street",
      "Highway Junction",
      "School Zone",
      "Hospital Area",
    ];

    const currentIndex = locations.indexOf(selectedLocation);
    const nextIndex = (currentIndex + 1) % locations.length;
    setSelectedLocation(locations[nextIndex]);
  };

  const handleAddCamera = () => {
    console.log("Camera Added:", {
      name: newCameraName,
      location: newCameraLocation,
      type: newCameraType,
      description: newCameraDescription,
    });
    setShowAddCameraDialog(false);
  };

  const toggleDetection = () => {
    setIsDetecting(!isDetecting);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <PageBackground imageUrl="/images/city-traffic.jpg" opacity={0.07}>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold">Traffic Safety System</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
                <Link
                  href="/dashboard"
                  className="transition-colors hover:text-foreground/80"
                >
                  Dashboard
                </Link>
                <Link
                  href="/cameras"
                  className="transition-colors hover:text-foreground/80"
                >
                  Cameras
                </Link>
                {userRole === "authority" && (
                  <>
                    <Link
                      href="/analytics"
                      className="transition-colors hover:text-foreground/80"
                    >
                      Analytics
                    </Link>
                    <Link
                      href="/admin"
                      className="transition-colors hover:text-foreground/80"
                    >
                      Admin
                    </Link>
                  </>
                )}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  Welcome, {user?.displayName || user?.email}
                </span>
                {userRole && <UserRoleBadge role={userRole} />}
              </div>
              <ThemeToggle />
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 container py-6">
          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                  Monitor traffic density and speed limit warnings for{" "}
                  {selectedLocation}.
                </p>
              </div>
              {userRole === "authority" && (
                <Dialog
                  open={showAddCameraDialog}
                  onOpenChange={setShowAddCameraDialog}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Camera
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Camera</DialogTitle>
                      <DialogDescription>
                        Add a new camera to the monitoring system.
                      </DialogDescription>
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
                        <Select
                          value={newCameraType}
                          onValueChange={setNewCameraType}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select camera type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="school">School Zone</SelectItem>
                            <SelectItem value="hospital">
                              Hospital Zone
                            </SelectItem>
                            <SelectItem value="residential">
                              Residential Area
                            </SelectItem>
                            <SelectItem value="pedestrian">
                              Pedestrian Area
                            </SelectItem>
                            <SelectItem value="accident">
                              Accident Prone Area
                            </SelectItem>
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
                          onChange={(e) =>
                            setNewCameraDescription(e.target.value)
                          }
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

            {/* Date, Time, Weather, Location Widgets */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <DateTimeWidget />
              <WeatherWidget />
              <LocationWidget />
              {userRole === "authority" && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      System Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>All systems operational</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Last updated: {new Date().toLocaleTimeString()}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Main Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-background/90">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Cameras
                  </CardTitle>
                  <Camera className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last week
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background/90">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Traffic Density
                  </CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">High</div>
                  <p className="text-xs text-muted-foreground">
                    +18% from yesterday
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background/90">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Speed Warnings
                  </CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    -3% from yesterday
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background/90">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pedestrian Count
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">
                    +201 from yesterday
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="cameras">Camera Feeds</TabsTrigger>
                <TabsTrigger value="warnings">Speed Warnings</TabsTrigger>
                {userRole === "authority" && (
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                )}
                <TabsTrigger value="safety">Safety Guidelines</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4 bg-background/90">
                    <CardHeader>
                      <CardTitle>Traffic Density Over Time</CardTitle>
                      <CardDescription>
                        Hourly traffic density measurements from all active cameras
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <TrafficDensityChart />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3 bg-background/90">
                    <CardHeader>
                      <CardTitle>Speed Limit Warnings</CardTitle>
                      <CardDescription>
                        Recent speed limit violations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SpeedLimitWarnings />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="cameras" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <CameraFeed id="camera-1" name="Main Street" location="School Zone" />
                  <CameraFeed id="camera-2" name="Highway Junction" location="Accident Prone Area" />
                  <CameraFeed id="camera-3" name="Downtown" location="High Pedestrian Area" />
                </div>
              </TabsContent>
              <TabsContent value="warnings" className="space-y-4">
                <Card className="bg-background/90">
                  <CardHeader>
                    <CardTitle>Speed Limit Warnings</CardTitle>
                    <CardDescription>
                      Detailed view of all speed limit warnings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SpeedLimitWarnings detailed />
                  </CardContent>
                </Card>
              </TabsContent>
              {userRole === "authority" && (
                <TabsContent value="analytics" className="space-y-4">
                  <Card className="bg-background/90">
                    <CardHeader>
                      <CardTitle>Advanced Analytics</CardTitle>
                      <CardDescription>
                        Detailed traffic analysis and predictions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h3 className="text-lg font-medium mb-2">
                            Traffic Patterns
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Analysis of traffic patterns over the past 30 days shows a 15% increase in congestion during peak hours.
                          </p>
                          <LineChart
                            width={300}
                            height={160}
                            data={[
                              { day: "Mon", traffic: 120 },
                              { day: "Tue", traffic: 150 },
                              { day: "Wed", traffic: 180 },
                              { day: "Thu", traffic: 130 },
                              { day: "Fri", traffic: 200 },
                              { day: "Sat", traffic: 170 },
                              { day: "Sun", traffic: 160 },
                            ]}
                          >
                            <Line type="monotone" dataKey="traffic" stroke="#3b82f6" strokeWidth={2} />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                          </LineChart>
                        </div>
                        <div className="h-40 w-full rounded overflow-hidden">
                          <MapContainer
                            center={[28.6139, 77.209]}
                            zoom={13}
                            className="h-full w-full rounded"
                            scrollWheelZoom={false}
                          >
                            <TileLayer
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              attribution="© OpenStreetMap contributors"
                            />
                            {[
                              { lat: 28.61, lng: 77.21 },
                              { lat: 28.62, lng: 77.215 },
                              { lat: 28.605, lng: 77.205 },
                            ].map((loc, i) => (
                              <Marker key={i} position={[loc.lat, loc.lng]} />
                            ))}
                          </MapContainer>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
              <TabsContent value="safety" className="space-y-4">
                <SafetyGuidelines />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </PageBackground>
  );
}
