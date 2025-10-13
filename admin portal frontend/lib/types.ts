export interface Event {
  id: string
  name: string
  type: string
  image: string
  location: string
  date: string
  time: string
  strength: number
  description: string
  published: boolean
  draft: boolean
  createdAt: string
}

export interface Sponsor {
  id: string
  name: string
  image: string
  tier: "Platinum" | "Gold" | "Silver" | "Bronze"
  link: string
  createdAt: string
}

export interface TeamMember {
  id: string
  name: string
  image: string
  linkedin: string
  github: string
  role:
    | "Lead"
    | "Co-Lead"
    | "Executive"
    | "Android Head"
    | "WebDev Head"
    | "AI/ML Head"
    | "CyberSec Head"
    | "UI/UX Head"
    | "CP/DSA Head"
  visible: boolean
  createdAt: string
}

export interface MediaItem {
  id: string
  name: string
  url: string
  type: "image" | "video" | "document"
  size: number
  category: string
  createdAt: string
}
