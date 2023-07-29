import * as React from "react"

import { cn } from "@/lib/utils"

interface OutlineProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
}

export function Outline({
  title,
  description,
  className,
  children,
  ...props
}: OutlineProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start rounded-md border border-solid p-8 text-center animate-in fade-in-50",
        className
      )}
    >
      {title && <h2 className={cn("text-xl font-semibold")}>{title}</h2>}
      {description && (
        <p
          className={cn(
            "mb-8 mt-3 text-center text-sm font-normal leading-6 text-slate-700"
          )}
        >
          {description}
        </p>
      )}

      {children}
    </div>
  )
}
