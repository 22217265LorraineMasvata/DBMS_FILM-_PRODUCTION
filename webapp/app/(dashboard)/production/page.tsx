"use client"

import Link from "next/link"
import {
  Calendar,
  Building2,
  Warehouse,
  Truck,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import {
  getSchedules,
  getCompanies,
  getStudios,
  getDistributors,
  SCHEDULE_STATUS_CONFIG,
} from "@/lib/data/production"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function ProductionPage() {
  const schedules = getSchedules()
  const companies = getCompanies()
  const studios = getStudios()
  const distributors = getDistributors()

  const scheduledCount = schedules.filter((s) => s.status === "scheduled").length
  const inProgressCount = schedules.filter((s) => s.status === "in-progress").length
  const completedCount = schedules.filter((s) => s.status === "completed").length

  const upcomingSchedules = schedules
    .filter((s) => s.status === "scheduled" || s.status === "in-progress")
    .slice(0, 4)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Production"
        description="Manage schedules, companies, studios, and distributors"
      >
        <Button asChild>
          <Link href="/production/schedules/calendar">
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Link>
        </Button>
      </PageHeader>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Shoots"
          value={schedules.length}
          description="Scheduled shoots"
          icon={Calendar}
        />
        <StatCard
          title="Companies"
          value={companies.length}
          description="Production partners"
          icon={Building2}
        />
        <StatCard
          title="Studios"
          value={studios.length}
          description="Available facilities"
          icon={Warehouse}
        />
        <StatCard
          title="Distributors"
          value={distributors.length}
          description="Distribution partners"
          icon={Truck}
        />
      </div>

      {/* Schedule Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule Progress</CardTitle>
          <CardDescription>Current production schedule status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-muted" />
                Scheduled ({scheduledCount})
              </span>
              <span className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                In Progress ({inProgressCount})
              </span>
              <span className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-3" />
                Completed ({completedCount})
              </span>
            </div>
            <span className="font-medium">
              {Math.round((completedCount / schedules.length) * 100)}% Complete
            </span>
          </div>
          <Progress
            value={(completedCount / schedules.length) * 100}
            className="h-3"
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Shoots */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Shoots</CardTitle>
              <CardDescription>Scheduled production activities</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/production/schedules">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="flex items-start gap-4 rounded-lg border p-3"
                >
                  <div className="flex flex-col items-center rounded bg-muted px-3 py-1.5">
                    <span className="text-xs text-muted-foreground">
                      {new Date(schedule.startDate).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                    <span className="text-lg font-bold">
                      {new Date(schedule.startDate).getDate()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{schedule.title}</h4>
                      <Badge variant={SCHEDULE_STATUS_CONFIG[schedule.status].variant}>
                        {SCHEDULE_STATUS_CONFIG[schedule.status].label}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                      {schedule.description}
                    </p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(schedule.startDate).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(schedule.endDate).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Production Resources</CardTitle>
            <CardDescription>Quick access to production management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/production/schedules"
                className="flex flex-col items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent/5"
              >
                <div className="rounded-md bg-primary/10 p-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-medium">Schedules</p>
                  <p className="text-sm text-muted-foreground">
                    {schedules.length} total
                  </p>
                </div>
              </Link>

              <Link
                href="/production/companies"
                className="flex flex-col items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent/5"
              >
                <div className="rounded-md bg-chart-1/10 p-3">
                  <Building2 className="h-6 w-6 text-chart-1" />
                </div>
                <div className="text-center">
                  <p className="font-medium">Companies</p>
                  <p className="text-sm text-muted-foreground">
                    {companies.length} partners
                  </p>
                </div>
              </Link>

              <Link
                href="/production/studios"
                className="flex flex-col items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent/5"
              >
                <div className="rounded-md bg-chart-2/10 p-3">
                  <Warehouse className="h-6 w-6 text-chart-2" />
                </div>
                <div className="text-center">
                  <p className="font-medium">Studios</p>
                  <p className="text-sm text-muted-foreground">
                    {studios.length} facilities
                  </p>
                </div>
              </Link>

              <Link
                href="/production/distributors"
                className="flex flex-col items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent/5"
              >
                <div className="rounded-md bg-chart-3/10 p-3">
                  <Truck className="h-6 w-6 text-chart-3" />
                </div>
                <div className="text-center">
                  <p className="font-medium">Distributors</p>
                  <p className="text-sm text-muted-foreground">
                    {distributors.length} networks
                  </p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Companies Preview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Production Companies</CardTitle>
              <CardDescription>Partner organizations</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/production/companies">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {companies.slice(0, 3).map((company) => (
                <div
                  key={company.id}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{company.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {company.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Studios Preview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Studios & Facilities</CardTitle>
              <CardDescription>Production locations</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/production/studios">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studios.slice(0, 3).map((studio) => (
                <div
                  key={studio.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                      <Warehouse className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{studio.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Capacity: {studio.capacity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${(studio.dailyRate ?? 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">per day</p>
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
