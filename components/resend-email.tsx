"use client"

import * as React from "react"
import { redirect, useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface ResendEmailProps extends React.HTMLAttributes<HTMLDivElement> {
  type: string
}

export function ResendEmail({ className, ...props }: ResendEmailProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const email = searchParams?.get("email")

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="flex  flex-row items-center justify-center gap-2 ">
        <button
          className={cn(buttonVariants(), "px-8")}
          onClick={() => {
            router.push(`/register?invitationCode=${email}`)
          }}
        >
          {"Resend email"}
        </button>
      </div>
    </div>
  )
}
