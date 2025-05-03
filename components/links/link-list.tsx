"use client"

import type React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { useLinkTree } from "@/contexts/linktree-context"
import { cn } from "@/lib/utils"
import { Edit, ExternalLink, Grip, MoreHorizontal, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import LinkEditor from "./link-editor"

export default function LinkList() {
  const { state, updateLink, removeLink, reorderLinks } = useLinkTree()
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null)
  const [links, setLinks] = useState(state.links)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  // Update local links when state.links changes
  useEffect(() => {
    setLinks(state.links)
  }, [state.links])

  const handleToggleActive = (id: string, active: boolean) => {
    updateLink(id, { active })
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this link?")) {
      removeLink(id)
      toast.success("Link deleted successfully")
    }
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null) return

    const newLinks = [...links]
    const draggedLink = newLinks[draggedIndex]
    newLinks.splice(draggedIndex, 1)
    newLinks.splice(index, 0, draggedLink)

    setLinks(newLinks)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    reorderLinks(
      draggedIndex!,
      links.findIndex((link) => link.id === state.links[draggedIndex!].id),
    )
    setDraggedIndex(null)
  }

  if (links.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">You haven&apos;t added any links yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {links.map((link, index) => (
        <div key={link.id}>
          {editingLinkId === link.id ? (
            <div className="border rounded-lg p-4 mb-3">
              <LinkEditor link={link} onCancel={() => setEditingLinkId(null)} />
            </div>
          ) : (
            <div
              className={cn(
                "flex items-center gap-3 p-3 border rounded-lg",
                draggedIndex === index && "border-emerald-500 bg-emerald-50",
                !link.active && "opacity-60",
              )}
              draggable="true"
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            >
              <div
                className="cursor-grab p-1 text-gray-400 hover:text-gray-700"
                onMouseDown={(e) => e.preventDefault()}
              >
                <Grip className="h-4 w-4" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{link.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{link.url}</p>
              </div>

              <Switch
                checked={link.active}
                onCheckedChange={(checked) => handleToggleActive(link.id, checked)}
                aria-label={`Toggle ${link.title} active state`}
              />

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-gray-500 hover:text-gray-700"
                aria-label={`Visit ${link.title}`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>

              <DropdownMenu>
                <DropdownMenuTrigger className="p-1 text-gray-500 hover:text-gray-700">
                  <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setEditingLinkId(link.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(link.id)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
