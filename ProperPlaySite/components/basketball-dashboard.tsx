"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, PieChart } from "lucide-react"

export default function BasketballDashboard() {
  const [activeTab, setActiveTab] = useState("team")
  const [selectedTeam, setSelectedTeam] = useState(null)

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-muted-foreground mr-2">3</span> Florida{" "}
          <span className="text-muted-foreground font-normal">(36-4)</span>
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
          <h2 className="text-xl">
            <span className="text-blue-600 font-semibold">Gators</span> • Gainesville, FL
          </h2>
          <div className="text-sm text-muted-foreground sm:ml-2">
            Head coach: <span className="text-blue-600">Todd Golden</span>
          </div>
        </div>
        <div className="mt-1 text-blue-600 font-semibold">Southeastern Conference</div>
        <div className="mt-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md inline-block">
          Nation's longest active win streak - 12
        </div>
      </div>

      {/* Wrap the Tabs in a div with display: inline-block to prevent full-width stretching */}
      <div className="inline-block">
        <Tabs
          defaultValue="games"
          onValueChange={(value) => {
            setActiveTab(value)
            setSelectedTeam(value === "teams" ? selectedTeam : null)
            // Scroll to top when changing tabs
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          value={activeTab}
        >
          <TabsList className="mb-4">
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="league">League</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
          </TabsList>

          <TabsContent value="team" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* First row of cards - metrics */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Efficiency Metrics</CardTitle>
                  <CardDescription>Team performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Adj. Efficiency</span>
                        <span className="font-bold text-green-600">128.2</span>
                      </div>
                      <Progress value={85} className="h-2 bg-gray-100" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Adj. Tempo</span>
                        <span className="font-bold text-red-500">70.1</span>
                      </div>
                      <Progress value={65} className="h-2 bg-gray-100" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Avg. Poss. Length</span>
                        <span className="font-bold">16.3</span>
                      </div>
                      <Progress value={55} className="h-2 bg-gray-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Four Factors</CardTitle>
                  <CardDescription>Key performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Effective FG%</span>
                        <span className="font-bold text-green-600">54.9</span>
                      </div>
                      <Progress value={75} className="h-2 bg-gray-100" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Turnover %</span>
                        <span className="font-bold text-green-600">15.7</span>
                      </div>
                      <Progress value={80} className="h-2 bg-gray-100" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Off. Reb. %</span>
                        <span className="font-bold text-green-600">38.5</span>
                      </div>
                      <Progress value={70} className="h-2 bg-gray-100" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">FTA/FGA</span>
                        <span className="font-bold">34.9</span>
                      </div>
                      <Progress value={65} className="h-2 bg-gray-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Shooting</CardTitle>
                  <CardDescription>Team shooting percentages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">3P%</span>
                        <span className="font-bold text-green-600">35.6</span>
                      </div>
                      <Progress value={68} className="h-2 bg-gray-100" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">2P%</span>
                        <span className="font-bold text-green-600">56.1</span>
                      </div>
                      <Progress value={82} className="h-2 bg-gray-100" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">FT%</span>
                        <span className="font-bold text-green-600">72.8</span>
                      </div>
                      <Progress value={75} className="h-2 bg-gray-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Second row with two tables side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[350px]">
                {" "}
                {/* Fixed height container */}
                <Card className="h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Team Rankings</CardTitle>
                    <CardDescription>National rankings</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="py-1 px-2 text-xs">Rank</TableHead>
                            <TableHead className="py-1 px-2 text-xs">Team</TableHead>
                            <TableHead className="py-1 px-2 text-xs">Conference</TableHead>
                            <TableHead className="py-1 px-2 text-xs">Record</TableHead>
                            <TableHead className="py-1 px-2 text-xs">Rating</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="py-1 px-2 text-xs">1</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium">UConn</TableCell>
                            <TableCell className="py-1 px-2 text-xs">Big East</TableCell>
                            <TableCell className="py-1 px-2 text-xs">37-3</TableCell>
                            <TableCell className="py-1 px-2 text-xs">96.2</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="py-1 px-2 text-xs">2</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium">Purdue</TableCell>
                            <TableCell className="py-1 px-2 text-xs">Big Ten</TableCell>
                            <TableCell className="py-1 px-2 text-xs">34-5</TableCell>
                            <TableCell className="py-1 px-2 text-xs">94.8</TableCell>
                          </TableRow>
                          <TableRow className="bg-blue-50">
                            <TableCell className="py-1 px-2 text-xs">3</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium text-blue-600">Florida</TableCell>
                            <TableCell className="py-1 px-2 text-xs">SEC</TableCell>
                            <TableCell className="py-1 px-2 text-xs">36-4</TableCell>
                            <TableCell className="py-1 px-2 text-xs">93.5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="py-1 px-2 text-xs">4</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium">Houston</TableCell>
                            <TableCell className="py-1 px-2 text-xs">Big 12</TableCell>
                            <TableCell className="py-1 px-2 text-xs">32-5</TableCell>
                            <TableCell className="py-1 px-2 text-xs">92.9</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="py-1 px-2 text-xs">5</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium">Tennessee</TableCell>
                            <TableCell className="py-1 px-2 text-xs">SEC</TableCell>
                            <TableCell className="py-1 px-2 text-xs">31-6</TableCell>
                            <TableCell className="py-1 px-2 text-xs">91.7</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="py-1 px-2 text-xs">6</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium">Alabama</TableCell>
                            <TableCell className="py-1 px-2 text-xs">SEC</TableCell>
                            <TableCell className="py-1 px-2 text-xs">30-7</TableCell>
                            <TableCell className="py-1 px-2 text-xs">90.8</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="py-1 px-2 text-xs">7</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium">Arizona</TableCell>
                            <TableCell className="py-1 px-2 text-xs">Pac-12</TableCell>
                            <TableCell className="py-1 px-2 text-xs">29-8</TableCell>
                            <TableCell className="py-1 px-2 text-xs">90.2</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="py-1 px-2 text-xs">8</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium">North Carolina</TableCell>
                            <TableCell className="py-1 px-2 text-xs">ACC</TableCell>
                            <TableCell className="py-1 px-2 text-xs">29-8</TableCell>
                            <TableCell className="py-1 px-2 text-xs">89.5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="py-1 px-2 text-xs">9</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium">Marquette</TableCell>
                            <TableCell className="py-1 px-2 text-xs">Big East</TableCell>
                            <TableCell className="py-1 px-2 text-xs">28-9</TableCell>
                            <TableCell className="py-1 px-2 text-xs">88.9</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="py-1 px-2 text-xs">10</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium">Iowa State</TableCell>
                            <TableCell className="py-1 px-2 text-xs">Big 12</TableCell>
                            <TableCell className="py-1 px-2 text-xs">27-10</TableCell>
                            <TableCell className="py-1 px-2 text-xs">88.3</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="h-[350px]">
                {" "}
                {/* Same fixed height container */}
                <Card className="h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">2025 Schedule</CardTitle>
                    <CardDescription>Preseason rank: 26</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="py-1 px-2 text-xs">Date</TableHead>
                            <TableHead className="py-1 px-2 text-xs">Rk</TableHead>
                            <TableHead className="py-1 px-2 text-xs">Opponent</TableHead>
                            <TableHead className="py-1 px-2 text-xs">Result</TableHead>
                            <TableHead className="py-1 px-2 text-xs">Location</TableHead>
                            <TableHead className="py-1 px-2 text-xs">Record</TableHead>
                            <TableHead className="py-1 px-2 text-xs">Conf</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="bg-green-50">
                            <TableCell className="py-1 px-2 text-xs">Mon Nov 4</TableCell>
                            <TableCell className="py-1 px-2 text-xs">26</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium">South Florida</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium text-blue-600">W, 98-83</TableCell>
                            <TableCell className="py-1 px-2 text-xs">Neutral</TableCell>
                            <TableCell className="py-1 px-2 text-xs">1-0</TableCell>
                            <TableCell className="py-1 px-2 text-xs"></TableCell>
                          </TableRow>
                          <TableRow className="bg-green-50">
                            <TableCell className="py-1 px-2 text-xs">Thu Nov 7</TableCell>
                            <TableCell className="py-1 px-2 text-xs">23</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium">Jacksonville</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium text-blue-600">W, 81-60</TableCell>
                            <TableCell className="py-1 px-2 text-xs">Home</TableCell>
                            <TableCell className="py-1 px-2 text-xs">2-0</TableCell>
                            <TableCell className="py-1 px-2 text-xs"></TableCell>
                          </TableRow>
                          <TableRow className="bg-green-50">
                            <TableCell className="py-1 px-2 text-xs">Mon Nov 11</TableCell>
                            <TableCell className="py-1 px-2 text-xs">23</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium">Grambling St.</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium text-blue-600">W, 86-62</TableCell>
                            <TableCell className="py-1 px-2 text-xs">Home</TableCell>
                            <TableCell className="py-1 px-2 text-xs">3-0</TableCell>
                            <TableCell className="py-1 px-2 text-xs"></TableCell>
                          </TableRow>
                          <TableRow className="bg-green-50">
                            <TableCell className="py-1 px-2 text-xs">Fri Nov 15</TableCell>
                            <TableCell className="py-1 px-2 text-xs">21</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium">Florida St.</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium text-blue-600">W, 87-74</TableCell>
                            <TableCell className="py-1 px-2 text-xs">Away</TableCell>
                            <TableCell className="py-1 px-2 text-xs">4-0</TableCell>
                            <TableCell className="py-1 px-2 text-xs">
                              <Badge
                                variant="outline"
                                className="bg-amber-100 text-amber-800 border-amber-200 text-[10px] py-0 px-1"
                              >
                                B
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-green-50">
                            <TableCell className="py-1 px-2 text-xs">Tue Nov 19</TableCell>
                            <TableCell className="py-1 px-2 text-xs">20</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium">Florida A&M</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium text-blue-600">W, 84-60</TableCell>
                            <TableCell className="py-1 px-2 text-xs">Home</TableCell>
                            <TableCell className="py-1 px-2 text-xs">5-0</TableCell>
                            <TableCell className="py-1 px-2 text-xs"></TableCell>
                          </TableRow>
                          <TableRow className="bg-green-50">
                            <TableCell className="py-1 px-2 text-xs">Sat Nov 23</TableCell>
                            <TableCell className="py-1 px-2 text-xs">18</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium">Miami (FL)</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium text-blue-600">W, 92-78</TableCell>
                            <TableCell className="py-1 px-2 text-xs">Home</TableCell>
                            <TableCell className="py-1 px-2 text-xs">6-0</TableCell>
                            <TableCell className="py-1 px-2 text-xs"></TableCell>
                          </TableRow>
                          <TableRow className="bg-green-50">
                            <TableCell className="py-1 px-2 text-xs">Wed Nov 27</TableCell>
                            <TableCell className="py-1 px-2 text-xs">15</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium">UCF</TableCell>
                            <TableCell className="py-1 px-2 text-xs font-medium text-blue-600">W, 79-68</TableCell>
                            <TableCell className="py-1 px-2 text-xs">Away</TableCell>
                            <TableCell className="py-1 px-2 text-xs">7-0</TableCell>
                            <TableCell className="py-1 px-2 text-xs"></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="player" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl">Will Hanley</CardTitle>
                      <CardDescription>Guard • #23 • Senior</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">23.4</div>
                      <div className="text-sm text-muted-foreground">PPG</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">6.8</div>
                      <div className="text-sm text-muted-foreground">RPG</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">5.2</div>
                      <div className="text-sm text-muted-foreground">APG</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">48.3%</div>
                      <div className="text-sm text-muted-foreground">FG%</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">39.1%</div>
                      <div className="text-sm text-muted-foreground">3P%</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Usage Rate</span>
                        <span className="font-bold">28.5%</span>
                      </div>
                      <Progress value={85} className="h-2 bg-gray-100" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">True Shooting %</span>
                        <span className="font-bold">58.7%</span>
                      </div>
                      <Progress value={75} className="h-2 bg-gray-100" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Assist Rate</span>
                        <span className="font-bold">24.3%</span>
                      </div>
                      <Progress value={65} className="h-2 bg-gray-100" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Turnover Rate</span>
                        <span className="font-bold">12.1%</span>
                      </div>
                      <Progress value={30} className="h-2 bg-gray-100" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Performance Bonuses</CardTitle>
                  <CardDescription>Current season incentives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <span className="h-3 w-3 rounded-full bg-purple-500 mr-2"></span>
                          <span className="font-medium">5+ Assists</span>
                        </div>
                        <span className="font-bold">21 of 45</span>
                      </div>
                      <Progress value={46} className="h-2 bg-gray-100" />
                      <div className="text-right text-sm text-muted-foreground mt-1">$1,050 earned</div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <span className="h-3 w-3 rounded-full bg-pink-500 mr-2"></span>
                          <span className="font-medium">15+ Rebounds</span>
                        </div>
                        <span className="font-bold">9 of 45</span>
                      </div>
                      <Progress value={20} className="h-2 bg-gray-100" />
                      <div className="text-right text-sm text-muted-foreground mt-1">$450 earned</div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <span className="h-3 w-3 rounded-full bg-teal-500 mr-2"></span>
                          <span className="font-medium">25+ Min & Win</span>
                        </div>
                        <span className="font-bold">12 of 45</span>
                      </div>
                      <Progress value={26} className="h-2 bg-gray-100" />
                      <div className="text-right text-sm text-muted-foreground mt-1">$600 earned</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Game Log</CardTitle>
                <CardDescription>Last 10 games</CardDescription>
              </CardHeader>
              <CardContent className="h-[220px] overflow-y-auto">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>OPP</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>MIN</TableHead>
                        <TableHead>PTS</TableHead>
                        <TableHead>REB</TableHead>
                        <TableHead>AST</TableHead>
                        <TableHead>STL</TableHead>
                        <TableHead>BLK</TableHead>
                        <TableHead>FG</TableHead>
                        <TableHead>3PT</TableHead>
                        <TableHead>FT</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="bg-green-50">
                        <TableCell>Apr 2</TableCell>
                        <TableCell>@KEN</TableCell>
                        <TableCell className="font-medium text-blue-600">W 78-72</TableCell>
                        <TableCell>36</TableCell>
                        <TableCell className="font-bold">28</TableCell>
                        <TableCell>7</TableCell>
                        <TableCell>6</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>10-18</TableCell>
                        <TableCell>4-9</TableCell>
                        <TableCell>4-4</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Mar 29</TableCell>
                        <TableCell>TEN</TableCell>
                        <TableCell className="font-medium text-red-600">L 65-70</TableCell>
                        <TableCell>38</TableCell>
                        <TableCell className="font-bold">22</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>8-17</TableCell>
                        <TableCell>2-7</TableCell>
                        <TableCell>4-6</TableCell>
                      </TableRow>
                      <TableRow className="bg-green-50">
                        <TableCell>Mar 25</TableCell>
                        <TableCell>ARK</TableCell>
                        <TableCell className="font-medium text-blue-600">W 82-75</TableCell>
                        <TableCell>35</TableCell>
                        <TableCell className="font-bold">25</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>7</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>9-15</TableCell>
                        <TableCell>3-6</TableCell>
                        <TableCell>4-5</TableCell>
                      </TableRow>
                      <TableRow className="bg-green-50">
                        <TableCell>Mar 21</TableCell>
                        <TableCell>@MIZ</TableCell>
                        <TableCell className="font-medium text-blue-600">W 90-81</TableCell>
                        <TableCell>37</TableCell>
                        <TableCell className="font-bold">31</TableCell>
                        <TableCell>9</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>11-19</TableCell>
                        <TableCell>5-8</TableCell>
                        <TableCell>4-4</TableCell>
                      </TableRow>
                      <TableRow className="bg-green-50">
                        <TableCell>Mar 16</TableCell>
                        <TableCell>AUB</TableCell>
                        <TableCell className="font-medium text-blue-600">W 76-68</TableCell>
                        <TableCell>34</TableCell>
                        <TableCell className="font-bold">18</TableCell>
                        <TableCell>6</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>6-14</TableCell>
                        <TableCell>2-5</TableCell>
                        <TableCell>4-4</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Shooting Trends</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-end justify-between gap-2">
                    <div className="relative flex flex-col items-center">
                      <div className="h-[65%] w-8 bg-blue-500 rounded-t-sm"></div>
                      <div className="mt-2 text-xs">Nov</div>
                      <div className="absolute -top-6 text-xs font-medium">43.2%</div>
                    </div>
                    <div className="relative flex flex-col items-center">
                      <div className="h-[75%] w-8 bg-blue-500 rounded-t-sm"></div>
                      <div className="mt-2 text-xs">Dec</div>
                      <div className="absolute -top-6 text-xs font-medium">49.8%</div>
                    </div>
                    <div className="relative flex flex-col items-center">
                      <div className="h-[70%] w-8 bg-blue-500 rounded-t-sm"></div>
                      <div className="mt-2 text-xs">Jan</div>
                      <div className="absolute -top-6 text-xs font-medium">46.5%</div>
                    </div>
                    <div className="relative flex flex-col items-center">
                      <div className="h-[60%] w-8 bg-blue-500 rounded-t-sm"></div>
                      <div className="mt-2 text-xs">Feb</div>
                      <div className="absolute -top-6 text-xs font-medium">40.1%</div>
                    </div>
                    <div className="relative flex flex-col items-center">
                      <div className="h-[80%] w-8 bg-blue-500 rounded-t-sm"></div>
                      <div className="mt-2 text-xs">Mar</div>
                      <div className="absolute -top-6 text-xs font-medium">53.2%</div>
                    </div>
                    <div className="relative flex flex-col items-center">
                      <div className="h-[72%] w-8 bg-blue-500 rounded-t-sm"></div>
                      <div className="mt-2 text-xs">Apr</div>
                      <div className="absolute -top-6 text-xs font-medium">48.3%</div>
                    </div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground mt-4">Monthly Field Goal Percentage</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Shot Distribution</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-4">
                    <div className="w-[180px] h-[180px] rounded-full border-8 border-blue-500 relative">
                      <div
                        className="absolute inset-0 border-[36px] border-green-500 rounded-full"
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
                      ></div>
                      <div
                        className="absolute inset-0 border-[36px] border-red-500 rounded-full"
                        style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}
                      ></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                        <span>3PT</span>
                      </div>
                      <div className="font-medium">32%</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                        <span>Mid</span>
                      </div>
                      <div className="font-medium">45%</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                        <span>Paint</span>
                      </div>
                      <div className="font-medium">23%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
