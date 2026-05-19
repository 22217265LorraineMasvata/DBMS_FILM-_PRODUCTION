"use client"

import Link from "next/link"
import {
  ClipboardList,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Camera,
  MapPin,
} from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

const stats = [
  {
    title: "Today&apos;s Tasks",
    value: "8",
    description: "3 completed",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "This Week",
    value: "5",
    description: "Scheduled shoots",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Hours Logged",
    value: "32",
    description: "This week",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    title: "Equipment Reserved",
    value: "4",
    description: "Active reservations",
    icon: <Camera className="h-5 w-5" />,
  },
]

const todayTasks = [
  {
    id: 1,
    title: "Camera setup for Scene 12",
    time: "08:00 AM",
    location: "Stage A",
    completed: true,
  },
  {
    id: 2,
    title: "Equipment check - Lighting rig",
    time: "09:30 AM",
    location: "Equipment Room",
    completed: true,
  },
  {
    id: 3,
    title: "Assist with beach sequence shoot",
    time: "10:00 AM - 01:00 PM",
    location: "Malibu Beach",
    completed: true,
  },
  {
    id: 4,
    title: "Lunch break",
    time: "01:00 PM - 02:00 PM",
    location: "-",
    completed: false,
  },
  {
    id: 5,
    title: "Set up for dialogue scene",
    time: "02:00 PM",
    location: "Studio A",
    completed: false,
  },
  {
    id: 6,
    title: "Monitor audio levels",
    time: "03:00 PM - 05:00 PM",
    location: "Studio A",
    completed: false,
  },
  {
    id: 7,
    title: "Equipment teardown",
    time: "05:00 PM",
    location: "Studio A",
    completed: false,
  },
  {
    id: 8,
    title: "Daily wrap report",
    time: "05:30 PM",
    location: "Office",
    completed: false,
  },
]

const weekSchedule = [
  {
    day: "Monday",
    date: "May 6",
    shoots: 2,
    hours: "8:00 AM - 6:00 PM",
    production: "The Midnight Voyage",
  },
  {
    day: "Tuesday",
    date: "May 7",
    shoots: 1,
    hours: "10:00 AM - 4:00 PM",
    production: "Project Aurora",
  },
  {
    day: "Wednesday",
    date: "May 8",
    shoots: 2,
    hours: "7:00 AM - 7:00 PM",
    production: "The Midnight Voyage",
  },
  {
    day: "Thursday",
    date: "May 9",
    shoots: 0,
    hours: "Off",
    production: null,
  },
  {
    day: "Friday",
    date: "May 10",
    shoots: 1,
    hours: "9:00 AM - 5:00 PM",
    production: "Silent Echo",
  },
]

const equipmentReservations = [
  {
    id: 1,
    name: "RED Komodo 6K",
    dates: "May 6 - May 8",
    status: "Active",
  },
  {
    id: 2,
    name: "Wireless Lav Kit",
    dates: "May 6 - May 10",
    status: "Active",
  },
  {
    id: 3,
    name: "LED Panel Set (x4)",
    dates: "May 8",
    status: "Upcoming",
  },
  {
    id: 4,
    name: "Dolly System",
    dates: "May 10",
    status: "Upcoming",
  },
]

const completedTasks = todayTasks.filter((t) => t.completed).length
const totalTasks = todayTasks.length
const progressPercent = Math.round((completedTasks / totalTasks) * 100)

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Dashboard"
        description="Your assignments and schedule"
      >
        <Button asChild>
          <Link href="/employee/requests">New Request</Link>
        </Button>
      </PageHeader>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Tasks */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today&apos;s Tasks</CardTitle>
              <CardDescription>
                {completedTasks} of {totalTasks} completed
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{progressPercent}%</span>
              <Progress value={progressPercent} className="w-24" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-start gap-3 rounded-lg border p-3 ${
                    task.completed ? "bg-muted/30" : ""
                  }`}
                >
                  <Checkbox
                    checked={task.completed}
                    className="mt-1"
                    aria-label={`Mark ${task.title} as ${task.completed ? "incomplete" : "complete"}`}
                  />
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        task.completed
                          ? "text-muted-foreground line-through"
                          : ""
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {task.time}
                      </span>
                      {task.location !== "-" && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {task.location}
                        </span>
                      )}
                    </div>
                  </div>
                  {task.completed && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Equipment Reservations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Equipment</CardTitle>
              <CardDescription>Current reservations</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/equipment/reservations">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {equipmentReservations.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.dates}</p>
                  </div>
                  <Badge
                    variant={item.status === "Active" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Schedule */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>This Week</CardTitle>
              <CardDescription>Your schedule for the week</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/employee/my-schedule">Full Calendar</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-5">
              {weekSchedule.map((day, index) => (
                <div
                  key={day.day}
                  className={`rounded-lg border p-3 ${
                    index === 4 ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">{day.day}</span>
                    <span className="text-xs text-muted-foreground">
                      {day.date}
                    </span>
                  </div>
                  {day.shoots > 0 ? (
                    <>
                      <p className="text-lg font-semibold">
                        {day.shoots} shoot{day.shoots > 1 ? "s" : ""}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {day.hours}
                      </p>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {day.production}
                      </Badge>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">Day Off</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
