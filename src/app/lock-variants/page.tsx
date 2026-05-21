"use client"

import { useState, useCallback } from "react"
import {
  Lock, Globe, Layers, Clock, Radio, Database,
  GitBranch, Building2, Cloud, Bot, MessageSquare,
  Eye, BarChart2, Settings, Zap,
  LayoutGrid, Activity, TrendingUp,
} from "lucide-react"

// ── Icon library variants ─────────────────────────────────────────────────────

type IconLib   = "lucide" | "material" | "phosphor" | "tabler" | "bootstrap"
type IconStyle = "outline" | "filled"

type LockIconProps = { size: number; style?: React.CSSProperties; iconStyle?: IconStyle }

function LucideLock({ size, style, iconStyle = "outline" }: LockIconProps) {
  if (iconStyle === "outline") return <Lock size={size} style={style} />
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M19 11h-1V7A6 6 0 0 0 6 7v4H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zM8 7a4 4 0 0 1 8 0v4H8V7zm4 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
    </svg>
  )
}

function MaterialLock({ size, style, iconStyle = "filled" }: LockIconProps) {
  if (iconStyle === "filled") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </svg>
  )
  // outline
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="10" width="14" height="11" rx="1" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function PhosphorLock({ size, style, iconStyle = "outline" }: LockIconProps) {
  if (iconStyle === "outline") return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" style={style}>
      <rect x="40" y="88" width="176" height="128" rx="8"
        stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M88,88V56a40,40,0,0,1,80,0V88"
        stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="128" cy="152" r="12" fill="currentColor" />
    </svg>
  )
  // filled
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" style={style}>
      <path d="M208,80H168V56a40,40,0,0,0-80,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM108,56a20,20,0,0,1,40,0V80H108ZM140,176.92V192a12,12,0,0,1-24,0V176.92a28,28,0,1,1,24,0Z" />
    </svg>
  )
}

function TablerLock({ size, style, iconStyle = "outline" }: LockIconProps) {
  if (iconStyle === "outline") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <line x1="12" y1="15" x2="12" y2="17" />
    </svg>
  )
  // filled
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M12 2a5 5 0 0 1 5 5v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5zm0 12a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1zm0-10a3 3 0 0 0-3 3v2h6V7a3 3 0 0 0-3-3z" />
    </svg>
  )
}

function BootstrapLock({ size, style, iconStyle = "filled" }: LockIconProps) {
  if (iconStyle === "filled") return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" style={style}>
      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    </svg>
  )
  // outline
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={style}
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="7.5" width="11" height="7" rx="1" />
      <path d="M5.5 7.5V5a2.5 2.5 0 0 1 5 0v2.5" />
      <circle cx="8" cy="11" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

const ICON_LIBS: { id: IconLib; label: string; Comp: React.ComponentType<LockIconProps> }[] = [
  { id: "lucide",    label: "Lucide",    Comp: LucideLock    },
  { id: "material",  label: "Material",  Comp: MaterialLock  },
  { id: "phosphor",  label: "Phosphor",  Comp: PhosphorLock  },
  { id: "tabler",    label: "Tabler",    Comp: TablerLock    },
  { id: "bootstrap", label: "Bootstrap", Comp: BootstrapLock },
]

function LockIcon({ lib, size, style, iconStyle }: { lib: IconLib; size: number; style?: React.CSSProperties; iconStyle?: IconStyle }) {
  const entry = ICON_LIBS.find(l => l.id === lib)!
  return <entry.Comp size={size} style={style} iconStyle={iconStyle} />
}

// ── Types ─────────────────────────────────────────────────────────────────────

type LockPlan    = "IA" | "Integra"
type LockVariant = "current" | "badge" | "popover"

type LockedItem = { plan: LockPlan }

// ── Shared: Upgrade Popover ───────────────────────────────────────────────────

function UpgradePopover({ plan }: { plan: LockPlan }) {
  const isIA = plan === "IA"
  const accent = isIA ? "#7c22c0" : "#0369a1"
  return (
    <div className="absolute z-50 left-0 top-full mt-1 rounded-lg shadow-lg border"
      style={{ width: 220, background: "#fff", borderColor: "#e5e7eb", fontFamily: "Noto Sans, sans-serif" }}>
      <div className="px-3 pt-3 pb-3">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Lock size={12} style={{ color: accent }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.04em" }}>
            PLANO {plan.toUpperCase()}
          </span>
        </div>
        <p style={{ fontSize: 11.5, color: "#6b7280", lineHeight: 1.45 }}>
          Este recurso está disponível no plano {plan}. Entre em contato para habilitar.
        </p>
      </div>
    </div>
  )
}

// ── Shared: Plan Badge ────────────────────────────────────────────────────────

function PlanBadge({ plan }: { plan: LockPlan }) {
  const isIA = plan === "IA"
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, padding: "2px 5px", borderRadius: 4,
      letterSpacing: "0.05em", flexShrink: 0, fontFamily: "Noto Sans, sans-serif",
      backgroundColor: isIA ? "#f3e8ff" : "#e0f2fe",
      color:           isIA ? "#7c22c0" : "#0369a1",
      border:          `1px solid ${isIA ? "#ddd6fe" : "#bae6fd"}`,
    }}>
      {plan}
    </span>
  )
}

// ── Surface 1: Lista de componentes ──────────────────────────────────────────

type ListItem = { id: string; label: string; description: string; icon: React.ReactNode; locked?: LockedItem }

const LIST_ITEMS: ListItem[] = [
  { id: "http",       label: "HTTP",         description: "Requisição HTTP/REST",             icon: <Globe size={16} /> },
  { id: "kafka",      label: "KAFKA",        description: "Consome tópico Apache Kafka",      icon: <Layers size={16} />, locked: { plan: "IA" } },
  { id: "scheduler",  label: "SCHEDULER",    description: "Executa em intervalo configurado", icon: <Clock size={16} /> },
  { id: "rabbitmq",   label: "RABBITMQ",     description: "Fila RabbitMQ",                   icon: <Radio size={16} />, locked: { plan: "IA" } },
  { id: "postgresql", label: "POSTGRESQL",   description: "Banco de dados PostgreSQL",        icon: <Database size={16} /> },
  { id: "sap",        label: "SAP",          description: "Integra SAP via RFC ou OData",     icon: <Building2 size={16} />, locked: { plan: "Integra" } },
  { id: "gcloud",     label: "GOOGLE CLOUD", description: "Serviços Google Cloud Platform",   icon: <Cloud size={16} />, locked: { plan: "Integra" } },
  { id: "gitbranch",  label: "CHOICE",       description: "Roteia por condições WHEN",        icon: <GitBranch size={16} /> },
]

function ListSurface({ variant, iconLib, iconStyle }: { variant: LockVariant; iconLib: IconLib; iconStyle: IconStyle }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [hover, setHover] = useState<string | null>(null)
  const toggle = useCallback((id: string) => setOpenId(prev => prev === id ? null : id), [])

  return (
    <div className="flex flex-col overflow-hidden" style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10 }}>
      <div className="px-3 py-2 border-b" style={{ borderColor: "#f3f4f6" }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.07em", fontFamily: "Noto Sans, sans-serif" }}>
          LISTA DE COMPONENTES
        </span>
      </div>
      <div className="flex-1 overflow-y-auto py-1">
        {LIST_ITEMS.map(item => {
          const locked = item.locked
          const isOpen = openId === item.id

          if (!locked) return (
            <div key={item.id} className="flex items-center gap-2.5 px-3 py-2 rounded-md mx-1 hover:bg-gray-50 cursor-grab">
              <div style={{ color: "#9ca3af", flexShrink: 0 }}>{item.icon}</div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 12, fontWeight: 600, color: "#111827", fontFamily: "Noto Sans, sans-serif" }}>{item.label}</p>
                <p style={{ fontSize: 11, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif" }}>{item.description}</p>
              </div>
            </div>
          )

          if (variant === "current") return (
            <div key={item.id} className="relative group mx-1"
              onMouseEnter={() => setHover(item.id)} onMouseLeave={() => setHover(null)}>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-md" style={{ cursor: "not-allowed" }}>
                <div style={{ color: "#bcbcbc", flexShrink: 0 }}>{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#bcbcbc", fontFamily: "Noto Sans, sans-serif" }}>{item.label}</p>
                  <p style={{ fontSize: 11, color: "#d1d5db", fontFamily: "Noto Sans, sans-serif" }}>{item.description}</p>
                </div>
                <LockIcon lib={iconLib} size={16} iconStyle={iconStyle} style={{ color: "#bcbcbc", flexShrink: 0 }} />
              </div>
              {hover === item.id && (
                <div className="absolute left-3 bottom-full mb-1 px-2 py-1 rounded pointer-events-none z-40 whitespace-nowrap"
                  style={{ background: "#111827", color: "#fff", fontSize: 10.5, fontFamily: "Noto Sans, sans-serif" }}>
                  Disponível no plano <strong>{locked.plan}</strong>
                </div>
              )}
            </div>
          )

          if (variant === "badge") return (
            <div key={item.id} className="flex items-center gap-2.5 px-3 py-2 rounded-md mx-1" style={{ cursor: "default" }}>
              <div style={{ color: "#bcbcbc", flexShrink: 0 }}>{item.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#bcbcbc", fontFamily: "Noto Sans, sans-serif" }}>{item.label}</p>
                  <PlanBadge plan={locked.plan} />
                </div>
                <p style={{ fontSize: 11, color: "#d1d5db", fontFamily: "Noto Sans, sans-serif" }}>{item.description}</p>
              </div>
            </div>
          )

          return (
            <div key={item.id} className="relative mx-1"
              onMouseEnter={() => setOpenId(item.id)} onMouseLeave={() => setOpenId(null)}>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-gray-50 cursor-default">
                <div style={{ color: "#9ca3af", flexShrink: 0 }}>{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#111827", fontFamily: "Noto Sans, sans-serif" }}>{item.label}</p>
                  <p style={{ fontSize: 11, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif" }}>{item.description}</p>
                </div>
                <LockIcon lib={iconLib} size={16} iconStyle={iconStyle} style={{ color: "#9ca3af", flexShrink: 0 }} />
              </div>
              {isOpen && <UpgradePopover plan={locked.plan} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Surface 2: Botões de ação ─────────────────────────────────────────────────

type ButtonItem = { id: string; label: string; icon: React.ReactNode; locked?: LockedItem }

const BUTTON_ITEMS: ButtonItem[] = [
  { id: "chat",     label: "Chat IA",        icon: <MessageSquare size={14} />, locked: { plan: "IA" } },
  { id: "preview",  label: "Pré-visualizar", icon: <Eye size={14} /> },
  { id: "publish",  label: "Publicar",       icon: <Zap size={14} />, locked: { plan: "Integra" } },
  { id: "metrics",  label: "Métricas",       icon: <BarChart2 size={14} /> },
  { id: "settings", label: "Configurações",  icon: <Settings size={14} /> },
]

function ButtonSurface({ variant, iconLib, iconStyle }: { variant: LockVariant; iconLib: IconLib; iconStyle: IconStyle }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [hover, setHover] = useState<string | null>(null)

  return (
    <div className="flex flex-col overflow-hidden" style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10 }}>
      <div className="px-3 py-2 border-b" style={{ borderColor: "#f3f4f6" }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.07em", fontFamily: "Noto Sans, sans-serif" }}>
          BOTÕES DE AÇÃO
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-center px-4 py-6 gap-3">
        <div className="flex gap-2 flex-wrap">
          {BUTTON_ITEMS.map(btn => {
            const locked = btn.locked
            const isOpen = openId === btn.id

            if (!locked) return (
              <button key={btn.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border hover:bg-gray-50 transition-colors cursor-pointer"
                style={{ fontSize: 12, fontWeight: 500, color: "#374151", borderColor: "#e5e7eb", background: "#fff", fontFamily: "Noto Sans, sans-serif" }}>
                <span style={{ color: "#6b7280" }}>{btn.icon}</span>
                {btn.label}
              </button>
            )

            if (variant === "current") return (
              <div key={btn.id} className="relative">
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border"
                  style={{ fontSize: 12, fontWeight: 500, color: "#bcbcbc", borderColor: "#e5e7eb", background: "#fff", cursor: "not-allowed", fontFamily: "Noto Sans, sans-serif" }}
                  onMouseEnter={() => setHover(btn.id)} onMouseLeave={() => setHover(null)}>
                  <span style={{ color: "#bcbcbc" }}>{btn.icon}</span>
                  {btn.label}
                  <LockIcon lib={iconLib} size={16} iconStyle={iconStyle} style={{ color: "#bcbcbc" }} />
                </button>
                {hover === btn.id && (
                  <div className="absolute left-0 bottom-full mb-1 px-2 py-1 rounded z-40 whitespace-nowrap pointer-events-none"
                    style={{ background: "#111827", color: "#fff", fontSize: 10.5, fontFamily: "Noto Sans, sans-serif" }}>
                    Plano <strong>{locked.plan}</strong>
                  </div>
                )}
              </div>
            )

            if (variant === "badge") return (
              <div key={btn.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border"
                style={{ fontSize: 12, fontWeight: 500, color: "#bcbcbc", borderColor: "#e5e7eb", background: "#fff", cursor: "default", fontFamily: "Noto Sans, sans-serif" }}>
                <span style={{ color: "#bcbcbc" }}>{btn.icon}</span>
                {btn.label}
                <PlanBadge plan={locked.plan} />
              </div>
            )

            return (
              <div key={btn.id} className="relative"
                onMouseEnter={() => setOpenId(btn.id)} onMouseLeave={() => setOpenId(null)}>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border hover:bg-gray-50 transition-colors"
                  style={{ fontSize: 12, fontWeight: 500, color: "#374151", borderColor: "#e5e7eb", background: "#fff", fontFamily: "Noto Sans, sans-serif", cursor: "default" }}>
                  <span style={{ color: "#6b7280" }}>{btn.icon}</span>
                  {btn.label}
                  <LockIcon lib={iconLib} size={16} iconStyle={iconStyle} style={{ color: "#9ca3af" }} />
                </button>
                {isOpen && <UpgradePopover plan={locked.plan} />}
              </div>
            )
          })}
        </div>
        <p style={{ fontSize: 10.5, color: "#d1d5db", fontFamily: "Noto Sans, sans-serif", marginTop: 4 }}>
          Contexto: toolbar do editor de integração
        </p>
      </div>
    </div>
  )
}

// ── Surface 3: Navegação lateral ──────────────────────────────────────────────

type NavItem = {
  id: string; label: string; icon: React.ReactNode; locked?: LockedItem; active?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard",   label: "Dashboard",       icon: <LayoutGrid size={20} />, active: true },
  { id: "integration", label: "Integrações",     icon: <GitBranch size={20} /> },
  { id: "api",         label: "API Gateway",     icon: <Globe size={20} />,      locked: { plan: "IA" } },
  { id: "pipeline",    label: "Data Pipeline",   icon: <Database size={20} /> },
  { id: "ai-orch",     label: "AI Orchestrator", icon: <Bot size={20} />,        locked: { plan: "Integra" } },
  { id: "monitoring",  label: "Monitoramento",   icon: <Activity size={20} /> },
  { id: "analytics",   label: "Analytics",       icon: <TrendingUp size={20} />, locked: { plan: "Integra" } },
]

const ITEM_H = 43
const ICON_LEFT = 32

function NavItemRow({ icon, label, color, bg, lockEl }: {
  icon: React.ReactNode; label: string; color: string; bg?: string; lockEl?: React.ReactNode
}) {
  return (
    <div style={{
      height: ITEM_H, background: bg ?? "transparent",
      display: "flex", alignItems: "center",
      paddingLeft: ICON_LEFT, paddingRight: 24,
      cursor: "default", gap: 12,
    }}>
      <span style={{ color, display: "flex", flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1, fontSize: 14, color, fontFamily: "Noto Sans, sans-serif", fontWeight: bg ? 600 : 300, whiteSpace: "nowrap" }}>
        {label}
      </span>
      {lockEl}
    </div>
  )
}

function NavSurface({ variant, iconLib, iconStyle }: { variant: LockVariant; iconLib: IconLib; iconStyle: IconStyle }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [hoverTip, setHoverTip] = useState<string | null>(null)

  return (
    <div className="flex flex-col overflow-hidden" style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10 }}>
      <div className="px-3 py-2 border-b" style={{ borderColor: "#f3f4f6" }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.07em", fontFamily: "Noto Sans, sans-serif" }}>
          NAVEGAÇÃO LATERAL
        </span>
      </div>
      <div style={{ flex: 1, paddingTop: 4, paddingBottom: 4 }}>
        {NAV_ITEMS.map(item => {
          const locked = item.locked
          const isOpen = openId === item.id
          const lockEl = <LockIcon lib={iconLib} size={16} iconStyle={iconStyle} style={{ color: "#bcbcbc" }} />

          if (item.active) return (
            <NavItemRow key={item.id} icon={item.icon} label={item.label} color="#8e3ccb" bg="#f5eefb" />
          )
          if (!locked) return (
            <NavItemRow key={item.id} icon={item.icon} label={item.label} color="#323232" />
          )

          if (variant === "current") return (
            <div key={item.id} className="relative"
              onMouseEnter={() => setHoverTip(item.id)} onMouseLeave={() => setHoverTip(null)}>
              <NavItemRow icon={item.icon} label={item.label} color="#bcbcbc" lockEl={lockEl} />
              {hoverTip === item.id && (
                <div className="absolute left-8 bottom-full mb-1 px-2 py-1 rounded z-40 whitespace-nowrap pointer-events-none"
                  style={{ background: "#111827", color: "#fff", fontSize: 10.5, fontFamily: "Noto Sans, sans-serif" }}>
                  Plano <strong>{locked.plan}</strong>
                </div>
              )}
            </div>
          )

          if (variant === "badge") return (
            <div key={item.id} style={{ height: ITEM_H, display: "flex", alignItems: "center", paddingLeft: ICON_LEFT, paddingRight: 24, gap: 12 }}>
              <span style={{ color: "#bcbcbc", display: "flex", flexShrink: 0 }}>{item.icon}</span>
              <span style={{ flex: 1, fontSize: 14, color: "#bcbcbc", fontFamily: "Noto Sans, sans-serif", fontWeight: 300 }}>{item.label}</span>
              <PlanBadge plan={locked.plan} />
            </div>
          )

          return (
            <div key={item.id} className="relative"
              onMouseEnter={() => setOpenId(item.id)} onMouseLeave={() => setOpenId(null)}>
              <NavItemRow icon={item.icon} label={item.label} color="#323232" lockEl={lockEl} />
              {isOpen && <UpgradePopover plan={locked.plan} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Variant metadata ──────────────────────────────────────────────────────────

const VARIANTS: { id: LockVariant; label: string; pros: string[]; cons: string[] }[] = [
  {
    id: "current",
    label: "A — Atual",
    pros: ["Intenção clara: item bloqueado", "Não adiciona ruído visual por padrão"],
    cons: ["Tooltip exige hover — invisível em touch", "Elemento desabilitado é cognitivamente ignorado"],
  },
  {
    id: "popover",
    label: "B — Popover no hover",
    pros: ["Funciona em touch (não depende de hover exclusivo)", "Contexto no momento de intenção", "Aplica igual nos 3 contextos", "Cor normal — item parece disponível"],
    cons: ["Depende do usuário passar o mouse para descobrir o bloqueio"],
  },
  {
    id: "badge",
    label: "C — Badge de plano",
    pros: ["Frame positivo: 'existe no plano IA'", "Visível sem hover, familiar (Notion, Linear)", "Funciona nos 3 contextos"],
    cons: ["Não deixa claro que não pode usar agora", "Badge repetido em listas longas vira ruído"],
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LockVariantsPage() {
  const [active, setActive]       = useState<LockVariant>("current")
  const [iconLib, setIconLib]     = useState<IconLib>("lucide")
  const [iconStyle, setIconStyle] = useState<IconStyle>("outline")
  const showIconPicker = active === "current" || active === "popover"

  return (
    <div className="min-h-screen py-10 px-8" style={{ background: "#f5f5f7", fontFamily: "Noto Sans, sans-serif" }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
            Lock Pattern — Módulos bloqueados
          </h1>
          <p style={{ fontSize: 13, color: "#6b7280" }}>
            3 variantes × 3 superfícies · Objetivo: o usuário sabe que existe mas não pode usar
          </p>
        </div>

        {/* Context — always open */}
        <div className="mb-6 rounded-lg border overflow-hidden" style={{ background: "#fff", borderColor: "#e5e7eb" }}>
          <div className="px-5 py-3" style={{ borderBottom: "1px solid #f3f4f6" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.07em" }}>CONTEXTO DA PESQUISA</span>
            <span style={{ fontSize: 11, color: "#d1d5db", marginLeft: 8 }}>— como chegamos aqui</span>
          </div>
          <div className="px-5 py-5">
            <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              {[
                {
                  step: "01",
                  title: "Problema identificado",
                  text: "Módulos travados por plano aparecem para todos os usuários, mas sem clareza do que está bloqueado ou por quê. O padrão atual usa disabled + ícone de cadeado + tooltip no hover.",
                },
                {
                  step: "02",
                  title: "Objetivo definido",
                  text: "O usuário precisa saber que o módulo existe e que está fora do seu plano — sem frustração. Produto B2B, sem self-serve: não há botão de upgrade, apenas contato comercial.",
                },
                {
                  step: "03",
                  title: "3 superfícies mapeadas",
                  text: "O padrão precisa funcionar em lista de componentes (painel lateral), botões de ação (toolbar) e navegação lateral (sidebar global). Solução inconsistente entre superfícies foi descartada.",
                },
                {
                  step: "04",
                  title: "Variante A — Atual",
                  text: "Item disabled (#bcbcbc), ícone de cadeado à direita, tooltip no hover. Problema: tooltip invisível em touch, disabled é cognitivamente ignorado.",
                },
                {
                  step: "05",
                  title: "Variante B — Popover",
                  text: "Item com aparência normal + cadeado discreto. No hover, abre popover contextual com nome do plano e texto informativo. Sem CTA de upgrade (produto B2B).",
                },
                {
                  step: "06",
                  title: "Variante C — Badge",
                  text: "Chip colorido com nome do plano (IA roxo, Integra azul) sem desabilitar o item. Frame positivo: 'existe no plano IA'. Referência: Notion, Linear.",
                },
              ].map(item => (
                <div key={item.step} style={{ paddingLeft: 12, borderLeft: "2px solid #f3f4f6" }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: "#d1d5db", letterSpacing: "0.1em", marginBottom: 4 }}>{item.step}</p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>{item.title}</p>
                  <p style={{ fontSize: 11.5, color: "#6b7280", lineHeight: 1.55 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Variant tabs */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.07em" }}>SOLUÇÕES</span>
          {VARIANTS.map(v => (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              className="transition-all"
              style={{
                fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 6,
                border: "1.5px solid", cursor: "pointer", fontFamily: "Noto Sans, sans-serif",
                borderColor: active === v.id ? "#7c22c0" : "#e5e7eb",
                background:  active === v.id ? "#7c22c0" : "#fff",
                color:       active === v.id ? "#fff" : "#374151",
              }}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Icon lib picker — filho de A e B */}
        {showIconPicker && (
          <div className="flex flex-col gap-2 mb-7">
            {/* Row 1: icon lib picker */}
            <div className="flex items-center gap-3 flex-wrap">
              <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.07em" }}>ÍCONE</span>
              <div className="flex gap-2 flex-wrap">
                {ICON_LIBS.map(lib => (
                  <button
                    key={lib.id}
                    onClick={() => setIconLib(lib.id)}
                    className="flex items-center gap-2 transition-all"
                    style={{
                      fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6,
                      border: "1.5px solid", cursor: "pointer", fontFamily: "Noto Sans, sans-serif",
                      borderColor: iconLib === lib.id ? "#7c22c0" : "#e5e7eb",
                      background:  iconLib === lib.id ? "#f5eefb" : "#fff",
                      color:       iconLib === lib.id ? "#7c22c0" : "#374151",
                    }}
                  >
                    <LockIcon lib={lib.id} size={12} iconStyle={iconStyle} style={{ color: iconLib === lib.id ? "#7c22c0" : "#9ca3af" }} />
                    {lib.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 2: filled / outline toggle */}
            <div className="flex items-center gap-3">
              <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.07em" }}>VARIAÇÃO</span>
              <div className="flex items-center gap-1 rounded-md overflow-hidden"
                style={{ border: "1.5px solid #e5e7eb", background: "#fff" }}>
                {(["outline", "filled"] as IconStyle[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setIconStyle(s)}
                    style={{
                      fontSize: 10, fontWeight: 600, padding: "4px 10px", cursor: "pointer",
                      fontFamily: "Noto Sans, sans-serif", border: "none",
                      background: iconStyle === s ? "#7c22c0" : "transparent",
                      color:      iconStyle === s ? "#fff" : "#9ca3af",
                      textTransform: "capitalize",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {!showIconPicker && <div className="mb-7" />}

        {/* 3 surfaces */}
        <div className="grid gap-5 mb-6" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
          <ListSurface   variant={active} iconLib={iconLib} iconStyle={iconStyle} />
          <ButtonSurface variant={active} iconLib={iconLib} iconStyle={iconStyle} />
          <NavSurface    variant={active} iconLib={iconLib} iconStyle={iconStyle} />
        </div>

      </div>
    </div>
  )
}
