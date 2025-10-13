"use client"

import { useState } from "react"
import { useSponsorStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react"
import { SponsorForm } from "@/components/sponsor-form"
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal"
import type { Sponsor } from "@/lib/types"
import Image from "next/image"

const tierColors = {
  Platinum: "bg-[#E5E4E2] text-gray-800",
  Gold: "bg-[#FFD700] text-gray-800",
  Silver: "bg-[#C0C0C0] text-gray-800",
  Bronze: "bg-[#CD7F32] text-white",
}

export default function SponsorsPage() {
  const { sponsors, addSponsor, updateSponsor, deleteSponsor } = useSponsorStore()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [sponsorToDelete, setSponsorToDelete] = useState<string | null>(null)

  const handleSubmit = (sponsorData: Omit<Sponsor, "id" | "createdAt">) => {
    if (editingSponsor) {
      updateSponsor(editingSponsor.id, sponsorData)
    } else {
      addSponsor(sponsorData)
    }
    setIsFormOpen(false)
    setEditingSponsor(null)
  }

  const handleEdit = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor)
    setIsFormOpen(true)
  }

  const handleDelete = (id: string) => {
    setSponsorToDelete(id)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (sponsorToDelete) {
      deleteSponsor(sponsorToDelete)
      setSponsorToDelete(null)
    }
  }

  if (isFormOpen) {
    return (
      <div className="space-y-6">
        <div className="border-b border-border pb-4">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground">
            {editingSponsor ? "Edit Sponsor" : "Add New Sponsor"}
          </h1>
        </div>
        <div className="border-2 border-border bg-card p-6">
          <SponsorForm
            sponsor={editingSponsor || undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsFormOpen(false)
              setEditingSponsor(null)
            }}
          />
        </div>
      </div>
    )
  }

  // Group sponsors by tier
  const sponsorsByTier = sponsors.reduce(
    (acc, sponsor) => {
      if (!acc[sponsor.tier]) acc[sponsor.tier] = []
      acc[sponsor.tier].push(sponsor)
      return acc
    },
    {} as Record<Sponsor["tier"], Sponsor[]>,
  )

  const tierOrder: Sponsor["tier"][] = ["Platinum", "Gold", "Silver", "Bronze"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground">Sponsor Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your GDG sponsors and partnerships</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="rounded-none bg-[#4285F4] hover:bg-[#357ae8]">
          <Plus className="mr-2 h-4 w-4" />
          Add Sponsor
        </Button>
      </div>

      {tierOrder.map((tier) => {
        const tierSponsors = sponsorsByTier[tier] || []
        if (tierSponsors.length === 0) return null

        return (
          <div key={tier} className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold uppercase tracking-tight text-foreground">{tier} Tier</h2>
              <span className={`px-3 py-1 text-xs font-bold uppercase ${tierColors[tier]}`}>
                {tierSponsors.length} {tierSponsors.length === 1 ? "Sponsor" : "Sponsors"}
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tierSponsors.map((sponsor) => (
                <div key={sponsor.id} className="border-2 border-border bg-card">
                  <div className="flex h-48 items-center justify-center border-b-2 border-border bg-white p-6">
                    <Image
                      src={sponsor.image || "/placeholder.svg"}
                      alt={sponsor.name}
                      width={200}
                      height={100}
                      className="h-auto w-full max-w-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <h3 className="font-bold uppercase text-foreground">{sponsor.name}</h3>
                        <span
                          className={`mt-1 inline-block px-2 py-1 text-xs font-bold uppercase ${tierColors[sponsor.tier]}`}
                        >
                          {sponsor.tier}
                        </span>
                      </div>
                    </div>
                    <a
                      href={sponsor.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-3 flex items-center gap-1 text-sm text-[#4285F4] hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Visit Website
                    </a>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(sponsor)}
                        className="flex-1 rounded-none border-2"
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(sponsor.id)}
                        className="rounded-none border-2 border-[#EA4335] text-[#EA4335] hover:bg-[#EA4335] hover:text-white"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {sponsors.length === 0 && (
        <div className="border-2 border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No sponsors yet. Add your first sponsor to get started.</p>
        </div>
      )}

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={confirmDelete}
        title="Delete Sponsor"
        description="Are you sure you want to delete this sponsor? This action cannot be undone."
      />
    </div>
  )
}
