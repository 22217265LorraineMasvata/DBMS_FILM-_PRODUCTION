"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Grid, List, Search, Filter } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { FilmCard } from "@/components/films/film-card"
import { getFilms, FILM_STATUS_CONFIG, FILM_GENRES } from "@/lib/data/films"
import { useAuth } from "@/lib/auth/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import type { FilmStatus, FilmGenre } from "@/types"

export default function FilmsPage() {
  const { checkPermission } = useAuth()
  const canCreate = checkPermission("films:write")
  
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<FilmStatus | "all">("all")
  const [genreFilters, setGenreFilters] = useState<FilmGenre[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const films = getFilms()

  const filteredFilms = films.filter((film) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.director.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus =
      statusFilter === "all" || film.status === statusFilter

    // Genre filter
    const matchesGenre =
      genreFilters.length === 0 ||
      film.genre.some((g) => genreFilters.includes(g))

    return matchesSearch && matchesStatus && matchesGenre
  })

  const toggleGenreFilter = (genre: FilmGenre) => {
    setGenreFilters((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setGenreFilters([])
  }

  const hasActiveFilters =
    searchQuery !== "" || statusFilter !== "all" || genreFilters.length > 0

  return (
    <div className="space-y-6">
      <PageHeader
        title="Films"
        description="Manage your film productions"
      >
        {canCreate && (
          <Button asChild>
            <Link href="/films/new">
              <Plus className="mr-2 h-4 w-4" />
              New Film
            </Link>
          </Button>
        )}
      </PageHeader>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search films..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as FilmStatus | "all")}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {Object.entries(FILM_STATUS_CONFIG).map(([value, config]) => (
                <SelectItem key={value} value={value}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Genres</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {FILM_GENRES.map((genre) => (
                <DropdownMenuCheckboxItem
                  key={genre.value}
                  checked={genreFilters.includes(genre.value)}
                  onCheckedChange={() => toggleGenreFilter(genre.value)}
                >
                  {genre.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {genreFilters.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {genreFilters.map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="cursor-pointer capitalize"
                  onClick={() => toggleGenreFilter(genre)}
                >
                  {genre}
                  <span className="ml-1">&times;</span>
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center rounded-lg border p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredFilms.length} of {films.length} films
      </div>

      {/* Films Grid/List */}
      {filteredFilms.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
          <p className="text-lg font-medium">No films found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search query
          </p>
          {hasActiveFilters && (
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Clear all filters
            </Button>
          )}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFilms.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFilms.map((film) => (
            <Link
              key={film.id}
              href={`/films/${film.id}`}
              className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent/5"
            >
              <div className="h-16 w-12 shrink-0 overflow-hidden rounded">
                {film.posterUrl ? (
                  <img
                    src={film.posterUrl}
                    alt={film.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-lg">
                    {film.title[0]}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{film.title}</h3>
                  <Badge variant={FILM_STATUS_CONFIG[film.status].variant}>
                    {FILM_STATUS_CONFIG[film.status].label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Directed by {film.director}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  ${(film.budget / 1000000).toFixed(1)}M
                </p>
                <p className="text-sm text-muted-foreground">Budget</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
