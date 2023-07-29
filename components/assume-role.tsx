"use client"

import * as React from "react"

import { useEffect, useState } from "react"
import { Member } from "@/types"
import axios from "@/utils/axios-interceptor"
import { ComboSearchbox } from "./combo-search-box"
import { getOrganizationInfo } from "@/utils/organization-info"
import { Card } from "./ui/card"
import { MessageBox } from "./message-box"

interface OrganizationFormProps extends React.HTMLAttributes<HTMLFormElement> {}

export function AssumeRoleComp({ className, ...props }: OrganizationFormProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [assumedUserEmail, setAssumedUserEmail] = useState("")
  const members = React.useRef<Member[]>([])

  useEffect(() => {
    async function getAllMembers() {
      try {
        let resp = await axios.get("/api/member/all")
        setLoading(false)

        if (!resp.data.success) setError(true)
        else members.current = resp.data.data
      } catch (error) {
        setError(true)
        setLoading(false)
        console.log(
          "Error occurred while fetching all members from all organizations: ",
          error
        )
      }
    }

    getAllMembers()
  }, [])

  useEffect(() => {
    const assumedUserEmail = sessionStorage.getItem("AssumedUserEmail")
    if (assumedUserEmail) setAssumedUserEmail(assumedUserEmail)
  }, [members.current.length])

  return (
    <div className="flex flex-col">
      {loading ? (
        <Card.Skeleton />
      ) : error ? (
        <MessageBox
          title="Something went wrong"
          subtitle="Error occured while fetching all members from all organizations"
        />
      ) : (
        <div className="flex flex-col space-y-2 ">
          <span className="font-medium">View as</span>
          <ComboSearchbox
            items={members.current.map((e) => {
              const organizationName = e.organizationName
                ? ` - ${e.organizationName}`
                : ""
              return {
                searchValues: [
                  e.email.toLowerCase(),
                  (e.organizationName ?? "").toLowerCase(),
                ],
                label: `${e.email}${organizationName}`,
              }
            })}
            selectedValue={
              assumedUserEmail
                ? `${assumedUserEmail} - ${
                    members.current.find((e) => e.email === assumedUserEmail)
                      ?.organizationName
                  }`
                : ""
            }
            onItemSelect={(item: string) => {
              if (item == "") {
                sessionStorage.removeItem("AssumedUserEmail")
                sessionStorage.removeItem("OrganizationInfo")
              } else {
                sessionStorage.setItem("AssumedUserEmail", item.split(" - ")[0])
                sessionStorage.removeItem("OrganizationInfo")
              }
              getOrganizationInfo()
            }}
            className="w-[400px]"
            name="member"
          />
        </div>
      )}
    </div>
  )
}
