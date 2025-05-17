"use client"

import { ProLeagueNav } from "./pro-league-nav"
import { LigaContent } from "./liga-content"
import { useState } from "react"

export function LayoutWithSidebar({ children }) {
  const [activeSection, setActiveSection] = useState("league-section")
  // Keep the activeLeague state but hardcode it to "spain-liga-acb"
  const [activeLeague] = useState("spain-liga-acb")

  return (
    <ProLeagueNav>
      <LigaContent activeSection={activeSection} activeLeague={activeLeague} />
    </ProLeagueNav>
  )
}
