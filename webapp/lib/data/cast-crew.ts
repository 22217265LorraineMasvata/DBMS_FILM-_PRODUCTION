import type { Person, PersonType } from "@/types"

export const MOCK_PEOPLE: Person[] = [
  // Cast members
  {
    id: "1",
    name: "John Smith",
    type: "cast",
    role: "Lead Actor",
    email: "john.smith@talent.com",
    phone: "+1 (555) 123-4567",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    bio: "Award-winning actor with over 15 years of experience in film and television.",
    imdbUrl: "https://imdb.com/name/nm0000001",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    id: "2",
    name: "Emma Johnson",
    type: "cast",
    role: "Lead Actress",
    email: "emma.johnson@talent.com",
    phone: "+1 (555) 234-5678",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    bio: "Critically acclaimed actress known for her versatile performances in drama and action films.",
    imdbUrl: "https://imdb.com/name/nm0000002",
    createdAt: new Date("2023-02-20"),
    updatedAt: new Date("2024-04-15"),
  },
  {
    id: "3",
    name: "Michael Brown",
    type: "cast",
    role: "Supporting Actor",
    email: "michael.brown@talent.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    bio: "Character actor specializing in dramatic roles.",
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2024-03-28"),
  },
  {
    id: "4",
    name: "Lisa Davis",
    type: "cast",
    role: "Supporting Actress",
    email: "lisa.davis@talent.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    bio: "Rising star with a background in theater and independent films.",
    createdAt: new Date("2023-04-05"),
    updatedAt: new Date("2024-05-02"),
  },
  // Crew members
  {
    id: "5",
    name: "Alex Thompson",
    type: "crew",
    role: "Director of Photography",
    department: "Camera",
    email: "alex.thompson@filmcrew.com",
    phone: "+1 (555) 345-6789",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    bio: "Cinematographer with expertise in IMAX and large format filmmaking.",
    imdbUrl: "https://imdb.com/name/nm0000003",
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2024-05-05"),
  },
  {
    id: "6",
    name: "Maria Garcia",
    type: "crew",
    role: "Production Designer",
    department: "Art",
    email: "maria.garcia@filmcrew.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    bio: "Award-winning production designer with experience across multiple genres.",
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2024-04-20"),
  },
  {
    id: "7",
    name: "David Kim",
    type: "crew",
    role: "Sound Engineer",
    department: "Sound",
    email: "david.kim@filmcrew.com",
    phone: "+1 (555) 456-7890",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    bio: "Audio specialist with extensive post-production experience.",
    createdAt: new Date("2023-03-20"),
    updatedAt: new Date("2024-05-08"),
  },
  {
    id: "8",
    name: "Jennifer Lee",
    type: "crew",
    role: "Costume Designer",
    department: "Wardrobe",
    email: "jennifer.lee@filmcrew.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer",
    bio: "Creative costume designer known for period pieces and fantasy films.",
    createdAt: new Date("2023-04-25"),
    updatedAt: new Date("2024-04-10"),
  },
  {
    id: "9",
    name: "Robert Chen",
    type: "crew",
    role: "Gaffer",
    department: "Lighting",
    email: "robert.chen@filmcrew.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
    bio: "Expert lighting technician with 20 years in the industry.",
    createdAt: new Date("2023-05-10"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: "10",
    name: "Sarah Williams",
    type: "crew",
    role: "Line Producer",
    department: "Production",
    email: "sarah.williams@filmcrew.com",
    phone: "+1 (555) 567-8901",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    bio: "Experienced line producer specializing in large-scale productions.",
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2024-05-01"),
  },
]

export const DEPARTMENTS = [
  "Camera",
  "Art",
  "Sound",
  "Wardrobe",
  "Lighting",
  "Production",
  "Grip",
  "VFX",
  "Makeup",
  "Stunts",
  "Transportation",
  "Catering",
]

export const CAST_ROLES = [
  "Lead Actor",
  "Lead Actress",
  "Supporting Actor",
  "Supporting Actress",
  "Featured Extra",
  "Background Actor",
  "Stunt Double",
  "Voice Actor",
]

export const CREW_ROLES: Record<string, string[]> = {
  Camera: ["Director of Photography", "Camera Operator", "Focus Puller", "Steadicam Operator"],
  Art: ["Production Designer", "Art Director", "Set Decorator", "Props Master"],
  Sound: ["Sound Engineer", "Boom Operator", "Sound Mixer", "Foley Artist"],
  Wardrobe: ["Costume Designer", "Wardrobe Supervisor", "Dresser", "Seamstress"],
  Lighting: ["Gaffer", "Best Boy Electric", "Electrician", "Rigging Gaffer"],
  Production: ["Line Producer", "Production Manager", "Production Coordinator", "Assistant Director"],
  Grip: ["Key Grip", "Best Boy Grip", "Dolly Grip", "Rigging Grip"],
  VFX: ["VFX Supervisor", "Compositor", "3D Artist", "Matte Painter"],
  Makeup: ["Makeup Department Head", "Makeup Artist", "Hair Stylist", "Prosthetics Artist"],
  Stunts: ["Stunt Coordinator", "Stunt Performer", "Fight Choreographer"],
  Transportation: ["Transportation Coordinator", "Driver", "Truck Driver"],
  Catering: ["Craft Services", "Caterer", "Chef"],
}

export function getPeople(): Person[] {
  return MOCK_PEOPLE
}

export function getPersonById(id: string): Person | undefined {
  return MOCK_PEOPLE.find((person) => person.id === id)
}

export function getCast(): Person[] {
  return MOCK_PEOPLE.filter((person) => person.type === "cast")
}

export function getCrew(): Person[] {
  return MOCK_PEOPLE.filter((person) => person.type === "crew")
}

export function getPeopleByDepartment(department: string): Person[] {
  return MOCK_PEOPLE.filter((person) => person.department === department)
}
