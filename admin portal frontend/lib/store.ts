"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Event, Sponsor, TeamMember, MediaItem } from "./types"

const mockEvents: Event[] = [
  {
    id: "1",
    name: "Orientation 2025 – GDG MMMUT",
    type: "Event",
    image: "https://ik.imagekit.io/guxtd3sah/IMG_0710.HEIC?updatedAt=1754648851818",
    location: "Auditorium, MMMUT",
    date: "2025-01-15",
    time: "10:00",
    strength: 300,
    description:
      "Kickstart your journey with GDG MMMUT! Meet the team, learn about our vision, explore exciting upcoming events, and discover how you can be part of our tech-driven community.",
    published: true,
    draft: false,
    createdAt: "2025-01-01T10:00:00.000Z",
  },
  {
    id: "2",
    name: "Hackblitz",
    type: "Event",
    image: "https://ik.imagekit.io/vkajf4kza/IMG_0376.JPG?updatedAt=1754639902883",
    location: "CS Department, MMMUT",
    date: "2025-02-10",
    time: "09:00",
    strength: 25,
    description:
      "A high-energy hackathon where innovators and problem-solvers collaborate to build impactful tech solutions for real-world challenges.",
    published: true,
    draft: false,
    createdAt: "2025-01-02T10:00:00.000Z",
  },
  {
    id: "3",
    name: "Web Development",
    type: "Workshop",
    image: "https://ik.imagekit.io/vkajf4kza/DSC_0238%20(1)_2.jpg?updatedAt=1754639916150",
    location: "Online",
    date: "2025-02-20",
    time: "14:00",
    strength: 100,
    description:
      "A beginner-friendly workshop introducing HTML, CSS, and JavaScript to help you start building interactive, responsive web applications.",
    published: true,
    draft: false,
    createdAt: "2025-01-03T10:00:00.000Z",
  },
  {
    id: "4",
    name: "Machine Learning Webinar",
    type: "Webinar",
    image: "https://ik.imagekit.io/vkajf4kza/DSC_0190.JPG?updatedAt=1754639915604",
    location: "Online",
    date: "2025-03-05",
    time: "16:00",
    strength: 200,
    description:
      "An expert-led session exploring machine learning fundamentals, TensorFlow basics, and real-world AI applications.",
    published: true,
    draft: false,
    createdAt: "2025-01-04T10:00:00.000Z",
  },
  {
    id: "5",
    name: "App Development",
    type: "Workshop",
    image: "https://ik.imagekit.io/vkajf4kza/DSC_0428_1.webp?updatedAt=1754639910287",
    location: "Seminar Hall, MMMUT",
    date: "2025-03-15",
    time: "11:00",
    strength: 75,
    description:
      "A hands-on workshop on creating mobile applications, covering UI/UX design, development, and deployment strategies.",
    published: true,
    draft: false,
    createdAt: "2025-01-05T10:00:00.000Z",
  },
  {
    id: "6",
    name: "Native Nexus",
    type: "Workshop",
    image: "https://ik.imagekit.io/vkajf4kza/DSC_0271_1.jpg?updatedAt=1754639914878",
    location: "Online",
    date: "2025-03-25",
    time: "15:00",
    strength: 250,
    description:
      "An immersive workshop focused on mastering Google Cloud Platform services and integrating them into real-world applications.",
    published: true,
    draft: false,
    createdAt: "2025-01-06T10:00:00.000Z",
  },
]

interface EventStore {
  events: Event[]
  addEvent: (event: Omit<Event, "id" | "createdAt">) => void
  updateEvent: (id: string, event: Partial<Event>) => void
  deleteEvent: (id: string) => void
  togglePublish: (id: string) => void
}

export const useEventStore = create<EventStore>()(
  persist(
    (set) => ({
      events: mockEvents,
      addEvent: (event) =>
        set((state) => ({
          events: [
            ...state.events,
            {
              ...event,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateEvent: (id, updatedEvent) =>
        set((state) => ({
          events: state.events.map((event) => (event.id === id ? { ...event, ...updatedEvent } : event)),
        })),
      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        })),
      togglePublish: (id) =>
        set((state) => ({
          events: state.events.map((event) => (event.id === id ? { ...event, published: !event.published } : event)),
        })),
    }),
    {
      name: "gdg-events-storage-v2",
    },
  ),
)

// Sponsor Store
const mockSponsors: Sponsor[] = [
  {
    id: "1",
    name: "Google",
    image: "/placeholder.svg?height=200&width=200",
    tier: "Platinum",
    link: "https://google.com",
    createdAt: "2025-01-01T10:00:00.000Z",
  },
  {
    id: "2",
    name: "Microsoft",
    image: "/placeholder.svg?height=200&width=200",
    tier: "Gold",
    link: "https://microsoft.com",
    createdAt: "2025-01-02T10:00:00.000Z",
  },
  {
    id: "3",
    name: "Amazon Web Services",
    image: "/placeholder.svg?height=200&width=200",
    tier: "Silver",
    link: "https://aws.amazon.com",
    createdAt: "2025-01-03T10:00:00.000Z",
  },
]

interface SponsorStore {
  sponsors: Sponsor[]
  addSponsor: (sponsor: Omit<Sponsor, "id" | "createdAt">) => void
  updateSponsor: (id: string, sponsor: Partial<Sponsor>) => void
  deleteSponsor: (id: string) => void
}

export const useSponsorStore = create<SponsorStore>()(
  persist(
    (set) => ({
      sponsors: mockSponsors,
      addSponsor: (sponsor) =>
        set((state) => ({
          sponsors: [
            ...state.sponsors,
            {
              ...sponsor,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateSponsor: (id, updatedSponsor) =>
        set((state) => ({
          sponsors: state.sponsors.map((sponsor) => (sponsor.id === id ? { ...sponsor, ...updatedSponsor } : sponsor)),
        })),
      deleteSponsor: (id) =>
        set((state) => ({
          sponsors: state.sponsors.filter((sponsor) => sponsor.id !== id),
        })),
    }),
    {
      name: "gdg-sponsors-storage-v2",
    },
  ),
)

// Team Store
const mockTeam: TeamMember[] = [
  {
    id: "1",
    name: "Vikhyat Singh",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com/in/vikhyatsingh",
    github: "https://github.com/vikhyatsingh",
    role: "Lead",
    visible: true,
    createdAt: "2025-01-01T10:00:00.000Z",
  },
  {
    id: "2",
    name: "Avanish Upadhyay",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com/in/avanishupadhyay",
    github: "https://github.com/avanishupadhyay",
    role: "Co-Lead",
    visible: true,
    createdAt: "2025-01-02T10:00:00.000Z",
  },
  {
    id: "3",
    name: "Ayush Dubey",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com/in/ayushdubey",
    github: "https://github.com/ayushdubey",
    role: "Executive",
    visible: true,
    createdAt: "2025-01-03T10:00:00.000Z",
  },
]

interface TeamStore {
  team: TeamMember[]
  addMember: (member: Omit<TeamMember, "id" | "createdAt">) => void
  updateMember: (id: string, member: Partial<TeamMember>) => void
  deleteMember: (id: string) => void
  toggleVisibility: (id: string) => void
}

export const useTeamStore = create<TeamStore>()(
  persist(
    (set) => ({
      team: mockTeam,
      addMember: (member) =>
        set((state) => ({
          team: [
            ...state.team,
            {
              ...member,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateMember: (id, updatedMember) =>
        set((state) => ({
          team: state.team.map((member) => (member.id === id ? { ...member, ...updatedMember } : member)),
        })),
      deleteMember: (id) =>
        set((state) => ({
          team: state.team.filter((member) => member.id !== id),
        })),
      toggleVisibility: (id) =>
        set((state) => ({
          team: state.team.map((member) => (member.id === id ? { ...member, visible: !member.visible } : member)),
        })),
    }),
    {
      name: "gdg-team-storage-v2",
    },
  ),
)

// Media Store
const mockMedia: MediaItem[] = [
  {
    id: "1",
    name: "GDG Event Banner",
    url: "/placeholder.svg?height=400&width=800",
    type: "image",
    size: 245000,
    category: "Events",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Team Photo 2024",
    url: "/placeholder.svg?height=600&width=800",
    type: "image",
    size: 512000,
    category: "Team",
    createdAt: new Date().toISOString(),
  },
]

interface MediaStore {
  media: MediaItem[]
  addMedia: (media: Omit<MediaItem, "id" | "createdAt">) => void
  updateMedia: (id: string, media: Partial<MediaItem>) => void
  deleteMedia: (id: string) => void
}

export const useMediaStore = create<MediaStore>()(
  persist(
    (set) => ({
      media: mockMedia,
      addMedia: (media) =>
        set((state) => ({
          media: [
            ...state.media,
            {
              ...media,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateMedia: (id, updatedMedia) =>
        set((state) => ({
          media: state.media.map((item) => (item.id === id ? { ...item, ...updatedMedia } : item)),
        })),
      deleteMedia: (id) =>
        set((state) => ({
          media: state.media.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "gdg-media-storage-v2",
    },
  ),
)
