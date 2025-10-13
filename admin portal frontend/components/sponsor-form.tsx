"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Sponsor } from "@/lib/types"
import Image from "next/image"

interface SponsorFormProps {
  sponsor?: Sponsor
  onSubmit: (sponsor: Omit<Sponsor, "id" | "createdAt">) => void
  onCancel: () => void
}

export function SponsorForm({ sponsor, onSubmit, onCancel }: SponsorFormProps) {
  const [formData, setFormData] = useState({
    name: sponsor?.name || "",
    image: sponsor?.image || "",
    tier: sponsor?.tier || ("Gold" as Sponsor["tier"]),
    link: sponsor?.link || "",
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
            Sponsor Name *
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
          <Label htmlFor="tier" className="text-sm font-bold uppercase">
            Tier *
          </Label>
          <Select
            value={formData.tier}
            onValueChange={(value: Sponsor["tier"]) => setFormData({ ...formData, tier: value })}
          >
            <SelectTrigger className="rounded-none border-2">
              <SelectValue placeholder="Select tier" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="Platinum">Platinum</SelectItem>
              <SelectItem value="Gold">Gold</SelectItem>
              <SelectItem value="Silver">Silver</SelectItem>
              <SelectItem value="Bronze">Bronze</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="link" className="text-sm font-bold uppercase">
          Website Link *
        </Label>
        <Input
          id="link"
          type="url"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          placeholder="https://example.com"
          required
          className="rounded-none border-2"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image" className="text-sm font-bold uppercase">
          Logo URL *
        </Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="/sponsor-logo.png"
          required
          className="rounded-none border-2"
        />
        {formData.image && (
          <div className="mt-2 border-2 border-border bg-white p-4">
            <Image
              src={formData.image || "/placeholder.svg"}
              alt="Preview"
              width={200}
              height={100}
              className="h-auto w-full max-w-xs object-contain"
            />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="rounded-none bg-[#4285F4] hover:bg-[#357ae8]">
          {sponsor ? "Update Sponsor" : "Add Sponsor"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="rounded-none border-2 bg-transparent">
          Cancel
        </Button>
      </div>
    </form>
  )
}
