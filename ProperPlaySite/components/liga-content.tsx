"use client"

import { useState, useEffect, useCallback } from "react"
import React, { Suspense } from "react"
import { LigaNav } from "./liga-nav"

// Lazy imports for better performance
const OffenseTab = React.lazy(() => import("./my-season/offense-tab"))
const ShotChartTab = React.lazy(() => import("./my-season/shot-chart-tab"))
const ComparisonTab = React.lazy(() => import("./my-season/comparison-tab"))
const YamagataTeamStats = React.lazy(() => import("./yamagata-team-stats"))
const StatisticsTab = React.lazy(() => import("./statistics-tab"))

interface LigaContentProps {
  activeSection: string
  activeLeague: string
  initialTab?: string
}

// Add a loading component
const LoadingFallback = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
  </div>
)

export function LigaContent({ activeSection, activeLeague, initialTab }: LigaContentProps) {
  // Set default initial tab based on active section
  const defaultTab = activeSection === "league-section" ? "standings" : "statistics"
  const [activeTab, setActiveTab] = useState(initialTab || defaultTab)
  const [shouldScrollTop, setShouldScrollTop] = useState(false)
  const [playerNameSearch, setPlayerNameSearch] = useState("")
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  const [playerSearchQuery, setPlayerSearchQuery] = useState("")
  const [filteredPlayerImages, setFilteredPlayerImages] = useState<any[]>([])

  // Mock player data for demonstration
  const mockPlayers = [
    { id: 1, name: "Marcelinho", image: null, initials: "MH" },
    { id: 2, name: "Facundo", image: null, initials: "FC" },
    { id: 3, name: "Nikola", image: null, initials: "NM" },
    { id: 4, name: "Sasu", image: null, initials: "SS" },
    { id: 5, name: "John", image: null, initials: "JS" },
  ]

  // Filter players based on search query
  useEffect(() => {
    if (playerNameSearch.trim() === "") {
      setFilteredPlayerImages(mockPlayers)
    } else {
      const filtered = mockPlayers.filter((player) =>
        player.name.toLowerCase().includes(playerNameSearch.toLowerCase()),
      )
      setFilteredPlayerImages(filtered)
    }
  }, [playerNameSearch])

  // Update activeTab when activeSection changes (but not on every initialTab change)
  useEffect(() => {
    if (activeSection === "league-section" && !["standings", "teams", "visuals"].includes(activeTab)) {
      setActiveTab("standings")
    } else if (activeSection === "players-section" && !["statistics", "players", "comparison"].includes(activeTab)) {
      setActiveTab("statistics")
    }
  }, [activeSection, activeTab])

  // Only set activeTab from initialTab on first render
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab)
    }
  }, []) // Empty dependency array means this only runs once

  // Replace the existing useEffect for scrolling with this optimized version
  useEffect(() => {
    if (shouldScrollTop) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: "auto", // Use 'auto' instead of 'instant' for better performance
        })
        setShouldScrollTop(false)
      })
    }
  }, [shouldScrollTop])

  // Handle tab change from nav
  const handleTabChange = useCallback((tab: string) => {
    console.log("Tab changed to:", tab) // Debug log
    setActiveTab(tab)
    setShouldScrollTop(true)
  }, [])

  return (
    <div className="relative">
      <div className="container mx-auto px-4 pt-4 pb-0">
        <LigaNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
          activeSection={activeSection}
          activeLeague={activeLeague}
        />

        {/* League section tabs */}
        {activeSection === "league-section" && (
          <div className="mt-0">
            <Suspense fallback={<LoadingFallback />}>
              {activeTab === "standings" && <YamagataTeamStats key="standings" initialTab="league" hideNav={true} />}
              {activeTab === "teams" && <YamagataTeamStats key="teams" initialTab="teams" hideNav={true} />}
              {activeTab === "visuals" && <ShotChartTab />}
            </Suspense>
          </div>
        )}

        {/* Players section tabs */}
        {activeSection === "players-section" && (
          <div className="mt-4">
            <Suspense fallback={<LoadingFallback />}>
              {activeTab === "statistics" && (
                <StatisticsTab playerSearch={playerNameSearch} onPlayerSearchChange={setPlayerNameSearch} />
              )}
              {activeTab === "players" && (
                <StatisticsTab playerSearch={playerNameSearch} onPlayerSearchChange={setPlayerNameSearch} />
              )}
              {activeTab === "comparison" && <ComparisonTab />}
            </Suspense>
          </div>
        )}
      </div>
    </div>
  )
}
