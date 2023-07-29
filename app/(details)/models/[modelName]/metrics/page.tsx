"use client"
import { redirect, useParams } from "next/navigation"
import { DashboardShell } from "@/components/shell"
import { useEffect, useState } from "react"
import { ModelTabs } from "@/components/model-tabs"
import { LineChartSection } from "@/components/metrics-section"
// import * as Tabs from "@radix-ui/react-tabs"

// export const metadata = {
//   title: "Dashboard",
// }
import axios from "@/utils/axios-interceptor"
import { TrainSection } from "@/components/train-section"
import { ChartSelector } from "@/types"
import { MetricsTabEnum } from "@/types/enums"

const graphData = [
  { title: "Personalized", color: "#8B5CF6", latestValue: 0.72 },
  { title: "Toplist", color: "#22C55E", latestValue: 0.72 },
  { title: "Toplist", color: "#22C55E", latestValue: 0.72 },
]

const lines = [
  {
    title: "Personalized",
    color: "#8B5CF6",
    data: [
      {
        name: "05/29",
        value: 0.33,
      },
      {
        name: "05/30",
        value: 0.34,
      },
      {
        name: "05/31",
        value: 0.38,
      },
      {
        name: "06/01",
        value: 0.4,
      },
      {
        name: "06/02",
        value: 0.36,
      },
      {
        name: "06/03",
        value: 0.35,
      },
      {
        name: "06/04",
        value: 0.32,
      },
    ],
  },
  {
    title: "Toplist",
    color: "#22C55E",
    data: [
      {
        name: "05/29",
        value: 0.25,
      },
      {
        name: "05/30",
        value: 0.26,
      },
      {
        name: "05/31",
        value: 0.22,
      },
      {
        name: "06/01",
        value: 0.23,
      },
      {
        name: "06/02",
        value: 0.27,
      },
      {
        name: "06/03",
        value: 0.26,
      },
      {
        name: "06/04",
        value: 0.21,
      },
    ],
  },
  {
    title: "Random",
    color: "#B2BEB5",
    data: [
      {
        name: "05/29",
        value: 0.15,
      },
      {
        name: "05/30",
        value: 0.16,
      },
      {
        name: "05/31",
        value: 0.17,
      },
      {
        name: "06/01",
        value: 0.16,
      },
      {
        name: "06/02",
        value: 0.15,
      },
      {
        name: "06/03",
        value: 0.14,
      },
      {
        name: "06/04",
        value: 0.16,
      },
    ],
  },
]

const xDomain = ["05/29", "05/30", "05/31", "06/01", "06/02", "06/03", "06/04"]
const chartSelectors: ChartSelector[] = [
  {
    selectorName: "Metric",
    values: ["Accuracy (NDCG)", "Precision (NDCG)"],
    defaultValue: "Accuracy (NDCG)",
  },
  {
    selectorName: "Slate Size",
    values: ["10", "20"],
    defaultValue: "10",
  },
]

export default function DashboardPage() {
  const [currentTab, setCurrentTab] = useState<MetricsTabEnum>(
    MetricsTabEnum.Business
  )

  // const user = await getCurrentUser()

  // if (!user) {
  //   redirect("/login")
  // }
  const params = useParams()
  const modelName = params?.modelName

  const [modelMetrics, setModelMetrics] = useState<any>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getModelMetrics() {
      try {
        const resp = await axios.get(`/api/models/metrics/train`, {
          params: { modelName },
        })
        setLoading(false)

        if (!resp.data.success) setError(true)
        else setModelMetrics(resp.data.data)

        console.log("response", resp.data.data)
      } catch (error) {
        setError(true)
        setLoading(false)
        console.log("Error occurred while fetching the members : ", error)
      }
    }

    getModelMetrics()
  }, [])

  return (
    <DashboardShell>
      <div className="space-y-5 ">
        {/* <ModelTabs
          currentTab={currentTab}
          onTabClick={(e) => setCurrentTab(e)}
        /> */}
        {/* {currentTab == MetricsTabEnum.Business && <BusinessTab />}
        {currentTab == MetricsTabEnum.Online && <OnlineTab />}
        {currentTab == MetricsTabEnum.Training && <TrainTab />}
        {currentTab == MetricsTabEnum.System && <SystemTab />} */}
        <TrainSection title="First run" />
        {/* <MetricsSection /> */}
      </div>
    </DashboardShell>
  )
}

function TrainTab() {
  return (
    <div>
      <LineChartSection
        title="Historical"
        updatedAtText="Metrics updated after each train"
        lines={lines}
        xDomain={xDomain}
        chartSelectors={chartSelectors}
      />

      <LineChartSection
        title="Summary"
        updatedAtText="Metrics updated after each train"
        lines={lines.slice(0, 1)}
        xDomain={xDomain}
        chartSelectors={chartSelectors}
      />
    </div>
  )
}

function BusinessTab() {
  return (
    <div>
      <LineChartSection
        title="Retention"
        updatedAtText="Updated every 15 minutes"
        lines={lines}
        xDomain={xDomain}
        chartSelectors={chartSelectors}
      />

      <LineChartSection
        title="Active Users"
        updatedAtText="Metrics updated after each train"
        lines={lines.slice(0, 1)}
        xDomain={xDomain}
        chartSelectors={chartSelectors}
      />
    </div>
  )
}

function OnlineTab() {
  return <div></div>
}
function SystemTab() {
  return <div></div>
}
