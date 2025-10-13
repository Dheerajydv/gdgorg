"use client"

import { useState } from "react"
import { useEventStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Eye, EyeOff, FileText } from "lucide-react"
import { EventForm } from "@/components/event-form"
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal"
import type { Event } from "@/lib/types"
import Image from "next/image"

export default function EventsPage() {
  const { events, addEvent, updateEvent, deleteEvent, togglePublish } = useEventStore()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [eventToDelete, setEventToDelete] = useState<string | null>(null)
  const [showDrafts, setShowDrafts] = useState(false)

  const handleSubmit = (eventData: Omit<Event, "id" | "createdAt">) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, eventData)
    } else {
      addEvent(eventData)
    }
    setIsFormOpen(false)
    setEditingEvent(null)
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setIsFormOpen(true)
  }

  const handleDelete = (id: string) => {
    setEventToDelete(id)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (eventToDelete) {
      deleteEvent(eventToDelete)
      setEventToDelete(null)
    }
  }

  const filteredEvents = showDrafts ? events.filter((e) => e.draft) : events.filter((e) => !e.draft)

  if (isFormOpen) {
    return (
      <div className="space-y-6">
        <div className="border-b border-border pb-4">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground">
            {editingEvent ? "Edit Event" : "Create New Event"}
          </h1>
        </div>
        <div className="border-2 border-border bg-card p-6">
          <EventForm
            event={editingEvent || undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsFormOpen(false)
              setEditingEvent(null)
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground">Event Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your GDG events and workshops</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowDrafts(!showDrafts)} variant="outline" className="rounded-none border-2">
            <FileText className="mr-2 h-4 w-4" />
            {showDrafts ? "Show All Events" : "Show Drafts"}
          </Button>
          <Button onClick={() => setIsFormOpen(true)} className="rounded-none bg-[#4285F4] hover:bg-[#357ae8]">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <div key={event.id} className="border-2 border-border bg-card">
            <div className="relative h-48 w-full overflow-hidden">
              <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
              <div className="absolute right-2 top-2">
                <span
                  className={`px-3 py-1 text-xs font-bold uppercase ${
                    event.draft
                      ? "bg-[#FBBC05] text-gray-800"
                      : event.published
                        ? "bg-[#34A853] text-white"
                        : "bg-muted-foreground text-white"
                  }`}
                >
                  {event.draft ? "Draft" : event.published ? "Published" : "Unpublished"}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h3 className="font-bold uppercase text-foreground">{event.name}</h3>
                  <p className="text-xs text-muted-foreground">{event.type}</p>
                </div>
              </div>
              <div className="mb-3 space-y-1 text-sm text-muted-foreground">
                <p>📍 {event.location}</p>
                <p>
                  📅 {new Date(event.date).toLocaleDateString()} at {event.time}
                </p>
                <p>👥 {event.strength} attendees</p>
              </div>
              <p className="mb-4 line-clamp-2 text-sm text-foreground">{event.description}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => togglePublish(event.id)}
                  className="flex-1 rounded-none border-2"
                  disabled={event.draft}
                >
                  {event.published ? <EyeOff className="mr-1 h-3 w-3" /> : <Eye className="mr-1 h-3 w-3" />}
                  {event.published ? "Unpublish" : "Publish"}
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleEdit(event)} className="rounded-none border-2">
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(event.id)}
                  className="rounded-none border-2 border-[#EA4335] text-[#EA4335] hover:bg-[#EA4335] hover:text-white"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="border-2 border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            {showDrafts ? "No draft events yet." : "No events yet. Create your first event to get started."}
          </p>
        </div>
      )}

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={confirmDelete}
        title="Delete Event"
        description="Are you sure you want to delete this event? This action cannot be undone."
      />
    </div>
  )
}
