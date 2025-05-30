"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Search, Download, Filter } from "lucide-react"

// Mock vehicle data
const vehicleData = [
  {
    id: "VEH-001",
    type: "Car",
    model: "Sedan",
    color: "Black",
    timestamp: "2024-10-27 08:32:15",
    location: "Main Street",
    speed: 48,
  },
  {
    id: "VEH-002",
    type: "Motorcycle",
    model: "Sport",
    color: "Red",
    timestamp: "2024-10-27 09:15:22",
    location: "Highway Junction",
    speed: 62,
  },
  {
    id: "VEH-003",
    type: "Truck",
    model: "Delivery",
    color: "White",
    timestamp: "2024-10-27 10:05:47",
    location: "Industrial Zone",
    speed: 35,
  },
  {
    id: "VEH-004",
    type: "Car",
    model: "SUV",
    color: "Blue",
    timestamp: "2024-10-27 11:22:33",
    location: "School Zone",
    speed: 28,
  },
  {
    id: "VEH-005",
    type: "Bus",
    model: "Transit",
    color: "Yellow",
    timestamp: "2024-10-27 12:45:18",
    location: "Downtown",
    speed: 32,
  },
  {
    id: "VEH-006",
    type: "Car",
    model: "Hatchback",
    color: "Silver",
    timestamp: "2024-10-27 13:17:42",
    location: "Residential Area",
    speed: 38,
  },
  {
    id: "VEH-007",
    type: "Motorcycle",
    model: "Cruiser",
    color: "Black",
    timestamp: "2024-10-27 14:30:55",
    location: "Highway Junction",
    speed: 58,
  },
  {
    id: "VEH-008",
    type: "Truck",
    model: "Heavy",
    color: "Green",
    timestamp: "2024-10-27 15:12:09",
    location: "Industrial Zone",
    speed: 42,
  },
  {
    id: "VEH-009",
    type: "Car",
    model: "Compact",
    color: "Red",
    timestamp: "2024-10-27 16:05:37",
    location: "Main Street",
    speed: 45,
  },
  {
    id: "VEH-010",
    type: "Bicycle",
    model: "Mountain",
    color: "Blue",
    timestamp: "2024-10-27 17:22:14",
    location: "Park Boulevard",
    speed: 18,
  },
]

export function VehicleDatabase() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  // Filter vehicles based on search query and type filter
  const filteredVehicles = vehicleData.filter((vehicle) => {
    const matchesSearch =
      vehicle.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filterType === "all" || vehicle.type.toLowerCase() === filterType.toLowerCase()

    return matchesSearch && matchesType
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Database</CardTitle>
        <CardDescription>Records of vehicles detected by traffic cameras</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search vehicles..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter by type</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="car">Cars</SelectItem>
                <SelectItem value="motorcycle">Motorcycles</SelectItem>
                <SelectItem value="truck">Trucks</SelectItem>
                <SelectItem value="bus">Buses</SelectItem>
                <SelectItem value="bicycle">Bicycles</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Speed (km/h)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No vehicles found matching your search criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.id}</TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>
                      {vehicle.model} ({vehicle.color})
                    </TableCell>
                    <TableCell>{vehicle.location}</TableCell>
                    <TableCell>{vehicle.timestamp}</TableCell>
                    <TableCell className={vehicle.speed > 50 ? "text-destructive font-bold" : ""}>
                      {vehicle.speed}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredVehicles.length} of {vehicleData.length} vehicles
        </div>
      </CardContent>
    </Card>
  )
}

