// ============================================
// User & Authentication Types
// ============================================

export type UserRole = "admin" | "staff" | "employee" | "customer"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  department?: string
  phone?: string
  createdAt: Date
  updatedAt: Date
}

export interface Session {
  user: User
  accessToken: string
  expiresAt: Date
}

// ============================================
// Permission Types
// ============================================

export type Permission =
  | "users:read"
  | "users:write"
  | "users:delete"
  | "films:read"
  | "films:write"
  | "films:delete"
  | "cast-crew:read"
  | "cast-crew:write"
  | "cast-crew:delete"
  | "production:read"
  | "production:write"
  | "production:delete"
  | "budget:read"
  | "budget:write"
  | "budget:delete"
  | "locations:read"
  | "locations:write"
  | "locations:delete"
  | "equipment:read"
  | "equipment:write"
  | "equipment:delete"
  | "reports:read"
  | "reports:write"
  | "settings:read"
  | "settings:write"

// ============================================
// Film Types
// ============================================

export type FilmStatus =
  | "development"
  | "pre-production"
  | "production"
  | "post-production"
  | "completed"
  | "released"
  | "cancelled"

export type FilmGenre =
  | "action"
  | "comedy"
  | "drama"
  | "horror"
  | "sci-fi"
  | "documentary"
  | "animation"
  | "thriller"
  | "romance"
  | "fantasy"

export interface Film {
  id: string
  title: string
  description: string
  status: FilmStatus
  genre: FilmGenre[]
  director: string
  releaseDate?: Date
  budget: number
  spent: number
  posterUrl?: string
  companyId: string
  studioId?: string
  distributorId?: string
  createdAt: Date
  updatedAt: Date
}

// ============================================
// Cast & Crew Types
// ============================================

export type PersonType = "cast" | "crew"

export interface Person {
  id: string
  name: string
  type: PersonType
  role: string
  department?: string
  email?: string
  phone?: string
  avatarUrl?: string
  bio?: string
  imdbUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface FilmPerson {
  id: string
  filmId: string
  personId: string
  role: string
  character?: string // For cast members
  department?: string // For crew members
  startDate?: Date
  endDate?: Date
}

// ============================================
// Production Types
// ============================================

export type ScheduleStatus = "scheduled" | "in-progress" | "completed" | "cancelled" | "postponed"

export interface ProductionSchedule {
  id: string
  filmId: string
  title: string
  description?: string
  startDate: Date
  endDate: Date
  status: ScheduleStatus
  locationId?: string
  assignedTo: string[]
  createdAt: Date
  updatedAt: Date
}

export interface ProductionCompany {
  id: string
  name: string
  description?: string
  logoUrl?: string
  website?: string
  contactEmail?: string
  contactPhone?: string
  address?: string
  createdAt: Date
  updatedAt: Date
}

export interface Studio {
  id: string
  name: string
  description?: string
  logoUrl?: string
  address?: string
  capacity?: number
  amenities?: string[]
  dailyRate?: number
  contactEmail?: string
  contactPhone?: string
  createdAt: Date
  updatedAt: Date
}

export interface Distributor {
  id: string
  name: string
  description?: string
  logoUrl?: string
  website?: string
  territories?: string[]
  contactEmail?: string
  contactPhone?: string
  createdAt: Date
  updatedAt: Date
}

// ============================================
// Budget Types
// ============================================

export type ExpenseCategory =
  | "talent"
  | "crew"
  | "equipment"
  | "locations"
  | "post-production"
  | "marketing"
  | "legal"
  | "insurance"
  | "travel"
  | "catering"
  | "other"

export type ExpenseStatus = "pending" | "approved" | "rejected" | "paid"

export interface BudgetAllocation {
  id: string
  filmId: string
  category: ExpenseCategory
  amount: number
  spent: number
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface Expense {
  id: string
  filmId: string
  category: ExpenseCategory
  amount: number
  description: string
  vendor?: string
  receiptUrl?: string
  status: ExpenseStatus
  submittedBy: string
  approvedBy?: string
  paidAt?: Date
  createdAt: Date
  updatedAt: Date
}

// ============================================
// Location Types
// ============================================

export type LocationType = "studio" | "outdoor" | "indoor" | "mixed"

export interface FilmingLocation {
  id: string
  name: string
  type: LocationType
  address: string
  city: string
  country: string
  latitude?: number
  longitude?: number
  description?: string
  dailyRate?: number
  contactName?: string
  contactPhone?: string
  contactEmail?: string
  images?: string[]
  amenities?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface City {
  id: string
  name: string
  country: string
  timezone?: string
  permitRequired: boolean
  notes?: string
}

export interface LocationRental {
  id: string
  locationId: string
  filmId: string
  startDate: Date
  endDate: Date
  dailyRate: number
  totalCost: number
  status: "pending" | "confirmed" | "cancelled"
  notes?: string
  createdAt: Date
  updatedAt: Date
}

// ============================================
// Equipment Types
// ============================================

export type EquipmentCategory =
  | "camera"
  | "lighting"
  | "audio"
  | "grip"
  | "electrical"
  | "props"
  | "wardrobe"
  | "vehicles"
  | "other"

export type EquipmentStatus = "available" | "reserved" | "in-use" | "maintenance" | "retired"

export interface Equipment {
  id: string
  name: string
  category: EquipmentCategory
  description?: string
  manufacturer?: string
  model?: string
  serialNumber?: string
  purchaseDate?: Date
  purchasePrice?: number
  dailyRate?: number
  status: EquipmentStatus
  condition: "excellent" | "good" | "fair" | "poor"
  locationId?: string
  imageUrl?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface EquipmentReservation {
  id: string
  equipmentId: string
  filmId: string
  requestedBy: string
  startDate: Date
  endDate: Date
  status: "pending" | "approved" | "rejected" | "returned"
  notes?: string
  approvedBy?: string
  createdAt: Date
  updatedAt: Date
}

export interface MaintenanceRecord {
  id: string
  equipmentId: string
  type: "routine" | "repair" | "inspection"
  description: string
  performedBy: string
  performedAt: Date
  cost?: number
  nextScheduled?: Date
  notes?: string
  createdAt: Date
}

// ============================================
// Common/Shared Types
// ============================================

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface SelectOption {
  value: string
  label: string
}

export interface NavItem {
  title: string
  href: string
  icon?: string
  disabled?: boolean
  badge?: string | number
  children?: NavItem[]
}

export interface StatCard {
  title: string
  value: string | number
  change?: number
  changeType?: "increase" | "decrease" | "neutral"
  icon?: string
}

export interface Activity {
  id: string
  type: string
  description: string
  userId: string
  userName: string
  timestamp: Date
  metadata?: Record<string, unknown>
}
