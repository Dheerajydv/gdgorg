"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Save, Mail, Globe, Users } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [generalSettings, setGeneralSettings] = useState({
    chapterName: "GDG on Campus - University Name",
    email: "gdg@university.edu",
    website: "https://gdg.university.edu",
    location: "University Campus, City, Country",
    description:
      "Google Developer Groups on Campus is a university-based community group for students interested in Google developer technologies.",
  })

  const [socialLinks, setSocialLinks] = useState({
    twitter: "https://twitter.com/gdgoncampus",
    linkedin: "https://linkedin.com/company/gdgoncampus",
    instagram: "https://instagram.com/gdgoncampus",
    youtube: "https://youtube.com/@gdgoncampus",
    discord: "https://discord.gg/gdgoncampus",
  })

  const [adminSettings, setAdminSettings] = useState({
    adminEmail: "admin@university.edu",
    notificationsEnabled: true,
    maintenanceMode: false,
  })

  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "General settings have been updated successfully.",
    })
  }

  const handleSaveSocial = () => {
    toast({
      title: "Settings saved",
      description: "Social media links have been updated successfully.",
    })
  }

  const handleSaveAdmin = () => {
    toast({
      title: "Settings saved",
      description: "Admin settings have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your GDG chapter configuration and preferences</p>
      </div>

      {/* General Settings */}
      <div className="border-2 border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
          <div className="flex h-10 w-10 items-center justify-center border-2 border-[#4285F4] bg-[#4285F4]">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-tight text-foreground">General Settings</h2>
            <p className="text-sm text-muted-foreground">Basic information about your GDG chapter</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="chapterName" className="text-sm font-bold uppercase">
              Chapter Name
            </Label>
            <Input
              id="chapterName"
              value={generalSettings.chapterName}
              onChange={(e) => setGeneralSettings({ ...generalSettings, chapterName: e.target.value })}
              className="rounded-none border-2"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold uppercase">
                Contact Email
              </Label>
              <Input
                id="email"
                type="email"
                value={generalSettings.email}
                onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                className="rounded-none border-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm font-bold uppercase">
                Website URL
              </Label>
              <Input
                id="website"
                type="url"
                value={generalSettings.website}
                onChange={(e) => setGeneralSettings({ ...generalSettings, website: e.target.value })}
                className="rounded-none border-2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-bold uppercase">
              Location
            </Label>
            <Input
              id="location"
              value={generalSettings.location}
              onChange={(e) => setGeneralSettings({ ...generalSettings, location: e.target.value })}
              className="rounded-none border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-bold uppercase">
              Chapter Description
            </Label>
            <Textarea
              id="description"
              value={generalSettings.description}
              onChange={(e) => setGeneralSettings({ ...generalSettings, description: e.target.value })}
              rows={4}
              className="rounded-none border-2"
            />
          </div>

          <Button onClick={handleSaveGeneral} className="rounded-none bg-[#4285F4] hover:bg-[#357ae8]">
            <Save className="mr-2 h-4 w-4" />
            Save General Settings
          </Button>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="border-2 border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
          <div className="flex h-10 w-10 items-center justify-center border-2 border-[#34A853] bg-[#34A853]">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-tight text-foreground">Social Media Links</h2>
            <p className="text-sm text-muted-foreground">Connect your social media profiles</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="twitter" className="text-sm font-bold uppercase">
                Twitter / X
              </Label>
              <Input
                id="twitter"
                type="url"
                value={socialLinks.twitter}
                onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                className="rounded-none border-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-sm font-bold uppercase">
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                type="url"
                value={socialLinks.linkedin}
                onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                className="rounded-none border-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-sm font-bold uppercase">
                Instagram
              </Label>
              <Input
                id="instagram"
                type="url"
                value={socialLinks.instagram}
                onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                className="rounded-none border-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtube" className="text-sm font-bold uppercase">
                YouTube
              </Label>
              <Input
                id="youtube"
                type="url"
                value={socialLinks.youtube}
                onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                className="rounded-none border-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discord" className="text-sm font-bold uppercase">
                Discord
              </Label>
              <Input
                id="discord"
                type="url"
                value={socialLinks.discord}
                onChange={(e) => setSocialLinks({ ...socialLinks, discord: e.target.value })}
                className="rounded-none border-2"
              />
            </div>
          </div>

          <Button onClick={handleSaveSocial} className="rounded-none bg-[#34A853] hover:bg-[#2d8e47]">
            <Save className="mr-2 h-4 w-4" />
            Save Social Links
          </Button>
        </div>
      </div>

      {/* Admin Settings */}
      <div className="border-2 border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
          <div className="flex h-10 w-10 items-center justify-center border-2 border-[#EA4335] bg-[#EA4335]">
            <Mail className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-tight text-foreground">Admin Settings</h2>
            <p className="text-sm text-muted-foreground">Configure admin preferences and notifications</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="adminEmail" className="text-sm font-bold uppercase">
              Admin Email
            </Label>
            <Input
              id="adminEmail"
              type="email"
              value={adminSettings.adminEmail}
              onChange={(e) => setAdminSettings({ ...adminSettings, adminEmail: e.target.value })}
              className="rounded-none border-2"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="notifications"
                checked={adminSettings.notificationsEnabled}
                onChange={(e) => setAdminSettings({ ...adminSettings, notificationsEnabled: e.target.checked })}
                className="h-4 w-4 rounded-none border-2"
              />
              <div>
                <Label htmlFor="notifications" className="text-sm font-bold uppercase">
                  Enable Email Notifications
                </Label>
                <p className="text-xs text-muted-foreground">Receive notifications for new events and updates</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="maintenance"
                checked={adminSettings.maintenanceMode}
                onChange={(e) => setAdminSettings({ ...adminSettings, maintenanceMode: e.target.checked })}
                className="h-4 w-4 rounded-none border-2"
              />
              <div>
                <Label htmlFor="maintenance" className="text-sm font-bold uppercase">
                  Maintenance Mode
                </Label>
                <p className="text-xs text-muted-foreground">
                  Enable maintenance mode to temporarily disable public access
                </p>
              </div>
            </div>
          </div>

          <Button onClick={handleSaveAdmin} className="rounded-none bg-[#EA4335] hover:bg-[#d33426]">
            <Save className="mr-2 h-4 w-4" />
            Save Admin Settings
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border-2 border-[#EA4335] bg-card p-6">
        <div className="mb-6 border-b border-[#EA4335] pb-4">
          <h2 className="text-xl font-bold uppercase tracking-tight text-[#EA4335]">Danger Zone</h2>
          <p className="text-sm text-muted-foreground">Irreversible and destructive actions</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-2 border-border p-4">
            <div>
              <h3 className="font-bold uppercase text-foreground">Clear All Data</h3>
              <p className="text-sm text-muted-foreground">Remove all events, sponsors, team members, and media</p>
            </div>
            <Button variant="outline" className="rounded-none border-2 border-[#EA4335] text-[#EA4335] bg-transparent">
              Clear Data
            </Button>
          </div>

          <div className="flex items-center justify-between border-2 border-border p-4">
            <div>
              <h3 className="font-bold uppercase text-foreground">Export Data</h3>
              <p className="text-sm text-muted-foreground">Download all your data as JSON</p>
            </div>
            <Button variant="outline" className="rounded-none border-2 bg-transparent">
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
