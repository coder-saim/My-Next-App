"use client"
import React, { useEffect, useState } from "react"

import {
  DashboardTableHeader,
  DashboardTableWrapper,
  DashboardTableCell,
  DashboardEmptyRow,
} from "./dashboard-table"
import { Card } from "./ui/card"
import { StatusChip } from "./status-chip"
import { CopyClipboard } from "./copy-clipboard"
import axios from "@/utils/axios-interceptor"
import { getTimeDiffFromDateString } from "@/utils/date-utils"
import { getOrganizationInfo } from "@/utils/organization-info"
import { MessageBox } from "./message-box"
import Link from "next/link"

interface DataSet {
  dataset_name: string
  schema_type: string
  status: string
  created_at: string
  dataset_uri: string
}

export function DatasetTable() {
  const [datasets, setDatasets] = useState<Array<DataSet>>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getDatasets() {
      try {
        const { apiKey } = await getOrganizationInfo()
        if (!apiKey) {
          setLoading(false)
          setError(true)
          return
        }

        const headers = { "x-api-key": `${apiKey}` }
        const resp = await axios(`/api/datasets`, { headers: headers })
        setLoading(false)

        if (!resp.data.success) setError(true)
        else setDatasets(resp.data.data.datasets)
      } catch (error) {
        setError(true)
        setLoading(false)
        console.log("Error occurred while fetching the datasets : ", error)
      }
    }
    getDatasets()
  }, [])

  return (
    <>
      <DashboardTableWrapper>
        <table className="w-full">
          <thead>
            <tr>
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
                Dataset URI
              </DashboardTableHeader>
            </tr>
          </thead>

          {loading ? (
            <DashboardEmptyRow colSpan={4}>
              <Card.Skeleton />
            </DashboardEmptyRow>
          ) : error ? (
            <DashboardEmptyRow colSpan={4}>
              <MessageBox
                title="Something went wrong"
                subtitle="Error occured while fetching datasets"
              />
            </DashboardEmptyRow>
          ) : datasets && datasets.length == 0 ? (
            <DashboardEmptyRow colSpan={4}>
              <MessageBox title="No datasets created" className="min-h-[120px]">
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
              {datasets.map((item, index) => (
                <tr
                  key={`dataset_${index}`}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <DashboardTableCell className="w-[20%]">
                    <p className="truncate text-sm font-medium text-gray-900 underline">
                      <Link href={`/datasets/${item.dataset_name}/overview`}>
                        {item.dataset_name}
                      </Link>
                    </p>
                  </DashboardTableCell>
                  <DashboardTableCell className="w-[20%]">
                    <StatusChip
                      key={`chip-${item.dataset_name}-${index}`}
                      status={item.status}
                    />
                  </DashboardTableCell>
                  <DashboardTableCell className="w-[20%]">
                    {getTimeDiffFromDateString(item.created_at)}
                  </DashboardTableCell>
                  <DashboardTableCell className="w-[25%]">
                    <div className="flex max-w-[15rem] items-center justify-between rounded-lg border-2 border-solid border-gray-200 px-2 font-medium text-gray-500">
                      <div className="max-w-[20rem] truncate p-1">
                        {item.dataset_uri}
                      </div>
                      <div>
                        <CopyClipboard text={item.dataset_uri} />
                      </div>
                    </div>
                  </DashboardTableCell>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </DashboardTableWrapper>
    </>
  )
}
