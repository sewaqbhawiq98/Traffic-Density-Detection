"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { generateAuthorityId, getUnusedAuthorityIds } from "@/lib/firebase"
import { Copy, Plus, Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function AuthorityIdManager() {
  const [authorityIds, setAuthorityIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Load unused authority IDs
  useEffect(() => {
    const loadAuthorityIds = async () => {
      try {
        const ids = await getUnusedAuthorityIds()
        setAuthorityIds(ids)
      } catch (error) {
        console.error("Error loading authority IDs:", error)
        setError("Failed to load authority IDs. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadAuthorityIds()
  }, [])

  // Generate a new authority ID
  const handleGenerateId = async () => {
    setGenerating(true)
    setError("")
    setSuccess("")

    try {
      const newId = await generateAuthorityId()
      setAuthorityIds([...authorityIds, newId])
      setSuccess(`New Authority ID generated: ${newId}`)
    } catch (error) {
      console.error("Error generating authority ID:", error)
      setError("Failed to generate Authority ID. Please try again.")
    } finally {
      setGenerating(false)
    }
  }

  // Copy authority ID to clipboard
  const handleCopyId = (id: string) => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
      })
      .catch((err) => {
        console.error("Failed to copy:", err)
      })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Authority ID Management</CardTitle>
        <CardDescription>Generate and manage Authority IDs for registration</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Unused Authority IDs</h3>
            <Button onClick={handleGenerateId} disabled={generating}>
              <Plus className="h-4 w-4 mr-2" />
              {generating ? "Generating..." : "Generate New ID"}
            </Button>
          </div>

          {loading ? (
            <div className="py-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading Authority IDs...</p>
            </div>
          ) : authorityIds.length === 0 ? (
            <div className="py-8 text-center border rounded-md">
              <p className="text-muted-foreground">No unused Authority IDs available. Generate a new one.</p>
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Authority ID</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {authorityIds.map((id) => (
                    <TableRow key={id}>
                      <TableCell className="font-medium">{id}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleCopyId(id)} className="h-8 w-8 p-0">
                          {copiedId === id ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Authority IDs are required for authority registration. Share these IDs with authorized personnel only.
        </p>
      </CardFooter>
    </Card>
  )
}

