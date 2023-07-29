import React, { useState } from "react"
import { Bar } from "@visx/shape"
import { scaleBand, scaleLinear } from "@visx/scale"
import { AxisLeft, AxisBottom } from "@visx/axis"

interface DataPoint {
  name: string
  value: number
  color: string
}

interface SingleDataPointGraph {
  chartTitle?: string
  data: DataPoint[]
}

interface CustomBarChartProps extends SingleDataPointGraph {
  width: number
  height: number
  margin: {
    top: number
    right: number
    bottom: number
    left: number
  }
  // yTicks: number[];
}

const CustomBarChart = ({
  data,
  chartTitle,
  width,
  height,
  margin,
}: // yTicks,
CustomBarChartProps) => {
  // const [tooltip, setTooltip] = useState<{
  //   x: number;
  //   y: number;
  //   value: number;
  //   name: string;
  // } | null>(null);

  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const xScale = scaleBand<string>({
    domain: data.map((d) => d.name),
    range: [0, xMax],
    padding: 0.3,
  })
  const yMin = 0
  const yMaxi = Math.max(...data.map((d) => d.value)) + 0.2

  const yScale = scaleLinear<number>({
    domain: [yMin, yMaxi],
    range: [yMax, 0],
    nice: true,
  })

  const tickValues = Array.from(
    new Set(yScale.ticks().map((value) => Math.ceil(value * 20) / 10))
  ).filter(
    (tick) => tick !== 0 && tick <= Math.ceil(yScale.domain()[1] * 10) / 10
  )

  // const handleMouseOver = (
  //   event: React.MouseEvent<SVGRectElement, MouseEvent>,
  //   value: number,
  //   name: string
  // ) => {
  //   const { x, y } = event.currentTarget.getBoundingClientRect();
  //   setTooltip({ x, y, value, name });
  // };

  // const handleMouseLeave = () => {
  //   setTooltip(null);
  // };

  return (
    <>
      <div className="h-70 flex items-center justify-center ">
        <svg width={width} height={height}>
          <rect
            x={margin.left}
            y={margin.top}
            width={xMax}
            height={yMax}
            fill="none"
            stroke="gray"
          />
          {data.map((d) => (
            <Bar
              key={d.name}
              x={margin.left + xScale(d.name)!}
              y={margin.top + yScale(d.value)}
              height={yMax - yScale(d.value)}
              width={xScale.bandwidth()}
              fill={d.color}
              // onMouseOver={(event) => handleMouseOver(event, d.value, d.name)}
              // onMouseLeave={handleMouseLeave}
            />
          ))}
          {xScale.domain().map((d) => (
            <g key={d}>
              <text
                x={margin.left - 30 + xScale(d)! + xScale.bandwidth() / 2}
                // x={margin.left + 30}
                y={height - margin.bottom}
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(270 ${
                  margin.left + xScale(d)! + xScale.bandwidth() / 2
                },${height - margin.bottom})`}
                fontSize={12}
                color="#4F4F4F"
              >
                {d}
              </text>
            </g>
          ))}

          <g>
            {tickValues.map((tick, index) => (
              <text
                key={index}
                x={margin.left - 10}
                y={yScale(tick) + margin.top}
                textAnchor="end"
                color="#4F4F4F"
                dominantBaseline="middle"
                fontSize={12}
              >
                {tick}
              </text>
            ))}
          </g>
        </svg>
      </div>
    </>
  )
}

interface TitledBarChartProps extends SingleDataPointGraph {}
const TitledBarChart = ({ chartTitle, data }: TitledBarChartProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <p className="text-xl font-bold">{chartTitle}</p>
      <CustomBarChart
        data={data}
        width={240}
        height={300}
        margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
      />
    </div>
  )
}

export { CustomBarChart, TitledBarChart }
