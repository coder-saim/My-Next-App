import { cn } from "@/lib/utils"
import getStatusColor from "@/utils/status"
import { useState } from "react"
import { Icons } from "./icons"
import copyToClipboard from "@/utils/copy-to-clipboard"

interface CopyClipboardProps {
  text?: string
  className?: string
}

export function CopyClipboard({ text, className }: CopyClipboardProps) {
  const [copied, setCopied] = useState(false)

  const CopyClipboardIcon = Icons["clipboardCopy"]
  const ClipboardCheckIcon = Icons["clipboardCheck"]

  return (
    <>
      {copied ? (
        <ClipboardCheckIcon
          className={cn(
            "h-5 w-5 rounded-sm transition duration-100 hover:bg-slate-200",
            className
          )}
        />
      ) : (
        <button
          onClick={() => {
            copyToClipboard(text)
            setCopied(true)
            setTimeout(() => {
              setCopied(false)
            }, 2000)
          }}
        >
          <CopyClipboardIcon
            className={cn("h-5 w-5 rounded-sm hover:bg-slate-200", className)}
          />
        </button>
      )}
    </>
  )
}
