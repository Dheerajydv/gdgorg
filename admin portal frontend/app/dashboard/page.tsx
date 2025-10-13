"use client"

import { StatCard } from "@/components/stat-card"
import { Calendar, Award, Users, ImageIcon } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useEventStore, useSponsorStore, useTeamStore, useMediaStore } from "@/lib/store"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  const { events } = useEventStore()
  const { sponsors } = useSponsorStore()
  const { team } = useTeamStore()
  const { media } = useMediaStore()

  const stats = {
    totalEvents: events.length,
    publishedEvents: events.filter((e) => e.published).length,
    totalSponsors: sponsors.length,
    teamMembers: team.length,
    mediaFiles: media.length,
  }

  const recentEvents = [...events]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back, {user?.name}. Here's what's happening with your GDG chapter.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Events"
          value={stats.totalEvents}
          subtitle={`${stats.publishedEvents} published`}
          icon={<Calendar className="h-6 w-6" />}
          color="blue"
        />
        <StatCard
          title="Sponsors"
          value={stats.totalSponsors}
          subtitle="Active partnerships"
          icon={<Award className="h-6 w-6" />}
          color="red"
        />
        <StatCard
          title="Team Members"
          value={stats.teamMembers}
          subtitle="Active members"
          icon={<Users className="h-6 w-6" />}
          color="yellow"
        />
        <StatCard
          title="Media Files"
          value={stats.mediaFiles}
          subtitle="Images & assets"
          icon={<ImageIcon className="h-6 w-6" />}
          color="green"
        />
      </div>

      {/* Recent activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="border-2 border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold uppercase tracking-tight text-foreground">Recent Events</h2>
          {recentEvents.length > 0 ? (
            <div className="space-y-3">
              {recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between border-l-4 border-[#4285F4] bg-muted p-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{event.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-bold uppercase ${
                      event.published ? "bg-[#34A853] text-white" : "bg-muted-foreground text-white"
                    }`}
                  >
                    {event.published ? "Published" : "Draft"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No events yet. Create your first event to get started.</p>
          )}
        </div>

        <div className="border-2 border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold uppercase tracking-tight text-foreground">Quick Actions</h2>
          <div className="grid gap-3">
            <button
              onClick={() => router.push("/dashboard/events")}
              className="border-2 border-[#4285F4] bg-[#4285F4]/5 p-4 text-left transition-colors hover:bg-[#4285F4]/10"
            >
              <p className="font-bold uppercase text-foreground">Create New Event</p>
              <p className="text-xs text-muted-foreground">Add a new event to your calendar</p>
            </button>
            <button
              onClick={() => router.push("/dashboard/sponsors")}
              className="border-2 border-[#EA4335] bg-[#EA4335]/5 p-4 text-left transition-colors hover:bg-[#EA4335]/10"
            >
              <p className="font-bold uppercase text-foreground">Add Sponsor</p>
              <p className="text-xs text-muted-foreground">Register a new sponsor partnership</p>
            </button>
            <button
              onClick={() => router.push("/dashboard/team")}
              className="border-2 border-[#FBBC05] bg-[#FBBC05]/5 p-4 text-left transition-colors hover:bg-[#FBBC05]/10"
            >
              <p className="font-bold uppercase text-foreground">Manage Team</p>
              <p className="text-xs text-muted-foreground">Add or update team members</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
