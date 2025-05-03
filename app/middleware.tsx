"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useLinkTree } from "@/contexts/linktree-context"

export default function Middleware({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useLinkTree()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Protected routes that require authentication
    const protectedRoutes = ["/dashboard", "/preview"]

    // Public routes that should redirect to dashboard if already authenticated
    const authRoutes = ["/auth/login", "/auth/register"]

    // Check if current path is a protected route
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

    // Check if current path is an auth route
    const isAuthRoute = authRoutes.some((route) => pathname === route)

    if (isProtectedRoute && !isAuthenticated()) {
      router.push("/auth/login")
    } else if (isAuthRoute && isAuthenticated()) {
      router.push("/dashboard")
    }
  }, [pathname, isAuthenticated, router])

  return <>{children}</>
}
