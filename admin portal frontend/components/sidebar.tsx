"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Calendar, Users, Award, ImageIcon, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Image from "next/image"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["Super Admin", "Event Manager", "Sponsor Manager", "Team Manager"],
  },
  { name: "Events", href: "/dashboard/events", icon: Calendar, roles: ["Super Admin", "Event Manager"] },
  { name: "Sponsors", href: "/dashboard/sponsors", icon: Award, roles: ["Super Admin", "Sponsor Manager"] },
  { name: "Team", href: "/dashboard/team", icon: Users, roles: ["Super Admin", "Team Manager"] },
  {
    name: "Media Library",
    href: "/dashboard/media",
    icon: ImageIcon,
    roles: ["Super Admin", "Event Manager", "Sponsor Manager", "Team Manager"],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const filteredNavigation = navigation.filter((item) => user && item.roles.includes(user.role))

  return (
    <div className="flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <Image src="/gdg-logo.png" alt="GDG Logo" width={40} height={40} className="h-10 w-10" />
        <span className="text-sm font-bold uppercase tracking-tight text-sidebar-foreground">GDG Admin</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-[#4285F4]"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="uppercase tracking-wide">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* User info and logout */}
      <div className="border-t border-sidebar-border p-4">
        <div className="mb-3 px-4">
          <p className="text-xs font-bold uppercase text-sidebar-foreground">{user?.name}</p>
          
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="h-5 w-5" />
          <span className="uppercase tracking-wide">Logout</span>
        </button>
      </div>
    </div>
  )
}
