"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { type Link, useLinkTree } from "@/contexts/linktree-context"
import { useState } from "react"
import { toast } from "sonner"

interface LinkEditorProps {
  link?: Link
  onCancel: () => void
}

export default function LinkEditor({ link, onCancel }: LinkEditorProps) {
  const { addLink, updateLink } = useLinkTree()
  const [title, setTitle] = useState(link?.title || "")
  const [url, setUrl] = useState(link?.url || "")
  const [active, setActive] = useState(link?.active ?? true)
  const isEditing = !!link

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !url.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    // Simple URL validation
    try {
      // Add https if not present
      let formattedUrl = url
      if (!/^https?:\/\//i.test(url)) {
        formattedUrl = `https://${url}`
      }

      // Check if it's a valid URL
      new URL(formattedUrl)

      if (isEditing && link) {
        updateLink(link.id, { title, url: formattedUrl, active })
        toast.success("Link updated successfully")
      } else {
        addLink({ title, url: formattedUrl, active })
        toast.success("Link added successfully")
      }
      onCancel()
    } catch (error) {
      toast.error("Please enter a valid URL")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Link Title</Label>
        <Input id="title" placeholder="My Website" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="active" checked={active} onCheckedChange={setActive} />
        <Label htmlFor="active">Active</Label>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{isEditing ? "Update" : "Add"} Link</Button>
      </div>
    </form>
  )
}
