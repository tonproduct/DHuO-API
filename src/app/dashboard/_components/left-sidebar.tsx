"use client"

import {
  LayoutGrid,
  BookOpen,
  Network,
  Rocket,
  MonitorDown,
  Settings,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: LayoutGrid, label: "Canvas",      active: true  },
  { icon: BookOpen,   label: "Documentação", active: false },
  { icon: Network,    label: "Gateway",      active: false },
  { icon: Rocket,     label: "Implantação",  active: false },
  { icon: MonitorDown,label: "Publicação",   active: false },
  { icon: Settings,   label: "Configuração", active: false },
]

export function LeftSidebar() {
  return (
    <aside
      className="w-[83px] shrink-0 flex flex-col items-center"
      style={{ backgroundColor: "#8e3ccb", height: "100vh" }}
    >
      {/* Logo / Exit icon */}
      <div className="flex items-center justify-center w-full h-[83px] shrink-0">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-md"
          style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
        >
          <LogOut size={20} color="white" strokeWidth={1.8} />
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col w-full">
        {navItems.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={cn(
              "flex flex-col items-center justify-center w-full h-[67px] gap-1.5 cursor-pointer transition-colors",
              active
                ? "bg-white/20"
                : "hover:bg-white/10"
            )}
          >
            <Icon size={24} color="white" strokeWidth={1.8} />
            <span
              className="text-white leading-none"
              style={{ fontSize: 10, fontFamily: "Noto Sans, sans-serif", fontWeight: 400 }}
            >
              {label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
