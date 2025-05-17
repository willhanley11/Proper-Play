"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  X,
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Trophy,
  Users,
  Calendar,
  Shield,
  LineChart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import OffenseTab from "./my-season/offense-tab"
import ShotChartTab from "./my-season/shot-chart-tab"
import ComparisonTab from "./my-season/comparison-tab"
import YamagataTeamStats from "./yamagata-team-stats"
import StatisticsTab from "./statistics-tab"

// Add International section with Euroleague
const countries = [
  { id: "international", name: "International", flag: "🌍" },
  { id: "spain", name: "Spain", flag: "🇪🇸" },
  { id: "italy", name: "Italy", flag: "🇮🇹" },
  { id: "france", name: "France", flag: "🇫🇷" },
  { id: "germany", name: "Germany", flag: "🇩🇪" },
  { id: "greece", name: "Greece", flag: "🇬🇷" },
]

const leaguesByCountry = {
  international: [
    {
      id: "international-euroleague",
      name: "Euroleague",
      country: "International",
      flag: "🌍",
      color: "#FF6600",
      logo: "/euroleague-logo.png",
    },
    {
      id: "international-eurocup",
      name: "EuroCup",
      country: "International",
      flag: "🌍",
      color: "#0066CC",
      logo: "/eurocup-logo.png",
    },
  ],
  spain: [
    {
      id: "spain-liga-acb",
      name: "Liga ACB",
      country: "Spain",
      flag: "🇪🇸",
      color: "#E94E37",
      logo: "/liga-acb-logo.png",
    },
    {
      id: "spain-leb-oro",
      name: "LEB Oro",
      country: "Spain",
      flag: "🇪🇸",
      color: "#FF9800",
      logo: "/leb-oro-logo.png",
    },
  ],
  italy: [
    {
      id: "italy-lega-basket",
      name: "Lega Basket",
      country: "Italy",
      flag: "🇮🇹",
      color: "#26A69A",
      logo: "/lega-basket-logo.png",
    },
    {
      id: "italy-serie-a2",
      name: "Serie A2",
      country: "Italy",
      flag: "🇮🇹",
      color: "#4CAF50",
      logo: "/serie-a2-logo.png",
    },
  ],
  france: [
    {
      id: "france-lnb",
      name: "LNB Pro A",
      country: "France",
      flag: "🇫🇷",
      color: "#5C6BC0",
      logo: "/lnb-pro-a-logo.png",
    },
    {
      id: "france-pro-b",
      name: "Pro B",
      country: "France",
      flag: "🇫🇷",
      color: "#7986CB",
      logo: "/pro-b-logo.png",
    },
  ],
  germany: [
    {
      id: "germany-bbl",
      name: "Basketball Bundesliga",
      country: "Germany",
      flag: "🇩🇪",
      color: "#FFC107",
      logo: "/basketball-bundesliga-logo.png",
    },
    {
      id: "germany-pro-a",
      name: "ProA",
      country: "Germany",
      flag: "🇩🇪",
      color: "#FFD54F",
      logo: "/pro-a-logo.png",
    },
  ],
  greece: [
    {
      id: "greece-basket-league",
      name: "Basket League",
      country: "Greece",
      flag: "🇬🇷",
      color: "#42A5F5",
      logo: "/greek-basket-league-logo.png",
    },
    {
      id: "greece-a2",
      name: "A2 League",
      country: "Greece",
      flag: "🇬🇷",
      color: "#64B5F6",
      logo: "/greek-a2-logo.png",
    },
  ],
}

// Flatten leagues for easy lookup
const allLeagues = Object.values(leaguesByCountry).flat()

// League sections
const leagueSections = [
  { id: "teams", label: "Teams", icon: Users },
  { id: "standings", label: "Standings", icon: Trophy },
  { id: "statistics", label: "Statistics", icon: LineChart },
  { id: "players", label: "Players", icon: Shield },
  { id: "comparison", label: "Comparison", icon: LineChart },
  { id: "shot-chart", label: "Visuals", icon: Calendar },
]

// Define gradient styles directly - now more subtle
const lightGradient = {
  backgroundImage: "linear-gradient(135deg, #f8f9fb, #f1f3f7, #e9ecf2)",
  backgroundAttachment: "fixed",
  backgroundSize: "cover",
  backgroundPosition: "center",
}

const darkGradient = {
  backgroundImage: "linear-gradient(135deg, #1f2937, #374151, #4b5563)",
  backgroundAttachment: "fixed",
  backgroundSize: "cover",
  backgroundPosition: "center",
}

// Top bar gradient
const topBarGradient = {
  backgroundImage: "linear-gradient(to bottom, #334155, #475569, #64748b, #94a3b8, #ffffff)",
}

export function ProLeagueNav() {
  // Set default to Euroleague
  const [activeLeague, setActiveLeague] = useState("international-euroleague")
  const [activeSection, setActiveSection] = useState("teams")
  const [isLeagueDropdownOpen, setIsLeagueDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [playerNameSearch, setPlayerNameSearch] = useState("")
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  const [filteredPlayerImages, setFilteredPlayerImages] = useState<any[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [expandedCountries, setExpandedCountries] = useState<Record<string, boolean>>({
    international: true,
  })
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)

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

  const leagueDropdownRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const countryDropdownRef = useRef<HTMLDivElement>(null)

  const currentLeague = allLeagues.find((league) => league.id === activeLeague) || allLeagues[0]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (leagueDropdownRef.current && !leagueDropdownRef.current.contains(event.target as Node)) {
        setIsLeagueDropdownOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  // Toggle country expansion
  const toggleCountryExpansion = (countryId: string) => {
    setExpandedCountries((prev) => ({
      ...prev,
      [countryId]: !prev[countryId],
    }))
  }

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "teams":
        return <YamagataTeamStats initialTab="teams" hideNav={true} />
      case "standings":
        return <YamagataTeamStats initialTab="league" hideNav={true} />
      case "visuals":
        return <ShotChartTab />
      case "statistics":
        return (
          <OffenseTab
            playerSearch={playerNameSearch}
            onPlayerSearchChange={setPlayerNameSearch}
            selectedPlayer={selectedPlayer}
            onPlayerSelect={setSelectedPlayer}
            filteredPlayers={filteredPlayerImages}
          />
        )
      case "players":
        return <StatisticsTab playerSearch={playerNameSearch} onPlayerSearchChange={setPlayerNameSearch} />
      case "comparison":
        return <ComparisonTab />
      case "shot-chart":
        return <ShotChartTab />
      default:
        return (
          <div
            className={cn(
              "rounded-lg flex items-center justify-center text-center border-2 border-dashed p-8",
              isDarkMode ? "border-gray-800 text-gray-500" : "border-gray-200 text-gray-400",
            )}
          >
            <div>
              <p className="text-sm font-medium mb-1">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
              </p>
              <p className="text-xs">
                Content for {currentLeague.name} {activeSection} would appear here
              </p>
            </div>
          </div>
        )
    }
  }

  // Apply gradient styles directly to the main container
  const gradientStyle = isDarkMode ? darkGradient : lightGradient

  return (
    <div style={gradientStyle} className="min-h-screen">
      {/* Top announcement bar - professional and sleek */}
<div
  style={{
    background: isDarkMode
      ? "linear-gradient(to right, #0f172a, #1e293b)"
      : "linear-gradient(to right, #0f172a, #1e293b)",
    height: "48px",
  }}
  className="w-full py-2 px-4 text-sm"
>
  <div className="max-w-screen-2xl mx-auto flex items-center justify-between h-full">
    <div className="flex items-center">
      <div className="relative h-8 w-8 mr-3">
        <Image
          src="/proper-play-logo.png"
          alt="Proper Play Logo"
          width={32}
          height={32}
          className="object-contain"
        />
      </div>
      <div className="font-medium text-sm tracking-wide text-white flex items-center">
        <span className="font-semibold">Proper Play</span>
        <span className="mx-2 opacity-40">|</span>
        <span className="text-xs opacity-90">Basketball Analytics Made Simple</span>
      </div>
    </div>

    <div className="flex items-center space-x-8 text-xs text-white">
      <Link href="#" className="hover:text-blue-300 transition-colors duration-200 font-medium">
        About
      </Link>
      <Link href="#" className="hover:text-blue-300 transition-colors duration-200 font-medium">
        Contact
      </Link>
    </div>
  </div>
</div>

      {/* Main navigation - clean and minimal */}
      <header
        className={cn(
          "sticky top-0 w-full z-50 transition-all duration-300 border-b",
          scrollY > 10
            ? isDarkMode
              ? "bg-gray-900/95 backdrop-blur-md shadow-lg shadow-black/10 border-gray-800"
              : "bg-white/95 backdrop-blur-md shadow-sm border-gray-200"
            : isDarkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200",
        )}
      >
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            {/* League selector dropdown - now with Euroleague emphasis */}
            <div className="relative w-64" ref={countryDropdownRef}>
              <button
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className={cn(
                  "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors w-full",
                  isDarkMode
                    ? "hover:bg-gray-800 text-gray-200 border border-gray-700"
                    : "hover:bg-gray-100 text-gray-700 border border-gray-200",
                )}
              >
                <div className="flex items-center">
                  <div className="relative h-6 w-6 mr-2">
                    <Image
                      src="/euroleague-logo.png"
                      alt="Euroleague Logo"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <span className="font-bold text-lg tracking-wide">EUROLEAGUE</span>
                </div>
                <ChevronDown className="ml-auto h-4 w-4 opacity-70" />
              </button>

              <AnimatePresence>
                {isCountryDropdownOpen && (
                  <motion.div
                    className={cn(
                      "absolute left-0 mt-1 w-full rounded-md overflow-hidden z-50 border shadow-lg",
                      isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200",
                    )}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="py-1">
                      {countries.map((country) => (
                        <div key={country.id} className="px-2 py-1">
                          <div
                            className={cn(
                              "px-2 py-1 text-sm font-medium rounded-md",
                              isDarkMode ? "text-gray-200" : "text-gray-700",
                            )}
                          >
                            <span className="mr-2">{country.flag}</span>
                            {country.name}
                          </div>
                          <div className="pl-4 mt-1 space-y-1">
                            {leaguesByCountry[country.id]?.map((league) => (
                              <button
                                key={league.id}
                                onClick={() => {
                                  setActiveLeague(league.id)
                                  setIsCountryDropdownOpen(false)
                                }}
                                className={cn(
                                  "flex items-center w-full px-2 py-1 rounded-md text-sm transition-colors",
                                  league.id === activeLeague
                                    ? isDarkMode
                                      ? "bg-indigo-600 text-white"
                                      : "bg-indigo-50 text-indigo-700"
                                    : isDarkMode
                                      ? "text-gray-300 hover:bg-gray-800"
                                      : "text-gray-600 hover:bg-gray-50",
                                )}
                              >
                                {league.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Main navigation links - centered */}
            <div className="flex items-center justify-center flex-grow">
              <div className="flex items-center space-x-1">
                {leagueSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      activeSection === section.id
                        ? isDarkMode
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-gray-900"
                        : isDarkMode
                          ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                    )}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-2">
              {/* Search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}
              </button>

              {/* User menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  <span>Account</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      className={cn(
                        "absolute right-0 mt-1 w-48 rounded-md overflow-hidden z-50 border shadow-lg",
                        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200",
                      )}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className={cn("px-4 py-3 border-b", isDarkMode ? "border-gray-800" : "border-gray-200")}>
                        <p className={cn("text-sm font-medium", isDarkMode ? "text-white" : "text-gray-900")}>
                          John Smith
                        </p>
                        <p className="text-xs text-gray-500">john.smith@example.com</p>
                      </div>
                      <div className="py-1">
                        <button
                          className={cn(
                            "flex items-center w-full px-4 py-2 text-sm text-left transition-colors",
                            isDarkMode
                              ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                              : "text-gray-700 hover:bg-gray-100",
                          )}
                        >
                          <User className="h-4 w-4 mr-2 opacity-70" />
                          Your Profile
                        </button>
                        <button
                          className={cn(
                            "flex items-center w-full px-4 py-2 text-sm text-left transition-colors",
                            isDarkMode
                              ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                              : "text-gray-700 hover:bg-gray-100",
                          )}
                        >
                          <Settings className="h-4 w-4 mr-2 opacity-70" />
                          Settings
                        </button>
                      </div>
                      <div className={cn("py-1 border-t", isDarkMode ? "border-gray-800" : "border-gray-200")}>
                        <button
                          className={cn(
                            "flex items-center w-full px-4 py-2 text-sm text-left transition-colors",
                            isDarkMode
                              ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                              : "text-gray-700 hover:bg-gray-100",
                          )}
                        >
                          <LogOut className="h-4 w-4 mr-2 opacity-70" />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "md:hidden p-2 rounded-md transition-colors",
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen search overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
            />

            <motion.div
              className={cn(
                "w-full max-w-2xl rounded-lg overflow-hidden border relative z-10 shadow-xl",
                isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200",
              )}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="relative">
                <Search
                  className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5",
                    isDarkMode ? "text-gray-400" : "text-gray-400",
                  )}
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={`Search in ${currentLeague.name}...`}
                  className={cn(
                    "w-full py-4 pl-12 pr-12 text-base focus:outline-none transition-colors",
                    isDarkMode
                      ? "bg-gray-900 text-white placeholder:text-gray-400"
                      : "bg-white text-gray-900 placeholder:text-gray-400",
                  )}
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className={cn(
                    "absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full",
                    isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-gray-900",
                  )}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className={cn("border-t px-4 py-3", isDarkMode ? "border-gray-800" : "border-gray-200")}>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={cn(
                      "text-xs font-semibold uppercase tracking-wider",
                      isDarkMode ? "text-gray-400" : "text-gray-500",
                    )}
                  >
                    Recent Searches
                  </div>
                </div>
                <div className="space-y-1">
                  {["Real Madrid", "Walter Tavares", "Liga ACB Standings"].map((item, index) => (
                    <button
                      key={index}
                      className={cn(
                        "flex items-center w-full px-3 py-2 rounded-md text-sm transition-colors",
                        isDarkMode
                          ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                          : "text-gray-700 hover:bg-gray-100",
                      )}
                    >
                      <Search className="h-4 w-4 mr-3 opacity-70" />
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              className={cn(
                "absolute inset-y-0 right-0 w-full max-w-xs flex flex-col border-l shadow-xl",
                isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200",
              )}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div
                className={cn(
                  "flex items-center justify-between p-4 border-b",
                  isDarkMode ? "border-gray-800" : "border-gray-200",
                )}
              >
                <div className="flex items-center">
                  <div className="relative h-6 w-6 mr-2">
                    <Image
                      src="/euroleague-logo.png"
                      alt="Euroleague Logo"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <span className={cn("font-bold text-lg", isDarkMode ? "text-white" : "text-gray-900")}>
                    EUROLEAGUE
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "p-2 rounded-md",
                    isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900",
                  )}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-4">
                {/* Mobile navigation links */}
                <div className="space-y-1 mb-6">
                  {leagueSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id)
                        setIsMobileMenuOpen(false)
                      }}
                      className={cn(
                        "flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        activeSection === section.id
                          ? isDarkMode
                            ? "bg-gray-800 text-white"
                            : "bg-gray-100 text-gray-900"
                          : isDarkMode
                            ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                      )}
                    >
                      <section.icon className="h-5 w-5 mr-3 opacity-70" />
                      {section.label}
                    </button>
                  ))}
                </div>

                {/* League selector in mobile menu */}
                <div className="mb-6">
                  <div
                    className={cn(
                      "px-3 mb-2 text-xs font-semibold uppercase tracking-wider",
                      isDarkMode ? "text-gray-400" : "text-gray-500",
                    )}
                  >
                    Select League
                  </div>
                  <div className="space-y-1">
                    {countries.map((country) => (
                      <div key={country.id}>
                        <button
                          onClick={() => toggleCountryExpansion(country.id)}
                          className={cn(
                            "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            expandedCountries[country.id]
                              ? isDarkMode
                                ? "bg-gray-800 text-white"
                                : "bg-gray-100 text-gray-900"
                              : isDarkMode
                                ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                          )}
                        >
                          <div className="flex items-center">
                            <span className="mr-2">{country.flag}</span>
                            {country.name}
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              expandedCountries[country.id] ? "rotate-180" : "",
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {expandedCountries[country.id] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-8 pr-3 py-1 space-y-1">
                                {leaguesByCountry[country.id]?.map((league) => (
                                  <button
                                    key={league.id}
                                    onClick={() => {
                                      setActiveLeague(league.id)
                                      setIsMobileMenuOpen(false)
                                    }}
                                    className={cn(
                                      "flex items-center w-full px-3 py-2 rounded-md text-sm transition-colors",
                                      league.id === activeLeague
                                        ? isDarkMode
                                          ? "bg-indigo-600 text-white"
                                          : "bg-indigo-50 text-indigo-700"
                                        : isDarkMode
                                          ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                                    )}
                                  >
                                    {league.name}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content - without the title section */}
      <div
        className="pt-8 pb-16 px-4 max-w-screen-2xl mx-auto transition-all duration-300"
        style={{ background: "transparent" }}
      >
        {/* Render content based on active section */}
        {renderContent()}
      </div>
    </div>
  )
}
