"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import { canAccessRoute, ROLE_DASHBOARD_ROUTES } from "@/constants/roles"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (isLoading) return

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
      return
    }

    // Check if user can access this route
    if (user && !canAccessRoute(user.role, pathname)) {
      // Redirect to their dashboard if they can't access this route
      router.push(ROLE_DASHBOARD_ROUTES[user.role])
    }
  }, [isLoading, isAuthenticated, user, router, pathname])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (user && !canAccessRoute(user.role, pathname)) {
    return null
  }

  return <>{children}</>
}
