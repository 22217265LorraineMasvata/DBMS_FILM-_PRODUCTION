"use client"

import Link from "next/link"
import {
  Users,
  Film,
  DollarSign,
  Camera,
  TrendingUp,
  AlertCircle,
} from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { AddUserDialog } from "@/components/admin/add-user-dialog"
import { AddFilmDialog } from "@/components/admin/add-film-dialog"
import { UserManagementSection } from "@/components/admin/user-management-section"
import { useToast } from "@/hooks/use-toast"

const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: 12,
    changeType: "increase" as const,
    icon: Users,
  },
  {
    title: "Active Films",
    value: "24",
    change: 3,
    changeType: "increase" as const,
    icon: Film,
  },
  {
    title: "Total Budget",
    value: "$48.2M",
    change: -2,
    changeType: "decrease" as const,
    icon: DollarSign,
  },
  {
    title: "Equipment Items",
    value: "1,284",
    change: 0,
    changeType: "neutral" as const,
    icon: Camera,
  },
]

const recentActivity = [
  {
    id: 1,
    user: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    action: "created a new film",
    target: "The Midnight Voyage",
    time: "2 min ago",
  },
  {
    id: 2,
    user: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    action: "approved expense",
    target: "$12,500 for Camera Equipment",
    time: "15 min ago",
  },
  {
    id: 3,
    user: "Emily Davis",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    action: "updated schedule for",
    target: "Scene 24 - Downtown Location",
    time: "1 hour ago",
  },
  {
    id: 4,
    user: "James Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    action: "added cast member to",
    target: "Project Aurora",
    time: "2 hours ago",
  },
]

const activeProductions = [
  {
    id: 1,
    title: "The Midnight Voyage",
    status: "Production",
    progress: 65,
    budget: "$12.5M",
    spent: "$8.1M",
  },
  {
    id: 2,
    title: "Project Aurora",
    status: "Pre-Production",
    progress: 25,
    budget: "$18M",
    spent: "$4.5M",
  },
  {
    id: 3,
    title: "Silent Echo",
    status: "Post-Production",
    progress: 85,
    budget: "$8.2M",
    spent: "$7.0M",
  },
]

const systemAlerts = [
  {
    id: 1,
    type: "warning",
    message: "Equipment maintenance due for 12 items",
    time: "Today",
  },
  {
    id: 2,
    type: "info",
    message: "3 pending budget approvals require attention",
    time: "Today",
  },
  {
    id: 3,
    type: "error",
    message: "Location permit expiring in 5 days",
    time: "Action needed",
  },
]

export default function AdminDashboard() {
  const { toast } = useToast()

  const handleFilmAdded = (film: { title: string }) => {
    toast({
      title: "Film created",
      description: `"${film.title}" has been added to the system.`,
    })
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        description="System overview and management controls"
      >
        <div className="flex items-center gap-2">
          <AddFilmDialog onFilmAdded={handleFilmAdded} />
          <AddUserDialog />
        </div>
      </PageHeader>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Productions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Productions</CardTitle>
              <CardDescription>Current film production status</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/films">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeProductions.map((production) => (
              <div key={production.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{production.title}</span>
                    <Badge variant="secondary" className="text-xs">
                      {production.status}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {production.spent} / {production.budget}
                  </span>
                </div>
                <Progress value={production.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions across the system</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/audit-logs">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback>
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">
                        {activity.action}
                      </span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Management Section */}
        <UserManagementSection />

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              System Alerts
            </CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        alert.type === "error"
                          ? "bg-destructive"
                          : alert.type === "warning"
                          ? "bg-amber-500"
                          : "bg-cyan-500"
                      }`}
                    />
                    <span className="text-sm">{alert.message}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {alert.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <AddUserDialog
                trigger={
                  <Button variant="outline" className="h-auto flex-col gap-2 py-4 w-full">
                    <Users className="h-5 w-5" />
                    <span>Add User</span>
                  </Button>
                }
              />
              <AddFilmDialog
                onFilmAdded={handleFilmAdded}
                trigger={
                  <Button variant="outline" className="h-auto flex-col gap-2 py-4 w-full">
                    <Film className="h-5 w-5" />
                    <span>New Film</span>
                  </Button>
                }
              />
              <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
                <Link href="/budget">
                  <DollarSign className="h-5 w-5" />
                  <span>Approvals</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
                <Link href="/films">
                  <TrendingUp className="h-5 w-5" />
                  <span>Reports</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
