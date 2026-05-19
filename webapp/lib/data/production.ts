import type { ProductionSchedule, ProductionCompany, Studio, Distributor, ScheduleStatus } from "@/types"

export const MOCK_SCHEDULES: ProductionSchedule[] = [
  {
    id: "1",
    filmId: "1",
    title: "Scene 12 - Beach Sequence",
    description: "Wide shots of the ship arriving at the island. Multiple camera setups required.",
    startDate: new Date("2024-05-06T08:00:00"),
    endDate: new Date("2024-05-06T18:00:00"),
    status: "completed",
    locationId: "1",
    assignedTo: ["5", "7"],
    createdAt: new Date("2024-04-15"),
    updatedAt: new Date("2024-05-06"),
  },
  {
    id: "2",
    filmId: "1",
    title: "Scene 15 - Dialogue Scene",
    description: "Interior cabin dialogue between Captain James and Dr. Chen.",
    startDate: new Date("2024-05-07T10:00:00"),
    endDate: new Date("2024-05-07T16:00:00"),
    status: "completed",
    locationId: "2",
    assignedTo: ["5", "8"],
    createdAt: new Date("2024-04-15"),
    updatedAt: new Date("2024-05-07"),
  },
  {
    id: "3",
    filmId: "1",
    title: "Scene 24 - Night Chase",
    description: "Action sequence through downtown streets. Stunt coordination required.",
    startDate: new Date("2024-05-08T19:00:00"),
    endDate: new Date("2024-05-09T03:00:00"),
    status: "in-progress",
    locationId: "3",
    assignedTo: ["5", "6", "7", "9"],
    createdAt: new Date("2024-04-20"),
    updatedAt: new Date("2024-05-08"),
  },
  {
    id: "4",
    filmId: "2",
    title: "VFX Pre-visualization",
    description: "Preview rendering of space station sequences.",
    startDate: new Date("2024-05-10T09:00:00"),
    endDate: new Date("2024-05-10T17:00:00"),
    status: "scheduled",
    locationId: "2",
    assignedTo: ["6"],
    createdAt: new Date("2024-04-25"),
    updatedAt: new Date("2024-04-25"),
  },
  {
    id: "5",
    filmId: "1",
    title: "Scene 18 - Underwater Sequence",
    description: "Tank filming for underwater discovery scene.",
    startDate: new Date("2024-05-12T07:00:00"),
    endDate: new Date("2024-05-12T19:00:00"),
    status: "scheduled",
    locationId: "4",
    assignedTo: ["5", "7"],
    createdAt: new Date("2024-04-28"),
    updatedAt: new Date("2024-04-28"),
  },
]

export const MOCK_COMPANIES: ProductionCompany[] = [
  {
    id: "1",
    name: "Stellar Pictures",
    description: "Premier film production company specializing in action and sci-fi blockbusters.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=stellar",
    website: "https://stellarpictures.com",
    contactEmail: "info@stellarpictures.com",
    contactPhone: "+1 (555) 100-2000",
    address: "100 Hollywood Blvd, Los Angeles, CA 90028",
    createdAt: new Date("2020-01-15"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "2",
    name: "Horizon Films",
    description: "Independent production company focused on award-winning drama and documentary.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=horizon",
    website: "https://horizonfilms.com",
    contactEmail: "contact@horizonfilms.com",
    contactPhone: "+1 (555) 200-3000",
    address: "250 Film Row, New York, NY 10001",
    createdAt: new Date("2018-06-20"),
    updatedAt: new Date("2024-02-15"),
  },
  {
    id: "3",
    name: "Nova Entertainment",
    description: "Global entertainment conglomerate with film, TV, and streaming divisions.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=nova",
    website: "https://novaent.com",
    contactEmail: "productions@novaent.com",
    contactPhone: "+1 (555) 300-4000",
    address: "500 Media Center Dr, Burbank, CA 91505",
    createdAt: new Date("2015-03-10"),
    updatedAt: new Date("2024-04-20"),
  },
]

export const MOCK_STUDIOS: Studio[] = [
  {
    id: "1",
    name: "SoundStage Alpha",
    description: "State-of-the-art 40,000 sq ft soundstage with full production facilities.",
    address: "1000 Studio Drive, Los Angeles, CA 90038",
    capacity: 500,
    amenities: ["Green Screen", "Sound Recording", "Dressing Rooms", "Workshop", "Parking"],
    dailyRate: 15000,
    contactEmail: "bookings@soundstagealpha.com",
    contactPhone: "+1 (555) 400-5000",
    createdAt: new Date("2019-01-01"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Digital Arts Studio",
    description: "Modern facility designed for VFX-heavy productions with LED volume technology.",
    address: "2000 Tech Park Way, Los Angeles, CA 90045",
    capacity: 250,
    amenities: ["LED Volume", "Motion Capture", "Real-time Rendering", "Color Suite"],
    dailyRate: 25000,
    contactEmail: "info@digitalartstudio.com",
    contactPhone: "+1 (555) 500-6000",
    createdAt: new Date("2021-06-15"),
    updatedAt: new Date("2024-02-20"),
  },
  {
    id: "3",
    name: "Waterworld Tank",
    description: "Massive water tank facility for underwater and maritime filming.",
    address: "3000 Marina Blvd, Long Beach, CA 90802",
    capacity: 100,
    amenities: ["Underwater Filming", "Wave Machine", "Dive Support", "Heated Water"],
    dailyRate: 20000,
    contactEmail: "reservations@waterworldtank.com",
    contactPhone: "+1 (555) 600-7000",
    createdAt: new Date("2017-09-01"),
    updatedAt: new Date("2024-03-10"),
  },
]

export const MOCK_DISTRIBUTORS: Distributor[] = [
  {
    id: "1",
    name: "Global Cinematic",
    description: "Worldwide theatrical and streaming distribution with presence in 50+ countries.",
    website: "https://globalcinematic.com",
    territories: ["North America", "Europe", "Asia Pacific", "Latin America"],
    contactEmail: "acquisitions@globalcinematic.com",
    contactPhone: "+1 (555) 700-8000",
    createdAt: new Date("2010-05-01"),
    updatedAt: new Date("2024-04-01"),
  },
  {
    id: "2",
    name: "Arthaus Distribution",
    description: "Specialized distributor for independent and arthouse films.",
    website: "https://arthausdist.com",
    territories: ["North America", "Europe"],
    contactEmail: "films@arthausdist.com",
    contactPhone: "+1 (555) 800-9000",
    createdAt: new Date("2012-08-15"),
    updatedAt: new Date("2024-02-28"),
  },
  {
    id: "3",
    name: "StreamMax Studios",
    description: "Digital-first distributor focused on streaming platforms and VOD.",
    website: "https://streammaxstudios.com",
    territories: ["Worldwide (Digital)"],
    contactEmail: "content@streammaxstudios.com",
    contactPhone: "+1 (555) 900-1000",
    createdAt: new Date("2019-01-10"),
    updatedAt: new Date("2024-05-01"),
  },
]

export const SCHEDULE_STATUS_CONFIG: Record<
  ScheduleStatus,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
> = {
  scheduled: { label: "Scheduled", variant: "outline" },
  "in-progress": { label: "In Progress", variant: "default" },
  completed: { label: "Completed", variant: "secondary" },
  cancelled: { label: "Cancelled", variant: "destructive" },
  postponed: { label: "Postponed", variant: "outline" },
}

export function getSchedules(): ProductionSchedule[] {
  return MOCK_SCHEDULES
}

export function getScheduleById(id: string): ProductionSchedule | undefined {
  return MOCK_SCHEDULES.find((s) => s.id === id)
}

export function getSchedulesByFilm(filmId: string): ProductionSchedule[] {
  return MOCK_SCHEDULES.filter((s) => s.filmId === filmId)
}

export function getCompanies(): ProductionCompany[] {
  return MOCK_COMPANIES
}

export function getCompanyById(id: string): ProductionCompany | undefined {
  return MOCK_COMPANIES.find((c) => c.id === id)
}

export function getStudios(): Studio[] {
  return MOCK_STUDIOS
}

export function getStudioById(id: string): Studio | undefined {
  return MOCK_STUDIOS.find((s) => s.id === id)
}

export function getDistributors(): Distributor[] {
  return MOCK_DISTRIBUTORS
}

export function getDistributorById(id: string): Distributor | undefined {
  return MOCK_DISTRIBUTORS.find((d) => d.id === id)
}
