"use client"

import { Search, Bell, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export function TopNavbar() {
  const { user } = useAuth()

  return (
    <div className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      {/* Search bar */}
      <div className="flex flex-1 items-center gap-4 max-w-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="rounded-none border-2 pl-10 focus:border-[#4285F4]" />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-none">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3 border-l border-border pl-4">
          <div className="flex h-8 w-8 items-center justify-center bg-[#4285F4] text-white">
            <User className="h-5 w-5" />
          </div>
          <div className="text-sm">
            <p className="font-bold uppercase">{user?.name}</p>
            
          </div>
        </div>
      </div>
    </div>
  )
}
