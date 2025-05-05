"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLinkTree } from "@/contexts/linktree-context"
import { cn } from "@/lib/utils"
import { Eye, Home, Layers, Layout, Link, LogOut, Menu, Settings, User, AtSign } from "lucide-react"
import NextLink from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import AuthGuard from "@/components/auth/auth-guard"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { state, logout } = useLinkTree()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Links",
      href: "/dashboard/links",
      icon: Link,
    },
    {
      name: "Social Media",
      href: "/dashboard/socials",
      icon: AtSign,
    },
    {
      name: "Templates",
      href: "/dashboard/templates",
      icon: Layout,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
        {/* Mobile Header */}
        <header className="md:hidden border-b bg-white dark:bg-gray-800 dark:border-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-emerald-500" />
            <span className="font-bold text-lg">LinkForest</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Sidebar */}
        <nav
          className={cn(
            "w-64 border-r bg-white dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ease-in-out",
            {
              "fixed inset-0 z-40 -translate-x-full md:static md:translate-x-0": !isOpen,
              "fixed inset-0 z-40 translate-x-0 md:static": isOpen,
            },
          )}
        >
          <div className="h-16 flex items-center gap-2 px-4 border-b dark:border-gray-700">
            <Layers className="h-6 w-6 text-emerald-500" />
            <span className="font-bold text-lg">LinkForest</span>
            <div className="ml-auto flex items-center gap-2">
              <div className="hidden md:block">
                <ThemeSwitcher />
              </div>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(false)}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="p-4 space-y-1">
            {navigationItems.map((item) => (
              <NextLink href={item.href} key={item.name}>
                <Button
                  variant={pathname === item.href ? "default" : "ghost"}
                  className={cn("w-full justify-start", {
                    "bg-emerald-500 hover:bg-emerald-600": pathname === item.href,
                  })}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
                </Button>
              </NextLink>
            ))}

            <NextLink href={`/preview/${state.user.username}`} target="_blank">
              <Button variant="outline" className="w-full justify-start mt-6">
                <Eye className="mr-2 h-5 w-5" />
                Preview Page
              </Button>
            </NextLink>
          </div>

          <div className="absolute bottom-0 w-full p-4 border-t dark:border-gray-700">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-5 w-5" />
                  {state.user.name || "User"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>

        {/* Overlay for mobile sidebar */}
        {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 dark:text-gray-100">{children}</main>
      </div>
    </AuthGuard>
  )
}
