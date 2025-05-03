"use client"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import PreviewPanel from "@/components/preview/preview-panel"
import SocialMediaManager from "@/components/socials/social-media-manager"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useLinkTree } from "@/contexts/linktree-context"
import { AtSign, Plus } from "lucide-react"
import { useState } from "react"

export default function SocialsPage() {
  const { state, updateTheme } = useLinkTree()
  const [isAddingSocial, setIsAddingSocial] = useState(false)

  const handleSocialIconStyleChange = (style: "branded" | "monochrome" | "minimal") => {
    updateTheme({ socialIconStyle: style })
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Social Media Accounts</h1>
            <Button onClick={() => setIsAddingSocial(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Social Account
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
                className="flex space-x-6"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="border border-input p-2 rounded-md h-24 w-24 flex items-center justify-center">
                    <div className="bg-[#1877F2] text-white rounded-full w-12 h-12 flex items-center justify-center">
                      <AtSign className="h-6 w-6" />
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
                      <AtSign className="h-6 w-6" />
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
                      <AtSign className="h-6 w-6" />
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
              <SocialMediaManager isAddingNew={isAddingSocial} onCancelAdd={() => setIsAddingSocial(false)} />
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
