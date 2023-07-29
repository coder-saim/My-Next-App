"use client"
import React, { useEffect, useState } from "react"

import { redirect } from "next/navigation"
//import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { TableSection } from "@/components/table-section"
import { DatasetTable } from "@/components/dataset-table"
import { ModelTable } from "@/components/model-table"
import { ModelSummarySection } from "@/components/model-summary-section"
import { ModelDetails } from "@/types"
import { StatusBanner } from "@/components/status-banner"
import { SchemaSection } from "@/components/model-schema-section"
import { DashboardTableCell,DashboardEmptyRow,DashboardTableHeader,DashboardTableWrapper } from "@/components/dashboard-table"
import axios from "@/utils/axios-interceptor"
import { Model } from "@/types"
import { getOrganizationInfo } from "@/utils/organization-info"
import { MessageBox } from "@/components/message-box"
import { CopyClipboard } from "@/components/copy-clipboard"
import { Card } from "@/components/ui/card"
import { StatusChip } from "@/components/status-chip"
import Link from "next/link"
import { getTimeDiffFromDateString } from "@/utils/date-utils"






// export const metadata = {
//   title: "Dashboard",
// }

export default async function DashboardPage() {
  const [models, setModels] = useState<Array<Model>>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   async function getModels() {
  //     try {
  //       const { apiKey } = await getOrganizationInfo()
  //       if (!apiKey) {
  //         setLoading(false)
  //         setError(true)
  //         return
  //       }

  //       const headers = { "x-api-key": `${apiKey}` }
  //       const resp = await axios(`/api/models`, {
  //         headers: headers,
  //       })
  //       setLoading(false)

  //       if (!resp.data.success) setError(true)
  //       else setModels(resp.data.data.models)
  //     } catch (error) {
  //       setError(true)
  //       setLoading(false)
  //       console.log("Error occurred while fetching the models : ", error)
  //     }
  //   }
  //   getModels()
  // }, [])


  return (
    <>
      <DashboardTableWrapper>
        <table className="w-full">
          <thead>
            <tr>
              {/* <div className="flex w-full flex-row"> */}
              <DashboardTableHeader className="w-[25%]">
                Name
              </DashboardTableHeader>
              <DashboardTableHeader className="w-[10%]">
                Status
              </DashboardTableHeader>
              <DashboardTableHeader className="w-[20%]">
                Created
              </DashboardTableHeader>
              <DashboardTableHeader className="w-[25%]">
                Model URI
              </DashboardTableHeader>
              {/* </div> */}
            </tr>
          </thead>
          {loading ? (
            <DashboardEmptyRow colSpan={4}>
              <div className="grid w-full gap-10">
                <Card.Skeleton />
              </div>
            </DashboardEmptyRow> 
          ) : error ? (
            <DashboardEmptyRow colSpan={4}>
              <MessageBox
                title="Something went wrong"
                subtitle="Error occured while fetching models"
              />
            </DashboardEmptyRow>
          ) : models && models.length == 0 ? (
            <DashboardEmptyRow colSpan={4}>
              <MessageBox title="No models created" className="min-h-[120px]">
                Follow the{" "}
                <a
                  href="https://docs.shaped.ai/docs/guides/your-first-model/"
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer underline"
                >
                  Getting started
                </a>{" "}
                guide
              </MessageBox>
            </DashboardEmptyRow>
          ) : (
            <tbody className="relative  divide-y divide-gray-200">
              {models.map((item, index) => {
                return (
                  <tr
                    key={`model_${index}`}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <DashboardTableCell className="w-[20%]">
                      <p className="truncate text-sm font-medium text-gray-900 underline">
                        <Link href={`/models/${item.model_name}/overview`}>
                          {item.model_name}
                        </Link>
                      </p>
                    </DashboardTableCell>
                    <DashboardTableCell className="w-[20%]">
                      <StatusChip
                        key={`chip-${item.model_name}-${index}`}
                        status={item.status} 
                      />
                    </DashboardTableCell>
                    <DashboardTableCell className="w-[20%]">
                      {getTimeDiffFromDateString(item.created_at)}
                    </DashboardTableCell>

                    <DashboardTableCell className="w-[25%]">
                      <div className="flex max-w-[15rem] items-center justify-between rounded-lg border-2 border-solid border-gray-200  px-2  text-gray-500">
                        <div className="max-w-[20rem] truncate p-1">
                          {item.model_uri}
                        </div>
                        <div>
                          <CopyClipboard text={item.model_uri} />
                        </div>
                      </div>
                    </DashboardTableCell>
                  </tr>
                )
              })}
            </tbody>
          )}
        </table>
      </DashboardTableWrapper>
    </>
  )
}
