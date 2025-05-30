import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageBackground } from "@/components/page-background"

export default function TermsPage() {
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
            <h1 className="text-3xl font-bold mb-6">
              Terms and Conditions for Traffic Density Detection Project by Bhavik
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              <strong>Effective Date:</strong> 2024-10-27 (This document may be updated periodically. Please check the
              effective date for the latest version.)
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-2">1. Introduction</h2>
                <p>
                  Welcome to the Traffic Density Detection Project provided by Roll_74_75. This platform provides
                  traffic density detection services, offering users access to real-time and historical traffic data. By
                  accessing and using our platform, you agree to comply with and be bound by these Terms and Conditions.
                  If you do not agree with any part of these terms, please refrain from using our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">2. Definitions</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Platform:</strong> Refers to the website, application, and associated services provided by
                    Bhavik for traffic density detection.
                  </li>
                  <li>
                    <strong>Service:</strong> Encompasses all functionalities, data, and tools offered through the
                    Platform.
                  </li>
                  <li>
                    <strong>User:</strong> Any individual or entity accessing or using the Platform.
                  </li>
                  <li>
                    <strong>Data:</strong> Traffic density information, including real-time and historical data,
                    provided by the Platform.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">3. Permitted Use</h2>
                <p>Users are permitted to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Access and view traffic density data for informational purposes.</li>
                  <li>Utilize the detection features provided by the Platform.</li>
                </ul>
                <p className="mt-2">Users are strictly prohibited from:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Modifying, reverse engineering, or decompiling any part of the Platform.</li>
                  <li>Using the Platform for any illegal or unauthorized activities.</li>
                  <li>Exploiting the platform to gain unauthorized access to data.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">4. Prohibited Use</h2>
                <p>Users must not:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use the Platform to harm, harass, or endanger others.</li>
                  <li>Attempt to hack, bypass, or interfere with the security measures of the Platform.</li>
                  <li>Use the Data for commercial purposes without explicit written permission from Bhavik.</li>
                  <li>Upload any malicious software.</li>
                  <li>Use automated systems to scrap data.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">5. User Accounts (If Applicable)</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    If registration is required, Users must provide accurate and complete information during the
                    registration process.
                  </li>
                  <li>Users are responsible for maintaining the confidentiality of their login credentials.</li>
                  <li>Users are responsible for all activity that occurs under their account.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">6. Intellectual Property</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    All content, logos, code, Data, and intellectual property generated by the Platform are owned by
                    Roll_74_75.
                  </li>
                  <li>
                    Users are prohibited from copying, distributing, or reproducing any materials from the Platform
                    without our express written consent.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">7. Disclaimer of Liability</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>The Platform and its Service are provided "as is" and "as available."</li>
                  <li>Bhavik does not warrant the accuracy, completeness, or reliability of the traffic Data.</li>
                  <li>We are not liable for any interruptions or errors in the Service.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">8. Limitation of Liability</h2>
                <p>Bhavik shall not be liable for any damages arising from:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Inaccurate traffic predictions.</li>
                  <li>Technical issues or downtime of the Platform.</li>
                  <li>Unauthorized access to or use of User accounts.</li>
                  <li>Data loss.</li>
                  <li>Reliance on the service.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">9. Privacy Policy</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    User Data is collected, stored, and used in accordance with our Privacy Policy, which is available.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">10. Termination Clause</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    Bhavik reserves the right to terminate User accounts or restrict access to the Platform for any
                    violation of these Terms and Conditions.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">11. Governing Law</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your
                    Local Jurisdiction].
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">12. Changes to Terms</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Bhavik reserves the right to modify these Terms and Conditions at any time.</li>
                  <li>
                    Users will be notified of any changes via [Email/Notice on Website]. Continued use of the Platform
                    after such changes constitutes acceptance of the new Terms.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">13. Contact Information</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    For any questions or concerns regarding these Terms and Conditions, please contact us at:
                    bhaviksevak99@gmail.com.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-2">14. Optional Sections</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Payment Terms:</strong> (If applicable) Detail any fees, payment methods, and refund
                    policies.
                  </li>
                  <li>
                    <strong>Technical Requirements:</strong> (If applicable) Specify any browser, software, or hardware
                    requirements.
                  </li>
                  <li>
                    <strong>Affiliate Links:</strong> (If applicable) Disclose any affiliate relationships.
                  </li>
                </ul>
              </section>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                <strong>Important Note:</strong> It is crucial to have these Terms and Conditions reviewed by a legal
                professional to ensure compliance with all applicable laws and regulations in your jurisdiction. We hope
                you enjoy using our traffic density detection services!
              </p>
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

