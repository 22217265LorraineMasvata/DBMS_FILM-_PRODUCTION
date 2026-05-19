"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Users2, User, Mail, Phone, ExternalLink } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { getPeople, DEPARTMENTS, CAST_ROLES } from "@/lib/data/cast-crew"
import { useAuth } from "@/lib/auth/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { PersonType } from "@/types"

export default function CastCrewPage() {
  const { checkPermission } = useAuth()
  const canCreate = checkPermission("cast-crew:write")
  
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState<PersonType | "all">("all")

  const people = getPeople()

  const filteredPeople = people.filter((person) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.role.toLowerCase().includes(searchQuery.toLowerCase())

    // Tab filter
    const matchesType = activeTab === "all" || person.type === activeTab

    // Department filter (crew only)
    const matchesDepartment =
      departmentFilter === "all" || person.department === departmentFilter

    // Role filter
    const matchesRole = roleFilter === "all" || person.role === roleFilter

    return matchesSearch && matchesType && matchesDepartment && matchesRole
  })

  const castCount = people.filter((p) => p.type === "cast").length
  const crewCount = people.filter((p) => p.type === "crew").length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cast & Crew"
        description="Manage talent and production staff"
      >
        {canCreate && (
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/cast-crew/cast/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Cast
              </Link>
            </Button>
            <Button asChild>
              <Link href="/cast-crew/crew/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Crew
              </Link>
            </Button>
          </div>
        )}
      </PageHeader>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-md bg-primary/10 p-3">
              <Users2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{people.length}</p>
              <p className="text-sm text-muted-foreground">Total People</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-md bg-chart-1/10 p-3">
              <User className="h-6 w-6 text-chart-1" />
            </div>
            <div>
              <p className="text-2xl font-bold">{castCount}</p>
              <p className="text-sm text-muted-foreground">Cast Members</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-md bg-chart-2/10 p-3">
              <Users2 className="h-6 w-6 text-chart-2" />
            </div>
            <div>
              <p className="text-2xl font-bold">{crewCount}</p>
              <p className="text-sm text-muted-foreground">Crew Members</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="all"
        onValueChange={(value) => {
          setActiveTab(value as PersonType | "all")
          setDepartmentFilter("all")
          setRoleFilter("all")
        }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <TabsList>
            <TabsTrigger value="all">All ({people.length})</TabsTrigger>
            <TabsTrigger value="cast">Cast ({castCount})</TabsTrigger>
            <TabsTrigger value="crew">Crew ({crewCount})</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {activeTab === "crew" && (
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {activeTab === "cast" && (
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {CAST_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <PersonGrid people={filteredPeople} />
        </TabsContent>

        <TabsContent value="cast" className="mt-6">
          <PersonGrid people={filteredPeople} />
        </TabsContent>

        <TabsContent value="crew" className="mt-6">
          <PersonGrid people={filteredPeople} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PersonGrid({ people }: { people: ReturnType<typeof getPeople> }) {
  if (people.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
        <p className="text-lg font-medium">No people found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {people.map((person) => (
        <Link key={person.id} href={`/cast-crew/${person.type}/${person.id}`}>
          <Card className="h-full transition-all hover:shadow-md hover:shadow-primary/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={person.avatarUrl} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold leading-tight">{person.name}</h3>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                  <div className="flex flex-wrap gap-1">
                    <Badge
                      variant={person.type === "cast" ? "default" : "secondary"}
                      className="text-xs capitalize"
                    >
                      {person.type}
                    </Badge>
                    {person.department && (
                      <Badge variant="outline" className="text-xs">
                        {person.department}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {(person.email || person.phone) && (
                <div className="mt-4 space-y-1.5 border-t pt-3">
                  {person.email && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{person.email}</span>
                    </div>
                  )}
                  {person.phone && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <span>{person.phone}</span>
                    </div>
                  )}
                </div>
              )}

              {person.imdbUrl && (
                <div className="mt-3 flex items-center gap-1 text-xs text-primary">
                  <ExternalLink className="h-3 w-3" />
                  <span>View on IMDB</span>
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
