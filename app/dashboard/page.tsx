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

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode default ON
  const [isDetecting, setIsDetecting] = useState(false);

  // States for Add Camera Dialog
  const [showAddCameraDialog, setShowAddCameraDialog] = useState(false);
  const [newCameraName, setNewCameraName] = useState("");
  const [newCameraLocation, setNewCameraLocation] = useState("");
  const [newCameraType, setNewCameraType] = useState("");
  const [newCameraDescription, setNewCameraDescription] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Toggle dark mode on html root element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

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
    // Reset fields
    setNewCameraName("");
    setNewCameraLocation("");
    setNewCameraType("");
    setNewCameraDescription("");
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
              <ThemeToggle
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Date & Time</CardTitle>
                  <CardDescription>Current date and time</CardDescription>
                </CardHeader>
                <CardContent>
                  <DateTimeWidget />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weather</CardTitle>
                  <CardDescription>Current weather conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <WeatherWidget location={selectedLocation} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                  <CardDescription>Selected monitoring location</CardDescription>
                </CardHeader>
                <CardContent>
                  <LocationWidget location={selectedLocation} />
                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={handleChangeLocation}
                  >
                    Change Location
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="density" className="mt-6">
              <TabsList>
                <TabsTrigger value="density">Traffic Density</TabsTrigger>
                <TabsTrigger value="speed">Speed Limit Warnings</TabsTrigger>
                <TabsTrigger value="camera">Camera Feed</TabsTrigger>
                <TabsTrigger value="safety">Safety Guidelines</TabsTrigger>
              </TabsList>

              <TabsContent value="density" className="mt-4">
                <TrafficDensityChart location={selectedLocation} />
              </TabsContent>

              <TabsContent value="speed" className="mt-4">
                <SpeedLimitWarnings location={selectedLocation} />
              </TabsContent>

              <TabsContent value="camera" className="mt-4">
                <CameraFeed location={selectedLocation} />
                <Button
                  className="mt-4"
                  onClick={toggleDetection}
                  variant={isDetecting ? "destructive" : "default"}
                >
                  {isDetecting ? "Stop Detection" : "Start Detection"}
                </Button>
              </TabsContent>

              <TabsContent value="safety" className="mt-4">
                <SafetyGuidelines />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </PageBackground>
  );
}
