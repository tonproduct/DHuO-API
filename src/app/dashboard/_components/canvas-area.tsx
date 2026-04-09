"use client"

import { Search, HelpCircle } from "lucide-react"

/** Full-width search bar row (header-info in Figma) — sits between SectionHeader and canvas */
export function CanvasSearchBar() {
  return (
    <div
      className="shrink-0 flex items-center justify-between px-4 border-b"
      style={{ height: 60, backgroundColor: "#f4f4f4", borderColor: "#eaeaea" }}
    >
      <div
        className="flex items-center gap-2 rounded border bg-white px-3"
        style={{ width: 267, height: 40, borderColor: "#bcbcbc", borderRadius: 4 }}
      >
        <input
          placeholder="Buscar componente no canvas"
          className="flex-1 text-sm outline-none bg-transparent"
          style={{ color: "#6e6e6e", fontFamily: "Noto Sans, sans-serif", fontWeight: 500 }}
        />
        <Search size={18} style={{ color: "#bcbcbc", flexShrink: 0 }} />
      </div>
      <button
        className="flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
        style={{ width: 32, height: 32 }}
      >
        <HelpCircle size={22} style={{ color: "#bcbcbc" }} />
      </button>
    </div>
  )
}

