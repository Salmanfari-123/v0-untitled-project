"use client"

import type React from "react"

import { useLinkTree, type SocialPlatform } from "@/contexts/linktree-context"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Github,
  Twitch,
  Music,
  MessageCircle,
  DribbbleIcon,
  Hash,
  AtSign,
  BookOpen,
} from "lucide-react"

interface SocialMediaGridProps {
  onAdd: () => void
}

export default function SocialMediaGrid({ onAdd }: SocialMediaGridProps) {
  const { state } = useLinkTree()

  // Array of all available platforms
  const platforms: { id: SocialPlatform; name: string; icon: React.ElementType }[] = [
    { id: "facebook", name: "Facebook", icon: Facebook },
    { id: "twitter", name: "X / Twitter", icon: Twitter },
    { id: "instagram", name: "Instagram", icon: Instagram },
    { id: "youtube", name: "YouTube", icon: Youtube },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin },
    { id: "tiktok", name: "TikTok", icon: Hash },
    { id: "pinterest", name: "Pinterest", icon: AtSign },
    { id: "snapchat", name: "Snapchat", icon: AtSign },
    { id: "whatsapp", name: "WhatsApp", icon: MessageCircle },
    { id: "reddit", name: "Reddit", icon: AtSign },
    { id: "telegram", name: "Telegram", icon: MessageCircle },
    { id: "discord", name: "Discord", icon: MessageCircle },
    { id: "github", name: "GitHub", icon: Github },
    { id: "twitch", name: "Twitch", icon: Twitch },
    { id: "behance", name: "Behance", icon: AtSign },
    { id: "dribbble", name: "Dribbble", icon: DribbbleIcon },
    { id: "medium", name: "Medium", icon: BookOpen },
    { id: "spotify", name: "Spotify", icon: Music },
    { id: "threads", name: "Threads", icon: Hash },
  ]

  // Find which platforms the user already has
  const userPlatforms = state.socials.map((social) => social.platform)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {platforms.map((platform) => {
        const isActive = userPlatforms.includes(platform.id)
        const Icon = platform.icon

        return (
          <div
            key={platform.id}
            className={`border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${
              isActive ? "bg-emerald-50 border-emerald-200" : "hover:bg-gray-50"
            }`}
            onClick={onAdd}
          >
            <div
              className={`rounded-full w-12 h-12 flex items-center justify-center mb-2 ${
                isActive ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-500"
              }`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-center">{platform.name}</span>
            {!isActive && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 h-6 text-xs"
                onClick={(e) => {
                  e.stopPropagation()
                  onAdd()
                }}
              >
                <Plus className="h-3 w-3 mr-1" /> Add
              </Button>
            )}
          </div>
        )
      })}
    </div>
  )
}
