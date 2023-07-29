"use client"
import { cn, convertTitleCase } from "@/lib/utils"
import getStatusColor from "@/utils/status"

interface StatusChipProps {
  status: string
  className?: string
}

export function StatusChip({ status, className }: StatusChipProps) {
  let statusColor = getStatusColor(status)

  return (
    <div className="flex">
      <span
        className={cn(
          "text rounded-2xl px-3 py-1 text-xs font-medium",
          statusColor.textColor,
          statusColor.backgroundColor,
          className
        )}
      >
        {convertTitleCase(status)}
      </span>
    </div>
  )
}
