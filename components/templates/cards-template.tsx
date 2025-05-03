"use client"

import type { Link, Theme, User, SocialProfile } from "@/contexts/linktree-context"
import { Facebook, Github, Globe, Instagram, Linkedin, Music, Twitter, Youtube } from "lucide-react"
import Image from "next/image"
import SocialIcons from "@/components/socials/social-icons"

interface CardsTemplateProps {
  user: User
  links: Link[]
  socials?: SocialProfile[]
  theme: Theme
}

export function CardsTemplate({ user, links, socials = [], theme }: CardsTemplateProps) {
  const activeLinks = links.filter((link) => link.active)

  const getBackgroundStyle = () => {
    if (theme.backgroundType === "gradient" && theme.backgroundGradient) {
      return { background: theme.backgroundGradient }
    } else if (theme.backgroundType === "image" && theme.backgroundImage) {
      return {
        backgroundImage: `url(${theme.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    }
    return { backgroundColor: theme.backgroundColor }
  }

  const getIconForLink = (url: string) => {
    const domain = new URL(url).hostname.toLowerCase()

    if (domain.includes("instagram")) return Instagram
    if (domain.includes("twitter") || domain.includes("x.com")) return Twitter
    if (domain.includes("facebook")) return Facebook
    if (domain.includes("youtube")) return Youtube
    if (domain.includes("linkedin")) return Linkedin
    if (domain.includes("github")) return Github
    if (domain.includes("spotify") || domain.includes("apple.com/music")) return Music

    return Globe
  }

  return (
    <div
      className="min-h-full w-full py-8 px-4 flex flex-col items-center"
      style={{
        ...getBackgroundStyle(),
        color: theme.textColor,
      }}
    >
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {user.profilePicture ? (
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <Image
              src={user.profilePicture || "/placeholder.svg"}
              alt={user.name || "Profile"}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
        )}

        <h1 className="text-2xl font-bold mb-1">{user.name || "Your Name"}</h1>
        {user.username && <p className="text-opacity-70 mb-2 text-sm">@{user.username}</p>}

        {user.bio && <p className="text-center mb-4 max-w-xs">{user.bio}</p>}

        {/* Social Media Icons */}
        {socials && socials.length > 0 && (
          <div className="mb-6">
            <SocialIcons socials={socials} theme={theme} />
          </div>
        )}

        <div className="w-full grid grid-cols-1 gap-4">
          {activeLinks.map((link) => {
            const Icon = getIconForLink(link.url)

            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 rounded-lg transition-all"
                style={{
                  backgroundColor: theme.buttonColor,
                  color: theme.buttonTextColor,
                  boxShadow: theme.buttonStyle === "shadow" ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
                  border: theme.buttonStyle === "outline" ? `2px solid ${theme.buttonColor}` : "none",
                  opacity: 0.9,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.9"
                }}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span>{link.title}</span>
              </a>
            )
          })}
        </div>

        <div className="mt-8 text-sm opacity-70">Powered by LinkForest</div>
      </div>
    </div>
  )
}
