"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Camera,
  Lightbulb,
  Mic,
  Box,
  Search,
  Plus,
  Filter,
  Wrench,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Calendar,
} from "lucide-react"
import { mockEquipment, equipmentCategories, equipmentSummary } from "@/lib/data/equipment"

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "camera":
      return <Camera className="h-5 w-5" />
    case "lighting":
      return <Lightbulb className="h-5 w-5" />
    case "audio":
      return <Mic className="h-5 w-5" />
    case "grip":
    case "lenses":
    default:
      return <Box className="h-5 w-5" />
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "available":
      return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Available</Badge>
    case "in-use":
      return <Badge className="bg-cyan-500/10 text-cyan-500 border-cyan-500/20">In Use</Badge>
    case "maintenance":
      return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Maintenance</Badge>
    case "reserved":
      return <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">Reserved</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getConditionBadge(condition: string) {
  switch (condition) {
    case "excellent":
      return <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">Excellent</Badge>
    case "good":
      return <Badge variant="outline" className="text-cyan-500 border-cyan-500/30">Good</Badge>
    case "fair":
      return <Badge variant="outline" className="text-amber-500 border-amber-500/30">Fair</Badge>
    case "poor":
      return <Badge variant="outline" className="text-red-500 border-red-500/30">Poor</Badge>
    default:
      return <Badge variant="outline">{condition}</Badge>
  }
}

export default function EquipmentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredEquipment = mockEquipment.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Equipment"
        description="Manage production equipment inventory and assignments"
      >
        <Button variant="outline" size="sm">
          <Wrench className="mr-2 h-4 w-4" />
          Schedule Maintenance
        </Button>
        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Equipment
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Items"
          value={equipmentSummary.totalItems.toString()}
          description={`${equipmentSummary.itemsAvailable} available`}
          icon={Box}
        />
        <StatCard
          title="Total Value"
          value={formatCurrency(equipmentSummary.totalValue)}
          icon={DollarSign}
        />
        <StatCard
          title="Items In Use"
          value={equipmentSummary.itemsInUse.toString()}
          description={`${equipmentSummary.itemsReserved} reserved`}
          icon={Camera}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Maintenance Due"
          value={equipmentSummary.maintenanceDueThisMonth.toString()}
          description="This month"
          icon={Wrench}
          className="border-amber-500/20"
        />
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[160px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="camera">Cameras</SelectItem>
                <SelectItem value="lenses">Lenses</SelectItem>
                <SelectItem value="lighting">Lighting</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="grip">Grip</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="in-use">In Use</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="bg-card/50">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Location / Assignment</TableHead>
                    <TableHead className="text-right">Daily Rate</TableHead>
                    <TableHead>Next Maintenance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEquipment.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.serialNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(item.category)}
                          <span className="capitalize">{item.category}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{getConditionBadge(item.condition)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{item.location}</p>
                          {item.assignedFilm && (
                            <p className="text-cyan-500">{item.assignedFilm}</p>
                          )}
                          {item.reservedFilm && (
                            <p className="text-purple-500">Reserved: {item.reservedFilm}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(item.dailyRentalRate)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {item.nextMaintenance}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {equipmentCategories.map((category) => (
              <Card key={category.id} className="bg-card/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
                        {getCategoryIcon(category.name.toLowerCase())}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <CardDescription>{category.count} items</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Value</span>
                      <span className="font-semibold text-lg">{formatCurrency(category.value)}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-emerald-500/10">
                        <p className="text-lg font-semibold text-emerald-500">
                          {Math.floor(category.count * 0.55)}
                        </p>
                        <p className="text-xs text-muted-foreground">Available</p>
                      </div>
                      <div className="p-2 rounded-lg bg-cyan-500/10">
                        <p className="text-lg font-semibold text-cyan-500">
                          {Math.floor(category.count * 0.35)}
                        </p>
                        <p className="text-xs text-muted-foreground">In Use</p>
                      </div>
                      <div className="p-2 rounded-lg bg-amber-500/10">
                        <p className="text-lg font-semibold text-amber-500">
                          {Math.floor(category.count * 0.1)}
                        </p>
                        <p className="text-xs text-muted-foreground">Maintenance</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" size="sm">
                      View All {category.name}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <CardTitle>Maintenance Due</CardTitle>
                </div>
                <CardDescription>Equipment requiring maintenance this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEquipment
                    .filter((item) => item.status === "maintenance" || new Date(item.nextMaintenance) <= new Date("2024-02-01"))
                    .slice(0, 4)
                    .map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                            {getCategoryIcon(item.category)}
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.serialNumber}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-amber-500">{item.nextMaintenance}</p>
                          {item.maintenanceNotes && (
                            <p className="text-xs text-muted-foreground">{item.maintenanceNotes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <CardTitle>Recently Serviced</CardTitle>
                </div>
                <CardDescription>Equipment recently completed maintenance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEquipment
                    .filter((item) => item.condition === "excellent")
                    .slice(0, 4)
                    .map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                            {getCategoryIcon(item.category)}
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.serialNumber}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-emerald-500">Last: {item.lastMaintenance}</p>
                          <p className="text-xs text-muted-foreground">Next: {item.nextMaintenance}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-cyan-500" />
                <CardTitle>Maintenance Schedule</CardTitle>
              </div>
              <CardDescription>Upcoming maintenance calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Last Service</TableHead>
                    <TableHead>Next Service</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEquipment.slice(0, 5).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.serialNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{item.category}</TableCell>
                      <TableCell>{item.lastMaintenance}</TableCell>
                      <TableCell>{item.nextMaintenance}</TableCell>
                      <TableCell>{getConditionBadge(item.condition)}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {item.maintenanceNotes || "No notes"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
