import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageBackground } from "@/components/page-background"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AboutPage() {
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
                <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
                  Dashboard
                </Link>
                <Link href="/cameras" className="transition-colors hover:text-foreground/80">
                  Cameras
                </Link>
                <Link href="/analytics" className="transition-colors hover:text-foreground/80">
                  Analytics
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
        <main className="flex-1 container py-8">
          <div className="max-w-4xl mx-auto bg-background/95 p-8 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-6">Traffic Density Detection System</h1>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-3">1. Introduction</h2>
                <p className="mb-4">
                  Traffic congestion is a major issue in urban areas, leading to increased travel time, fuel
                  consumption, and environmental pollution. Traditional traffic management systems often fail to adapt
                  to real-time conditions, causing inefficiencies. The Traffic Density Detection System leverages
                  vision-based technologies to analyze traffic density and improve road safety. The system incorporates
                  computer vision, machine learning, and IoT to detect traffic signs, monitor vehicle density, and
                  provide real-time alerts.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">2. Objectives</h2>
                <p className="mb-2">The primary objectives of this project are:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Real-time Traffic Analysis:</strong> Monitor and analyze traffic congestion at various
                    locations.
                  </li>
                  <li>
                    <strong>Vision-Based Sign Detection:</strong> Detect and recognize traffic signs using image
                    processing techniques.
                  </li>
                  <li>
                    <strong>Speed Limit and Pedestrian Safety Alerts:</strong> Provide warnings via LCD/seven-segment
                    display and buzzer.
                  </li>
                  <li>
                    <strong>Integration with Smart City Systems:</strong> Improve urban traffic management through data
                    collection.
                  </li>
                  <li>
                    <strong>User Authentication:</strong> Secure access to the system using Firebase authentication.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">3. System Architecture</h2>
                <p className="mb-4">The system is structured into three main modules:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    <strong>Frontend:</strong> Web-based interface for user interaction.
                  </li>
                  <li>
                    <strong>Backend:</strong> Handles processing, sign detection, and real-time updates.
                  </li>
                  <li>
                    <strong>Database:</strong> Stores captured images, traffic data, and user information.
                  </li>
                </ul>

                <h3 className="text-xl font-bold mb-2">3.1 Frontend</h3>
                <p className="mb-2">
                  The frontend is designed using HTML, CSS, JavaScript, and React.js to provide an interactive user
                  experience.
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    <strong>Login and Registration:</strong> Users authenticate via Firebase.
                  </li>
                  <li>
                    <strong>Dashboard:</strong> Displays real-time traffic density information and alerts.
                  </li>
                  <li>
                    <strong>Location Selection:</strong> Users can select specific locations to access traffic feeds.
                  </li>
                </ul>

                <h3 className="text-xl font-bold mb-2">3.2 Backend</h3>
                <p className="mb-2">The backend is developed using Spring MVC and PostgreSQL, handling:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    <strong>Traffic Data Processing:</strong> Captures and processes traffic images.
                  </li>
                  <li>
                    <strong>Machine Learning Models:</strong> Detects vehicles, pedestrians, and signboards.
                  </li>
                  <li>
                    <strong>Authentication & API Services:</strong> Manages user roles and data requests.
                  </li>
                </ul>

                <h3 className="text-xl font-bold mb-2">3.3 Database</h3>
                <p className="mb-2">The database (PostgreSQL) is used to store:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>User Information:</strong> Authentication details.
                  </li>
                  <li>
                    <strong>Traffic Images:</strong> Processed and raw images for analysis.
                  </li>
                  <li>
                    <strong>Alert Logs:</strong> Records of triggered alerts and system actions.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">4. Technology Stack</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Component</TableHead>
                        <TableHead>Technology Used</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Frontend</TableCell>
                        <TableCell>React.js, HTML, CSS, JavaScript</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Backend</TableCell>
                        <TableCell>Spring MVC, Java</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Database</TableCell>
                        <TableCell>PostgreSQL</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Authentication</TableCell>
                        <TableCell>Firebase</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Machine Learning</TableCell>
                        <TableCell>TensorFlow, OpenCV</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Image Labeling</TableCell>
                        <TableCell>Roboflow</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">IoT Components</TableCell>
                        <TableCell>LCD, Buzzer, Camera</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">5. Implementation Details</h2>

                <h3 className="text-xl font-bold mb-2">5.1 Traffic Density Detection</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    <strong>Image Capturing:</strong> A camera captures real-time traffic images.
                  </li>
                  <li>
                    <strong>Preprocessing:</strong> Images are enhanced using OpenCV techniques.
                  </li>
                  <li>
                    <strong>Vehicle Counting:</strong> Object detection models (YOLO, SSD, etc.) are used to count
                    vehicles.
                  </li>
                  <li>
                    <strong>Density Estimation:</strong> The system classifies traffic conditions as low, medium, or
                    high density.
                  </li>
                </ul>

                <h3 className="text-xl font-bold mb-2">5.2 Traffic Sign Recognition</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    <strong>Sign Detection:</strong> The system detects and recognizes traffic signs based on
                    pre-trained datasets.
                  </li>
                  <li>
                    <strong>Warning System:</strong> When a speed limit or pedestrian sign is detected, alerts are
                    triggered.
                  </li>
                </ul>

                <h3 className="text-xl font-bold mb-2">5.3 Alert Mechanism</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    <strong>Buzzer Alert:</strong> If speed limits are exceeded, an alarm sounds.
                  </li>
                  <li>
                    <strong>LCD Display:</strong> Displays warning messages for drivers.
                  </li>
                  <li>
                    <strong>Web Notifications:</strong> Alerts are sent to users via the dashboard.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">6. System Workflow</h2>
                <ol className="list-decimal pl-6 space-y-1 mb-4">
                  <li>User logs in via Firebase authentication.</li>
                  <li>Selects a location from the dashboard.</li>
                  <li>Camera captures live feed and processes images.</li>
                  <li>ML model detects vehicles and signs in real-time.</li>
                  <li>Traffic density is calculated based on vehicle count.</li>
                  <li>Alerts are generated for speed limit violations.</li>
                  <li>Traffic data is stored for future analysis.</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">7. Challenges and Solutions</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Challenge</TableHead>
                        <TableHead>Solution</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Accuracy in detection</TableCell>
                        <TableCell>Fine-tuning ML models with custom datasets</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Processing speed</TableCell>
                        <TableCell>Using optimized OpenCV and TensorFlow libraries</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Real-time performance</TableCell>
                        <TableCell>Implementing edge computing for quick analysis</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Data storage</TableCell>
                        <TableCell>Efficient indexing in PostgreSQL</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Security concerns</TableCell>
                        <TableCell>Secure authentication via Firebase</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              {/* New Image Gallery Section */}
              <section>
                <h2 className="text-2xl font-bold mb-3">Image Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <img src="/images/confusion_matrix_normalized.png" alt="Confusion Matrix Normalized" className="rounded shadow" />
                  <img src="/images/F1_curve.png" alt="F1 Curve" className="rounded shadow" />
                  <img src="/images/labels_correlogram.jpg" alt="Labels Correlogram" className="rounded shadow" />
                  <img src="/images/P_curve.png" alt="Precision Curve" className="rounded shadow" />
                  <img src="/images/R_curve.png" alt="Recall Curve" className="rounded shadow" />
                  <img src="/images/train_batch0.jpg" alt="Train Batch 0" className="rounded shadow" />
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">8. Future Enhancements</h2>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    <strong>Integration with IoT Sensors:</strong> Enhance accuracy by using additional sensors.
                  </li>
                  <li>
                    <strong>AI-Powered Traffic Predictions:</strong> Predict congestion based on historical data.
                  </li>
                  <li>
                    <strong>Mobile App Development:</strong> Provide access via mobile applications.
                  </li>
                  <li>
                    <strong>Government Collaboration:</strong> Share data with traffic authorities for better urban
                    planning.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">9. Conclusion</h2>
                <p>
                  The Traffic Density Detection System is an innovative solution designed to tackle urban traffic
                  congestion using advanced technologies. By incorporating vision-based systems, AI, and IoT, the
                  project aims to enhance road safety and efficiency. Future improvements will further refine its
                  capabilities, making it a crucial tool for smart city implementations.
                </p>
              </section>
            </div>
          </div>
        </main>
        <footer className="py-6 border-t">
          <div className="container flex flex-col sm:flex-row items-center justify-between">
            <p className="text-xs text-muted-foreground">© 2025 Traffic Safety System. All rights reserved.</p>
            <nav className="flex gap-4 sm:gap-6 mt-3 sm:mt-0">
              <Link className="text-xs hover:underline underline-offset-4" href="/terms">
                Terms of Service
              </Link>
              <Link className="text-xs hover:underline underline-offset-4" href="/privacy">
                Privacy
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </PageBackground>
  )
}
