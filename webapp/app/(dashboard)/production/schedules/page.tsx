"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Calendar, Clock, MapPin, Users2, Filter } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { getSchedules, SCHEDULE_STATUS_CONFIG } from "@/lib/data/production"
import { getFilmById } from "@/lib/data/films"
import { useAuth } from "@/lib/auth/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ScheduleStatus } from "@/types"

export default function SchedulesPage() {
  const { checkPermission } = useAuth()
  const canCreate = checkPermission("production:write")
  
  const [statusFilter, setStatusFilter] = useState<ScheduleStatus | "all">("all")

  const schedules = getSchedules()

  const filteredSchedules = schedules.filter((schedule) => {
    return statusFilter === "all" || schedule.status === statusFilter
  })

  // Group schedules by date
  const groupedSchedules = filteredSchedules.reduce((acc, schedule) => {
    const dateKey = new Date(schedule.startDate).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(schedule)
    return acc
  }, {} as Record<string, typeof schedules>)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Production Schedules"
        description="View and manage shooting schedules"
      >
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/production/schedules/calendar">
              <Calendar className="mr-2 h-4 w-4" />
              Calendar View
            </Link>
          </Button>
          {canCreate && (
            <Button asChild>
              <Link href="/production/schedules/new">
                <Plus className="mr-2 h-4 w-4" />
                New Schedule
              </Link>
            </Button>
          )}
        </div>
      </PageHeader>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as ScheduleStatus | "all")}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {Object.entries(SCHEDULE_STATUS_CONFIG).map(([value, config]) => (
              <SelectItem key={value} value={value}>
                {config.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground">
          Showing {filteredSchedules.length} of {schedules.length} schedules
        </span>
      </div>

      {/* Schedule List */}
      {Object.keys(groupedSchedules).length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-medium">No schedules found</p>
            <p className="text-sm text-muted-foreground">
              {statusFilter !== "all"
                ? "Try changing your filter"
                : "Create your first production schedule"}
            </p>
            {canCreate && statusFilter === "all" && (
              <Button className="mt-4" asChild>
                <Link href="/production/schedules/new">Create Schedule</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedSchedules).map(([date, dateSchedules]) => (
            <div key={date}>
              <h3 className="mb-4 text-lg font-semibold">{date}</h3>
              <div className="space-y-3">
                {dateSchedules.map((schedule) => {
                  const film = getFilmById(schedule.filmId)
                  return (
                    <Card key={schedule.id}>
                      <CardContent className="flex items-start gap-4 p-4">
                        {/* Time Column */}
                        <div className="shrink-0 text-center">
                          <div className="rounded-lg bg-muted px-3 py-2">
                            <p className="text-sm font-medium">
                              {new Date(schedule.startDate).toLocaleTimeString(
                                "en-US",
                                { hour: "numeric", minute: "2-digit" }
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(schedule.endDate).toLocaleTimeString(
                                "en-US",
                                { hour: "numeric", minute: "2-digit" }
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{schedule.title}</h4>
                                <Badge
                                  variant={
                                    SCHEDULE_STATUS_CONFIG[schedule.status].variant
                                  }
                                >
                                  {SCHEDULE_STATUS_CONFIG[schedule.status].label}
                                </Badge>
                              </div>
                              {film && (
                                <Link
                                  href={`/films/${film.id}`}
                                  className="text-sm text-primary hover:underline"
                                >
                                  {film.title}
                                </Link>
                              )}
                            </div>
                          </div>

                          {schedule.description && (
                            <p className="mt-2 text-sm text-muted-foreground">
                              {schedule.description}
                            </p>
                          )}

                          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {Math.round(
                                (new Date(schedule.endDate).getTime() -
                                  new Date(schedule.startDate).getTime()) /
                                  (1000 * 60 * 60)
                              )}{" "}
                              hours
                            </div>
                            {schedule.locationId && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                Location {schedule.locationId}
                              </div>
                            )}
                            {schedule.assignedTo.length > 0 && (
                              <div className="flex items-center gap-1">
                                <Users2 className="h-4 w-4" />
                                {schedule.assignedTo.length} assigned
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/production/schedules/${schedule.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
