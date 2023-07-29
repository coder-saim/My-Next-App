"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"

interface Item {
  searchValues: string[]
  label: string
}

interface ComboboxProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  items: Item[]
  onItemSelect: (item: string) => void
  name?: string
  selectedValue: string
}

export function ComboSearchbox({
  items,
  onItemSelect,
  name = "option",
  className,
  selectedValue = "",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(selectedValue)
  React.useEffect(() => setValue(selectedValue), [selectedValue])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={className}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? items.find((option) => option.label === value)?.label
            : `Select ${name}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={cn("max-h-screen overflow-y-scroll p-0", className)}
      >
        <Command
          filter={(value: string, search: string) => {
            return value
              .split(" | ")
              .some((e) => e.toLowerCase().includes(search.toLowerCase()))
              ? 1
              : 0
          }}
        >
          <CommandInput placeholder={`Select ${name}...`} />
          <CommandEmpty>{`No ${name} found...`}</CommandEmpty>
          <CommandGroup>
            {items.map((option) => (
              <CommandItem
                key={option.label}
                value={option.searchValues.join(" | ")}
                onSelect={() => {
                  setValue(option.label === value ? "" : option.label)
                  setOpen(false)
                  onItemSelect(option.label === value ? "" : option.label)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.label ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
