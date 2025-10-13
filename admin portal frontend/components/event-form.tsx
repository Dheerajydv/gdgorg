"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Event } from "@/lib/types"
import Image from "next/image"

interface EventFormProps {
  event?: Event
  onSubmit: (event: Omit<Event, "id" | "createdAt">) => void
  onCancel: () => void
}

export function EventForm({ event, onSubmit, onCancel }: EventFormProps) {
  const [formData, setFormData] = useState({
    name: event?.name || "",
    type: event?.type || "",
    image: event?.image || "",
    location: event?.location || "",
    date: event?.date || "",
    time: event?.time || "",
    strength: event?.strength || 0,
    description: event?.description || "",
    published: event?.published || false,
    draft: event?.draft || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleSaveAsDraft = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...formData, draft: true, published: false })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-bold uppercase">
            Event Name *
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="rounded-none border-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type" className="text-sm font-bold uppercase">
            Event Type *
          </Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger className="rounded-none border-2">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="Workshop">Workshop</SelectItem>
              <SelectItem value="Study Jam">Study Jam</SelectItem>
              <SelectItem value="Meetup">Meetup</SelectItem>
              <SelectItem value="Conference">Conference</SelectItem>
              <SelectItem value="Hackathon">Hackathon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-bold uppercase">
            Location *
          </Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
            className="rounded-none border-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="strength" className="text-sm font-bold uppercase">
            Expected Strength *
          </Label>
          <Input
            id="strength"
            type="number"
            value={formData.strength}
            onChange={(e) => setFormData({ ...formData, strength: Number.parseInt(e.target.value) })}
            required
            className="rounded-none border-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="text-sm font-bold uppercase">
            Date *
          </Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            className="rounded-none border-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="text-sm font-bold uppercase">
            Time *
          </Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
            className="rounded-none border-2"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image" className="text-sm font-bold uppercase">
          Image URL *
        </Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="/community-event.png"
          required
          className="rounded-none border-2"
        />
        {formData.image && (
          <div className="mt-2 border-2 border-border p-2">
            <Image
              src={formData.image || "/placeholder.svg"}
              alt="Preview"
              width={200}
              height={120}
              className="h-auto w-full max-w-xs"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-bold uppercase">
          Description *
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={4}
          className="rounded-none border-2"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
          className="h-4 w-4 rounded-none border-2"
        />
        <Label htmlFor="published" className="text-sm font-bold uppercase">
          Publish Event
        </Label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="rounded-none bg-[#4285F4] hover:bg-[#357ae8]">
          {event ? "Update Event" : "Create Event"}
        </Button>
        <Button
          type="button"
          onClick={handleSaveAsDraft}
          className="rounded-none bg-[#FBBC05] text-gray-800 hover:bg-[#f9ab00]"
        >
          Save as Draft
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="rounded-none border-2 bg-transparent">
          Cancel
        </Button>
      </div>
    </form>
  )
}
