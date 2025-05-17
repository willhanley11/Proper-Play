"use client"

import { useState, useMemo } from "react"
import { HelpCircle, ArrowUpDown, ArrowUp, ArrowDown, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Player statistics data
const playerStats = [
  {
    rank: 1,
    player: "John Smith",
    team: "TEN",
    gp: 15,
    gs: 15,
    min: "33:10",
    pts: 23.4,
    twopm: 6.2,
    twopa: 11.5,
    twop: 53.9,
    threepm: 2.5,
    threepa: 6.4,
    threep: 39.1,
    ftm: 4.5,
    fta: 5.2,
    ft: 86.5,
    or: 1.8,
    dr: 5.0,
    tr: 6.8,
    ast: 5.2,
    stl: 1.6,
    to: 2.3,
    blk: 0.7,
    blka: 0.4,
    fc: 2.1,
    fd: 4.8,
    pir: 25.6,
  },
  {
    rank: 2,
    player: "Marcelinho Huertas",
    team: "TEN",
    gp: 15,
    gs: 15,
    min: "32:18",
    pts: 21.4,
    twopm: 5.2,
    twopa: 9.1,
    twop: 57.1,
    threepm: 2.8,
    threepa: 6.5,
    threep: 43.1,
    ftm: 3.8,
    fta: 4.2,
    ft: 90.5,
    or: 0.9,
    dr: 3.1,
    tr: 4.0,
    ast: 5.2,
    stl: 1.3,
    to: 2.1,
    blk: 0.3,
    blka: 0.2,
    fc: 2.4,
    fd: 4.5,
    pir: 22.8,
  },
  {
    rank: 3,
    player: "Facundo Campazzo",
    team: "RMA",
    gp: 15,
    gs: 15,
    min: "31:42",
    pts: 19.8,
    twopm: 4.8,
    twopa: 8.7,
    twop: 55.2,
    threepm: 2.6,
    threepa: 6.2,
    threep: 41.9,
    ftm: 3.0,
    fta: 3.5,
    ft: 85.7,
    or: 0.7,
    dr: 2.8,
    tr: 3.5,
    ast: 6.1,
    stl: 1.5,
    to: 2.3,
    blk: 0.2,
    blka: 0.3,
    fc: 2.2,
    fd: 3.8,
    pir: 21.5,
  },
  {
    rank: 4,
    player: "Nikola Mirotic",
    team: "BAR",
    gp: 15,
    gs: 14,
    min: "30:55",
    pts: 18.7,
    twopm: 6.1,
    twopa: 10.2,
    twop: 59.8,
    threepm: 1.2,
    threepa: 3.1,
    threep: 38.7,
    ftm: 3.1,
    fta: 4.0,
    ft: 77.5,
    or: 2.8,
    dr: 5.9,
    tr: 8.7,
    ast: 2.1,
    stl: 0.8,
    to: 1.9,
    blk: 1.2,
    blka: 0.5,
    fc: 2.7,
    fd: 3.9,
    pir: 23.4,
  },
  {
    rank: 5,
    player: "Sasu Salin",
    team: "TEN",
    gp: 15,
    gs: 15,
    min: "29:45",
    pts: 17.2,
    twopm: 3.1,
    twopa: 5.8,
    twop: 53.4,
    threepm: 3.0,
    threepa: 7.1,
    threep: 42.3,
    ftm: 2.0,
    fta: 2.3,
    ft: 87.0,
    or: 0.5,
    dr: 2.3,
    tr: 2.8,
    ast: 3.5,
    stl: 1.1,
    to: 1.5,
    blk: 0.1,
    blka: 0.4,
    fc: 1.8,
    fd: 2.5,
    pir: 18.9,
  },
  {
    rank: 6,
    player: "Chima Moneke",
    team: "BAS",
    gp: 15,
    gs: 15,
    min: "31:08",
    pts: 16.9,
    twopm: 4.2,
    twopa: 7.8,
    twop: 53.8,
    threepm: 2.1,
    threepa: 5.3,
    threep: 39.6,
    ftm: 2.3,
    fta: 2.8,
    ft: 82.1,
    or: 1.1,
    dr: 3.5,
    tr: 4.6,
    ast: 4.8,
    stl: 1.7,
    to: 2.5,
    blk: 0.4,
    blka: 0.3,
    fc: 2.1,
    fd: 3.0,
    pir: 19.2,
  },
  {
    rank: 7,
    player: "Gio Shermadini",
    team: "TEN",
    gp: 15,
    gs: 15,
    min: "28:36",
    pts: 16.5,
    twopm: 5.8,
    twopa: 10.1,
    twop: 57.4,
    threepm: 0.5,
    threepa: 1.5,
    threep: 33.3,
    ftm: 3.4,
    fta: 4.5,
    ft: 75.6,
    or: 2.5,
    dr: 5.2,
    tr: 7.7,
    ast: 1.8,
    stl: 0.9,
    to: 2.0,
    blk: 1.5,
    blka: 0.6,
    fc: 2.9,
    fd: 4.2,
    pir: 20.1,
  },
  {
    rank: 8,
    player: "Lorenzo Brown",
    team: "UNI",
    gp: 15,
    gs: 15,
    min: "30:22",
    pts: 16.3,
    twopm: 3.8,
    twopa: 7.2,
    twop: 52.8,
    threepm: 2.5,
    threepa: 6.0,
    threep: 41.7,
    ftm: 1.7,
    fta: 2.0,
    ft: 85.0,
    or: 0.8,
    dr: 3.0,
    tr: 3.8,
    ast: 5.5,
    stl: 1.4,
    to: 1.8,
    blk: 0.2,
    blka: 0.3,
    fc: 1.9,
    fd: 2.2,
    pir: 19.5,
  },
  {
    rank: 9,
    player: "Chris Jones",
    team: "VAL",
    gp: 15,
    gs: 14,
    min: "29:15",
    pts: 15.8,
    twopm: 4.5,
    twopa: 8.3,
    twop: 54.2,
    threepm: 1.8,
    threepa: 4.5,
    threep: 40.0,
    ftm: 1.4,
    fta: 1.8,
    ft: 77.8,
    or: 1.5,
    dr: 4.2,
    tr: 5.7,
    ast: 2.8,
    stl: 1.0,
    to: 1.7,
    blk: 0.7,
    blka: 0.4,
    fc: 2.3,
    fd: 2.0,
    pir: 18.2,
  },
  {
    rank: 10,
    player: "Walter Tavares",
    team: "RMA",
    gp: 15,
    gs: 15,
    min: "28:50",
    pts: 15.5,
    twopm: 5.2,
    twopa: 9.5,
    twop: 54.7,
    threepm: 0.8,
    threepa: 2.3,
    threep: 34.8,
    ftm: 2.7,
    fta: 3.8,
    ft: 71.1,
    or: 2.3,
    dr: 5.8,
    tr: 8.1,
    ast: 1.5,
    stl: 0.7,
    to: 1.9,
    blk: 1.3,
    blka: 0.5,
    fc: 2.8,
    fd: 3.5,
    pir: 19.8,
  },
  {
    rank: 11,
    player: "Bruno Fitipaldo",
    team: "TEN",
    gp: 15,
    gs: 0,
    min: "22:40",
    pts: 14.8,
    twopm: 2.5,
    twopa: 4.8,
    twop: 52.1,
    threepm: 2.8,
    threepa: 6.5,
    threep: 43.1,
    ftm: 1.4,
    fta: 1.6,
    ft: 87.5,
    or: 0.4,
    dr: 1.8,
    tr: 2.2,
    ast: 2.5,
    stl: 0.8,
    to: 1.2,
    blk: 0.1,
    blka: 0.3,
    fc: 1.5,
    fd: 1.7,
    pir: 15.3,
  },
  {
    rank: 12,
    player: "Tomas Satoransky",
    team: "BAR",
    gp: 15,
    gs: 15,
    min: "29:05",
    pts: 14.5,
    twopm: 3.2,
    twopa: 6.1,
    twop: 52.5,
    threepm: 2.3,
    threepa: 5.8,
    threep: 39.7,
    ftm: 1.2,
    fta: 1.5,
    ft: 80.0,
    or: 0.6,
    dr: 2.5,
    tr: 3.1,
    ast: 4.2,
    stl: 1.3,
    to: 1.6,
    blk: 0.2,
    blka: 0.3,
    fc: 1.7,
    fd: 1.8,
    pir: 17.1,
  },
  {
    rank: 13,
    player: "Tyson Perez",
    team: "MUR",
    gp: 15,
    gs: 15,
    min: "30:15",
    pts: 14.2,
    twopm: 3.5,
    twopa: 6.8,
    twop: 51.5,
    threepm: 2.0,
    threepa: 5.2,
    threep: 38.5,
    ftm: 1.2,
    fta: 1.5,
    ft: 80.0,
    or: 0.9,
    dr: 3.2,
    tr: 4.1,
    ast: 3.8,
    stl: 1.2,
    to: 1.7,
    blk: 0.3,
    blka: 0.4,
    fc: 2.0,
    fd: 1.9,
    pir: 16.8,
  },
  {
    rank: 14,
    player: "Aaron Jackson",
    team: "TEN",
    gp: 15,
    gs: 12,
    min: "28:45",
    pts: 12.8,
    twopm: 3.2,
    twopa: 6.1,
    twop: 52.5,
    threepm: 1.8,
    threepa: 4.5,
    threep: 40.0,
    ftm: 1.6,
    fta: 2.0,
    ft: 80.0,
    or: 0.7,
    dr: 2.9,
    tr: 3.6,
    ast: 4.2,
    stl: 1.1,
    to: 1.4,
    blk: 0.2,
    blka: 0.3,
    fc: 1.8,
    fd: 2.1,
    pir: 14.5,
  },
  {
    rank: 15,
    player: "Kyle Wiltjer",
    team: "TEN",
    gp: 15,
    gs: 10,
    min: "24:30",
    pts: 11.5,
    twopm: 2.8,
    twopa: 5.2,
    twop: 53.8,
    threepm: 1.7,
    threepa: 4.2,
    threep: 40.5,
    ftm: 1.5,
    fta: 1.8,
    ft: 83.3,
    or: 1.2,
    dr: 3.8,
    tr: 5.0,
    ast: 1.2,
    stl: 0.5,
    to: 1.1,
    blk: 0.4,
    blka: 0.2,
    fc: 1.6,
    fd: 1.9,
    pir: 12.8,
  },
  {
    rank: 16,
    player: "Tim Abromaitis",
    team: "TEN",
    gp: 15,
    gs: 8,
    min: "22:15",
    pts: 9.8,
    twopm: 2.5,
    twopa: 4.8,
    twop: 52.1,
    threepm: 1.4,
    threepa: 3.5,
    threep: 40.0,
    ftm: 1.0,
    fta: 1.2,
    ft: 83.3,
    or: 1.5,
    dr: 3.2,
    tr: 4.7,
    ast: 1.0,
    stl: 0.6,
    to: 0.9,
    blk: 0.3,
    blka: 0.2,
    fc: 1.5,
    fd: 1.2,
    pir: 11.2,
  },
  {
    rank: 17,
    player: "Fran Guerra",
    team: "TEN",
    gp: 15,
    gs: 0,
    min: "18:20",
    pts: 7.5,
    twopm: 2.8,
    twopa: 5.1,
    twop: 54.9,
    threepm: 0.3,
    threepa: 0.8,
    threep: 37.5,
    ftm: 1.0,
    fta: 1.5,
    ft: 66.7,
    or: 1.8,
    dr: 2.5,
    tr: 4.3,
    ast: 0.8,
    stl: 0.4,
    to: 0.8,
    blk: 0.6,
    blka: 0.3,
    fc: 1.9,
    fd: 1.5,
    pir: 9.5,
  },
  {
    rank: 18,
    player: "Elgin Cook",
    team: "TEN",
    gp: 15,
    gs: 0,
    min: "16:45",
    pts: 6.2,
    twopm: 2.1,
    twopa: 3.8,
    twop: 55.3,
    threepm: 0.4,
    threepa: 1.2,
    threep: 33.3,
    ftm: 0.8,
    fta: 1.2,
    ft: 66.7,
    or: 1.2,
    dr: 1.8,
    tr: 3.0,
    ast: 0.6,
    stl: 0.5,
    to: 0.7,
    blk: 0.2,
    blka: 0.1,
    fc: 1.2,
    fd: 1.0,
    pir: 7.8,
  },
]

interface StatisticsTabProps {
  playerSearch: string
  onPlayerSearchChange: (value: string) => void
}

export default function StatisticsTab({ playerSearch, onPlayerSearchChange }: StatisticsTabProps) {
  const [viewMode, setViewMode] = useState<"avg" | "per40" | "total">("avg")
  const [sortColumn, setSortColumn] = useState<string>("rank")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchQuery, setSearchQuery] = useState("")
  const [playerStatsMode, setPlayerStatsMode] = useState("avg") // "avg", "per40", "total"
  const [playerSortColumn, setPlayerSortColumn] = useState("pts")
  const [playerSortDirection, setPlayerSortDirection] = useState("desc")
  const [playerSearchQuery, setPlayerSearchQuery] = useState("")
  const [selectedTeam, setSelectedTeam] = useState("TEN")

  // Calculate player stats based on the selected view mode
  const calculatePlayerStats = (player, mode) => {
    if (mode === "avg") {
      return player // Current stats are already averages
    } else if (mode === "per40") {
      // Extract minutes as a number (format is "MM:SS")
      const minutesParts = player.min.split(":")
      const minutes = Number.parseFloat(minutesParts[0]) + Number.parseFloat(minutesParts[1]) / 60
      const factor = 40 / minutes

      return {
        ...player,
        pts: +(player.pts * factor).toFixed(1),
        twopm: +(player.twopm * factor).toFixed(1),
        twopa: +(player.twopa * factor).toFixed(1),
        threepm: +(player.threepm * factor).toFixed(1),
        threepa: +(player.threepa * factor).toFixed(1),
        ftm: +(player.ftm * factor).toFixed(1),
        fta: +(player.fta * factor).toFixed(1),
        or: +(player.or * factor).toFixed(1),
        dr: +(player.dr * factor).toFixed(1),
        tr: +(player.tr * factor).toFixed(1),
        ast: +(player.ast * factor).toFixed(1),
        stl: +(player.stl * factor).toFixed(1),
        to: +(player.to * factor).toFixed(1),
        blk: +(player.blk * factor).toFixed(1),
        blka: +(player.blka * factor).toFixed(1),
        fc: +(player.fc * factor).toFixed(1),
        fd: +(player.fd * factor).toFixed(1),
        pir: +(player.pir * factor).toFixed(1),
      }
    } else if (mode === "total") {
      return {
        ...player,
        pts: +(player.pts * player.gp).toFixed(0),
        twopm: +(player.twopm * player.gp).toFixed(0),
        twopa: +(player.twopa * player.gp).toFixed(0),
        threepm: +(player.threepm * player.gp).toFixed(0),
        threepa: +(player.threepa * player.gp).toFixed(0),
        ftm: +(player.ftm * player.gp).toFixed(0),
        fta: +(player.fta * player.gp).toFixed(0),
        or: +(player.or * player.gp).toFixed(0),
        dr: +(player.dr * player.gp).toFixed(0),
        tr: +(player.tr * player.gp).toFixed(0),
        ast: +(player.ast * player.gp).toFixed(0),
        stl: +(player.stl * player.gp).toFixed(0),
        to: +(player.to * player.gp).toFixed(0),
        blk: +(player.blk * player.gp).toFixed(0),
        blka: +(player.blka * player.gp).toFixed(0),
        fc: +(player.fc * player.gp).toFixed(0),
        fd: +(player.fd * player.gp).toFixed(0),
        pir: +(player.pir * player.gp).toFixed(0),
      }
    }
    return player
  }

  // Filter and sort players
  const filteredAndSortedPlayers = useMemo(() => {
    // First filter by search query
    const filtered = playerStats.filter(
      (player) =>
        player.player.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.team.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    // Then sort by the selected column
    return filtered
      .map((player) => calculatePlayerStats(player, viewMode))
      .sort((a, b) => {
        const aValue = a[sortColumn]
        const bValue = b[sortColumn]

        // Handle string comparisons
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }

        // Handle numeric comparisons
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      })
  }, [playerStats, searchQuery, sortColumn, sortDirection, viewMode])

  // Filter players based on search query
  const filteredPlayers = useMemo(() => {
    return playerStats.filter(
      (player) =>
        player.player.toLowerCase().includes(playerSearchQuery.toLowerCase()) ||
        player.team.toLowerCase().includes(playerSearchQuery.toLowerCase()),
    )
  }, [playerStats, playerSearchQuery])

  // Sort players based on selected column and direction
  const sortedPlayers = useMemo(() => {
    return [...filteredPlayers]
      .sort((a, b) => {
        const aValue = a[playerSortColumn]
        const bValue = b[playerSortColumn]

        if (playerSortDirection === "desc") {
          return bValue - aValue
        } else {
          return aValue - bValue
        }
      })
      .map((player) => calculatePlayerStats(player, playerStatsMode))
  }, [filteredPlayers, playerSortColumn, playerSortDirection, playerStatsMode])

  // Handle column header click for sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new column and default to ascending
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Function to handle player column header clicks for sorting
  const handlePlayerSort = (column) => {
    if (playerSortColumn === column) {
      // Toggle direction if clicking the same column
      setPlayerSortDirection(playerSortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new column and default to descending
      setPlayerSortColumn(column)
      setPlayerSortDirection("desc")
    }
  }

  // Render sort indicator
  const renderSortIndicator = (column: string) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="h-4 w-4 ml-1 inline-block text-gray-400" />
    }

    return sortDirection === "desc" ? (
      <ArrowDown className="h-4 w-4 ml-1 inline-block text-blue-600" />
    ) : (
      <ArrowUp className="h-4 w-4 ml-1 inline-block text-blue-600" />
    )
  }

  // Function to render player sort indicator
  const renderPlayerSortIndicator = (column) => {
    if (playerSortColumn !== column) {
      return <ArrowUpDown className="h-4 w-4 ml-1 inline-block text-gray-400" />
    }

    return playerSortDirection === "desc" ? (
      <ArrowDown className="h-4 w-4 ml-1 inline-block text-blue-600" />
    ) : (
      <ArrowUp className="h-4 w-4 ml-1 inline-block text-blue-600" />
    )
  }

  return (
    <div className="bg-white rounded-md p-4 border shadow-lg mt-8">
      {/* Player Roster Table */}

      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">Player Statistics</h3>
            <HelpCircle className="h-5 w-5 text-gray-400" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex rounded-full bg-gray-100 p-0.5">
              <button
                onClick={() => setViewMode("avg")}
                className={`rounded-full px-6 py-1.5 text-sm font-medium transition-colors ${
                  viewMode === "avg" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Avg
              </button>
              <button
                onClick={() => setViewMode("per40")}
                className={`rounded-full px-6 py-1.5 text-sm font-medium transition-colors ${
                  viewMode === "per40" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Per 40
              </button>
              <button
                onClick={() => setViewMode("total")}
                className={`rounded-full px-6 py-1.5 text-sm font-medium transition-colors ${
                  viewMode === "total" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Total
              </button>
            </div>

            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search players or teams..."
                className="pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto relative">
          <table className="w-full text-xs border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="border-b-2 border-t-2 border-gray-700 bg-gray-50 h-10">
                <th
                  className={`sticky left-0 z-20 bg-gray-50 text-left py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300 min-w-[250px]`}
                  onClick={() => handleSort("player")}
                >
                  <div className="flex items-center">Player {renderSortIndicator("player")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("team")}
                >
                  <div className="flex items-center justify-center">Team {renderSortIndicator("team")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("gp")}
                >
                  <div className="flex items-center justify-center">GP {renderSortIndicator("gp")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("gs")}
                >
                  <div className="flex items-center justify-center">GS {renderSortIndicator("gs")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("min")}
                >
                  <div className="flex items-center justify-center">MIN {renderSortIndicator("min")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("pts")}
                >
                  <div className="flex items-center justify-center">PTS {renderSortIndicator("pts")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("twopm")}
                >
                  <div className="flex items-center justify-center">2PM {renderSortIndicator("twopm")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("twopa")}
                >
                  <div className="flex items-center justify-center">2PA {renderSortIndicator("twopa")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("twop")}
                >
                  <div className="flex items-center justify-center">2P% {renderSortIndicator("twop")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("threepm")}
                >
                  <div className="flex items-center justify-center">3PM {renderSortIndicator("threepm")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("threepa")}
                >
                  <div className="flex items-center justify-center">3PA {renderSortIndicator("threepa")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("threep")}
                >
                  <div className="flex items-center justify-center">3P% {renderSortIndicator("threep")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("ftm")}
                >
                  <div className="flex items-center justify-center">FTM {renderSortIndicator("ftm")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("fta")}
                >
                  <div className="flex items-center justify-center">FTA {renderSortIndicator("fta")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("ft")}
                >
                  <div className="flex items-center justify-center">FT% {renderSortIndicator("ft")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("or")}
                >
                  <div className="flex items-center justify-center">OR {renderSortIndicator("or")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("dr")}
                >
                  <div className="flex items-center justify-center">DR {renderSortIndicator("dr")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("tr")}
                >
                  <div className="flex items-center justify-center">TR {renderSortIndicator("tr")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("ast")}
                >
                  <div className="flex items-center justify-center">AST {renderSortIndicator("ast")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("stl")}
                >
                  <div className="flex items-center justify-center">STL {renderSortIndicator("stl")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("to")}
                >
                  <div className="flex items-center justify-center">TO {renderSortIndicator("to")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("blk")}
                >
                  <div className="flex items-center justify-center">BLK {renderSortIndicator("blk")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("blka")}
                >
                  <div className="flex items-center justify-center">BLKA {renderSortIndicator("blka")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("fc")}
                >
                  <div className="flex items-center justify-center">FC {renderSortIndicator("fc")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleSort("fd")}
                >
                  <div className="flex items-center justify-center">FD {renderSortIndicator("fd")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("pir")}
                >
                  <div className="flex items-center justify-center">PIR {renderSortIndicator("pir")}</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedPlayers.map((player, index) => (
                <tr
                  key={index}
                  className={`border-b-2 ${
                    player.player === "John Smith"
                      ? "bg-teal-400/20 border-l-4 border-l-teal-400"
                      : index % 2 === 0
                        ? "bg-white"
                        : "bg-white"
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td
                    className={`sticky left-0 z-10 py-1 px-2 font-medium border-r border-gray-200 ${
                      player.player === "John Smith" ? "bg-teal-400/20" : index % 2 === 0 ? "bg-white" : "bg-white"
                    }`}
                  >
                    {player.player}
                  </td>
                  <td className="py-1 px-2 text-center border-r border-gray-200">{player.team}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.gp}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.gs}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.min}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.pts}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.twopm}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.twopa}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.twop}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.threepm}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.threepa}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.threep}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.ftm}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.fta}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.ft}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.or}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.dr}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.tr}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.ast}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.stl}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.to}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.blk}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.blka}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.fc}</td>
                  <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.fd}</td>
                  <td className="py-1 px-2 text-center font-mono">{player.pir}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
