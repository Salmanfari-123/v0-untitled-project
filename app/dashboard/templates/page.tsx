"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import PreviewPanel from "@/components/preview/preview-panel"
import { TemplatePreviewCard } from "@/components/templates/template-preview-card"
import { TemplatePreviewModal } from "@/components/templates/template-preview-modal"
import { BackgroundImageUpload } from "@/components/templates/background-image-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { type TemplateType, useLinkTree } from "@/contexts/linktree-context"
import {
  templates,
  getTemplateCategories,
  filterTemplatesByCategory,
  searchTemplates,
  type TemplateCategory,
} from "@/data/templates"
import { Search, Sparkles, ImageIcon, Palette } from "lucide-react"
import { toast } from "sonner"

export default function TemplatesPage() {
  const { state, setTemplate, updateTheme } = useLinkTree()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | "all">("all")
  const [filteredTemplates, setFilteredTemplates] = useState(templates)
  const [previewTemplateId, setPreviewTemplateId] = useState<TemplateType | null>(null)
  const [activeTab, setActiveTab] = useState<"templates" | "background" | "colors">("templates")

  // Get all available categories
  const categories = getTemplateCategories()

  // Filter templates based on search query and category
  useEffect(() => {
    let filtered = templates

    if (searchQuery) {
      filtered = searchTemplates(searchQuery)
    }

    if (selectedCategory !== "all") {
      filtered = filterTemplatesByCategory(selectedCategory)

      // If we're also searching, we need to find the intersection
      if (searchQuery) {
        const searchResults = searchTemplates(searchQuery)
        filtered = filtered.filter((template) => searchResults.some((result) => result.id === template.id))
      }
    }

    setFilteredTemplates(filtered)
  }, [searchQuery, selectedCategory])

  const handleSelectTemplate = (template: TemplateType) => {
    setTemplate(template)
    toast.success(`Template changed to ${templates.find((t) => t.id === template)?.name || template}`)
  }

  const handlePreviewTemplate = (template: TemplateType) => {
    setPreviewTemplateId(template)
  }

  const handleBackgroundImageSelected = (imageUrl: string) => {
    updateTheme({
      backgroundType: imageUrl ? "image" : "color",
      backgroundImage: imageUrl,
    })
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Customize Your Profile</h1>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "templates" | "background" | "colors")}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="templates">
                <Sparkles className="h-4 w-4 mr-2" /> Templates
              </TabsTrigger>
              <TabsTrigger value="background">
                <ImageIcon className="h-4 w-4 mr-2" /> Background
              </TabsTrigger>
              <TabsTrigger value="colors">
                <Palette className="h-4 w-4 mr-2" /> Colors
              </TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-6 focus-visible:outline-none">
              <Card>
                <CardHeader>
                  <CardTitle>Choose a Template</CardTitle>
                  <CardDescription>Select from over 80 beautiful templates for your profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search templates..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="flex-shrink-0">
                      <Button
                        variant={selectedCategory === "all" ? "default" : "outline"}
                        onClick={() => setSelectedCategory("all")}
                      >
                        All Templates
                      </Button>
                    </div>
                  </div>

                  <ScrollArea className="w-full whitespace-nowrap pb-2">
                    <div className="flex gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className="flex-shrink-0"
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map((template) => (
                    <TemplatePreviewCard
                      key={template.id}
                      template={template}
                      isSelected={state.template === template.id}
                      onSelect={handleSelectTemplate}
                      onPreview={handlePreviewTemplate}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-muted-foreground">No templates found matching your search.</p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCategory("all")
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="background" className="space-y-6 focus-visible:outline-none">
              <Card>
                <CardHeader>
                  <CardTitle>Background Image</CardTitle>
                  <CardDescription>Upload or link to a background image for your profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <BackgroundImageUpload onImageSelected={handleBackgroundImageSelected} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="colors" className="space-y-6 focus-visible:outline-none">
              <Card>
                <CardHeader>
                  <CardTitle>Color Scheme</CardTitle>
                  <CardDescription>Customize the colors of your profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Background Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={state.theme.backgroundColor}
                          onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                          className="w-12 h-10 p-1 rounded border"
                        />
                        <Input
                          type="text"
                          value={state.theme.backgroundColor}
                          onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Text Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={state.theme.textColor}
                          onChange={(e) => updateTheme({ textColor: e.target.value })}
                          className="w-12 h-10 p-1 rounded border"
                        />
                        <Input
                          type="text"
                          value={state.theme.textColor}
                          onChange={(e) => updateTheme({ textColor: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Button Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={state.theme.buttonColor}
                          onChange={(e) => updateTheme({ buttonColor: e.target.value })}
                          className="w-12 h-10 p-1 rounded border"
                        />
                        <Input
                          type="text"
                          value={state.theme.buttonColor}
                          onChange={(e) => updateTheme({ buttonColor: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Button Text Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={state.theme.buttonTextColor}
                          onChange={(e) => updateTheme({ buttonTextColor: e.target.value })}
                          className="w-12 h-10 p-1 rounded border"
                        />
                        <Input
                          type="text"
                          value={state.theme.buttonTextColor}
                          onChange={(e) => updateTheme({ buttonTextColor: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel */}
        <div className="hidden lg:block">
          <PreviewPanel />
        </div>
      </div>

      {/* Template Preview Modal */}
      <TemplatePreviewModal
        open={!!previewTemplateId}
        onOpenChange={(open) => {
          if (!open) setPreviewTemplateId(null)
        }}
        templateId={previewTemplateId}
      />
    </DashboardLayout>
  )
}
