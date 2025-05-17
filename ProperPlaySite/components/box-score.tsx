"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Add these imports at the top of the file
import { team_logo_mapping_2024_2025, teamNameToCode } from "./yamagata-team-stats"

interface BoxScoreProps {
  homeTeam: string
  homeScore: number
  awayTeam: string
  awayScore: number
  homeTeamLogo?: string
  awayTeamLogo?: string
  gameDate: string
  venue: string
  homePlayers: PlayerStats[]
  awayPlayers: PlayerStats[]
}

interface PlayerStats {
  number: number
  player: string
  position?: string
  min: string
  pts: number
  reb: number
  ast: number
  stl?: number
  blk?: number
  to?: number
  fg?: string
  threept?: string
  ft?: string
  plusMinus?: number
}

interface TeamStats {
  fieldGoals: string
  fieldGoalPct: number
  threePointers: string
  threePointPct: number
  freeThrows: string
  freeThrowPct: number
  totalRebounds: number
  offensiveRebounds: number
  defensiveRebounds: number
  assists: number
  blocks: number
  steals: number
  turnovers: number
  personalFouls: number
}

export function BoxScore({
  homeTeam,
  homeScore,
  awayTeam,
  awayScore,
  homeTeamLogo,
  awayTeamLogo,
  gameDate,
  venue,
  homePlayers,
  awayPlayers,
}: BoxScoreProps) {
  const [activeTab, setActiveTab] = useState<"home" | "away" | "stats">("home")

  // Mock team stats data
  const homeTeamStats: TeamStats = {
    fieldGoals: "36/67",
    fieldGoalPct: 53.7,
    threePointers: "15/32",
    threePointPct: 46.9,
    freeThrows: "17/21",
    freeThrowPct: 81.0,
    totalRebounds: 35,
    offensiveRebounds: 11,
    defensiveRebounds: 24,
    assists: 27,
    blocks: 1,
    steals: 9,
    turnovers: 11,
    personalFouls: 19,
  }

  const awayTeamStats: TeamStats = {
    fieldGoals: "36/68",
    fieldGoalPct: 52.9,
    threePointers: "9/28",
    threePointPct: 32.1,
    freeThrows: "9/14",
    freeThrowPct: 64.3,
    totalRebounds: 27,
    offensiveRebounds: 8,
    defensiveRebounds: 19,
    assists: 21,
    blocks: 5,
    steals: 7,
    turnovers: 11,
    personalFouls: 22,
  }

  // Function to get team logo or fallback to initials
  const getTeamLogo = (teamName: string) => {
    const teamCode = teamNameToCode[teamName]
    if (teamCode && team_logo_mapping_2024_2025[teamCode]) {
      return (
        <img
          src={team_logo_mapping_2024_2025[teamCode] || "/placeholder.svg"}
          alt={`${teamName} logo`}
          className="w-12 h-12"
        />
      )
    }

    // Fallback to a simple colored circle with the team's initials
    const initials = teamName
      .split(" ")
      .map((word) => word[0])
      .join("")

    const colors: Record<string, string> = {
      "Real Madrid": "bg-blue-600",
      Barcelona: "bg-red-600",
      "Lenovo Tenerife": "bg-teal-600",
      Unicaja: "bg-green-600",
      Baskonia: "bg-purple-600",
      "Valencia Basket": "bg-orange-600",
      "UCAM Murcia": "bg-sky-600",
      "Joventut Badalona": "bg-yellow-600",
      "Gran Canaria": "bg-indigo-600",
      "BAXI Manresa": "bg-pink-600",
      "Bilbao Basket": "bg-amber-600",
      "MoraBanc Andorra": "bg-cyan-600",
    }

    const bgColor = colors[teamName] || "bg-gray-600"

    return (
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${bgColor} text-white font-bold text-lg`}
      >
        {initials}
      </div>
    )
  }

  return (
    <div className="bg-gray-900 text-white rounded-md overflow-hidden">
      {/* Game header */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex flex-col items-center">
          {homeTeamLogo ? (
            <img src={homeTeamLogo || "/placeholder.svg"} alt={homeTeam} className="w-16 h-16" />
          ) : (
            getTeamLogo(homeTeam)
          )}
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="text-5xl font-bold">{homeScore}</span>
            <span className="text-xl font-medium">Final</span>
            <span className="text-5xl font-bold">{awayScore}</span>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            {gameDate} • {venue}
          </div>
        </div>
        <div className="flex flex-col items-center">
          {awayTeamLogo ? (
            <img src={awayTeamLogo || "/placeholder.svg"} alt={awayTeam} className="w-16 h-16" />
          ) : (
            getTeamLogo(awayTeam)
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="home" className="w-full">
        <div className="border-b border-gray-800">
          <TabsList className="flex w-full bg-transparent h-auto p-0">
            <TabsTrigger
              value="home"
              onClick={() => setActiveTab("home")}
              className={`flex-1 py-3 rounded-none border-b-2 ${
                activeTab === "home" ? "border-white" : "border-transparent"
              } bg-transparent text-white hover:bg-gray-800`}
            >
              {homeTeam.toUpperCase()}
            </TabsTrigger>
            <TabsTrigger
              value="away"
              onClick={() => setActiveTab("away")}
              className={`flex-1 py-3 rounded-none border-b-2 ${
                activeTab === "away" ? "border-white" : "border-transparent"
              } bg-transparent text-white hover:bg-gray-800`}
            >
              {awayTeam.toUpperCase()}
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              onClick={() => setActiveTab("stats")}
              className={`flex-1 py-3 rounded-none border-b-2 ${
                activeTab === "stats" ? "border-white" : "border-transparent"
              } bg-transparent text-white hover:bg-gray-800`}
            >
              STATS
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="home" className="p-0 m-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-800">
                <th className="py-2 px-4 w-16">#</th>
                <th className="py-2 px-4">Player</th>
                <th className="py-2 px-4 text-right">Min</th>
                <th className="py-2 px-4 text-right">Reb</th>
                <th className="py-2 px-4 text-right">Ast</th>
                <th className="py-2 px-4 text-right">Pts</th>
              </tr>
            </thead>
            <tbody>
              {homePlayers.map((player) => (
                <tr key={player.number} className="border-b border-gray-800 hover:bg-gray-800">
                  <td className="py-2 px-4">{player.number}</td>
                  <td className="py-2 px-4">
                    {player.player} {player.position && <span className="text-gray-400">• {player.position}</span>}
                  </td>
                  <td className="py-2 px-4 text-right">{player.min}</td>
                  <td className="py-2 px-4 text-right">{player.reb}</td>
                  <td className="py-2 px-4 text-right">{player.ast}</td>
                  <td className="py-2 px-4 text-right">{player.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>

        <TabsContent value="away" className="p-0 m-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-800">
                <th className="py-2 px-4 w-16">#</th>
                <th className="py-2 px-4">Player</th>
                <th className="py-2 px-4 text-right">Min</th>
                <th className="py-2 px-4 text-right">Reb</th>
                <th className="py-2 px-4 text-right">Ast</th>
                <th className="py-2 px-4 text-right">Pts</th>
              </tr>
            </thead>
            <tbody>
              {awayPlayers.map((player) => (
                <tr key={player.number} className="border-b border-gray-800 hover:bg-gray-800">
                  <td className="py-2 px-4">{player.number}</td>
                  <td className="py-2 px-4">
                    {player.player} {player.position && <span className="text-gray-400">• {player.position}</span>}
                  </td>
                  <td className="py-2 px-4 text-right">{player.min}</td>
                  <td className="py-2 px-4 text-right">{player.reb}</td>
                  <td className="py-2 px-4 text-right">{player.ast}</td>
                  <td className="py-2 px-4 text-right">{player.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>

        <TabsContent value="stats" className="p-0 m-0">
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col items-center">
                {homeTeamLogo ? (
                  <img src={homeTeamLogo || "/placeholder.svg"} alt={homeTeam} className="w-12 h-12" />
                ) : (
                  getTeamLogo(homeTeam)
                )}
              </div>
              <div className="text-center text-lg font-semibold">TEAM STATS</div>
              <div className="flex flex-col items-center">
                {awayTeamLogo ? (
                  <img src={awayTeamLogo || "/placeholder.svg"} alt={awayTeam} className="w-12 h-12" />
                ) : (
                  getTeamLogo(awayTeam)
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-right">{homeTeamStats.fieldGoals}</div>
                <div className="text-center">Field goals</div>
                <div className="text-left">{awayTeamStats.fieldGoals}</div>

                <div className="text-right">{homeTeamStats.fieldGoalPct.toFixed(1)}</div>
                <div className="text-center">Field goal %</div>
                <div className="text-left">{awayTeamStats.fieldGoalPct.toFixed(1)}</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-right">{homeTeamStats.threePointers}</div>
                <div className="text-center">3 pointers</div>
                <div className="text-left">{awayTeamStats.threePointers}</div>

                <div className="text-right">{homeTeamStats.threePointPct.toFixed(1)}</div>
                <div className="text-center">Three point %</div>
                <div className="text-left">{awayTeamStats.threePointPct.toFixed(1)}</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-right">{homeTeamStats.freeThrows}</div>
                <div className="text-center">Free throws</div>
                <div className="text-left">{awayTeamStats.freeThrows}</div>

                <div className="text-right">{homeTeamStats.freeThrowPct.toFixed(1)}</div>
                <div className="text-center">Free throw %</div>
                <div className="text-left">{awayTeamStats.freeThrowPct.toFixed(1)}</div>
              </div>

              <div className="border-t border-gray-800 pt-4"></div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-right">{homeTeamStats.totalRebounds}</div>
                <div className="text-center">Total rebounds</div>
                <div className="text-left">{awayTeamStats.totalRebounds}</div>

                <div className="text-right">{homeTeamStats.offensiveRebounds}</div>
                <div className="text-center">Offensive Rebounds</div>
                <div className="text-left">{awayTeamStats.offensiveRebounds}</div>

                <div className="text-right">{homeTeamStats.defensiveRebounds}</div>
                <div className="text-center">Defensive rebounds</div>
                <div className="text-left">{awayTeamStats.defensiveRebounds}</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-right">{homeTeamStats.assists}</div>
                <div className="text-center">Assists</div>
                <div className="text-left">{awayTeamStats.assists}</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-right">{homeTeamStats.blocks}</div>
                <div className="text-center">Blocks</div>
                <div className="text-left">{awayTeamStats.blocks}</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-right">{homeTeamStats.steals}</div>
                <div className="text-center">Steals</div>
                <div className="text-left">{awayTeamStats.steals}</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-right">{homeTeamStats.turnovers}</div>
                <div className="text-center">Turnovers</div>
                <div className="text-left">{awayTeamStats.turnovers}</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-right">{homeTeamStats.personalFouls}</div>
                <div className="text-center">Fouls - Personal</div>
                <div className="text-left">{awayTeamStats.personalFouls}</div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
