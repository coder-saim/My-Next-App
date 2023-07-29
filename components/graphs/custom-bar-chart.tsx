import React, { PureComponent } from "react"
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface DataPoint {
  name: string
  value: number
  color: string // Hex value
}

interface SingleDataPointGraph {
  chartTitle?: string
  data: DataPoint[]
}

interface CustomBarChartProps {
  data: DataPoint[]
}

const CustomBarChart = ({ data }: CustomBarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart height={257} width={1150} data={data}>
        <XAxis dataKey="name" angle={270} spacing={40} type="category" />
        <YAxis
          type="number"
          domain={[(dataMin) => 0, (dataMax) => dataMax * 1.2]}
        />
        <Bar dataKey="value" fill="#8884d8" isAnimationActive={false}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export { CustomBarChart }
