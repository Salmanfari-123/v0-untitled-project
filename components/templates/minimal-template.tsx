"use client"

import type { Link, Theme, User, SocialProfile } from "@/contexts/linktree-context"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import SocialIcons from "@/components/socials/social-icons"

interface MinimalTemplateProps {
  user: User
  links: Link[]
  socials?: SocialProfile[]
  theme: Theme
}

export function MinimalTemplate({ user, links, socials = [], theme }: MinimalTemplateProps) {
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
            <SocialIcons socials={socials} theme={theme} size="sm" />
          </div>
        )}

        <div className="w-full space-y-3">
          {activeLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between w-full p-3 rounded-md text-left transition-all"
              style={{
                backgroundColor: "transparent",
                color: theme.textColor,
                borderBottom: `1px solid ${theme.buttonColor}`,
                opacity: 0.9,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.9"
              }}
            >
              <span>{link.title}</span>
              <ChevronRight
                className="h-4 w-4 transform transition-transform group-hover:translate-x-1"
                style={{ color: theme.buttonColor }}
              />
            </a>
          ))}
        </div>

        <div className="mt-8 text-sm opacity-70">Powered by LinkForest</div>
      </div>
    </div>
  )
}
