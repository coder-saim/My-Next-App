"use client"
import { cn } from "@/lib/utils"
import { DashboardHeader } from "./header"
import { MemberTable } from "./member-table"
import { Button, buttonVariants } from "./ui/button"
import * as Dialog from "@radix-ui/react-dialog"
import * as z from "zod"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { emailSchema } from "@/lib/validations/email"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "@/utils/axios-interceptor"
import { toast } from "@/hooks/use-toast"
import React, { useEffect, useState } from "react"
import { Icons } from "./icons"
import copyToClipboard from "@/utils/copy-to-clipboard"
import { siteConfig } from "@/config/site"
import { Organization } from "@/types"

type FormData = z.infer<typeof emailSchema>

export function MemberSection() {
  const [loadingSendInvite, setLoadingSendInvite] = useState<boolean>(false)
  const [loadingCopyLink, setLoadingCopyLink] = useState<boolean>(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [organization, setOrganization] = useState<Organization>({
    name: "",
  } as Organization)

  const LinkIcon = Icons["link"]

  useEffect(() => {
    async function getOrganization() {
      try {
        let resp = await axios.get("/api/organization")
        setLoading(false)

        if (!resp.data.success) setError(true)
        else setOrganization(resp.data.data)
      } catch (error) {
        setError(true)
        setLoading(false)
        console.log("Error occurred while fetching the datasets : ", error)
      }
    }

    getOrganization()
  }, [])

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmitCopyLink = async () => {
    setLoadingCopyLink(true)

    try {
      const response = await axios.post(`/api/member/invite`)
      const invitationCode = response.data.data.invitationCode
      const invitationLink = encodeURI(
        `${siteConfig.url}/invite?invitationCode=${invitationCode}`
      )
      console.log(`Inviation link -  ${invitationLink}`)
      copyToClipboard(invitationLink)

      toast({
        description: "Link copied to clipboard!",
      })
      setValue("email", "")
    } catch (error) {
      console.log(
        `Error while creating  organization invitation link - ${error}`
      )
      toast({
        title: "Something went wrong.",
        description:
          "Failed to create organization invitation link. Please try again.",
        variant: "destructive",
      })
    }

    setLoadingCopyLink(false)
  }

  const onSubmitSendInvite = async (data: FormData) => {
    setLoadingSendInvite(true)

    try {
      const response = await axios.post(`/api/member/invite`, {
        email: data.email,
      })

      toast({
        description: "User invited to organization.",
      })
      setValue("email", "")
    } catch (error) {
      console.log(
        `Error while inviting ${data.email} in organization - ${error}`
      )
      toast({
        title: "Something went wrong.",
        description: "Failed to invite user in organization. Please try again.",
        variant: "destructive",
      })
    }

    setLoadingSendInvite(false)
  }

  return (
    <Dialog.Root>
      <div className="max-w-[80%]">
        <div className="mb-6 mt-1 flex justify-between">
          <DashboardHeader
            heading="Members"
            text={`All members and administrators with access to the ${
              organization?.name ?? ""
            } organization.`}
          />
          <Dialog.Trigger asChild>
            <button className={cn(buttonVariants())}>
              <span className="font-semibold">Invite member</span>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-gray-700/70 data-[state=open]:animate-overlay-show" />
            <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-content-show">
              <div className="flex flex-row justify-between">
                <Dialog.Title className=" text-base-black m-0 text-[17px] font-bold">
                  Invite member{" "}
                  {organization?.name ? `to ${organization?.name}` : ""}
                </Dialog.Title>
                <div
                  className="flex items-center text-sky-500 hover:cursor-pointer"
                  onClick={onSubmitCopyLink}
                >
                  {loadingCopyLink ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <LinkIcon className="h-4 w-4" />
                      <span className="pl-1 text-sm">Copy invite link</span>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4 grid gap-1">
                <div className="flex-col">
                  <Label className="mb-1 font-semibold" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    className="w-[400px]"
                    size={32}
                    disabled={loadingSendInvite}
                    {...register("email")}
                  />
                  {errors?.email && (
                    <p className="px-1 text-xs text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-[25px] flex justify-start gap-4">
                <button
                  type="submit"
                  className={cn(buttonVariants())}
                  onClick={handleSubmit(onSubmitSendInvite)}
                >
                  {loadingSendInvite && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <span className="font-semibold">Send Invitation</span>
                </button>
                <Dialog.Close asChild>
                  <button
                    className={cn(buttonVariants({ variant: "outline" }))}
                    onClick={() => setValue("email", "")}
                  >
                    <span className="font-semibold">Cancel</span>
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </div>

        <MemberTable />
      </div>
    </Dialog.Root>
  )
}
