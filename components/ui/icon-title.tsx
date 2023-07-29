import { cn } from "@/lib/utils"
import { Icons } from "../icons"

interface IconTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  iconName: string
}

export function IconTitle({ title, iconName, className }: IconTitleProps) {
  const Icon = Icons[`${iconName}`]
  return (
    <div className="flex items-center space-x-2 font-medium">
      <Icon className={cn("h-5 w-5 rounded-sm", className)} />
      <div className="text-slate-500">{title}</div>
    </div>
  )
}
