"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartTooltip } from "@/components/ui/chart"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ZAxis, ResponsiveContainer, ReferenceLine } from "recharts"
import Image from "next/image"

// Sample player data with stats and images
const playerData = [
  {
    id: 1,
    name: "LeBron James",
    ppg: 26.5,
    ts: 65.2,
    fg3pct: 41.0,
    ast: 8.3,
    reb: 7.5,
    stl: 1.3,
    blk: 0.5,
    min: 35.2,
    pir: 24.8,
    image: "/basketball-player-action.png",
  },
  {
    id: 2,
    name: "Stephen Curry",
    ppg: 26.8,
    ts: 67.5,
    fg3pct: 43.5,
    ast: 5.1,
    reb: 4.3,
    stl: 0.9,
    blk: 0.2,
    min: 33.5,
    pir: 22.6,
    image: "/basketball-player-action.png",
  },
  {
    id: 3,
    name: "Nikola Jokić",
    ppg: 25.3,
    ts: 66.8,
    fg3pct: 37.8,
    ast: 10.2,
    reb: 12.5,
    stl: 1.1,
    blk: 0.8,
    min: 34.8,
    pir: 32.5,
    image: "/basketball-player-action.png",
  },
  {
    id: 4,
    name: "Giannis Antetokounmpo",
    ppg: 30.2,
    ts: 64.5,
    fg3pct: 28.5,
    ast: 6.5,
    reb: 11.2,
    stl: 1.2,
    blk: 1.1,
    min: 33.2,
    pir: 29.8,
    image: "/basketball-player-action.png",
  },
  {
    id: 5,
    name: "Luka Dončić",
    ppg: 33.5,
    ts: 62.1,
    fg3pct: 38.2,
    ast: 9.8,
    reb: 9.2,
    stl: 1.4,
    blk: 0.5,
    min: 37.5,
    pir: 31.2,
    image: "/basketball-player-action.png",
  },
  {
    id: 6,
    name: "Joel Embiid",
    ppg: 31.8,
    ts: 65.8,
    fg3pct: 35.1,
    ast: 5.7,
    reb: 11.8,
    stl: 1.1,
    blk: 1.7,
    min: 34.0,
    pir: 30.5,
    image: "/basketball-player-action.png",
  },
  {
    id: 7,
    name: "Kevin Durant",
    ppg: 28.3,
    ts: 63.5,
    fg3pct: 40.2,
    ast: 5.2,
    reb: 6.8,
    stl: 0.8,
    blk: 1.2,
    min: 36.2,
    pir: 25.3,
    image: "/basketball-player-action.png",
  },
  {
    id: 8,
    name: "Jayson Tatum",
    ppg: 27.5,
    ts: 60.2,
    fg3pct: 37.5,
    ast: 4.9,
    reb: 8.5,
    stl: 1.0,
    blk: 0.7,
    min: 36.5,
    pir: 24.2,
    image: "/basketball-player-action.png",
  },
  {
    id: 9,
    name: "Ja Morant",
    ppg: 25.8,
    ts: 58.5,
    fg3pct: 32.5,
    ast: 8.1,
    reb: 5.9,
    stl: 1.1,
    blk: 0.3,
    min: 32.8,
    pir: 22.8,
    image: "/basketball-player-action.png",
  },
  {
    id: 10,
    name: "Damian Lillard",
    ppg: 28.2,
    ts: 62.8,
    fg3pct: 39.8,
    ast: 7.3,
    reb: 4.2,
    stl: 0.9,
    blk: 0.3,
    min: 35.8,
    pir: 23.5,
    image: "/basketball-player-action.png",
  },
  {
    id: 11,
    name: "Devin Booker",
    ppg: 27.1,
    ts: 59.8,
    fg3pct: 36.5,
    ast: 6.8,
    reb: 4.5,
    stl: 1.0,
    blk: 0.4,
    min: 34.5,
    pir: 21.8,
    image: "/basketball-player-action.png",
  },
  {
    id: 12,
    name: "Trae Young",
    ppg: 26.5,
    ts: 57.2,
    fg3pct: 35.8,
    ast: 10.5,
    reb: 3.0,
    stl: 1.1,
    blk: 0.1,
    min: 35.0,
    pir: 22.5,
    image: "/basketball-player-action.png",
  },
  {
    id: 13,
    name: "Anthony Edwards",
    ppg: 25.9,
    ts: 58.0,
    fg3pct: 36.2,
    ast: 5.1,
    reb: 5.5,
    stl: 1.3,
    blk: 0.5,
    min: 35.5,
    pir: 21.2,
    image: "/basketball-player-action.png",
  },
  {
    id: 14,
    name: "Donovan Mitchell",
    ppg: 28.0,
    ts: 61.5,
    fg3pct: 38.5,
    ast: 6.2,
    reb: 5.0,
    stl: 1.8,
    blk: 0.4,
    min: 35.2,
    pir: 24.5,
    image: "/basketball-player-action.png",
  },
  {
    id: 15,
    name: "Shai Gilgeous-Alexander",
    ppg: 30.5,
    ts: 63.8,
    fg3pct: 34.5,
    ast: 6.3,
    reb: 5.8,
    stl: 2.0,
    blk: 0.9,
    min: 34.8,
    pir: 28.2,
    image: "/basketball-player-action.png",
  },
]

// Define available metrics for axes
const metrics = [
  { value: "ppg", label: "Points Per Game (PPG)" },
  { value: "ts", label: "True Shooting % (TS%)" },
  { value: "fg3pct", label: "3PT %" },
  { value: "ast", label: "Assists" },
  { value: "reb", label: "Rebounds" },
  { value: "stl", label: "Steals" },
  { value: "blk", label: "Blocks" },
  { value: "min", label: "Minutes" },
  { value: "pir", label: "Performance Index Rating" },
]

// Custom scatter point with player image
const CustomScatterPoint = (props: any) => {
  const { cx, cy, payload } = props

  // Check if all required properties exist
  if (!cx || !cy || !payload) {
    return null
  }

  return (
    <foreignObject x={cx - 30} y={cy - 30} width={60} height={60}>
      <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md">
        <Image
          src={payload.image || "/placeholder.svg?height=60&width=60&query=basketball player"}
          alt={payload.name || "Player"}
          width={60}
          height={60}
          className="w-full h-full object-cover"
        />
      </div>
    </foreignObject>
  )
}

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length && payload[0].payload) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-200">
        <p className="font-bold text-sm">{data.name}</p>
        <div className="text-xs text-gray-600 mt-1">
          <p>
            {metrics.find((m) => m.value === payload[0].name)?.label}: {data[payload[0].name]}
          </p>
          <p>
            {metrics.find((m) => m.value === payload[1]?.name)?.label}: {data[payload[1]?.name]}
          </p>
        </div>
      </div>
    )
  }
  return null
}

export default function ShotChartTab() {
  const [xAxis, setXAxis] = useState("ppg")
  const [yAxis, setYAxis] = useState("ts")

  // Calculate averages for reference lines
  const xAvg =
    playerData.reduce((sum, player) => sum + (player[xAxis as keyof typeof player] as number), 0) / playerData.length
  const yAvg =
    playerData.reduce((sum, player) => sum + (player[yAxis as keyof typeof player] as number), 0) / playerData.length

  // Format data for the chart
  const formattedData = playerData.map((player) => ({
    ...player,
    [xAxis]: player[xAxis as keyof typeof player],
    [yAxis]: player[yAxis as keyof typeof player],
  }))

  return (
    <div className="space-y-6">
      <Card className="rounded-xl">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-xl font-bold">Player Performance Visualization</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">X-Axis</label>
                <Select value={xAxis} onValueChange={setXAxis}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    {metrics.map((metric) => (
                      <SelectItem key={metric.value} value={metric.value}>
                        {metric.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Y-Axis</label>
                <Select value={yAxis} onValueChange={setYAxis}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    {metrics.map((metric) => (
                      <SelectItem key={metric.value} value={metric.value}>
                        {metric.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[600px] w-full bg-[#1e2a5a] rounded-lg p-4">
            <div className="text-white text-xl font-bold mb-1">
              LEADERS IN {metrics.find((m) => m.value === xAxis)?.label.toUpperCase()} +{" "}
              {metrics.find((m) => m.value === yAxis)?.label.toUpperCase()}
            </div>
            <div className="text-white/80 text-sm mb-4">Top players in the league (Min 10 GP)</div>
            <ResponsiveContainer width="100%" height="90%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                <XAxis type="number" dataKey={xAxis} name={xAxis} stroke="white" tick={{ fill: "white" }} />
                <YAxis type="number" dataKey={yAxis} name={yAxis} stroke="white" tick={{ fill: "white" }} />
                <ZAxis range={[100, 100]} />
                <ChartTooltip content={<CustomTooltip />} />
                <ReferenceLine
                  y={yAvg}
                  stroke="#4ade80"
                  strokeDasharray="3 3"
                  strokeWidth={2}
                  label={{
                    value: "Group Average",
                    position: "right",
                    fill: "#4ade80",
                    fontSize: 12,
                  }}
                />
                <ReferenceLine x={xAvg} stroke="#4ade80" strokeDasharray="3 3" strokeWidth={2} />
                <Scatter name="Players" data={formattedData} shape={<CustomScatterPoint />} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
