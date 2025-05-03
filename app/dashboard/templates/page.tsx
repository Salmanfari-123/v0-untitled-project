"use client"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import PreviewPanel from "@/components/preview/preview-panel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type TemplateType, useLinkTree } from "@/contexts/linktree-context"
import { Check } from "lucide-react"
import Image from "next/image"
import { useCallback } from "react"
import { toast } from "sonner"

interface TemplateCardProps {
  name: TemplateType
  description: string
  selected: boolean
  onSelect: (template: TemplateType) => void
}

function TemplateCard({ name, description, selected, onSelect }: TemplateCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow ${selected ? "ring-2 ring-emerald-500" : ""}`}
      onClick={() => onSelect(name)}
    >
      <CardContent className="p-4">
        <div className="bg-gray-100 rounded-md aspect-[3/4] relative mb-4 overflow-hidden">
          <Image
            src={`/placeholder.svg?height=320&width=240&text=${name}`}
            alt={name}
            width={240}
            height={320}
            className="object-cover"
          />
          {selected && (
            <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1">
              <Check className="h-4 w-4" />
            </div>
          )}
        </div>
        <h3 className="font-medium capitalize">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export default function TemplatesPage() {
  const { state, setTemplate } = useLinkTree()

  const handleSelectTemplate = useCallback(
    (template: TemplateType) => {
      setTemplate(template)
      toast.success(`Template changed to ${template}`)
    },
    [setTemplate],
  )

  const templates: Array<{ name: TemplateType; description: string }> = [
    {
      name: "classic",
      description: "Traditional vertical list of links",
    },
    {
      name: "cards",
      description: "Card-based layout with icons",
    },
    {
      name: "grid",
      description: "Grid layout for a modern look",
    },
    {
      name: "minimal",
      description: "Clean layout with subtle animations",
    },
    {
      name: "horizontal",
      description: "Full-width horizontal links",
    },
  ]

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Choose a Template</h1>
            <Button variant="outline" onClick={() => handleSelectTemplate(state.template)} disabled={true}>
              Customize Current Template
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <TemplateCard
                key={template.name}
                name={template.name}
                description={template.description}
                selected={state.template === template.name}
                onSelect={handleSelectTemplate}
              />
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Custom Colors</CardTitle>
              <CardDescription>Customize the colors of your template</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Advanced customization coming soon!</p>
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
