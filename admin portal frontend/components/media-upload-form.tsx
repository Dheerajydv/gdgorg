"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { MediaItem } from "@/lib/types"
import Image from "next/image"

interface MediaUploadFormProps {
  media?: MediaItem
  onSubmit: (media: Omit<MediaItem, "id" | "createdAt">) => void
  onCancel: () => void
}

export function MediaUploadForm({ media, onSubmit, onCancel }: MediaUploadFormProps) {
  const [formData, setFormData] = useState({
    name: media?.name || "",
    url: media?.url || "",
    type: media?.type || ("image" as MediaItem["type"]),
    size: media?.size || 0,
    category: media?.category || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-bold uppercase">
            File Name *
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
          <Label htmlFor="category" className="text-sm font-bold uppercase">
            Category *
          </Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger className="rounded-none border-2">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="Events">Events</SelectItem>
              <SelectItem value="Team">Team</SelectItem>
              <SelectItem value="Sponsors">Sponsors</SelectItem>
              <SelectItem value="Branding">Branding</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="type" className="text-sm font-bold uppercase">
            File Type *
          </Label>
          <Select
            value={formData.type}
            onValueChange={(value: MediaItem["type"]) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger className="rounded-none border-2">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="document">Document</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="size" className="text-sm font-bold uppercase">
            File Size (bytes) *
          </Label>
          <Input
            id="size"
            type="number"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: Number.parseInt(e.target.value) })}
            required
            className="rounded-none border-2"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url" className="text-sm font-bold uppercase">
          File URL *
        </Label>
        <Input
          id="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder="/media-file.png"
          required
          className="rounded-none border-2"
        />
        {formData.url && formData.type === "image" && (
          <div className="mt-2 border-2 border-border p-4">
            <Image
              src={formData.url || "/placeholder.svg"}
              alt="Preview"
              width={300}
              height={200}
              className="h-auto w-full max-w-md object-contain"
            />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="rounded-none bg-[#4285F4] hover:bg-[#357ae8]">
          {media ? "Update Media" : "Add Media"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="rounded-none border-2 bg-transparent">
          Cancel
        </Button>
      </div>
    </form>
  )
}
