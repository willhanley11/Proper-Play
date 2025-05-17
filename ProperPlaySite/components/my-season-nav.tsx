"use client"

interface MySeasonNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function MySeasonNav({ activeTab, onTabChange }: MySeasonNavProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-base font-bold text-black mr-6">My Season</span>
          <nav className="flex">
            <button
              onClick={() => onTabChange("offense")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "offense"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Statistics
            </button>
            <button
              onClick={() => onTabChange("defense")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "defense"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Visuals
            </button>
            <button
              onClick={() => onTabChange("impact")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "impact"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Comparison
            </button>
          </nav>
        </div>
        <div>
          <button className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-md border border-gray-200 text-sm font-medium text-gray-800 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-calendar"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            2024-25 Spain 1
          </button>
        </div>
      </div>
    </div>
  )
}
