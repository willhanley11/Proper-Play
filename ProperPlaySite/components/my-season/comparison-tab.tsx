"use client"

import { useState } from "react"
import { Users, Plus, X, Search } from "lucide-react"

// Mock player data for comparison
const playerData = {
  id: "player1",
  name: "John Smith",
  team: "Lenovo Tenerife",
  teamAbbr: "TEN",
  position: "SF",
  number: "23",
  height: "208cm",
  weight: "102kg",
  imageUrl: "//www.acb.com/fotos_cara/jugadores/J10CLACB61.jpg",
  teamLogoUrl: "https://static.acb.com/img/www/clubes2024/2425LaLagunaTenerifeLogo.png",
  primaryColor: "bg-purple-700",
  secondaryColor: "bg-yellow-400",
  gamesPlayed: 15,
  gamesStarted: 12,
  experience: 5,
  draftYear: 2018,
  draftPosition: 23,
  age: 26,
  country: "USA",
  plusMinus: 3.2,
}

// Mock comparison player data
const comparisonPlayerData = {
  id: "player2",
  name: "Alex Johnson",
  team: "Real Madrid",
  teamAbbr: "RMB",
  position: "PF",
  number: "15",
  height: "206cm",
  weight: "105kg",
  imageUrl: "//www.acb.com/fotos_cara/jugadores/J10CLACB61.jpg", // Updated to use John Smith's image
  teamLogoUrl: "https://static.acb.com/img/www/clubes2024/2425RealMadridLogo.png",
  primaryColor: "bg-blue-700",
  secondaryColor: "bg-white",
  gamesPlayed: 14,
  gamesStarted: 14,
  experience: 7,
  draftYear: 2016,
  draftPosition: 15,
  age: 28,
  country: "Spain",
  plusMinus: 4.5,
}

// Additional mock players
const additionalPlayers = [
  {
    id: "player3",
    name: "Carlos Rodriguez",
    team: "Barcelona",
    teamAbbr: "BAR",
    position: "PG",
    number: "7",
    height: "192cm",
    weight: "88kg",
    imageUrl: "//www.acb.com/fotos_cara/jugadores/J10CLACB61.jpg", // Updated to use John Smith's image
    teamLogoUrl: "https://static.acb.com/img/www/clubes2024/2425BarcelonaLogo.png",
    primaryColor: "bg-blue-700",
    secondaryColor: "bg-red-500",
    gamesPlayed: 16,
    gamesStarted: 15,
    experience: 4,
    draftYear: 2019,
    draftPosition: 32,
    age: 24,
    country: "Spain",
    plusMinus: 2.1,
  },
  {
    id: "player4",
    name: "Marco Belinelli",
    team: "Virtus Bologna",
    teamAbbr: "VIR",
    position: "SG",
    number: "3",
    height: "196cm",
    weight: "94kg",
    imageUrl: "//www.acb.com/fotos_cara/jugadores/J167LACB60.jpg",
    teamLogoUrl: "https://static.acb.com/img/www/clubes2024/2425VirtusBolognaLogo.png",
    primaryColor: "bg-black",
    secondaryColor: "bg-white",
    gamesPlayed: 13,
    gamesStarted: 12,
    experience: 12,
    draftYear: 2007,
    draftPosition: 18,
    age: 37,
    country: "Italy",
    plusMinus: 1.8,
  },
  {
    id: "player5",
    name: "Nikola Mirotic",
    team: "Olimpia Milano",
    teamAbbr: "MIL",
    position: "PF",
    number: "33",
    height: "208cm",
    weight: "107kg",
    imageUrl: "//www.acb.com/fotos_cara/jugadores/J167LACB61.jpg",
    teamLogoUrl: "https://static.acb.com/img/www/clubes2024/2425OlimpiaMilanoLogo.png",
    primaryColor: "bg-red-600",
    secondaryColor: "bg-white",
    gamesPlayed: 15,
    gamesStarted: 15,
    experience: 9,
    draftYear: 2011,
    draftPosition: 23,
    age: 32,
    country: "Montenegro",
    plusMinus: 5.2,
  },
]

// Shot distribution data for each player
const shotDistributionData = {
  player1: {
    threePointers: 38,
    twoPointers: 52,
    freeThrows: 10,
  },
  player2: {
    threePointers: 25,
    twoPointers: 60,
    freeThrows: 15,
  },
  player3: {
    threePointers: 45,
    twoPointers: 40,
    freeThrows: 15,
  },
  player4: {
    threePointers: 55,
    twoPointers: 30,
    freeThrows: 15,
  },
  player5: {
    threePointers: 30,
    twoPointers: 45,
    freeThrows: 25,
  },
}

// Mock stats for both players
const playerStats = {
  points: 13.3,
  rebounds: 5.2,
  assists: 4.2,
  steals: 1.1,
  blocks: 0.3,
  threePointsMade: 1.8,
  fieldGoalPercentage: 47.0,
  threePointPercentage: 40.0,
  freeThrowPercentage: 62.5,
  minutes: 27.5,
  turnovers: 2.1,
  offensiveRebounds: 1.5,
  defensiveRebounds: 3.7,
  usagePercentage: 18.4,
  assistToTurnoverRatio: 2.0,
  effectiveFieldGoalPercentage: 52.3,
  trueShootingPercentage: 55.8,
  plusMinus: 3.2,
}

const comparisonPlayerStats = {
  points: 15.7,
  rebounds: 6.8,
  assists: 2.5,
  steals: 0.9,
  blocks: 0.7,
  threePointsMade: 1.2,
  fieldGoalPercentage: 51.0,
  threePointPercentage: 35.0,
  freeThrowPercentage: 78.0,
  minutes: 29.2,
  turnovers: 1.8,
  offensiveRebounds: 2.3,
  defensiveRebounds: 4.5,
  usagePercentage: 21.2,
  assistToTurnoverRatio: 1.4,
  effectiveFieldGoalPercentage: 54.1,
  trueShootingPercentage: 58.2,
  plusMinus: 4.5,
}

// Additional player stats
const additionalPlayerStats = [
  {
    points: 11.2,
    rebounds: 3.1,
    assists: 7.8,
    steals: 1.5,
    blocks: 0.2,
    threePointsMade: 1.5,
    fieldGoalPercentage: 44.0,
    threePointPercentage: 38.0,
    freeThrowPercentage: 85.0,
    minutes: 28.5,
    turnovers: 2.3,
    offensiveRebounds: 0.8,
    defensiveRebounds: 2.3,
    usagePercentage: 16.8,
    assistToTurnoverRatio: 3.4,
    effectiveFieldGoalPercentage: 48.5,
    trueShootingPercentage: 53.2,
    plusMinus: 2.1,
  },
  {
    points: 14.5,
    rebounds: 2.8,
    assists: 2.1,
    steals: 0.8,
    blocks: 0.1,
    threePointsMade: 2.6,
    fieldGoalPercentage: 43.0,
    threePointPercentage: 41.0,
    freeThrowPercentage: 88.0,
    minutes: 25.8,
    turnovers: 1.2,
    offensiveRebounds: 0.5,
    defensiveRebounds: 2.3,
    usagePercentage: 19.5,
    assistToTurnoverRatio: 1.8,
    effectiveFieldGoalPercentage: 51.2,
    trueShootingPercentage: 56.5,
    plusMinus: 1.8,
  },
  {
    points: 16.8,
    rebounds: 7.5,
    assists: 1.8,
    steals: 0.7,
    blocks: 0.9,
    threePointsMade: 1.9,
    fieldGoalPercentage: 49.0,
    threePointPercentage: 37.0,
    freeThrowPercentage: 82.0,
    minutes: 30.2,
    turnovers: 1.5,
    offensiveRebounds: 2.1,
    defensiveRebounds: 5.4,
    usagePercentage: 22.5,
    assistToTurnoverRatio: 1.2,
    effectiveFieldGoalPercentage: 53.8,
    trueShootingPercentage: 57.5,
    plusMinus: 5.2,
  },
]

// Mock percentiles for both players
const playerPercentiles = {
  points: 65,
  rebounds: 48,
  assists: 72,
  steals: 33,
  blocks: 20,
  threePointsMade: 59,
  fieldGoalPercentage: 42,
  threePointPercentage: 59,
  freeThrowPercentage: 35,
  usagePercentage: 55,
  assistToTurnoverRatio: 62,
  effectiveFieldGoalPercentage: 51,
  trueShootingPercentage: 58,
  plusMinus: 62,
}

const comparisonPlayerPercentiles = {
  points: 78,
  rebounds: 65,
  assists: 45,
  steals: 28,
  blocks: 52,
  threePointsMade: 42,
  fieldGoalPercentage: 68,
  threePointPercentage: 48,
  freeThrowPercentage: 72,
  usagePercentage: 70,
  assistToTurnoverRatio: 38,
  effectiveFieldGoalPercentage: 62,
  trueShootingPercentage: 65,
  plusMinus: 75,
}

// Additional player percentiles
const additionalPlayerPercentiles = [
  {
    points: 55,
    rebounds: 32,
    assists: 88,
    steals: 68,
    blocks: 15,
    threePointsMade: 52,
    fieldGoalPercentage: 38,
    threePointPercentage: 55,
    freeThrowPercentage: 82,
    usagePercentage: 48,
    assistToTurnoverRatio: 85,
    effectiveFieldGoalPercentage: 45,
    trueShootingPercentage: 50,
    plusMinus: 48,
  },
  {
    points: 70,
    rebounds: 25,
    assists: 38,
    steals: 30,
    blocks: 8,
    threePointsMade: 75,
    fieldGoalPercentage: 35,
    threePointPercentage: 62,
    freeThrowPercentage: 88,
    usagePercentage: 58,
    assistToTurnoverRatio: 45,
    effectiveFieldGoalPercentage: 55,
    trueShootingPercentage: 60,
    plusMinus: 42,
  },
  {
    points: 82,
    rebounds: 72,
    assists: 35,
    steals: 25,
    blocks: 58,
    threePointsMade: 60,
    fieldGoalPercentage: 55,
    threePointPercentage: 52,
    freeThrowPercentage: 78,
    usagePercentage: 75,
    assistToTurnoverRatio: 30,
    effectiveFieldGoalPercentage: 60,
    trueShootingPercentage: 62,
    plusMinus: 82,
  },
]

// Mock list of players for the dropdown
const playerOptions = [
  { id: "player3", name: "Carlos Rodriguez", team: "Barcelona" },
  { id: "player4", name: "Marco Belinelli", team: "Virtus Bologna" },
  { id: "player5", name: "Nikola Mirotic", team: "Olimpia Milano" },
  { id: "player6", name: "Shane Larkin", team: "Anadolu Efes" },
  { id: "player7", name: "Mike James", team: "Monaco" },
]

// Combined stats to display in the comparison table, organized by category
const statsToCompare = [
  // Category headers
  { key: "generalHeader", label: "GENERAL", isHeader: true },
  // General stats
  { key: "points", label: "PTS", format: "1", hasPercentile: true, category: "general" },
  { key: "rebounds", label: "REB", format: "1", hasPercentile: true, category: "general" },
  { key: "assists", label: "AST", format: "1", hasPercentile: true, category: "general" },
  { key: "threePointsMade", label: "3PM", format: "1", hasPercentile: true, category: "general" },
  { key: "steals", label: "STL", format: "1", hasPercentile: true, category: "general" },
  { key: "blocks", label: "BLK", format: "1", hasPercentile: true, category: "general" },

  // Shooting header
  { key: "shootingHeader", label: "SHOOTING", isHeader: true },
  // Shot distribution as first item in shooting section
  { key: "shotDistribution", label: "SHOTS", format: "custom", hasPercentile: false, category: "shooting" },
  // Shooting stats
  { key: "fieldGoalPercentage", label: "2P%", format: "3", hasPercentile: true, category: "shooting" },
  { key: "threePointPercentage", label: "3P%", format: "3", hasPercentile: true, category: "shooting" },
  { key: "freeThrowPercentage", label: "FT%", format: "3", hasPercentile: true, category: "shooting" },

  // Advanced header
  { key: "advancedHeader", label: "ADVANCED", isHeader: true },
  // Advanced stats
  { key: "effectiveFieldGoalPercentage", label: "eFG%", format: "3", hasPercentile: true, category: "advanced" },
  { key: "usagePercentage", label: "USG%", format: "1", hasPercentile: true, category: "advanced" },
  { key: "assistToTurnoverRatio", label: "AST/TO", format: "1", hasPercentile: true, category: "advanced" },
  { key: "plusMinus", label: "+/-", format: "1", hasPercentile: true, category: "advanced" },
]

// First, add these mock league averages after the statsToCompare array
const leagueAverages = {
  gamesPlayed: 12,
  points: 11.2,
  rebounds: 4.8,
  assists: 3.1,
  steals: 0.8,
  blocks: 0.4,
  threePointsMade: 1.3,
  fieldGoalPercentage: 45.0,
  threePointPercentage: 33.0,
  freeThrowPercentage: 70.0,
  minutes: 25.0,
  turnovers: 2.0,
  offensiveRebounds: 1.2,
  defensiveRebounds: 3.6,
  usagePercentage: 16.5,
  assistToTurnoverRatio: 1.5,
  effectiveFieldGoalPercentage: 48.5,
  trueShootingPercentage: 52.0,
  plusMinus: 0.0,
}

// Mock league max values (for scaling the bars)
const leagueMaxValues = {
  points: 25.0,
  rebounds: 12.0,
  assists: 8.0,
  steals: 2.5,
  blocks: 2.0,
  threePointsMade: 3.5,
  fieldGoalPercentage: 65.0,
  threePointPercentage: 50.0,
  freeThrowPercentage: 95.0,
  minutes: 35.0,
  turnovers: 4.0,
  offensiveRebounds: 4.0,
  defensiveRebounds: 8.0,
  usagePercentage: 30.0,
  assistToTurnoverRatio: 4.0,
  effectiveFieldGoalPercentage: 65.0,
  trueShootingPercentage: 70.0,
  plusMinus: 10.0,
}

// Mock game-by-game data for player 1
const player1GameByGame = [
  { game: 1, points: 12, rebounds: 5, assists: 3 },
  { game: 2, points: 15, rebounds: 6, assists: 4 },
  { game: 3, points: 10, rebounds: 4, assists: 5 },
  { game: 4, points: 18, rebounds: 7, assists: 3 },
  { game: 5, points: 14, rebounds: 5, assists: 6 },
  { game: 6, points: 11, rebounds: 4, assists: 4 },
  { game: 7, points: 16, rebounds: 6, assists: 5 },
  { game: 8, points: 13, rebounds: 5, assists: 4 },
  { game: 9, points: 15, rebounds: 6, assists: 3 },
  { game: 10, points: 12, rebounds: 4, assists: 5 },
]

// Mock game-by-game data for player 2
const player2GameByGame = [
  { game: 1, points: 14, rebounds: 7, assists: 2 },
  { game: 2, points: 16, rebounds: 8, assists: 3 },
  { game: 3, points: 18, rebounds: 6, assists: 2 },
  { game: 4, points: 12, rebounds: 7, assists: 3 },
  { game: 5, points: 15, rebounds: 6, assists: 2 },
  { game: 6, points: 17, rebounds: 8, assists: 1 },
  { game: 7, points: 14, rebounds: 7, assists: 3 },
  { game: 8, points: 16, rebounds: 6, assists: 2 },
  { game: 9, points: 18, rebounds: 7, assists: 3 },
  { game: 10, points: 15, rebounds: 7, assists: 2 },
]

// Mock trend data for player 1
const player1TrendData = [
  { month: "Oct", points: 11.2, rebounds: 4.8, assists: 3.5 },
  { month: "Nov", points: 12.5, rebounds: 5.0, assists: 4.0 },
  { month: "Dec", points: 13.8, rebounds: 5.3, assists: 4.2 },
  { month: "Jan", points: 14.2, rebounds: 5.5, assists: 4.5 },
  { month: "Feb", points: 15.0, rebounds: 5.2, assists: 4.8 },
]

// Mock trend data for player 2
const player2TrendData = [
  { month: "Oct", points: 14.5, rebounds: 6.2, assists: 2.2 },
  { month: "Nov", points: 15.2, rebounds: 6.5, assists: 2.3 },
  { month: "Dec", points: 16.0, rebounds: 6.8, assists: 2.5 },
  { month: "Jan", points: 15.8, rebounds: 7.0, assists: 2.6 },
  { month: "Feb", points: 17.0, rebounds: 7.5, assists: 2.8 },
]

// First, let's add the getPercentileBarColor and getPercentileCircleColor functions from the offense tab

// Update the getPercentileBarColor function to match the one in offense-tab.tsx
const getPercentileBarColor = (percentile: number) => {
  if (percentile < 20) return "bg-red-700" // Very low - intense red
  if (percentile < 35) return "bg-red-500"
  if (percentile < 45) return "bg-red-300"
  if (percentile < 55) return "bg-gray-300" // Average - neutral
  if (percentile < 65) return "bg-teal-300"
  if (percentile < 80) return "bg-teal-500"
  return "bg-teal-700" // Very high - intense teal
}

// Add the getPercentileCircleColor function from offense-tab.tsx
const getPercentileCircleColor = (percentile: number) => {
  return "bg-white" // Always white background
}

// Type definitions for player data
type PlayerData = {
  id: string
  name: string
  team: string
  teamAbbr: string
  position: string
  number: string
  height: string
  weight: string
  imageUrl: string
  teamLogoUrl: string
  primaryColor: string
  secondaryColor: string
  gamesPlayed: number
  gamesStarted: number
  experience: number
  draftYear: number
  draftPosition: number
  age: number
  country: string
}

type PlayerStats = {
  points: number
  rebounds: number
  assists: number
  steals: number
  blocks: number
  threePointsMade: number
  fieldGoalPercentage: number
  threePointPercentage: number
  freeThrowPercentage: number
  minutes: number
  turnovers: number
  offensiveRebounds: number
  defensiveRebounds: number
  usagePercentage: number
  assistToTurnoverRatio: number
  effectiveFieldGoalPercentage: number
  trueShootingPercentage: number
  plusMinus: number
}

type PlayerPercentiles = {
  points: number
  rebounds: number
  assists: number
  steals: number
  blocks: number
  threePointsMade: number
  fieldGoalPercentage: number
  threePointPercentage: number
  freeThrowPercentage: number
  usagePercentage: number
  assistToTurnoverRatio: number
  effectiveFieldGoalPercentage: number
  trueShootingPercentage: number
  plusMinus: number
}

// Shot distribution type
type ShotDistribution = {
  threePointers: number
  twoPointers: number
  freeThrows: number
}

// Combine all player data for easy access
const allPlayerData: PlayerData[] = [playerData, comparisonPlayerData, ...additionalPlayers]

const allPlayerStats: PlayerStats[] = [playerStats, comparisonPlayerStats, ...additionalPlayerStats]

const allPlayerPercentiles: PlayerPercentiles[] = [
  playerPercentiles,
  comparisonPlayerPercentiles,
  ...additionalPlayerPercentiles,
]

// Component to render the shot distribution bar
const ShotDistributionBar = ({ playerId }: { playerId: string }) => {
  const distribution = shotDistributionData[playerId as keyof typeof shotDistributionData]

  if (!distribution) {
    return <div className="h-6 w-full bg-gray-200 rounded-full"></div>
  }

  return (
    <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden flex">
      <div
        className="h-full bg-blue-500"
        style={{ width: `${distribution.threePointers}%` }}
        title={`3PT: ${distribution.threePointers}%`}
      >
        {distribution.threePointers >= 15 && (
          <span className="text-[9px] font-bold text-white flex items-center justify-center h-full">
            {distribution.threePointers}%
          </span>
        )}
      </div>
      <div
        className="h-full bg-green-500"
        style={{ width: `${distribution.twoPointers}%` }}
        title={`2PT: ${distribution.twoPointers}%`}
      >
        {distribution.twoPointers >= 15 && (
          <span className="text-[9px] font-bold text-white flex items-center justify-center h-full">
            {distribution.twoPointers}%
          </span>
        )}
      </div>
      <div
        className="h-full bg-purple-600"
        style={{ width: `${distribution.freeThrows}%` }}
        title={`FT: ${distribution.freeThrows}%`}
      >
        {distribution.freeThrows >= 15 && (
          <span className="text-[9px] font-bold text-white flex items-center justify-center h-full">
            {distribution.freeThrows}%
          </span>
        )}
      </div>
    </div>
  )
}

// Legend component for shot distribution
const ShotDistributionLegend = () => {
  return (
    <div className="flex items-center justify-center gap-2 text-[9px]">
      <div className="flex items-center">
        <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
        <span>3PT</span>
      </div>
      <div className="flex items-center">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
        <span>2PT</span>
      </div>
      <div className="flex items-center">
        <div className="w-2 h-2 bg-purple-600 rounded-full mr-1"></div>
        <span>FT</span>
      </div>
    </div>
  )
}

const ComparisonTab = () => {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([playerData.id, comparisonPlayerData.id])
  const [comparisonMode, setComparisonMode] = useState<"average" | "per40">("average")
  const [selectedStat, setSelectedStat] = useState<"points" | "rebounds" | "assists">("points")
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const [bioSectionExpanded, setBioSectionExpanded] = useState<boolean>(true)

  // Maximum number of players allowed
  const MAX_PLAYERS = 4

  // Calculate grid template columns based on number of players
  const getGridTemplateColumns = () => {
    const playerCount = selectedPlayers.length

    if (playerCount === MAX_PLAYERS) {
      // When all 4 players are added, use the full width (no add player columns)
      const playerWidth = Math.floor(84 / playerCount) // 84% for players, 16% for stat names
      return `16% repeat(${playerCount}, ${playerWidth}%)`
    } else if (playerCount === 2) {
      // CHANGE 1: Updated layout with wider player columns and narrower VS column
      return "22% 10% 22% 23% 23%" // Player columns wider (22%), VS column narrower (10%)
    } else if (playerCount === 3) {
      // For 3 players, put stat names on left and distribute remaining space evenly
      return `16% repeat(3, 21%) 21%` // One add player column of 21%
    }
  }

  // Add a new player to comparison
  const addPlayer = () => {
    if (selectedPlayers.length < MAX_PLAYERS) {
      // Find a player that's not already selected
      const availablePlayers = allPlayerData.filter((player) => !selectedPlayers.includes(player.id))
      if (availablePlayers.length > 0) {
        setSelectedPlayers([...selectedPlayers, availablePlayers[0].id])
      }
    }
  }

  // Remove a player from comparison
  const removePlayer = (playerId: string) => {
    if (selectedPlayers.length > 2) {
      setSelectedPlayers(selectedPlayers.filter((id) => id !== playerId))
    }
  }

  // Change a player in the comparison
  const changePlayer = (oldPlayerId: string, newPlayerId: string) => {
    const index = selectedPlayers.indexOf(oldPlayerId)
    if (index !== -1) {
      const newPlayers = [...selectedPlayers]
      newPlayers[index] = newPlayerId
      setSelectedPlayers(newPlayers)
    }
  }

  // Format stat values based on format string
  const formatStat = (value: number, format: string) => {
    if (format === "0") {
      return Math.round(value).toString()
    } else if (format === "1") {
      return value.toFixed(1)
    } else if (format === "3") {
      return (value / 100).toFixed(3).substring(1) // Format as .XXX
    }
    return value.toString()
  }

  // Get color for chart
  const getChartColor = (statType: "points" | "rebounds" | "assists") => {
    switch (statType) {
      case "points":
        return "#1a365d" // dark blue to match header
      case "rebounds":
        return "#10b981" // teal to match percentile bars
      case "assists":
        return "#7c3aed" // purple that matches the theme
      default:
        return "#1a365d"
    }
  }

  // Get available players for dropdown (not already selected)
  const getAvailablePlayers = () => {
    return allPlayerData.filter((player) => !selectedPlayers.includes(player.id))
  }

  // Find the best player for a specific stat
  const findBestPlayerForStat = (statKey: string, isLowerBetter = false) => {
    let bestIndex = 0
    let bestValue = allPlayerStats[selectedPlayers.indexOf(selectedPlayers[0])][statKey as keyof PlayerStats]

    selectedPlayers.forEach((playerId, index) => {
      const playerIndex = allPlayerData.findIndex((p) => p.id === playerId)
      const statValue = allPlayerStats[playerIndex][statKey as keyof PlayerStats]

      if (isLowerBetter) {
        if (statValue < bestValue) {
          bestValue = statValue
          bestIndex = index
        }
      } else {
        if (statValue > bestValue) {
          bestValue = statValue
          bestIndex = index
        }
      }
    })

    return selectedPlayers[bestIndex]
  }

  // Bio section labels
  const bioLabels = ["Name", "Team", "Position", "Games", "Height", "Weight", "Age", "Experience"]

  // Determine if we need to show Add Player columns
  const showAddPlayerColumns = selectedPlayers.length < MAX_PLAYERS
  const showSecondAddPlayerColumn = selectedPlayers.length < 3

  // Toggle bio section expanded/collapsed state
  const toggleBioSection = () => {
    setBioSectionExpanded(!bioSectionExpanded)
  }

  return (
    <div className="space-y-3">
      {/* Main Container */}
      <div className="rounded-lg overflow-hidden border border-gray-200 shadow-md">
        <div className="bg-gradient-to-r from-[#1a365d] to-[#2c5282] py-2 px-3 border-b border-[#1a365d] flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-3.5 w-3.5 mr-1.5 text-gray-200" />
            <h4 className="text-xs font-bold uppercase tracking-wide text-white">PLAYER COMPARISON</h4>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-gray-200">Display Mode:</span>
            <div className="flex rounded-full bg-[#64748b]/70 p-0.5 shadow-inner border border-[#64748b]/50">
              <button
                onClick={() => setComparisonMode("average")}
                className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium transition-all ${
                  comparisonMode === "average"
                    ? "bg-white text-[#1a365d] shadow-sm"
                    : "text-white hover:bg-[#64748b]/50"
                }`}
              >
                Average
              </button>
              <button
                onClick={() => setComparisonMode("per40")}
                className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium transition-all ${
                  comparisonMode === "per40" ? "bg-white text-[#1a365d] shadow-sm" : "text-white hover:bg-[#64748b]/50"
                }`}
              >
                Per 40
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-4">
          {/* Main Comparison Table */}
          <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg max-w-6xl ml-0 mr-auto">
            {/* Search Inputs Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: getGridTemplateColumns(),
              }}
              className="border-b-2 border-gray-400 bg-gradient-to-b from-gray-50 to-white"
            >
              {selectedPlayers.length === 2 ? (
                // For 2 players, we need to handle the VS column in the middle
                <>
                  {/* First player search */}
                  <div className="p-2 bg-blue-50 border-r-2 border-gray-400">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search players or teams..."
                        className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        onClick={() => {
                          // This would open a dropdown with player options in a real implementation
                          console.log("Search clicked")
                        }}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Empty VS column */}
                  <div className="bg-gray-50 border-r-2 border-l-2 border-gray-400"></div>

                  {/* Second player search */}
                  <div className="p-2 bg-blue-50 border-l-2 border-gray-400">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search players or teams..."
                        className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        onClick={() => {
                          // This would open a dropdown with player options in a real implementation
                          console.log("Search clicked")
                        }}
                        readOnly
                      />
                    </div>
                  </div>
                </>
              ) : (
                // For 3+ players, leave an empty cell where stat names will go
                <>
                  {/* Empty cell for stat names */}
                  <div className="flex items-center justify-center border-r-2 border-gray-400 bg-gray-50">
                    {/* Empty cell for stat names */}
                  </div>

                  {/* Search inputs for each player */}
                  {selectedPlayers.map((playerId, index) => (
                    <div
                      key={`search-${playerId}`}
                      className={`p-2 bg-blue-50 ${index < selectedPlayers.length - 1 ? "border-r-2 border-gray-400" : ""}`}
                    >
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search players or teams..."
                          className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          onClick={() => {
                            // This would open a dropdown with player options in a real implementation
                            console.log("Search clicked")
                          }}
                          readOnly
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Empty cells for Add Player button columns - only show if needed */}
              {showAddPlayerColumns && (
                <div className="bg-gray-50 border-l-2 border-gray-400 p-2">{/* Empty cell for add player */}</div>
              )}
              {showSecondAddPlayerColumn && (
                <div className="bg-gray-50 border-l-2 border-gray-400 p-2">
                  {/* Empty cell for second add player */}
                </div>
              )}
            </div>

            {/* Player Photos and Names - Sticky at the top */}
            <div
              className="sticky top-0 z-10 border-b-2 border-gray-400 bg-white"
              style={{
                display: "grid",
                gridTemplateColumns: getGridTemplateColumns(),
              }}
            >
              {/* For 3+ players, leave an empty cell where stat names will go */}
              {selectedPlayers.length > 2 && (
                <div className="flex items-center justify-center border-r-2 border-gray-400 bg-gradient-to-r from-[#1a365d] to-[#2c5282] text-white">
                  <span className="text-xs font-bold">PLAYER</span>
                </div>
              )}

              {/* For 2 players, render them with VS in the middle */}
              {selectedPlayers.length === 2 ? (
                <>
                  {/* First player */}
                  {(() => {
                    const playerIndex = allPlayerData.findIndex((p) => p.id === selectedPlayers[0])
                    const player = allPlayerData[playerIndex]

                    return (
                      <div
                        key={player.id}
                        className="p-3 flex flex-col items-center justify-center bg-gradient-to-b from-[#e2e8f0] to-white border-r-2 border-gray-400"
                      >
                        <div className="relative mb-2">
                          <div className="w-28 h-36 overflow-hidden rounded-lg shadow-lg flex-shrink-0 mx-auto border-2 border-[#1a365d]">
                            <img
                              src={player.imageUrl || "/placeholder.svg?height=128&width=128&query=basketball player"}
                              alt={player.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="text-center mt-2">
                          <div className="text-sm font-bold text-[#1a365d]">{player.name}</div>
                          <div className="text-xs text-gray-600 font-medium">{player.team}</div>
                        </div>
                      </div>
                    )
                  })()}

                  {/* VS in the middle */}
                  <div className="flex items-center justify-center border-r-2 border-l-2 border-gray-400 bg-gradient-to-b from-gray-100 to-white">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1a365d] to-[#2c5282] flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white">
                      VS
                    </div>
                  </div>

                  {/* Second player */}
                  {(() => {
                    const playerIndex = allPlayerData.findIndex((p) => p.id === selectedPlayers[1])
                    const player = allPlayerData[playerIndex]

                    return (
                      <div
                        key={player.id}
                        className="p-3 flex flex-col items-center justify-center bg-gradient-to-b from-[#e2e8f0] to-white border-l-2 border-gray-400"
                      >
                        <div className="relative mb-2">
                          <div className="w-28 h-36 overflow-hidden rounded-lg shadow-lg flex-shrink-0 mx-auto border-2 border-[#1a365d]">
                            <img
                              src={player.imageUrl || "/placeholder.svg?height=128&width=128&query=basketball player"}
                              alt={player.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="text-center mt-2">
                          <div className="text-sm font-bold text-[#1a365d]">{player.name}</div>
                          <div className="text-xs text-gray-600 font-medium">{player.team}</div>
                        </div>
                      </div>
                    )
                  })()}
                </>
              ) : (
                /* For 3+ players, render them in sequence */
                selectedPlayers.map((playerId, index) => {
                  const playerIndex = allPlayerData.findIndex((p) => p.id === playerId)
                  const player = allPlayerData[playerIndex]

                  return (
                    <div
                      key={player.id}
                      className={`p-2 flex flex-col items-center justify-center bg-gradient-to-b from-[#e2e8f0] to-white ${
                        index < selectedPlayers.length - 1 ? "border-r-2 border-gray-400" : ""
                      }`}
                    >
                      <div className="relative">
                        <div className="w-20 h-28 overflow-hidden rounded-lg shadow-lg flex-shrink-0 mx-auto border-2 border-[#1a365d]">
                          <img
                            src={player.imageUrl || "/placeholder.svg?height=128&width=128&query=basketball player"}
                            alt={player.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="text-center mt-1">
                        <div className="text-xs font-bold text-[#1a365d]">{player.name}</div>
                        <div className="text-[9px] text-gray-600">{player.team}</div>
                      </div>
                      {selectedPlayers.length > 2 && (
                        <button
                          onClick={() => removePlayer(player.id)}
                          className="mt-1 text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove player"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  )
                })
              )}

              {/* Only render Add Player columns if we have fewer than MAX_PLAYERS players */}
              {showAddPlayerColumns && (
                <div className="flex items-center justify-center bg-gray-50 border-l-2 border-gray-400 p-3">
                  <button
                    onClick={addPlayer}
                    className="flex flex-col items-center justify-center p-3 text-gray-500 hover:text-[#1a365d] transition-colors border-2 border-dashed border-gray-300 rounded-lg w-full h-full bg-gray-50 hover:bg-gray-100"
                    title="Add player"
                  >
                    <Plus className="h-6 w-6 mb-1" />
                    <span className="text-xs font-medium">Add Player</span>
                  </button>
                </div>
              )}

              {/* Second Add Player button column - only show if we have fewer than 3 players */}
              {showSecondAddPlayerColumn && (
                <div className="flex items-center justify-center bg-gray-50 border-l-2 border-gray-400 p-3">
                  <button
                    onClick={addPlayer}
                    className="flex flex-col items-center justify-center p-3 text-gray-500 hover:text-[#1a365d] transition-colors border-2 border-dashed border-gray-300 rounded-lg w-full h-full bg-gray-50 hover:bg-gray-100"
                    title="Add player"
                  >
                    <Plus className="h-6 w-6 mb-1" />
                    <span className="text-xs font-medium">Add Player</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bio Rows */}
            <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-[500px] opacity-100">
              {bioLabels.slice(4).map((label, labelIndex) => {
                const dataKey =
                  label.toLowerCase() === "height"
                    ? "height"
                    : label.toLowerCase() === "weight"
                      ? "weight"
                      : label.toLowerCase() === "age"
                        ? "age"
                        : "experience"

                return (
                  <div
                    key={label}
                    className={`hover:bg-gray-50 transition-colors duration-150 ${
                      labelIndex === bioLabels.length - 5 ? "border-b-2 border-[#1a365d]" : "border-b-2 border-gray-400"
                    }`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: getGridTemplateColumns(),
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {selectedPlayers.length === 2 ? (
                      // For 2 players, specific layout: player1 | label | player2 | add player | add player
                      <>
                        {/* Player 1 data */}
                        <div className="py-1.5 px-3 text-center text-gray-700 text-xs font-semibold bg-gradient-to-b from-[#e2e8f0] to-white border-r-2 border-gray-400">
                          {(() => {
                            const playerIndex = allPlayerData.findIndex((p) => p.id === selectedPlayers[0])
                            const player = allPlayerData[playerIndex]
                            let value = player[dataKey as keyof PlayerData]

                            // Add "years" suffix for age and experience
                            if (dataKey === "age" || dataKey === "experience") {
                              value = `${value} years`
                            }

                            return value
                          })()}
                        </div>

                        {/* Label in the middle */}
                        <div className="py-1.5 px-1 text-center font-bold bg-gradient-to-r from-[#1a365d] to-[#2c5282] text-white text-xs border-l-2 border-r-2 border-gray-400 flex items-center justify-center">
                          {label}
                        </div>

                        {/* Player 2 data */}
                        <div className="py-1.5 px-3 text-center text-gray-700 text-xs font-semibold bg-gradient-to-b from-[#e2e8f0] to-white border-l-2 border-gray-400">
                          {(() => {
                            const playerIndex = allPlayerData.findIndex((p) => p.id === selectedPlayers[1])
                            const player = allPlayerData[playerIndex]
                            let value = player[dataKey as keyof PlayerData]

                            // Add "years" suffix for age and experience
                            if (dataKey === "age" || dataKey === "experience") {
                              value = `${value} years`
                            }

                            return value
                          })()}
                        </div>
                      </>
                    ) : (
                      // For 3+ players
                      <>
                        {/* Label on the left */}
                        <div className="py-1.5 px-1 text-center font-bold bg-gradient-to-r from-[#1a365d] to-[#2c5282] text-white text-xs border-r-2 border-gray-400">
                          {label}
                        </div>

                        {/* Player data */}
                        {selectedPlayers.map((playerId, index) => {
                          const playerIndex = allPlayerData.findIndex((p) => p.id === playerId)
                          const player = allPlayerData[playerIndex]
                          let value = player[dataKey as keyof PlayerData]

                          // Add "years" suffix for age and experience
                          if (dataKey === "age" || dataKey === "experience") {
                            value = `${value} years`
                          }

                          return (
                            <div
                              key={`${player.id}-${dataKey}`}
                              className={`py-1.5 px-3 text-center text-gray-700 text-xs font-semibold bg-gradient-to-b from-[#e2e8f0] to-white ${
                                index < selectedPlayers.length - 1 ? "border-r-2 border-gray-400" : ""
                              }`}
                            >
                              {value}
                            </div>
                          )
                        })}
                      </>
                    )}

                    {/* Empty cells for Add Player button columns - only show if needed */}
                    {showAddPlayerColumns && (
                      <div className="bg-gray-50 border-l-2 border-gray-400 flex items-center justify-center">
                        <span className="text-xs text-gray-400">-</span>
                      </div>
                    )}
                    {showSecondAddPlayerColumn && (
                      <div className="bg-gray-50 border-l-2 border-gray-400 flex items-center justify-center">
                        <span className="text-xs text-gray-400">-</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Stats Comparison Rows */}
            {statsToCompare.map((stat, index) => {
              // If this is a header row, render it differently
              if (stat.isHeader) {
                return (
                  <div
                    key={stat.key}
                    className="bg-white"
                    style={{
                      display: "grid",
                      gridTemplateColumns: getGridTemplateColumns(),
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    <div
                      className="relative mb-3 px-2 pt-3"
                      style={{
                        gridColumn:
                          selectedPlayers.length === 2
                            ? "1 / 4" // span player1, label, player2 for 2 players
                            : selectedPlayers.length === 3
                              ? "1 / 5" // span label + 3 players for 3 players
                              : "1 / 6", // span all columns for 4 players (1 label + 4 players)
                      }}
                    >
                      <div className="flex items-center justify-center w-full mb-1">
                        <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                          {stat.label}
                        </span>
                      </div>
                      <div className="h-1 w-full bg-[#1a365d]"></div>
                    </div>
                    {showAddPlayerColumns && <div className="bg-gray-50 border-l-2 border-gray-400"></div>}
                    {showSecondAddPlayerColumn && <div className="bg-gray-50 border-l-2 border-gray-400"></div>}
                  </div>
                )
              }

              // Special case for shot distribution
              if (stat.key === "shotDistribution") {
                return (
                  <div
                    key={stat.key}
                    className="transition-all duration-150 hover:bg-gray-50 border-b-2 border-gray-400 bg-white"
                    style={{
                      display: "grid",
                      gridTemplateColumns: getGridTemplateColumns(),
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {selectedPlayers.length === 2 ? (
                      // For 2 players, specific layout: player1 | label | player2 | add player | add player
                      <>
                        {/* Player 1 Shot Distribution */}
                        <div className="py-2 px-3 flex items-center justify-center border-r-2 border-gray-400">
                          <ShotDistributionBar playerId={selectedPlayers[0]} />
                        </div>

                        {/* Label in the middle */}
                        <div className="py-0.5 px-1 text-center bg-gradient-to-r from-[#1a365d] to-[#2c5282] text-white flex flex-col items-center justify-center border-l-2 border-r-2 border-gray-400">
                          <div className="text-xs font-bold whitespace-nowrap">{stat.label}</div>
                          <ShotDistributionLegend />
                        </div>

                        {/* Player 2 Shot Distribution */}
                        <div className="py-2 px-3 flex items-center justify-center border-l-2 border-gray-400">
                          <ShotDistributionBar playerId={selectedPlayers[1]} />
                        </div>
                      </>
                    ) : (
                      // For 3+ players
                      <>
                        {/* Label on the left */}
                        <div className="py-0.5 px-1 text-center bg-gradient-to-r from-[#1a365d] to-[#2c5282] text-white flex flex-col items-center justify-center border-r-2 border-gray-400">
                          <div className="text-xs font-bold whitespace-nowrap">{stat.label}</div>
                          <ShotDistributionLegend />
                        </div>

                        {/* Player Shot Distributions */}
                        {selectedPlayers.map((playerId, playerIdx) => (
                          <div
                            key={`${playerId}-${stat.key}`}
                            className={`py-2 px-3 flex items-center justify-center ${
                              playerIdx < selectedPlayers.length - 1 ? "border-r-2 border-gray-400" : ""
                            }`}
                          >
                            <ShotDistributionBar playerId={playerId} />
                          </div>
                        ))}
                      </>
                    )}

                    {/* Empty cells for Add Player button columns - only show if needed */}
                    {showAddPlayerColumns && (
                      <div className="bg-gray-50 border-l-2 border-gray-400 flex items-center justify-center">
                        <span className="text-xs text-gray-400">-</span>
                      </div>
                    )}
                    {showSecondAddPlayerColumn && (
                      <div className="bg-gray-50 border-l-2 border-gray-400 flex items-center justify-center">
                        <span className="text-xs text-gray-400">-</span>
                      </div>
                    )}
                  </div>
                )
              }

              // For regular stat rows, continue with the existing code
              const leagueAvg = leagueAverages[stat.key as keyof typeof leagueAverages] || 0
              const isLowerBetter = stat.key === "turnovers"
              const bestPlayerId = findBestPlayerForStat(stat.key, isLowerBetter)
              const isEvenRow = index % 2 === 0
              const isRowHovered = hoveredRow === stat.key

              return (
                <div
                  key={stat.key}
                  className={`transition-all duration-150 hover:bg-gray-50 border-b-2 ${
                    isRowHovered ? "border-[#1a365d]" : "border-gray-400"
                  } ${isEvenRow ? "bg-white" : "bg-gray-50/70"} ${isRowHovered ? "shadow-sm" : ""}`}
                  onMouseEnter={() => setHoveredRow(stat.key)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: getGridTemplateColumns(),
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {selectedPlayers.length === 2 ? (
                    // For 2 players, specific layout: player1 | label | player2 | add player | add player
                    <>
                      {/* Player 1 Stats */}
                      <div
                        className={`py-1 px-0 flex items-center border-r-2 border-gray-400 ${
                          selectedPlayers[0] === bestPlayerId ? "bg-orange-200" : ""
                        }`}
                      >
                        {(() => {
                          const playerIndex = allPlayerData.findIndex((p) => p.id === selectedPlayers[0])
                          const playerStat = allPlayerStats[playerIndex][stat.key as keyof PlayerStats] || 0
                          const playerPercentile = stat.hasPercentile
                            ? allPlayerPercentiles[playerIndex][stat.key as keyof PlayerPercentiles] || 0
                            : null
                          const isBest = selectedPlayers[0] === bestPlayerId

                          return (
                            <>
                              {/* Stat value */}
                              <div className="w-12 text-xs font-bold text-gray-800 text-center px-2 py-0.5 border-r border-gray-300">
                                {formatStat(playerStat, stat.format)}
                              </div>

                              {/* Percentile bar */}
                              {playerPercentile !== null && (
                                <div className="flex-1 h-2.5 relative px-2 py-0.5 border-r border-gray-300 flex items-center justify-center">
                                  {/* Background bar */}
                                  <div className="absolute inset-x-2 inset-y-0 bg-gray-200 rounded-full"></div>

                                  {/* Colored bar */}
                                  <div
                                    className={`absolute inset-y-0 left-0 ${getPercentileBarColor(playerPercentile)} rounded-full`}
                                    style={{ width: `${playerPercentile}%`, maxWidth: "calc(100% - 16px)" }}
                                  ></div>

                                  {/* Percentile circle */}
                                  <div
                                    className="absolute flex items-center justify-center"
                                    style={{
                                      left: `calc(${playerPercentile}% + 2px)`,
                                      top: "50%",
                                      transform: "translate(-50%, -50%)",
                                    }}
                                  >
                                    <div
                                      className={`${getPercentileCircleColor(playerPercentile)} rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold text-gray-700 shadow-sm border-2 border-gray-400 z-10`}
                                    >
                                      {playerPercentile}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Better indicator */}
                              <div className="w-6 flex items-center justify-center px-1 py-0.5">
                                {isBest && (
                                  <div className="bg-orange-500 rounded-full w-3.5 h-3.5 flex items-center justify-center shadow-sm">
                                    <span className="text-white font-bold text-[8px]">+</span>
                                  </div>
                                )}
                              </div>
                            </>
                          )
                        })()}
                      </div>

                      {/* Stat label in the middle */}
                      <div className="py-0.5 px-1 text-center bg-gradient-to-r from-[#1a365d] to-[#2c5282] text-white flex items-center justify-center border-l-2 border-r-2 border-gray-400">
                        <div className="text-xs font-bold whitespace-nowrap">{stat.label}</div>
                        <div className="text-[9px] text-gray-200 ml-1 whitespace-nowrap">
                          ({formatStat(leagueAvg, stat.format)})
                        </div>
                      </div>

                      {/* Player 2 Stats */}
                      <div
                        className={`py-1 px-0 flex items-center border-l-2 border-gray-400 ${
                          selectedPlayers[1] === bestPlayerId ? "bg-orange-200" : ""
                        }`}
                      >
                        {(() => {
                          const playerIndex = allPlayerData.findIndex((p) => p.id === selectedPlayers[1])
                          const playerStat = allPlayerStats[playerIndex][stat.key as keyof PlayerStats] || 0
                          const playerPercentile = stat.hasPercentile
                            ? allPlayerPercentiles[playerIndex][stat.key as keyof PlayerPercentiles] || 0
                            : null
                          const isBest = selectedPlayers[1] === bestPlayerId

                          return (
                            <>
                              {/* Better indicator with border */}
                              <div className="w-6 flex items-center justify-center px-1 py-0.5 border-r border-gray-300">
                                {isBest && (
                                  <div className="bg-orange-500 rounded-full w-3.5 h-3.5 flex items-center justify-center shadow-sm">
                                    <span className="text-white font-bold text-[8px]">+</span>
                                  </div>
                                )}
                              </div>

                              {/* Percentile bar */}
                              {playerPercentile !== null && (
                                <div className="flex-1 h-2.5 relative px-2 py-0.5 flex items-center justify-center">
                                  {/* Background bar */}
                                  <div className="absolute inset-x-2 inset-y-0 bg-gray-200 rounded-full"></div>

                                  {/* Colored bar */}
                                  <div
                                    className={`absolute inset-y-0 left-2 ${getPercentileBarColor(playerPercentile)} rounded-full`}
                                    style={{ width: `${playerPercentile}%`, maxWidth: "calc(100% - 16px)" }}
                                  ></div>

                                  {/* Percentile circle */}
                                  <div
                                    className="absolute flex items-center justify-center"
                                    style={{
                                      left: `calc(${playerPercentile}% + 2px)`,
                                      top: "50%",
                                      transform: "translate(-50%, -50%)",
                                    }}
                                  >
                                    <div
                                      className={`${getPercentileCircleColor(playerPercentile)} rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold text-gray-700 shadow-sm border-2 border-gray-400 z-10`}
                                    >
                                      {playerPercentile}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Stat value */}
                              <div className="w-12 text-xs font-bold text-gray-800 text-center px-2 py-0.5 border-l border-gray-300">
                                {formatStat(playerStat, stat.format)}
                              </div>
                            </>
                          )
                        })()}
                      </div>
                    </>
                  ) : (
                    // For 3+ players
                    <>
                      {/* For 3+ players, put stat label on the left */}
                      <div className="py-0.5 px-1 text-center bg-gradient-to-r from-[#1a365d] to-[#2c5282] text-white flex items-center justify-center border-r-2 border-gray-400">
                        <div className="text-xs font-bold whitespace-nowrap">{stat.label}</div>
                        <div className="text-[9px] text-gray-200 ml-1 whitespace-nowrap">
                          ({formatStat(leagueAvg, stat.format)})
                        </div>
                      </div>

                      {/* Player Stats */}
                      {selectedPlayers.map((playerId, playerIdx) => {
                        const playerIndex = allPlayerData.findIndex((p) => p.id === playerId)
                        const playerStat = allPlayerStats[playerIndex][stat.key as keyof PlayerStats] || 0
                        const playerPercentile = stat.hasPercentile
                          ? allPlayerPercentiles[playerIndex][stat.key as keyof PlayerPercentiles] || 0
                          : null
                        const isBest = playerId === bestPlayerId

                        return (
                          <div
                            key={`${playerId}-${stat.key}`}
                            className={`py-1 px-0 flex items-center ${
                              playerIdx < selectedPlayers.length - 1 ? "border-r-2 border-gray-400" : ""
                            } ${isBest ? "bg-orange-200" : ""}`}
                          >
                            {/* All players have the same layout: stat value, percentile bar, better indicator */}
                            <>
                              {/* Stat value */}
                              <div
                                className={`w-12 text-xs font-bold text-gray-800 text-center px-2 py-0.5 ${playerIdx === 0 ? "border-r" : "border-l border-r"} border-gray-300`}
                              >
                                {formatStat(playerStat, stat.format)}
                              </div>

                              {/* Percentile bar */}
                              {playerPercentile !== null && (
                                <div className="flex-1 h-2.5 relative px-2 py-0.5 border-r border-gray-300 flex items-center justify-center">
                                  {/* Background bar */}
                                  <div className="absolute inset-x-2 inset-y-0 bg-gray-200 rounded-full"></div>

                                  {/* Colored bar */}
                                  <div
                                    className={`absolute inset-y-0 left-0 ${getPercentileBarColor(playerPercentile)} rounded-full`}
                                    style={{ width: `${playerPercentile}%`, maxWidth: "calc(100% - 16px)" }}
                                  ></div>

                                  {/* Percentile circle */}
                                  <div
                                    className="absolute flex items-center justify-center"
                                    style={{
                                      left: `calc(${playerPercentile}% + 2px)`,
                                      top: "50%",
                                      transform: "translate(-50%, -50%)",
                                    }}
                                  >
                                    <div
                                      className={`${getPercentileCircleColor(playerPercentile)} rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold text-gray-700   rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold text-gray-700 shadow-sm border-2 border-gray-400 z-10`}
                                    >
                                      {playerPercentile}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Better indicator */}
                              <div className="w-6 flex items-center justify-center px-1 py-0.5">
                                {isBest && (
                                  <div className="bg-orange-500 rounded-full w-3.5 h-3.5 flex items-center justify-center shadow-sm">
                                    <span className="text-white font-bold text-[8px]">+</span>
                                  </div>
                                )}
                              </div>
                            </>
                          </div>
                        )
                      })}
                    </>
                  )}

                  {/* Empty cells for Add Player button columns - only show if needed */}
                  {showAddPlayerColumns && (
                    <div className="bg-gray-50 border-l-2 border-gray-400 flex items-center justify-center">
                      <span className="text-xs text-gray-400">-</span>
                    </div>
                  )}
                  {showSecondAddPlayerColumn && (
                    <div className="bg-gray-50 border-l-2 border-gray-400 flex items-center justify-center">
                      <span className="text-xs text-gray-400">-</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComparisonTab
