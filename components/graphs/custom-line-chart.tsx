import React, { PureComponent } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface DataKey {
  keyName: string
  color: string
}

interface CustomLineChartProps {
  dataKeys: DataKey[]
  data: object[]
}

function CustomLineChart({ data, dataKeys }: CustomLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        height={257}
        width={1150}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="name" tickLine={false} padding={{ left: 40 }} />
        <YAxis
          orientation="right"
          tickLine={false}
          padding={{ top: 10, bottom: 10 }}
        />
        <Tooltip />
        {dataKeys.map((dataKey) => (
          <Line
            key={dataKey.keyName}
            type="linear"
            dot={false}
            dataKey={dataKey.keyName}
            strokeWidth={2}
            isAnimationActive={false}
            stroke={dataKey.color}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
