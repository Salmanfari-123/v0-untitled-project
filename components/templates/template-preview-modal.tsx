"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type TemplateType, useLinkTree } from "@/contexts/linktree-context"
import { templates } from "@/data/templates"
import { ClassicTemplate } from "@/components/templates/classic-template"
import { CardsTemplate } from "@/components/templates/cards-template"
import { GridTemplate } from "@/components/templates/grid-template"
import { MinimalTemplate } from "@/components/templates/minimal-template"
import { HorizontalTemplate } from "@/components/templates/horizontal-template"
import { Smartphone, Monitor, Check } from "lucide-react"
import { toast } from "sonner"

interface TemplatePreviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  templateId: TemplateType | null
}

export function TemplatePreviewModal({ open, onOpenChange, templateId }: TemplatePreviewModalProps) {
  const { state, setTemplate } = useLinkTree()
  const [activeView, setActiveView] = useState<"mobile" | "desktop">("mobile")

  const templateInfo = templateId ? templates.find((t) => t.id === templateId) : null
  const isCurrentTemplate = templateId === state.theme.template

  const handleSelectTemplate = () => {
    if (!templateId) return

    if (templateInfo?.isPremium) {
      toast.error("This is a premium template. Upgrade to access premium templates.")
      return
    }

    setTemplate(templateId)
    toast.success(`Template changed to ${templateInfo?.name || templateId}`)
    onOpenChange(false)
  }

  // Reset view to mobile when modal opens
  useEffect(() => {
    if (open) {
      setActiveView("mobile")
    }
  }, [open])

  const getTemplateComponent = (template: TemplateType) => {
    switch (template) {
      case "classic":
        return <ClassicTemplate user={state.user} links={state.links} socials={state.socials} theme={state.theme} />
      case "cards":
        return <CardsTemplate user={state.user} links={state.links} socials={state.socials} theme={state.theme} />
      case "grid":
        return <GridTemplate user={state.user} links={state.links} socials={state.socials} theme={state.theme} />
      case "minimal":
        return <MinimalTemplate user={state.user} links={state.links} socials={state.socials} theme={state.theme} />
      case "horizontal":
        return <HorizontalTemplate user={state.user} links={state.links} socials={state.socials} theme={state.theme} />
      default:
        return <ClassicTemplate user={state.user} links={state.links} socials={state.socials} theme={state.theme} />
    }
  }

  if (!templateId || !templateInfo) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden max-h-[90vh]">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>{templateInfo.name}</DialogTitle>
          <DialogDescription>{templateInfo.description}</DialogDescription>
        </DialogHeader>

        <div className="px-6">
          <Tabs value={activeView} onValueChange={(value) => setActiveView(value as "mobile" | "desktop")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mobile">
                <Smartphone className="h-4 w-4 mr-2" /> Mobile
              </TabsTrigger>
              <TabsTrigger value="desktop">
                <Monitor className="h-4 w-4 mr-2" /> Desktop
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mobile" className="mt-4">
              <div className="border rounded-lg h-[500px] overflow-hidden">
                <div className="border-b flex justify-center p-2 bg-gray-50 dark:bg-gray-800">
                  <div className="w-32 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full" />
                </div>
                <div className="h-[460px] w-full overflow-y-auto">{getTemplateComponent(templateId)}</div>
              </div>
            </TabsContent>

            <TabsContent value="desktop" className="mt-4">
              <div className="border rounded-lg h-[500px] overflow-hidden">
                <div className="border-b flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  </div>
                  <div className="w-72 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div className="w-4" />
                </div>
                <div className="h-[460px] w-full overflow-y-auto">{getTemplateComponent(templateId)}</div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="p-6 pt-4 border-t mt-4">
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1">
              {templateInfo.isPremium && (
                <span className="text-sm text-amber-500 font-medium flex items-center">
                  Premium template requires upgrade
                </span>
              )}
            </div>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSelectTemplate} disabled={isCurrentTemplate || templateInfo.isPremium}>
              {isCurrentTemplate ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Current Template
                </>
              ) : (
                "Select Template"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
