"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { TemplateData } from "@/data/templates"
import type { TemplateType } from "@/contexts/linktree-context"
import { Check, Info, Lock, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface TemplatePreviewCardProps {
  template: TemplateData
  isSelected: boolean
  onSelect: (template: TemplateType) => void
  onPreview: (template: TemplateType) => void
}

export function TemplatePreviewCard({ template, isSelected, onSelect, onPreview }: TemplatePreviewCardProps) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 group cursor-pointer",
        isSelected ? "ring-2 ring-emerald-500" : "hover:shadow-md",
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => onSelect(template.id)}
    >
      <div className="relative">
        <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          {/* Placeholder for template preview image */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${template.previewImage})` }}
          />

          {/* Overlay with actions on hover */}
          <div
            className={cn(
              "absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 p-4 transition-opacity duration-200",
              isHovering ? "opacity-100" : "opacity-0",
            )}
          >
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation()
                onPreview(template.id)
              }}
            >
              Preview
            </Button>
            <Button
              variant={isSelected ? "default" : "outline"}
              size="sm"
              className="w-full"
              disabled={template.isPremium}
            >
              {isSelected ? (
                <>
                  <Check className="mr-1 h-4 w-4" />
                  Selected
                </>
              ) : template.isPremium ? (
                <>
                  <Lock className="mr-1 h-4 w-4" />
                  Premium
                </>
              ) : (
                "Select"
              )}
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {template.isNew && (
              <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">
                New
              </Badge>
            )}
            {template.isPremium && (
              <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                <Star className="mr-1 h-3 w-3 fill-current" /> Premium
              </Badge>
            )}
          </div>

          {/* Selected indicator */}
          {isSelected && (
            <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1">
              <Check className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-sm">{template.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-1">{template.description}</p>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-2 max-w-xs">
                  <p className="font-medium text-sm">{template.name}</p>
                  <p className="text-xs">{template.description}</p>
                  {template.features && (
                    <ul className="text-xs list-disc pl-4 space-y-1">
                      {template.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}
