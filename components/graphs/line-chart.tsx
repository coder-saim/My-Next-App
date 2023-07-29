import React, { useState } from "react"
import { AxisLeft, AxisRight, AxisBottom } from "@visx/axis"
import { scaleLinear, scaleBand } from "@visx/scale"
import { LinePath } from "@visx/shape"
import { Group } from "@visx/group"
import { LineData } from "@/types"

interface CustomLineChartProps {
  lines: LineData[]
  width: number
  height: number
  margin: {
    top: number
    bottom: number
    left: number
    right: number
  }
  // yRange: number[];
  xDomain: string[]
  // tooltipOpen: boolean;
  // tooltipLeft: number;
  // tooltipTop: number;
  // tooltipData: DataPoint | undefined;
  // hideTooltip: () => void;
  // showTooltip: (event: React.MouseEvent<Element, MouseEvent>, data: DataPoint) => void;
}

const formatLabel = (label: string): string => {
  const [day, time] = label.split(" ")
  return `${day}\n${time}`
}

export function CustomLineChart({
  lines,
  width,
  height,
  margin,
  xDomain,
}: CustomLineChartProps) {
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const xScale = scaleBand<string>({
    domain: xDomain, // Use xDomain prop
    range: [-margin.left - 35, width + 14],
    padding: 1,
  })

  const yMin = 0
  const yMaxi =
    Math.max(...lines.flatMap((line) => line.data.map((d) => d.value))) + 0.2

  const yScale = scaleLinear<number>({
    domain: [yMin, yMaxi],
    range: [height - margin.bottom, margin.top],
  })

  const tickValues = Array.from(
    new Set(yScale.ticks().map((value) => Math.ceil(value * 20) / 10))
  ).filter(
    (tick) => tick !== 0 && tick <= Math.ceil(yScale.domain()[1] * 10) / 10
  )

  return (
    <div className="flex items-center justify-center">
      <svg width={width} height={height}>
        <rect
          x={margin.left}
          y={margin.top}
          width={xMax}
          height={yMax}
          fill="none"
          stroke="gray"
        />

        <g transform={`translate(0, ${height - margin.bottom})`}>
          {xScale.domain().map((value, index) => (
            <text
              key={index}
              x={
                xScale(value)! +
                xScale.bandwidth() / 2 +
                (index * width) / 65 -
                25
              }
              y={15}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={10}
            >
              {value}
            </text>
          ))}
        </g>

        <g transform={`translate(${width - margin.right}, 0)`}>
          {tickValues.map((value, index) => (
            <text
              key={index}
              x={20}
              y={yScale(value) + 5}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={10}
            >
              {value}
            </text>
          ))}
        </g>

        <Group>
          {lines.map((line) => (
            <LinePath
              key={line.title}
              data={line.data}
              x={(d, index) =>
                xScale(d.name)! +
                xScale.bandwidth() / 2 +
                (index * width) / 65 -
                25
              }
              y={(d) => yScale(d.value) + 5}
              stroke={line.color}
              strokeWidth={2}
              strokeOpacity={0.8}
            />
          ))}
        </Group>
      </svg>
    </div>
  )
}
