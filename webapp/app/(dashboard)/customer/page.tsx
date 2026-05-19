"use client"

import Link from "next/link"
import {
  Folder,
  Receipt,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Play,
} from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const stats = [
  {
    title: "Active Projects",
    value: "2",
    description: "In production",
    icon: <Folder className="h-5 w-5" />,
  },
  {
    title: "Total Investment",
    value: "$2.4M",
    description: "Across all projects",
    icon: <Receipt className="h-5 w-5" />,
  },
  {
    title: "Pending Invoices",
    value: "3",
    description: "$125,000 due",
    icon: <AlertCircle className="h-5 w-5" />,
  },
  {
    title: "Support Tickets",
    value: "1",
    description: "Open ticket",
    icon: <MessageCircle className="h-5 w-5" />,
  },
]

const myProjects = [
  {
    id: 1,
    title: "The Midnight Voyage",
    status: "Production",
    progress: 65,
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop",
    director: "Sarah Johnson",
    startDate: "Jan 2024",
    estimatedComplete: "Aug 2024",
    budget: "$12.5M",
    lastUpdate: "Scene 24 completed - Beach sequence",
    lastUpdateTime: "2 hours ago",
  },
  {
    id: 2,
    title: "Silent Echo",
    status: "Post-Production",
    progress: 85,
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=300&fit=crop",
    director: "Michael Chen",
    startDate: "Oct 2023",
    estimatedComplete: "Jun 2024",
    budget: "$8.2M",
    lastUpdate: "Color grading in progress",
    lastUpdateTime: "1 day ago",
  },
]

const recentInvoices = [
  {
    id: "INV-2024-042",
    description: "Production Services - April",
    amount: "$45,000",
    dueDate: "May 15, 2024",
    status: "pending",
  },
  {
    id: "INV-2024-038",
    description: "Equipment Rental - Q1",
    amount: "$32,500",
    dueDate: "May 1, 2024",
    status: "overdue",
  },
  {
    id: "INV-2024-035",
    description: "Location Permits",
    amount: "$12,800",
    dueDate: "Apr 20, 2024",
    status: "paid",
  },
  {
    id: "INV-2024-029",
    description: "Post-Production Services",
    amount: "$28,000",
    dueDate: "Apr 10, 2024",
    status: "paid",
  },
]

const updates = [
  {
    id: 1,
    project: "The Midnight Voyage",
    message: "Scene 24 (Beach Sequence) completed successfully. 15 minutes of footage captured.",
    time: "2 hours ago",
    type: "milestone",
  },
  {
    id: 2,
    project: "Silent Echo",
    message: "Color grading session scheduled for tomorrow with the director.",
    time: "1 day ago",
    type: "schedule",
  },
  {
    id: 3,
    project: "The Midnight Voyage",
    message: "New budget allocation approved for additional VFX sequences.",
    time: "2 days ago",
    type: "budget",
  },
]

export default function CustomerDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Welcome Back"
        description="Track your film projects and manage your account"
      >
        <Button asChild>
          <Link href="/customer/support">Contact Support</Link>
        </Button>
      </PageHeader>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* My Projects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>My Projects</CardTitle>
            <CardDescription>Your film productions</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/customer/my-projects">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {myProjects.map((project) => (
              <div
                key={project.id}
                className="group overflow-hidden rounded-lg border bg-card transition-colors hover:bg-accent/5"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <Badge
                      variant="secondary"
                      className="bg-black/50 text-white backdrop-blur"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <button className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/90 text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    <Play className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Directed by {project.director}
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Budget: {project.budget}</span>
                    <span>Est. Complete: {project.estimatedComplete}</span>
                  </div>
                  <div className="mt-3 rounded-md bg-muted/50 p-2">
                    <p className="text-xs">
                      <span className="font-medium">Latest: </span>
                      {project.lastUpdate}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {project.lastUpdateTime}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Invoices */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Your billing history</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/customer/invoices">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">
                        {invoice.id}
                      </span>
                      <Badge
                        variant={
                          invoice.status === "paid"
                            ? "secondary"
                            : invoice.status === "overdue"
                            ? "destructive"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm font-medium">
                      {invoice.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Due: {invoice.dueDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">{invoice.amount}</span>
                    {invoice.status === "pending" && (
                      <Button size="sm" variant="outline" className="ml-3">
                        Pay
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Project Updates</CardTitle>
            <CardDescription>Recent activity on your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {updates.map((update) => (
                <div key={update.id} className="flex gap-3">
                  <div
                    className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                      update.type === "milestone"
                        ? "bg-primary"
                        : update.type === "budget"
                        ? "bg-chart-5"
                        : "bg-muted-foreground"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{update.project}: </span>
                      {update.message}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {update.time}
                    </p>
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
