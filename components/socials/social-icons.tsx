"use client"

import type { SocialProfile, SocialPlatform, Theme } from "@/contexts/linktree-context"
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
  Hash,
  AtSign,
  BookOpen,
  DribbbleIcon,
  CircleDashed,
} from "lucide-react"

interface SocialIconsProps {
  socials: SocialProfile[]
  theme: Theme
  size?: "sm" | "md" | "lg"
}

export default function SocialIcons({ socials, theme, size = "md" }: SocialIconsProps) {
  if (!socials.length) return null

  const activeSocials = socials.filter((social) => social.active)
  if (!activeSocials.length) return null

  const getSocialIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case "facebook":
        return Facebook
      case "twitter":
        return Twitter
      case "instagram":
        return Instagram
      case "youtube":
        return Youtube
      case "linkedin":
        return Linkedin
      case "github":
        return Github
      case "twitch":
        return Twitch
      case "spotify":
        return Music
      case "medium":
        return BookOpen
      case "dribbble":
        return DribbbleIcon
      case "whatsapp":
      case "telegram":
      case "discord":
      case "snapchat":
        return MessageCircle
      case "tiktok":
      case "threads":
        return Hash
      case "behance":
      case "pinterest":
      case "reddit":
        return AtSign
      default:
        return CircleDashed
    }
  }

  const getSocialColor = (platform: SocialPlatform) => {
    if (theme.socialIconStyle === "monochrome") {
      return "#000000"
    }

    if (theme.socialIconStyle === "minimal") {
      return "transparent"
    }

    // Branded colors
    switch (platform) {
      case "facebook":
        return "#1877F2"
      case "twitter":
        return "#1DA1F2"
      case "instagram":
        return "#E4405F"
      case "youtube":
        return "#FF0000"
      case "linkedin":
        return "#0A66C2"
      case "github":
        return "#181717"
      case "twitch":
        return "#9146FF"
      case "spotify":
        return "#1DB954"
      case "tiktok":
        return "#000000"
      case "pinterest":
        return "#BD081C"
      case "reddit":
        return "#FF4500"
      case "telegram":
        return "#26A5E4"
      case "discord":
        return "#5865F2"
      case "whatsapp":
        return "#25D366"
      case "snapchat":
        return "#FFFC00"
      case "behance":
        return "#1769FF"
      case "dribbble":
        return "#EA4C89"
      case "medium":
        return "#000000"
      case "threads":
        return "#000000"
      default:
        return "#808080"
    }
  }

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return 16
      case "lg":
        return 24
      case "md":
      default:
        return 20
    }
  }

  const getContainerSize = () => {
    switch (size) {
      case "sm":
        return "w-8 h-8"
      case "lg":
        return "w-12 h-12"
      case "md":
      default:
        return "w-10 h-10"
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {activeSocials.map((social) => {
        const Icon = getSocialIcon(social.platform)
        const iconColor = theme.socialIconStyle === "minimal" ? "#000000" : "#FFFFFF"
        const bgColor = getSocialColor(social.platform)
        const borderColor = theme.socialIconStyle === "minimal" ? "#000000" : "transparent"
        const iconSize = getIconSize()
        const containerSize = getContainerSize()

        return (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${containerSize} flex items-center justify-center rounded-full transition-all hover:opacity-80`}
            style={{
              backgroundColor: bgColor,
              color: iconColor,
              border: theme.socialIconStyle === "minimal" ? `2px solid ${borderColor}` : "none",
            }}
            aria-label={`Visit ${social.platform}`}
          >
            <Icon size={iconSize} />
          </a>
        )
      })}
    </div>
  )
}
