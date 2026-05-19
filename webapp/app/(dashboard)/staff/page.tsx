"use client"

import Link from "next/link"
import {
  Film,
  Users2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
} from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const stats = [
  {
    title: "My Productions",
    value: "6",
    description: "Active projects",
    icon: <Film className="h-5 w-5" />,
  },
  {
    title: "Team Members",
    value: "42",
    change: 5,
    changeType: "increase" as const,
    icon: <Users2 className="h-5 w-5" />,
  },
  {
    title: "Shoots This Week",
    value: "8",
    description: "Scheduled",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Pending Approvals",
    value: "12",
    description: "Requires action",
    icon: <FileText className="h-5 w-5" />,
  },
]

const todaySchedule = [
  {
    id: 1,
    time: "08:00 AM",
    title: "Scene 12 - Beach Sequence",
    location: "Malibu Beach, CA",
    status: "in-progress",
    crew: 24,
  },
  {
    id: 2,
    time: "02:00 PM",
    title: "Scene 15 - Dialogue Scene",
    location: "Studio A",
    status: "upcoming",
    crew: 12,
  },
  {
    id: 3,
    time: "06:00 PM",
    title: "Night Shoot - Chase Scene",
    location: "Downtown LA",
    status: "upcoming",
    crew: 35,
  },
]

const teamUpdates = [
  {
    id: 1,
    member: "Alex Thompson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    role: "Director of Photography",
    status: "On Set",
    production: "The Midnight Voyage",
  },
  {
    id: 2,
    member: "Maria Garcia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    role: "Production Designer",
    status: "Available",
    production: null,
  },
  {
    id: 3,
    member: "David Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    role: "Sound Engineer",
    status: "On Set",
    production: "Project Aurora",
  },
  {
    id: 4,
    member: "Lisa Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    role: "Costume Designer",
    status: "Off-site",
    production: "Silent Echo",
  },
]

const pendingApprovals = [
  {
    id: 1,
    type: "Equipment",
    title: "Camera Kit Rental",
    amount: "$4,500",
    requestedBy: "John Smith",
    priority: "high",
  },
  {
    id: 2,
    type: "Location",
    title: "Studio B Extension",
    amount: "$2,800",
    requestedBy: "Sarah Lee",
    priority: "medium",
  },
  {
    id: 3,
    type: "Budget",
    title: "Additional VFX Budget",
    amount: "$15,000",
    requestedBy: "Mike Ross",
    priority: "high",
  },
]

export default function StaffDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff Dashboard"
        description="Production overview and team management"
      >
        <Button asChild>
          <Link href="/production/schedules/calendar">View Calendar</Link>
        </Button>
      </PageHeader>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Schedule */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today&apos;s Schedule</CardTitle>
              <CardDescription>Production shoots for today</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/production/schedules">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 rounded-lg border p-3"
                >
                  <div className="flex flex-col items-center">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="mt-1 text-xs font-medium">{item.time}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.title}</span>
                      <Badge
                        variant={
                          item.status === "in-progress"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {item.status === "in-progress" ? "In Progress" : "Upcoming"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.location}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users2 className="h-3 w-3" />
                      {item.crew} crew members
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Team Status</CardTitle>
              <CardDescription>Current team availability</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/staff/team">View Team</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamUpdates.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>
                      {member.member
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{member.member}</p>
                      <Badge
                        variant={
                          member.status === "On Set"
                            ? "default"
                            : member.status === "Available"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {member.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {member.role}
                      {member.production && ` - ${member.production}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Items awaiting your approval</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/budget/approvals">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {pendingApprovals.map((approval) => (
                <div
                  key={approval.id}
                  className="flex flex-col gap-3 rounded-lg border p-4"
                >
                  <div className="flex items-start justify-between">
                    <Badge variant="outline" className="text-xs">
                      {approval.type}
                    </Badge>
                    {approval.priority === "high" && (
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{approval.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Requested by {approval.requestedBy}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">{approval.amount}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Decline
                      </Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
