"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const nav = [
  { label: "Overview",      href: "/design-system",                          group: null },
  { label: "Colors",        href: "/design-system/colors",                   group: "Tokens" },
  { label: "Typography",    href: "/design-system/typography",               group: "Tokens" },
  { label: "Radius",        href: "/design-system/radius",                   group: "Tokens" },
  { label: "Motion",        href: "/design-system/motion",                   group: "Tokens" },
  { label: "Button",        href: "/design-system/components/button",        group: "Components" },
  { label: "Input",         href: "/design-system/components/input",         group: "Components" },
  { label: "Form Controls", href: "/design-system/components/form-controls", group: "Components" },
  { label: "Rating",        href: "/design-system/components/rating",        group: "Components" },
  { label: "Card",          href: "/design-system/components/card",          group: "Components" },
  { label: "Badge",         href: "/design-system/components/badge",         group: "Components" },
  { label: "Avatar",        href: "/design-system/components/avatar",        group: "Components" },
  { label: "Dialog",        href: "/design-system/components/dialog",        group: "Components" },
  { label: "Table",         href: "/design-system/components/table",         group: "Components" },
  { label: "Feedback",      href: "/design-system/components/feedback",      group: "Components" },
  { label: "Canvas Nodes", href: "/design-system/canvas-nodes",             group: "Canvas" },
]

export function Sidebar() {
  const pathname = usePathname()
  let lastGroup: string | null = null

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-60 border-r border-border bg-sidebar flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-14 border-b border-border shrink-0">
        <div className="flex size-7 items-center justify-center rounded-md bg-foreground text-background text-sm font-bold">
          S
        </div>
        <div>
          <p className="text-sm font-semibold leading-none">Synnk DS</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">v0.1.0</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        {nav.map((item) => {
          const showGroup = item.group && item.group !== lastGroup
          if (item.group) lastGroup = item.group

          const isActive = pathname === item.href

          return (
            <div key={item.href}>
              {showGroup && (
                <p className="px-2 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {item.group}
                </p>
              )}
              <Link
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-2 py-1.5 text-sm transition-colors",
                  item.group ? "pl-3" : "",
                  isActive
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {item.label}
              </Link>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
