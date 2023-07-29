import {
  Select,
  SelectIcon,
  SelectPortal,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select"
import { SelectContent, SelectItem } from "./ui/select"
import { Icons } from "./icons"
import { cn } from "@/lib/utils"

interface SelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder: string
  items: string[]
  onValueChange?(value: string): void
}

const Selector = ({
  placeholder,
  items,
  onValueChange,
  className,
}: SelectorProps) => {
  const ChevronDownIcon = Icons["chevronDown"]

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className={cn("select--trigger", className)}>
        <SelectValue placeholder={placeholder}></SelectValue>
        <SelectIcon>
          <ChevronDownIcon className="h-5 w-5 rounded-sm" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          {items.map((item, index) => (
            <SelectItem key={index} value={item.toLowerCase()}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}

interface SelectorLabeledProps extends SelectorProps {
  label: string
}
const SelectorLabeled = ({ label, ...props }: SelectorLabeledProps) => {
  return (
    <div className="flex flex-row items-center space-x-1">
      <div>{label}</div>
      <Selector {...props} />
    </div>
  )
}

export { Selector, SelectorLabeled }
