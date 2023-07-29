import { useState } from "react"
import { Icons } from "./icons"
import CopyTextIcon from "./copy-text-icon"

interface SecureTextProps {
  secureText: string
}

export function SecureTextComponent({ secureText }: SecureTextProps) {
  const [visible, setVisible] = useState(false)
  const Eye = Icons["eye"]
  const EyeOff = Icons["eyeOff"]

  return (
    <div className="flex items-center">
      <span className="px-4 text-center md:w-96">
        {visible
          ? secureText
          : Array(Math.floor(secureText.length * 1.2)).join("*")}
      </span>
      <CopyTextIcon text={secureText} />

      {visible ? (
        <EyeOff
          className="ml-2 h-5 w-5 cursor-pointer rounded-sm"
          onClick={() => setVisible(false)}
        />
      ) : (
        <Eye
          className="ml-2 h-5 w-5 cursor-pointer rounded-sm"
          onClick={() => setVisible(true)}
        />
      )}
    </div>
  )
}
