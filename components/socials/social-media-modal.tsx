"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { type SocialPlatform, type SocialProfile, useLinkTree } from "@/contexts/linktree-context"
import { toast } from "sonner"
import { Search, Plus, Check, ArrowLeft, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { PlatformIcon } from "./platform-icon"

// Platform data with icons
const PLATFORM_DATA = [
  { id: "facebook", name: "Facebook", color: "#1877F2" },
  { id: "twitter", name: "X / Twitter", color: "#1DA1F2" },
  { id: "instagram", name: "Instagram", color: "#E4405F" },
  { id: "youtube", name: "YouTube", color: "#FF0000" },
  { id: "linkedin", name: "LinkedIn", color: "#0A66C2" },
  { id: "tiktok", name: "TikTok", color: "#000000" },
  { id: "pinterest", name: "Pinterest", color: "#BD081C" },
  { id: "snapchat", name: "Snapchat", color: "#FFFC00" },
  { id: "whatsapp", name: "WhatsApp", color: "#25D366" },
  { id: "reddit", name: "Reddit", color: "#FF4500" },
  { id: "telegram", name: "Telegram", color: "#26A5E4" },
  { id: "discord", name: "Discord", color: "#5865F2" },
  { id: "github", name: "GitHub", color: "#181717" },
  { id: "twitch", name: "Twitch", color: "#9146FF" },
  { id: "behance", name: "Behance", color: "#1769FF" },
  { id: "dribbble", name: "Dribbble", color: "#EA4C89" },
  { id: "medium", name: "Medium", color: "#000000" },
  { id: "spotify", name: "Spotify", color: "#1DB954" },
  { id: "threads", name: "Threads", color: "#000000" },
]

// Group platforms by category
const PLATFORM_CATEGORIES = {
  popular: ["instagram", "twitter", "facebook", "tiktok", "youtube"],
  professional: ["linkedin", "github", "behance", "dribbble", "medium"],
  messaging: ["whatsapp", "telegram", "discord", "snapchat"],
  other: ["pinterest", "reddit", "twitch", "spotify", "threads"],
}

interface SocialMediaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SocialMediaModal({ open, onOpenChange }: SocialMediaModalProps) {
  const { state, addSocial, updateSocial, removeSocial } = useLinkTree()
  const [activeTab, setActiveTab] = useState<"browse" | "manage">("browse")
  const [searchQuery, setSearchQuery] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [platform, setPlatform] = useState<SocialPlatform>("instagram")
  const [username, setUsername] = useState("")
  const [url, setUrl] = useState("")
  const [active, setActive] = useState(true)
  const [showEditForm, setShowEditForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      resetForm()
    }
  }, [open])

  // Reset form
  const resetForm = () => {
    setEditingId(null)
    setPlatform("instagram")
    setUsername("")
    setUrl("")
    setActive(true)
    setShowEditForm(false)
    setSearchQuery("")
    setSelectedCategory("all")
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

  // Handle platform selection
  const handlePlatformSelect = (value: SocialPlatform) => {
    setPlatform(value)
    setUrl(generatePlatformUrl(value, username))
    setShowEditForm(true)
  }

  // Handle editing a social profile
  const handleEdit = (social: SocialProfile) => {
    setEditingId(social.id)
    setPlatform(social.platform)
    setUsername(social.username)
    setUrl(social.url)
    setActive(social.active)
    setShowEditForm(true)
    setActiveTab("browse")
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

      resetForm()
      setActiveTab("manage")
    } catch (error) {
      toast.error("Please enter a valid URL")
    }
  }

  // Handle deleting a social profile
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this social account?")) {
      removeSocial(id)
      toast.success("Social account deleted")
      resetForm()
    }
  }

  // Filter platforms based on search query and category
  const getFilteredPlatforms = () => {
    let platforms = PLATFORM_DATA

    // Filter by search query
    if (searchQuery) {
      platforms = platforms.filter((platform) => platform.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Filter by category
    if (selectedCategory !== "all") {
      const categoryPlatforms = PLATFORM_CATEGORIES[selectedCategory as keyof typeof PLATFORM_CATEGORIES] || []
      platforms = platforms.filter((platform) => categoryPlatforms.includes(platform.id))
    }

    return platforms
  }

  // Check if a platform is already added
  const isPlatformAdded = (platformId: string) => {
    return state.socials.some((social) => social.platform === platformId)
  }

  // Get platform info by ID
  const getPlatformInfo = (platformId: string) => {
    return PLATFORM_DATA.find((p) => p.id === platformId)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Manage Social Media</DialogTitle>
          <DialogDescription>Add and manage your social media accounts to display on your profile.</DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "browse" | "manage")}
          className="flex flex-col"
        >
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">Browse Platforms</TabsTrigger>
              <TabsTrigger value="manage">Manage Accounts ({state.socials.length})</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="browse" className="flex flex-col space-y-4 mt-4 px-6 focus-visible:outline-none">
            {!showEditForm ? (
              <>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search platforms..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
                    <Button
                      variant={selectedCategory === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory("all")}
                      className="whitespace-nowrap"
                    >
                      All
                    </Button>
                    <Button
                      variant={selectedCategory === "popular" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory("popular")}
                      className="whitespace-nowrap"
                    >
                      Popular
                    </Button>
                    <Button
                      variant={selectedCategory === "professional" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory("professional")}
                      className="whitespace-nowrap"
                    >
                      Professional
                    </Button>
                    <Button
                      variant={selectedCategory === "messaging" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory("messaging")}
                      className="whitespace-nowrap"
                    >
                      Messaging
                    </Button>
                    <Button
                      variant={selectedCategory === "other" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory("other")}
                      className="whitespace-nowrap"
                    >
                      Other
                    </Button>
                  </div>
                </div>

                <ScrollArea className="h-[350px] pr-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pb-4">
                    {getFilteredPlatforms().map((platform) => {
                      const isAdded = isPlatformAdded(platform.id)

                      return (
                        <div
                          key={platform.id}
                          className={cn(
                            "border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all",
                            isAdded
                              ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800/50",
                          )}
                          onClick={() => handlePlatformSelect(platform.id as SocialPlatform)}
                        >
                          <div
                            className={cn(
                              "rounded-full w-12 h-12 flex items-center justify-center mb-2",
                              isAdded ? "bg-emerald-100 dark:bg-emerald-900/50" : "bg-gray-100 dark:bg-gray-800",
                            )}
                          >
                            {isAdded ? (
                              <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <PlatformIcon platform={platform.id} size="md" color={platform.color} />
                            )}
                          </div>
                          <span className="text-sm font-medium text-center">{platform.name}</span>
                          {isAdded && (
                            <Badge variant="outline" className="mt-2 text-xs">
                              Added
                            </Badge>
                          )}
                        </div>
                      )
                    })}

                    {getFilteredPlatforms().length === 0 && (
                      <div className="col-span-3 py-8 text-center">
                        <p className="text-muted-foreground">No platforms found matching your search.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Button variant="outline" size="sm" onClick={() => setShowEditForm(false)}>
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back
                  </Button>
                  <div className="flex items-center gap-2">
                    <div
                      className="rounded-full w-8 h-8 flex items-center justify-center"
                      style={{ backgroundColor: "rgba(229, 231, 235, 0.5)" }}
                    >
                      <PlatformIcon platform={platform} size="sm" color={getPlatformInfo(platform)?.color} />
                    </div>
                    <h3 className="text-lg font-medium">
                      {editingId ? "Edit" : "Add"} {getPlatformInfo(platform)?.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => handleUsernameChange(e.target.value)}
                      placeholder="Your username or handle"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="url">URL</Label>
                    <div className="flex">
                      <Input
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://..."
                        className="rounded-r-none"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        className="rounded-l-none border-l-0"
                        onClick={() => {
                          if (url) {
                            window.open(url, "_blank")
                          }
                        }}
                        disabled={!url}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      The URL will be automatically generated based on your username, but you can edit it if needed.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="active" checked={active} onCheckedChange={setActive} />
                    <Label htmlFor="active">Active</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  {editingId && (
                    <Button variant="destructive" onClick={() => handleDelete(editingId)}>
                      Delete
                    </Button>
                  )}
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Save</Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="manage" className="mt-4 px-6 focus-visible:outline-none">
            {state.socials.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">You haven't added any social accounts yet.</p>
                <Button onClick={() => setActiveTab("browse")}>
                  <Plus className="mr-2 h-4 w-4" /> Add Social Account
                </Button>
              </div>
            ) : (
              <ScrollArea className="h-[350px] pr-4">
                <div className="space-y-3 pb-4">
                  {state.socials.map((social) => {
                    const platformInfo = getPlatformInfo(social.platform)

                    return (
                      <div
                        key={social.id}
                        className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <div
                          className={cn(
                            "rounded-full w-10 h-10 flex items-center justify-center",
                            social.active ? "bg-gray-100 dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-800 opacity-60",
                          )}
                        >
                          <PlatformIcon
                            platform={social.platform}
                            size="sm"
                            color={platformInfo?.color}
                            className={!social.active ? "opacity-60" : ""}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{platformInfo?.name || social.platform}</h3>
                            {!social.active && (
                              <Badge variant="outline" className="text-xs">
                                Inactive
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">@{social.username}</p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              window.open(social.url, "_blank")
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(social)}>
                            Edit
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex items-center justify-between p-6 pt-2 border-t mt-4">
          <div className="text-sm text-muted-foreground">{state.socials.length} accounts added</div>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
