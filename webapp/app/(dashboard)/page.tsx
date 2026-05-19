"use client"

import { useAuth } from "@/lib/auth/auth-context"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect to role-specific dashboard
      switch (user.role) {
        case "admin":
          redirect("/admin")
        case "staff":
          redirect("/staff")
        case "employee":
          redirect("/employee")
        case "customer":
          redirect("/customer")
        default:
          redirect("/admin")
      }
    }
  }, [user, isLoading])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500" />
      </div>
    )
  }

  // Default redirect to admin for demo purposes
  redirect("/admin")
}
