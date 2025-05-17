"use client"

import { useState, useRef, useMemo, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, Flame, HelpCircle, BarChart3, ArrowUpDown, ArrowDown, ArrowUp, Search } from "lucide-react"

type StatType = "points" | "rebounds" | "assists" | "threePointers" | "steals" | "blocks"
type TimeRange = "lastGame" | "last5" | "last10" | "last15" | "season"
type DisplayMode = "average" | "per40"
type PercentileMode = "average" | "per40"
type TrendCategory = "shotSelection" | "shootingPct" | "playmaking" | "rebounding" | "defense"

// Mock rank data - would come from API in real app
const mockRanks = {
  points: { team: 2, league: 45 },
  rebounds: { team: 5, league: 78 },
  assists: { team: 3, league: 52 },
  threePointers: { team: 1, league: 33 },
  steals: { team: 4, league: 67 },
  blocks: { team: 8, league: 120 },
  fieldGoalPercentage: { team: 6, league: 89 },
  threePointPercentage: { team: 2, league: 41 },
  freeThrowPercentage: { team: 5, league: 73 },
  minutes: { team: 3, league: 58 },
  twoPointPercentage: { team: 4, league: 62 },
  twoPointsMade: { team: 5, league: 55 },
  twoPointsAttempted: { team: 6, league: 70 },
  threePointsMade: { team: 3, league: 40 },
  threePointsAttempted: { team: 4, league: 48 },
  freeThrowsMade: { team: 7, league: 85 },
  freeThrowsAttempted: { team: 8, league: 92 },
  fieldGoalsMade: { team: 5, league: 65 },
  fieldGoalsAttempted: { team: 7, league: 80 },
  // Advanced stats ranks
  usagePercentage: { team: 4, league: 50 },
  turnoverPercentage: { team: 6, league: 75 },
  offensiveReboundPercentage: { team: 8, league: 95 },
  defensiveReboundPercentage: { team: 3, league: 42 },
  freeThrowAttemptPercentage: { team: 5, league: 68 },
  threePointAttemptPercentage: { team: 2, league: 35 },
  twoPointAttemptPercentage: { team: 4, league: 60 },
}

// Mock percentile data for the player
const mockPercentiles = {
  average: {
    offense: {
      points: 65,
      assists: 48,
      threePointPercentage: 59,
      fieldGoalPercentage: 42,
      freeThrowPercentage: 73,
      usagePercentage: 55,
      offensiveReboundPercentage: 30,
      turnoverPercentage: 25, // Lower is better
      assistToTurnoverRatio: 62,
      effectiveFieldGoalPercentage: 51,
      trueShootingPercentage: 58,
      pointsPerShot: 67,
    },
    defense: {
      steals: 33,
      blocks: 20,
      defensiveReboundPercentage: 58,
      defensiveRating: 45,
      stealsPerFoul: 40,
      blocksPerFoul: 35,
      defensiveBoxPlusMinus: 52,
      defensiveWinShares: 48,
      opponentFieldGoalPercentage: 62, // Lower is better
      opponentPointsPerPossession: 55, // Lower is better
    },
  },
  per40: {
    offense: {
      points: 70,
      assists: 52,
      threePointPercentage: 59, // Same as average
      fieldGoalPercentage: 42, // Same as average
      freeThrowPercentage: 73, // Same as average
      usagePercentage: 55, // Same as average
      offensiveReboundPercentage: 35,
      turnoverPercentage: 28, // Lower is better
      assistToTurnoverRatio: 65,
      effectiveFieldGoalPercentage: 51, // Same as average
      trueShootingPercentage: 58, // Same as average
      pointsPerShot: 70,
    },
    defense: {
      steals: 38,
      blocks: 25,
      defensiveReboundPercentage: 62,
      defensiveRating: 45, // Same as average
      stealsPerFoul: 45,
      blocksPerFoul: 40,
      defensiveBoxPlusMinus: 52, // Same as average
      defensiveWinShares: 48, // Same as average
      opponentFieldGoalPercentage: 62, // Same as average, lower is better
      opponentPointsPerPossession: 55, // Same as average, lower is better
    },
  },
}

// Mock actual values for the player
const mockStatValues = {
  average: {
    offense: {
      points: 13.3,
      assists: 4.2,
      threePointPercentage: 40.0,
      fieldGoalPercentage: 47.0,
      freeThrowPercentage: 62.5,
      usagePercentage: 18.4,
      offensiveReboundPercentage: 8.2,
      turnoverPercentage: 14.3,
      assistToTurnoverRatio: 2.1,
      effectiveFieldGoalPercentage: 52.3,
      trueShootingPercentage: 55.8,
      pointsPerShot: 1.23,
      twoPointRate: 65.0,
      threePointRate: 35.0,
      value: 8.5,
      foulRate: 1.8,
    },
    defense: {
      steals: 1.1,
      blocks: 0.3,
      defensiveReboundPercentage: 15.6,
      defensiveRating: 108.2,
      stealsPerFoul: 0.42,
      blocksPerFoul: 0.15,
      defensiveBoxPlusMinus: 0.8,
      defensiveWinShares: 1.2,
      opponentFieldGoalPercentage: 45.3,
      opponentPointsPerPossession: 0.92,
      foulsCommitted: 2.3,
    },
  },
  per40: {
    offense: {
      points: 19.1,
      assists: 6.0,
      threePointPercentage: 40.0,
      fieldGoalPercentage: 47.0,
      freeThrowPercentage: 62.5,
      usagePercentage: 18.4,
      offensiveReboundPercentage: 8.2,
      turnoverPercentage: 14.3,
      assistToTurnoverRatio: 2.1,
      effectiveFieldGoalPercentage: 52.3,
      trueShootingPercentage: 55.8,
      pointsPerShot: 1.23,
      twoPointRate: 65.0,
      threePointRate: 35.0,
      value: 8.5,
      foulRate: 1.8,
    },
    defense: {
      steals: 1.6,
      blocks: 0.4,
      defensiveReboundPercentage: 15.6,
      defensiveRating: 108.2,
      stealsPerFoul: 0.42,
      blocksPerFoul: 0.15,
      defensiveBoxPlusMinus: 0.8,
      defensiveWinShares: 1.2,
      opponentFieldGoalPercentage: 45.3,
      opponentPointsPerPossession: 0.92,
      foulsCommitted: 2.3,
    },
  },
}

// Mock league data for averages and leaders
const leagueData = {
  points: { average: 12.4, leader: 28.7 },
  rebounds: { average: 5.2, leader: 12.8 },
  assists: { average: 3.1, leader: 9.6 },
  threePointers: { average: 1.8, leader: 4.5 },
  steals: { average: 0.9, leader: 2.7 },
  blocks: { average: 0.6, leader: 2.3 },
}

const gameData = [
  {
    opponent: "CHI",
    date: "8/14",
    location: "@",
    points: 11,
    rebounds: 5,
    assists: 4,
    threePointers: 2,
    steals: 1,
    blocks: 0,
    minutes: 31,
    fieldGoalsMade: 4,
    fieldGoalsAttempted: 9,
    threePointsMade: 2,
    threePointsAttempted: 5,
    freeThrowsMade: 1,
    freeThrowsAttempted: 2,
    offensiveRebounds: 1,
    defensiveRebounds: 4,
    turnovers: 2,
    possessions: 65,
    twoPointPercentage: 40.0,
    threePointPercentage: 40.0,
  },
  {
    opponent: "IND",
    date: "8/15",
    location: "@",
    points: 16,
    rebounds: 7,
    assists: 6,
    threePointers: 3,
    steals: 2,
    blocks: 1,
    minutes: 33,
    fieldGoalsMade: 6,
    fieldGoalsAttempted: 12,
    threePointsMade: 3,
    threePointsAttempted: 7,
    freeThrowsMade: 1,
    freeThrowsAttempted: 1,
    offensiveRebounds: 2,
    defensiveRebounds: 5,
    turnovers: 1,
    possessions: 68,
    twoPointPercentage: 60.0,
    threePointPercentage: 42.9,
  },
  {
    opponent: "CHI",
    date: "8/17",
    location: "vs",
    points: 23,
    rebounds: 8,
    assists: 5,
    threePointers: 4,
    steals: 1,
    blocks: 0,
    minutes: 30,
    fieldGoalsMade: 8,
    fieldGoalsAttempted: 15,
    threePointsMade: 4,
    threePointsAttempted: 8,
    freeThrowsMade: 3,
    freeThrowsAttempted: 4,
    offensiveRebounds: 3,
    defensiveRebounds: 5,
    turnovers: 3,
    possessions: 70,
    twoPointPercentage: 57.1,
    threePointPercentage: 50.0,
  },
  {
    opponent: "ATL",
    date: "8/20",
    location: "@",
    points: 3,
    rebounds: 2,
    assists: 1,
    threePointers: 0,
    steals: 0,
    blocks: 0,
    minutes: 15,
    fieldGoalsMade: 1,
    fieldGoalsAttempted: 6,
    threePointsMade: 0,
    threePointsAttempted: 3,
    freeThrowsMade: 1,
    freeThrowsAttempted: 2,
    offensiveRebounds: 0,
    defensiveRebounds: 2,
    turnovers: 1,
    possessions: 55,
    twoPointPercentage: 33.3,
    threePointPercentage: 0.0,
  },
  {
    opponent: "ATL",
    date: "8/22",
    location: "@",
    points: 18,
    rebounds: 6,
    assists: 7,
    threePointers: 2,
    steals: 3,
    blocks: 1,
    minutes: 32,
    fieldGoalsMade: 7,
    fieldGoalsAttempted: 14,
    threePointsMade: 2,
    threePointsAttempted: 5,
    freeThrowsMade: 2,
    freeThrowsAttempted: 2,
    offensiveRebounds: 1,
    defensiveRebounds: 5,
    turnovers: 2,
    possessions: 72,
    twoPointPercentage: 55.6,
    threePointPercentage: 40.0,
  },
  {
    opponent: "NYL",
    date: "8/25",
    location: "vs",
    points: 10,
    rebounds: 4,
    assists: 3,
    threePointers: 1,
    steals: 2,
    blocks: 0,
    minutes: 35,
    fieldGoalsMade: 4,
    fieldGoalsAttempted: 10,
    threePointsMade: 1,
    threePointsAttempted: 4,
    freeThrowsMade: 1,
    freeThrowsAttempted: 2,
    offensiveRebounds: 1,
    defensiveRebounds: 3,
    turnovers: 2,
    possessions: 67,
    twoPointPercentage: 50.0,
    threePointPercentage: 25.0,
  },
  {
    opponent: "MIN",
    date: "8/27",
    location: "vs",
    points: 16,
    rebounds: 5,
    assists: 4,
    threePointers: 3,
    steals: 1,
    blocks: 1,
    minutes: 30,
    fieldGoalsMade: 6,
    fieldGoalsAttempted: 11,
    threePointsMade: 3,
    threePointsAttempted: 6,
    freeThrowsMade: 1,
    freeThrowsAttempted: 2,
    offensiveRebounds: 2,
    defensiveRebounds: 3,
    turnovers: 1,
    possessions: 65,
    twoPointPercentage: 60.0,
    threePointPercentage: 50.0,
  },
  {
    opponent: "LVA",
    date: "8/31",
    location: "vs",
    points: 9,
    rebounds: 3,
    assists: 2,
    threePointers: 1,
    steals: 0,
    blocks: 0,
    minutes: 25,
    fieldGoalsMade: 4,
    fieldGoalsAttempted: 9,
    threePointsMade: 1,
    threePointsAttempted: 3,
    freeThrowsMade: 0,
    freeThrowsAttempted: 0,
    offensiveRebounds: 0,
    defensiveRebounds: 3,
    turnovers: 1,
    possessions: 60,
    twoPointPercentage: 50.0,
    threePointPercentage: 33.3,
  },
  {
    opponent: "ATL",
    date: "9/2",
    location: "vs",
    points: 13,
    rebounds: 6,
    assists: 5,
    threePointers: 2,
    steals: 1,
    blocks: 0,
    minutes: 31,
    fieldGoalsMade: 5,
    fieldGoalsAttempted: 12,
    threePointsMade: 2,
    threePointsAttempted: 5,
    freeThrowsMade: 1,
    freeThrowsAttempted: 2,
    offensiveRebounds: 2,
    defensiveRebounds: 4,
    turnovers: 2,
    possessions: 68,
    twoPointPercentage: 42.9,
    threePointPercentage: 40.0,
  },
  {
    opponent: "WAS",
    date: "9/4",
    location: "vs",
    points: 8,
    rebounds: 4,
    assists: 3,
    threePointers: 0,
    steals: 2,
    blocks: 1,
    minutes: 26,
    fieldGoalsMade: 4,
    fieldGoalsAttempted: 8,
    threePointsMade: 0,
    threePointsAttempted: 2,
    freeThrowsMade: 0,
    freeThrowsAttempted: 0,
    offensiveRebounds: 1,
    defensiveRebounds: 3,
    turnovers: 1,
    possessions: 62,
    twoPointPercentage: 66.7,
    threePointPercentage: 0.0,
  },
  {
    opponent: "SEA",
    date: "9/6",
    location: "@",
    points: 18,
    rebounds: 7,
    assists: 6,
    threePointers: 3,
    steals: 1,
    blocks: 0,
    minutes: 27,
    fieldGoalsMade: 7,
    fieldGoalsAttempted: 13,
    threePointsMade: 3,
    threePointsAttempted: 6,
    freeThrowsMade: 1,
    freeThrowsAttempted: 2,
    offensiveRebounds: 2,
    defensiveRebounds: 5,
    turnovers: 2,
    possessions: 64,
    twoPointPercentage: 57.1,
    threePointPercentage: 50.0,
  },
  {
    opponent: "CON",
    date: "9/12",
    location: "vs",
    points: 7,
    rebounds: 3,
    assists: 2,
    threePointers: 1,
    steals: 0,
    blocks: 0,
    minutes: 28,
    fieldGoalsMade: 3,
    fieldGoalsAttempted: 9,
    threePointsMade: 1,
    threePointsAttempted: 4,
    freeThrowsMade: 0,
    freeThrowsAttempted: 0,
    offensiveRebounds: 1,
    defensiveRebounds: 2,
    turnovers: 1,
    possessions: 63,
    twoPointPercentage: 40.0,
    threePointPercentage: 25.0,
  },
  {
    opponent: "CHI",
    date: "9/14",
    location: "@",
    points: 25,
    rebounds: 9,
    assists: 8,
    threePointers: 5,
    steals: 2,
    blocks: 1,
    minutes: 29,
    fieldGoalsMade: 9,
    fieldGoalsAttempted: 16,
    threePointsMade: 5,
    threePointsAttempted: 9,
    freeThrowsMade: 2,
    freeThrowsAttempted: 3,
    offensiveRebounds: 3,
    defensiveRebounds: 6,
    turnovers: 3,
    possessions: 70,
    twoPointPercentage: 57.1,
    threePointPercentage: 55.6,
  },
  {
    opponent: "LAS",
    date: "9/16",
    location: "@",
    points: 13,
    rebounds: 5,
    assists: 4,
    threePointers: 2,
    steals: 1,
    blocks: 0,
    minutes: 26,
    fieldGoalsMade: 5,
    fieldGoalsAttempted: 11,
    threePointsMade: 2,
    threePointsAttempted: 5,
    freeThrowsMade: 1,
    freeThrowsAttempted: 2,
    offensiveRebounds: 1,
    defensiveRebounds: 4,
    turnovers: 2,
    possessions: 64,
    twoPointPercentage: 50.0,
    threePointPercentage: 40.0,
  },
  {
    opponent: "SEA",
    date: "9/18",
    location: "vs",
    points: 9,
    rebounds: 4,
    assists: 3,
    threePointers: 1,
    steals: 0,
    blocks: 0,
    minutes: 20,
    fieldGoalsMade: 4,
    fieldGoalsAttempted: 9,
    threePointsMade: 1,
    threePointsAttempted: 3,
    freeThrowsMade: 0,
    freeThrowsAttempted: 0,
    offensiveRebounds: 1,
    defensiveRebounds: 3,
    turnovers: 1,
    possessions: 58,
    twoPointPercentage: 50.0,
    threePointPercentage: 33.3,
  },
]

// Add offensiveRebounds and defensiveRebounds to each game if they don't exist
gameData.forEach((game) => {
  if (game.offensiveRebounds === undefined) {
    game.offensiveRebounds = Math.floor(game.rebounds * 0.3)
    game.defensiveRebounds = game.rebounds - game.offensiveRebounds
  }
  if (game.turnovers === undefined) {
    game.turnovers = Math.floor(Math.random() * 3) + 1
  }
  if (game.possessions === undefined) {
    game.possessions = Math.floor(Math.random() * 15) + 55
  }
  // Calculate 2PT% and 3PT% if not already defined
  if (game.twoPointPercentage === undefined) {
    const twoPointsMade = game.fieldGoalsMade - game.threePointsMade
    const twoPointsAttempted = game.fieldGoalsAttempted - game.threePointsAttempted
    game.twoPointPercentage = twoPointsAttempted > 0 ? (twoPointsMade / twoPointsAttempted) * 100 : 0
  }
  if (game.threePointPercentage === undefined) {
    game.threePointPercentage =
      game.threePointsAttempted > 0 ? (game.threePointsMade / game.threePointsAttempted) * 100 : 0
  }
})

// Player data
const playerData = {
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
}

// Get background color for percentile bar
const getPercentileBarColor = (percentile: number) => {
  if (percentile < 20) return "bg-red-700" // Very low - intense red
  if (percentile < 35) return "bg-red-500"
  if (percentile < 45) return "bg-red-300"
  if (percentile < 55) return "bg-gray-300" // Average - neutral
  if (percentile < 65) return "bg-teal-300"
  if (percentile < 80) return "bg-teal-500"
  return "bg-teal-700" // Very high - intense teal
}

// Update the getPercentileCircleColor function to always return white background
const getPercentileCircleColor = (percentile: number) => {
  return "bg-white" // Always white background
}

// Get color for percentile circle
// const getPercentileCircleColor = (percentile: number) => {
//   if (percentile < 33) return "bg-red-600"
//   if (percentile < 67) return "bg-gray-400"
//   return "bg-teal-600"
// }

interface StatRowProps {
  label: string
  value: string
  percentile: number
  index?: number
}

const StatRow = ({ label, value, percentile, index }: StatRowProps & { index?: number }) => (
  <div
    className={`flex justify-between items-center py-2 px-2 ${index !== undefined && index % 2 === 1 ? "bg-gray-50" : ""}`}
  >
    <span className="text-xs text-gray-600">{label}</span>
    <div className="flex items-center gap-1">
      <span className="text-xs font-medium">{value}</span>
      <span className={`text-[10px] rounded px-1 py-0.5 ${getPercentileColor(percentile)}`}>{percentile}%</span>
    </div>
  </div>
)

// Update the getPercentileColor function to match the same color scheme
const getPercentileColor = (percentile: number) => {
  if (percentile < 25) return "bg-red-500 text-white"
  if (percentile < 50) return "bg-orange-400 text-white"
  if (percentile < 75) return "bg-teal-400 text-gray-800"
  return "bg-teal-600 text-white"
}

// First, add a new function to determine the background color based on percentile ranking
// Add this function after the getPercentileColor function and before the SeasonStats component

// Function to determine background color for game log cells based on percentile ranking
const getGameLogCellColor = (value: number, allValues: number[], higherIsBetter = true) => {
  if (!value || !allValues || allValues.length === 0) return {}

  // Sort values to determine percentiles
  const sortedValues = [...allValues].sort((a, b) => a - b)

  // Find the percentile of the current value
  const index = sortedValues.findIndex((v) => v >= value)
  const percentile = index / sortedValues.length

  // Determine shade based on percentile - using only blue with different intensities
  let backgroundColor, textColor

  if (higherIsBetter) {
    if (percentile > 0.9) {
      backgroundColor = "#1e40af" // blue-800 - most intense
      textColor = "#ffffff" // white text for contrast
    } else if (percentile > 0.75) {
      backgroundColor = "#3b82f6" // blue-500
      textColor = "#ffffff" // white text for contrast
    } else if (percentile > 0.6) {
      backgroundColor = "#60a5fa" // blue-400
      textColor = "#1e3a8a" // blue-900 text
    } else if (percentile > 0.4) {
      backgroundColor = "#93c5fd" // blue-300
      textColor = "#1e3a8a" // blue-900 text
    } else if (percentile > 0.25) {
      backgroundColor = "#bfdbfe" // blue-200
      textColor = "#1e3a8a" // blue-900 text
    } else if (percentile > 0.1) {
      backgroundColor = "#dbeafe" // blue-100
      textColor = "#1e3a8a" // blue-900 text
    } else {
      backgroundColor = "#eff6ff" // blue-50 - least intense
      textColor = "#1e3a8a" // blue-900 text
    }
  } else {
    // For metrics where lower is better (like turnovers)
    if (percentile < 0.1) {
      backgroundColor = "#1e40af" // blue-800 - most intense
      textColor = "#ffffff" // white text for contrast
    } else if (percentile < 0.25) {
      backgroundColor = "#3b82f6" // blue-500
      textColor = "#ffffff" // white text for contrast
    } else if (percentile < 0.4) {
      backgroundColor = "#60a5fa" // blue-400
      textColor = "#1e3a8a" // blue-900 text
    } else if (percentile < 0.6) {
      backgroundColor = "#93c5fd" // blue-300
      textColor = "#1e3a8a" // blue-900 text
    } else if (percentile < 0.75) {
      backgroundColor = "#bfdbfe" // blue-200
      textColor = "#1e3a8a" // blue-900 text
    } else if (percentile < 0.9) {
      backgroundColor = "#dbeafe" // blue-100
      textColor = "#1e3a8a" // blue-900 text
    } else {
      backgroundColor = "#eff6ff" // blue-50 - least intense
      textColor = "#1e3a8a" // blue-900 text
    }
  }

  return { backgroundColor, color: textColor }
}

interface SeasonStatsProps {
  title: string
  generalStats: { label: string; value: string; percentile: number }[]
  shootingStats: { label: string; value: string; percentile: number }[]
  advancedStats: { label: string; value: string; percentile: number }[]
}

const SeasonStats = ({ title, generalStats, shootingStats, advancedStats }: SeasonStatsProps) => (
  <div className="border-2 border-gray-300 rounded-md overflow-hidden">
    <div className="bg-gray-100 font-semibold py-0.25 px-2 border-b text-[10px] text-gray-700">{title}</div>
    {/* General Stats */}
    <div className="border-b border-gray-300">
      <div className="bg-gray-500 font-semibold py-0.25 px-2 border-b text-[10px] text-gray-700">General</div>
      {generalStats.map((stat, index) => (
        <StatRow key={stat.label} label={stat.label} value={stat.value} percentile={stat.percentile} index={index} />
      ))}
    </div>

    {/* Shooting Stats */}
    <div className="border-b border-gray-300">
      <div className="bg-gray-100 font-semibold py-0.25 px-2 border-b text-[10px] text-gray-700">Shooting</div>
      {shootingStats.map((stat, index) => (
        <StatRow key={stat.label} label={stat.label} value={stat.value} percentile={stat.percentile} index={index} />
      ))}
    </div>

    {/* Advanced Stats */}
    <div>
      <div className="bg-gray-100 font-semibold py-0.25 px-2 border-b text-[10px] text-gray-700">Advanced</div>
      {advancedStats.map((stat, index) => (
        <StatRow key={stat.label} label={stat.label} value={stat.value} percentile={stat.percentile} index={index} />
      ))}
    </div>
  </div>
)

const OffenseTab = () => {
  const [selectedStat, setSelectedStat] = useState<StatType>("points")
  const [viewMode, setViewMode] = useState<"total" | "per40">("total")
  const [timeRange, setTimeRange] = useState<TimeRange>("season")
  const [displayMode, setDisplayMode] = useState<DisplayMode>("average")
  const [percentileMode, setPercentileMode] = useState<PercentileMode>("average")
  const [trendCategory, setTrendCategory] = useState<TrendCategory>("shotSelection")

  const chartRef = useRef<HTMLDivElement>(null)

  // Sync percentileMode with displayMode
  useEffect(() => {
    setPercentileMode(displayMode)
  }, [displayMode])

  // Get the display name for the selected stat
  const getStatDisplayName = (stat: StatType): string => {
    const displayNames = {
      points: "Points",
      rebounds: "Rebounds",
      assists: "Assists",
      threePointers: "3PT FG",
      steals: "Steals",
      blocks: "Blocks",
    }
    return displayNames[stat]
  }

  // Get games for the selected time range
  const getGamesForTimeRange = (range: TimeRange) => {
    const reversedGames = [...gameData].reverse() // Most recent first

    switch (range) {
      case "lastGame":
        return reversedGames.slice(0, 1)
      case "last5":
        return reversedGames.slice(0, 5)
      case "last10":
        return reversedGames.slice(0, 10)
      case "last15":
      case "season":
      default:
        return reversedGames.slice(0, 15) // All games
    }
  }

  // Calculate stats for the selected time range and display mode
  const playerStats = useMemo(() => {
    const games = getGamesForTimeRange(timeRange)
    const gameCount = games.length

    if (gameCount === 0) return null

    // Calculate totals
    const totals = games.reduce((acc, game) => {
      Object.keys(game).forEach((key) => {
        if (typeof game[key] === "number") {
          acc[key] = (acc[key] || 0) + game[key]
        }
      })
      return acc
    }, {})

    // Calculate averages or per-40 stats
    const stats = {}

    if (displayMode === "average") {
      Object.keys(totals).forEach((key) => {
        if (typeof totals[key] === "number") {
          stats[key] = totals[key] / gameCount
        }
      })
    } else if (displayMode === "per40") {
      // per40
      const totalMinutes = totals.minutes || 1
      const per40Factor = 40 / (totalMinutes / gameCount)

      Object.keys(totals).forEach((key) => {
        if (typeof totals[key] === "number" && key !== "minutes") {
          stats[key] = (totals[key] / gameCount) * per40Factor
        } else if (key === "minutes") {
          stats[key] = totals[key] / gameCount
        }
      })
    }

    // Calculate percentages (for all display modes)
    stats.fieldGoalPercentage =
      totals.fieldGoalsAttempted > 0 ? (totals.fieldGoalsMade / totals.fieldGoalsAttempted) * 100 : 0

    stats.threePointPercentage =
      totals.threePointsAttempted > 0 ? (totals.threePointsMade / totals.threePointsAttempted) * 100 : 0

    stats.freeThrowPercentage =
      totals.freeThrowsAttempted > 0 ? (totals.freeThrowsMade / totals.freeThrowsAttempted) * 100 : 0

    // Calculate 2-point stats
    stats.twoPointsMade = totals.fieldGoalsMade - totals.threePointsMade
    stats.twoPointsAttempted = totals.fieldGoalsAttempted - totals.threePointsAttempted
    stats.twoPointPercentage = stats.twoPointsAttempted > 0 ? (stats.twoPointsMade / stats.twoPointsAttempted) * 100 : 0

    // Always calculate advanced stats regardless of display mode
    // Usage Percentage: estimate of the percentage of team plays used by a player while on the floor
    stats.usagePercentage =
      ((totals.fieldGoalsAttempted + 0.44 * totals.freeThrowsAttempted + totals.turnovers) * 100) /
      (totals.possessions / gameCount)

    // Turnover Percentage: estimate of turnovers per 100 plays
    stats.turnoverPercentage =
      (totals.turnovers * 100) / (totals.fieldGoalsAttempted + 0.44 * totals.freeThrowsAttempted + totals.turnovers)

    // Offensive Rebound Percentage
    stats.offensiveReboundPercentage =
      (totals.offensiveRebounds * 100) / (totals.offensiveRebounds + totals.possessions * 0.3) // Simplified formula

    // Defensive Rebound Percentage
    stats.defensiveReboundPercentage =
      (totals.defensiveRebounds * 100) / (totals.defensiveRebounds + totals.possessions * 0.7) // Simplified formula

    // Free Throw Attempt Percentage
    stats.freeThrowAttemptPercentage = (totals.freeThrowsAttempted * 100) / totals.fieldGoalsAttempted

    // Three Point Attempt
    stats.threePointAttemptPercentage = (totals.threePointsAttempted * 100) / totals.fieldGoalsAttempted

    // Two Point Attempt Percentage
    stats.twoPointAttemptPercentage =
      ((totals.fieldGoalsAttempted - totals.threePointsAttempted) * 100) / totals.fieldGoalsAttempted

    return stats
  }, [timeRange, displayMode])

  // Calculate per-40 values if needed for the chart
  const getStatValue = (game: (typeof gameData)[0], stat: StatType): number => {
    if (viewMode === "total") {
      return game[stat]
    } else {
      // Calculate per-40 minute value
      const per40Factor = 40 / game.minutes
      return Number((game[stat] * per40Factor).toFixed(1))
    }
  }

  // Calculate rolling average for the selected stat
  const calculateRollingAverage = (data: typeof gameData, stat: StatType, windowSize = 5) => {
    return data.map((_, index, array) => {
      // For the first few elements where we don't have enough previous data
      if (index < windowSize - 1) {
        const slice = array.slice(0, index + 1)
        const values = slice.map((game) => getStatValue(game, stat))
        return {
          game: array[index],
          value: values.reduce((sum, val) => sum + val, 0) / slice.length,
        }
      }

      // Normal case - take windowSize previous elements
      const slice = array.slice(index - windowSize + 1, index + 1)
      const values = slice.map((game) => getStatValue(game, stat))
      return {
        game: array[index],
        value: values.reduce((sum, val) => sum + val, 0) / windowSize,
      }
    })
  }

  // Calculate rolling average for a given stat with per-40 adjustment
  const calculateRollingAveragePer40 = (
    data: typeof gameData,
    stat: string,
    windowSize = 3,
    getValue?: (game: any) => number,
  ) => {
    return data.map((_, index, array) => {
      // For the first few elements where we don't have enough previous data
      if (index < windowSize - 1) {
        const slice = array.slice(0, index + 1)
        const per40Values = slice.map((game) => {
          const per40Factor = 40 / game.minutes
          if (getValue) {
            return getValue(game) * per40Factor
          }
          return game[stat] * per40Factor
        })
        return {
          game: array[index],
          value: per40Values.reduce((sum, val) => sum + val, 0) / slice.length,
        }
      }

      // Normal case - take windowSize previous elements
      const slice = array.slice(index - windowSize + 1, index + 1)
      const per40Values = slice.map((game) => {
        const per40Factor = 40 / game.minutes
        if (getValue) {
          return getValue(game) * per40Factor
        }
        return game[stat] * per40Factor
      })
      return {
        game: array[index],
        value: per40Values.reduce((sum, val) => sum + val, 0) / windowSize,
      }
    })
  }

  // Calculate max values for scaling
  const maxStatValue = Math.max(...gameData.map((game) => getStatValue(game, selectedStat)))

  // Round up to nearest 5 for better scaling
  const chartMaxStat = Math.ceil((maxStatValue * 1.25) / 5) * 5

  // Get time range display name
  const getTimeRangeDisplayName = (range: TimeRange): string => {
    const displayNames = {
      lastGame: "Last Game",
      last5: "Last 5 Games",
      last10: "Last 10 Games",
      last15: "Last 15 Games",
      season: "Season",
    }
    return displayNames[range]
  }

  // Get trend line configuration based on selected category
  const getTrendLineConfig = () => {
    switch (trendCategory) {
      case "shotSelection":
        return {
          lines: [
            { stat: "fieldGoalsAttempted", color: "#0d9488", label: "FGA", dash: "", lineWidth: 3 },
            { stat: "threePointsAttempted", color: "#0891b2", label: "3PA", dash: "", lineWidth: 3 },
            {
              stat: "freeThrowsAttempted",
              color: "#be123c",
              label: "FTA",
              dash: "",
              lineWidth: 3,
            },
            {
              stat: "twoPointsAttempted",
              color: "#9333ea",
              label: "2PA",
              dash: "",
              lineWidth: 3,
              calculated: true,
              getValue: (game) => game.fieldGoalsAttempted - game.threePointsAttempted,
            },
          ],
          maxValue: 25,
          minValue: 0,
        }
      case "shootingPct":
        return {
          lines: [
            {
              stat: "fieldGoalPercentage",
              color: "#0d9488",
              label: "FG%",
              dash: "",
              lineWidth: 3,
              getValue: (game) => {
                return game.fieldGoalsAttempted > 0 ? (game.fieldGoalsMade / game.fieldGoalsAttempted) * 100 : 0
              },
            },
            {
              stat: "threePointPercentage",
              color: "#0891b2",
              label: "3P%",
              dash: "",
              lineWidth: 3,
            },
            {
              stat: "twoPointPercentage",
              color: "#9333ea",
              label: "2P%",
              dash: "",
              lineWidth: 3,
            },
            {
              stat: "freeThrowPercentage",
              color: "#be123c",
              label: "FT%",
              dash: "",
              lineWidth: 3,
              getValue: (game) => {
                return game.freeThrowsAttempted > 0 ? (game.freeThrowsMade / game.freeThrowsAttempted) * 100 : 0
              },
            },
          ],
          maxValue: 100,
          minValue: 0,
        }
      case "playmaking":
        return {
          lines: [
            { stat: "assists", color: "#0d9488", label: "AST", dash: "", lineWidth: 3 },
            { stat: "turnovers", color: "#be123c", label: "TO", dash: "", lineWidth: 3 },
          ],
          maxValue: 12,
          minValue: 0,
          rightAxis: {
            stat: "usagePercentage",
            color: "#f59e0b",
            label: "USG%",
            dash: "",
            lineWidth: 3,
            maxValue: 50,
            minValue: 10,
            getValue: (game) => {
              return (
                ((game.fieldGoalsAttempted + 0.44 * game.freeThrowsAttempted + game.turnovers) * 100) / game.possessions
              )
            },
          },
        }
      case "rebounding":
        return {
          lines: [
            {
              stat: "offensiveReboundPercentage",
              color: "#0d9488",
              label: "OR%",
              dash: "",
              lineWidth: 3,
              getValue: (game) => {
                return (game.offensiveRebounds * 100) / (game.offensiveRebounds + game.possessions * 0.3)
              },
            },
            {
              stat: "defensiveReboundPercentage",
              color: "#0891b2",
              label: "DR%",
              dash: "",
              lineWidth: 3,
              getValue: (game) => {
                return (game.defensiveRebounds * 100) / (game.defensiveRebounds + game.possessions * 0.7)
              },
            },
          ],
          maxValue: 20,
          minValue: 0,
        }
      case "defense":
        return {
          lines: [
            { stat: "steals", color: "#0d9488", label: "STL", dash: "", lineWidth: 3 },
            { stat: "blocks", color: "#be123c", label: "BLK", dash: "", lineWidth: 3 },
          ],
          maxValue: 3.5,
          minValue: 0,
        }
      default:
        return {
          lines: [{ stat: "fieldGoalsAttempted", color: "#0d9488", label: "FGA", dash: "", lineWidth: 3 }],
          maxValue: 25,
          minValue: 0,
        }
    }
  }

  // Recalculate rolling window when trend category changes
  const rollingWindow = trendCategory === "shootingPct" ? 5 : 3
  const trendConfig = getTrendLineConfig()

  // Add this new state for game log sorting
  const [gameLogSortColumn, setGameLogSortColumn] = useState("date")
  const [gameLogSortDirection, setGameLogSortDirection] = useState("desc")

  // Add this function to handle game log sorting
  const handleGameLogSort = (column) => {
    if (gameLogSortColumn === column) {
      // Toggle direction if clicking the same column
      setGameLogSortDirection(gameLogSortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new column and default to descending
      setGameLogSortColumn(column)
      setGameLogSortDirection("desc")
    }
  }

  // Add this function to render game log sort indicator
  const renderGameLogSortIndicator = (column) => {
    if (gameLogSortColumn !== column) {
      return <ArrowUpDown className="h-4 w-4 ml-1 inline-block text-gray-400" />
    }

    return gameLogSortDirection === "desc" ? (
      <ArrowDown className="h-4 w-4 ml-1 inline-block text-[#1a365d]" />
    ) : (
      <ArrowUp className="h-4 w-4 ml-1 inline-block text-[#1a365d]" />
    )
  }

  // Now, add code to collect all values for each column in the game log table
  // Add this code right before the sortedGameData useMemo

  // Collect all values for each stat column for conditional formatting
  const gameLogStatValues = useMemo(() => {
    return {
      minutes: gameData.map((game) => game.minutes),
      points: gameData.map((game) => game.points),
      rebounds: gameData.map((game) => game.rebounds),
      assists: gameData.map((game) => game.assists),
      steals: gameData.map((game) => game.steals),
      blocks: gameData.map((game) => game.blocks),
      turnovers: gameData.map((game) => game.turnovers),
      fieldGoalsMade: gameData.map((game) => game.fieldGoalsMade),
      fieldGoalsAttempted: gameData.map((game) => game.fieldGoalsAttempted),
      fieldGoalPct: gameData.map((game) =>
        game.fieldGoalsAttempted > 0 ? (game.fieldGoalsMade / game.fieldGoalsAttempted) * 100 : 0,
      ),
      threePointsMade: gameData.map((game) => game.threePointsMade),
      threePointsAttempted: gameData.map((game) => game.threePointsAttempted),
      threePointPct: gameData.map((game) =>
        game.threePointsAttempted > 0 ? (game.threePointsMade / game.threePointsAttempted) * 100 : 0,
      ),
      freeThrowsMade: gameData.map((game) => game.freeThrowsMade),
      freeThrowsAttempted: gameData.map((game) => game.freeThrowsAttempted),
      freeThrowPct: gameData.map((game) =>
        game.freeThrowsAttempted > 0 ? (game.freeThrowsMade / game.freeThrowsAttempted) * 100 : 0,
      ),
    }
  }, [gameData])

  // Sort the game data based on current sort column and direction
  const sortedGameData = useMemo(() => {
    return [...gameData].sort((a, b) => {
      let aValue, bValue

      // Special handling for date column
      if (gameLogSortColumn === "date") {
        // Convert date strings to comparable values (assuming format is "M/D")
        const [aMonth, aDay] = a.date.split("/").map(Number)
        const [bMonth, bDay] = b.date.split("/").map(Number)

        aValue = aMonth * 100 + aDay
        bValue = bMonth * 100 + bDay
      } else {
        aValue = a[gameLogSortColumn]
        bValue = b[gameLogSortColumn]
      }

      if (gameLogSortDirection === "desc") {
        return bValue - aValue
      } else {
        return aValue - bValue
      }
    })
  }, [gameData, gameLogSortColumn, gameLogSortDirection])

  return (
    <div className="container mx-auto p-4">
      {/* Global Filter Bar */}
      <Card className="overflow-hidden shadow-md border border-gray-200 bg-white rounded-lg mb-6">
        <div className="bg-white py-2 px-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            {/* Search box moved to replace the title */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search player..."
                className="w-96 h-8 pl-8 pr-3 text-sm rounded-md bg-gray-50 border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="h-4 w-4" />
              </div>
            </div>

            <div className="text-sm text-muted-foreground flex items-center gap-4">
              {/* Time Range Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">Time Period:</span>
                <div className="w-32">
                  <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
                    <SelectTrigger className="h-6 text-xs border-gray-200 bg-white shadow-sm">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lastGame">Last Game</SelectItem>
                      <SelectItem value="last5">Last 5 Games</SelectItem>
                      <SelectItem value="last10">Last 10 Games</SelectItem>
                      <SelectItem value="last15">Last 15 Games</SelectItem>
                      <SelectItem value="season">Season</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Display Mode Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">Display Mode:</span>
                <div className="flex rounded-full bg-gray-100 p-0.5 shadow-inner border border-gray-200">
                  <button
                    onClick={() => {
                      setDisplayMode("average")
                      setViewMode("total")
                    }}
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium transition-all ${
                      displayMode === "average" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Average
                  </button>
                  <button
                    onClick={() => {
                      setDisplayMode("per40")
                      setViewMode("per40")
                    }}
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium transition-all ${
                      displayMode === "per40" ? "bg-white text-gray-800 shadow-sm" : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Per 40
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Layout - Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:min-h-[800px] mt-6">
        {/* Left Column - Player Card and Percentile Rankings */}
        <div className="md:col-span-1 flex flex-col space-y-4">
          {playerStats && (
            <>
              {/* Player Info Card - Now separate */}
              <Card className="overflow-hidden border-0 shadow-lg bg-white">
                <CardContent className="p-0">
                  {/* Header with blue background - with position and team */}
                  <div className="relative bg-slate-800 h-16">
                    {/* Position and Team on banner - styled to match player name */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center">
                      <div className="relative">
                        <span className="text-xs font-semibold uppercase tracking-tight text-white mr-2">
                          {playerData.position}
                        </span>
                        <span className="text-sm font-semibold uppercase tracking-tight text-white">
                          {playerData.team}
                        </span>
                        <span className="absolute -bottom-1 left-0 right-0 h-px bg-slate-600"></span>
                      </div>
                    </div>
                  </div>

                  {/* Main content area with player info and timeline - now with light gray background */}
                  <div className="relative pb-0 bg-[#e2e8f0]">
                    {/* Background design element */}
                    <div className="absolute top-12 right-0 w-32 h-32 bg-blue-100 rounded-full opacity-50 -z-10"></div>
                    <div className="absolute bottom-0 left-10 w-24 h-24 bg-blue-100 rounded-full opacity-30 -z-10"></div>

                    {/* Player image and logo positioned lower */}
                    <div className="absolute -top-10 left-8 z-10">
                      <div className="relative">
                        {/* Player Image */}
                        <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
                          <img
                            src={playerData.imageUrl || "/placeholder.svg?height=128&width=128&query=basketball player"}
                            alt={playerData.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Team Logo Badge */}
                        <div className="absolute bottom-8 -right-2 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md border-2 border-gray-100">
                          <img
                            src={
                              playerData.teamLogoUrl || "/placeholder.svg?height=48&width=48&query=basketball team logo"
                            }
                            alt={playerData.team}
                            className="w-14 h-14 object-contain"
                          />
                        </div>

                        {/* Player name with more professional styling */}
                        <div className="mt-6 text-center">
                          <h3 className="text-lg font-semibold text-gray-800 tracking-tight uppercase relative inline-block">
                            {playerData.name}
                            <span className="absolute -bottom-1 left-0 right-0 h-px bg-slate-600"></span>
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="flex pt-0">
                      {/* Left side - Empty space for image and name */}
                      <div className="w-1/2 pt-4 pb-4 pl-1 pr-1">
                        {/* Left empty for the image and name that are absolutely positioned */}
                      </div>

                      {/* Right side - Timeline section with more spacing */}
                      <div className="w-1/1.5 bg-slate-100 pt-0 pb-3 pr-6 pl-3">
                        <div className="relative">
                          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-600 via-slate-600 to-slate-600"></div>

                          {/* Height - with increased padding */}
                          <div className="pl-6 py-2 relative">
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-600 border-2 border-white shadow-sm"></div>
                            <div className="flex items-center">
                              <span className="text-xs font-semibold uppercase text-gray-600 w-20">Height:</span>
                              <span className="text-xs font-medium text-gray-800">{playerData.height}</span>
                            </div>
                          </div>

                          {/* Weight - with increased padding */}
                          <div className="pl-6 py-2 relative">
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-600 border-2 border-white shadow-sm"></div>
                            <div className="flex items-center">
                              <span className="text-xs font-semibold uppercase text-gray-600 w-20">Weight:</span>
                              <span className="text-xs font-medium text-gray-800">{playerData.weight}</span>
                            </div>
                          </div>

                          {/* Birthdate - with increased padding */}
                          <div className="pl-6 py-2 relative">
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-600 border-2 border-white shadow-sm"></div>
                            <div className="flex items-center">
                              <span className="text-xs font-semibold uppercase text-gray-600 w-20">Age:</span>
                              <span className="text-xs font-medium text-gray-800">35</span>
                            </div>
                          </div>

                          {/* Experience - with increased padding */}
                          <div className="pl-6 py-2 relative">
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-600 border-2 border-white shadow-sm"></div>
                            <div className="flex items-center">
                              <span className="text-xs font-semibold uppercase text-gray-600 w-20">Exp:</span>
                              <span className="text-xs font-medium text-gray-800">11 Yrs </span>
                            </div>
                          </div>

                          {/* College - with increased padding */}
                          <div className="pl-6 py-2 relative">
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-600 border-2 border-white shadow-sm"></div>
                            <div className="flex items-center">
                              <span className="text-xs font-semibold uppercase text-gray-600 w-20">EDU:</span>
                              <span className="text-xs font-medium text-gray-800">Bowdoin</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Percentile Rankings Card - Now separate */}
              <Card className="overflow-hidden shadow-md border border-gray-200 bg-white rounded-lg flex-1">
                {/* Replace the existing header with the new format */}
                <div className="bg-white rounded-md py-2 px-4 border-b shadow-sm">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold flex items-center">
                      League Percentile
                      {percentileMode === "per40" && " (Per 40)"}
                      <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                    </h3>
                    <div className="text-sm text-muted-foreground"></div>
                  </div>
                </div>

                <div className="px-3 pt-4 pb-4 overflow-auto">
                  {/* Performance scale legend at the top */}
                  <div className="flex justify-between items-center text-[9px] font-medium px-16 pb-1 mb-2">
                    <span className="text-red-700">POOR</span>
                    <span className="text-gray-400">AVERAGE</span>
                    <span className="text-teal-700">GREAT</span>
                  </div>

                  {/* New section with no title */}
                  <div className="mb-6">
                    <div className="relative mb-3">
                      <div className="h-1 w-full bg-green-600"></div>
                    </div>
                    {[
                      {
                        key: "value",
                        displayName: "Value",
                        value: mockStatValues[percentileMode]?.offense?.value || 8.5,
                        percentile: 72,
                      },
                      {
                        key: "pts",
                        displayName: "PTS",
                        value: mockStatValues[percentileMode]?.offense?.points || 13.3,
                        percentile: 65,
                      },
                    ].map((stat, index, array) => (
                      <div key={stat.key} className="flex items-center mb-0 relative">
                        <div className="w-12 text-[10px] font-medium text-gray-700 pr-2">{stat.displayName}</div>
                        <div className="flex-1 h-3 relative">
                          {/* Background bar - solid gray */}
                          <div className="absolute inset-0 bg-gray-200 rounded-full"></div>

                          {/* Colored bar based on percentile */}
                          <div
                            className={`absolute inset-y-0 left-0 ${getPercentileBarColor(stat.percentile)} rounded-full`}
                            style={{ width: `${stat.percentile}%` }}
                          ></div>

                          {/* Percentile circle indicator */}
                          <div
                            className="absolute flex items-center justify-center"
                            style={{ left: `${stat.percentile}%`, top: "50%", transform: "translate(-50%, -50%)" }}
                          >
                            <div
                              className={`${getPercentileCircleColor(stat.percentile)} rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-gray-700 shadow-sm border-2 border-gray-300 z-10`}
                            >
                              {stat.percentile}
                            </div>
                          </div>
                        </div>
                        <div className="w-10 text-[10px] text-right font-mono ml-2">{stat.value.toFixed(1)}</div>
                        {index < array.length - 1 && (
                          <div className="border-b border-dotted border-slate-300 w-full absolute left-0 mt-6"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Shot Selection Section - without the performance scale legend */}
                  <div className="mb-6">
                    {/* Replace section header */}
                    <div className="relative mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                          Shot Selection
                        </span>
                      </div>
                      <div className="h-1 w-full bg-gradient-to-r from-green-500 to-green-600"></div>
                    </div>
                    {[
                      {
                        key: "fieldGoalsAttempted",
                        displayName: "2PA",
                        value: mockStatValues[percentileMode]?.offense?.fieldGoalsAttempted || 0,
                        percentile: 65,
                      },
                      {
                        key: "threePointsAttempted",
                        displayName: "3PA",
                        value: mockStatValues[percentileMode]?.offense?.threePointsAttempted || 0,
                        percentile: 58,
                      },
                      {
                        key: "freeThrowsAttempted",
                        displayName: "FTA",
                        value: mockStatValues[percentileMode]?.offense?.freeThrowsAttempted || 0,
                        percentile: 45,
                      },
                      {
                        key: "twoPointRate",
                        displayName: "2PR",
                        value:
                          playerStats && playerStats.fieldGoalsAttempted
                            ? (playerStats.twoPointsAttempted / playerStats.fieldGoalsAttempted) * 100
                            : 65.0,
                        percentile: 62,
                      },
                      {
                        key: "threePointRate",
                        displayName: "3PR",
                        value:
                          playerStats && playerStats.fieldGoalsAttempted
                            ? (playerStats.threePointsAttempted / playerStats.fieldGoalsAttempted) * 100
                            : 35.0,
                        percentile: 38,
                      },
                    ].map((stat, index, array) => (
                      <div key={stat.key} className="flex items-center mb-0 relative">
                        <div className="w-12 text-[10px] font-medium text-gray-700 pr-2">{stat.displayName}</div>
                        <div className="flex-1 h-3 relative">
                          {/* Background bar - solid gray */}
                          <div className="absolute inset-0 bg-gray-200 rounded-full"></div>

                          {/* Colored bar based on percentile */}
                          <div
                            className={`absolute inset-y-0 left-0 ${getPercentileBarColor(stat.percentile)} rounded-full`}
                            style={{ width: `${stat.percentile}%` }}
                          ></div>

                          {/* Percentile circle indicator */}
                          <div
                            className="absolute flex items-center justify-center"
                            style={{ left: `${stat.percentile}%`, top: "50%", transform: "translate(-50%, -50%)" }}
                          >
                            <div
                              className={`${getPercentileCircleColor(stat.percentile)} rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-gray-700 shadow-sm border-2 border-gray-300 z-10`}
                            >
                              {stat.percentile}
                            </div>
                          </div>
                        </div>
                        <div className="w-10 text-[10px] text-right font-mono ml-2">{stat.value.toFixed(1)}</div>
                        {index < array.length - 1 && (
                          <div className="border-b border-dotted border-slate-300 w-full absolute left-0 mt-6"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Shooting Section */}
                  <div className="mb-6">
                    {/* Replace section header */}
                    <div className="relative mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Shooting</span>
                      </div>
                      <div className="h-1 w-full bg-gradient-to-r from-green-500 to-green-600"></div>
                    </div>
                    {[
                      {
                        key: "fieldGoalPercentage",
                        displayName: "2FG%",
                        value: mockStatValues[percentileMode]?.offense?.fieldGoalPercentage,
                        percentile: 42,
                      },
                      {
                        key: "threePointPercentage",
                        displayName: "3P%",
                        value: mockStatValues[percentileMode]?.offense?.threePointPercentage,
                        percentile: 59,
                      },
                      {
                        key: "freeThrowPercentage",
                        displayName: "FT%",
                        value: mockStatValues[percentileMode]?.offense?.freeThrowPercentage,
                        percentile: 73,
                      },
                      {
                        key: "effectiveFieldGoalPercentage",
                        displayName: "eFG%",
                        value: mockStatValues[percentileMode]?.offense?.effectiveFieldGoalPercentage,
                        percentile: 51,
                      },
                    ].map((stat, index, array) => (
                      <div key={stat.key} className="flex items-center mb-0 relative">
                        <div className="w-12 text-[10px] font-medium text-gray-700 pr-2">{stat.displayName}</div>
                        <div className="flex-1 h-3 relative">
                          {/* Background bar - solid gray */}
                          <div className="absolute inset-0 bg-gray-200 rounded-full"></div>

                          {/* Colored bar based on percentile */}
                          <div
                            className={`absolute inset-y-0 left-0 ${getPercentileBarColor(stat.percentile)} rounded-full`}
                            style={{ width: `${stat.percentile}%` }}
                          ></div>

                          {/* Percentile circle indicator */}
                          <div
                            className="absolute flex items-center justify-center"
                            style={{ left: `${stat.percentile}%`, top: "50%", transform: "translate(-50%, -50%)" }}
                          >
                            <div
                              className={`${getPercentileCircleColor(stat.percentile)} rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-gray-700 shadow-sm border-2 border-gray-300 z-10`}
                            >
                              {stat.percentile}
                            </div>
                          </div>
                        </div>
                        <div className="w-10 text-[10px] text-right font-mono ml-2">{stat.value.toFixed(1)}</div>
                        {index < array.length - 1 && (
                          <div className="border-b border-dotted border-slate-300 w-full absolute left-0 mt-6"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Playmaking Section */}
                  <div className="mb-6">
                    {/* Replace section header */}
                    <div className="relative mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Playmaking</span>
                      </div>
                      <div className="h-1 w-full bg-gradient-to-r from-green-500 to-green-600"></div>
                    </div>
                    {[
                      {
                        key: "assists",
                        displayName: "AST",
                        value: mockStatValues[percentileMode]?.offense?.assists,
                        percentile: 48,
                      },
                      {
                        key: "turnoverPercentage",
                        displayName: "TO%",
                        value: mockStatValues[percentileMode]?.offense?.turnoverPercentage,
                        percentile: 25,
                        isInversed: true,
                      },
                      {
                        key: "assistToTurnoverRatio",
                        displayName: "AST/TO",
                        value: mockStatValues[percentileMode]?.offense?.assistToTurnoverRatio,
                        percentile: 62,
                      },
                      {
                        key: "usagePercentage",
                        displayName: "Usage%",
                        value: mockStatValues[percentileMode]?.offense?.usagePercentage,
                        percentile: 55,
                      },
                      {
                        key: "foulR",
                        displayName: "FoulR",
                        value: mockStatValues[percentileMode]?.offense?.foulRate || 1.8,
                        percentile: 58,
                      },
                    ].map((stat, index, array) => (
                      <div key={stat.key} className="flex items-center mb-0 relative">
                        <div className="w-12 text-[10px] font-medium text-gray-700 pr-2">{stat.displayName}</div>
                        <div className="flex-1 h-3 relative">
                          {/* Background bar - solid gray */}
                          <div className="absolute inset-0 bg-gray-200 rounded-full"></div>

                          {/* Colored bar based on percentile */}
                          <div
                            className={`absolute inset-y-0 left-0 ${getPercentileBarColor(stat.isInversed ? 100 - stat.percentile : stat.percentile)} rounded-full`}
                            style={{ width: `${stat.percentile}%` }}
                          ></div>

                          {/* Percentile circle indicator */}
                          <div
                            className="absolute flex items-center justify-center"
                            style={{ left: `${stat.percentile}%`, top: "50%", transform: "translate(-50%, -50%)" }}
                          >
                            <div
                              className={`${getPercentileCircleColor(stat.isInversed ? 100 - stat.percentile : stat.percentile)} rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-gray-700 shadow-sm border-2 border-gray-300 z-10`}
                            >
                              {stat.percentile}
                            </div>
                          </div>
                        </div>
                        <div className="w-10 text-[10px] text-right font-mono ml-2">{stat.value.toFixed(1)}</div>
                        {index < array.length - 1 && (
                          <div className="border-b border-dotted border-slate-300 w-full absolute left-0 mt-6"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Rebounding Section */}
                  <div className="mb-4">
                    {/* Replace section header */}
                    <div className="relative mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Rebounding</span>
                      </div>
                      <div className="h-1 w-full bg-gradient-to-r from-green-500 to-green-600"></div>
                    </div>
                    {[
                      {
                        key: "offensiveReboundPercentage",
                        displayName: "OR",
                        value: mockStatValues[percentileMode]?.offense?.offensiveReboundPercentage,
                        percentile: 30,
                      },
                      {
                        key: "defensiveReboundPercentage",
                        displayName: "DR",
                        value: mockStatValues[percentileMode]?.defense?.defensiveReboundPercentage,
                        percentile: 58,
                      },
                      {
                        key: "rebounds",
                        displayName: "REB",
                        value: mockStatValues[percentileMode]?.offense?.rebounds || 5.2,
                        percentile: 45,
                      },
                    ].map((stat, index, array) => (
                      <div key={stat.key} className="flex items-center mb-0 relative">
                        <div className="w-12 text-[10px] font-medium text-gray-700 pr-2">{stat.displayName}</div>
                        <div className="flex-1 h-3 relative">
                          {/* Background bar - solid gray */}
                          <div className="absolute inset-0 bg-gray-200 rounded-full"></div>

                          {/* Colored bar based on percentile */}
                          <div
                            className={`absolute inset-y-0 left-0 ${getPercentileBarColor(stat.isInversed ? 100 - stat.percentile : stat.percentile)} rounded-full`}
                            style={{ width: `${stat.percentile}%` }}
                          ></div>

                          {/* Percentile circle indicator */}
                          <div
                            className="absolute flex items-center justify-center"
                            style={{ left: `${stat.percentile}%`, top: "50%", transform: "translate(-50%, -50%)" }}
                          >
                            <div
                              className={`${getPercentileCircleColor(stat.isInversed ? 100 - stat.percentile : stat.percentile)} rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-gray-700 shadow-sm border-2 border-gray-300 z-10`}
                            >
                              {stat.percentile}
                            </div>
                          </div>
                        </div>
                        <div className="w-10 text-[10px] text-right font-mono ml-2">{stat.value.toFixed(1)}</div>
                        {index < array.length - 1 && (
                          <div className="border-b border-dotted border-slate-300 w-full absolute left-0 mt-6"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Defense Section */}
                  <div className="mb-4">
                    {/* Replace section header */}
                    <div className="relative mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Defense</span>
                      </div>
                      <div className="h-1 w-full bg-gradient-to-r from-green-500 to-green-600"></div>
                    </div>
                    {[
                      {
                        key: "steals",
                        displayName: "STL",
                        value: mockStatValues[percentileMode]?.defense?.steals,
                        percentile: percentileMode === "average" ? 33 : 38,
                      },
                      {
                        key: "blocks",
                        displayName: "BLK",
                        value: mockStatValues[percentileMode]?.defense?.blocks,
                        percentile: percentileMode === "average" ? 20 : 25,
                      },
                      {
                        key: "foulC",
                        displayName: "FoulC",
                        value: mockStatValues[percentileMode]?.defense?.foulsCommitted || 2.3,
                        percentile: 45,
                      },
                    ].map((stat, index, array) => (
                      <div key={stat.key} className="flex items-center mb-0 relative">
                        <div className="w-12 text-[10px] font-medium text-gray-700 pr-2">{stat.displayName}</div>
                        <div className="flex-1 h-3 relative">
                          {/* Background bar - solid gray */}
                          <div className="absolute inset-0 bg-gray-200 rounded-full"></div>

                          {/* Colored bar based on percentile */}
                          <div
                            className={`absolute inset-y-0 left-0 ${getPercentileBarColor(stat.isInversed ? 100 - stat.percentile : stat.percentile)} rounded-full`}
                            style={{ width: `${stat.percentile}%` }}
                          ></div>

                          {/* Percentile circle indicator */}
                          <div
                            className="absolute flex items-center justify-center"
                            style={{ left: `${stat.percentile}%`, top: "50%", transform: "translate(-50%, -50%)" }}
                          >
                            <div
                              className={`${getPercentileCircleColor(stat.isInversed ? 100 - stat.percentile : stat.percentile)} rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-gray-700 shadow-sm border-2 border-gray-300 z-10`}
                            >
                              {stat.percentile}
                            </div>
                          </div>
                        </div>
                        <div className="w-10 text-[10px] text-right font-mono ml-2">{stat.value.toFixed(1)}</div>
                        {index < array.length - 1 && (
                          <div className="border-b border-dotted border-slate-300 w-full absolute left-0 mt-6"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>

        {/* Right Column - Statistics and Game by Game Chart */}
        <div className="md:col-span-2 flex flex-col space-y-3">
          {/* Season Statistics Card */}
          {playerStats && (
            <Card className="overflow-hidden shadow-md border border-gray-200 bg-white rounded-lg">
              {/* Replace the existing header with the new format */}
              <div className="bg-white rounded-md py-2 px-4 border-b shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold flex items-center">
                    {timeRange === "lastGame"
                      ? "Last Game"
                      : timeRange === "last5"
                        ? "Last 5 Games"
                        : timeRange === "last10"
                          ? "Last 10 Games"
                          : timeRange === "last15"
                            ? "Last 15 Games"
                            : "Season"}{" "}
                    Statistics
                    {displayMode === "per40" && " (Per 40)"}
                    <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                  </h3>
                  <div className="text-sm text-muted-foreground"></div>
                </div>
              </div>

              {/* Stats Section - new layout */}
              <div className="p-2">
                {/* Key Stats Row - prominent display of most important stats */}
                <div className="grid grid-cols-6 gap-1 mb-3">
                  {/* Points */}
                  <div
                    className={`bg-gray-50 border border-gray-200 rounded-md p-1 text-center ${mockRanks?.points?.league && mockRanks.points.league < 50 ? "bg-orange-50" : ""}`}
                  >
                    <div className="text-[12px] text-gray-700 font-semibold mb-0.5">POINTS</div>
                    <div className="text-2xl font-bold text-gray-800 flex items-center justify-center">
                      {playerStats.points ? playerStats.points.toFixed(1) : "0.0"}
                      {mockRanks?.points?.league && mockRanks.points.league < 50 && (
                        <Flame className="h-5 w-5 text-orange-600 fill-orange-600 ml-1" />
                      )}
                    </div>
                    <div className="text-[10px] font-medium text-gray-600">
                      Rank: {mockRanks?.points?.league || "N/A"}
                    </div>
                  </div>

                  {/* Rebounds */}
                  <div
                    className={`bg-gray-50 border border-gray-200 rounded-md p-1 text-center ${mockRanks?.rebounds?.league && mockRanks.rebounds.league < 50 ? "bg-orange-50" : ""}`}
                  >
                    <div className="text-[12px] text-gray-700 font-semibold mb-0.5">REBOUNDS</div>
                    <div className="text-2xl font-bold text-gray-800 flex items-center justify-center">
                      {playerStats.rebounds ? playerStats.rebounds.toFixed(1) : "0.0"}
                      {mockRanks?.rebounds?.league && mockRanks.rebounds.league < 50 && (
                        <Flame className="h-5 w-5 text-orange-600 fill-orange-600 ml-1" />
                      )}
                    </div>
                    <div className="text-[10px] font-medium text-gray-600">
                      Rank: {mockRanks?.rebounds?.league || "N/A"}
                    </div>
                  </div>

                  {/* Assists */}
                  <div
                    className={`bg-gray-50 border border-gray-200 rounded-md p-1 text-center ${mockRanks?.assists?.league && mockRanks.assists.league < 50 ? "bg-orange-50" : ""}`}
                  >
                    <div className="text-[12px] text-gray-700 font-semibold mb-0.5">ASSISTS</div>
                    <div className="text-2xl font-bold text-gray-800 flex items-center justify-center">
                      {playerStats.assists ? playerStats.assists.toFixed(1) : "0.0"}
                      {mockRanks?.assists?.league && mockRanks.assists.league < 50 && (
                        <Flame className="h-5 w-5 text-orange-600 fill-orange-600 ml-1" />
                      )}
                    </div>
                    <div className="text-[10px] font-medium text-gray-600">
                      Rank: {mockRanks?.assists?.league || "N/A"}
                    </div>
                  </div>

                  {/* 3PM */}
                  <div
                    className={`bg-gray-50 border border-gray-200 rounded-md p-1 text-center ${mockRanks?.threePointsMade?.league && mockRanks.threePointsMade.league < 50 ? "bg-orange-50" : ""}`}
                  >
                    <div className="text-[12px] text-gray-700 font-semibold mb-0.5">3PM</div>
                    <div className="text-2xl font-bold text-gray-800 flex items-center justify-center">
                      {playerStats.threePointsMade ? playerStats.threePointsMade.toFixed(1) : "0.0"}
                      {mockRanks?.threePointsMade?.league && mockRanks.threePointsMade.league < 50 && (
                        <Flame className="h-5 w-5 text-orange-600 fill-orange-600 ml-1" />
                      )}
                    </div>
                    <div className="text-[10px] font-medium text-gray-600">
                      Rank: {mockRanks?.threePointsMade?.league || "N/A"}
                    </div>
                  </div>

                  {/* Steals */}
                  <div
                    className={`bg-gray-50 border border-gray-200 rounded-md p-1 text-center ${mockRanks?.steals?.league && mockRanks.steals.league < 50 ? "bg-orange-50" : ""}`}
                  >
                    <div className="text-[12px] text-gray-700 font-semibold mb-0.5">STEALS</div>
                    <div className="text-2xl font-bold text-gray-800 flex items-center justify-center">
                      {playerStats.steals ? playerStats.steals.toFixed(1) : "0.0"}
                      {mockRanks?.steals?.league && mockRanks.steals.league < 50 && (
                        <Flame className="h-5 w-5 text-orange-600 fill-orange-600 ml-1" />
                      )}
                    </div>
                    <div className="text-[10px] font-medium text-gray-600">
                      Rank: {mockRanks?.steals?.league || "N/A"}
                    </div>
                  </div>

                  {/* Blocks */}
                  <div
                    className={`bg-gray-50 border border-gray-200 rounded-md p-1 text-center ${mockRanks?.blocks?.league && mockRanks.blocks.league < 50 ? "bg-orange-50" : ""}`}
                  >
                    <div className="text-[12px] text-gray-700 font-semibold mb-0.5">BLOCKS</div>
                    <div className="text-2xl font-bold text-gray-800 flex items-center justify-center">
                      {playerStats.blocks ? playerStats.blocks.toFixed(1) : "0.0"}
                      {mockRanks?.blocks?.league && mockRanks.blocks.league < 50 && (
                        <Flame className="h-5 w-5 text-orange-600 fill-orange-600 ml-1" />
                      )}
                    </div>
                    <div className="text-[10px] font-medium text-gray-600">
                      Rank: {mockRanks?.blocks?.league || "N/A"}
                    </div>
                  </div>
                </div>

                {/* STATS CATEGORIES */}
                <div className="grid grid-cols-1 gap-3">
                  {/* GENERAL SECTION */}
                  <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm bg-white">
                    <div className="bg-gradient-to-r from-slate-700 to-slate-600 py-1.5 px-2 text-[12px] font-semibold text-white border-b border-slate-700">
                      <span className="flex items-center">
                        <BarChart3 className="h-3.5 w-3.5 mr-1" />
                        GENERAL
                      </span>
                    </div>

                    <div className="p-1.5">
                      <div className="grid grid-cols-6 gap-0.5 text-center">
                        {/* Minutes */}
                        <div className="bg-gray-50 border border-gray-200 rounded p-1">
                          <div className="text-[11px] text-gray-600 font-medium">MIN</div>
                          <div className="text-base font-medium">
                            {playerStats.minutes ? playerStats.minutes.toFixed(1) : "0.0"}
                          </div>
                        </div>

                        {/* Games */}
                        <div className="bg-gray-50 border border-gray-200 rounded p-1">
                          <div className="text-[11px] text-gray-600 font-medium">GP</div>
                          <div className="text-base font-medium">{playerData?.gamesPlayed || "0"}</div>
                        </div>

                        {/* Games Started */}
                        <div className="bg-gray-50 border border-gray-200 rounded p-1">
                          <div className="text-[11px] text-gray-600 font-medium">GS</div>
                          <div className="text-base font-medium">{playerData?.gamesStarted || "0"}</div>
                        </div>

                        {/* Offensive Rebounds */}
                        <div className="bg-gray-50 border border-gray-200 rounded p-1">
                          <div className="text-[11px] text-gray-600 font-medium">OREB</div>
                          <div className="text-base font-medium">
                            {playerStats.offensiveRebounds ? playerStats.offensiveRebounds.toFixed(1) : "0.0"}
                          </div>
                        </div>

                        {/* Defensive Rebounds */}
                        <div className="bg-gray-50 border border-gray-200 rounded p-1">
                          <div className="text-[11px] text-gray-600 font-medium">DREB</div>
                          <div className="text-base font-medium">
                            {playerStats.defensiveRebounds ? playerStats.defensiveRebounds.toFixed(1) : "0.0"}
                          </div>
                        </div>

                        {/* Turnovers */}
                        <div className="bg-gray-50 border border-gray-200 rounded p-1">
                          <div className="text-[11px] text-gray-600 font-medium">TO</div>
                          <div className="text-base font-medium">
                            {playerStats.turnovers ? playerStats.turnovers.toFixed(1) : "0.0"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SHOOTING SECTION */}
                  <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm bg-white">
                    <div className="bg-gradient-to-r from-slate-700 to-slate-600 py-1 px-2 text-[10px] font-semibold text-white border-b border-slate-700">
                      <span className="flex items-center">
                        <Target className="h-3 w-3 mr-1" />
                        SHOOTING
                      </span>
                    </div>

                    <div className="p-1">
                      {/* Shot Distribution Visualization */}
                      <div className="bg-gray-50 border border-gray-200 rounded-md p-2 mb-1">
                        {/* Calculate percentages for the pie chart */}
                        {(() => {
                          const twoPointsAttempted = playerStats.twoPointsAttempted || 0
                          const threePointsAttempted = playerStats.threePointsAttempted || 0
                          const freeThrowsAttempted = playerStats.freeThrowsAttempted || 0

                          const totalAttempts = twoPointsAttempted + threePointsAttempted + freeThrowsAttempted
                          const twoPointPct =
                            totalAttempts > 0 ? Math.round((twoPointsAttempted / totalAttempts) * 100) : 0
                          const threePointPct =
                            totalAttempts > 0 ? Math.round((threePointsAttempted / totalAttempts) * 100) : 0
                          const ftPct = 100 - twoPointPct - threePointPct

                          // Calculate the angles for the pie chart
                          const twoPointAngle = (twoPointPct / 100) * 360
                          const threePointAngle = (threePointPct / 100) * 360

                          // Create the conic gradients for the pie chart
                          const conicGradient = `conic-gradient(
                            #818cf8 0deg ${twoPointAngle}deg, 
                            #f97316 ${twoPointAngle}deg ${twoPointAngle + threePointAngle}deg, 
                            #10b981 ${twoPointAngle + threePointAngle}deg 360deg
                          )`

                          return (
                            <div className="flex">
                              {/* Pie chart with label */}
                              <div className="w-36 flex flex-col items-center">
                                <div className="relative w-28 h-28">
                                  <div
                                    className="absolute inset-0 rounded-full"
                                    style={{ background: conicGradient }}
                                  ></div>
                                  <div className="absolute inset-0 m-auto w-10 h-10 bg-white rounded-full"></div>

                                  {/* Labels */}
                                  <div className="absolute -top-1 -right-1 bg-white/80 px-1.5 py-0.5 text-[11px] border border-gray-200 rounded">
                                    {twoPointPct}%
                                  </div>
                                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white/80 px-1.5 py-0.5 text-[11px] border border-gray-200 rounded">
                                    {threePointPct}%
                                  </div>
                                  <div className="absolute -top-1 -left-1 bg-white/80 px-1.5 py-0.5 text-[11px] border border-gray-200 rounded">
                                    {ftPct}%
                                  </div>
                                </div>
                                <div className="text-[11px] font-medium text-gray-600 mt-2">SHOT DISTRIBUTION</div>
                              </div>

                              {/* Tabular stats */}
                              <div className="flex-1">
                                {/* Table header */}
                                <div className="grid grid-cols-4 text-[12px] font-semibold text-gray-600 mb-1 px-1">
                                  <div className="col-span-1">TYPE</div>
                                  <div className="col-span-1 text-center">MAKES</div>
                                  <div className="col-span-1 text-center">ATT</div>
                                  <div className="col-span-1 text-center">PCT</div>
                                </div>

                                {/* 2PT Row */}
                                <div className="grid grid-cols-4 bg-white border border-gray-200 rounded-md mb-1 py-1 px-1 text-[13px]">
                                  <div className="col-span-1 flex items-center">
                                    <span className="inline-block w-3 h-3 bg-indigo-400 mr-1.5 rounded-sm"></span>
                                    <span className="font-medium">2PT</span>
                                  </div>
                                  <div className="col-span-1 text-center">
                                    {playerStats.twoPointsMade ? playerStats.twoPointsMade.toFixed(1) : "0.0"}
                                  </div>
                                  <div className="col-span-1 text-center">
                                    {playerStats.twoPointsAttempted ? playerStats.twoPointsAttempted.toFixed(1) : "0.0"}
                                  </div>
                                  <div className="col-span-1 text-center font-semibold text-indigo-600">
                                    {playerStats.twoPointPercentage ? playerStats.twoPointPercentage.toFixed(1) : "0.0"}
                                    %
                                  </div>
                                </div>

                                {/* 3PT Row */}
                                <div className="grid grid-cols-4 bg-white border border-gray-200 rounded-md mb-1 py-1 px-1 text-[13px]">
                                  <div className="col-span-1 flex items-center">
                                    <span className="inline-block w-3 h-3 bg-orange-500 mr-1.5 rounded-sm"></span>
                                    <span className="font-medium">3PT</span>
                                  </div>
                                  <div className="col-span-1 text-center">
                                    {playerStats.threePointsMade ? playerStats.threePointsMade.toFixed(1) : "0.0"}
                                  </div>
                                  <div className="col-span-1 text-center">
                                    {playerStats.threePointsAttempted
                                      ? playerStats.threePointsAttempted.toFixed(1)
                                      : "0.0"}
                                  </div>
                                  <div className="col-span-1 text-center font-semibold text-orange-600">
                                    {playerStats.threePointPercentage
                                      ? playerStats.threePointPercentage.toFixed(1)
                                      : "0.0"}
                                    %
                                  </div>
                                </div>

                                {/* FT Row */}
                                <div className="grid grid-cols-4 bg-white border border-gray-200 rounded-md py-1 px-1 text-[13px]">
                                  <div className="col-span-1 flex items-center">
                                    <span className="inline-block w-3 h-3 bg-emerald-500 mr-1.5 rounded-sm"></span>
                                    <span className="font-medium">FT</span>
                                  </div>
                                  <div className="col-span-1 text-center">
                                    {playerStats.freeThrowsMade ? playerStats.freeThrowsMade.toFixed(1) : "0.0"}
                                  </div>
                                  <div className="col-span-1 text-center">
                                    {playerStats.freeThrowsAttempted
                                      ? playerStats.freeThrowsAttempted.toFixed(1)
                                      : "0.0"}
                                  </div>
                                  <div className="col-span-1 text-center font-semibold text-emerald-600">
                                    {playerStats.freeThrowPercentage
                                      ? playerStats.freeThrowPercentage.toFixed(1)
                                      : "0.0"}
                                    %
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* ADVANCED STATS SECTION */}
                  <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm bg-white">
                    <div className="bg-gradient-to-r from-slate-700 to-slate-600 py-1.5 px-2 text-[12px] font-semibold text-white border-b border-slate-700">
                      <span className="flex items-center">
                        <BarChart3 className="h-3.5 w-3.5 mr-1" />
                        ADVANCED
                      </span>
                    </div>

                    <div className="p-1.5">
                      <div className="grid grid-cols-4 gap-1">
                        {/* eFG% */}
                        <div
                          className={`bg-gray-50 border border-gray-200 rounded-md p-1 text-center ${mockRanks?.effectiveFieldGoalPercentage?.league && mockRanks.effectiveFieldGoalPercentage.league < 50 ? "bg-orange-50" : ""}`}
                        >
                          <div className="text-[11px] font-medium text-gray-700 mb-0.5">eFG%</div>
                          <div className="text-xl font-bold text-gray-800">
                            {playerStats.effectiveFieldGoalPercentage
                              ? playerStats.effectiveFieldGoalPercentage.toFixed(1)
                              : "0.0"}
                            {mockRanks?.effectiveFieldGoalPercentage?.league &&
                              mockRanks.effectiveFieldGoalPercentage.league < 50 && (
                                <Flame className="h-4 w-4 text-orange-600 fill-orange-600 ml-1 inline-block" />
                              )}
                          </div>
                          <div className="text-[10px] font-medium text-gray-600 mt-0.5">
                            Rank: {mockRanks?.effectiveFieldGoalPercentage?.league || "N/A"}
                          </div>
                        </div>

                        {/* Usage% */}
                        <div
                          className={`bg-gray-50 border border-gray-200 rounded-md p-1 text-center ${mockRanks?.usagePercentage?.league && mockRanks.usagePercentage.league < 50 ? "bg-orange-50" : ""}`}
                        >
                          <div className="text-[11px] font-medium text-gray-700 mb-0.5">Usage%</div>
                          <div className="text-xl font-bold text-gray-800">
                            {playerStats.usagePercentage ? playerStats.usagePercentage.toFixed(1) : "0.0"}
                            {mockRanks?.usagePercentage?.league && mockRanks.usagePercentage.league < 50 && (
                              <Flame className="h-4 w-4 text-orange-600 fill-orange-600 ml-1 inline-block" />
                            )}
                          </div>
                          <div className="text-[10px] font-medium text-gray-600 mt-0.5">
                            Rank: {mockRanks?.usagePercentage?.league || "N/A"}
                          </div>
                        </div>

                        {/* Ast/TO */}
                        <div className="bg-gray-50 border border-gray-200 rounded-md p-1 text-center">
                          <div className="text-[11px] font-medium text-gray-700 mb-0.5">Ast/TO</div>
                          <div className="text-xl font-bold text-gray-800">
                            {playerStats.assists && playerStats.turnovers && playerStats.turnovers !== 0
                              ? (playerStats.assists / playerStats.turnovers).toFixed(1)
                              : "0.0"}
                          </div>
                          <div className="text-[10px] font-medium text-gray-600 mt-0.5">Rank: 35</div>
                        </div>

                        {/* +/- */}
                        <div className="bg-gray-50 border border-gray-200 rounded-md p-1 text-center">
                          <div className="text-[11px] font-medium text-gray-700 mb-0.5">+/-</div>
                          <div className="text-xl font-bold text-gray-800">5.2</div>
                          <div className="text-[10px] font-medium text-gray-600 mt-0.5">Rank: 29</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Game by Game Chart Card */}
          {playerStats && (
            <Card className="overflow-hidden">
              {/* Replace the existing header with the new format */}
              <div className="bg-white rounded-md py-2 px-4 border-b shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold flex items-center">
                    Game by Game
                    {viewMode === "per40" && " (Per 40)"}
                    <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <span className="text-xs font-medium mr-2">Statistic:</span>
                      <div className="w-28">
                        <Select value={selectedStat} onValueChange={(value) => setSelectedStat(value as StatType)}>
                          <SelectTrigger className="h-6 text-xs border-gray-200 bg-white shadow-sm">
                            <SelectValue placeholder="Select stat" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="points">Points</SelectItem>
                            <SelectItem value="rebounds">Rebounds</SelectItem>
                            <SelectItem value="assists">Assists</SelectItem>
                            <SelectItem value="threePointers">3PT FG</SelectItem>
                            <SelectItem value="steals">Steals</SelectItem>
                            <SelectItem value="blocks">Blocks</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="relative h-[300px]" ref={chartRef}>
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 bottom-10 flex flex-col justify-between text-xs text-gray-500 w-8">
                    {Array.from({ length: 7 }, (_, i) => chartMaxStat - i * (chartMaxStat / 6)).map((value, i) => (
                      <div key={i} className="text-right pr-2 font-medium">
                        {Math.round(value)}
                      </div>
                    ))}
                  </div>

                  {/* Chart area */}
                  <div className="absolute left-8 right-0 top-0 bottom-10">
                    {/* Horizontal grid lines */}
                    {Array.from({ length: 7 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute w-full border-t border-gray-100"
                        style={{ top: `${(i * 100) / 6}%` }}
                      />
                    ))}

                    {/* Chart content */}
                    <div className="h-full flex relative">
                      {gameData.map((game, index) => {
                        const statValue = getStatValue(game, selectedStat)
                        const barHeight = (statValue / chartMaxStat) * 100

                        return (
                          <div key={index} className="flex-1 relative h-full">
                            {/* Bar - now with outline and soft fill */}
                            <div
                              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 bg-slate-100/70 border-2 border-slate-400 rounded-t-sm"
                              style={{ height: `${barHeight}%` }}
                            />

                            {/* Value label */}
                            <div
                              className="absolute left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 bg-white/90 px-1.5 py-0.5 rounded shadow-sm border border-gray-200"
                              style={{ bottom: `${barHeight}%`, marginBottom: "-1px" }}
                            >
                              {statValue}
                            </div>

                            {/* Game info */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full pt-1 text-[9px] font-medium text-gray-600 text-center whitespace-nowrap">
                              <span className="inline-block px-1 py-0.5 rounded bg-gray-100">
                                {game.location} {game.opponent}
                              </span>
                              <br />
                              <span className="text-gray-500">{game.date}</span>
                            </div>
                          </div>
                        )
                      })}

                      {/* Rolling Average Line - simplified with solid color */}
                      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                        {calculateRollingAverage(gameData, selectedStat).map((point, index, array) => {
                          if (index === 0) return null

                          const prevPoint = array[index - 1]
                          const x1 = `${((index - 1) / (array.length - 1)) * 100}%`
                          const y1 = `${100 - (prevPoint.value / chartMaxStat) * 100}%`
                          const x2 = `${(index / (array.length - 1)) * 100}%`
                          const y2 = `${100 - (point.value / chartMaxStat) * 100}%`

                          return (
                            <line
                              key={`rolling-avg-${index}`}
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke="#e11d48"
                              strokeWidth={4}
                              strokeLinecap="round"
                            />
                          )
                        })}
                      </svg>

                      {/* Separate legend for rolling average - simplified with solid color */}
                      <div className="absolute top-2 right-4 flex items-center bg-white/80 px-2 py-1 rounded-full shadow-sm border border-gray-200">
                        <div className="w-4 h-1 bg-e11d48 rounded-full mr-2"></div>
                        <span className="text-xs font-medium text-gray-700">5-Game Rolling Avg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Game Logs Section */}
      <Card className="overflow-hidden shadow-md border border-gray-200 bg-white rounded-lg mt-6">
        {/* Replace the existing header with the new format */}
        <div className="bg-white rounded-md py-2 px-4 border-b shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold flex items-center">
              Player Game Logs - {playerData.name}
              <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
            </h3>
            <div className="text-sm text-muted-foreground"></div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-700 bg-gray-50 h-10">
                <th
                  className="text-left py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleGameLogSort("date")}
                >
                  <div className="flex items-center">Date {renderGameLogSortIndicator("date")}</div>
                </th>
                <th
                  className="text-left py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleGameLogSort("opponent")}
                >
                  <div className="flex items-center">Opponent {renderGameLogSortIndicator("opponent")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleGameLogSort("location")}
                >
                  <div className="flex items-center justify-center">
                    Location {renderGameLogSortIndicator("location")}
                  </div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleGameLogSort("minutes")}
                >
                  <div className="flex items-center justify-center">MIN {renderGameLogSortIndicator("minutes")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleGameLogSort("points")}
                >
                  <div className="flex items-center justify-center">PTS {renderGameLogSortIndicator("points")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleGameLogSort("rebounds")}
                >
                  <div className="flex items-center justify-center">REB {renderGameLogSortIndicator("rebounds")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleGameLogSort("assists")}
                >
                  <div className="flex items-center justify-center">AST {renderGameLogSortIndicator("assists")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleGameLogSort("steals")}
                >
                  <div className="flex items-center justify-center">STL {renderGameLogSortIndicator("steals")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleGameLogSort("blocks")}
                >
                  <div className="flex items-center justify-center">BLK {renderGameLogSortIndicator("blocks")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleGameLogSort("turnovers")}
                >
                  <div className="flex items-center justify-center">TO {renderGameLogSortIndicator("turnovers")}</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleGameLogSort("fieldGoalsMade")}
                >
                  <div className="flex items-center justify-center">
                    FGM {renderGameLogSortIndicator("fieldGoalsMade")}
                  </div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleGameLogSort("fieldGoalsAttempted")}
                >
                  <div className="flex items-center justify-center">
                    FGA {renderGameLogSortIndicator("fieldGoalsAttempted")}
                  </div>
                </th>
                <th className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300">
                  <div className="flex items-center justify-center">FG%</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleGameLogSort("threePointsMade")}
                >
                  <div className="flex items-center justify-center">
                    3PM {renderGameLogSortIndicator("threePointsMade")}
                  </div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleGameLogSort("threePointsAttempted")}
                >
                  <div className="flex items-center justify-center">
                    3PA {renderGameLogSortIndicator("threePointsAttempted")}
                  </div>
                </th>
                <th className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300">
                  <div className="flex items-center justify-center">3P%</div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleGameLogSort("freeThrowsMade")}
                >
                  <div className="flex items-center justify-center">
                    FTM {renderGameLogSortIndicator("freeThrowsMade")}
                  </div>
                </th>
                <th
                  className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-300"
                  onClick={() => handleGameLogSort("freeThrowsAttempted")}
                >
                  <div className="flex items-center justify-center">
                    FTA {renderGameLogSortIndicator("freeThrowsAttempted")}
                  </div>
                </th>
                <th className="text-center py-1.5 px-2 font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-center">FT%</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedGameData.map((game, index) => {
                // Calculate percentages
                const fgPct =
                  game.fieldGoalsAttempted > 0
                    ? ((game.fieldGoalsMade / game.fieldGoalsAttempted) * 100).toFixed(1)
                    : "0.0"

                const tpPct =
                  game.threePointsAttempted > 0
                    ? ((game.threePointsMade / game.threePointsAttempted) * 100).toFixed(1)
                    : "0.0"

                const ftPct =
                  game.freeThrowsAttempted > 0
                    ? ((game.freeThrowsMade / game.freeThrowsAttempted) * 100).toFixed(1)
                    : "0.0"

                // Calculate numeric values for percentages for styling
                const fgPctNum =
                  game.fieldGoalsAttempted > 0 ? (game.fieldGoalsMade / game.fieldGoalsAttempted) * 100 : 0
                const tpPctNum =
                  game.threePointsAttempted > 0 ? (game.threePointsMade / game.threePointsAttempted) * 100 : 0
                const ftPctNum =
                  game.freeThrowsAttempted > 0 ? (game.freeThrowsMade / game.freeThrowsAttempted) * 100 : 0

                return (
                  <tr
                    key={`${game.date}-${game.opponent}`}
                    className={`border-b-2 ${
                      index === 7
                        ? "border-b-4 border-gray-700"
                        : index === 15
                          ? "border-b-4 border-gray-700"
                          : "border-gray-300"
                    } hover:bg-gray-50 transition-colors`}
                  >
                    <td className="py-1 px-2 border-r border-gray-200">{game.date}</td>
                    <td className="py-1 px-2 border-r border-gray-200 font-medium">{game.opponent}</td>
                    <td className="py-1 px-2 text-center border-r border-gray-200">{game.location}</td>
                    <td
                      className="py-1 px-2 text-center border-r border-gray-200 font-mono"
                      style={getGameLogCellColor(game.minutes, gameLogStatValues.minutes)}
                    >
                      {game.minutes}
                    </td>
                    <td
                      className="py-1 px-2 text-center border-r border-gray-200 font-mono font-medium"
                      style={getGameLogCellColor(game.points, gameLogStatValues.points)}
                    >
                      {game.points}
                    </td>
                    <td
                      className="py-1 px-2 text-center border-r border-gray-200 font-mono"
                      style={getGameLogCellColor(game.rebounds, gameLogStatValues.rebounds)}
                    >
                      {game.rebounds}
                    </td>
                    <td
                      className="py-1 px-2 text-center border-r border-gray-200 font-mono"
                      style={getGameLogCellColor(game.assists, gameLogStatValues.assists)}
                    >
                      {game.assists}
                    </td>
                    <td
                      className="py-1 px-2 text-center border-r border-gray-200 font-mono"
                      style={getGameLogCellColor(game.steals, gameLogStatValues.steals)}
                    >
                      {game.steals}
                    </td>
                    <td
                      className="py-1 px-2 text-center border-r border-gray-200 font-mono"
                      style={getGameLogCellColor(game.blocks, gameLogStatValues.blocks)}
                    >
                      {game.blocks}
                    </td>
                    <td
                      className="py-1 px-2 text-center border-r border-gray-200 font-mono"
                      style={getGameLogCellColor(game.turnovers, gameLogStatValues.turnovers, false)}
                    >
                      {game.turnovers}
                    </td>
                    <td
                      className="py-1 px-2 text-center border-r border-gray-200 font-mono"
                      style={getGameLogCellColor(game.fieldGoalsMade, gameLogStatValues.fieldGoalsMade)}
                    >
                      {game.fieldGoalsMade}
                    </td>
                    <td
                      className="py-1 px-2 text-center border-r border-gray-200 font-mono"
                      style={getGameLogCellColor(game.fieldGoalsAttempted, gameLogStatValues.fieldGoalsAttempted)}
                    >
                      {game.fieldGoalsAttempted}
                    </td>
                    <td
                      className="py-1 px-2 text-center border-r border-gray-200 font-mono"
                      style={getGameLogCellColor(fgPctNum, gameLogStatValues.fieldGoalPct)}
                    >
                      {fgPct}
                    </td>
                    <td
                      className="py-1 px-2 text-center border-r border-gray-200 font-mono"
                      style={getGameLogCellColor(game.threePointsMade, gameLogStatValues.threePointsMade)}
                    >
                      {game.threePointsMade}
                    </td>
                    <td
                      className="py-1 px-2 text-center border-r border-gray-200 font-mono"
                      style={getGameLogCellColor(game.threePointsAttempted, gameLogStatValues.threePointsAttempted)}
                    >
                      {game.threePointsAttempted}
                    </td>
                    <td
                      className="py-1 px-2 text-center border-r border-gray-200 font-mono"
                      style={getGameLogCellColor(tpPctNum, gameLogStatValues.threePointPct)}
                    >
                      {tpPct}
                    </td>
                    <td
                      className="py-1 px-2 text-center border-r border-gray-200 font-mono"
                      style={getGameLogCellColor(game.freeThrowsMade, gameLogStatValues.freeThrowsMade)}
                    >
                      {game.freeThrowsMade}
                    </td>
                    <td
                      className="py-1 px-2 text-center border-r border-gray-200 font-mono"
                      style={getGameLogCellColor(game.freeThrowsAttempted, gameLogStatValues.freeThrowsAttempted)}
                    >
                      {game.freeThrowsAttempted}
                    </td>
                    <td
                      className="py-1 px-2 text-center font-mono"
                      style={getGameLogCellColor(ftPctNum, gameLogStatValues.freeThrowPct)}
                    >
                      {ftPct}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default OffenseTab
