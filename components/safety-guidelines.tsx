import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Check, Info, ExternalLink } from "lucide-react"
import Link from "next/link"

export function SafetyGuidelines() {
  const guidelines = [
    {
      title: "School Zone Safety",
      description: "Reduce speed to 20 km/h when passing through school zones during school hours.",
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    },
    {
      title: "Hospital Area",
      description: "Maintain low noise levels and adhere to the 30 km/h speed limit near hospitals.",
      icon: <Info className="h-4 w-4 text-blue-500" />,
    },
    {
      title: "Pedestrian Crossings",
      description: "Always yield to pedestrians at crosswalks and intersections.",
      icon: <Check className="h-4 w-4 text-green-500" />,
    },
    {
      title: "Accident-Prone Areas",
      description: "Exercise extra caution in areas marked as accident-prone. Reduce speed and stay alert.",
      icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
    },
    {
      title: "Traffic Signal Compliance",
      description: "Always obey traffic signals and stop completely at red lights and stop signs.",
      icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
    },
    {
      title: "Seat Belt Usage",
      description: "All occupants must wear seat belts at all times while the vehicle is in motion.",
      icon: <Check className="h-4 w-4 text-green-500" />,
    },
    {
      title: "Child Safety",
      description: "Children under 12 should ride in the back seat with appropriate child restraint systems.",
      icon: <Info className="h-4 w-4 text-blue-500" />,
    },
    {
      title: "Mobile Phone Usage",
      description: "Do not use mobile phones while driving unless using hands-free devices.",
      icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
    },
    {
      title: "Drunk Driving",
      description: "Never drive under the influence of alcohol or drugs.",
      icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
    },
    {
      title: "Lane Discipline",
      description: "Stay in your lane and use indicators when changing lanes.",
      icon: <Check className="h-4 w-4 text-green-500" />,
    },
    {
      title: "Overtaking Rules",
      description: "Overtake only from the right side and when it is safe to do so.",
      icon: <Info className="h-4 w-4 text-blue-500" />,
    },
    {
      title: "Headlight Usage",
      description: "Use headlights during night, foggy conditions, or when visibility is poor.",
      icon: <Check className="h-4 w-4 text-green-500" />,
    },
    {
      title: "Emergency Vehicles",
      description: "Give way to emergency vehicles with sirens or flashing lights.",
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    },
    {
      title: "Parking Regulations",
      description: "Do not park in no-parking zones, near fire hydrants, or on pedestrian paths.",
      icon: <Info className="h-4 w-4 text-blue-500" />,
    },
    {
      title: "Vehicle Maintenance",
      description: "Ensure your vehicle is in good working condition with regular maintenance checks.",
      icon: <Check className="h-4 w-4 text-green-500" />,
    },
    {
      title: "Honking Restrictions",
      description: "Avoid unnecessary honking, especially in silent zones like hospitals and schools.",
      icon: <Info className="h-4 w-4 text-blue-500" />,
    },
    {
      title: "Speed Limits",
      description: "Adhere to posted speed limits and adjust speed according to road and weather conditions.",
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    },
    {
      title: "Two-Wheeler Safety",
      description: "Wear helmets while riding two-wheelers and avoid carrying more than one pillion rider.",
      icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
    },
    {
      title: "Zebra Crossing",
      description: "Stop before zebra crossings and allow pedestrians to cross safely.",
      icon: <Check className="h-4 w-4 text-green-500" />,
    },
    {
      title: "Driving in Adverse Weather",
      description: "Reduce speed and maintain safe distance during rain, fog, or other adverse weather conditions.",
      icon: <Info className="h-4 w-4 text-blue-500" />,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Safety Guidelines</CardTitle>
        <CardDescription>Important safety information for drivers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {guidelines.map((guideline, index) => (
            <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
              <div className="mt-0.5">{guideline.icon}</div>
              <div>
                <h4 className="font-medium">{guideline.title}</h4>
                <p className="text-sm text-muted-foreground">{guideline.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <Link
            href="https://morth.nic.in/road-safety"
            target="_blank"
            rel="noopener noreferrer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-primary hover:underline"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Indian Traffic Guidelines - Ministry of Road Transport & Highways
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

