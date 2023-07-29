"use client"
import { redirect } from "next/navigation"
import { DashboardShell } from "@/components/shell"
import { DatasetDetails } from "@/types"
import { StatusBanner } from "@/components/status-banner"
import { DatasetSchemaSection } from "@/components/dataset-schema-section"
import { useEffect, useState } from "react"
import { getOrganizationInfo } from "@/utils/organization-info"
import { getSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { MessageBox } from "@/components/message-box"
import { DatasetSummarySection } from "@/components/dataset-summary-section"
import axios from "@/utils/axios-interceptor"

export default function DashboardPage() {
  const [datasetDetails, setDatasetDetails] = useState<DatasetDetails>(
    {} as DatasetDetails
  )
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const params = useParams()

  const datasetName = params?.datasetName

  const getDescriptionFromStatus = (status: string) => {
    if (status.toLowerCase() == "error")
      return "There was an error creating your dataset."
    else
      return "Check back in a few hours to see your dataset schema and metrics."
  }

  useEffect(() => {
    async function getDatasetDetails() {
      const session = await getSession()

      if (!session?.user) {
        redirect("/login")
      }

      try {
        const { apiKey } = await getOrganizationInfo()
        if (!apiKey) {
          setLoading(false)
          setError(true)
          return
        }

        const headers = { "x-api-key": `${apiKey}` }
        const resp = await axios(`/api/datasets/${datasetName}`, {
          headers: headers,
        })
        setLoading(false)

        if (!resp.data.success) setError(true)
        else setDatasetDetails(resp.data.data)
      } catch (error) {
        setError(true)
        setLoading(false)
        console.log("Error occurred while fetching dataset details : ", error)
      }
    }
    getDatasetDetails()
  }, [])

  return (
    <DashboardShell>
      <div className="space-y-3">
        {loading ? (
          <div className="grid w-full gap-10">
            <Card.Skeleton />
            <Card.Skeleton />
            <Card.Skeleton />
          </div>
        ) : error ? (
          <MessageBox
            title="Something went wrong"
            subtitle="Error occured while fetching datasets"
          />
        ) : (
          <>
            <DatasetSummarySection datasetDetails={datasetDetails} />
            {datasetDetails.status.toLocaleLowerCase() !== "active" && (
              <StatusBanner
                title={`Dataset ${datasetDetails.status.toLocaleLowerCase()}`}
                description={getDescriptionFromStatus(datasetDetails.status)}
                elapsedTime=""
                totalElapsedTime=""
              />
            )}
            <DatasetSchemaSection
              datasetSchema={datasetDetails.dataset_schema}
            />
          </>
        )}
      </div>
    </DashboardShell>
  )
}
