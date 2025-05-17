"use client"

import { useState } from "react"
import { MySeasonNav } from "./my-season-nav"
import OffenseTab from "./my-season/offense-tab"
import ComparisonTab from "./my-season/comparison-tab"
import ShotChartTab from "./my-season/shot-chart-tab"

export function MySeasonContent() {
  const [activeTab, setActiveTab] = useState("offense")

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className="relative">
      <div className="container mx-auto p-4">
        <MySeasonNav activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="mt-8 px-0 relative z-2">
          {activeTab === "offense" && <OffenseTab />}
          {activeTab === "defense" && <ShotChartTab />}
          {activeTab === "impact" && <ComparisonTab />}
        </div>
      </div>
    </div>
  )
}
