import type React from "react"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: "blue" | "red" | "yellow" | "green"
  subtitle?: string
}

const colorClasses = {
  blue: "border-l-[#4285F4] bg-[#4285F4]/5",
  red: "border-l-[#EA4335] bg-[#EA4335]/5",
  yellow: "border-l-[#FBBC05] bg-[#FBBC05]/5",
  green: "border-l-[#34A853] bg-[#34A853]/5",
}

const iconColorClasses = {
  blue: "bg-[#4285F4] text-white",
  red: "bg-[#EA4335] text-white",
  yellow: "bg-[#FBBC05] text-white",
  green: "bg-[#34A853] text-white",
}

export function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
  return (
    <div className={`border-2 border-border border-l-4 ${colorClasses[color]} p-6`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center ${iconColorClasses[color]}`}>{icon}</div>
      </div>
    </div>
  )
}
