import { useState } from "react"
import { Icons } from "./icons"
import copyToClipboard from "@/utils/copy-to-clipboard"

interface CopyTextIconProps {
  text: string
}

export default function CopyTextIcon({ text }: CopyTextIconProps) {
  const [copied, setCopied] = useState(false)
  const CopyClipboardIcon = Icons["clipboardCopy"]
  const ClipboardCheckIcon = Icons["clipboardCheck"]

  return (
    <>
      {copied ? (
        <ClipboardCheckIcon className="ml-8 h-5 w-5 rounded-sm transition duration-100" />
      ) : (
        <CopyClipboardIcon
          className="ml-8 h-5 w-5 rounded-sm"
          onClick={() => {
            copyToClipboard(text)
            setCopied(true)
            setTimeout(() => {
              setCopied(false)
            }, 2000)
          }}
        />
      )}
    </>
  )
}
