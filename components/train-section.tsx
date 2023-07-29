import { useState } from "react"
import { Outline } from "./outline"
import { Selector, SelectorLabeled } from "./selector"
import TitleInfo from "./title-info"
import { CustomBarChart } from "./graphs/custom-bar-chart"
import { TitledBarChart } from "./graphs/bar-chart"

interface TrainSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
}

interface GraphData {
  title: string
  latestValue: string
  color: string
}

const graphData = [
  { title: "Personalized", color: "#8B5CF6", latestValue: 0.72 },
  { title: "Toplist", color: "#22C55E", latestValue: 0.72 },
  { title: "Toplist", color: "#22C55E", latestValue: 0.72 },
]

const data = [
  {
    name: "Random",
    value: 0.2,
    color: "#D1D5DB",
  },
  {
    name: "Shaped",
    value: 0.5,
    color: "#A855F7",
  },
  {
    name: "Toplist",
    value: 0.8,
    color: "#0EA5E9",
  },
]

const charts = [
  { chartName: "Recall", data: data },
  { chartName: "Precision", data: data },
  { chartName: "NDCG", data: data },
  { chartName: "HitRate", data: data },
  { chartName: "MAP", data: data },
  { chartName: "MAP", data: data },
  { chartName: "Personalization", data: data },
]

export function TrainSection({ title }: TrainSectionProps) {
  const [segmentation, setSegmentation] = useState("All")
  const [metric, setMetric] = useState("Accuracy (NDCG)")
  const [slateSize, setSlateSize] = useState("10")
  return (
    <Outline>
      <div className="flex w-full flex-col">
        <TitleInfo title={title} />
        <div className="mt-4 grid w-full gap-16 md:grid-cols-3">
          {charts.map((chart) => (
            <TitledBarChart chartTitle={chart.chartName} data={chart.data} />
          ))}
        </div>
      </div>
    </Outline>
  )
}
