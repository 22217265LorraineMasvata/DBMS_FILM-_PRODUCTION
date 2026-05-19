import type { Budget, BudgetCategory } from "@/types"

export const mockBudgetCategories: BudgetCategory[] = [
  {
    id: "cat-1",
    name: "Pre-Production",
    allocated: 2500000,
    spent: 2100000,
    items: [
      { id: "item-1", name: "Script Development", allocated: 500000, spent: 450000, status: "completed" },
      { id: "item-2", name: "Location Scouting", allocated: 300000, spent: 280000, status: "completed" },
      { id: "item-3", name: "Casting", allocated: 700000, spent: 650000, status: "completed" },
      { id: "item-4", name: "Set Design Planning", allocated: 500000, spent: 420000, status: "completed" },
      { id: "item-5", name: "Legal & Contracts", allocated: 500000, spent: 300000, status: "in-progress" },
    ],
  },
  {
    id: "cat-2",
    name: "Production",
    allocated: 45000000,
    spent: 28500000,
    items: [
      { id: "item-6", name: "Principal Photography", allocated: 20000000, spent: 15000000, status: "in-progress" },
      { id: "item-7", name: "Cast Salaries", allocated: 12000000, spent: 8000000, status: "in-progress" },
      { id: "item-8", name: "Crew Salaries", allocated: 8000000, spent: 4000000, status: "in-progress" },
      { id: "item-9", name: "Equipment Rental", allocated: 3000000, spent: 1000000, status: "in-progress" },
      { id: "item-10", name: "Set Construction", allocated: 2000000, spent: 500000, status: "pending" },
    ],
  },
  {
    id: "cat-3",
    name: "Post-Production",
    allocated: 15000000,
    spent: 0,
    items: [
      { id: "item-11", name: "Editing", allocated: 3000000, spent: 0, status: "pending" },
      { id: "item-12", name: "Visual Effects", allocated: 8000000, spent: 0, status: "pending" },
      { id: "item-13", name: "Sound Design", allocated: 2000000, spent: 0, status: "pending" },
      { id: "item-14", name: "Music & Score", allocated: 2000000, spent: 0, status: "pending" },
    ],
  },
  {
    id: "cat-4",
    name: "Marketing & Distribution",
    allocated: 25000000,
    spent: 2000000,
    items: [
      { id: "item-15", name: "Marketing Campaign", allocated: 15000000, spent: 1500000, status: "in-progress" },
      { id: "item-16", name: "Premiere Events", allocated: 5000000, spent: 500000, status: "pending" },
      { id: "item-17", name: "Distribution Fees", allocated: 5000000, spent: 0, status: "pending" },
    ],
  },
]

export const mockBudgets: Budget[] = [
  {
    id: "budget-1",
    filmId: "film-1",
    filmTitle: "Midnight Chronicles",
    totalBudget: 85000000,
    allocated: 87500000,
    spent: 32600000,
    remaining: 52400000,
    status: "on-track",
    categories: mockBudgetCategories,
    lastUpdated: "2024-01-15",
  },
  {
    id: "budget-2",
    filmId: "film-2",
    filmTitle: "The Last Frontier",
    totalBudget: 120000000,
    allocated: 118000000,
    spent: 95000000,
    remaining: 25000000,
    status: "at-risk",
    categories: [],
    lastUpdated: "2024-01-14",
  },
  {
    id: "budget-3",
    filmId: "film-3",
    filmTitle: "Urban Legends",
    totalBudget: 45000000,
    allocated: 44000000,
    spent: 12000000,
    remaining: 33000000,
    status: "under-budget",
    categories: [],
    lastUpdated: "2024-01-13",
  },
]

export const budgetSummary = {
  totalBudget: 250000000,
  totalAllocated: 249500000,
  totalSpent: 139600000,
  totalRemaining: 110400000,
  projectsOnTrack: 2,
  projectsAtRisk: 1,
  projectsUnderBudget: 1,
}
