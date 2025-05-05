"use client"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import PreviewPanel from "@/components/preview/preview-panel"
import { SocialMediaModal } from "@/components/socials/social-media-modal"
import { PlatformIcon } from "@/components/socials/platform-icon"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useLinkTree } from "@/contexts/linktree-context"
import { AtSign, Plus, ExternalLink } from "lucide-react"
import { useState } from "react"

// Platform data with colors
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

export default function SocialsPage() {
  const { state, updateTheme } = useLinkTree()
  const [socialModalOpen, setSocialModalOpen] = useState(false)

  const handleSocialIconStyleChange = (style: "branded" | "monochrome" | "minimal") => {
    updateTheme({ socialIconStyle: style })
  }

  // Get platform info by ID
  const getPlatformInfo = (platformId: string) => {
    return PLATFORM_DATA.find((p) => p.id === platformId)
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Social Media Accounts</h1>
            <Button onClick={() => setSocialModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Manage Social Accounts
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Icon Style</CardTitle>
              <CardDescription>Choose how your social media icons will appear</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={state.theme.socialIconStyle}
                onValueChange={(value) => handleSocialIconStyleChange(value as "branded" | "monochrome" | "minimal")}
                className="flex flex-wrap gap-6"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="border border-input p-2 rounded-md h-24 w-24 flex items-center justify-center">
                    <div className="bg-[#1877F2] text-white rounded-full w-12 h-12 flex items-center justify-center">
                      <PlatformIcon platform="facebook" size="md" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="branded" id="branded" />
                    <Label htmlFor="branded">Branded</Label>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="border border-input p-2 rounded-md h-24 w-24 flex items-center justify-center">
                    <div className="bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center">
                      <PlatformIcon platform="facebook" size="md" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monochrome" id="monochrome" />
                    <Label htmlFor="monochrome">Monochrome</Label>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="border border-input p-2 rounded-md h-24 w-24 flex items-center justify-center">
                    <div className="border-2 border-gray-800 text-gray-800 rounded-full w-12 h-12 flex items-center justify-center">
                      <PlatformIcon platform="facebook" size="md" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="minimal" id="minimal" />
                    <Label htmlFor="minimal">Minimal</Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Social Media</CardTitle>
                  <CardDescription>Manage your social media accounts</CardDescription>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <AtSign className="h-4 w-4 mr-1" />
                  {state.socials.length} accounts
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              {state.socials.length === 0 ? (
                <div className="text-center py-8">
                  <AtSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Social Accounts Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Add your social media accounts to display them on your LinkForest profile.
                  </p>
                  <Button onClick={() => setSocialModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Social Account
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {state.socials.map((social) => {
                    const platformInfo = getPlatformInfo(social.platform)

                    return (
                      <div
                        key={social.id}
                        className="border rounded-lg p-4 flex flex-col items-center text-center relative group"
                      >
                        <div
                          className={`rounded-full w-12 h-12 flex items-center justify-center mb-2 ${
                            social.active
                              ? "bg-gray-100 dark:bg-gray-800"
                              : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 opacity-60"
                          }`}
                        >
                          <PlatformIcon
                            platform={social.platform}
                            size="md"
                            color={social.active ? platformInfo?.color : undefined}
                            className={!social.active ? "opacity-60" : ""}
                          />
                        </div>
                        <h3 className="font-medium">{platformInfo?.name || social.platform}</h3>
                        <p className="text-sm text-muted-foreground mb-3">@{social.username}</p>

                        {!social.active && (
                          <Badge variant="outline" className="mb-3">
                            Inactive
                          </Badge>
                        )}

                        <div className="flex gap-2 mt-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              setSocialModalOpen(true)
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              window.open(social.url, "_blank")
                            }}
                            title="Visit profile"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                  <div
                    className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors h-full"
                    onClick={() => setSocialModalOpen(true)}
                  >
                    <div className="rounded-full w-12 h-12 border-2 border-dashed flex items-center justify-center mb-2">
                      <Plus className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium">Add New</h3>
                    <p className="text-sm text-muted-foreground">Add another social account</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="hidden lg:block">
          <PreviewPanel />
        </div>
      </div>

      {/* Social Media Modal */}
      <SocialMediaModal open={socialModalOpen} onOpenChange={setSocialModalOpen} />
    </DashboardLayout>
  )
}
