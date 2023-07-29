"use client"
import React, { useEffect, useState } from "react"

import {
  DashboardTableHeader,
  DashboardTableWrapper,
  DashboardTableCell,
  DashboardEmptyRow,
} from "./dashboard-table"
import { Card } from "./ui/card"
import axios from "@/utils/axios-interceptor"
import { getOrganizationInfo } from "@/utils/organization-info"
import { MessageBox } from "./message-box"
import { buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"
import { getSession } from "next-auth/react"

enum MemberRole {
  OWNER = "Owner",
  ADMIN = "Admin",
  MEMBER = "Member",
}

enum MemberStatus {
  ACTIVE = "Active",
  DISABLED = "Disabled",
  BLOCKED = "Blocked",
  INVITED = "Invited",
}

interface Member {
  memberId: string
  organizationId: string
  email: string
  name?: string
  role: MemberRole
  status: MemberStatus
}

export function MemberTable() {
  const [members, setMembers] = useState<Array<Member>>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>({})

  useEffect(() => {
    getSession()
      .then((e) => setUser(e?.user))
      .catch((e) => setError(true))
  }, [])

  useEffect(() => {
    async function getMembers() {
      try {
        const { apiKey } = await getOrganizationInfo()
        if (!apiKey) {
          setLoading(false)
          setError(true)
          return
        }

        const resp = await axios.get(`/api/organization/members`)
        setLoading(false)

        if (!resp.data.success) setError(true)
        else setMembers(resp.data.data)
      } catch (error) {
        setError(true)
        setLoading(false)
        console.log("Error occurred while fetching the members : ", error)
      }
    }
    getMembers()
  }, [])

  return (
    <div>
      <DashboardTableWrapper>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left">
              <DashboardTableHeader>Member</DashboardTableHeader>
              <DashboardTableHeader>Role</DashboardTableHeader>
              <DashboardTableHeader>Status</DashboardTableHeader>
            </tr>
          </thead>
          {loading ? (
            <DashboardEmptyRow colSpan={3}>
              <div className="grid w-full gap-10">
                <Card.Skeleton />
              </div>
            </DashboardEmptyRow>
          ) : error ? (
            <DashboardEmptyRow colSpan={3}>
              <MessageBox
                title="Something went wrong"
                subtitle="Error occured while fetching members"
              />
            </DashboardEmptyRow>
          ) : members && members.length == 0 ? (
            <DashboardEmptyRow colSpan={3}>
              <MessageBox title="No Members!">
                This organization doesn&apos;t have any members.
              </MessageBox>
            </DashboardEmptyRow>
          ) : (
            <tbody className="relative  divide-y divide-gray-200">
              {members?.map((item, index) => {
                return (
                  <tr
                    key={`member_${item.memberId}`}
                    className="cursor-pointer  hover:bg-gray-50"
                  >
                    <DashboardTableCell className="w-[50%]">
                      <p className="truncate text-left text-base font-semibold ">
                        {item.email}
                      </p>
                    </DashboardTableCell>
                    <DashboardTableCell className="w-[30%]">
                      <div className="flex">
                        <div className="mr-3 flex w-[40%] items-center justify-center rounded-md border-2 border-gray-200 px-4 text-center text-gray-500">
                          {item.role}
                        </div>

                        <button
                          type="submit"
                          className={cn(
                            buttonVariants({ variant: "outline" }),
                            "h-7 w-[30%]  py-1"
                          )}
                          disabled={item.role == MemberRole.MEMBER}
                        >
                          <span className="font-semibold">
                            {item.email == user.email ? "Leave" : "Remove"}
                          </span>
                        </button>
                      </div>
                    </DashboardTableCell>
                    <DashboardTableCell className="w-[15%]">
                      <p className="truncate text-left text-base font-semibold ">
                        {item.status}
                      </p>
                    </DashboardTableCell>
                  </tr>
                )
              })}
            </tbody>
          )}
        </table>
      </DashboardTableWrapper>
    </div>
  )
}
