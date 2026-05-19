"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Edit,
  Calendar,
  DollarSign,
  Users2,
  Clapperboard,
  MapPin,
  Camera,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { getFilmById, FILM_STATUS_CONFIG, formatBudget, calculateBudgetProgress } from "@/lib/data/films"
import { useAuth } from "@/lib/auth/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for film details
const mockCast = [
  { id: 1, name: "John Smith", role: "Lead Actor", character: "Captain James" },
  { id: 2, name: "Emma Johnson", role: "Lead Actress", character: "Dr. Sarah Chen" },
  { id: 3, name: "Michael Brown", role: "Supporting Actor", character: "First Mate" },
  { id: 4, name: "Lisa Davis", role: "Supporting Actress", character: "Navigator" },
]

const mockCrew = [
  { id: 1, name: "Alex Thompson", role: "Director of Photography", department: "Camera" },
  { id: 2, name: "Maria Garcia", role: "Production Designer", department: "Art" },
  { id: 3, name: "David Kim", role: "Sound Engineer", department: "Sound" },
  { id: 4, name: "Jennifer Lee", role: "Costume Designer", department: "Wardrobe" },
]

const mockSchedule = [
  { id: 1, date: "May 6, 2024", scene: "Scene 12", location: "Beach", status: "completed" },
  { id: 2, date: "May 7, 2024", scene: "Scene 15", location: "Studio A", status: "completed" },
  { id: 3, date: "May 8, 2024", scene: "Scene 24", location: "Downtown", status: "in-progress" },
  { id: 4, date: "May 9, 2024", scene: "Scene 18", location: "Studio B", status: "scheduled" },
]

export default function FilmDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { checkPermission } = useAuth()
  const canEdit = checkPermission("films:write")
  
  const film = getFilmById(id)

  if (!film) {
    notFound()
  }

  const statusConfig = FILM_STATUS_CONFIG[film.status]
  const budgetProgress = calculateBudgetProgress(film.spent, film.budget)

  return (
    <div className="space-y-6">
      {/* Back button and actions */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/films">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Films
          </Link>
        </Button>
        
        <div className="flex items-center gap-2">
          {canEdit && (
            <Button variant="outline" asChild>
              <Link href={`/films/${id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export Details</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Archive Film
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Film Header */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Poster */}
        <div className="shrink-0">
          <div className="aspect-[2/3] w-full max-w-[200px] overflow-hidden rounded-lg lg:w-[200px]">
            {film.posterUrl ? (
              <img
                src={film.posterUrl}
                alt={film.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-4xl">
                {film.title[0]}
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{film.title}</h1>
              <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
            </div>
            <p className="mt-1 text-muted-foreground">
              Directed by {film.director}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {film.genre.map((g) => (
              <Badge key={g} variant="outline" className="capitalize">
                {g}
              </Badge>
            ))}
          </div>

          <p className="text-muted-foreground">{film.description}</p>

          {/* Quick Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="rounded-md bg-primary/10 p-2">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Release Date</p>
                  <p className="font-medium">
                    {film.releaseDate
                      ? new Date(film.releaseDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "TBD"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="rounded-md bg-primary/10 p-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="font-medium">{formatBudget(film.budget)}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Spent</p>
                  <p className="text-sm font-medium">{budgetProgress}%</p>
                </div>
                <Progress value={budgetProgress} className="mt-2 h-2" />
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatBudget(film.spent)} of {formatBudget(film.budget)}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cast">Cast</TabsTrigger>
          <TabsTrigger value="crew">Crew</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
                <CardDescription>Navigate to film sections</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
                  <Link href={`/films/${id}/cast`}>
                    <Users2 className="h-5 w-5" />
                    <span>Cast & Crew</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
                  <Link href={`/films/${id}/schedule`}>
                    <Clapperboard className="h-5 w-5" />
                    <span>Schedule</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
                  <Link href={`/films/${id}/locations`}>
                    <MapPin className="h-5 w-5" />
                    <span>Locations</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
                  <Link href={`/films/${id}/equipment`}>
                    <Camera className="h-5 w-5" />
                    <span>Equipment</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates on this production</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSchedule.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          item.status === "completed"
                            ? "bg-primary"
                            : item.status === "in-progress"
                            ? "bg-chart-5"
                            : "bg-muted-foreground"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.scene}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.location} - {item.date}
                        </p>
                      </div>
                      <Badge
                        variant={
                          item.status === "completed"
                            ? "secondary"
                            : item.status === "in-progress"
                            ? "default"
                            : "outline"
                        }
                        className="text-xs capitalize"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cast" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Cast Members</CardTitle>
                <CardDescription>{mockCast.length} cast members</CardDescription>
              </div>
              {canEdit && (
                <Button size="sm" asChild>
                  <Link href={`/films/${id}/cast/new`}>Add Cast</Link>
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {mockCast.map((person) => (
                  <div
                    key={person.id}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-medium text-primary">
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {person.character} ({person.role})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crew" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Crew Members</CardTitle>
                <CardDescription>{mockCrew.length} crew members</CardDescription>
              </div>
              {canEdit && (
                <Button size="sm" asChild>
                  <Link href={`/films/${id}/crew/new`}>Add Crew</Link>
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {mockCrew.map((person) => (
                  <div
                    key={person.id}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-medium text-primary">
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {person.role}
                      </p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {person.department}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Production Schedule</CardTitle>
                <CardDescription>Shooting schedule and milestones</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/films/${id}/schedule`}>
                  View Calendar
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockSchedule.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm font-medium">{item.date}</p>
                      </div>
                      <div>
                        <p className="font-medium">{item.scene}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.location}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        item.status === "completed"
                          ? "secondary"
                          : item.status === "in-progress"
                          ? "default"
                          : "outline"
                      }
                      className="capitalize"
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
              <CardDescription>Financial breakdown of the production</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Total Budget</span>
                  <span className="font-semibold">{formatBudget(film.budget)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Amount Spent</span>
                  <span className="font-semibold">{formatBudget(film.spent)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Remaining</span>
                  <span className="font-semibold text-primary">
                    {formatBudget(film.budget - film.spent)}
                  </span>
                </div>
                <Progress value={budgetProgress} className="h-3" />
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/films/${id}/budget`}>View Full Budget Details</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
