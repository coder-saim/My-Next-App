"use client"

import * as React from "react"
import { toast } from "@/hooks/use-toast"

import { UserSubscriptionPlan } from "types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { getOrganizationInfo } from "@/utils/organization-info"
import { MessageBox } from "./message-box"
import axios from "@/utils/axios-interceptor"

export function BillingBannerWrapper({}) {
  const [subscriptionPlan, setSubscriptionPlan] =
    useState<UserSubscriptionPlan>({} as UserSubscriptionPlan)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function userInfo() {
      try {
        const Organization = await getOrganizationInfo()
        const subscriptionPlan = {
          isPro: Organization?.stripeSubscriptionId ? true : false,
          stripeCustomerId: Organization?.stripeCustomerId,
          stripeSubscriptionId: Organization?.stripeSubscriptionId,
        }
        setSubscriptionPlan(subscriptionPlan)
        setError(false)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
        console.log("Error occurred while fetching the user : ", error)
      }
    }
    userInfo()
  }, [])
  return (
    <div className="grid max-w-[70%] gap-10">
      {loading ? (
        <div className="grid w-full gap-10">
          <Card.Skeleton />
        </div>
      ) : error ? (
        <MessageBox
          title="Something went wrong"
          subtitle="Error occured while fetching billing info"
        />
      ) : (
        <>
          {subscriptionPlan.isPro ? (
            <BillingBanner
              subscriptionPlan={subscriptionPlan}
              title="Invoices for current and previous billing periods."
              description="See a complete list of your invoices in the Stripe portal."
              buttonText="Visit Stripe portal"
            />
          ) : (
            <BillingBanner
              subscriptionPlan={subscriptionPlan}
              title="Contact us to discuss our Pro plans"
              description="Our Pro plans offer higher usage limits and white-glove support."
              buttonText="Contact us"
            />
          )}
        </>
      )}
    </div>
  )
}

interface BillingBannerProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan
  title: string
  description: string
  buttonText?: string
}

export function BillingBanner({
  subscriptionPlan,
  title,
  description,
  buttonText,
  className,
  ...props
}: BillingBannerProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function getBillingSession() {
    try {
      setIsLoading(true)
      const session = await axios.get("/api/users/stripe", {
        params: {
          ...subscriptionPlan,
        },
      })
      setIsLoading(false)

      window.open(session.data.url, "_blank")
    } catch (error) {
      setIsLoading(false)
      console.log("Error occurred while fetching stripe session : ", error)
      return toast({
        title: "Something went wrong.",
        description: "Please refresh the page and try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="bg-slate-800">
      <Card.Header>
        <div className="flex justify-between">
          <div>
            <Card.Title className="text-slate-200">{title}</Card.Title>
            <Card.Description className="mt-1 text-gray-500">
              {description}
            </Card.Description>
          </div>
          <button
            type="submit"
            className={cn(buttonVariants({ variant: "subtle" }))}
            disabled={isLoading}
            onClick={() => {
              if (subscriptionPlan.isPro) {
                getBillingSession()
              } else {
                window.open(
                  "https://meetings.hubspot.com/daniel1939",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            }}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {buttonText}
          </button>
        </div>
      </Card.Header>
    </Card>
  )
}
