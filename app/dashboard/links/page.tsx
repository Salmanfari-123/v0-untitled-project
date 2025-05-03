"use client"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import LinkEditor from "@/components/links/link-editor"
import LinkList from "@/components/links/link-list"
import PreviewPanel from "@/components/preview/preview-panel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useLinkTree } from "@/contexts/linktree-context"
import { LinkIcon, Plus } from "lucide-react"
import { useState } from "react"

export default function LinksPage() {
  const { state } = useLinkTree()
  const [isAddingLink, setIsAddingLink] = useState(false)

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Manage Links</h1>
            <Button onClick={() => setIsAddingLink(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add New Link
            </Button>
          </div>

          {isAddingLink && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add New Link</CardTitle>
                <CardDescription>Create a new link for your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <LinkEditor onCancel={() => setIsAddingLink(false)} />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Links</CardTitle>
                  <CardDescription>Drag to reorder your links</CardDescription>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <LinkIcon className="h-4 w-4 mr-1" />
                  {state.links.length} links
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <LinkList />
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="hidden lg:block">
          <PreviewPanel />
        </div>
      </div>
    </DashboardLayout>
  )
}
