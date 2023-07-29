import { useState } from "react"
import { CustomLineChart } from "./graphs/line-chart"
import { Outline } from "./outline"
import { Selector, SelectorLabeled } from "./selector"
import TitleInfo from "./title-info"
import { ChartSelector, LineData } from "@/types"

interface LineChartSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  updatedAtText?: string
  lines: LineData[]
  xDomain: string[]
  chartSelectors: ChartSelector[]
}

export function LineChartSection({
  title,
  updatedAtText,
  lines,
  xDomain,
  chartSelectors,
}: LineChartSectionProps) {
  const [selectedValues, setSelectedValues] = useState(
    chartSelectors.reduce((prev, selector) => {
      prev[selector.selectorName] = selector.defaultValue
      return prev
    }, {})
  )
  console.log(selectedValues)
  const graphData = lines.map((line) => ({
    title: line.title,
    color: line.color,
    latestValue: line.data[0].value,
  }))

  return (
    <div className="flex h-auto rounded-md border p-8">
      <div className="flex w-full flex-col">
        <div className="mb-4 flex w-full flex-row items-center justify-between">
          <TitleInfo title={title} />
          <div className="flex  flex-row items-center space-x-2">
            {chartSelectors.map((selector, index) => (
              <SelectorLabeled
                key={index}
                label={`${selector.selectorName}:`}
                onValueChange={(value) =>
                  setSelectedValues((prev) => {
                    prev[selector.selectorName] = value
                    return { ...prev }
                  })
                }
                items={selector.values}
                placeholder={selector.defaultValue}
                className="min-w-[60px]"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="flex w-48 flex-col space-y-3">
            {graphData.map((item, index) => (
              <div key={index} className="flex flex-col">
                <p
                  className="text-base font-medium"
                  style={{ color: item.color }}
                >
                  {item.title}
                </p>
                <p className="text-2xl font-semibold text-slate-800">
                  {item.latestValue}
                </p>
              </div>
            ))}
          </div>

          <CustomLineChart
            lines={lines}
            width={1000}
            height={230}
            margin={{
              top: 20,
              bottom: 20,
              left: 20,
              right: 20,
            }}
            xDomain={xDomain}
          />
        </div>

        {updatedAtText && (
          <div className="-mt-4 text-xs text-slate-500">{updatedAtText}</div>
        )}
      </div>
    </div>
  )
}
