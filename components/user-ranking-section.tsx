import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface TableSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
}

export function TableSection({
  title,
  description,
  className,
  children,
  ...props
}: TableSectionProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start rounded-md border border-solid px-8 pb-8 pt-4 text-center animate-in fade-in-50",
        className
      )}
    >
      <h2 className={cn("text-xl font-semibold")}>{title}</h2>
      <p
        className={cn(
          "mb-5 mt-3 text-center text-base font-normal leading-6 text-slate-900"
        )}
      >
        {description}
      </p>
      {children}
    </div>
  )
}
