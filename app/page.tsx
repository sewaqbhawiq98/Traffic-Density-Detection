import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { PageBackground } from "@/components/page-background"

export default function Home() {
  return (
    <PageBackground imageUrl="/images/traffic-background.jpg" opacity={0.1}>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 hidden md:flex">
              <Link href="/" className="mr-6 flex items-center space-x-2">
                <span className="hidden font-bold sm:inline-block">Traffic Safety System</span>
              </Link>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <Link href="/dashboard" className="transition-colors hover:text-foreground/80 flex items-center">
                  Dashboard
                  <span className="ml-1 text-xs text-amber-600 font-medium">(Authority Login Required)</span>
                </Link>
                <Link href="/cameras" className="transition-colors hover:text-foreground/80 flex items-center">
                  Cameras
                  <span className="ml-1 text-xs text-amber-600 font-medium">(Authority Login Required)</span>
                </Link>
                <Link href="/analytics" className="transition-colors hover:text-foreground/80 flex items-center">
                  Analytics
                  <span className="ml-1 text-xs text-amber-600 font-medium">(Authority Login Required)</span>
                </Link>
              </nav>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-2">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Traffic Density Detection System
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      Ensuring pedestrian safety and enforcing vehicle speed limits in high-density areas through
                      vision-based systems.
                    </p>
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-2 text-amber-800 text-sm mt-2">
                      <strong>Note:</strong> Authority login is required to access Dashboard, Cameras, and Analytics
                      features.
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="/login">
                      <Button size="lg" className="gap-1.5">
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/about">
                      <Button size="lg" variant="outline">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-muted md:h-[400px] lg:h-[500px]">
                    <img
                      src="/images/mustang-sunset.jpg"
                      alt="Ford Mustang at sunset"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our system uses advanced computer vision and machine learning to enhance road safety.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background/80">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7H2Z"></path>
                      <path d="M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2Z"></path>
                      <path d="M18 11c-1.5 0-3 .5-3 2 2 0 3 0 3-2Z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Traffic Density Detection</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Uses vision-based methods to determine traffic congestion in real-time.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background/80">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 8v4l3 3"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Speed Limit Detection</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Identifies speed limit signs, school zones, and accident-prone areas.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background/80">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Warning System</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Alerts drivers through displays and buzzers when speed limits are breached.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-muted-foreground">© 2025 Traffic Safety System. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="/terms">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="/privacy">
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </PageBackground>
  )
}

