import type { Film, FilmStatus, FilmGenre } from "@/types"

export const MOCK_FILMS: Film[] = [
  {
    id: "1",
    title: "The Midnight Voyage",
    description: "A thrilling adventure across the Pacific Ocean, following a crew of explorers who discover a hidden island with ancient secrets.",
    status: "production",
    genre: ["action", "thriller"],
    director: "Sarah Johnson",
    releaseDate: new Date("2025-06-15"),
    budget: 12500000,
    spent: 8100000,
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    companyId: "1",
    studioId: "1",
    distributorId: "1",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    id: "2",
    title: "Project Aurora",
    description: "A sci-fi epic set in 2150, where humanity's last hope lies in a team of astronauts sent to colonize a distant planet.",
    status: "pre-production",
    genre: ["sci-fi", "drama"],
    director: "Michael Chen",
    releaseDate: new Date("2026-03-20"),
    budget: 18000000,
    spent: 4500000,
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    companyId: "1",
    studioId: "2",
    distributorId: "2",
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-04-15"),
  },
  {
    id: "3",
    title: "Silent Echo",
    description: "A psychological thriller about a deaf musician who becomes entangled in a conspiracy after witnessing a crime.",
    status: "post-production",
    genre: ["thriller", "drama"],
    director: "Emily Davis",
    releaseDate: new Date("2024-09-10"),
    budget: 8200000,
    spent: 7000000,
    posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    companyId: "2",
    studioId: "1",
    distributorId: "1",
    createdAt: new Date("2023-10-01"),
    updatedAt: new Date("2024-05-05"),
  },
  {
    id: "4",
    title: "Neon Dreams",
    description: "A cyberpunk noir following a private detective in Neo Tokyo as she uncovers a corporate conspiracy.",
    status: "development",
    genre: ["sci-fi", "thriller"],
    director: "James Wilson",
    releaseDate: undefined,
    budget: 22000000,
    spent: 1200000,
    posterUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
    companyId: "1",
    studioId: undefined,
    distributorId: undefined,
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-05-02"),
  },
  {
    id: "5",
    title: "The Last Garden",
    description: "A heartwarming drama about three generations of women who reunite at their family estate to confront the past.",
    status: "completed",
    genre: ["drama", "romance"],
    director: "Maria Santos",
    releaseDate: new Date("2024-04-05"),
    budget: 5500000,
    spent: 5400000,
    posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    companyId: "2",
    studioId: "2",
    distributorId: "2",
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date("2024-03-28"),
  },
  {
    id: "6",
    title: "Velocity",
    description: "An adrenaline-fueled action film about an underground street racing circuit with dangerous stakes.",
    status: "production",
    genre: ["action", "thriller"],
    director: "Alex Thompson",
    releaseDate: new Date("2025-01-10"),
    budget: 15000000,
    spent: 9200000,
    posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    companyId: "1",
    studioId: "1",
    distributorId: "1",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-05-08"),
  },
]

export const FILM_STATUS_CONFIG: Record<
  FilmStatus,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
> = {
  development: { label: "Development", variant: "outline" },
  "pre-production": { label: "Pre-Production", variant: "secondary" },
  production: { label: "Production", variant: "default" },
  "post-production": { label: "Post-Production", variant: "secondary" },
  completed: { label: "Completed", variant: "outline" },
  released: { label: "Released", variant: "default" },
  cancelled: { label: "Cancelled", variant: "destructive" },
}

export const FILM_GENRES: { value: FilmGenre; label: string }[] = [
  { value: "action", label: "Action" },
  { value: "comedy", label: "Comedy" },
  { value: "drama", label: "Drama" },
  { value: "horror", label: "Horror" },
  { value: "sci-fi", label: "Sci-Fi" },
  { value: "documentary", label: "Documentary" },
  { value: "animation", label: "Animation" },
  { value: "thriller", label: "Thriller" },
  { value: "romance", label: "Romance" },
  { value: "fantasy", label: "Fantasy" },
]

export function getFilms(): Film[] {
  return MOCK_FILMS
}

export function getFilmById(id: string): Film | undefined {
  return MOCK_FILMS.find((film) => film.id === id)
}

export function getFilmsByStatus(status: FilmStatus): Film[] {
  return MOCK_FILMS.filter((film) => film.status === status)
}

export function formatBudget(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`
  }
  return `$${amount}`
}

export function calculateBudgetProgress(spent: number, budget: number): number {
  return Math.round((spent / budget) * 100)
}
