"use client"

import type { ReactNode } from "react"

interface BackgroundWrapperProps {
  children: ReactNode
  isDarkMode?: boolean
}

export function BackgroundWrapper({ children, isDarkMode = false }: BackgroundWrapperProps) {
  const lightGradient = {
    backgroundImage: "linear-gradient(135deg, #f3f4f6, #e5e7eb, #d1d5db)",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  }

  const darkGradient = {
    backgroundImage: "linear-gradient(135deg, #1f2937, #374151, #4b5563)",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  }

  return <div style={isDarkMode ? darkGradient : lightGradient}>{children}</div>
}
