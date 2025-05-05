"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLinkTree } from "@/contexts/linktree-context"
import { Upload, ImageIcon, Trash2, ExternalLink } from "lucide-react"
import { toast } from "sonner"

interface BackgroundImageUploadProps {
  onImageSelected?: (imageUrl: string) => void
}

export function BackgroundImageUpload({ onImageSelected }: BackgroundImageUploadProps) {
  const { state, updateTheme } = useLinkTree()
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload")
  const [imageUrl, setImageUrl] = useState(state.theme.backgroundImage || "")
  const [previewUrl, setPreviewUrl] = useState<string | null>(state.theme.backgroundImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB")
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setPreviewUrl(result)

      if (onImageSelected) {
        onImageSelected(result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!imageUrl) {
      toast.error("Please enter an image URL")
      return
    }

    // Basic URL validation
    try {
      new URL(imageUrl)
    } catch (error) {
      toast.error("Please enter a valid URL")
      return
    }

    setPreviewUrl(imageUrl)

    if (onImageSelected) {
      onImageSelected(imageUrl)
    }

    toast.success("Background image updated")
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    setImageUrl("")

    if (onImageSelected) {
      onImageSelected("")
    }

    toast.success("Background image removed")
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "upload" | "url")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Image</TabsTrigger>
          <TabsTrigger value="url">Image URL</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <div
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            onClick={triggerFileInput}
          >
            <Input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-medium mb-1">Click to upload</p>
            <p className="text-xs text-muted-foreground">PNG, JPG or GIF (max. 5MB)</p>
          </div>
        </TabsContent>

        <TabsContent value="url" className="space-y-4">
          <form onSubmit={handleUrlSubmit}>
            <div className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="image-url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <Button type="submit">Apply</Button>
              </div>
              <p className="text-xs text-muted-foreground">Enter the URL of an image to use as your background</p>
            </div>
          </form>
        </TabsContent>
      </Tabs>

      {previewUrl && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="text-sm font-medium flex items-center justify-between">
                <div className="flex items-center">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  <span>Background Preview</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => window.open(previewUrl, "_blank")}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleRemoveImage}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${previewUrl})` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
