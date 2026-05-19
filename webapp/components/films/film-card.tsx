import Link from "next/link"
import type { Film } from "@/types"
import { FILM_STATUS_CONFIG, formatBudget, calculateBudgetProgress } from "@/lib/data/films"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, DollarSign, User } from "lucide-react"

interface FilmCardProps {
  film: Film
}

export function FilmCard({ film }: FilmCardProps) {
  const statusConfig = FILM_STATUS_CONFIG[film.status]
  const budgetProgress = calculateBudgetProgress(film.spent, film.budget)

  return (
    <Link href={`/films/${film.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/5">
        <div className="relative aspect-[2/3] overflow-hidden">
          {film.posterUrl ? (
            <img
              src={film.posterUrl}
              alt={film.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-4xl text-muted-foreground">
                {film.title[0]}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Badge variant={statusConfig.variant} className="mb-2">
              {statusConfig.label}
            </Badge>
            <h3 className="text-lg font-semibold text-white">{film.title}</h3>
            <div className="mt-1 flex flex-wrap gap-1">
              {film.genre.slice(0, 2).map((g) => (
                <span
                  key={g}
                  className="text-xs capitalize text-white/70"
                >
                  {g}
                  {film.genre.indexOf(g) < Math.min(film.genre.length, 2) - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{film.director}</span>
            </div>
            
            {film.releaseDate && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(film.releaseDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>Budget</span>
                </div>
                <span className="font-medium">
                  {formatBudget(film.spent)} / {formatBudget(film.budget)}
                </span>
              </div>
              <Progress value={budgetProgress} className="h-1.5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
