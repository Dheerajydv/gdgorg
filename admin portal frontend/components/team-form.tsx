"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TeamMember } from "@/lib/types"
import Image from "next/image"

interface TeamFormProps {
  member?: TeamMember
  onSubmit: (member: Omit<TeamMember, "id" | "createdAt">) => void
  onCancel: () => void
}

export function TeamForm({ member, onSubmit, onCancel }: TeamFormProps) {
  const [formData, setFormData] = useState({
    name: member?.name || "",
    image: member?.image || "",
    linkedin: member?.linkedin || "",
    github: member?.github || "",
    role: member?.role || ("Executive" as TeamMember["role"]),
    visible: member?.visible ?? true,
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
            Full Name *
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
          <Label htmlFor="role" className="text-sm font-bold uppercase">
            Role *
          </Label>
          <Select
            value={formData.role}
            onValueChange={(value: TeamMember["role"]) => setFormData({ ...formData, role: value })}
          >
            <SelectTrigger className="rounded-none border-2">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="Lead">Lead</SelectItem>
              <SelectItem value="Co-Lead">Co-Lead</SelectItem>
              <SelectItem value="Executive">Executive</SelectItem>
              <SelectItem value="Android Head">Android Head</SelectItem>
              <SelectItem value="WebDev Head">WebDev Head</SelectItem>
              <SelectItem value="AI/ML Head">AI/ML Head</SelectItem>
              <SelectItem value="CyberSec Head">CyberSec Head</SelectItem>
              <SelectItem value="UI/UX Head">UI/UX Head</SelectItem>
              <SelectItem value="CP/DSA Head">CP/DSA Head</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="text-sm font-bold uppercase">
            LinkedIn URL *
          </Label>
          <Input
            id="linkedin"
            type="url"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            placeholder="https://linkedin.com/in/username"
            required
            className="rounded-none border-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github" className="text-sm font-bold uppercase">
            GitHub URL *
          </Label>
          <Input
            id="github"
            type="url"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            placeholder="https://github.com/username"
            required
            className="rounded-none border-2"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image" className="text-sm font-bold uppercase">
          Profile Image URL *
        </Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="/team-member.png"
          required
          className="rounded-none border-2"
        />
        {formData.image && (
          <div className="mt-2 border-2 border-border p-4">
            <Image
              src={formData.image || "/placeholder.svg"}
              alt="Preview"
              width={150}
              height={150}
              className="h-auto w-full max-w-[150px] object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="visible"
          checked={formData.visible}
          onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
          className="h-4 w-4 rounded-none border-2"
        />
        <Label htmlFor="visible" className="text-sm font-bold uppercase">
          Show on Public Website
        </Label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="rounded-none bg-[#4285F4] hover:bg-[#357ae8]">
          {member ? "Update Member" : "Add Member"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="rounded-none border-2 bg-transparent">
          Cancel
        </Button>
      </div>
    </form>
  )
}
