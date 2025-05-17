"use client"
import { useState, useMemo, useEffect } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { HelpCircle, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import React from "react"
import { LigaNav } from "./liga-nav"

// Add the team logo mapping
export const team_logo_mapping_2024_2025 = {
  ZAL: "https://media-cdn.incrowdsports.com/0aa09358-3847-4c4e-b228-3582ee4e536d.png?width=180&height=180&resizeType=fill&format=webp",
  MAD: "https://media-cdn.incrowdsports.com/601c92bf-90e4-4b43-9023-bd6946e34143.png?crop=244:244:nowe:0:0",
  BAR: "https://media-cdn.incrowdsports.com/35dfa503-e417-481f-963a-bdf6f013763e.png?crop=511%3A511%3Anowe%3A1%3A0",
  OLY: "https://media-cdn.incrowdsports.com/789423ac-3cdf-4b89-b11c-b458aa5f59a6.png?crop=512:512:nowe:0:0",
  PAN: "https://media-cdn.incrowdsports.com/e3dff28a-9ec6-4faf-9d96-ecbc68f75780.png?crop=512%3A512%3Anowe%3A0%3A0",
  ULK: "https://media-cdn.incrowdsports.com/f7699069-e207-43b7-8c8e-f61e39cb0141.png?crop=512:512:nowe:0:0",
  IST: "https://media-cdn.incrowdsports.com/8ea8cec7-d8f7-45f4-a956-d976b5867610.png?crop=463:463:nowe:22:25",
  TEL: "https://media-cdn.incrowdsports.com/5c55ef14-29df-4328-bd52-a7a64c432350.png?width=180&height=180&resizeType=fill&format=webp",
  MIL: "https://media-cdn.incrowdsports.com/8154f184-c61a-4e7f-b14d-9d802e35cb95.png?width=180&height=180&resizeType=fill&format=webp",
  MUN: "https://media-cdn.incrowdsports.com/817b0e58-d595-4b09-ab0b-1e7cc26249ff.png?crop=192%3A192%3Anowe%3A0%3A0",
  ASV: "https://media-cdn.incrowdsports.com/e33c6d1a-95ca-4dbc-b8cb-0201812104cc.png?width=180&height=180&resizeType=fill&format=webp",
  BER: "https://media-cdn.incrowdsports.com/ccc34858-22b0-47dc-904c-9940b0a16ff3.png?width=180&height=180&resizeType=fill&format=webp",
  RED: "https://media-cdn.incrowdsports.com/26b7b829-6e40-4da9-a297-abeedb6441df.svg",
  BAS: "https://media-cdn.incrowdsports.com/e324a6af-2a72-443e-9813-8bf2d364ddab.png",
  VIR: "https://media-cdn.incrowdsports.com/4af5e83b-f2b5-4fba-a87c-1f85837a508a.png?crop=512%3A512%3Anowe%3A0%3A0",
  PAR: "https://media-cdn.incrowdsports.com/ead471d0-93d8-4fb9-bfec-41bb767c828d.png",
  PRS: "https://media-cdn.incrowdsports.com/a033e5b3-0de7-48a3-98d9-d9a4b9df1f39.png?width=180&height=180&resizeType=fill&format=webp",
  MCO: "https://media-cdn.incrowdsports.com/89ed276a-2ba3-413f-8ea2-b3be209ca129.png?crop=512:512:nowe:0:0",
}

// Add the Euroleague team colors mapping
export const euroleague_team_colors = {
  BER: "#ffe14d", // ALBA Berlin - Softer yellow
  IST: "#3379bd", // Anadolu Efes - Softer royal blue
  MCO: "#d44150", // Monaco - Softer red
  BAS: "#3773b3", // Baskonia - Softer navy blue
  RED: "#e75a6b", // Crvena Zvezda - Softer red
  MIL: "#ff5e75", // Milan - Softer red with pink tone
  BAR: "#3674b5", // Barcelona - Softer deep blue
  MUN: "#c54960", // Bayern - Softer burgundy
  ULK: "#ffd54d", // Fenerbahce - Softer golden yellow
  ASV: "#a3a6a9", // ASVEL - Softer gray
  TEL: "#ffc966", // Maccabi - Softer golden orange
  OLY: "#e66464", // Olympiacos - Softer red
  PAN: "#338855", // Panathinaikos - Softer dark green
  PRS: "#5d6772", // Paris - Softer slate
  PAR: "#4f4d48", // Partizan - Softer black-gray
  MAD: "#c0c0c0", // Real Madrid - Silver instead of white
  VIR: "#454545", // Virtus - Softer black
  ZAL: "#339966", // Zalgiris - Softer kelly green
}

// Replace the teamNameToCode mapping with the Euroleague teams
export const teamNameToCode = {
  "Zalgiris Kaunas": "ZAL",
  "FC Bayern Munich": "MUN",
  "Maccabi Playtika Tel Aviv": "TEL",
  "ALBA Berlin": "BER",
  "Paris Basketball": "PRS",
  "LDLC ASVEL Villeurbanne": "ASV",
  "EA7 Emporio Armani Milan": "MIL",
  "Panathinaikos AKTOR Athens": "PAN",
  "Baskonia Vitoria-Gasteiz": "BAS",
  "FC Barcelona": "BAR",
  "Fenerbahce Beko Istanbul": "ULK",
  "Virtus Segafredo Bologna": "VIR",
  "AS Monaco": "MCO",
  "Real Madrid": "MAD",
  "Olympiacos Piraeus": "OLY",
  "Anadolu Efes Istanbul": "IST",
  "Partizan Mozzart Bet Belgrade": "PAR",
  "Crvena Zvezda Meridianbet Belgrade": "RED",
}

// Player images data
export const playerImages = [
  {
    id: 1,
    name: "Marcelinho Huertas",
    team: "TEN",
    image: "https://media-cdn.incrowdsports.com/9e9bd8c7-6d91-4d1c-9dbd-274b3c0c5b89.png?width=200",
  },
  {
    id: 2,
    name: "Facundo Campazzo",
    team: "MAD",
    image: "https://media-cdn.incrowdsports.com/e7c5e8c0-9bb7-4b3c-8a95-4c2b9f2d5ef2.png?width=200",
  },
  {
    id: 3,
    name: "Nikola Mirotic",
    team: "BAR",
    image: "https://media-cdn.incrowdsports.com/e7c5e8c0-9bb7-4b3c-8a95-4c2b9f2d5ef2.png?width=200",
  },
  {
    id: 4,
    name: "Sasu Salin",
    team: "TEN",
    image: "https://media-cdn.incrowdsports.com/9e9bd8c7-6d91-4d1c-9dbd-274b3c0c5b89.png?width=200",
  },
  {
    id: 5,
    name: "Chima Moneke",
    team: "BAS",
    image: "https://media-cdn.incrowdsports.com/9e9bd8c7-6d91-4d1c-9dbd-274b3c0c5b89.png?width=200",
  },
  {
    id: 6,
    name: "Gio Shermadini",
    team: "TEN",
    image: "https://media-cdn.incrowdsports.com/9e9bd8c7-6d91-4d1c-9dbd-274b3c0c5b89.png?width=200",
  },
  {
    id: 7,
    name: "Lorenzo Brown",
    team: "UNI",
    image: "https://media-cdn.incrowdsports.com/e7c5e8c0-9bb7-4b3c-8a95-4c2b9f2d5ef2.png?width=200",
  },
  {
    id: 8,
    name: "Chris Jones",
    team: "VAL",
    image: "https://media-cdn.incrowdsports.com/e7c5e8c0-9bb7-4b3c-8a95-4c2b9f2d5ef2.png?width=200",
  },
  {
    id: 9,
    name: "Walter Tavares",
    team: "RMA",
    image: "https://media-cdn.incrowdsports.com/9e9bd8c7-6d91-4d1c-9dbd-274b3c0c5b89.png?width=200",
  },
  {
    id: 10,
    name: "Bruno Fitipaldo",
    team: "TEN",
    image: "https://media-cdn.incrowdsports.com/e7c5e8c0-9bb7-4b3c-8a95-4c2b9f2d5ef2.png?width=200",
  },
  {
    id: 11,
    name: "Tomas Satoransky",
    team: "BAR",
    image: "https://media-cdn.incrowdsports.com/9e9bd8c7-6d91-4d1c-9dbd-274b3c0c5b89.png?width=200",
  },
  {
    id: 12,
    name: "Tyson Perez",
    team: "MUR",
    image: "https://media-cdn.incrowdsports.com/e7c5e8c0-9bb7-4b3c-8a95-4c2b9f2d5ef2.png?width=200",
  },
  {
    id: 13,
    name: "John Smith",
    team: "TEN",
    image: "https://media-cdn.incrowdsports.com/9e9bd8c7-6d91-4d1c-9dbd-274b3c0c5b89.png?width=200",
  },
  {
    id: 14,
    name: "Aaron Jackson",
    team: "TEN",
    image: "https://media-cdn.incrowdsports.com/e7c5e8c0-9bb7-4b3c-8a95-4c2b9f2d5ef2.png?width=200",
  },
  {
    id: 15,
    name: "Kyle Wiltjer",
    team: "TEN",
    image: "https://media-cdn.incrowdsports.com/9e9bd8c7-6d91-4d1c-9dbd-274b3c0c5b89.png?width=200",
  },
]

// Function to get team color and determine text color based on background brightness
const getTeamColorStyles = (teamName: string) => {
  const teamCode = teamNameToCode[teamName]
  const bgColor = euroleague_team_colors[teamCode] || "#1e3a8a" // Default to a blue if not found

  // Function to determine if text should be white or black based on background color brightness
  const getTextColor = (hexColor: string) => {
    // Convert hex to RGB
    const r = Number.parseInt(hexColor.slice(1, 3), 16)
    const g = Number.parseInt(hexColor.slice(3, 5), 16)
    const b = Number.parseInt(hexColor.slice(5, 7), 16)

    // Calculate brightness (perceived luminance)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000

    // Return white for dark backgrounds, black for light backgrounds
    return brightness > 128 ? "text-gray-900" : "text-white"
  }

  return {
    backgroundColor: bgColor,
    textColorClass: getTextColor(bgColor),
  }
}

// Update the interface to include the hideNav prop
interface YamagataTeamStatsProps {
  initialTab?: string
  hideNav?: boolean
}

type StatType = "points" | "rebounds" | "assists" | "threePointers" | "steals" | "blocks"

// Update the function signature to include the hideNav prop with a default value of false
export default function YamagataTeamStats({ initialTab = "league", hideNav = false }: YamagataTeamStatsProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([])

  const togglePlayerSelection = (playerId: string) => {
    setSelectedPlayers((prev) => (prev.includes(playerId) ? prev.filter((id) => id !== playerId) : [...prev, playerId]))
  }
  // Find the useState for activeTab and add a new state for tracking when to scroll
  const [activeTab, setActiveTab] = useState(initialTab)
  // Add a new state for progressive loading
  const [isLoading, setIsLoading] = useState(true)
  // Add this state to control lazy loading of the players table
  const [playersTableVisible, setPlayersTableVisible] = useState(false)
  const [shouldScrollTop, setShouldScrollTop] = useState(false)
  const [sortColumn, setSortColumn] = useState("winPct")
  const [sortDirection, setSortDirection] = useState("desc")
  const [playerSortColumn, setPlayerSortColumn] = useState("pts")
  const [playerSortDirection, setPlayerSortDirection] = useState("desc")
  const [playerSearchQuery, setPlayerSearchQuery] = useState("")
  // Update the default selected team:
  const [selectedTeam, setSelectedTeam] = useState("Real Madrid")
  // Add this new state for the player stats view mode
  const [playerStatsMode, setPlayerStatsMode] = useState("avg") // "avg", "per40", "total"
  const [expandedGameIndex, setExpandedGameIndex] = useState<number | null>(null)
  const [selectedStat, setSelectedStat] = useState<StatType>("points")
  const [viewMode, setViewMode] = useState<"total" | "per40">("total")
  const [trendCategory, setTrendCategory] = useState<
    "shotSelection" | "shootingPct" | "playmaking" | "rebounding" | "defense"
  >("shotSelection")
  const [playerNameSearch, setPlayerNameSearch] = useState("")
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)

  // Player statistics data
  const playerStats = [
    {
      rank: 1,
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
      rank: 2,
      player: "Facundo Campazzo",
      team: "MAD",
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
      rank: 3,
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
      rank: 4,
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
      rank: 5,
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
      rank: 6,
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
      rank: 7,
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
      rank: 8,
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
      rank: 9,
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
      rank: 10,
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
      rank: 11,
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
      rank: 12,
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
    // Adding Will Hanley as a Lenovo Tenerife player
    {
      rank: 13,
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
      image: "https://media-cdn.incrowdsports.com/9e9bd8c7-6d91-4d1c-9dbd-274b3c0c5b89.png?width=200",
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
    {
      rank: 19,
      player: "Joan Sastre",
      team: "TEN",
      gp: 15,
      gs: 0,
      min: "14:30",
      pts: 4.8,
      twopm: 1.0,
      twopa: 2.1,
      twop: 47.6,
      threepm: 0.8,
      threepa: 2.2,
      threep: 36.4,
      ftm: 0.4,
      fta: 0.6,
      ft: 66.7,
      or: 0.5,
      dr: 1.2,
      tr: 1.7,
      ast: 0.8,
      stl: 0.4,
      to: 0.5,
      blk: 0.1,
      blka: 0.1,
      fc: 1.0,
      fd: 0.8,
      pir: 5.2,
    },
  ]

  // Add this state to control lazy loading of the players table

  // Add this useEffect to simulate progressive loading
  useEffect(() => {
    if (activeTab === "league" || activeTab === "teams") {
      setIsLoading(true)
      // Use a short timeout to allow the UI to show a loading state first
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [activeTab])

  // Add this useEffect to delay loading the players table
  useEffect(() => {
    if (activeTab === "players") {
      // Delay loading the players table until after the tab animation completes
      const timer = setTimeout(() => {
        setPlayersTableVisible(true)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setPlayersTableVisible(false)
    }
  }, [activeTab])

  // Add this function to calculate stats based on the selected mode
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

  // Calculate stat values based on the current mode
  const statValues = useMemo(() => {
    // Transform all players according to the current mode
    const transformedStats = playerStats.map((player) => calculatePlayerStats(player, playerStatsMode))

    return {
      pts: transformedStats.map((p) => p.pts),
      twopm: transformedStats.map((p) => p.twopm),
      twopa: transformedStats.map((p) => p.twopa),
      twop: transformedStats.map((p) => p.twop),
      threepm: transformedStats.map((p) => p.threepm),
      threepa: transformedStats.map((p) => p.threepa),
      threep: transformedStats.map((p) => p.threep),
      ftm: transformedStats.map((p) => p.ftm),
      fta: transformedStats.map((p) => p.fta),
      ft: transformedStats.map((p) => p.ft),
      or: transformedStats.map((p) => p.or),
      dr: transformedStats.map((p) => p.dr),
      tr: transformedStats.map((p) => p.tr),
      ast: transformedStats.map((p) => p.ast),
      stl: transformedStats.map((p) => p.stl),
      to: transformedStats.map((p) => p.to),
      blk: transformedStats.map((p) => p.blk),
      blka: transformedStats.map((p) => p.blka),
      fc: transformedStats.map((p) => p.fc),
      fd: transformedStats.map((p) => p.fd),
      pir: transformedStats.map((p) => p.pir),
    }
  }, [playerStatsMode, playerStats])

  // Add this useEffect hook after all the useState declarations
  // Add this right before or after other useEffect hooks if they exist
  useEffect(() => {
    if (shouldScrollTop) {
      // Use setTimeout to ensure this runs after state updates and DOM changes
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "instant", // Use 'instant' instead of 'smooth' to ensure immediate scrolling
        })
        setShouldScrollTop(false)
      }, 0)
    }
  }, [shouldScrollTop])

  // Find the useEffect hook that should update the activeTab when initialTab changes
  // It's likely missing or not working correctly

  // Add this useEffect hook after the other useEffect declarations
  // This will ensure the component updates when the initialTab prop changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab)
      setShouldScrollTop(true)
    }
  }, [initialTab]) // Add initialTab to the dependency array

  // Update the handleTabChange function
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setShouldScrollTop(true)
  }

  // League standings data with added Win%, SOS, and SOSu
  // League standings data with added Win%, SOS, and SOSu
  const leagueStandings = [
    {
      team: "Real Madrid",
      wins: 12,
      losses: 3,
      winPct: 0.8,
      sos: 8.2,
      sosu: 9.1,
      effFG: { value: 56.2, rank: 1 },
      to: { value: 13.8, rank: 2 },
      offReb: { value: 33.5, rank: 4 },
      ftaFga: { value: 35.2, rank: 7 },
      defEffFG: { value: 45.1, rank: 2 },
      defTO: { value: 18.7, rank: 3 },
      defOffReb: { value: 27.3, rank: 5 },
      defFtaFga: { value: 29.8, rank: 4 },
      upcomingGame: "vs Fenerbahce Beko Istanbul (Feb 11)",
    },
    {
      team: "FC Barcelona",
      wins: 11,
      losses: 4,
      winPct: 0.733,
      sos: 7.5,
      sosu: 8.7,
      effFG: { value: 54.1, rank: 5 },
      to: { value: 14.2, rank: 3 },
      offReb: { value: 35.8, rank: 1 },
      ftaFga: { value: 37.9, rank: 3 },
      defEffFG: { value: 46.3, rank: 4 },
      defTO: { value: 17.9, rank: 5 },
      defOffReb: { value: 28.1, rank: 7 },
      defFtaFga: { value: 30.5, rank: 6 },
      upcomingGame: "at Baskonia Vitoria-Gasteiz (Feb 11)",
    },
    {
      team: "Olympiacos Piraeus",
      wins: 10,
      losses: 5,
      winPct: 0.667,
      sos: 9.3,
      sosu: 8.5,
      effFG: { value: 55.3, rank: 2 },
      to: { value: 14.9, rank: 4 },
      offReb: { value: 31.2, rank: 8 },
      ftaFga: { value: 38.7, rank: 5 },
      defEffFG: { value: 44.8, rank: 1 },
      defTO: { value: 19.2, rank: 2 },
      defOffReb: { value: 26.8, rank: 3 },
      defFtaFga: { value: 30.4, rank: 5 },
      upcomingGame: "at Virtus Segafredo Bologna (Feb 11)",
    },
    {
      team: "Fenerbahce Beko Istanbul",
      wins: 10,
      losses: 5,
      winPct: 0.667,
      sos: 8.8,
      sosu: 7.9,
      effFG: { value: 53.8, rank: 4 },
      to: { value: 17.5, rank: 10 },
      offReb: { value: 34.1, rank: 3 },
      ftaFga: { value: 40.2, rank: 1 },
      defEffFG: { value: 47.2, rank: 6 },
      defTO: { value: 16.8, rank: 7 },
      defOffReb: { value: 29.5, rank: 9 },
      defFtaFga: { value: 31.7, rank: 8 },
      upcomingGame: "at Real Madrid (Feb 11)",
    },
    {
      team: "Baskonia Vitoria-Gasteiz",
      wins: 9,
      losses: 6,
      winPct: 0.6,
      sos: 9.1,
      sosu: 9.4,
      effFG: { value: 51.2, rank: 8 },
      to: { value: 13.5, rank: 1 },
      offReb: { value: 28.7, rank: 12 },
      ftaFga: { value: 34.8, rank: 8 },
      defEffFG: { value: 46.8, rank: 5 },
      defTO: { value: 19.5, rank: 1 },
      defOffReb: { value: 26.5, rank: 2 },
      defFtaFga: { value: 28.9, rank: 2 },
      upcomingGame: "vs FC Barcelona (Feb 11)",
    },
    {
      team: "Virtus Segafredo Bologna",
      wins: 9,
      losses: 6,
      winPct: 0.6,
      sos: 7.8,
      sosu: 8.3,
      effFG: { value: 50.8, rank: 9 },
      to: { value: 16.9, rank: 9 },
      offReb: { value: 34.9, rank: 2 },
      ftaFga: { value: 39.1, rank: 2 },
      defEffFG: { value: 48.5, rank: 8 },
      defTO: { value: 16.2, rank: 8 },
      defOffReb: { value: 30.2, rank: 10 },
      defFtaFga: { value: 32.3, rank: 9 },
      upcomingGame: "vs Olympiacos Piraeus (Feb 11)",
    },
    {
      team: "FC Bayern Munich",
      wins: 8,
      losses: 7,
      winPct: 0.533,
      sos: 6.9,
      sosu: 7.5,
      effFG: { value: 48.5, rank: 11 },
      to: { value: 15.8, rank: 7 },
      offReb: { value: 26.3, rank: 15 },
      ftaFga: { value: 31.2, rank: 11 },
      defEffFG: { value: 49.1, rank: 9 },
      defTO: { value: 15.5, rank: 10 },
      defOffReb: { value: 31.8, rank: 12 },
      defFtaFga: { value: 33.5, rank: 11 },
      upcomingGame: "at Olympiacos Piraeus (Feb 18)",
    },
    {
      team: "Panathinaikos AKTOR Athens",
      wins: 8,
      losses: 7,
      winPct: 0.533,
      sos: 7.2,
      sosu: 8.1,
      effFG: { value: 52.1, rank: 7 },
      to: { value: 18.7, rank: 14 },
      offReb: { value: 30.8, rank: 9 },
      ftaFga: { value: 36.5, rank: 6 },
      defEffFG: { value: 47.9, rank: 7 },
      defTO: { value: 15.9, rank: 9 },
      defOffReb: { value: 28.9, rank: 8 },
      defFtaFga: { value: 32.8, rank: 10 },
      upcomingGame: "vs Olympiacos Piraeus (Feb 11)",
    },
    {
      team: "AS Monaco",
      wins: 7,
      losses: 8,
      winPct: 0.467,
      sos: 8.5,
      sosu: 7.8,
      effFG: { value: 49.2, rank: 10 },
      to: { value: 15.3, rank: 6 },
      offReb: { value: 29.5, rank: 10 },
      ftaFga: { value: 32.8, rank: 10 },
      defEffFG: { value: 50.2, rank: 10 },
      defTO: { value: 14.8, rank: 11 },
      defOffReb: { value: 30.5, rank: 11 },
      defFtaFga: { value: 34.2, rank: 12 },
      upcomingGame: "at Olympiacos Piraeus (Feb 25)",
    },
    {
      team: "EA7 Emporio Armani Milan",
      wins: 6,
      losses: 9,
      winPct: 0.4,
      sos: 8.9,
      sosu: 8.2,
      effFG: { value: 47.3, rank: 13 },
      to: { value: 19.2, rank: 16 },
      offReb: { value: 30.5, rank: 7 },
      ftaFga: { value: 29.8, rank: 14 },
      defEffFG: { value: 51.5, rank: 11 },
      defTO: { value: 14.2, rank: 12 },
      defOffReb: { value: 32.1, rank: 13 },
      defFtaFga: { value: 35.1, rank: 13 },
      upcomingGame: "at Fenerbahce Beko Istanbul (Feb 11)",
    },
    {
      team: "ALBA Berlin",
      wins: 6,
      losses: 9,
      winPct: 0.4,
      sos: 7.6,
      sosu: 7.3,
      effFG: { value: 48.9, rank: 12 },
      to: { value: 16.5, rank: 8 },
      offReb: { value: 29.1, rank: 11 },
      ftaFga: { value: 33.5, rank: 9 },
      defEffFG: { value: 52.3, rank: 12 },
      defTO: { value: 13.9, rank: 13 },
      defOffReb: { value: 27.8, rank: 6 },
      defFtaFga: { value: 29.5, rank: 3 },
      upcomingGame: "vs LDLC ASVEL Villeurbanne (Feb 11)",
    },
    {
      team: "LDLC ASVEL Villeurbanne",
      wins: 5,
      losses: 10,
      winPct: 0.333,
      sos: 6.8,
      sosu: 7.1,
      effFG: { value: 46.8, rank: 14 },
      to: { value: 18.9, rank: 15 },
      offReb: { value: 27.2, rank: 14 },
      ftaFga: { value: 30.1, rank: 13 },
      defEffFG: { value: 53.8, rank: 13 },
      defTO: { value: 13.2, rank: 14 },
      defOffReb: { value: 33.5, rank: 14 },
      defFtaFga: { value: 36.2, rank: 14 },
      upcomingGame: "at ALBA Berlin (Feb 11)",
    },
    {
      team: "Zalgiris Kaunas",
      wins: 5,
      losses: 10,
      winPct: 0.333,
      sos: 7.1,
      sosu: 6.9,
      effFG: { value: 46.2, rank: 15 },
      to: { value: 17.8, rank: 11 },
      offReb: { value: 28.1, rank: 13 },
      ftaFga: { value: 29.5, rank: 15 },
      defEffFG: { value: 54.2, rank: 15 },
      defTO: { value: 12.8, rank: 15 },
      defOffReb: { value: 34.1, rank: 15 },
      defFtaFga: { value: 36.8, rank: 15 },
      upcomingGame: "vs Crvena Zvezda Meridianbet Belgrade (Feb 11)",
    },
    {
      team: "Crvena Zvezda Meridianbet Belgrade",
      wins: 4,
      losses: 11,
      winPct: 0.267,
      sos: 6.5,
      sosu: 6.7,
      effFG: { value: 45.7, rank: 16 },
      to: { value: 18.2, rank: 12 },
      offReb: { value: 26.8, rank: 16 },
      ftaFga: { value: 28.9, rank: 16 },
      defEffFG: { value: 54.7, rank: 16 },
      defTO: { value: 12.5, rank: 16 },
      defOffReb: { value: 34.8, rank: 16 },
      defFtaFga: { value: 37.2, rank: 16 },
      upcomingGame: "at Zalgiris Kaunas (Feb 11)",
    },
    {
      team: "Anadolu Efes Istanbul",
      wins: 4,
      losses: 11,
      winPct: 0.267,
      sos: 6.3,
      sosu: 6.5,
      effFG: { value: 45.1, rank: 17 },
      to: { value: 18.5, rank: 13 },
      offReb: { value: 25.9, rank: 17 },
      ftaFga: { value: 28.3, rank: 17 },
      defEffFG: { value: 55.1, rank: 17 },
      defTO: { value: 12.1, rank: 17 },
      defOffReb: { value: 35.2, rank: 17 },
      defFtaFga: { value: 37.8, rank: 17 },
      upcomingGame: "vs Partizan Mozzart Bet Belgrade (Feb 11)",
    },
    {
      team: "Partizan Mozzart Bet Belgrade",
      wins: 3,
      losses: 12,
      winPct: 0.2,
      sos: 6.1,
      sosu: 6.3,
      effFG: { value: 44.5, rank: 18 },
      to: { value: 19.5, rank: 17 },
      offReb: { value: 25.2, rank: 18 },
      ftaFga: { value: 27.8, rank: 18 },
      defEffFG: { value: 55.8, rank: 18 },
      defTO: { value: 11.8, rank: 18 },
      defOffReb: { value: 35.9, rank: 18 },
      defFtaFga: { value: 38.5, rank: 18 },
      upcomingGame: "at Anadolu Efes Istanbul (Feb 11)",
    },
    {
      team: "Paris Basketball",
      wins: 7,
      losses: 8,
      winPct: 0.467,
      sos: 7.9,
      sosu: 7.6,
      effFG: { value: 52.8, rank: 6 },
      to: { value: 17.2, rank: 10 },
      offReb: { value: 31.8, rank: 6 },
      ftaFga: { value: 34.2, rank: 8 },
      defEffFG: { value: 50.8, rank: 11 },
      defTO: { value: 14.5, rank: 12 },
      defOffReb: { value: 32.5, rank: 13 },
      defFtaFga: { value: 35.5, rank: 13 },
      upcomingGame: "vs Maccabi Playtika Tel Aviv (Feb 11)",
    },
    {
      team: "Maccabi Playtika Tel Aviv",
      wins: 8,
      losses: 7,
      winPct: 0.533,
      sos: 7.4,
      sosu: 7.8,
      effFG: { value: 53.2, rank: 3 },
      to: { value: 15.1, rank: 5 },
      offReb: { value: 32.2, rank: 5 },
      ftaFga: { value: 35.8, rank: 7 },
      defEffFG: { value: 49.5, rank: 10 },
      defTO: { value: 15.1, rank: 11 },
      defOffReb: { value: 31.2, rank: 12 },
      defFtaFga: { value: 34.8, rank: 12 },
      upcomingGame: "at Paris Basketball (Feb 11)",
    },
  ]

  // Sample box score data for all games
  const mockBoxScoreData = {
    homeTeam: {
      name: "Lenovo Tenerife",
      rank: 3,
      players: [
        {
          number: "4",
          name: "LJ Cryer",
          position: "G",
          minutes: 27,
          offRating: 102,
          shotPercentage: 19,
          points: 8,
          twoPointers: "1-2",
          threePointers: "2-8",
          freeThrows: "0-0",
          offensiveRebounds: 0,
          defensiveRebounds: 3,
          assists: 3,
          turnovers: 0,
          blocks: 0,
          steals: 3,
          personalFouls: 1,
        },
        {
          number: "7",
          name: "Milos Uzan",
          position: "G",
          minutes: 22,
          offRating: 97,
          shotPercentage: 24,
          points: 4,
          twoPointers: "1-3",
          threePointers: "0-2",
          freeThrows: "2-2",
          offensiveRebounds: 1,
          defensiveRebounds: 4,
          assists: 6,
          turnovers: 2,
          blocks: 0,
          steals: 0,
          personalFouls: 0,
        },
        {
          number: "21",
          name: "Emanuel Sharp",
          position: "G",
          minutes: 20,
          offRating: 206,
          shotPercentage: 15,
          points: 16,
          twoPointers: "0-1",
          threePointers: "5-5",
          freeThrows: "1-2",
          offensiveRebounds: 1,
          defensiveRebounds: 1,
          assists: 2,
          turnovers: 0,
          blocks: 0,
          steals: 2,
          personalFouls: 4,
        },
        {
          number: "13",
          name: "J'Wan Roberts",
          position: "F",
          minutes: 17,
          offRating: 72,
          shotPercentage: 22,
          points: 4,
          twoPointers: "1-6",
          threePointers: "0-0",
          freeThrows: "2-3",
          offensiveRebounds: 1,
          defensiveRebounds: 2,
          assists: 0,
          turnovers: 0,
          blocks: 1,
          steals: 0,
          personalFouls: 1,
        },
        {
          number: "5",
          name: "Ja'Vier Francis",
          position: "F",
          minutes: 15,
          offRating: 106,
          shotPercentage: 18,
          points: 4,
          twoPointers: "2-5",
          threePointers: "0-0",
          freeThrows: "0-0",
          offensiveRebounds: 2,
          defensiveRebounds: 1,
          assists: 0,
          turnovers: 0,
          blocks: 1,
          steals: 1,
          personalFouls: 0,
        },
        {
          number: "23",
          name: "Terrance Arceneaux",
          position: "G",
          minutes: 23,
          offRating: 159,
          shotPercentage: 17,
          points: 12,
          twoPointers: "5-7",
          threePointers: "0-0",
          freeThrows: "2-2",
          offensiveRebounds: 1,
          defensiveRebounds: 2,
          assists: 1,
          turnovers: 0,
          blocks: 0,
          steals: 4,
          personalFouls: 1,
        },
        {
          number: "25",
          name: "Mercy Miller",
          position: "G",
          minutes: 22,
          offRating: 71,
          shotPercentage: 22,
          points: 4,
          twoPointers: "2-5",
          threePointers: "0-3",
          freeThrows: "0-2",
          offensiveRebounds: 1,
          defensiveRebounds: 8,
          assists: 2,
          turnovers: 0,
          blocks: 0,
          steals: 0,
          personalFouls: 2,
        },
        {
          number: "10",
          name: "Joseph Tugler",
          position: "F",
          minutes: 17,
          offRating: 201,
          shotPercentage: 28,
          points: 17,
          twoPointers: "4-4",
          threePointers: "2-2",
          freeThrows: "3-5",
          offensiveRebounds: 3,
          defensiveRebounds: 1,
          assists: 4,
          turnovers: 0,
          blocks: 1,
          steals: 0,
          personalFouls: 1,
        },
        {
          number: "3",
          name: "Ramon Walker",
          position: "G",
          minutes: 14,
          offRating: 82,
          shotPercentage: 11,
          points: 3,
          twoPointers: "0-1",
          threePointers: "1-1",
          freeThrows: "0-0",
          offensiveRebounds: 0,
          defensiveRebounds: 3,
          assists: 0,
          turnovers: 1,
          blocks: 1,
          steals: 0,
          personalFouls: 1,
        },
        {
          number: "11",
          name: "Mylik Wilson",
          position: "G",
          minutes: 11,
          offRating: 202,
          shotPercentage: 14,
          points: 6,
          twoPointers: "0-1",
          threePointers: "2-2",
          freeThrows: "0-0",
          offensiveRebounds: 0,
          defensiveRebounds: 1,
          assists: 2,
          turnovers: 0,
          blocks: 0,
          steals: 0,
          personalFouls: 1,
        },
      ],
      quarterScores: {
        q1: 24,
        q2: 24,
        q3: 18,
        q4: 14,
        total: 80,
      },
      teamTotals: {
        minutes: 200,
        points: 44,
        fieldGoals: "8-27",
        fieldGoalPct: 0.296,
        threePointers: "8-25",
        threePointerPct: 0.32,
        freeThrows: "4-5",
        freeThrowPct: 0.8,
        offensiveRebounds: 7,
        defensiveRebounds: 25,
        assists: 7,
        turnovers: 15,
        blocks: 0,
        steals: 3,
        personalFouls: 15,
      },
    },
    gameDate: "Friday, November 22, 2024",
    gameTime: "8:00 pm ET",
    venue: "Fertitta Center",
  }

  // Pre-calculate positions based on win percentage
  const standingsWithPositions = [...leagueStandings]
    .sort((a, b) => b.winPct - a.winPct)
    .map((team, index) => ({
      ...team,
      position: index + 1,
    }))

  // Replace the direct calculation of sortedStandings with this memoized version
  const sortedStandings = useMemo(() => {
    return [...standingsWithPositions].sort((a, b) => {
      let aValue, bValue

      // Handle nested properties for stats with ranks
      if (sortColumn === "effFG") {
        aValue = a.effFG.value
        bValue = b.effFG.value
      } else if (sortColumn === "to") {
        // For turnover percentage, lower is better, so invert the comparison
        aValue = a.to.value
        bValue = b.to.value
        if (sortDirection === "desc") {
          return aValue - bValue
        } else {
          return bValue - aValue
        }
      } else if (sortColumn === "offReb") {
        aValue = a.offReb.value
        bValue = b.offReb.value
      } else if (sortColumn === "ftaFga") {
        aValue = a.ftaFga.value
        bValue = b.ftaFga.value
      } else if (sortColumn === "defEffFG") {
        // For defensive stats, lower is better
        aValue = a.defEffFG.value
        bValue = b.defEffFG.value
        if (sortDirection === "desc") {
          return aValue - bValue
        } else {
          return bValue - aValue
        }
      } else if (sortColumn === "defTO") {
        // For defensive TO%, higher is better
        aValue = a.defTO.value
        bValue = b.defTO.value
      } else if (sortColumn === "defOffReb") {
        // For defensive offensive rebound %, lower is better
        aValue = a.defOffReb.value
        bValue = b.defOffReb.value
        if (sortDirection === "desc") {
          return aValue - bValue
        } else {
          return bValue - aValue
        }
      } else if (sortColumn === "defFtaFga") {
        // For defensive FTA/FGA, lower is better
        aValue = a.defFtaFga.value
        bValue = b.defFtaFga.value
        if (sortDirection === "desc") {
          return aValue - bValue
        } else {
          return bValue - aValue
        }
      } else {
        aValue = a[sortColumn]
        bValue = b[sortColumn]
      }

      if (sortDirection === "desc") {
        return bValue - aValue
      } else {
        return aValue - bValue
      }
    })
  }, [standingsWithPositions, sortColumn, sortDirection])

  // Replace the direct calculation with this memoized version
  const filteredPlayers = useMemo(() => {
    return playerStats.filter(
      (player) =>
        player.player.toLowerCase().includes(playerSearchQuery.toLowerCase()) ||
        player.team.toLowerCase().includes(playerSearchQuery.toLowerCase()),
    )
  }, [playerStats, playerSearchQuery])

  // Function to filter players based on search input
  const filteredPlayerImages = useMemo(() => {
    if (!playerNameSearch) return playerImages
    return playerImages.filter((player) => player.name.toLowerCase().includes(playerNameSearch.toLowerCase()))
  }, [playerNameSearch])

  // Replace the direct calculation with this memoized version
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

  // Function to handle column header clicks for sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new column and default to descending (except for TO%)
      setSortColumn(column)
      setSortDirection(column === "to" || column === "defTO" ? "asc" : "desc")
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

  // Function to render sort indicator
  const renderSortIndicator = (column) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="h-4 w-4 ml-1 inline-block text-gray-400" />
    }

    return sortDirection === "desc" ? (
      <ArrowDown className="h-4 w-4 ml-1 inline-block text-[#1a365d]" />
    ) : (
      <ArrowUp className="h-4 w-4 ml-1 inline-block text-[#1a365d]" />
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

  // Function to determine cell background color based on rank
  const getCellBgClass = (rank, total = 16, higherIsBetter = true) => {
    // For ranks, lower is better, so we invert the logic
    if (!higherIsBetter) {
      if (rank <= Math.ceil(total * 0.2)) return "bg-teal-600 text-white font-medium"
      if (rank <= Math.ceil(total * 0.4)) return "bg-teal-400 text-white font-medium"
      if (rank <= Math.ceil(total * 0.6)) return "bg-teal-200 text-gray-800"
      if (rank <= Math.ceil(total * 0.8)) return "bg-red-200 text-gray-800"
      return "bg-red-500 text-white font-medium"
    } else {
      if (rank <= Math.ceil(total * 0.2)) return "bg-red-500 text-white font-medium"
      if (rank <= Math.ceil(total * 0.4)) return "bg-red-300 text-gray-800"
      if (rank <= Math.ceil(total * 0.6)) return "bg-red-200 text-gray-800"
      if (rank <= Math.ceil(total * 0.8)) return "bg-teal-200 text-gray-800"
      return "bg-teal-600 text-white font-medium"
    }
  }

  // Update the getValueBgClass function to use ranks directly
  const getValueBgClass = (rank, totalRanks = 18) => {
    // Calculate the percentile based on rank (1 is best, totalRanks is worst)
    const percentile = 1 - (rank - 1) / (totalRanks - 1)

    // Create a function that returns the appropriate color based on percentile
    if (percentile >= 0.9) return "bg-teal-500 text-gray-900 font-medium rounded px-2 py-0.5"
    if (percentile >= 0.7) return "bg-teal-400 text-gray-900 font-medium rounded px-2 py-0.5"
    if (percentile >= 0.5) return "bg-teal-300 text-gray-900 rounded px-2 py-0.5"
    if (percentile >= 0.3) return "bg-teal-200 text-gray-900 rounded px-2 py-0.5"
    if (percentile >= 0.2) return "bg-red-200 text-gray-900 rounded px-2 py-0.5"
    if (percentile >= 0.1) return "bg-red-300 text-gray-900 rounded px-2 py-0.5"
    return "bg-red-400 text-gray-900 font-medium rounded px-2 py-0.5"
  }

  // Function to determine background color based on percentile ranking
  const getPlayerStatBgClass = (value: number, allValues: number[], isHigherBetter = true) => {
    if (allValues.length === 0) return "bg-white"

    // Sort values to determine percentile
    const sortedValues = [...allValues].sort((a, b) => (isHigherBetter ? b - a : a - b))
    const index = sortedValues.indexOf(value)
    const percentile = index / (sortedValues.length - 1)

    // Create a subtle grey gradient
    if (percentile <= 0.1) return "bg-gray-200"
    if (percentile <= 0.25) return "bg-gray-100"
    if (percentile <= 0.5) return "bg-gray-50"
    return "bg-white"
  }

  const selectedTeamData = useMemo(() => {
    return leagueStandings.find((team) => team.team === selectedTeam) || leagueStandings[0]
  }, [selectedTeam, leagueStandings])

  // Add this new function to get team logos from the mapping
  const getTeamLogo = (teamName) => {
    const teamCode = teamNameToCode[teamName]
    if (teamCode && team_logo_mapping_2024_2025[teamCode]) {
      return (
        <img
          src={team_logo_mapping_2024_2025[teamCode] || "/placeholder.svg"}
          alt={`${teamName} logo`}
          className="w-6 h-6 mr-2 inline-block"
        />
      )
    }

    // Fallback to the colored circle with initials if no logo is found
    const initials = teamName
      .split(" ")
      .map((word) => word[0])
      .join("")

    // Update the team colors mapping:
    const colors = {
      "Real Madrid": "bg-blue-600",
      "FC Barcelona": "bg-red-600",
      "Olympiacos Piraeus": "bg-red-600",
      "Fenerbahce Beko Istanbul": "bg-yellow-600",
      "Baskonia Vitoria-Gasteiz": "bg-blue-600",
      "Virtus Segafredo Bologna": "bg-black",
      "FC Bayern Munich": "bg-red-600",
      "Panathinaikos AKTOR Athens": "bg-green-600",
      "AS Monaco": "bg-red-600",
      "EA7 Emporio Armani Milan": "bg-red-600",
      "ALBA Berlin": "bg-yellow-600",
      "LDLC ASVEL Villeurbanne": "bg-gray-600",
      "Zalgiris Kaunas": "bg-green-600",
      "Crvena Zvezda Meridianbet Belgrade": "bg-red-600",
      "Anadolu Efes Istanbul": "bg-blue-600",
      "Partizan Mozzart Bet Belgrade": "bg-black",
      "Paris Basketball": "bg-gray-600",
      "Maccabi Playtika Tel Aviv": "bg-yellow-600",
    }

    const bgColor = colors[teamName] || "bg-gray-600"

    return (
      <div
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${bgColor} text-white font-bold text-xs mr-2`}
      >
        {initials}
      </div>
    )
  }

  // Function to toggle box score visibility
  const toggleBoxScore = (index) => {
    setExpandedGameIndex(expandedGameIndex === index ? null : index)
  }

  const getStatDisplayName = (stat: StatType) => {
    switch (stat) {
      case "points":
        return "Points"
      case "rebounds":
        return "Rebounds"
      case "assists":
        return "Assists"
      case "threePointers":
        return "3-Pointers"
      case "steals":
        return "Steals"
      case "blocks":
        return "Blocks"
      default:
        return "Unknown"
    }
  }

  // Add this function before the return statement

  // Add this function before the return statement
  // Find the renderTeamLogos function and replace it with this updated version
  // that removes team names from each cell and makes logos larger
  const renderTeamLogos = useMemo(() => {
    // Get all team names from the teamNameToCode object
    const teamNames = Object.keys(teamNameToCode)

    return (
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-md p-1 border border-gray-300 shadow-sm mb-1 w-full">
        <div className="flex flex-wrap gap-2 justify-center">
          {teamNames.map((teamName) => {
            const teamCode = teamNameToCode[teamName]
            const logoUrl = team_logo_mapping_2024_2025[teamCode]

            return (
              <button
                key={teamName}
                onClick={() => setSelectedTeam(teamName)}
                className={`flex items-center justify-center p-1.5 rounded-lg transition-all ${
                  teamName === selectedTeam
                    ? "bg-blue-500/10 border-2 border-blue-400 shadow-sm"
                    : "bg-white/70 border border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                } flex-shrink-0`}
                title={teamName}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-md p-0.5">
                  {logoUrl ? (
                    <img
                      src={logoUrl || "/placeholder.svg"}
                      alt={`${teamName} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-xs bg-gray-400">
                      {teamName
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }, [selectedTeam, setSelectedTeam])

  // Update the league standings table styling
  return (
    <div className="container mx-auto px-4 pt-0 pb-4">
      {/* Only render the LigaNav if hideNav is false */}
      {!hideNav && <LigaNav activeTab={activeTab} onTabChange={handleTabChange} />}

      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value)
          setShouldScrollTop(true)
        }}
        className="w-full"
      >
        <TabsContent value="league" className="space-y-2">
          {isLoading ? (
            // Loading skeleton for league standings
            <div className="bg-white rounded-md p-4 border shadow-sm animate-pulse">
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-200 rounded w-64"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="space-y-2">
                {Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="h-10 bg-gray-100 rounded"></div>
                  ))}
              </div>
            </div>
          ) : (
            // Original content
            <div className="bg-white rounded-md p-4 border shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  League Standings - Liga ACB <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                </h3>
                <div className="text-sm text-muted-foreground"></div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b-2 border-t-2 border-gray-700 bg-gray-50 h-10">
                      <th rowSpan={2} className="text-center py-1.5 px-2 font-medium border-r border-gray-300">
                        Pos
                      </th>
                      <th
                        rowSpan={2}
                        className="text-left py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                        onClick={() => handleSort("team")}
                      >
                        <div className="flex items-center">Team {renderSortIndicator("team")}</div>
                      </th>
                      <th
                        rowSpan={2}
                        className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                        onClick={() => handleSort("winPct")}
                      >
                        <div className="flex items-center justify-center">Record {renderSortIndicator("winPct")}</div>
                      </th>
                      <th
                        rowSpan={2}
                        className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                        onClick={() => handleSort("winPct")}
                      >
                        <div className="flex items-center justify-center">Win% {renderSortIndicator("winPct")}</div>
                      </th>

                      <th
                        colSpan={4}
                        className="text-center py-1 font-medium bg-blue-50 border-r border-gray-300 border-b border-gray-300"
                      >
                        Offense
                      </th>
                      <th
                        colSpan={4}
                        className="text-center py-1 font-medium bg-red-50 border-r border-gray-300 border-b border-gray-300"
                      >
                        Defense
                      </th>
                      <th rowSpan={2} className="text-left py-1.5 px-2 font-medium border-r border-gray-300">
                        Upcoming Game
                      </th>
                    </tr>
                    <tr className="border-b-2 border-gray-800 bg-gray-50">
                      {/* Offensive Stats */}
                      <th
                        className="text-center py-1 px-1 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300 bg-blue-50 whitespace-nowrap"
                        onClick={() => handleSort("effFG")}
                      >
                        <div className="flex items-center justify-center">EFG% {renderSortIndicator("effFG")}</div>
                      </th>
                      <th
                        className="text-center py-1 px-1 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300 bg-blue-50 whitespace-nowrap"
                        onClick={() => handleSort("to")}
                      >
                        <div className="flex items-center justify-center">TO% {renderSortIndicator("to")}</div>
                      </th>
                      <th
                        className="text-center py-1 px-1 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300 bg-blue-50 whitespace-nowrap"
                        onClick={() => handleSort("offReb")}
                      >
                        <div className="flex items-center justify-center">OREB% {renderSortIndicator("offReb")}</div>
                      </th>
                      <th
                        className="text-center py-1 px-1 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300 bg-blue-50 whitespace-nowrap"
                        onClick={() => handleSort("ftaFga")}
                      >
                        <div className="flex items-center justify-center">FTA% {renderSortIndicator("ftaFga")}</div>
                      </th>

                      {/* Defensive Stats */}
                      <th
                        className="text-center py-1 px-1 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300 bg-red-50 whitespace-nowrap"
                        onClick={() => handleSort("defEffFG")}
                      >
                        <div className="flex items-center justify-center">EFG% {renderSortIndicator("defEffFG")}</div>
                      </th>
                      <th
                        className="text-center py-1 px-1 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300 bg-red-50 whitespace-nowrap"
                        onClick={() => handleSort("defTO")}
                      >
                        <div className="flex items-center justify-center">TO% {renderSortIndicator("defTO")}</div>
                      </th>
                      <th
                        className="text-center py-1 px-1 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300 bg-red-50 whitespace-nowrap"
                        onClick={() => handleSort("defOffReb")}
                      >
                        <div className="flex items-center justify-center">OREB% {renderSortIndicator("defOffReb")}</div>
                      </th>
                      <th
                        className="text-center py-1 px-1 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300 bg-red-50 whitespace-nowrap"
                        onClick={() => handleSort("defFtaFga")}
                      >
                        <div className="flex items-center justify-center">FTA% {renderSortIndicator("defFtaFga")}</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedStandings.map((team, index) => (
                      <tr
                        key={team.team}
                        className={`border-b-2 ${
                          index === 7
                            ? "border-b-4 border-gray-700"
                            : index === 15
                              ? "border-b-4 border-gray-700"
                              : "border-gray-300"
                        } hover:bg-gray-50 transition-colors ${
                          team.team === "Lenovo Tenerife"
                            ? "bg-blue-50 border-l-4 border-l-blue-500"
                            : index % 2 === 0
                              ? "bg-white"
                              : "bg-white"
                        }`}
                      >
                        <td className="py-1 px-2 text-center border-r border-gray-200">
                          <div className="flex items-center justify-center">
                            <span
                              className={`flex items-center justify-center w-7 h-7 rounded-sm ${
                                team.position <= 8
                                  ? "bg-[#2c5282] text-white font-bold"
                                  : team.position >= sortedStandings.length - 1
                                    ? "bg-[#64748b] text-white font-bold"
                                    : ""
                              }`}
                            >
                              {team.position}
                            </span>
                          </div>
                        </td>
                        <td className="py-1 px-2 font-medium border-r border-gray-200 whitespace-nowrap">
                          {/* Replace all instances where a team is clicked with this pattern */}
                          <button
                            onClick={() => {
                              setActiveTab("teams")
                              setSelectedTeam(team.team)
                              setShouldScrollTop(true)
                            }}
                            className="flex items-center hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 rounded px-1"
                          >
                            {getTeamLogo(team.team)}
                            {team.team === "Lenovo Tenerife" ? (
                              <span className="text-[#1a365d]">{team.team}</span>
                            ) : (
                              team.team
                            )}
                          </button>
                        </td>
                        <td className="py-1 px-2 text-center border-r border-gray-200 font-mono whitespace-nowrap">
                          {team.wins}-{team.losses}
                        </td>
                        <td className="py-1 px-2 text-center border-r border-gray-200 font-mono whitespace-nowrap">
                          {team.winPct.toFixed(3)}
                        </td>

                        {/* Offensive Stats */}
                        <td className="py-1 px-2 text-center border-r border-gray-200 font-mono text-xs">
                          <div className="flex flex-col items-center">
                            <span className={`${getValueBgClass(team.effFG.rank, 18)}`}>{team.effFG.value}</span>
                            <span className="text-[0.65rem] opacity-75">{team.effFG.rank}</span>
                          </div>
                        </td>
                        <td className="py-1 px-2 text-center border-r border-gray-200 font-mono text-xs">
                          <div className="flex flex-col items-center">
                            <span className={`${getValueBgClass(team.to.rank, 18)}`}>{team.to.value}</span>
                            <span className="text-[0.65rem] opacity-75">{team.to.rank}</span>
                          </div>
                        </td>
                        <td className="py-1 px-2 text-center border-r border-gray-200 font-mono text-xs">
                          <div className="flex flex-col items-center">
                            <span className={`${getValueBgClass(team.offReb.rank, 18)}`}>{team.offReb.value}</span>
                            <span className="text-[0.65rem] opacity-75">{team.offReb.rank}</span>
                          </div>
                        </td>
                        <td className="py-1 px-2 text-center border-r border-gray-200 font-mono text-xs">
                          <div className="flex flex-col items-center">
                            <span className={`${getValueBgClass(team.ftaFga.rank, 18)}`}>{team.ftaFga.value}</span>
                            <span className="text-[0.65rem] opacity-75">{team.ftaFga.rank}</span>
                          </div>
                        </td>

                        {/* Defensive Stats */}
                        <td className="py-1 px-2 text-center border-r border-gray-200 font-mono text-xs">
                          <div className="flex flex-col items-center">
                            <span className={`${getValueBgClass(team.defEffFG.rank, 18)}`}>{team.defEffFG.value}</span>
                            <span className="text-[0.65rem] opacity-75">{team.defEffFG.rank}</span>
                          </div>
                        </td>
                        <td className="py-1 px-2 text-center border-r border-gray-200 font-mono text-xs">
                          <div className="flex flex-col items-center">
                            <span className={`${getValueBgClass(team.defTO.rank, 18)}`}>{team.defTO.value}</span>
                            <span className="text-[0.65rem] opacity-75">{team.defTO.rank}</span>
                          </div>
                        </td>
                        <td className="py-1 px-2 text-center border-r border-gray-200 font-mono text-xs">
                          <div className="flex flex-col items-center">
                            <span className={`${getValueBgClass(team.defOffReb.rank, 18)}`}>
                              {team.defOffReb.value}
                            </span>
                            <span className="text-[0.65rem] opacity-75">{team.defOffReb.rank}</span>
                          </div>
                        </td>
                        <td className="py-1 px-2 text-center border-r border-gray-200 font-mono text-xs">
                          <div className="flex flex-col items-center">
                            <span className={`${getValueBgClass(team.defFtaFga.rank, 18)}`}>
                              {team.defFtaFga.value}
                            </span>
                            <span className="text-[0.65rem] opacity-75">{team.defFtaFga.rank}</span>
                          </div>
                        </td>

                        <td className="py-1 px-2 border-r border-gray-200 whitespace-nowrap">{team.upcomingGame}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="teams" className="space-y-2">
          {isLoading ? (
            // Loading skeleton for teams tab
            <div className="animate-pulse">
              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-md p-3 border border-gray-200 shadow-sm mb-4 w-full">
                <div className="grid grid-cols-6 gap-2 w-full">
                  {Array(12)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="h-12 bg-white/50 rounded-lg border border-gray-200"></div>
                    ))}
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="lg:w-5/12 bg-white rounded-md p-3 border shadow-sm h-64"></div>
                  <div className="lg:w-7/12 bg-white rounded-md p-3 border shadow-sm h-64"></div>
                </div>
              </div>
            </div>
          ) : (
            // Original content
            <>
              {/* Team logos row - now at the top level of the tab content */}

              {/* Team header row - containing both team info and logos grid */}
              <div className="flex flex-col gap-4 mb-4 w-full">
                {/* Team logos container - Now with very small gap and rounded edges */}
                <div className="flex w-full gap-0.5">
                  {Object.keys(teamNameToCode).map((teamName) => {
                    const teamCode = teamNameToCode[teamName]
                    const logoUrl = team_logo_mapping_2024_2025[teamCode]
                    const isSelected = teamName === selectedTeam

                    return (
                      <button
                        key={teamName}
                        onClick={() => setSelectedTeam(teamName)}
                        className="focus:outline-none transition-all duration-200 flex-1"
                        title={teamName}
                      >
                        <div
                          className={`w-full aspect-square flex items-center justify-center bg-white rounded-md
              ${
                isSelected
                  ? "border-2 border-blue-600 shadow-md"
                  : "border border-gray-300 hover:border-gray-500 hover:shadow-sm"
              } 
              transition-all p-1`}
                        >
                          {logoUrl ? (
                            <img
                              src={logoUrl || "/placeholder.svg"}
                              alt={`${teamName} logo`}
                              className={`max-w-full max-h-full object-contain transition-all duration-200 ${isSelected ? "" : "opacity-40 filter grayscale"}`}
                            />
                          ) : (
                            <div
                              className={`w-full h-full rounded-sm flex items-center justify-center text-white font-bold text-xs ${isSelected ? "bg-gray-600" : "bg-gray-400 opacity-60"}`}
                            >
                              {teamName
                                .split(" ")
                                .map((word) => word[0])
                                .join("")}
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Compact team header container with border around entire box */}
                <div
                  className="rounded-lg overflow-hidden shadow-sm w-full bg-white"
                  style={{
                    border: `2px solid ${getTeamColorStyles(selectedTeam).backgroundColor}`,
                  }}
                >
                  <div className="flex items-center p-2">
                    {/* Team Logo and Name section with 45% width */}
                    <div className="flex items-center w-[45%] flex-shrink-0 border-r border-gray-200 pr-2">
                      {/* Team Logo - smaller size */}
                      <div className="flex-shrink-0 mr-2">
                        {(() => {
                          const teamCode = teamNameToCode[selectedTeam]
                          const selectedLogoUrl = team_logo_mapping_2024_2025[teamCode]
                          const teamColor = getTeamColorStyles(selectedTeam).backgroundColor

                          return selectedLogoUrl ? (
                            <div
                              className="w-8 h-8 flex items-center justify-center rounded-md shadow-sm"
                              style={{
                                background: `linear-gradient(135deg, ${teamColor}, ${teamColor}90)`,
                                border: "1px solid rgba(0,0,0,0.1)",
                              }}
                            >
                              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center p-0.5 shadow-sm">
                                <img
                                  src={selectedLogoUrl || "/placeholder.svg"}
                                  alt={`${selectedTeam} logo`}
                                  className="w-5 h-5 object-contain"
                                />
                              </div>
                            </div>
                          ) : (
                            <div
                              className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-xs shadow-sm"
                              style={{
                                background: `linear-gradient(135deg, ${teamColor}, ${teamColor}90)`,
                                border: "1px solid rgba(0,0,0,0.1)",
                              }}
                            >
                              {selectedTeam
                                .split(" ")
                                .map((word) => word[0])
                                .join("")}
                            </div>
                          )
                        })()}
                      </div>

                      {/* Team Name - in larger container */}
                      <div className="overflow-hidden flex-grow">
                        <h2 className="text-sm font-bold whitespace-nowrap overflow-hidden text-ellipsis text-black">
                          {selectedTeam}
                        </h2>
                      </div>
                    </div>

                    {/* Stats in a single row - now takes 55% of space with minimal spacing */}
                    <div className="flex items-center w-[55%] text-xs pl-2 gap-1 justify-between">
                      {/* Position */}
                      <div className="flex items-center whitespace-nowrap">
                        <span className="font-medium mr-0.5 text-gray-700">Pos:</span>
                        <span
                          className="px-1 py-0.5 rounded font-medium border"
                          style={{
                            backgroundColor: `${getTeamColorStyles(selectedTeam).backgroundColor}15`,
                            color: "#1a202c",
                            borderColor: `${getTeamColorStyles(selectedTeam).backgroundColor}40`,
                          }}
                        >
                          {leagueStandings
                            .sort((a, b) => b.winPct - a.winPct)
                            .findIndex((team) => team.team === selectedTeam) + 1}
                        </span>
                      </div>

                      {/* Record */}
                      <div className="flex items-center whitespace-nowrap">
                        <span className="font-medium mr-0.5 text-gray-700">Rec:</span>
                        <span
                          className="px-1 py-0.5 rounded font-mono border"
                          style={{
                            backgroundColor: `${getTeamColorStyles(selectedTeam).backgroundColor}15`,
                            color: "#1a202c",
                            borderColor: `${getTeamColorStyles(selectedTeam).backgroundColor}40`,
                          }}
                        >
                          {leagueStandings.find((team) => team.team === selectedTeam)?.wins || 0}-
                          {leagueStandings.find((team) => team.team === selectedTeam)?.losses || 0}
                        </span>
                      </div>

                      {/* Home Record */}
                      <div className="flex items-center whitespace-nowrap">
                        <span className="font-medium mr-0.5 text-gray-700">H:</span>
                        <span
                          className="px-1 py-0.5 rounded font-mono border"
                          style={{
                            backgroundColor: `${getTeamColorStyles(selectedTeam).backgroundColor}15`,
                            color: "#1a202c",
                            borderColor: `${getTeamColorStyles(selectedTeam).backgroundColor}40`,
                          }}
                        >
                          7-2
                        </span>
                      </div>

                      {/* Away Record */}
                      <div className="flex items-center whitespace-nowrap">
                        <span className="font-medium mr-0.5 text-gray-700">A:</span>
                        <span
                          className="px-1 py-0.5 rounded font-mono border"
                          style={{
                            backgroundColor: `${getTeamColorStyles(selectedTeam).backgroundColor}15`,
                            color: "#1a202c",
                            borderColor: `${getTeamColorStyles(selectedTeam).backgroundColor}40`,
                          }}
                        >
                          5-3
                        </span>
                      </div>

                      {/* Streak */}
                      <div className="flex items-center whitespace-nowrap">
                        <span className="font-medium mr-0.5 text-gray-700">Strk:</span>
                        <span className="px-1 py-0.5 bg-red-100 text-red-800 rounded font-medium border border-red-200">
                          L5
                        </span>
                      </div>

                      {/* Next Game */}
                      <div className="flex items-center whitespace-nowrap">
                        <span className="font-medium mr-0.5 text-gray-700">Next:</span>
                        <span
                          className="px-1 py-0.5 rounded text-gray-800 border"
                          style={{
                            backgroundColor: `${getTeamColorStyles(selectedTeam).backgroundColor}15`,
                            color: "#1a202c",
                            borderColor: `${getTeamColorStyles(selectedTeam).backgroundColor}40`,
                          }}
                        >
                          FEN
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Colored footer strip */}
                  <div
                    className="w-full h-1"
                    style={{
                      backgroundColor: getTeamColorStyles(selectedTeam).backgroundColor,
                    }}
                  />
                </div>
              </div>

              {/* Rest of the code remains unchanged */}
              <div className="flex flex-col lg:flex-row gap-4 h-full">
                {/* Left side - Team Stats */}
                <div className="flex flex-col h-[900px] lg:h-[900px] lg:w-5/12">
                  <div className="bg-white rounded-md p-3 pb-1 border shadow-lg flex-1 flex flex-col overflow-y-auto">
                    <div className="flex justify-between items-center border-b-2 border-gray-800 pb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-md font-semibold flex items-center">Team Report</h3>
                      </div>
                      {/* Team filter dropdown removed */}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <table className="w-full text-xs border-collapse mb-1">
                          <colgroup>
                            <col className="w-[40%]" />
                            <col className="w-[18%]" />
                            <col className="w-[18%]" />
                            <col className="w-[24%]" />
                          </colgroup>
                          <thead>
                            <tr className="border-b-2 border-gray-700 bg-gray-50 h-8">
                              <th className="text-center py-.5 pr-2 font-medium">Category</th>
                              <th className="text-center py-.5 px-2 font-medium text-blue-700 border-l border-gray-300">
                                Offense
                              </th>
                              <th className="text-center py-.5 px-2 font-medium text-red-700 border-l border-gray-300">
                                Defense
                              </th>
                              <th className="text-center py-.5 pl-2 font-medium border-l border-gray-300">
                                League Avg
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b-2 border-gray-200 h-2">
                              <td className="py-2 pr-2 text-gray-900 font-medium uppercase text-xs text-center">
                                EFFICIENCY
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(3, 18)}`}
                              >
                                <span className="font-semibold">118.4</span>{" "}
                                <span className="text-xs opacity-75">3</span>
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(9, 18)}`}
                              >
                                <span className="font-semibold">96.2</span>{" "}
                                <span className="text-xs opacity-75">9</span>
                              </td>
                              <td className="py-2 pl-2 text-center border-l border-gray-200 font-mono">105.8</td>
                            </tr>
                            <tr className="border-b-2 border-gray-200 h-2">
                              <td className="py-2 pr-2 text-gray-900 font-medium uppercase text-xs text-center">
                                PACE
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(16, 18)}`}
                              >
                                <span className="font-semibold">72.8</span>{" "}
                                <span className="text-xs opacity-75">16</span>
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(5, 18)}`}
                              >
                                <span className="font-semibold">68.4</span>{" "}
                                <span className="text-xs opacity-75">5</span>
                              </td>
                              <td className="py-2 pl-2 text-center border-l border-gray-200 font-mono">69.2</td>
                            </tr>
                          </tbody>
                        </table>

                        {/* Replace the "FOUR FACTORS" subheader with: */}
                        <div className="mt-3 mb-1">
                          <div className="text-gray-800 font-medium uppercase text-center text-sm">FOUR FACTORS</div>
                          <div className="h-1 w-full bg-slate-700 mt-1"></div>
                        </div>
                        <table className="w-full text-xs border-collapse mb-5">
                          <colgroup>
                            <col className="w-[40%]" />
                            <col className="w-[18%]" />
                            <col className="w-[18%]" />
                            <col className="w-[24%]" />
                          </colgroup>
                          <tbody>
                            <tr className="border-b-2 border-gray-200 h-2">
                              <td className="py-2 pr-2 text-gray-900 font-medium uppercase text-xs text-center">
                                EFFECTIVE FG%:
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(2, 18)}`}
                              >
                                <span className="font-semibold">55.3</span>{" "}
                                <span className="text-xs opacity-75">2</span>
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(3, 18)}`}
                              >
                                <span className="font-semibold">44.8</span>{" "}
                                <span className="text-xs opacity-75">3</span>
                              </td>
                              <td className="py-2 pl-2 text-center border-l border-gray-200 font-mono">50.2</td>
                            </tr>
                            <tr className="border-b-2 border-gray-200 h-2">
                              <td className="py-2 pr-2 text-gray-900 font-medium uppercase text-xs text-center">
                                TURNOVER %:
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(4, 18)}`}
                              >
                                <span className="font-semibold">14.9</span>{" "}
                                <span className="text-xs opacity-75">4</span>
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(11, 18)}`}
                              >
                                <span className="font-semibold">18.2</span>{" "}
                                <span className="text-xs opacity-75">11</span>
                              </td>
                              <td className="py-2 pl-2 text-center border-l border-gray-200 font-mono">17.8</td>
                            </tr>
                            <tr className="border-b-2 border-gray-200 h-2">
                              <td className="py-2 pr-2 text-gray-900 font-medium uppercase text-xs text-center">
                                OFF. REB. %:
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(8, 18)}`}
                              >
                                <span className="font-semibold">31.2</span>{" "}
                                <span className="text-xs opacity-75">8</span>
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(15, 18)}`}
                              >
                                <span className="font-semibold">33.5</span>{" "}
                                <span className="text-xs opacity-75">15</span>
                              </td>
                              <td className="py-2 pl-2 text-center border-l border-gray-200 font-mono">30.1</td>
                            </tr>
                            <tr className="border-b-2 border-gray-200 h-2">
                              <td className="py-2 pr-2 text-gray-900 font-medium uppercase text-xs text-center">
                                FTA/FGA:
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(5, 18)}`}
                              >
                                <span className="font-semibold">38.7</span>{" "}
                                <span className="text-xs opacity-75">5</span>
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(10, 18)}`}
                              >
                                <span className="font-semibold">30.4</span>{" "}
                                <span className="text-xs opacity-75">10</span>
                              </td>
                              <td className="py-2 pl-2 text-center border-l border-gray-200 font-mono">32.5</td>
                            </tr>
                          </tbody>
                        </table>

                        {/* Replace the "OTHER" subheader with: */}
                        <div className="mt-2 mb-1">
                          <div className="text-gray-800 font-medium uppercase text-center  text-sm">OTHER</div>
                          <div className="h-1 w-full bg-slate-700 mt-1"></div>
                        </div>
                        <table className="w-full text-xs border-collapse mb-5">
                          <colgroup>
                            <col className="w-[40%]" />
                            <col className="w-[18%]" />
                            <col className="w-[18%]" />
                            <col className="w-[24%]" />
                          </colgroup>
                          <tbody>
                            <tr className="border-b-2 border-gray-200 h-2">
                              <td className="py-2 pr-2 text-gray-900 font-medium uppercase text-xs text-center">
                                3P%:
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(3, 18)}`}
                              >
                                <span className="font-semibold">38.2</span>{" "}
                                <span className="text-xs opacity-75">3</span>
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(12, 18)}`}
                              >
                                <span className="font-semibold">32.1</span>{" "}
                                <span className="text-xs opacity-75">12</span>
                              </td>
                              <td className="py-2 pl-2 text-center border-l border-gray-200 font-mono">34.2</td>
                            </tr>
                            <tr className="border-b-2 border-gray-200 h-2">
                              <td className="py-2 pr-2 text-gray-900 font-medium uppercase text-xs text-center">
                                2P%:
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(4, 18)}`}
                              >
                                <span className="font-semibold">54.8</span>{" "}
                                <span className="text-xs opacity-75">4</span>
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(5, 18)}`}
                              >
                                <span className="font-semibold">45.2</span>{" "}
                                <span className="text-xs opacity-75">5</span>
                              </td>
                              <td className="py-2 pl-2 text-center border-l border-gray-200 font-mono">49.5</td>
                            </tr>
                            <tr className="border-b-2 border-gray-200 h-2">
                              <td className="py-2 pr-2 text-gray-900 font-medium uppercase text-xs text-center">
                                FT%:
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(2, 18)}`}
                              >
                                <span className="font-semibold">76.5</span>{" "}
                                <span className="text-xs opacity-75">2</span>
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(8, 18)}`}
                              >
                                <span className="font-semibold">70.2</span>{" "}
                                <span className="text-xs opacity-75">8</span>
                              </td>
                              <td className="py-2 pl-2 text-center border-l border-gray-200 font-mono">71.8</td>
                            </tr>
                            <tr className="border-b-2 border-gray-200 h-2">
                              <td className="py-2 pr-2 text-gray-900 font-medium uppercase text-xs text-center">
                                BLOCK%:
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(17, 18)}`}
                              >
                                <span className="font-semibold">7.2</span>{" "}
                                <span className="text-xs opacity-75">17</span>
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(8, 18)}`}
                              >
                                <span className="font-semibold">9.8</span> <span className="text-xs opacity-75">8</span>
                              </td>
                              <td className="py-2 pl-2 text-center border-l border-gray-200 font-mono">9.2</td>
                            </tr>
                            <tr className="border-b-2 border-gray-200 h-2">
                              <td className="py-2 pr-2 text-gray-900 font-medium uppercase text-xs text-center">
                                STEAL%:
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(3, 18)}`}
                              >
                                <span className="font-semibold">10.8</span>{" "}
                                <span className="text-xs opacity-75">3</span>
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(2, 18)}`}
                              >
                                <span className="font-semibold">11.2</span>{" "}
                                <span className="text-xs opacity-75">2</span>
                              </td>
                              <td className="py-2 pl-2 text-center border-l border-gray-200 font-mono">9.5</td>
                            </tr>
                            <tr className="border-b-2 border-gray-200 h-2">
                              <td className="py-2 pr-2 text-gray-900 font-medium uppercase text-xs text-center">
                                3PA/FGA:
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(9, 18)}`}
                              >
                                <span className="font-semibold">32.5</span>{" "}
                                <span className="text-xs opacity-75">9</span>
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(7, 18)}`}
                              >
                                <span className="font-semibold">31.8</span>{" "}
                                <span className="text-xs opacity-75">7</span>
                              </td>
                              <td className="py-2 pl-2 text-center border-l border-gray-200 font-mono">32.1</td>
                            </tr>
                            <tr className="border-b-2 border-gray-200 h-2">
                              <td className="py-2 pr-2 text-gray-900 font-medium uppercase text-xs text-center">
                                A/FGM:
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(4, 18)}`}
                              >
                                <span className="font-semibold">58.2</span>{" "}
                                <span className="text-xs opacity-75">4</span>
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(6, 18)}`}
                              >
                                <span className="font-semibold">52.5</span>{" "}
                                <span className="text-xs opacity-75">6</span>
                              </td>
                              <td className="py-2 pl-2 text-center border-l border-gray-200 font-mono">53.8</td>
                            </tr>
                          </tbody>
                        </table>

                        {/* Replace the "POINT DISTRIBUTION" subheader with: */}
                        <div className="mt-3 mb-1">
                          <div className="text-gray-800 font-medium uppercase text-center text-sm">
                            POINT DISTRIBUTION
                          </div>
                          <div className="h-1 w-full bg-slate-700 mt-1"></div>
                        </div>
                        <table className="w-full text-xs border-collapse mb-5">
                          <colgroup>
                            <col className="w-[40%]" />
                            <col className="w-[18%]" />
                            <col className="w-[18%]" />
                            <col className="w-[24%]" />
                          </colgroup>
                          <tbody>
                            <tr className="border-b-2 border-gray-200 h-2">
                              <td className="py-2 pr-2 text-gray-900 font-medium uppercase text-xs text-center">
                                3-POINTERS:
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(8, 18)}`}
                              >
                                <span className="font-semibold">34.8</span>{" "}
                                <span className="text-xs opacity-75">8</span>
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(15, 18)}`}
                              >
                                <span className="font-semibold">28.2</span>{" "}
                                <span className="text-xs opacity-75">15</span>
                              </td>
                              <td className="py-2 pl-2 text-center border-l border-gray-200 font-mono">31.5</td>
                            </tr>
                            <tr className="border-b-2 border-gray-200 h-2">
                              <td className="py-2 pr-2 text-gray-900 font-medium uppercase text-xs text-center">
                                2-POINTERS:
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(10, 18)}`}
                              >
                                <span className="font-semibold">47.2</span>{" "}
                                <span className="text-xs opacity-75">10</span>
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(4, 18)}`}
                              >
                                <span className="font-semibold">51.5</span>{" "}
                                <span className="text-xs opacity-75">4</span>
                              </td>
                              <td className="py-2 pl-2 text-center border-l border-gray-200 font-mono">49.3</td>
                            </tr>
                            <tr className="border-b-2 border-gray-200 h-2">
                              <td className="py-2 pr-2 text-gray-900 font-medium uppercase text-xs text-center">
                                FREE THROWS:
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(5, 18)}`}
                              >
                                <span className="font-semibold">18.0</span>{" "}
                                <span className="text-xs opacity-75">5</span>
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(12, 18)}`}
                              >
                                <span className="font-semibold">20.3</span>{" "}
                                <span className="text-xs opacity-75">12</span>
                              </td>
                              <td className="py-2 pl-2 text-center border-l border-gray-200 font-mono">19.2</td>
                            </tr>
                          </tbody>
                        </table>

                        {/* Replace the "STRENGTH OF SCHEDULE" subheader with: */}
                        <div className="mt-3 mb-1">
                          <div className="text-gray-800 font-medium uppercase text-center text-sm">
                            STRENGTH OF SCHEDULE
                          </div>
                          <div className="h-1 w-full bg-slate-700 mt-1"></div>
                        </div>
                        <table className="w-full text-xs border-collapse mb-5">
                          <colgroup>
                            <col className="w-[40%]" />
                            <col className="w-[36%]" />
                            <col className="w-[24%]" />
                          </colgroup>
                          <tbody>
                            <tr className="border-b-2 border-gray-200 h-2">
                              <td className="py-2 pr-2 text-gray-900 font-medium uppercase text-xs text-center">
                                OVERALL:
                              </td>
                              <td
                                className={`py-2 px-2 text-center border-l border-gray-200 font-mono ${getValueBgClass(9, 18)}`}
                              >
                                <span className="font-semibold">+14.32</span>{" "}
                                <span className="text-xs text-green-800">9</span>
                              </td>
                              <td className="py-2 pl-2 text-center border-l border-gray-200 font-mono">0.00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right side - Schedule */}
                <div className="lg:w-7/12 flex flex-col">
                  <div className="bg-white rounded-md p-3 border shadow-lg flex flex-col">
                    <div className="flex justify-between items-center border-b-2 border-gray-800 pb-2">
                      <h3 className="text-md font-semibold flex items-center">Schedule & Results</h3>
                      <div className="text-sm text-muted-foreground"></div>
                    </div>

                    {/* This div will have fixed height and scrolling */}
                    <div
                      className="h-[837px] max-h-[837px] overflow-y-auto overflow-x-auto w-full"
                      style={{ height: "837px", maxHeight: "837px", overflowY: "auto" }}
                    >
                      <table className="w-full text-xs border-collapse">
                        <colgroup>
                          <col className="w-[12%]" />
                          <col className="w-[8%]" />
                          <col className="w-[30%]" />
                          <col className="w-[15%]" />
                          <col className="w-[15%]" />
                          <col className="w-[15%]" />
                          <col className="w-[5%]" />
                          {/* Added column for expand arrow */}
                        </colgroup>
                        <thead>
                          <tr className="border-b-2 border-gray-700 bg-gray-50 h-8">
                            <th className="text-center py-1 px-1 font-medium border-r border-gray-300">Date</th>
                            <th className="text-center py-1 px-1 font-medium border-r border-gray-300">Rk</th>
                            <th className="text-center py-1 px-1 font-medium border-r border-gray-300">Opponent</th>
                            <th className="text-center py-1 px-1 font-medium border-r border-gray-300">Result</th>
                            <th className="text-center py-1 px-1 font-medium border-r border-gray-300">Location</th>
                            <th className="text-center py-1 px-1 font-medium border-r border-gray-300">Record</th>
                            <th className="text-center py-1 px-1 font-medium">Box</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs">
                          {/* Define games array at the component level, not inside the JSX */}
                          {(() => {
                            // Update the games array in the JSX:
                            const games = [
                              {
                                date: "Oct 15",
                                rank: 12,
                                opponent: "Real Madrid",
                                result: "W, 88-72",
                                location: "Home",
                                record: "1-0",
                                isWin: true,
                                isCompleted: true,
                              },
                              {
                                date: "Oct 22",
                                rank: 9,
                                opponent: "FC Barcelona",
                                result: "W, 91-85",
                                location: "Away",
                                record: "2-0",
                                isWin: true,
                                isCompleted: true,
                              },
                              {
                                date: "Oct 29",
                                rank: 14,
                                opponent: "Fenerbahce Beko Istanbul",
                                result: "W, 78-70",
                                location: "Home",
                                record: "3-0",
                                isWin: true,
                                isCompleted: true,
                              },
                              {
                                date: "Nov 5",
                                rank: 11,
                                opponent: "Baskonia Vitoria-Gasteiz",
                                result: "W, 82-79",
                                location: "Away",
                                record: "4-0",
                                isWin: true,
                                isCompleted: true,
                              },
                              {
                                date: "Nov 12",
                                rank: 16,
                                opponent: "Virtus Segafredo Bologna",
                                result: "W, 85-80",
                                location: "Home",
                                record: "5-0",
                                isWin: true,
                                isCompleted: true,
                              },
                              {
                                date: "Nov 19",
                                rank: 13,
                                opponent: "FC Bayern Munich",
                                result: "W, 76-72",
                                location: "Away",
                                record: "6-0",
                                isWin: true,
                                isCompleted: true,
                              },
                              {
                                date: "Nov 26",
                                rank: 10,
                                opponent: "Panathinaikos AKTOR Athens",
                                result: "W, 89-82",
                                location: "Home",
                                record: "7-0",
                                isWin: true,
                                isCompleted: true,
                              },
                              {
                                date: "Dec 3",
                                rank: 7,
                                opponent: "AS Monaco",
                                result: "W, 92-88",
                                location: "Away",
                                record: "8-0",
                                isWin: true,
                                isCompleted: true,
                              },
                              {
                                date: "Dec 10",
                                rank: 15,
                                opponent: "EA7 Emporio Armani Milan",
                                result: "W, 84-78",
                                location: "Home",
                                record: "9-0",
                                isWin: true,
                              },
                              {
                                date: "Dec 17",
                                rank: 8,
                                opponent: "ALBA Berlin",
                                result: "W, 79-75",
                                location: "Away",
                                record: "10-0",
                                isWin: true,
                                isCompleted: true,
                              },
                              {
                                date: "Dec 24",
                                rank: 12,
                                opponent: "LDLC ASVEL Villeurbanne",
                                result: "W, 86-80",
                                location: "Home",
                                record: "11-0",
                                isWin: true,
                                isCompleted: true,
                              },
                              {
                                date: "Dec 31",
                                rank: 14,
                                opponent: "Zalgiris Kaunas",
                                result: "W, 81-77",
                                location: "Away",
                                record: "12-0",
                                isWin: true,
                                isCompleted: true,
                              },
                              {
                                date: "Jan 7",
                                rank: 11,
                                opponent: "Crvena Zvezda Meridianbet Belgrade",
                                result: "L, 75-80",
                                location: "Home",
                                record: "12-1",
                                isWin: false,
                                isCompleted: true,
                              },
                              {
                                date: "Jan 14",
                                rank: 16,
                                opponent: "Anadolu Efes Istanbul",
                                result: "L, 78-82",
                                location: "Away",
                                record: "12-2",
                                isWin: false,
                                isCompleted: true,
                              },
                              {
                                date: "Jan 21",
                                rank: 13,
                                opponent: "Partizan Mozzart Bet Belgrade",
                                result: "L, 72-76",
                                location: "Home",
                                record: "12-3",
                                isWin: false,
                                isCompleted: true,
                              },
                              {
                                date: "Jan 28",
                                rank: 10,
                                opponent: "Paris Basketball",
                                result: "L, 80-85",
                                location: "Away",
                                record: "12-4",
                                isWin: false,
                                isCompleted: true,
                              },
                              {
                                date: "Feb 4",
                                rank: 7,
                                opponent: "Maccabi Playtika Tel Aviv",
                                result: "L, 77-81",
                                location: "Home",
                                record: "12-5",
                                isWin: false,
                                isCompleted: true,
                              },
                              {
                                date: "Feb 11",
                                rank: 15,
                                opponent: "Real Madrid",
                                result: "TBD",
                                location: "Away",
                                record: "12-5",
                                isWin: null,
                                isCompleted: false,
                              },
                              {
                                date: "Feb 18",
                                rank: null,
                                opponent: "FC Barcelona",
                                result: "TBD",
                                location: "Home",
                                record: "12-5",
                                isWin: null,
                                isCompleted: false,
                              },
                              {
                                date: "Feb 25",
                                rank: null,
                                opponent: "Fenerbahce Beko Istanbul",
                                result: "TBD",
                                location: "Away",
                                record: "12-5",
                                isWin: null,
                                isCompleted: false,
                              },
                              {
                                date: "Mar 3",
                                rank: null,
                                opponent: "Baskonia Vitoria-Gasteiz",
                                result: "TBD",
                                location: "Home",
                                record: "12-5",
                                isWin: null,
                                isCompleted: false,
                              },
                              {
                                date: "Mar 10",
                                rank: null,
                                opponent: "Virtus Segafredo Bologna",
                                result: "TBD",
                                location: "Away",
                                record: "12-5",
                                isWin: null,
                                isCompleted: false,
                              },
                              {
                                date: "Mar 17",
                                rank: null,
                                opponent: "FC Bayern Munich",
                                result: "TBD",
                                location: "Home",
                                record: "12-5",
                                isWin: null,
                                isCompleted: false,
                              },
                              {
                                date: "Mar 24",
                                rank: null,
                                opponent: "Panathinaikos AKTOR Athens",
                                result: "TBD",
                                location: "Away",
                                record: "12-5",
                                isWin: null,
                                isCompleted: false,
                              },
                              {
                                date: "Mar 31",
                                rank: null,
                                opponent: "AS Monaco",
                                result: "TBD",
                                location: "Home",
                                record: "12-5",
                                isWin: null,
                                isCompleted: false,
                              },
                              {
                                date: "Apr 7",
                                rank: null,
                                opponent: "EA7 Emporio Armani Milan",
                                result: "TBD",
                                location: "Away",
                                record: "12-5",
                                isWin: null,
                                isCompleted: false,
                              },
                              {
                                date: "Apr 14",
                                rank: null,
                                opponent: "ALBA Berlin",
                                result: "TBD",
                                location: "Home",
                                record: "12-5",
                                isWin: null,
                                isCompleted: false,
                              },
                              {
                                date: "Apr 21",
                                rank: null,
                                opponent: "LDLC ASVEL Villeurbanne",
                                result: "TBD",
                                location: "Away",
                                record: "12-5",
                                isWin: null,
                                isCompleted: false,
                              },
                              {
                                date: "Apr 28",
                                rank: null,
                                opponent: "Zalgiris Kaunas",
                                result: "TBD",
                                location: "Home",
                                record: "12-5",
                                isWin: null,
                                isCompleted: false,
                              },
                              {
                                date: "May 5",
                                rank: null,
                                opponent: "Crvena Zvezda Meridianbet Belgrade",
                                result: "TBD",
                                location: "Away",
                                record: "12-5",
                                isWin: null,
                                isCompleted: false,
                              },
                              {
                                date: "May 12",
                                rank: null,
                                opponent: "Anadolu Efes Istanbul",
                                result: "TBD",
                                location: "Home",
                                record: "12-5",
                                isWin: null,
                                isCompleted: false,
                              },
                              {
                                date: "May 19",
                                rank: null,
                                opponent: "Partizan Mozzart Bet Belgrade",
                                result: "TBD",
                                location: "Away",
                                record: "12-5",
                                isWin: null,
                                isCompleted: false,
                              },
                              {
                                date: "May 26",
                                rank: null,
                                opponent: "Paris Basketball",
                                result: "TBD",
                                location: "Home",
                                record: "12-5",
                                isWin: null,
                                isCompleted: false,
                              },
                              {
                                date: "Jun 2",
                                rank: null,
                                opponent: "Maccabi Playtika Tel Aviv",
                                result: "TBD",
                                location: "Away",
                                record: "12-5",
                                isWin: null,
                                isCompleted: false,
                              },
                            ]

                            return games.map((game, index) => (
                              <React.Fragment key={index}>
                                <tr
                                  className={`border-b-2 border-gray-200 hover:bg-gray-50 transition-colors ${
                                    index === expandedGameIndex ? "bg-gray-100" : ""
                                  }`}
                                >
                                  <td className="py-1 px-1 border-r border-gray-200">{game.date}</td>
                                  <td className="py-1 px-1 text-center border-r border-gray-200">{game.rank}</td>
                                  <td className="py-1 px-1 border-r border-gray-200">
                                    {/* Opponent with logo */}
                                    <div className="flex items-center">
                                      {getTeamLogo(game.opponent)}
                                      {game.opponent}
                                    </div>
                                  </td>
                                  <td
                                    className={`py-1 px-1 text-center border-r border-gray-200 font-mono ${
                                      game.isCompleted
                                        ? game.isWin
                                          ? "text-green-600 font-semibold"
                                          : "text-red-600 font-semibold"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    {game.result}
                                  </td>
                                  <td className="py-1 px-1 text-center border-r border-gray-200">{game.location}</td>
                                  <td className="py-1 px-1 text-center border-r border-gray-200">{game.record}</td>
                                  <td className="py-1 px-1 text-center">
                                    {game.isCompleted ? (
                                      <button
                                        onClick={() => toggleBoxScore(index)}
                                        className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                                      >
                                        {expandedGameIndex === index ? (
                                          <ArrowUp className="h-4 w-4" />
                                        ) : (
                                          <ArrowDown className="h-4 w-4" />
                                        )}
                                      </button>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                </tr>
                                {/* Conditionally render the box score */}
                                {expandedGameIndex === index && (
                                  <tr>
                                    <td colSpan={7} className="p-3">
                                      {/* Box score content here */}
                                      <div className="bg-gray-50 rounded-md p-3">
                                        <h4 className="font-semibold text-sm mb-2">Box Score</h4>
                                        {/* Display box score data here */}
                                        <p className="text-xs">
                                          {mockBoxScoreData.gameDate}, {mockBoxScoreData.gameTime} at{" "}
                                          {mockBoxScoreData.venue}
                                        </p>
                                        <p className="text-xs">
                                          {mockBoxScoreData.homeTeam.name}:{" "}
                                          {mockBoxScoreData.homeTeam.quarterScores.total}
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            ))
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* Team Players Table */}
              <div className="mt-6 bg-white rounded-md p-3 border shadow-lg">
                <div className="flex justify-between items-center border-b-2 border-gray-800 pb-2">
                  <h3 className="text-md font-semibold flex items-center">{selectedTeam} Players</h3>
                  <div className="text-sm text-muted-foreground"></div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-700 bg-gray-50 h-8">
                        <th className="text-left py-1 px-1 font-medium border-r border-gray-300 sticky left-0 bg-gray-50 z-10">
                          Player
                        </th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">Team</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">GP</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">GS</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">MIN</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">PTS</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">2PM</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">2PA</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">2P%</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">3PM</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">3PA</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">3P%</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">FTM</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">FTA</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">FT%</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">OR</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">DR</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">TR</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">AST</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">STL</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">TO</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">BLK</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">BLKA</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">FC</th>
                        <th className="text-center py-1 px-1 font-medium border-r border-gray-300">FD</th>
                        <th className="text-center py-1 px-1 font-medium">PIR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {playerStats
                        .filter((player) => {
                          // Map team codes to team names for filtering
                          const teamCodeMap = {
                            TEN: "Lenovo Tenerife",
                            MAD: "Real Madrid",
                            BAR: "FC Barcelona",
                            BAS: "Baskonia Vitoria-Gasteiz",
                            UNI: "UCAM Murcia",
                            VAL: "Valencia Basket",
                            RMA: "Real Madrid",
                            MUR: "UCAM Murcia",
                          }

                          // Get the team name for the current player's team code
                          const playerTeamName = teamCodeMap[player.team]

                          // Check if the player's team matches the selected team
                          // For Real Madrid, we need to check both MAD and RMA codes
                          if (selectedTeam === "Real Madrid") {
                            return player.team === "MAD" || player.team === "RMA"
                          }

                          // For other teams, check if the team name matches
                          return playerTeamName === selectedTeam
                        })
                        .map((player, index) => (
                          <tr
                            key={player.player}
                            className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }`}
                          >
                            <td className="py-1 px-1 font-medium border-r border-gray-200 sticky left-0 bg-inherit whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-5 h-5 rounded-full bg-gray-200 mr-2 flex items-center justify-center overflow-hidden">
                                  {playerImages.find((img) => img.name === player.player)?.image ? (
                                    <img
                                      src={
                                        playerImages.find((img) => img.name === player.player)?.image ||
                                        "/placeholder.svg" ||
                                        "/placeholder.svg"
                                      }
                                      alt={player.player}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-xs font-bold">
                                      {player.player
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </span>
                                  )}
                                </div>
                                {player.player}
                              </div>
                            </td>
                            <td className="py-1 px-1 text-center border-r border-gray-200">{player.team}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.gp}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.gs}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.min}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.pts}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.twopm}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.twopa}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.twop}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">
                              {player.threepm}
                            </td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">
                              {player.threepa}
                            </td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">
                              {player.threep}
                            </td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.ftm}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.fta}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.ft}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.or}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.dr}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.tr}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.ast}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.stl}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.to}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.blk}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.blka}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.fc}</td>
                            <td className="py-1 px-1 text-center border-r border-gray-200 font-mono">{player.fd}</td>
                            <td className="py-1 px-1 text-center font-mono">{player.pir}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="players" className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-md p-4 border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">Player Statistics</h3>
                  <HelpCircle className="h-4 w-5 text-gray-400" />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex rounded-full bg-gray-100 p-0.5">
                    <button
                      onClick={() => setPlayerStatsMode("avg")}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        playerStatsMode === "avg" ? "bg-[#1a365d] text-white" : "text-[#1a365d]"
                      }`}
                    >
                      Avg
                    </button>
                    <button
                      onClick={() => setPlayerStatsMode("per40")}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        playerStatsMode === "per40" ? "bg-[#1a365d] text-white" : "text-[#1a365d]"
                      }`}
                    >
                      Per 40
                    </button>
                    <button
                      onClick={() => setPlayerStatsMode("total")}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        playerStatsMode === "total" ? "bg-[#1a365d] text-white" : "text-[#1a365d]"
                      }`}
                    >
                      Total
                    </button>
                  </div>
                </div>
              </div>

              {/* Player statistics content */}
              <div className="overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                  <div className="relative w-64">
                    <input
                      type="text"
                      placeholder="Search player..."
                      value={playerSearchQuery}
                      onChange={(e) => setPlayerSearchQuery(e.target.value)}
                      className="px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>

                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b-2 border-t-2 border-gray-700 bg-gray-50 h-10">
                      <th
                        className="text-left py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                        onClick={() => handlePlayerSort("player")}
                      >
                        <div className="flex items-center">Player {renderPlayerSortIndicator("player")}</div>
                      </th>
                      <th
                        className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                        onClick={() => handlePlayerSort("team")}
                      >
                        <div className="flex items-center justify-center">Team {renderPlayerSortIndicator("team")}</div>
                      </th>
                      <th
                        className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                        onClick={() => handlePlayerSort("gp")}
                      >
                        <div className="flex items-center justify-center">GP {renderPlayerSortIndicator("gp")}</div>
                      </th>
                      <th
                        className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                        onClick={() => handlePlayerSort("pts")}
                      >
                        <div className="flex items-center justify-center">PTS {renderPlayerSortIndicator("pts")}</div>
                      </th>
                      <th
                        className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                        onClick={() => handlePlayerSort("tr")}
                      >
                        <div className="flex items-center justify-center">REB {renderPlayerSortIndicator("tr")}</div>
                      </th>
                      <th
                        className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                        onClick={() => handlePlayerSort("ast")}
                      >
                        <div className="flex items-center justify-center">AST {renderPlayerSortIndicator("ast")}</div>
                      </th>
                      <th
                        className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                        onClick={() => handlePlayerSort("stl")}
                      >
                        <div className="flex items-center justify-center">STL {renderPlayerSortIndicator("stl")}</div>
                      </th>
                      <th
                        className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                        onClick={() => handlePlayerSort("blk")}
                      >
                        <div className="flex items-center justify-center">BLK {renderPlayerSortIndicator("blk")}</div>
                      </th>
                      <th
                        className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                        onClick={() => handlePlayerSort("pir")}
                      >
                        <div className="flex items-center justify-center">PIR {renderPlayerSortIndicator("pir")}</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedPlayers.map((player, index) => (
                      <tr
                        key={player.player}
                        className={`border-b-2 border-gray-200 hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="py-1 px-2 font-medium border-r border-gray-200 whitespace-nowrap">
                          {player.player}
                        </td>
                        <td className="py-1 px-2 text-center border-r border-gray-200">
                          <div className="flex items-center justify-center">
                            {getTeamLogo(player.team)}
                            {player.team}
                          </div>
                        </td>
                        <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.gp}</td>
                        <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.pts}</td>
                        <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.tr}</td>
                        <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.ast}</td>
                        <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.stl}</td>
                        <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.blk}</td>
                        <td className="py-1 px-2 text-center border-r border-gray-200 font-mono">{player.pir}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
