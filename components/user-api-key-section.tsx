"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { getOrganizationInfo } from "@/utils/organization-info"
import { SecureTextComponent } from "./secure-text"

export function UserApiKeySection() {
  const [apiKey, setApiKey] = useState("")
  const [error, setError] = useState(false)

  const LockIcon = Icons["lock"]

  useEffect(() => {
    async function getAPIKey() {
      try {
        const { apiKey } = await getOrganizationInfo()
        if (!apiKey) {
          setError(true)
          return
        }

        setApiKey(apiKey)
      } catch (error) {
        setError(true)
        console.log("Error occurred while fetching the API key : ", error)
      }
    }
    getAPIKey()
  }, [])

  return (
    <div className="grid gap-10">
      <div
        className={cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-800",
          "transparent"
        )}
      >
        {apiKey && (
          <>
            <LockIcon className="h-5 w-5" />
            <SecureTextComponent secureText={apiKey} />
          </>
        )}

        {error && <div>Something went wrong while fetching the API key</div>}
        {!apiKey && !error && (
          <div className="grid w-full gap-10">
            <Card.Skeleton />
          </div>
        )}
      </div>
    </div>
  )
}
