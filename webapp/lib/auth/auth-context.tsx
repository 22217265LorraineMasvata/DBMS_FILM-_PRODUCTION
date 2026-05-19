"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import { useRouter } from "next/navigation"
import type { User, UserRole, Session, Permission } from "@/types"
import {
  getSession,
  login as loginFn,
  register as registerFn,
  logout as logoutFn,
} from "./session"
import { hasPermission, ROLE_DASHBOARD_ROUTES } from "@/constants/roles"

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  checkPermission: (permission: Permission) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session on mount
    const existingSession = getSession()
    setSession(existingSession)
    setIsLoading(false)
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true)
      try {
        const result = await loginFn(email, password)
        if (result.success && result.session) {
          setSession(result.session)
          // Redirect to role-specific dashboard
          const dashboardRoute = ROLE_DASHBOARD_ROUTES[result.session.user.role]
          router.push(dashboardRoute)
          return { success: true }
        }
        return { success: false, error: result.error }
      } finally {
        setIsLoading(false)
      }
    },
    [router]
  )

  const register = useCallback(
    async (name: string, email: string, password: string, role: UserRole = "customer") => {
      setIsLoading(true)
      try {
        const result = await registerFn(name, email, password, role)
        if (result.success && result.session) {
          setSession(result.session)
          // Redirect to role-specific dashboard
          const dashboardRoute = ROLE_DASHBOARD_ROUTES[result.session.user.role]
          router.push(dashboardRoute)
          return { success: true }
        }
        return { success: false, error: result.error }
      } finally {
        setIsLoading(false)
      }
    },
    [router]
  )

  const logout = useCallback(() => {
    logoutFn()
    setSession(null)
    router.push("/login")
  }, [router])

  const checkPermission = useCallback(
    (permission: Permission): boolean => {
      if (!session?.user) return false
      return hasPermission(session.user.role, permission)
    },
    [session]
  )

  const value: AuthContextType = {
    user: session?.user ?? null,
    session,
    isLoading,
    isAuthenticated: !!session?.user,
    login,
    register,
    logout,
    checkPermission,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
