"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useLinkTree } from "@/contexts/linktree-context"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useLinkTree()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    // Short timeout to prevent flash of loading state if already authenticated
    const timer = setTimeout(() => {
      if (!isAuthenticated()) {
        router.push("/auth/login")
      } else {
        setIsLoading(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [router, isAuthenticated, isMounted])

  // Don't render anything during server-side rendering
  if (!isMounted) {
    return null
  }

  // If loading or not authenticated, show loading state
  if (isLoading || !isAuthenticated()) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-emerald-600 font-medium">Loading your dashboard...</p>
      </div>
    )
  }

  return <>{children}</>
}
