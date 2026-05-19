"use client"

import * as React from "react"
import { useState } from "react"
import { Plus, Loader2, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { FilmStatus, FilmGenre } from "@/types"

interface AddFilmDialogProps {
  onFilmAdded?: (film: NewFilmData) => void
  trigger?: React.ReactNode
}

export interface NewFilmData {
  title: string
  description: string
  status: FilmStatus
  genre: FilmGenre
  director: string
  budget: string
}

const filmStatuses: { value: FilmStatus; label: string }[] = [
  { value: "development", label: "Development" },
  { value: "pre-production", label: "Pre-Production" },
  { value: "production", label: "Production" },
  { value: "post-production", label: "Post-Production" },
  { value: "completed", label: "Completed" },
]

const filmGenres: { value: FilmGenre; label: string }[] = [
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

export function AddFilmDialog({ onFilmAdded, trigger }: AddFilmDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof NewFilmData, string>>>({})
  
  const [formData, setFormData] = useState<NewFilmData>({
    title: "",
    description: "",
    status: "development",
    genre: "drama",
    director: "",
    budget: "",
  })

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NewFilmData, string>> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.director.trim()) {
      newErrors.director = "Director is required"
    }

    if (!formData.budget.trim()) {
      newErrors.budget = "Budget is required"
    } else if (isNaN(parseFloat(formData.budget.replace(/[^0-9.]/g, "")))) {
      newErrors.budget = "Please enter a valid budget amount"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onFilmAdded?.(formData)
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      status: "development",
      genre: "drama",
      director: "",
      budget: "",
    })
    setErrors({})
    setIsSubmitting(false)
    setOpen(false)
  }

  const handleChange = (field: keyof NewFilmData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Film
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Film className="h-5 w-5" />
              Add New Film
            </DialogTitle>
            <DialogDescription>
              Create a new film project. Fill in the production details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">
                Film Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter film title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                aria-invalid={!!errors.title}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Brief description of the film..."
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange("status", value)}
                >
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {filmStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="genre">Genre</Label>
                <Select
                  value={formData.genre}
                  onValueChange={(value) => handleChange("genre", value)}
                >
                  <SelectTrigger id="genre" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {filmGenres.map((genre) => (
                      <SelectItem key={genre.value} value={genre.value}>
                        {genre.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="director">
                  Director <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="director"
                  placeholder="Director name"
                  value={formData.director}
                  onChange={(e) => handleChange("director", e.target.value)}
                  aria-invalid={!!errors.director}
                />
                {errors.director && (
                  <p className="text-sm text-destructive">{errors.director}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="budget">
                  Budget <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="budget"
                  placeholder="$0.00"
                  value={formData.budget}
                  onChange={(e) => handleChange("budget", e.target.value)}
                  aria-invalid={!!errors.budget}
                />
                {errors.budget && (
                  <p className="text-sm text-destructive">{errors.budget}</p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Film"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
