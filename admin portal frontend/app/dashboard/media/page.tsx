"use client"

import { useState } from "react"
import { useMediaStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Copy, Search, ImageIcon, Video, FileText } from "lucide-react"
import { MediaUploadForm } from "@/components/media-upload-form"
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal"
import type { MediaItem } from "@/lib/types"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

const typeIcons = {
  image: ImageIcon,
  video: Video,
  document: FileText,
}

const categoryColors = {
  Events: "bg-[#4285F4] text-white",
  Team: "bg-[#34A853] text-white",
  Sponsors: "bg-[#FBBC05] text-gray-800",
  Branding: "bg-[#EA4335] text-white",
  Other: "bg-muted-foreground text-white",
}

export default function MediaPage() {
  const { media, addMedia, updateMedia, deleteMedia } = useMediaStore()
  const { toast } = useToast()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [mediaToDelete, setMediaToDelete] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("All")

  const handleSubmit = (mediaData: Omit<MediaItem, "id" | "createdAt">) => {
    if (editingMedia) {
      updateMedia(editingMedia.id, mediaData)
    } else {
      addMedia(mediaData)
    }
    setIsFormOpen(false)
    setEditingMedia(null)
  }

  const handleEdit = (item: MediaItem) => {
    setEditingMedia(item)
    setIsFormOpen(true)
  }

  const handleDelete = (id: string) => {
    setMediaToDelete(id)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (mediaToDelete) {
      deleteMedia(mediaToDelete)
      setMediaToDelete(null)
    }
  }

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: "Copied!",
        description: "Media URL has been copied to your clipboard.",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy URL to clipboard.",
        variant: "destructive",
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  // Filter media
  const filteredMedia = media.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "All" || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(media.map((item) => item.category)))]

  if (isFormOpen) {
    return (
      <div className="space-y-6">
        <div className="border-b border-border pb-4">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground">
            {editingMedia ? "Edit Media" : "Upload New Media"}
          </h1>
        </div>
        <div className="border-2 border-border bg-card p-6">
          <MediaUploadForm
            media={editingMedia || undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsFormOpen(false)
              setEditingMedia(null)
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
          <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground">Media Library</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your images, videos, and documents</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="rounded-none bg-[#4285F4] hover:bg-[#357ae8]">
          <Plus className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search media files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-none border-2 pl-10"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filterCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory(category)}
              className={`rounded-none border-2 ${
                filterCategory === category ? "bg-[#4285F4] hover:bg-[#357ae8]" : ""
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMedia.map((item) => {
          const Icon = typeIcons[item.type]
          return (
            <div key={item.id} className="border-2 border-border bg-card">
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                {item.type === "image" ? (
                  <Image src={item.url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Icon className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute right-2 top-2">
                  <span
                    className={`px-2 py-1 text-xs font-bold uppercase ${
                      categoryColors[item.category as keyof typeof categoryColors] || categoryColors.Other
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold uppercase text-foreground">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {item.type.toUpperCase()} • {formatFileSize(item.size)}
                    </p>
                  </div>
                </div>
                <div className="mb-3 rounded-none border-2 border-border bg-muted p-2">
                  <p className="truncate text-xs font-mono text-foreground">{item.url}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(item.url)}
                    className="flex-1 rounded-none border-2"
                  >
                    <Copy className="mr-1 h-3 w-3" />
                    Copy URL
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(item)}
                    className="rounded-none border-2"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(item.id)}
                    className="rounded-none border-2 border-[#EA4335] text-[#EA4335] hover:bg-[#EA4335] hover:text-white"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredMedia.length === 0 && (
        <div className="border-2 border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            {searchQuery || filterCategory !== "All"
              ? "No media files match your search criteria."
              : "No media files yet. Upload your first file to get started."}
          </p>
        </div>
      )}

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={confirmDelete}
        title="Delete Media"
        description="Are you sure you want to delete this media file? This action cannot be undone."
      />
    </div>
  )
}
