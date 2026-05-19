import type { UserRole, NavItem } from "@/types"
import {
  LayoutDashboard,
  Users,
  Shield,
  Film,
  Users2,
  Clapperboard,
  DollarSign,
  MapPin,
  Camera,
  BarChart3,
  Settings,
  ClipboardList,
  Calendar,
  FileText,
  Folder,
  Receipt,
  MessageCircle,
  Building2,
  Warehouse,
  Truck,
  Activity,
} from "lucide-react"

export type IconName = 
  | "LayoutDashboard"
  | "Users"
  | "Shield"
  | "Film"
  | "Users2"
  | "Clapperboard"
  | "DollarSign"
  | "MapPin"
  | "Camera"
  | "BarChart3"
  | "Settings"
  | "ClipboardList"
  | "Calendar"
  | "FileText"
  | "Folder"
  | "Receipt"
  | "MessageCircle"
  | "Building2"
  | "Warehouse"
  | "Truck"
  | "Activity"

export const ICONS = {
  LayoutDashboard,
  Users,
  Shield,
  Film,
  Users2,
  Clapperboard,
  DollarSign,
  MapPin,
  Camera,
  BarChart3,
  Settings,
  ClipboardList,
  Calendar,
  FileText,
  Folder,
  Receipt,
  MessageCircle,
  Building2,
  Warehouse,
  Truck,
  Activity,
} as const

export interface NavigationItem extends Omit<NavItem, "icon"> {
  icon: IconName
  children?: NavigationItem[]
}

export const ADMIN_NAVIGATION: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "LayoutDashboard",
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: "Users",
  },
  {
    title: "Roles & Permissions",
    href: "/admin/roles",
    icon: "Shield",
  },
  {
    title: "Audit Logs",
    href: "/admin/audit-logs",
    icon: "Activity",
  },
]

export const STAFF_NAVIGATION: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/staff",
    icon: "LayoutDashboard",
  },
  {
    title: "Team",
    href: "/staff/team",
    icon: "Users2",
  },
]

export const EMPLOYEE_NAVIGATION: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/employee",
    icon: "LayoutDashboard",
  },
  {
    title: "My Assignments",
    href: "/employee/my-assignments",
    icon: "ClipboardList",
  },
  {
    title: "My Schedule",
    href: "/employee/my-schedule",
    icon: "Calendar",
  },
  {
    title: "Requests",
    href: "/employee/requests",
    icon: "FileText",
  },
]

export const CUSTOMER_NAVIGATION: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/customer",
    icon: "LayoutDashboard",
  },
  {
    title: "My Projects",
    href: "/customer/my-projects",
    icon: "Folder",
  },
  {
    title: "Invoices",
    href: "/customer/invoices",
    icon: "Receipt",
  },
  {
    title: "Support",
    href: "/customer/support",
    icon: "MessageCircle",
  },
]

export const SHARED_NAVIGATION: NavigationItem[] = [
  {
    title: "Films",
    href: "/films",
    icon: "Film",
  },
  {
    title: "Cast & Crew",
    href: "/cast-crew",
    icon: "Users2",
  },
  {
    title: "Production",
    href: "/production",
    icon: "Clapperboard",
    children: [
      {
        title: "Overview",
        href: "/production",
        icon: "Clapperboard",
      },
      {
        title: "Schedules",
        href: "/production/schedules",
        icon: "Calendar",
      },
      {
        title: "Companies",
        href: "/production/companies",
        icon: "Building2",
      },
      {
        title: "Studios",
        href: "/production/studios",
        icon: "Warehouse",
      },
      {
        title: "Distributors",
        href: "/production/distributors",
        icon: "Truck",
      },
    ],
  },
  {
    title: "Budget",
    href: "/budget",
    icon: "DollarSign",
  },
  {
    title: "Locations",
    href: "/locations",
    icon: "MapPin",
  },
  {
    title: "Equipment",
    href: "/equipment",
    icon: "Camera",
  },
  {
    title: "Reports",
    href: "/reports",
    icon: "BarChart3",
  },
]

export const SETTINGS_NAVIGATION: NavigationItem[] = [
  {
    title: "Settings",
    href: "/settings",
    icon: "Settings",
  },
]

export function getNavigationForRole(role: UserRole): {
  roleSpecific: NavigationItem[]
  shared: NavigationItem[]
  settings: NavigationItem[]
} {
  let roleSpecific: NavigationItem[] = []
  let shared: NavigationItem[] = []

  switch (role) {
    case "admin":
      roleSpecific = ADMIN_NAVIGATION
      shared = SHARED_NAVIGATION
      break
    case "staff":
      roleSpecific = STAFF_NAVIGATION
      shared = SHARED_NAVIGATION
      break
    case "employee":
      roleSpecific = EMPLOYEE_NAVIGATION
      shared = SHARED_NAVIGATION.filter(
        (item) =>
          item.href === "/films" ||
          item.href === "/cast-crew"
      )
      break
    case "customer":
      roleSpecific = CUSTOMER_NAVIGATION
      shared = [] // Customers only see their specific navigation
      break
    default:
      roleSpecific = []
      shared = []
  }

  return {
    roleSpecific,
    shared,
    settings: SETTINGS_NAVIGATION,
  }
}
