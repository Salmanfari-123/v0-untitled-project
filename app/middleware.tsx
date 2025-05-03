"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useLinkTree } from "@/contexts/linktree-context"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function Middleware({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useLinkTree()
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

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

    setIsLoading(false)
  }, [pathname, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-emerald-600 font-medium">Loading...</p>
      </div>
    )
  }

  return <>{children}</>
}
