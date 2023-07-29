import { ModelDetails } from "@/types"
import { getOrganizationInfo } from "@/utils/organization-info"
import axios from "@/utils/axios-interceptor"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface ModelOverviewProps {}

export function ModelOverview({}: ModelOverviewProps) {
  const [modelDetails, setModelDetails] = useState<ModelDetails>()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const modelName = router.query.modelName

  useEffect(() => {
    async function getModelDetails() {
      try {
        const { apiKey } = await getOrganizationInfo()
        if (!apiKey) {
          setLoading(false)
          setError(true)
          return
        }

        const headers = { "x-api-key": `${apiKey}` }
        const resp = await axios(`/api/models/${modelName}`, {
          headers: headers,
        })
        setLoading(false)

        if (!resp.data.success) setError(true)
        else setModelDetails(resp.data.data)
      } catch (error) {
        setError(true)
        setLoading(false)
        console.log("Error occurred while fetching model details : ", error)
      }
    }
    getModelDetails()
  }, [])
}
