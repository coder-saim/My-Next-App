"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Organization } from "@/types"
import axios from "@/utils/axios-interceptor"
import { organizationSchema } from "@/lib/validations/organization"

interface OrganizationFormProps extends React.HTMLAttributes<HTMLFormElement> {}

type FormData = z.infer<typeof organizationSchema>

export function OrganizationForm({
  className,
  ...props
}: OrganizationFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [organization, setOrganization] = React.useState<Organization>(
    {} as Organization
  )
  useEffect(() => {
    async function getOrganization() {
      try {
        let resp = await axios.get("/api/organization")

        setLoading(false)

        if (!resp.data.success) setError(true)
        else setOrganization(resp.data.data)
        setValue("name", resp.data.data.name)
      } catch (error) {
        setError(true)
        setLoading(false)
        console.log("Error occurred while fetching the datasets : ", error)
      }
    }

    getOrganization()
  }, [])

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    try {
      const response = await axios.put(`/api/organization`, {
        name: data.name,
      })
      toast({
        description: "Your organization name has been updated.",
      })
    } catch (error) {
      console.log(`Error while saving organization name - ${error}`)
      toast({
        title: "Something went wrong.",
        description:
          "Your organization name was not updated. Please try again.",
        variant: "destructive",
      })
    }

    setIsSaving(false)

    router.refresh()
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div>
        <div className="pb-1 text-base font-medium">Organization name</div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="name">
            Organization name
          </Label>
          <Input
            id="name"
            className="w-[400px]"
            size={32}
            {...register("name")}
          />
          {errors?.name && (
            <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div className="pt-2 text-sm text-gray-600">
          Lowercase alphanumeric, dashes and underscores only
        </div>
        <div className="pt-5">
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save organization settings</span>
          </button>
        </div>
      </div>
    </form>
  )
}
