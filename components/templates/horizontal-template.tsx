"use client"

import type { Link, Theme, User, SocialProfile } from "@/contexts/linktree-context"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import SocialIcons from "@/components/socials/social-icons"

interface HorizontalTemplateProps {
  user: User
  links: Link[]
  socials?: SocialProfile[]
  theme: Theme
}

export function HorizontalTemplate({ user, links, socials = [], theme }: HorizontalTemplateProps) {
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
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
          {user.profilePicture ? (
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image
                src={user.profilePicture || "/placeholder.svg"}
                alt={user.name || "Profile"}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200" />
          )}

          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name || "Your Name"}</h1>
            {user.username && <p className="text-opacity-70 text-sm">@{user.username}</p>}
            {user.bio && <p className="max-w-lg mt-2">{user.bio}</p>}

            {/* Social Media Icons */}
            {socials && socials.length > 0 && (
              <div className="mt-4">
                <SocialIcons socials={socials} theme={theme} size="sm" />
              </div>
            )}
          </div>
        </div>

        <div className="w-full space-y-4">
          {activeLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between w-full p-4 rounded-md text-left transition-all"
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
              <span className="text-lg">{link.title}</span>
              <ArrowUpRight className="h-5 w-5 transform transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          ))}
        </div>

        <div className="mt-8 text-sm opacity-70 text-center sm:text-right">Powered by LinkForest</div>
      </div>
    </div>
  )
}
