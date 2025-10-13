"use client"

import { useState } from "react"
import { useTeamStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Eye, EyeOff, Linkedin, Github } from "lucide-react"
import { TeamForm } from "@/components/team-form"
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal"
import type { TeamMember } from "@/lib/types"
import Image from "next/image"

const roleColors = {
  Lead: "bg-[#4285F4] text-white",
  "Co-Lead": "bg-[#4285F4] text-white",
  Executive: "bg-[#34A853] text-white",
  "Android Head": "bg-[#EA4335] text-white",
  "WebDev Head": "bg-[#FBBC05] text-gray-800",
  "AI/ML Head": "bg-[#EA4335] text-white",
  "CyberSec Head": "bg-[#34A853] text-white",
  "UI/UX Head": "bg-[#FBBC05] text-gray-800",
  "CP/DSA Head": "bg-[#4285F4] text-white",
}

export default function TeamPage() {
  const { team, addMember, updateMember, deleteMember, toggleVisibility } = useTeamStore()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null)

  const handleSubmit = (memberData: Omit<TeamMember, "id" | "createdAt">) => {
    if (editingMember) {
      updateMember(editingMember.id, memberData)
    } else {
      addMember(memberData)
    }
    setIsFormOpen(false)
    setEditingMember(null)
  }

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setIsFormOpen(true)
  }

  const handleDelete = (id: string) => {
    setMemberToDelete(id)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (memberToDelete) {
      deleteMember(memberToDelete)
      setMemberToDelete(null)
    }
  }

  if (isFormOpen) {
    return (
      <div className="space-y-6">
        <div className="border-b border-border pb-4">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground">
            {editingMember ? "Edit Team Member" : "Add New Team Member"}
          </h1>
        </div>
        <div className="border-2 border-border bg-card p-6">
          <TeamForm
            member={editingMember || undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsFormOpen(false)
              setEditingMember(null)
            }}
          />
        </div>
      </div>
    )
  }

  // Group team by role hierarchy
  const roleOrder: TeamMember["role"][] = [
    "Lead",
    "Co-Lead",
    "Executive",
    "Android Head",
    "WebDev Head",
    "AI/ML Head",
    "CyberSec Head",
    "UI/UX Head",
    "CP/DSA Head",
  ]

  const teamByRole = team.reduce(
    (acc, member) => {
      if (!acc[member.role]) acc[member.role] = []
      acc[member.role].push(member)
      return acc
    },
    {} as Record<TeamMember["role"], TeamMember[]>,
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground">Team Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your GDG team members and leadership</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="rounded-none bg-[#4285F4] hover:bg-[#357ae8]">
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      {roleOrder.map((role) => {
        const roleMembers = teamByRole[role] || []
        if (roleMembers.length === 0) return null

        return (
          <div key={role} className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold uppercase tracking-tight text-foreground">{role}</h2>
              <span className={`px-3 py-1 text-xs font-bold uppercase ${roleColors[role]}`}>
                {roleMembers.length} {roleMembers.length === 1 ? "Member" : "Members"}
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {roleMembers.map((member) => (
                <div key={member.id} className="border-2 border-border bg-card">
                  <div className="relative">
                    <div className="h-48 w-full overflow-hidden bg-muted">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute right-2 top-2">
                      <span
                        className={`px-2 py-1 text-xs font-bold uppercase ${
                          member.visible ? "bg-[#34A853] text-white" : "bg-muted-foreground text-white"
                        }`}
                      >
                        {member.visible ? "Visible" : "Hidden"}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold uppercase text-foreground">{member.name}</h3>
                    <span
                      className={`mt-1 inline-block px-2 py-1 text-xs font-bold uppercase ${roleColors[member.role]}`}
                    >
                      {member.role}
                    </span>
                    <div className="mt-3 flex gap-2">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center border-2 border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4] hover:text-white"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center border-2 border-foreground text-foreground hover:bg-foreground hover:text-background"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleVisibility(member.id)}
                        className="flex-1 rounded-none border-2"
                      >
                        {member.visible ? <EyeOff className="mr-1 h-3 w-3" /> : <Eye className="mr-1 h-3 w-3" />}
                        {member.visible ? "Hide" : "Show"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(member)}
                        className="rounded-none border-2"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(member.id)}
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

      {team.length === 0 && (
        <div className="border-2 border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No team members yet. Add your first team member to get started.</p>
        </div>
      )}

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={confirmDelete}
        title="Delete Team Member"
        description="Are you sure you want to delete this team member? This action cannot be undone."
      />
    </div>
  )
}
