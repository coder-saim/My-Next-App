"use client"

import * as React from "react"
import { redirect, useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface InvitationProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Invitation({ className, ...props }: InvitationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const invitationCode = searchParams?.get("invitationCode")

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="flex  flex-row items-center justify-center gap-2 ">
        <button
          className={cn(buttonVariants(), "px-8")}
          onClick={() => {
            router.push(`/register?invitationCode=${invitationCode}`)
          }}
        >
          {"Join"}
        </button>
      </div>
    </div>
  )
}
