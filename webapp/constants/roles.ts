import type { UserRole, Permission } from "@/types"

export const ROLES: Record<UserRole, { label: string; description: string }> = {
  admin: {
    label: "Administrator",
    description: "Full system access with user management capabilities",
  },
  staff: {
    label: "Staff",
    description: "Production management with team oversight",
  },
  employee: {
    label: "Employee",
    description: "Access to assigned projects and personal schedule",
  },
  customer: {
    label: "Customer",
    description: "View projects and manage billing",
  },
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    "users:read",
    "users:write",
    "users:delete",
    "films:read",
    "films:write",
    "films:delete",
    "cast-crew:read",
    "cast-crew:write",
    "cast-crew:delete",
    "production:read",
    "production:write",
    "production:delete",
    "budget:read",
    "budget:write",
    "budget:delete",
    "locations:read",
    "locations:write",
    "locations:delete",
    "equipment:read",
    "equipment:write",
    "equipment:delete",
    "reports:read",
    "reports:write",
    "settings:read",
    "settings:write",
  ],
  staff: [
    "films:read",
    "films:write",
    "cast-crew:read",
    "cast-crew:write",
    "production:read",
    "production:write",
    "budget:read",
    "budget:write",
    "locations:read",
    "locations:write",
    "equipment:read",
    "equipment:write",
    "reports:read",
    "settings:read",
    "settings:write",
  ],
  employee: [
    "films:read",
    "cast-crew:read",
    "production:read",
    "budget:read",
    "locations:read",
    "equipment:read",
    "settings:read",
    "settings:write",
  ],
  customer: [
    "films:read",
    "settings:read",
    "settings:write",
  ],
}

export const ROLE_DASHBOARD_ROUTES: Record<UserRole, string> = {
  admin: "/admin",
  staff: "/staff",
  employee: "/employee",
  customer: "/customer",
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

export function canAccessRoute(role: UserRole, route: string): boolean {
  // Admin routes
  if (route.startsWith("/admin") && role !== "admin") {
    return false
  }
  
  // Staff routes
  if (route.startsWith("/staff") && !["admin", "staff"].includes(role)) {
    return false
  }
  
  // Employee routes
  if (route.startsWith("/employee") && !["admin", "staff", "employee"].includes(role)) {
    return false
  }
  
  // Customer routes
  if (route.startsWith("/customer") && role !== "customer" && role !== "admin") {
    return false
  }
  
  // Budget routes - limited for employees and hidden from customers
  if (route.startsWith("/budget") && role === "customer") {
    return false
  }
  
  // Production routes - hidden from customers
  if (route.startsWith("/production") && role === "customer") {
    return false
  }
  
  // Equipment routes - hidden from customers
  if (route.startsWith("/equipment") && role === "customer") {
    return false
  }
  
  // Locations routes - hidden from customers
  if (route.startsWith("/locations") && role === "customer") {
    return false
  }
  
  // Reports - hidden from customers
  if (route.startsWith("/reports") && role === "customer") {
    return false
  }
  
  return true
}
