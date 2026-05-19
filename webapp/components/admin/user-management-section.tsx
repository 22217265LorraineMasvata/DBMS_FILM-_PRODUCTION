"use client"

import * as React from "react"
import { useState } from "react"
import { Users, UserPlus, Trash2, MoreHorizontal, Mail, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AddUserDialog, type NewUserData } from "./add-user-dialog"
import { DeleteUserDialog } from "./delete-user-dialog"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  avatar?: string
  status: "active" | "inactive"
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "admin",
    department: "production",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    status: "active",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "staff",
    department: "finance",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    status: "active",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "employee",
    department: "post-production",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    status: "active",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.wilson@example.com",
    role: "employee",
    department: "marketing",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    status: "inactive",
  },
]

const roleColors: Record<string, string> = {
  admin: "bg-primary/10 text-primary border-primary/20",
  staff: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  employee: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  customer: "bg-amber-500/10 text-amber-600 border-amber-500/20",
}

export function UserManagementSection() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const { toast } = useToast()

  const handleUserAdded = (newUser: NewUserData) => {
    const user: User = {
      id: `user-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newUser.name.toLowerCase().replace(/\s/g, "")}`,
      status: "active",
    }
    setUsers((prev) => [user, ...prev])
    toast({
      title: "User created",
      description: `${newUser.name} has been added to the system.`,
    })
  }

  const handleUserDeleted = (userId: string) => {
    const deletedUser = users.find((u) => u.id === userId)
    setUsers((prev) => prev.filter((u) => u.id !== userId))
    toast({
      title: "User deleted",
      description: `${deletedUser?.name || "User"} has been removed from the system.`,
      variant: "destructive",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Management
          </CardTitle>
          <CardDescription>
            Manage system users and their permissions
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <DeleteUserDialog
            users={users}
            onUserDeleted={handleUserDeleted}
            trigger={
              <Button variant="outline" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            }
          />
          <AddUserDialog
            onUserAdded={handleUserAdded}
            trigger={
              <Button size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            }
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{user.name}</span>
                    <Badge
                      variant="outline"
                      className={`text-xs capitalize ${roleColors[user.role] || ""}`}
                    >
                      {user.role}
                    </Badge>
                    {user.status === "inactive" && (
                      <Badge variant="secondary" className="text-xs">
                        Inactive
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{user.email}</span>
                    <span className="text-muted-foreground/50">•</span>
                    <span className="capitalize">{user.department}</span>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">User actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Shield className="mr-2 h-4 w-4" />
                    Edit Permissions
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => handleUserDeleted(user.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
