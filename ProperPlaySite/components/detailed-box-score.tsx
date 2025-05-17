"use client"
import { useState } from "react"

type PlayerStat = {
  number: string
  name: string
  position: string
  minutes: number
  offRating: number
  shotPercentage: number
  points: number
  twoPointers: string
  threePointers: string
  freeThrows: string
  offensiveRebounds: number
  defensiveRebounds: number
  assists: number
  turnovers: number
  blocks: number
  steals: number
  personalFouls: number
}

type QuarterScore = {
  q1: number
  q2: number
  q3: number
  q4: number
  total: number
}

type TeamBoxScore = {
  name: string
  rank?: number
  seed?: number
  players: PlayerStat[]
  quarterScores: QuarterScore
  teamTotals: {
    minutes: number
    points: number
    fieldGoals: string
    fieldGoalPct: number
    threePointers: string
    threePointerPct: number
    freeThrows: string
    freeThrowPct: number
    offensiveRebounds: number
    defensiveRebounds: number
    assists: number
    turnovers: number
    blocks: number
    steals: number
    personalFouls: number
  }
}

type DetailedBoxScoreProps = {
  boxScore: {
    homeTeam: TeamBoxScore
    awayTeam: TeamBoxScore
    gameDate: string
    gameTime: string
    venue: string
  }
}

export default function DetailedBoxScore({ boxScore }: DetailedBoxScoreProps) {
  const [activeTeamTab, setActiveTeamTab] = useState<"home" | "away">("home")

  // Extract properties from boxScore
  const { homeTeam, awayTeam, gameDate, gameTime, venue } = boxScore

  // Determine the final score for display
  const awayScore = awayTeam.quarterScores.total
  const homeScore = homeTeam.quarterScores.total

  // Format the matchup string
  const matchupString = `${awayTeam.name} (${awayScore}) @ ${homeTeam.name} (${homeScore})`

  return (
    <div className="w-full bg-white border-2 border-gray-300 rounded-md overflow-hidden mt-1 shadow-sm">
      {/* Matchup header */}
      <div className="bg-gray-100 border-b border-gray-300 px-3 py-1.5 flex justify-between items-center">
        <h3 className="text-sm font-bold">{matchupString}</h3>
        <div className="text-xs text-gray-600">
          {gameDate} • {venue}
        </div>
      </div>

      {/* Team selection tabs */}
      <div className="flex border-b border-gray-300">
        <button
          className={`flex-1 py-1.5 text-center font-medium text-sm transition-colors ${
            activeTeamTab === "away"
              ? "bg-blue-50 text-blue-700 border-b-2 border-blue-500"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTeamTab("away")}
        >
          {awayTeam.name}
        </button>
        <button
          className={`flex-1 py-1.5 text-center font-medium text-sm transition-colors ${
            activeTeamTab === "home"
              ? "bg-blue-50 text-blue-700 border-b-2 border-blue-500"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTeamTab("home")}
        >
          {homeTeam.name}
        </button>
      </div>

      {/* Box score table */}
      <div className="px-2 py-1 overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-1 px-1 text-left">Name</th>
              <th className="py-1 px-1 text-center">Min</th>
              <th className="py-1 px-1 text-center">ORtg</th>
              <th className="py-1 px-1 text-center">%Ps</th>
              <th className="py-1 px-1 text-center">Pts</th>
              <th className="py-1 px-1 text-center">2PM-A</th>
              <th className="py-1 px-1 text-center">3PM-A</th>
              <th className="py-1 px-1 text-center">FTM-A</th>
              <th className="py-1 px-1 text-center">OR</th>
              <th className="py-1 px-1 text-center">DR</th>
              <th className="py-1 px-1 text-center">A</th>
              <th className="py-1 px-1 text-center">TO</th>
              <th className="py-1 px-1 text-center">Blk</th>
              <th className="py-1 px-1 text-center">Stl</th>
              <th className="py-1 px-1 text-center">PF</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {(activeTeamTab === "home" ? homeTeam.players : awayTeam.players).map((player, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}>
                <td className="py-0.5 px-1 font-medium">
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-500">{player.number}</span>
                    <span>{player.name}</span>
                  </div>
                </td>
                <td className="py-0.5 px-1 text-center">{player.minutes}</td>
                <td className="py-0.5 px-1 text-center">{player.offRating}</td>
                <td className="py-0.5 px-1 text-center">{player.shotPercentage}</td>
                <td className="py-0.5 px-1 text-center font-medium">{player.points}</td>
                <td className="py-0.5 px-1 text-center">{player.twoPointers}</td>
                <td className="py-0.5 px-1 text-center">{player.threePointers}</td>
                <td className="py-0.5 px-1 text-center">{player.freeThrows}</td>
                <td className="py-0.5 px-1 text-center">{player.offensiveRebounds}</td>
                <td className="py-0.5 px-1 text-center">{player.defensiveRebounds}</td>
                <td className="py-0.5 px-1 text-center">{player.assists}</td>
                <td className="py-0.5 px-1 text-center">{player.turnovers}</td>
                <td className="py-0.5 px-1 text-center">{player.blocks}</td>
                <td className="py-0.5 px-1 text-center">{player.steals}</td>
                <td className="py-0.5 px-1 text-center">{player.personalFouls}</td>
              </tr>
            ))}

            {/* Team row */}
            <tr className="bg-gray-50 border-t border-gray-300">
              <td className="py-0.5 px-1 font-medium text-gray-700">Team</td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center">
                {activeTeamTab === "home"
                  ? homeTeam.teamTotals.offensiveRebounds
                  : awayTeam.teamTotals.offensiveRebounds}
              </td>
              <td className="py-0.5 px-1 text-center">
                {activeTeamTab === "home"
                  ? homeTeam.teamTotals.defensiveRebounds
                  : awayTeam.teamTotals.defensiveRebounds}
              </td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
            </tr>

            {/* Total row */}
            <tr className="bg-gray-100 font-medium">
              <td className="py-0.5 px-1">TOTAL</td>
              <td className="py-0.5 px-1 text-center">
                {activeTeamTab === "home" ? homeTeam.teamTotals.minutes : awayTeam.teamTotals.minutes}
              </td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center">
                {activeTeamTab === "home" ? homeTeam.teamTotals.points : awayTeam.teamTotals.points}
              </td>
              <td className="py-0.5 px-1 text-center">
                {activeTeamTab === "home" ? homeTeam.teamTotals.fieldGoals : awayTeam.teamTotals.fieldGoals}
              </td>
              <td className="py-0.5 px-1 text-center">
                {activeTeamTab === "home" ? homeTeam.teamTotals.threePointers : awayTeam.teamTotals.threePointers}
              </td>
              <td className="py-0.5 px-1 text-center">
                {activeTeamTab === "home" ? homeTeam.teamTotals.freeThrows : awayTeam.teamTotals.freeThrows}
              </td>
              <td className="py-0.5 px-1 text-center">
                {activeTeamTab === "home"
                  ? homeTeam.teamTotals.offensiveRebounds
                  : awayTeam.teamTotals.offensiveRebounds}
              </td>
              <td className="py-0.5 px-1 text-center">
                {activeTeamTab === "home"
                  ? homeTeam.teamTotals.defensiveRebounds
                  : awayTeam.teamTotals.defensiveRebounds}
              </td>
              <td className="py-0.5 px-1 text-center">
                {activeTeamTab === "home" ? homeTeam.teamTotals.assists : awayTeam.teamTotals.assists}
              </td>
              <td className="py-0.5 px-1 text-center">
                {activeTeamTab === "home" ? homeTeam.teamTotals.turnovers : awayTeam.teamTotals.turnovers}
              </td>
              <td className="py-0.5 px-1 text-center">
                {activeTeamTab === "home" ? homeTeam.teamTotals.blocks : awayTeam.teamTotals.blocks}
              </td>
              <td className="py-0.5 px-1 text-center">
                {activeTeamTab === "home" ? homeTeam.teamTotals.steals : awayTeam.teamTotals.steals}
              </td>
              <td className="py-0.5 px-1 text-center">
                {activeTeamTab === "home" ? homeTeam.teamTotals.personalFouls : awayTeam.teamTotals.personalFouls}
              </td>
            </tr>

            {/* Percentages row */}
            <tr className="text-xs text-gray-600">
              <td className="py-0.5 px-1"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center">
                {activeTeamTab === "home"
                  ? homeTeam.teamTotals.fieldGoalPct.toFixed(3)
                  : awayTeam.teamTotals.fieldGoalPct.toFixed(3)}
              </td>
              <td className="py-0.5 px-1 text-center">
                {activeTeamTab === "home"
                  ? homeTeam.teamTotals.threePointerPct.toFixed(3)
                  : awayTeam.teamTotals.threePointerPct.toFixed(3)}
              </td>
              <td className="py-0.5 px-1 text-center">
                {activeTeamTab === "home"
                  ? homeTeam.teamTotals.freeThrowPct.toFixed(3)
                  : awayTeam.teamTotals.freeThrowPct.toFixed(3)}
              </td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
              <td className="py-0.5 px-1 text-center"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
