"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Search,
  Download,
  Plus,
  ChevronDown,
  ChevronRight,
  PieChart,
} from "lucide-react"
import { mockBudgets, mockBudgetCategories, budgetSummary } from "@/lib/data/budget"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function getStatusBadge(status: string) {
  switch (status) {
    case "on-track":
      return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">On Track</Badge>
    case "at-risk":
      return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">At Risk</Badge>
    case "over-budget":
      return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Over Budget</Badge>
    case "under-budget":
      return <Badge className="bg-cyan-500/10 text-cyan-500 border-cyan-500/20">Under Budget</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getItemStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">Completed</Badge>
    case "in-progress":
      return <Badge variant="outline" className="text-cyan-500 border-cyan-500/30">In Progress</Badge>
    case "pending":
      return <Badge variant="outline" className="text-muted-foreground">Pending</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function BudgetCategoryRow({ category }: { category: typeof mockBudgetCategories[0] }) {
  const [isOpen, setIsOpen] = useState(false)
  const percentSpent = (category.spent / category.allocated) * 100

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <TableRow className="cursor-pointer hover:bg-muted/50">
          <TableCell>
            <div className="flex items-center gap-2">
              {isOpen ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="font-medium">{category.name}</span>
            </div>
          </TableCell>
          <TableCell className="text-right">{formatCurrency(category.allocated)}</TableCell>
          <TableCell className="text-right">{formatCurrency(category.spent)}</TableCell>
          <TableCell className="text-right">{formatCurrency(category.allocated - category.spent)}</TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Progress value={percentSpent} className="h-2 w-20" />
              <span className="text-sm text-muted-foreground w-12">{percentSpent.toFixed(0)}%</span>
            </div>
          </TableCell>
        </TableRow>
      </CollapsibleTrigger>
      <CollapsibleContent asChild>
        <>
          {category.items.map((item) => (
            <TableRow key={item.id} className="bg-muted/30">
              <TableCell className="pl-10">
                <span className="text-muted-foreground">{item.name}</span>
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {formatCurrency(item.allocated)}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {formatCurrency(item.spent)}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {formatCurrency(item.allocated - item.spent)}
              </TableCell>
              <TableCell>{getItemStatusBadge(item.status)}</TableCell>
            </TableRow>
          ))}
        </>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default function BudgetPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Budget Management"
        description="Track and manage production budgets across all projects"
      >
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
          <Plus className="mr-2 h-4 w-4" />
          New Budget
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Budget"
          value={formatCurrency(budgetSummary.totalBudget)}
          icon={DollarSign}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Spent"
          value={formatCurrency(budgetSummary.totalSpent)}
          description={`${((budgetSummary.totalSpent / budgetSummary.totalBudget) * 100).toFixed(1)}% of total`}
          icon={TrendingDown}
        />
        <StatCard
          title="Remaining"
          value={formatCurrency(budgetSummary.totalRemaining)}
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Projects At Risk"
          value={budgetSummary.projectsAtRisk.toString()}
          description={`${budgetSummary.projectsOnTrack} on track`}
          icon={AlertTriangle}
          className="border-amber-500/20"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed View</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockBudgets.map((budget) => {
              const percentSpent = (budget.spent / budget.totalBudget) * 100
              return (
                <Card key={budget.id} className="bg-card/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{budget.filmTitle}</CardTitle>
                        <CardDescription>Last updated: {budget.lastUpdated}</CardDescription>
                      </div>
                      {getStatusBadge(budget.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Budget Progress</span>
                        <span className="font-medium">{percentSpent.toFixed(1)}%</span>
                      </div>
                      <Progress value={percentSpent} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total Budget</p>
                        <p className="font-semibold">{formatCurrency(budget.totalBudget)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Spent</p>
                        <p className="font-semibold">{formatCurrency(budget.spent)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Allocated</p>
                        <p className="font-semibold">{formatCurrency(budget.allocated)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Remaining</p>
                        <p className="font-semibold text-emerald-500">{formatCurrency(budget.remaining)}</p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" size="sm">
                      <PieChart className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <Card className="bg-card/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Midnight Chronicles - Budget Breakdown</CardTitle>
                  <CardDescription>Detailed budget allocation and spending by category</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-500">On Track</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Allocated</TableHead>
                    <TableHead className="text-right">Spent</TableHead>
                    <TableHead className="text-right">Remaining</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBudgetCategories.map((category) => (
                    <BudgetCategoryRow key={category.id} category={category} />
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Budget Comparison</CardTitle>
              <CardDescription>Compare budget performance across all active productions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockBudgets.map((budget) => {
                  const percentSpent = (budget.spent / budget.totalBudget) * 100
                  const isOverBudget = budget.spent > budget.allocated
                  return (
                    <div key={budget.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{budget.filmTitle}</span>
                          {getStatusBadge(budget.status)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatCurrency(budget.spent)} / {formatCurrency(budget.totalBudget)}
                        </span>
                      </div>
                      <div className="relative h-4 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`absolute left-0 top-0 h-full rounded-full transition-all ${
                            isOverBudget ? "bg-red-500" : percentSpent > 75 ? "bg-amber-500" : "bg-cyan-500"
                          }`}
                          style={{ width: `${Math.min(percentSpent, 100)}%` }}
                        />
                        <div
                          className="absolute top-0 h-full w-0.5 bg-foreground/50"
                          style={{ left: `${(budget.allocated / budget.totalBudget) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0%</span>
                        <span>Allocated: {((budget.allocated / budget.totalBudget) * 100).toFixed(0)}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
 
