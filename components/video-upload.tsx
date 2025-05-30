"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X, Check, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { db, storage } from "@/lib/firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

interface VideoUploadProps {
  onUploadComplete?: (videoData: any) => void
}

export function VideoUpload({ onUploadComplete }: VideoUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      // Check if file is a video
      if (!selectedFile.type.startsWith("video/")) {
        setError("Please select a valid video file")
        return
      }
      setFile(selectedFile)
      setError("")
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload")
      return
    }

    if (!title || !location || !category) {
      setError("Please fill in all required fields")
      return
    }

    setUploading(true)
    setError("")
    setProgress(0)

    try {
      // Create a storage reference
      const storageRef = ref(storage, `videos/${Date.now()}_${file.name}`)

      // Upload the file
      const uploadTask = uploadBytesResumable(storageRef, file)

      // Listen for upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProgress(progress)
        },
        (error) => {
          setError("Upload failed: " + error.message)
          setUploading(false)
        },
        async () => {
          // Upload completed successfully, get download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

          // Save video metadata to Firestore
          const videoData = {
            title,
            description,
            location,
            category,
            url: downloadURL,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            uploadedAt: serverTimestamp(),
            processed: false,
          }

          const docRef = await addDoc(collection(db, "videos"), videoData)

          setSuccess(true)
          if (onUploadComplete) {
            onUploadComplete({
              id: docRef.id,
              ...videoData,
            })
          }

          // Reset form after successful upload
          setTimeout(() => {
            setFile(null)
            setTitle("")
            setDescription("")
            setLocation("")
            setCategory("")
            setSuccess(false)
            setUploading(false)
          }, 3000)
        },
      )
    } catch (error: any) {
      setError("Upload failed: " + error.message)
      setUploading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Traffic Video</CardTitle>
        <CardDescription>Upload recorded traffic videos for analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="video-file">Video File</Label>
          {!file ? (
            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">Drag and drop or click to upload</p>
              <Input id="video-file" type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
              <Button variant="outline" onClick={() => document.getElementById("video-file")?.click()}>
                Select Video
              </Button>
            </div>
          ) : (
            <div className="border rounded-md p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center mr-3">
                  <video className="w-full h-full object-cover rounded-md" />
                </div>
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setFile(null)} disabled={uploading}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
            disabled={uploading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description"
            disabled={uploading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              disabled={uploading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} disabled={uploading}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="school_zone">School Zone</SelectItem>
                <SelectItem value="hospital_zone">Hospital Zone</SelectItem>
                <SelectItem value="residential">Residential Area</SelectItem>
                <SelectItem value="highway">Highway</SelectItem>
                <SelectItem value="intersection">Intersection</SelectItem>
                <SelectItem value="pedestrian_crossing">Pedestrian Crossing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Uploading...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-3 rounded-md flex items-center">
            <Check className="h-4 w-4 mr-2" />
            <span>Video uploaded successfully!</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleUpload} disabled={!file || uploading || success}>
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Video
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

