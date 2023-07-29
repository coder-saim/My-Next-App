"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect } from "react"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  signInType: string
}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({
  signInType,
  className,
  ...props
}: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isOAuthLoading, setIsOAuthLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<String>()
  const searchParams = useSearchParams()
  const invitationCode = searchParams?.get("invitationCode")

  useEffect(() => {
    const callbackError = searchParams?.get("error")

    if (callbackError === "OAuthAccountNotLinked") {
      signInType == "login"
        ? setError("Use different provider for Sign in.")
        : setError("There is  already be an account with that email.")

      toast({
        title: "Error.",
        description: "There may already be an account with that email.",
        variant: "destructive",
      })
    }
  }, [searchParams, signInType])

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    setCookie("sign_in_type", signInType || "", 10 * 60)
    setCookie("invitationCode", invitationCode || "", 10 * 60)

    console.log(`Searchparams get form - ${searchParams?.get("from")}`)
    const email = data.email.toLowerCase()

    const signInResult = await signIn("email", {
      email: email,
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/dashboard/home",
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      })
    }

    if (signInResult?.error) {
      return toast({
        title: "Error",
        description: signInResult?.error,
      })
    }

    toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    })

    signInType == "login"
      ? router.push(`/login/verify-email?email=${email}`)
      : router.push(`/register/verify-email?email=${email}`)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="font-medium" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isOAuthLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {signInType == "login" ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-600" />
        </div>
        <div className="relative flex justify-center text-xs lowercase">
          <span className="bg-white px-2 text-black">Or</span>
        </div>
      </div>
      <div className="grid gap-2">
        <button
          type="button"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "border-gray-700"
          )}
          onClick={() => {
            setCookie("sign_in_type", signInType || "", 10 * 60)
            setCookie("invitationCode", invitationCode || "", 10 * 60)
            setIsOAuthLoading(true)
            signIn("github", {
              redirect: false,
              callbackUrl: searchParams?.get("from") || "/dashboard/home",
            })
          }}
          disabled={isLoading || isOAuthLoading}
        >
          {isOAuthLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          Continue with Github
        </button>
        <button
          type="button"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "border-gray-700"
          )}
          onClick={() => {
            setCookie("sign_in_type", signInType || "", 10 * 60)
            setCookie("invitationCode", invitationCode || "", 10 * 60)
            setIsOAuthLoading(true)
            signIn("google", {
              redirect: false,
              callbackUrl: searchParams?.get("from") || "/dashboard/home",
              invitationCode: invitationCode,
            })
          }}
          disabled={isLoading || isOAuthLoading}
        >
          {isOAuthLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Continue with Google
        </button>
      </div>
      {error && <p className="text-center text-sm text-red-700">{error}</p>}
    </div>
  )
}

function setCookie(name: string, value: string, seconds: number) {
  var expires = ""
  if (seconds) {
    var date = new Date()
    date.setTime(date.getTime() + seconds * 1000)
    expires = "; expires=" + date.toUTCString()
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/"
}
