"use client"

import { ClassicTemplate } from "@/components/templates/classic-template"
import { CardsTemplate } from "@/components/templates/cards-template"
import { GridTemplate } from "@/components/templates/grid-template"
import { MinimalTemplate } from "@/components/templates/minimal-template"
import { HorizontalTemplate } from "@/components/templates/horizontal-template"
import { type TemplateType, useLinkTree } from "@/contexts/linktree-context"
import { useParams } from "next/navigation"

export default function PreviewPage() {
  const { state } = useLinkTree()
  const params = useParams()
  const username = params.username as string

  // In a real app, we would fetch the user data from the server
  // For this demo, we'll use the current user if usernames match
  if (username !== state.user.username) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-2">User not found</h1>
        <p className="text-gray-600">The requested profile does not exist.</p>
      </div>
    )
  }

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

  return <div className="min-h-screen">{getTemplateComponent(state.template)}</div>
}
