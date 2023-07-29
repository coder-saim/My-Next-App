import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { UserAuthForm } from "@/components/user-auth-form"
import { Invitation } from "@/components/invitation"
import { ResendEmail } from "@/components/resend-email"
import { redirect, useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "./icons"
import ShapedLogo from "./shaped-logo"

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Please verify your email",
}

interface TitleButtonSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle: string
  buttonText: string
  isLoading: boolean
  onButtonClick: () => void
}

export default function TitleButtonSection({
  title,
  subtitle,
  buttonText,
  isLoading,
  onButtonClick,
}: TitleButtonSectionProps) {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <ShapedLogo />
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>

        <div className={cn("grid gap-6")}>
          <div className="flex  flex-row items-center justify-center gap-2 ">
            <button
              className={cn(buttonVariants(), "px-8")}
              onClick={onButtonClick}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
