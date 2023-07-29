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
import { Model } from "@/types"
import Link from "next/link"

export function ModelTable() {
  const [models, setModels] = useState<Array<Model>>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  console.log(loading ,  error)

  useEffect(() => {
    async function getModels() {
      try {
        setModels([
          {
              "model_name": "movielens_movie_recommendations",
              "model_uri": "https://api.prod.shaped.ai/v1/models/movielens_movie_recommendations",
              "created_at": "2023-05-30T13:01:16 UTC",
              "status": "IDLE"
          },
      {
              "model_name": "movielens_movie_recommendations",
              "model_uri": "https://api.prod.shaped.ai/v1/models/movielens_movie_recommendations",
              "created_at": "2023-05-30T13:01:16 UTC",
              "status": "IDLE"
          },
      {
              "model_name": "movielens_movie_recommendations",
              "model_uri": "https://api.prod.shaped.ai/v1/models/movielens_movie_recommendations",
              "created_at": "2023-05-30T13:01:16 UTC",
              "status": "IDLE"
          }
      ])
 
        
      } catch (error) {
        // setError(true)
        // setLoading(false)
        // console.log("Error occurred while fetching the models : ", error)
      }
    }
    getModels()
  }, [])

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
