"use client"

import { useState } from "react"
import { Search, ChevronDown, ChevronUp } from "lucide-react"
import { COMPONENT_TYPES } from "./component-types"

export function ComponentPanel() {
  const [triggersOpen, setTriggersOpen] = useState(false)
  const [techOpen, setTechOpen] = useState(true)

  return (
    <aside
      className="shrink-0 flex flex-col bg-white border-l overflow-hidden"
      style={{ width: 280, borderColor: "#eaeaea" }}
    >
      {/* Toggle tabs */}
      <div className="shrink-0 px-3 pt-3 pb-2">
        <div
          className="flex rounded"
          style={{ backgroundColor: "#f4f4f4", padding: 4 }}
        >
          <button
            className="flex-1 h-8 rounded text-xs font-bold text-white"
            style={{ backgroundColor: "#8e3ccb", fontFamily: "Noto Sans, sans-serif" }}
          >
            Componentes
          </button>
          <button
            className="flex-1 h-8 rounded text-xs font-bold"
            style={{ color: "#6e6e6e", fontFamily: "Noto Sans, sans-serif" }}
          >
            Serviços
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 pb-3 shrink-0">
        <div
          className="flex items-center gap-2 rounded border px-3 h-10 bg-white"
          style={{ borderColor: "#bcbcbc" }}
        >
          <Search size={18} style={{ color: "#bcbcbc" }} />
          <input
            placeholder="Buscar componente"
            className="flex-1 text-sm outline-none bg-transparent"
            style={{ color: "#6e6e6e", fontFamily: "Noto Sans, sans-serif", fontWeight: 500 }}
          />
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto px-3 flex flex-col gap-0">
        {/* Triggers */}
        <div className="border-b" style={{ borderColor: "#eaeaea" }}>
          <button
            className="flex items-center justify-between w-full py-3"
            onClick={() => setTriggersOpen(!triggersOpen)}
          >
            <span
              className="text-sm font-semibold"
              style={{ color: "#1a1a1a", fontFamily: "Noto Sans, sans-serif" }}
            >
              Triggers
            </span>
            {triggersOpen
              ? <ChevronUp size={18} style={{ color: "#6e6e6e" }} />
              : <ChevronDown size={18} style={{ color: "#6e6e6e" }} />
            }
          </button>
          {triggersOpen && (
            <div className="pb-3 text-xs" style={{ color: "#6e6e6e" }}>
              Nenhum trigger disponível
            </div>
          )}
        </div>

        {/* Componentes técnicos */}
        <div>
          <button
            className="flex items-center justify-between w-full py-3"
            onClick={() => setTechOpen(!techOpen)}
          >
            <span
              className="text-sm font-semibold"
              style={{ color: "#1a1a1a", fontFamily: "Noto Sans, sans-serif" }}
            >
              Componentes técnicos
            </span>
            {techOpen
              ? <ChevronUp size={18} style={{ color: "#6e6e6e" }} />
              : <ChevronDown size={18} style={{ color: "#6e6e6e" }} />
            }
          </button>

          {techOpen && (
            <div className="flex flex-col gap-2 pb-4">
              {COMPONENT_TYPES.map((comp) => (
                <div
                  key={comp.id}
                  draggable
                  onDragStart={(e) => {
                    console.log("[drag] start", comp.id)
                    e.dataTransfer.setData("text/plain", comp.id)
                    e.dataTransfer.effectAllowed = "move"
                  }}
                  className="flex items-center gap-3 rounded border bg-white cursor-grab active:cursor-grabbing hover:shadow-sm transition-shadow select-none"
                  style={{
                    height: 54,
                    padding: "0 12px",
                    borderColor: "#cbcbcb",
                    borderRadius: 4,
                  }}
                >
                  <div
                    className="shrink-0 flex items-center justify-center rounded text-xs font-bold"
                    style={{
                      width: 43,
                      height: 31,
                      backgroundColor: comp.bg,
                      color: comp.color,
                    }}
                  >
                    {comp.abbr}
                  </div>
                  <span
                    className="text-sm uppercase tracking-wide"
                    style={{
                      color: "#6e6e6e",
                      fontFamily: "Noto Sans, sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                    }}
                  >
                    {comp.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
