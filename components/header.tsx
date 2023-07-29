import { cn } from "@/lib/utils"

interface DashboardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({
  heading,
  text,
  className,
  children,
}: DashboardHeaderProps) {
  return (
    <div className={cn("flex justify-between px-2", className)}>
      <div className="grid gap-1">
        <h1 className="text-xl font-bold text-slate-900">{heading}</h1>
        {text && (
          <p className="text-base font-normal text-neutral-500">{text}</p>
        )}
      </div>
      {children}
    </div>
  )
}
