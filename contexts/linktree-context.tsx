"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export type User = {
  id: string
  name: string
  email: string
  username: string
  profilePicture: string
  bio: string
  isLoggedIn: boolean
}

export type Link = {
  id: string
  title: string
  url: string
  active: boolean
  icon?: string
}

export type SocialPlatform =
  | "facebook"
  | "twitter"
  | "instagram"
  | "youtube"
  | "linkedin"
  | "tiktok"
  | "pinterest"
  | "snapchat"
  | "whatsapp"
  | "reddit"
  | "telegram"
  | "discord"
  | "github"
  | "twitch"
  | "behance"
  | "dribbble"
  | "medium"
  | "spotify"
  | "threads"

export type SocialProfile = {
  id: string
  platform: SocialPlatform
  username: string
  url: string
  active: boolean
}

export type Theme = {
  backgroundColor: string
  backgroundType: "color" | "gradient" | "image"
  backgroundGradient?: string
  backgroundImage?: string
  textColor: string
  buttonStyle: "filled" | "outline" | "soft" | "shadow"
  buttonColor: string
  buttonTextColor: string
  fontFamily: string
  socialIconStyle: "branded" | "monochrome" | "minimal"
}

export type TemplateType = "classic" | "cards" | "grid" | "minimal" | "horizontal"

export type LinkTreeState = {
  user: User
  links: Link[]
  socials: SocialProfile[]
  theme: Theme
  template: TemplateType
}

type LinkTreeContextType = {
  state: LinkTreeState
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (user: Partial<User>) => void
  addLink: (link: Omit<Link, "id">) => void
  updateLink: (id: string, link: Partial<Link>) => void
  removeLink: (id: string) => void
  reorderLinks: (startIndex: number, endIndex: number) => void
  addSocial: (social: Omit<SocialProfile, "id">) => void
  updateSocial: (id: string, social: Partial<SocialProfile>) => void
  removeSocial: (id: string) => void
  reorderSocials: (startIndex: number, endIndex: number) => void
  updateTheme: (theme: Partial<Theme>) => void
  setTemplate: (template: TemplateType) => void
  isAuthenticated: () => boolean
}

const defaultUser: User = {
  id: "",
  name: "",
  email: "",
  username: "",
  profilePicture: "",
  bio: "",
  isLoggedIn: false,
}

const defaultTheme: Theme = {
  backgroundColor: "#ffffff",
  backgroundType: "color",
  textColor: "#000000",
  buttonStyle: "filled",
  buttonColor: "#16a34a", // emerald-600
  buttonTextColor: "#ffffff",
  fontFamily: "Inter",
  socialIconStyle: "branded",
}

const defaultState: LinkTreeState = {
  user: defaultUser,
  links: [],
  socials: [],
  theme: defaultTheme,
  template: "classic",
}

// Mock user database for demo purposes
const MOCK_USERS = [
  {
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
    username: "demouser",
  },
  {
    email: "test@example.com",
    password: "test123",
    name: "Test User",
    username: "testuser",
  },
]

const LinkTreeContext = createContext<LinkTreeContextType | undefined>(undefined)

export const LinkTreeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<LinkTreeState>(defaultState)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Load state from localStorage on component mount
  useEffect(() => {
    if (!isMounted) return

    const savedState = localStorage.getItem("linkTreeState")
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        console.log("Loaded state from localStorage:", parsedState)
        setState(parsedState)
      } catch (error) {
        console.error("Error parsing saved state:", error)
        // If there's an error parsing, use default state
        localStorage.removeItem("linkTreeState")
      }
    }
    setIsInitialized(true)
  }, [isMounted])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && isMounted) {
      localStorage.setItem("linkTreeState", JSON.stringify(state))
    }
  }, [state, isInitialized, isMounted])

  const isAuthenticated = () => {
    return state.user.isLoggedIn
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in a real app, this would make an API call
    console.log("Login function called with:", { email, password })

    // Check against mock users
    const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (user) {
      const mockUser: User = {
        id: "1",
        name: user.name,
        email: user.email,
        username: user.username,
        profilePicture: "",
        bio: "Your bio goes here",
        isLoggedIn: true,
      }

      // Create sample links
      const sampleLinks = [
        {
          id: "1",
          title: "My Website",
          url: "https://example.com",
          active: true,
        },
        {
          id: "2",
          title: "Twitter / X",
          url: "https://twitter.com",
          active: true,
        },
        {
          id: "3",
          title: "Instagram",
          url: "https://instagram.com",
          active: true,
        },
      ]

      // Create sample social profiles
      const sampleSocials = [
        {
          id: "1",
          platform: "instagram" as SocialPlatform,
          username: "yourhandle",
          url: "https://instagram.com/yourhandle",
          active: true,
        },
        {
          id: "2",
          platform: "github" as SocialPlatform,
          username: "yourname",
          url: "https://github.com/yourname",
          active: true,
        },
      ]

      // Update state with user, links and socials
      setState((prev) => {
        const newState = {
          ...prev,
          user: mockUser,
          links: sampleLinks,
          socials: sampleSocials,
        }

        return newState
      })

      console.log("Login successful, user state updated")
      return true
    }

    console.log("Login failed: invalid credentials")
    return false
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock registration - in a real app, this would make an API call
    if (name && email.includes("@") && password.length > 5) {
      // Check if email already exists in mock users
      if (MOCK_USERS.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        console.log("Registration failed: email already exists")
        return false
      }

      const username = email.split("@")[0].toLowerCase()
      const mockUser: User = {
        id: "1",
        name,
        email,
        username,
        profilePicture: "",
        bio: "",
        isLoggedIn: true,
      }

      setState((prev) => ({
        ...prev,
        user: mockUser,
        links: [],
        socials: [],
      }))

      // In a real app, we would add the user to the database
      // For this demo, we'll just log it
      console.log("New user registered:", { name, email, username })

      return true
    }
    return false
  }

  const logout = () => {
    setState((prev) => ({
      ...prev,
      user: { ...defaultUser },
    }))
  }

  const updateUser = (user: Partial<User>) => {
    setState((prev) => ({
      ...prev,
      user: { ...prev.user, ...user },
    }))
  }

  const addLink = (link: Omit<Link, "id">) => {
    const newLink: Link = {
      ...link,
      id: Date.now().toString(),
    }

    setState((prev) => ({
      ...prev,
      links: [...prev.links, newLink],
    }))
  }

  const updateLink = (id: string, link: Partial<Link>) => {
    setState((prev) => ({
      ...prev,
      links: prev.links.map((l) => (l.id === id ? { ...l, ...link } : l)),
    }))
  }

  const removeLink = (id: string) => {
    setState((prev) => ({
      ...prev,
      links: prev.links.filter((l) => l.id !== id),
    }))
  }

  const reorderLinks = (startIndex: number, endIndex: number) => {
    const result = Array.from(state.links)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    setState((prev) => ({
      ...prev,
      links: result,
    }))
  }

  const addSocial = (social: Omit<SocialProfile, "id">) => {
    const newSocial: SocialProfile = {
      ...social,
      id: Date.now().toString(),
    }

    setState((prev) => ({
      ...prev,
      socials: [...prev.socials, newSocial],
    }))
  }

  const updateSocial = (id: string, social: Partial<SocialProfile>) => {
    setState((prev) => ({
      ...prev,
      socials: prev.socials.map((s) => (s.id === id ? { ...s, ...social } : s)),
    }))
  }

  const removeSocial = (id: string) => {
    setState((prev) => ({
      ...prev,
      socials: prev.socials.filter((s) => s.id !== id),
    }))
  }

  const reorderSocials = (startIndex: number, endIndex: number) => {
    const result = Array.from(state.socials)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    setState((prev) => ({
      ...prev,
      socials: result,
    }))
  }

  const updateTheme = (theme: Partial<Theme>) => {
    setState((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...theme },
    }))
  }

  const setTemplate = (template: TemplateType) => {
    setState((prev) => ({
      ...prev,
      template,
    }))
  }

  return (
    <LinkTreeContext.Provider
      value={{
        state,
        login,
        register,
        logout,
        updateUser,
        addLink,
        updateLink,
        removeLink,
        reorderLinks,
        addSocial,
        updateSocial,
        removeSocial,
        reorderSocials,
        updateTheme,
        setTemplate,
        isAuthenticated,
      }}
    >
      {children}
    </LinkTreeContext.Provider>
  )
}

export const useLinkTree = () => {
  const context = useContext(LinkTreeContext)
  if (context === undefined) {
    throw new Error("useLinkTree must be used within a LinkTreeProvider")
  }
  return context
}
