"use client"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import PreviewPanel from "@/components/preview/preview-panel"
import { SocialMediaModal } from "@/components/socials/social-media-modal"
import { PlatformIcon } from "@/components/socials/platform-icon"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLinkTree } from "@/contexts/linktree-context"
import { Copy, ExternalLink, LinkIcon, Plus, Users } from "lucide-react"
import NextLink from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState, useEffect } from "react"

export default function DashboardPage() {
  const { state } = useLinkTree()
  const router = useRouter()
  const [baseUrl, setBaseUrl] = useState("")
  const [socialModalOpen, setSocialModalOpen] = useState(false)

  // Set the base URL only on the client side
  useEffect(() => {
    setBaseUrl(window.location.origin)
  }, [])

  const handleCopyLink = () => {
    const url = `${baseUrl}/preview/${state.user.username}`
    navigator.clipboard.writeText(url)
    toast.success("Link copied to clipboard")
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Welcome, {state.user.name}!</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Links</CardTitle>
                <CardDescription>All your links</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <LinkIcon className="h-6 w-6 mr-2 text-emerald-500" />
                    <span className="text-2xl font-bold">{state.links.length}</span>
                  </div>
                  <Button size="sm" onClick={() => router.push("/dashboard/links")}>
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Social Media</CardTitle>
                <CardDescription>Your social accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-6 w-6 mr-2 text-emerald-500">
                      {state.socials.length > 0 ? (
                        <PlatformIcon platform={state.socials[0].platform} size="lg" />
                      ) : (
                        <PlatformIcon platform="instagram" size="lg" />
                      )}
                    </div>
                    <span className="text-2xl font-bold">{state.socials.length}</span>
                  </div>
                  <Button size="sm" onClick={() => setSocialModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-1" /> Manage
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Current Template</CardTitle>
                <CardDescription>Your selected template</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="capitalize text-lg font-medium">{state.template}</div>
                  <Button size="sm" variant="outline" onClick={() => router.push("/dashboard/templates")}>
                    Change
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your LinkForest URL</CardTitle>
              <CardDescription>Share this link with your audience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 break-all">
                  {baseUrl ? `${baseUrl}/preview/${state.user.username}` : `Loading URL...`}
                </div>
                <Button variant="ghost" size="icon" onClick={handleCopyLink} disabled={!baseUrl}>
                  <Copy className="h-5 w-5" />
                </Button>
                <NextLink href={`/preview/${state.user.username}`} target="_blank">
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-5 w-5" />
                  </Button>
                </NextLink>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" className="text-sm" onClick={() => router.push("/dashboard/links")}>
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Manage Links
                </Button>
                <Button variant="outline" className="text-sm" onClick={() => setSocialModalOpen(true)}>
                  <PlatformIcon platform="instagram" size="sm" className="mr-2" />
                  Social Media
                </Button>
                <Button variant="outline" className="text-sm" onClick={() => router.push("/dashboard/profile")}>
                  <Users className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
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
