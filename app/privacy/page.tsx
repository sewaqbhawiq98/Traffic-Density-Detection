import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageBackground } from "@/components/page-background"

export default function PrivacyPage() {
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
            <h1 className="text-3xl font-bold mb-6">Privacy Policy for Traffic Density Detection Project by Bhavik</h1>
            <p className="text-sm text-muted-foreground mb-6">
              <strong>Effective Date:</strong> 2024-10-27
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-2">1. Introduction</h2>
                <p>
                  This Privacy Policy explains how Bhavik ("we," "us," or "our") collects, uses, and protects your
                  personal information when you use our Traffic Density Detection Platform (the "Platform"). We are
                  committed to protecting your privacy and ensuring the security of your data. By using our Platform,
                  you consent to the practices described in this policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">2. Information We Collect</h2>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Types of Data:</strong>
                    <ul className="list-disc pl-6 mt-1">
                      <li>Location data (if you enable location services).</li>
                      <li>IP address.</li>
                      <li>Device information (e.g., device type, operating system).</li>
                      <li>Usage data (e.g., how you interact with the Platform).</li>
                      <li>Any data you manually input into the platform.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>How We Collect Data:</strong>
                    <ul className="list-disc pl-6 mt-1">
                      <li>Automatically through your use of the Platform (e.g., IP address, device information).</li>
                      <li>Through location services on your device (with your consent).</li>
                      <li>Through cookies and tracking technologies (as described below).</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Why We Collect Data:</strong>
                    <ul className="list-disc pl-6 mt-1">
                      <li>To provide and improve the Traffic Density Detection Service.</li>
                      <li>To analyze traffic patterns and trends.</li>
                      <li>To personalize your user experience.</li>
                      <li>To ensure the security of our Platform.</li>
                      <li>To provide support.</li>
                    </ul>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">3. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Use of Data:</strong>
                    <ul className="list-disc pl-6 mt-1">
                      <li>We use location data to provide accurate traffic density information.</li>
                      <li>We use usage data to improve the functionality and performance of the Platform.</li>
                      <li>We use IP addresses and device information to ensure security and prevent fraud.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Sharing of Data:</strong>
                    <ul className="list-disc pl-6 mt-1">
                      <li>We may share aggregated and anonymized data with third-party analytics providers.</li>
                      <li>
                        We will not share your personal information with third parties for marketing purposes without
                        your explicit consent.
                      </li>
                      <li>We will provide data if required to do so by law.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Data Retention:</strong>
                    <ul className="list-disc pl-6 mt-1">
                      <li>
                        We retain your personal data for as long as necessary to provide the Service and comply with
                        legal obligations.
                      </li>
                      <li>
                        Location data is retained in aggregate form, and individual location data is not stored longer
                        than is required to provide the service.
                      </li>
                    </ul>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">4. Data Security</h2>
                <ul className="list-disc pl-6">
                  <li>
                    We implement reasonable security measures to protect your personal data from unauthorized access,
                    disclosure, or alteration.
                  </li>
                  <li>We use encryption and secure servers to safeguard your data.</li>
                  <li>
                    However, no internet transmission is completely secure, therefore we cannot guarantee absolute
                    security.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">5. Your Rights</h2>
                <ul className="list-disc pl-6">
                  <li>
                    <strong>Access and Correction:</strong> You have the right to access and correct your personal data.
                  </li>
                  <li>
                    <strong>Deletion:</strong> You may request the deletion of your personal data, subject to legal
                    limitations.
                  </li>
                  <li>
                    <strong>Objection:</strong> You may object to certain data processing activities.
                  </li>
                </ul>
                <p className="mt-2">
                  To exercise these rights, please contact us at the contact information provided below.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">6. Cookies and Tracking Technologies</h2>
                <ul className="list-disc pl-6">
                  <li>We may use cookies and similar tracking technologies to enhance your user experience.</li>
                  <li>You can manage your cookie preferences through your browser settings.</li>
                  <li>We use cookies to analyze platform usage.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">7. Children's Privacy</h2>
                <ul className="list-disc pl-6">
                  <li>Our Platform is not intended for children under the age of 13.</li>
                  <li>We do not knowingly collect personal information from children under 13.</li>
                  <li>
                    If we learn that we have collected information from a child under 13, we will promptly delete it.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">8. International Data Transfers</h2>
                <ul className="list-disc pl-6">
                  <li>
                    If we transfer your data internationally, we will implement appropriate safeguards to ensure its
                    protection.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">9. Changes to This Privacy Policy</h2>
                <ul className="list-disc pl-6">
                  <li>We may update this Privacy Policy from time to time.</li>
                  <li>We will notify you of any changes by posting the new policy on our Platform or via email.</li>
                  <li>Please review this policy periodically for any changes.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">10. Contact Us</h2>
                <p>
                  If you have any questions or concerns about this Privacy Policy, please contact us at:
                  bhaviksevak99@gmail.com or 9321497459.
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

