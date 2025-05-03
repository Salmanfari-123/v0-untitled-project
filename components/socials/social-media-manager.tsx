"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { type SocialPlatform, type SocialProfile, useLinkTree } from "@/contexts/linktree-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import SocialMediaGrid from "./social-media-grid"
import { Grip, MoreHorizontal, Pencil, Trash, AtSign, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface SocialMediaManagerProps {
  isAddingNew?: boolean
  onCancelAdd?: () => void
}

// Platform data for reference
const PLATFORM_DATA = [
  { id: "facebook", name: "Facebook" },
  { id: "twitter", name: "X / Twitter" },
  { id: "instagram", name: "Instagram" },
  { id: "youtube", name: "YouTube" },
  { id: "linkedin", name: "LinkedIn" },
  { id: "tiktok", name: "TikTok" },
  { id: "pinterest", name: "Pinterest" },
  { id: "snapchat", name: "Snapchat" },
  { id: "whatsapp", name: "WhatsApp" },
  { id: "reddit", name: "Reddit" },
  { id: "telegram", name: "Telegram" },
  { id: "discord", name: "Discord" },
  { id: "github", name: "GitHub" },
  { id: "twitch", name: "Twitch" },
  { id: "behance", name: "Behance" },
  { id: "dribbble", name: "Dribbble" },
  { id: "medium", name: "Medium" },
  { id: "spotify", name: "Spotify" },
  { id: "threads", name: "Threads" },
]

export default function SocialMediaManager({ isAddingNew = false, onCancelAdd }: SocialMediaManagerProps) {
  const { state, addSocial, updateSocial, removeSocial } = useLinkTree()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [platform, setPlatform] = useState<SocialPlatform>("instagram")
  const [username, setUsername] = useState("")
  const [url, setUrl] = useState("")
  const [active, setActive] = useState(true)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  // Handle opening the add modal when isAddingNew becomes true
  useEffect(() => {
    if (isAddingNew) {
      resetForm()
      setModalOpen(true)
    }
  }, [isAddingNew])

  // Reset form
  const resetForm = () => {
    setEditingId(null)
    setPlatform("instagram")
    setUsername("")
    setUrl("")
    setActive(true)
  }

  // Handle platform selection
  const handlePlatformChange = (value: string) => {
    setPlatform(value as SocialPlatform)
    // Generate a placeholder URL for the selected platform
    setUrl(generatePlatformUrl(value as SocialPlatform, username))
  }

  // Generate platform URL based on username
  const generatePlatformUrl = (platform: SocialPlatform, username: string): string => {
    if (!username) return ""

    switch (platform) {
      case "facebook":
        return `https://facebook.com/${username}`
      case "twitter":
        return `https://twitter.com/${username}`
      case "instagram":
        return `https://instagram.com/${username}`
      case "youtube":
        return `https://youtube.com/${username}`
      case "linkedin":
        return `https://linkedin.com/in/${username}`
      case "tiktok":
        return `https://tiktok.com/@${username}`
      case "pinterest":
        return `https://pinterest.com/${username}`
      case "snapchat":
        return `https://snapchat.com/add/${username}`
      case "whatsapp":
        return `https://wa.me/${username}`
      case "reddit":
        return `https://reddit.com/user/${username}`
      case "telegram":
        return `https://t.me/${username}`
      case "discord":
        return `https://discord.gg/${username}`
      case "github":
        return `https://github.com/${username}`
      case "twitch":
        return `https://twitch.tv/${username}`
      case "behance":
        return `https://behance.net/${username}`
      case "dribbble":
        return `https://dribbble.com/${username}`
      case "medium":
        return `https://medium.com/@${username}`
      case "spotify":
        return `https://open.spotify.com/user/${username}`
      case "threads":
        return `https://threads.net/@${username}`
      default:
        return `https://${platform}.com/${username}`
    }
  }

  // Handle username changes
  const handleUsernameChange = (value: string) => {
    setUsername(value)
    setUrl(generatePlatformUrl(platform, value))
  }

  // Handle editing a social profile
  const handleEdit = (social: SocialProfile) => {
    setEditingId(social.id)
    setPlatform(social.platform)
    setUsername(social.username)
    setUrl(social.url)
    setActive(social.active)
    setModalOpen(true)
  }

  // Handle saving social profile
  const handleSave = () => {
    if (!username.trim()) {
      toast.error("Please enter a username")
      return
    }

    if (!url.trim()) {
      toast.error("Please enter a URL")
      return
    }

    try {
      // Validate URL
      new URL(url)

      if (editingId) {
        updateSocial(editingId, { platform, username, url, active })
        toast.success("Social account updated")
      } else {
        addSocial({ platform, username, url, active })
        toast.success("Social account added")
      }

      setModalOpen(false)
      resetForm()
      if (onCancelAdd) onCancelAdd()
    } catch (error) {
      toast.error("Please enter a valid URL")
    }
  }

  // Handle deleting a social profile
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this social account?")) {
      removeSocial(id)
      toast.success("Social account deleted")
    }
  }

  // Handle toggle active state
  const handleToggleActive = (id: string, active: boolean) => {
    updateSocial(id, { active })
  }

  // Handle drag operations
  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (event: React.DragEvent, index: number) => {
    event.preventDefault()
    // Implementation for drag and drop reordering would go here
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    // Implementation for finalizing drag and drop reordering would go here
  }

  if (state.socials.length === 0 && !isAddingNew) {
    return (
      <div className="text-center p-6">
        <AtSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No Social Accounts Yet</h3>
        <p className="text-muted-foreground mb-4">
          Add your social media accounts to display them on your LinkForest profile.
        </p>
        <Button
          onClick={() => {
            resetForm()
            setModalOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Social Account
        </Button>

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Social Media Account</DialogTitle>
              <DialogDescription>Enter your social media details to display them on your profile.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="platform">Platform</Label>
                <Select value={platform} onValueChange={handlePlatformChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORM_DATA.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  placeholder="Your username or handle"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="active" checked={active} onCheckedChange={setActive} />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setModalOpen(false)
                  resetForm()
                  if (onCancelAdd) onCancelAdd()
                }}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleSave}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div>
      <SocialMediaGrid
        onAdd={() => {
          resetForm()
          setModalOpen(true)
        }}
      />

      <div className="mt-6 space-y-3">
        {state.socials.map((social, index) => (
          <div
            key={social.id}
            className={cn(
              "flex items-center gap-3 p-3 border rounded-lg",
              draggedIndex === index && "border-emerald-500 bg-emerald-50",
              !social.active && "opacity-60",
            )}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <div className="cursor-grab p-1 text-gray-400 hover:text-gray-700" onMouseDown={(e) => e.preventDefault()}>
              <Grip className="h-4 w-4" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <h3 className="font-medium">
                  {PLATFORM_DATA.find((p) => p.id === social.platform)?.name || social.platform}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground truncate">@{social.username}</p>
            </div>

            <Switch
              checked={social.active}
              onCheckedChange={(checked) => handleToggleActive(social.id, checked)}
              aria-label={`Toggle ${social.platform} active state`}
            />

            <DropdownMenu>
              <DropdownMenuTrigger className="p-1 text-gray-500 hover:text-gray-700">
                <MoreHorizontal className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleEdit(social)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(social.id)}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit" : "Add"} Social Media Account</DialogTitle>
            <DialogDescription>Enter your social media details to display them on your profile.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={platform} onValueChange={handlePlatformChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {PLATFORM_DATA.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                placeholder="Your username or handle"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="active" checked={active} onCheckedChange={setActive} />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setModalOpen(false)
                resetForm()
                if (onCancelAdd) onCancelAdd()
              }}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
