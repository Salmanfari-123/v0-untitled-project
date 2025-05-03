"use client"

import type React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import PreviewPanel from "@/components/preview/preview-panel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { type Theme, useLinkTree } from "@/contexts/linktree-context"
import { useState } from "react"
import { toast } from "sonner"

export default function SettingsPage() {
  const { state, updateTheme } = useLinkTree()
  const [theme, setTheme] = useState<Theme>(state.theme)

  const handleThemeChange = (newTheme: Partial<Theme>) => {
    setTheme((prev) => ({ ...prev, ...newTheme }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateTheme(theme)
    toast.success("Theme settings updated")
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl font-bold">Appearance Settings</h1>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Background</CardTitle>
                <CardDescription>Customize your page background</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup
                  value={theme.backgroundType}
                  onValueChange={(value) =>
                    handleThemeChange({ backgroundType: value as "color" | "gradient" | "image" })
                  }
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="color" id="background-color" />
                    <Label htmlFor="background-color">Solid Color</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gradient" id="background-gradient" />
                    <Label htmlFor="background-gradient">Gradient</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="image" id="background-image" />
                    <Label htmlFor="background-image">Image</Label>
                  </div>
                </RadioGroup>

                {theme.backgroundType === "color" && (
                  <div className="space-y-2">
                    <Label htmlFor="background-color-picker">Background Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="background-color-picker"
                        type="color"
                        value={theme.backgroundColor}
                        onChange={(e) => handleThemeChange({ backgroundColor: e.target.value })}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={theme.backgroundColor}
                        onChange={(e) => handleThemeChange({ backgroundColor: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                )}

                {theme.backgroundType === "gradient" && (
                  <div className="space-y-2">
                    <Label htmlFor="background-gradient-value">Gradient</Label>
                    <Input
                      id="background-gradient-value"
                      placeholder="linear-gradient(to bottom, #4f46e5, #3b82f6)"
                      value={theme.backgroundGradient || ""}
                      onChange={(e) => handleThemeChange({ backgroundGradient: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Enter a valid CSS gradient value</p>
                  </div>
                )}

                {theme.backgroundType === "image" && (
                  <div className="space-y-2">
                    <Label htmlFor="background-image-url">Image URL</Label>
                    <Input
                      id="background-image-url"
                      placeholder="https://example.com/image.jpg"
                      value={theme.backgroundImage || ""}
                      onChange={(e) => handleThemeChange({ backgroundImage: e.target.value })}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Text & Buttons</CardTitle>
                <CardDescription>Customize text and button appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="text-color">Text Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="text-color"
                      type="color"
                      value={theme.textColor}
                      onChange={(e) => handleThemeChange({ textColor: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      type="text"
                      value={theme.textColor}
                      onChange={(e) => handleThemeChange({ textColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="button-style">Button Style</Label>
                  <RadioGroup
                    value={theme.buttonStyle}
                    onValueChange={(value) =>
                      handleThemeChange({ buttonStyle: value as "filled" | "outline" | "soft" | "shadow" })
                    }
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="filled" id="button-filled" />
                      <Label htmlFor="button-filled">Filled</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="outline" id="button-outline" />
                      <Label htmlFor="button-outline">Outline</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="shadow" id="button-shadow" />
                      <Label htmlFor="button-shadow">Shadow</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="button-color">Button Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="button-color"
                      type="color"
                      value={theme.buttonColor}
                      onChange={(e) => handleThemeChange({ buttonColor: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      type="text"
                      value={theme.buttonColor}
                      onChange={(e) => handleThemeChange({ buttonColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="button-text-color">Button Text Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="button-text-color"
                      type="color"
                      value={theme.buttonTextColor}
                      onChange={(e) => handleThemeChange({ buttonTextColor: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      type="text"
                      value={theme.buttonTextColor}
                      onChange={(e) => handleThemeChange({ buttonTextColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </div>

        {/* Preview Panel */}
        <div className="hidden lg:block">
          <PreviewPanel />
        </div>
      </div>
    </DashboardLayout>
  )
}
