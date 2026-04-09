"use client"

import { ChevronDown, PlusCircle } from "lucide-react"

const tabs = [
  { label: "Release",      active: true  },
  { label: "Implantação",  active: false },
  { label: "Section 2",    active: false },
  { label: "Section 2",    active: false },
]

function VersionSelect({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span
        className="uppercase tracking-widest"
        style={{ fontSize: 10, color: "#6e6e6e", fontFamily: "Noto Sans, sans-serif", fontWeight: 400 }}
      >
        {label}
      </span>
      <button
        className="flex items-center gap-1 rounded border px-2 h-6 bg-white"
        style={{ borderColor: "#eaeaea" }}
      >
        <span
          className="text-sm font-semibold"
          style={{ color: "#1a1a1a", fontFamily: "Noto Sans, sans-serif" }}
        >
          {value}
        </span>
        <ChevronDown size={14} style={{ color: "#6e6e6e" }} />
      </button>
    </div>
  )
}

export function SectionHeader() {
  return (
    <header
      className="shrink-0 flex flex-col border-b"
      style={{ backgroundColor: "#f9f9f9", borderColor: "#eaeaea" }}
    >
      {/* Row 1: integration info */}
      <div className="flex items-center justify-between px-5" style={{ height: 58 }}>
        {/* Left: name + versions + nova versão */}
        <div className="flex items-center gap-5">
          <div className="flex flex-col gap-0.5">
            <span
              className="uppercase tracking-widest"
              style={{ fontSize: 10, color: "#6e6e6e", fontFamily: "Noto Sans, sans-serif" }}
            >
              Nome da Integração
            </span>
            <span
              className="font-semibold leading-tight"
              style={{ fontSize: 20, color: "#1a1a1a", fontFamily: "Noto Sans, sans-serif", fontWeight: 600 }}
            >
              Carros da Volkswagen
            </span>
          </div>

          <div className="flex items-end gap-2">
            <VersionSelect label="Principal" value="v3" />
            <VersionSelect label="Secundária" value="v3.2.0" />
          </div>

          <button
            className="flex items-center gap-1.5 rounded px-3 h-9 text-sm font-bold hover:opacity-90 transition-opacity"
            style={{ color: "#39b29d", border: "1px solid transparent", fontFamily: "Noto Sans, sans-serif", fontWeight: 700 }}
          >
            <PlusCircle size={16} style={{ color: "#39b29d" }} />
            Nova versão
          </button>
        </div>

        {/* Right: meta info */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-0.5">
            <span
              style={{ fontSize: 10, color: "#6e6e6e", fontFamily: "Noto Sans, sans-serif" }}
              className="uppercase tracking-widest"
            >
              Categoria
            </span>
            <span
              className="inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium"
              style={{ color: "#6e6e6e", borderColor: "#6e6e6e", borderRadius: 4, fontFamily: "Noto Sans, sans-serif" }}
            >
              Veículos
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span
              style={{ fontSize: 10, color: "#6e6e6e", fontFamily: "Noto Sans, sans-serif" }}
              className="uppercase tracking-widest"
            >
              Criado por
            </span>
            <span
              style={{ fontSize: 14, color: "#6e6e6e", fontFamily: "Noto Sans, sans-serif" }}
            >
              Carlos Silva
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span
              style={{ fontSize: 10, color: "#6e6e6e", fontFamily: "Noto Sans, sans-serif" }}
              className="uppercase tracking-widest"
            >
              Data de criação
            </span>
            <span
              style={{ fontSize: 14, color: "#6e6e6e", fontFamily: "Noto Sans, sans-serif" }}
            >
              20/02/2022
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: tabs */}
      <div
        className="flex items-end px-5"
        style={{ height: 49, borderTop: "1px solid #eaeaea" }}
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            className="relative flex flex-col items-center justify-end pb-2 px-2 mr-2 h-full"
          >
            <span
              className="text-sm"
              style={{
                fontFamily: "Noto Sans, sans-serif",
                fontWeight: tab.active ? 700 : 400,
                color: tab.active ? "#8e3ccb" : "#6e6e6e",
              }}
            >
              {tab.label}
            </span>
            {tab.active && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ backgroundColor: "#8e3ccb" }}
              />
            )}
          </button>
        ))}
      </div>
    </header>
  )
}
