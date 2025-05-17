"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Add these imports at the top of the file
import { team_logo_mapping_2024_2025, teamNameToCode } from "./yamagata-team-stats"

// Mock data for Barcelona players
const barcelonaPlayers = [
  { number: 22, name: "Jabari Parker", position: "F", minutes: "22:36", rebounds: 6, assists: 3, points: 10 },
  { number: 13, name: "Tomáš Satoranský", position: "G", minutes: "22:09", rebounds: 4, assists: 6, points: 5 },
  { number: 21, name: "Álex Abrines", position: "F", minutes: "21:43", rebounds: 0, assists: 1, points: 8 },
  { number: 8, name: "Darío Brizuela", position: "G", minutes: "21:31", rebounds: 1, assists: 5, points: 18 },
  { number: 19, name: "Youssoupha Fall", position: "C", minutes: "4:07", rebounds: 1, assists: 0, points: 2 },
  { number: 0, name: "Kevin Punter", position: "", minutes: "23:01", rebounds: 1, assists: 5, points: 17 },
  { number: 6, name: "Jan Veselý", position: "", minutes: "19:55", rebounds: 5, assists: 4, points: 8 },
  { number: 1, name: "Justin Anderson", position: "", minutes: "18:17", rebounds: 0, assists: 0, points: 10 },
  { number: 44, name: "Joel Parra", position: "", minutes: "17:24", rebounds: 6, assists: 1, points: 9 },
  { number: 14, name: "Willy Hernangómez", position: "", minutes: "15:58", rebounds: 6, assists: 1, points: 13 },
  { number: 45, name: "Villar, Raul", position: "", minutes: "11:16", rebounds: 1, assists: 1, points: 4 },
  { number: 46, name: "Grujicic, Mathieu Sacha", position: "", minutes: "2:03", rebounds: 0, assists: 0, points: 0 },
]

// Mock data for Gran Canaria players
const granCanariaPlayers = [
  { number: 3, name: "Andrew Albicy", position: "G", minutes: "25:12", rebounds: 2, assists: 5, points: 8 },
  { number: 5, name: "Sylven Landesberg", position: "G/F", minutes: "23:45", rebounds: 3, assists: 2, points: 14 },
  { number: 12, name: "AJ Slaughter", position: "G", minutes: "22:18", rebounds: 1, assists: 4, points: 12 },
  { number: 21, name: "Ethan Happ", position: "F/C", minutes: "20:33", rebounds: 7, assists: 2, points: 10 },
  { number: 33, name: "Miquel Salvó", position: "F", minutes: "19:47", rebounds: 4, assists: 1, points: 9 },
  { number: 8, name: "Jovan Kljajic", position: "G", minutes: "18:22", rebounds: 0, assists: 3, points: 7 },
  { number: 15, name: "John Shurna", position: "F", minutes: "17:56", rebounds: 3, assists: 0, points: 11 },
  { number: 24, name: "Khalifa Diop", position: "C", minutes: "16:41", rebounds: 5, assists: 0, points: 6 },
  { number: 9, name: "Nicolás Brussino", position: "F", minutes: "15:18", rebounds: 2, assists: 2, points: 8 },
  { number: 7, name: "Ben Lammers", position: "C", minutes: "12:44", rebounds: 0, assists: 2, points: 5 },
]

// Team stats data
const teamStats = {
  barcelona: {
    fieldGoals: "36/67",
    fieldGoalPercentage: "53.7",
    threePointers: "15/32",
    threePointPercentage: "46.9",
    freeThrows: "17/21",
    freeThrowPercentage: "81.0",
    totalRebounds: "35",
    offensiveRebounds: "11",
    defensiveRebounds: "24",
    assists: "27",
    blocks: "1",
    steals: "9",
    turnovers: "11",
    fouls: "19",
  },
  granCanaria: {
    fieldGoals: "36/68",
    fieldGoalPercentage: "52.9",
    threePointers: "9/28",
    threePointPercentage: "32.1",
    freeThrows: "9/14",
    freeThrowPercentage: "64.3",
    totalRebounds: "27",
    offensiveRebounds: "8",
    defensiveRebounds: "19",
    assists: "21",
    blocks: "5",
    steals: "7",
    turnovers: "11",
    fouls: "22",
  },
}

type GameBoxScoreProps = {
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
}

export function GameBoxScore({ homeTeam, awayTeam, homeScore, awayScore }: GameBoxScoreProps) {
  const [activeTab, setActiveTab] = useState<"BARCELONA" | "GRAN CANARIA" | "STATS">("BARCELONA")

  // Replace the teamLogos object with this:
  const teamLogos: Record<string, string> = {
    Barcelona: teamNameToCode["Barcelona"]
      ? team_logo_mapping_2024_2025[teamNameToCode["Barcelona"]]
      : "/placeholder.svg?height=40&width=40",
    "Gran Canaria": teamNameToCode["Gran Canaria"]
      ? team_logo_mapping_2024_2025[teamNameToCode["Gran Canaria"]]
      : "/placeholder.svg?height=40&width=40",
  }

  return (
    <div className="w-full bg-[#1a1a1a] text-white rounded-md overflow-hidden">
      {/* Score header */}
      <div className="flex items-center justify-between p-4 bg-[#222]">
        <div className="flex items-center">
          <img src={teamLogos["Barcelona"] || "/placeholder.svg"} alt="Barcelona logo" className="w-10 h-10 mr-4" />
          <span className="text-4xl font-bold">104</span>
        </div>
        <div className="text-xl font-semibold">Final</div>
        <div className="flex items-center">
          <span className="text-4xl font-bold">90</span>
          <img
            src={teamLogos["Gran Canaria"] || "/placeholder.svg"}
            alt="Gran Canaria logo"
            className="w-10 h-10 ml-4"
          />
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-gray-700">
        <button
          className={`flex-1 py-3 text-center font-medium ${activeTab === "BARCELONA" ? "border-b-2 border-white" : ""}`}
          onClick={() => setActiveTab("BARCELONA")}
        >
          BARCELONA
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium ${activeTab === "GRAN CANARIA" ? "border-b-2 border-white" : ""}`}
          onClick={() => setActiveTab("GRAN CANARIA")}
        >
          GRAN CANARIA
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium ${activeTab === "STATS" ? "border-b-2 border-white" : ""}`}
          onClick={() => setActiveTab("STATS")}
        >
          STATS
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="p-2">
        {activeTab === "BARCELONA" && (
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-700">
                <TableHead className="text-left text-white w-12">#</TableHead>
                <TableHead className="text-left text-white">Player</TableHead>
                <TableHead className="text-right text-white">Min</TableHead>
                <TableHead className="text-right text-white">Reb</TableHead>
                <TableHead className="text-right text-white">Ast</TableHead>
                <TableHead className="text-right text-white font-bold">Pts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {barcelonaPlayers.map((player) => (
                <TableRow key={player.number} className="border-b border-gray-800">
                  <TableCell className="text-left">{player.number}</TableCell>
                  <TableCell className="text-left">
                    {player.name}
                    {player.position && <span className="text-gray-400 ml-2">· {player.position}</span>}
                  </TableCell>
                  <TableCell className="text-right">{player.minutes}</TableCell>
                  <TableCell className="text-right">{player.rebounds}</TableCell>
                  <TableCell className="text-right">{player.assists}</TableCell>
                  <TableCell className="text-right font-bold">{player.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {activeTab === "GRAN CANARIA" && (
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-700">
                <TableHead className="text-left text-white w-12">#</TableHead>
                <TableHead className="text-left text-white">Player</TableHead>
                <TableHead className="text-right text-white">Min</TableHead>
                <TableHead className="text-right text-white">Reb</TableHead>
                <TableHead className="text-right text-white">Ast</TableHead>
                <TableHead className="text-right text-white font-bold">Pts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {granCanariaPlayers.map((player) => (
                <TableRow key={player.number} className="border-b border-gray-800">
                  <TableCell className="text-left">{player.number}</TableCell>
                  <TableCell className="text-left">
                    {player.name}
                    {player.position && <span className="text-gray-400 ml-2">· {player.position}</span>}
                  </TableCell>
                  <TableCell className="text-right">{player.minutes}</TableCell>
                  <TableCell className="text-right">{player.rebounds}</TableCell>
                  <TableCell className="text-right">{player.assists}</TableCell>
                  <TableCell className="text-right font-bold">{player.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {activeTab === "STATS" && (
          <div className="flex flex-col">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <img src={teamLogos["Barcelona"] || "/placeholder.svg"} alt="Barcelona logo" className="w-12 h-12" />
              </div>
              <div className="text-xl font-bold">TEAM STATS</div>
              <div className="flex items-center">
                <img
                  src={teamLogos["Gran Canaria"] || "/placeholder.svg"}
                  alt="Gran Canaria logo"
                  className="w-12 h-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="text-left">{teamStats.barcelona.fieldGoals}</div>
              <div>Field goals</div>
              <div className="text-right">{teamStats.granCanaria.fieldGoals}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="text-left">{teamStats.barcelona.fieldGoalPercentage}</div>
              <div>Field goal %</div>
              <div className="text-right">{teamStats.granCanaria.fieldGoalPercentage}</div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="text-left">{teamStats.barcelona.threePointers}</div>
              <div>3 pointers</div>
              <div className="text-right">{teamStats.granCanaria.threePointers}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="text-left">{teamStats.barcelona.threePointPercentage}</div>
              <div>Three point %</div>
              <div className="text-right">{teamStats.granCanaria.threePointPercentage}</div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="text-left">{teamStats.barcelona.freeThrows}</div>
              <div>Free throws</div>
              <div className="text-right">{teamStats.granCanaria.freeThrows}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="text-left">{teamStats.barcelona.freeThrowPercentage}</div>
              <div>Free throw %</div>
              <div className="text-right">{teamStats.granCanaria.freeThrowPercentage}</div>
            </div>

            <div className="border-t border-gray-700 my-4"></div>

            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="text-left">{teamStats.barcelona.totalRebounds}</div>
              <div>Total rebounds</div>
              <div className="text-right">{teamStats.granCanaria.totalRebounds}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="text-left">{teamStats.barcelona.offensiveRebounds}</div>
              <div>Offensive Rebounds</div>
              <div className="text-right">{teamStats.granCanaria.offensiveRebounds}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="text-left">{teamStats.barcelona.defensiveRebounds}</div>
              <div>Defensive rebounds</div>
              <div className="text-right">{teamStats.granCanaria.defensiveRebounds}</div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="text-left">{teamStats.barcelona.assists}</div>
              <div>Assists</div>
              <div className="text-right">{teamStats.granCanaria.assists}</div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="text-left">{teamStats.barcelona.blocks}</div>
              <div>Blocks</div>
              <div className="text-right">{teamStats.granCanaria.blocks}</div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="text-left">{teamStats.barcelona.steals}</div>
              <div>Steals</div>
              <div className="text-right">{teamStats.granCanaria.steals}</div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="text-left">{teamStats.barcelona.turnovers}</div>
              <div>Turnovers</div>
              <div className="text-right">{teamStats.granCanaria.turnovers}</div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="text-left">{teamStats.barcelona.fouls}</div>
              <div>Fouls - Personal</div>
              <div className="text-right">{teamStats.granCanaria.fouls}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
