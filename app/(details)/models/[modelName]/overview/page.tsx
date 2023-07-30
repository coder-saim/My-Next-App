"use client"
import { redirect } from "next/navigation"
import { DashboardShell } from "@/components/shell"
import { ModelSummarySection } from "@/components/model-summary-section"
import { ModelDetails } from "@/types"
import { StatusBanner } from "@/components/status-banner"
import { SchemaSection } from "@/components/model-schema-section"
import { useEffect, useState } from "react"
import axios from "@/utils/axios-interceptor"
import { getOrganizationInfo } from "@/utils/organization-info"
import { getSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { MessageBox } from "@/components/message-box"

export default function DashboardPage() {
  const [modelDetails, setModelDetails] = useState<ModelDetails>(
    {} as ModelDetails
  )
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(!true)
  const params = useParams()

  const modelName = params?.modelName

  const getDescriptionFromStatus = (status: string, errorMessage?: string) => {
    if (status.toLowerCase() == "error")
      return errorMessage ?? "There was an error creating your model."
    else return "Check back in a few hours to see your model metrics."
  }

  console.log("akihsufdnhswaifdusnhdiksndsikjdbncdbjksn", modelDetails)
  // useEffect(() => {
  //   async function getModelDetails() {
  //     const session = await getSession()

  //     // if (!session?.user) {
  //     //   redirect("/login")
  //     // }

  //     try {
  //       const { apiKey } = await getOrganizationInfo()
  //       if (!apiKey) {
  //         setLoading(false)
  //         setError(true)
  //         return
  //       }

  //       const headers = { "x-api-key": `${apiKey}` }
  //       const resp = await axios(`/api/models/${modelName}`, {
  //         headers: headers,
  //       })
  //       setLoading(false)

  //       if (!resp.data.success) setError(true)
  //       else setModelDetails(resp.data.data)
  //     } catch (error) {
  //       setError(true)
  //       setLoading(false)
  //       console.log("Error occurred while fetching model details : ", error)
  //     }
  //   }
  //   getModelDetails()
  // }, [])

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
            subtitle="Error occured while fetching model details"
          />
        ) : (
          <>
            <ModelSummarySection modelDetails={modelDetails} />
            {modelDetails.status.toLocaleLowerCase() !== "active" && (
              <StatusBanner
                title={`Model ${modelDetails.status.toLocaleLowerCase()}`}
                description={getDescriptionFromStatus(
                  modelDetails.status,
                  modelDetails.error_message
                )}
                elapsedTime=""
                totalElapsedTime=""
              />
            )}
            <SchemaSection modelDetails={modelDetails} />
          </>
        )}
      </div>
    </DashboardShell>
  )
}
