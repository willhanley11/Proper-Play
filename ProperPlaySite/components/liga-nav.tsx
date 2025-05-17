"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"

interface LigaNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
  activeSection: string
  activeLeague: string
}

// Map of league IDs to display names and flags
const leagueInfo = {
  "spain-liga-acb": { name: "Liga ACB", country: "Spain", flag: "🇪🇸", division: "1st Division" },
  "italy-lega-basket": { name: "Lega Basket", country: "Italy", flag: "🇮🇹", division: "1st Division" },
  "france-lnb": { name: "LNB Pro A", country: "France", flag: "🇫🇷", division: "1st Division" },
  "germany-bbl": { name: "Basketball Bundesliga", country: "Germany", flag: "🇩🇪", division: "1st Division" },
  "greece-basket-league": { name: "Basket League", country: "Greece", flag: "🇬🇷", division: "1st Division" },
}

// Available seasons
const seasons = ["2024-25 Season", "2023-24 Season", "2022-23 Season", "2021-22 Season", "2020-21 Season"]

export function LigaNav({ activeTab, onTabChange, activeSection, activeLeague }: LigaNavProps) {
  const league = leagueInfo[activeLeague] || { name: "League", country: "", flag: "", division: "" }
  const [isSeasonDropdownOpen, setIsSeasonDropdownOpen] = useState(false)
  const [selectedSeason, setSelectedSeason] = useState(seasons[0])
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSeasonDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle season selection
  const handleSeasonSelect = (season: string) => {
    setSelectedSeason(season)
    setIsSeasonDropdownOpen(false)
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          {activeSection === "league-section" ? (
            // League section with league name and tabs
            <>
              <div className="flex items-center pr-6 border-r border-gray-200 mr-3">
                <div className="flex items-start py-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-50 mr-3 border border-indigo-200">
                    <span className="text-2xl">{league.flag}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-gray-900 leading-tight">{league.name}</span>
                    <div className="flex items-center text-xs text-gray-500 mt-0.5">
                      <span>{league.country}</span>
                      <span className="mx-1.5">•</span>
                      <span>{league.division}</span>
                    </div>
                  </div>
                </div>
              </div>
              <nav className="flex">
                <button
                  onClick={() => onTabChange("teams")}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === "teams" ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Teams
                  {activeTab === "teams" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                  )}
                </button>
                <button
                  onClick={() => onTabChange("standings")}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === "standings" ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Standings
                  {activeTab === "standings" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                  )}
                </button>
                <button
                  onClick={() => onTabChange("visuals")}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === "visuals" ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Visuals
                  {activeTab === "visuals" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                  )}
                </button>
              </nav>
            </>
          ) : (
            // Players section tabs
            <>
              <div className="flex items-center pr-6 border-r border-gray-200 mr-3">
                <div className="flex items-start py-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-50 mr-3 border border-indigo-200">
                    <span className="text-2xl">{league.flag}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-gray-900 leading-tight">{league.name}</span>
                    <div className="flex items-center text-xs text-gray-500 mt-0.5">
                      <span>{league.country}</span>
                      <span className="mx-1.5">•</span>
                      <span>{league.division}</span>
                    </div>
                  </div>
                </div>
              </div>
              <nav className="flex">
                <button
                  onClick={() => onTabChange("statistics")}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === "statistics" ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Statistics
                  {activeTab === "statistics" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                  )}
                </button>
                <button
                  onClick={() => onTabChange("players")}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === "players" ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Profiles
                  {activeTab === "players" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                  )}
                </button>
                <button
                  onClick={() => onTabChange("comparison")}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === "comparison" ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Comparison
                  {activeTab === "comparison" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                  )}
                </button>
              </nav>
            </>
          )}
        </div>
        <div className="pr-3 relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 px-3 py-1.5 rounded-md border border-indigo-200 text-xs font-medium text-indigo-700 shadow-sm hover:from-indigo-100 hover:to-purple-100 transition-all"
            onClick={() => setIsSeasonDropdownOpen(!isSeasonDropdownOpen)}
            aria-haspopup="true"
            aria-expanded={isSeasonDropdownOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-calendar"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            {selectedSeason}
            <ChevronDown size={14} className={`transition-transform ${isSeasonDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {isSeasonDropdownOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg border border-indigo-200 z-10 overflow-hidden">
              <ul className="py-1" role="menu" aria-orientation="vertical">
                {seasons.map((season) => (
                  <li key={season}>
                    <button
                      className={`w-full text-left px-4 py-2 text-xs ${
                        selectedSeason === season
                          ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 font-medium"
                          : "text-gray-700 hover:bg-indigo-50"
                      }`}
                      onClick={() => handleSeasonSelect(season)}
                      role="menuitem"
                    >
                      {season}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
