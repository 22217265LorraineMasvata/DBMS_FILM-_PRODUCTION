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
  MapPin,
  Building2,
  Calendar,
  DollarSign,
  Search,
  Plus,
  Filter,
  Globe,
  Phone,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { mockLocations, mockCities, mockRentals, locationsSummary } from "@/lib/data/locations"

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function getLocationStatusBadge(status: string) {
  switch (status) {
    case "available":
      return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Available</Badge>
    case "booked":
      return <Badge className="bg-cyan-500/10 text-cyan-500 border-cyan-500/20">Booked</Badge>
    case "maintenance":
      return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Maintenance</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getRentalStatusBadge(status: string) {
  switch (status) {
    case "confirmed":
      return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Confirmed</Badge>
    case "pending":
      return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Pending</Badge>
    case "cancelled":
      return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Cancelled</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getPaymentStatusIcon(status: string) {
  switch (status) {
    case "paid":
      return <CheckCircle className="h-4 w-4 text-emerald-500" />
    case "partial":
      return <Clock className="h-4 w-4 text-amber-500" />
    case "pending":
      return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    default:
      return null
  }
}

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredLocations = mockLocations.filter((location) => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.city.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || location.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Locations"
        description="Manage filming locations, cities, and rentals"
      >
        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Locations"
          value={locationsSummary.totalLocations.toString()}
          description={`${locationsSummary.availableLocations} available`}
          icon={MapPin}
        />
        <StatCard
          title="Active Rentals"
          value={locationsSummary.activeRentals.toString()}
          description={`${locationsSummary.upcomingBookings} upcoming`}
          icon={Calendar}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Monthly Revenue"
          value={formatCurrency(locationsSummary.monthlyRevenue)}
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Cities Covered"
          value={mockCities.length.toString()}
          description="4 countries"
          icon={Globe}
        />
      </div>

      <Tabs defaultValue="locations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="locations">Filming Sites</TabsTrigger>
          <TabsTrigger value="cities">Cities</TabsTrigger>
          <TabsTrigger value="rentals">Rentals</TabsTrigger>
        </TabsList>

        <TabsContent value="locations" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredLocations.map((location) => (
              <Card key={location.id} className="bg-card/50">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{location.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {location.city}, {location.country}
                      </CardDescription>
                    </div>
                    {getLocationStatusBadge(location.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{location.address}</p>

                  <div className="flex flex-wrap gap-1">
                    {location.amenities.slice(0, 4).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {location.amenities.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{location.amenities.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Daily Rate</p>
                      <p className="font-semibold">{formatCurrency(location.dailyRate)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Capacity</p>
                      <p className="font-semibold">{location.capacity} people</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {location.contactPerson}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {location.contactPhone}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" size="sm">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cities" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {mockCities.map((city) => (
              <Card key={city.id} className="bg-card/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Globe className="h-5 w-5 text-cyan-500" />
                        {city.name}
                      </CardTitle>
                      <CardDescription>{city.country}</CardDescription>
                    </div>
                    <Badge variant="outline">{city.timezone}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Productions</p>
                      <p className="font-semibold text-lg">{city.activeProductions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Locations</p>
                      <p className="font-semibold text-lg">{city.availableLocations}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg. Rate</p>
                      <p className="font-semibold text-lg">{formatCurrency(city.averageDailyRate)}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Film Commission:</span>
                      <span className="font-medium">{city.filmCommission}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Tax Incentives:</span>
                      <p className="text-emerald-500 font-medium mt-1">{city.incentives}</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" size="sm">
                    View Locations
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rentals" className="space-y-4">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Active Rentals</CardTitle>
              <CardDescription>Current and upcoming location rentals</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Location</TableHead>
                    <TableHead>Production</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead className="text-right">Total Cost</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRentals.map((rental) => (
                    <TableRow key={rental.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{rental.locationName}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(rental.dailyRate)}/day
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{rental.filmTitle}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{rental.startDate}</p>
                          <p className="text-muted-foreground">to {rental.endDate}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(rental.totalCost)}
                      </TableCell>
                      <TableCell>{getRentalStatusBadge(rental.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getPaymentStatusIcon(rental.paymentStatus)}
                          <span className="text-sm capitalize">{rental.paymentStatus}</span>
                        </div>
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
