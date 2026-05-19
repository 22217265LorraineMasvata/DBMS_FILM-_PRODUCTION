import type { User, UserRole, Session } from "@/types"

// Mock user data for demo purposes
// In production, this would come from a database
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "admin@filmstudio.com",
    name: "Alex Director",
    role: "admin",
    department: "Management",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "staff@filmstudio.com",
    name: "Morgan Producer",
    role: "staff",
    department: "Production",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=staff",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
  {
    id: "3",
    email: "employee@filmstudio.com",
    name: "Jamie Crew",
    role: "employee",
    department: "Camera",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=employee",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "4",
    email: "customer@client.com",
    name: "Taylor Client",
    role: "customer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=customer",
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-04-01"),
  },
]

// Session storage key
const SESSION_KEY = "film_studio_session"

export function getSession(): Session | null {
  if (typeof window === "undefined") return null
  
  const sessionData = localStorage.getItem(SESSION_KEY)
  if (!sessionData) return null
  
  try {
    const session = JSON.parse(sessionData)
    // Check if session is expired
    if (new Date(session.expiresAt) < new Date()) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    return {
      ...session,
      user: {
        ...session.user,
        createdAt: new Date(session.user.createdAt),
        updatedAt: new Date(session.user.updatedAt),
      },
      expiresAt: new Date(session.expiresAt),
    }
  } catch {
    return null
  }
}

export function setSession(user: User): Session {
  const session: Session = {
    user,
    accessToken: `mock_token_${user.id}_${Date.now()}`,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  }
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
}

export async function login(
  email: string,
  _password: string
): Promise<{ success: boolean; session?: Session; error?: string }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  // Find user by email (demo mode - no real password check)
  const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase())
  
  if (!user) {
    return { success: false, error: "Invalid email or password" }
  }
  
  const session = setSession(user)
  return { success: true, session }
}

export async function register(
  name: string,
  email: string,
  _password: string,
  role: UserRole = "customer"
): Promise<{ success: boolean; session?: Session; error?: string }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  // Check if email already exists
  const existingUser = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (existingUser) {
    return { success: false, error: "Email already in use" }
  }
  
  // Create new user
  const newUser: User = {
    id: String(MOCK_USERS.length + 1),
    email,
    name,
    role,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  
  MOCK_USERS.push(newUser)
  const session = setSession(newUser)
  return { success: true, session }
}

export function logout(): void {
  clearSession()
}

export function getCurrentUser(): User | null {
  const session = getSession()
  return session?.user ?? null
}

// Demo login credentials for easy access
export const DEMO_CREDENTIALS = [
  { email: "admin@filmstudio.com", password: "demo", role: "admin" as UserRole },
  { email: "staff@filmstudio.com", password: "demo", role: "staff" as UserRole },
  { email: "employee@filmstudio.com", password: "demo", role: "employee" as UserRole },
  { email: "customer@client.com", password: "demo", role: "customer" as UserRole },
]
