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
  BookOpen,
  DribbbleIcon,
  Globe,
  Camera,
  Radio,
  Rss,
  Share2,
} from "lucide-react"
import type { SocialPlatform } from "@/contexts/linktree-context"
import { cn } from "@/lib/utils"

interface PlatformIconProps {
  platform: SocialPlatform | string
  size?: "sm" | "md" | "lg"
  className?: string
  color?: string
}

export function PlatformIcon({ platform, size = "md", className, color }: PlatformIconProps) {
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

  const iconSize = getIconSize()

  const getIcon = () => {
    switch (platform) {
      case "facebook":
        return <Facebook size={iconSize} />
      case "twitter":
        return <Twitter size={iconSize} />
      case "instagram":
        return <Instagram size={iconSize} />
      case "youtube":
        return <Youtube size={iconSize} />
      case "linkedin":
        return <Linkedin size={iconSize} />
      case "github":
        return <Github size={iconSize} />
      case "twitch":
        return <Twitch size={iconSize} />
      case "spotify":
        return <Music size={iconSize} />
      case "medium":
        return <BookOpen size={iconSize} />
      case "dribbble":
        return <DribbbleIcon size={iconSize} />
      case "tiktok":
      case "threads":
        return <Hash size={iconSize} />
      case "whatsapp":
      case "telegram":
      case "discord":
        return <MessageCircle size={iconSize} />
      case "snapchat":
        return <Camera size={iconSize} />
      case "pinterest":
        return <Radio size={iconSize} />
      case "reddit":
        return <Rss size={iconSize} />
      case "behance":
        return <Share2 size={iconSize} />
      default:
        return <Globe size={iconSize} />
    }
  }

  return (
    <div className={cn("flex items-center justify-center", className)} style={color ? { color } : undefined}>
      {getIcon()}
    </div>
  )
}
