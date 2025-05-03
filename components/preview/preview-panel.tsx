"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type TemplateType, type User, useLinkTree } from "@/contexts/linktree-context"
import { Eye, Monitor, Smartphone } from "lucide-react"
import { ClassicTemplate } from "@/components/templates/classic-template"
import { CardsTemplate } from "@/components/templates/cards-template"
import { GridTemplate } from "@/components/templates/grid-template"
import { MinimalTemplate } from "@/components/templates/minimal-template"
import { HorizontalTemplate } from "@/components/templates/horizontal-template"
import NextLink from "next/link"

interface PreviewPanelProps {
  previewUser?: Partial<User>
}

export default function PreviewPanel({ previewUser }: PreviewPanelProps) {
  const { state } = useLinkTree()

  const user = {
    ...state.user,
    ...previewUser,
  }

  const getTemplateComponent = (template: TemplateType) => {
    switch (template) {
      case "classic":
        return <ClassicTemplate user={user} links={state.links} socials={state.socials} theme={state.theme} />
      case "cards":
        return <CardsTemplate user={user} links={state.links} socials={state.socials} theme={state.theme} />
      case "grid":
        return <GridTemplate user={user} links={state.links} socials={state.socials} theme={state.theme} />
      case "minimal":
        return <MinimalTemplate user={user} links={state.links} socials={state.socials} theme={state.theme} />
      case "horizontal":
        return <HorizontalTemplate user={user} links={state.links} socials={state.socials} theme={state.theme} />
      default:
        return <ClassicTemplate user={user} links={state.links} socials={state.socials} theme={state.theme} />
    }
  }

  return (
    <div className="sticky top-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium flex items-center gap-2">
          <Eye className="h-4 w-4" /> Live Preview
        </h2>
        <NextLink
          href={`/preview/${user.username}`}
          target="_blank"
          className="text-sm text-emerald-600 hover:underline"
        >
          Open in new tab
        </NextLink>
      </div>

      <Tabs defaultValue="mobile" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="mobile" className="flex-1">
            <Smartphone className="h-4 w-4 mr-2" /> Mobile
          </TabsTrigger>
          <TabsTrigger value="desktop" className="flex-1">
            <Monitor className="h-4 w-4 mr-2" /> Desktop
          </TabsTrigger>
        </TabsList>
        <TabsContent value="mobile" className="mt-4">
          <div className="border rounded-lg h-[600px] overflow-hidden">
            <div className="border-b flex justify-center p-2 bg-gray-50">
              <div className="w-32 h-1.5 bg-gray-200 rounded-full" />
            </div>
            <div className="h-[560px] w-full overflow-y-auto">{getTemplateComponent(state.template)}</div>
          </div>
        </TabsContent>
        <TabsContent value="desktop" className="mt-4">
          <div className="border rounded-lg h-[600px] overflow-hidden">
            <div className="border-b flex justify-between items-center p-2 bg-gray-50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-gray-200 rounded-full" />
                <div className="w-3 h-3 bg-gray-200 rounded-full" />
                <div className="w-3 h-3 bg-gray-200 rounded-full" />
              </div>
              <div className="w-72 h-1.5 bg-gray-200 rounded-full" />
              <div className="w-4" />
            </div>
            <div className="h-[560px] w-full overflow-y-auto">{getTemplateComponent(state.template)}</div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
