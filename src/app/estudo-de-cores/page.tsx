"use client"

import { useState } from "react"
import { Zap, Cpu, GitBranch, Briefcase, Globe, Bot, Wrench, CheckCircle2, XCircle, AlertTriangle } from "lucide-react"

// Canvas backgrounds
const LIGHT_BG = "#f9fafb"  // canvas atual (ReactFlow, canvas.tsx:138)
const DARK_BG  = "#1e1e1e"  // canvas dark mode projetado

// ── Types ─────────────────────────────────────────────────────────────────────

type NodeEntry = {
  label: string
  hex: string
  hsl: string
  hue: number
  saturation: number
  token: string
  icon: React.ReactNode
  defense: string
  issues?: string[]
  dashed?: boolean   // circulo com stroke tracejado em vez de fill solido
  fillHex?: string   // fill separado do hex de identidade (ex: lavanda suave)
}

// ── WCAG contrast ─────────────────────────────────────────────────────────────

function relL(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const lin = (c: number) => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function ratio(hex: string, bg: string): number {
  const l1 = relL(hex); const l2 = relL(bg)
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (hi + 0.05) / (lo + 0.05)
}

// ── Palettes ──────────────────────────────────────────────────────────────────

const current: NodeEntry[] = [
  {
    label: "Trigger",
    hex: "#64748b",
    hsl: "hsl(215, 16%, 47%)",
    hue: 215, saturation: 16,
    token: "--color/trigger/border",
    icon: <Zap size={16} />,
    defense: "16% de saturação — visualmente morto. Parece estado desativado.",
    issues: ["Hue 215 colide com Logical (209)"],
  },
  {
    label: "Trigger MCP",
    hex: "#64748b",
    hsl: "hsl(215, 16%, 47%)",
    hue: 215, saturation: 16,
    token: "--color/trigger/border",
    icon: <Zap size={16} />,
    defense: "Idêntico ao Trigger padrão. Só o badge MCP os diferencia.",
    issues: ["Sem distinção cromática entre os dois"],
  },
  {
    label: "Tech Component",
    hex: "#ffc200",
    hsl: "hsl(46, 100%, 50%)",
    hue: 46, saturation: 100,
    token: "--color/tech/border",
    icon: <Cpu size={16} />,
    defense: "Contraste 1.5:1 no canvas — abaixo do mínimo WCAG. Ilegível.",
    issues: ["Hue 46 = warning em todo design system do mercado"],
  },
  {
    label: "Logical",
    hex: "#115da3",
    hsl: "hsl(209, 82%, 35%)",
    hue: 209, saturation: 82,
    token: "--color/logical/border",
    icon: <GitBranch size={16} />,
    defense: "Semanticamente correto. Falha em dark mode por ser escuro demais.",
    issues: ["Falha WCAG em dark mode"],
  },
  {
    label: "Business",
    hex: "#c14726",
    hsl: "hsl(13, 67%, 45%)",
    hue: 13, saturation: 67,
    token: "--color/business/border",
    icon: <Briefcase size={16} />,
    defense: "Hue 13 — perto demais da zona de erro (hue 0).",
    issues: ["Risco de ambiguidade com estado de erro"],
  },
  {
    label: "Service",
    hex: "#6e6e6e",
    hsl: "hsl(0, 0%, 43%)",
    hue: 0, saturation: 0,
    token: "--colors-neutral/grey/300",
    icon: <Globe size={16} />,
    defense: "0% saturação — indistinguível de um nó desativado ou vazio.",
    issues: ["Sem identidade cromática própria"],
  },
  {
    label: "Trigger (IsaTool)",
    hex: "#64748b",
    hsl: "hsl(215, 16%, 47%)",
    hue: 215, saturation: 16,
    token: "--color/trigger/tool (aprox.)",
    icon: <Wrench size={16} />,
    dashed: true,
    fillHex: "#f1f5f9",
    defense: "Herda o slate do Trigger pai. Dashed indica 'ferramenta disponível', igual ao IA IsaTool.",
    issues: ["Pai slate tem baixa saturação — difícil distinção do dashed"],
  },
  {
    label: "IA",
    hex: "#7c3aed",
    hsl: "hsl(262, 83%, 58%)",
    hue: 262, saturation: 83,
    token: "--color/ia/shape/default",
    icon: <Bot size={16} />,
    defense: "Violeta — consenso do mercado para IA. Falha em dark mode.",
    issues: ["Luminância relativa baixa — falha 3:1 em dark"],
  },
  {
    label: "IA (IsaTool)",
    hex: "#8b5cf6",
    hsl: "hsl(258, 87%, 65%)",
    hue: 258, saturation: 87,
    token: "sem token proprio",
    icon: <Bot size={16} />,
    dashed: true,
    fillHex: "#ede9fe",
    defense: "Fill lavanda + stroke tracejado. Label sem vínculo com o roxo do nó.",
    issues: ["Token de borda não alinhado ao IA sólido"],
  },
]

const optionA: NodeEntry[] = [
  {
    label: "Trigger",
    hex: "#16a34a",
    hsl: "hsl(142, 73%, 37%)",
    hue: 142, saturation: 73,
    token: "--color/trigger/border",
    icon: <Zap size={16} />,
    defense: "Verde = go/start. Zapier, Make, n8n usam verde para eventos de entrada. Hue 142, único no sistema.",
  },
  {
    label: "Tech Component",
    hex: "#0891b2",
    hsl: "hsl(192, 91%, 36%)",
    hue: 192, saturation: 91,
    token: "--color/tech/border",
    icon: <Cpu size={16} />,
    defense: "Ciano (192) — sai do espectro quente, libera Business. Kubernetes, Terraform, monitoramento usam esse espectro.",
  },
  {
    label: "Logical",
    hex: "#3b82f6",
    hsl: "hsl(217, 91%, 60%)",
    hue: 217, saturation: 91,
    token: "--color/logical/border",
    icon: <GitBranch size={16} />,
    defense: "Azul médio substitui o azul escuro da versão atual. Funciona nos dois modos.",
  },
  {
    label: "Business",
    hex: "#ea580c",
    hsl: "hsl(21, 90%, 48%)",
    hue: 21, saturation: 90,
    token: "--color/business/border",
    icon: <Briefcase size={16} />,
    defense: "Com Tech fora do espectro quente, Business sobe para hue 21 — longe da zona de erro (0), sem colisão.",
  },
  {
    label: "Service",
    hex: "#64748b",
    hsl: "hsl(215, 16%, 47%)",
    hue: 215, saturation: 16,
    token: "--color/service/border",
    icon: <Globe size={16} />,
    defense: "Slate azulado — neutro com identidade própria, separado do cinza puro do atual.",
  },
  {
    label: "IA",
    hex: "#8b5cf6",
    hsl: "hsl(258, 87%, 65%)",
    hue: 258, saturation: 87,
    token: "--color/ia/shape/default",
    icon: <Bot size={16} />,
    defense: "Ajuste de #7c3aed → #8b5cf6. Mesmo sinal visual, viável em dark mode.",
  },
  {
    label: "Trigger (Tool)",
    hex: "#16a34a",
    hsl: "hsl(142, 73%, 37%)",
    hue: 142, saturation: 73,
    token: "--color/trigger/border",
    icon: <Wrench size={16} />,
    dashed: true,
    fillHex: "#dcfce7",
    defense: "Herda o verde do Trigger pai. Fill verde-claro + stroke dashed, igual ao tratamento do IA IsaTool.",
  },
  {
    label: "IA (IsaTool)",
    hex: "#8b5cf6",
    hsl: "hsl(258, 87%, 65%)",
    hue: 258, saturation: 87,
    token: "--color/ia/tool/border",
    icon: <Bot size={16} />,
    dashed: true,
    fillHex: "#ede9fe",
    defense: "Borda alinhada ao IA sólido. Token próprio, coerência entre os dois nós de IA.",
  },
]

const optionB: NodeEntry[] = [
  {
    label: "Trigger",
    hex: "#059669",
    hsl: "hsl(160, 84%, 39%)",
    hue: 160, saturation: 84,
    token: "--color/trigger/border",
    icon: <Zap size={16} />,
    defense: "Esmeralda (160) — 'go/ativo', igual à leitura de mercado. 32° do ciano Tech (192), sem colisão.",
  },
  {
    label: "Tech Component",
    hex: "#0891b2",
    hsl: "hsl(192, 91%, 36%)",
    hue: 192, saturation: 91,
    token: "--color/tech/border",
    icon: <Cpu size={16} />,
    defense: "Ciano (192) — linguagem de infraestrutura. Kubernetes, Terraform, monitoramento usam esse espectro.",
  },
  {
    label: "Logical",
    hex: "#3b82f6",
    hsl: "hsl(217, 91%, 60%)",
    hue: 217, saturation: 91,
    token: "--color/logical/border",
    icon: <GitBranch size={16} />,
    defense: "Azul médio — distinção visual do ciano por temperatura, não apenas por hue.",
  },
  {
    label: "Business",
    hex: "#ea580c",
    hsl: "hsl(21, 90%, 48%)",
    hue: 21, saturation: 90,
    token: "--color/business/border",
    icon: <Briefcase size={16} />,
    defense: "Laranja limpo (21), longe da zona de erro (0). Substitui o atual borderline (13).",
  },
  {
    label: "Service",
    hex: "#c026d3",
    hsl: "hsl(296, 70%, 49%)",
    hue: 296, saturation: 70,
    token: "--color/service/border",
    icon: <Globe size={16} />,
    defense: "Fúcsia (296) — serviço externo ao domínio. 38° do violeta IA (258), 85° do laranja Business. Hue livre.",
  },
  {
    label: "IA",
    hex: "#8b5cf6",
    hsl: "hsl(258, 87%, 65%)",
    hue: 258, saturation: 87,
    token: "--color/ia/shape/default",
    icon: <Bot size={16} />,
    defense: "Violeta — Claude, Copilot, Gemini, Cursor. Consenso do mercado para IA.",
  },
  {
    label: "Trigger (Tool)",
    hex: "#059669",
    hsl: "hsl(160, 84%, 39%)",
    hue: 160, saturation: 84,
    token: "--color/trigger/border",
    icon: <Wrench size={16} />,
    dashed: true,
    fillHex: "#d1fae5",
    defense: "Herda o esmeralda do Trigger pai. Fill verde-claro + stroke dashed, igual ao tratamento do IA IsaTool.",
  },
  {
    label: "IA (IsaTool)",
    hex: "#8b5cf6",
    hsl: "hsl(258, 87%, 65%)",
    hue: 258, saturation: 87,
    token: "--color/ia/tool/border",
    icon: <Bot size={16} />,
    dashed: true,
    fillHex: "#ede9fe",
    defense: "Token próprio, alinhado ao IA sólido. Borda tracejada mantida como linguagem de 'ferramenta disponível'.",
  },
]

const sugestaoEder: NodeEntry[] = [
  {
    label: "Trigger",
    hex: "#16a34a",
    hsl: "hsl(142, 73%, 37%)",
    hue: 142, saturation: 73,
    token: "--color/trigger/border",
    icon: <Zap size={16} />,
    defense: "Verde (142) — go/start. Zapier, Make, n8n usam verde para eventos de entrada. Hue único no sistema.",
  },
  {
    label: "Tech Component",
    hex: "#c5188b",
    hsl: "hsl(320, 78%, 43%)",
    hue: 320, saturation: 78,
    token: "--color/tech/border",
    icon: <Cpu size={16} />,
    defense: "Rosa-quente (320°) — 62° do IA violeta, 61° do Business laranja. Dual-mode: 5.0:1 light, 3.3:1 dark.",
  },
  {
    label: "Logical",
    hex: "#008ac1",
    hsl: "hsl(197, 100%, 38%)",
    hue: 197, saturation: 100,
    token: "--color/logical/border",
    icon: <GitBranch size={16} />,
    defense: "Ciano-azul (197°) — lógica e fluxo. Dual-mode: 3.7:1 light, 4.5:1 dark.",
  },
  {
    label: "Business",
    hex: "#ea580c",
    hsl: "hsl(21, 90%, 48%)",
    hue: 21, saturation: 90,
    token: "--color/business/border",
    icon: <Briefcase size={16} />,
    defense: "Laranja (21) — longe da zona de erro (0). Mantido da Opção A.",
  },
  {
    label: "Service",
    hex: "#64748b",
    hsl: "hsl(215, 16%, 47%)",
    hue: 215, saturation: 16,
    token: "--color/service/border",
    icon: <Globe size={16} />,
    defense: "Cinza slate — serviço externo não pertence a nenhum domínio. Validado dual-mode: 4.2:1 light, 3.9:1 dark.",
  },
  {
    label: "IA",
    hex: "#8b5cf6",
    hsl: "hsl(258, 87%, 65%)",
    hue: 258, saturation: 87,
    token: "--color/ia/shape/default",
    icon: <Bot size={16} />,
    defense: "Violeta — Claude, Copilot, Gemini, Cursor. Consenso do mercado para IA.",
  },
  {
    label: "Trigger (Tool)",
    hex: "#16a34a",
    hsl: "hsl(142, 73%, 37%)",
    hue: 142, saturation: 73,
    token: "--color/trigger/border",
    icon: <Wrench size={16} />,
    dashed: true,
    fillHex: "#dcfce7",
    defense: "Herda o verde do Trigger pai. Fill verde-claro + stroke dashed.",
  },
  {
    label: "IA (IsaTool)",
    hex: "#8b5cf6",
    hsl: "hsl(258, 87%, 65%)",
    hue: 258, saturation: 87,
    token: "--color/ia/tool/border",
    icon: <Bot size={16} />,
    dashed: true,
    fillHex: "#ede9fe",
    defense: "Borda alinhada ao IA sólido. Token próprio.",
  },
]

// ── Hue Wheel ─────────────────────────────────────────────────────────────────

function HueWheel({ nodes }: { nodes: NodeEntry[] }) {
  const cx = 72; const cy = 72; const r = 54
  const unique = nodes.filter((n) => n.saturation > 0)
  return (
    <svg width={144} height={144} viewBox="0 0 144 144">
      {Array.from({ length: 360 }, (_, deg) => {
        const a1 = (deg - 90) * (Math.PI / 180)
        const a2 = (deg + 1 - 90) * (Math.PI / 180)
        return (
          <line key={deg}
            x1={cx + r * Math.cos(a1)} y1={cy + r * Math.sin(a1)}
            x2={cx + r * Math.cos(a2)} y2={cy + r * Math.sin(a2)}
            stroke={`hsl(${deg},65%,55%)`} strokeWidth={12} opacity={0.2}
          />
        )
      })}
      {unique.map((n) => {
        const a = (n.hue - 90) * (Math.PI / 180)
        const dx = cx + r * Math.cos(a)
        const dy = cy + r * Math.sin(a)
        return (
          <g key={n.label}>
            <circle cx={dx} cy={dy} r={7} fill={n.hex} stroke="#fff" strokeWidth={1.5} />
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r={28} fill="#1a1a1a" />
      <text x={cx} y={cy + 4} textAnchor="middle" fill="#ffffff22" fontSize={8} fontFamily="monospace">hue</text>
    </svg>
  )
}

// ── Node swatch ───────────────────────────────────────────────────────────────

function NodeSwatch({ node, showDefense }: { node: NodeEntry; showDefense: boolean }) {
  const lightR = ratio(node.hex, LIGHT_BG)
  const darkR  = ratio(node.hex, DARK_BG)
  const lightOk = lightR >= 3
  const darkOk  = darkR >= 3
  const dual    = lightOk && darkOk

  return (
    <div className="rounded-lg border border-white/8 bg-[#2a2a2a] overflow-hidden">
      {/* preview: light + dark */}
      <div className="grid grid-cols-2 h-16">
        {[LIGHT_BG, DARK_BG].map((bg) => (
          <div key={bg} className="flex items-center justify-center" style={{ background: bg }}>
            {node.dashed ? (
              // tracejado: fill suave + stroke dashed roxo
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: 38, height: 38,
                  background: node.fillHex ?? `${node.hex}22`,
                  border: `2px dashed ${node.hex}cc`,
                  color: node.hex,
                }}
              >
                {node.icon}
              </div>
            ) : node.saturation > 0 ? (
              <div
                className="rounded-full flex items-center justify-center shadow-md"
                style={{
                  width: 38, height: 38,
                  background: `radial-gradient(circle at 38% 33%, ${node.hex}dd, ${node.hex}88)`,
                  border: `1.5px solid ${node.hex}66`,
                  color: "#ffffffdd",
                }}
              >
                {node.icon}
              </div>
            ) : (
              <div
                className="rounded-full flex items-center justify-center shadow-sm"
                style={{
                  width: 38, height: 38,
                  background: bg === LIGHT_BG ? "#e5e7eb" : "#333",
                  border: `1.5px solid ${bg === LIGHT_BG ? "#d1d5db" : "#444"}`,
                  color: bg === LIGHT_BG ? "#6b7280" : "#888",
                }}
              >
                {node.icon}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* info */}
      <div className="px-3 pt-2.5 pb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[12px] font-semibold text-white/90 truncate">{node.label}</span>
          {node.dashed ? (
            <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded ml-1 bg-white/8 text-white/30">
              dashed
            </span>
          ) : node.saturation > 0 && (
            <span className={`shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded ml-1 ${dual ? "bg-emerald-500/15 text-emerald-400" : "bg-orange-500/15 text-orange-400"}`}>
              {dual ? "dual ok" : "light only"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-3 h-3 rounded-sm border border-white/10 shrink-0" style={{ background: node.hex }} />
          <code className="text-[10px] text-white/35 font-mono">{node.hex}</code>
        </div>

        {/* contrast */}
        {node.saturation > 0 && (
          <div className="flex flex-col gap-1 mb-2">
            {node.dashed && (
              <p className="text-[9px] text-white/25 mb-0.5">borda tracejada:</p>
            )}
            <div className="flex gap-3">
              <div className={`flex items-center gap-1 text-[10px] ${lightOk ? "text-emerald-400/80" : "text-red-400/80"}`}>
                {lightOk ? <CheckCircle2 size={9} /> : <XCircle size={9} />}
                <span>light {lightR.toFixed(1)}:1</span>
              </div>
              <div className={`flex items-center gap-1 text-[10px] ${darkOk ? "text-emerald-400/80" : "text-red-400/80"}`}>
                {darkOk ? <CheckCircle2 size={9} /> : <XCircle size={9} />}
                <span>dark {darkR.toFixed(1)}:1</span>
              </div>
            </div>
          </div>
        )}

        {/* issues */}
        {node.issues?.map((issue, i) => (
          <div key={i} className="flex items-start gap-1 text-[10px] text-orange-300/60 mb-0.5">
            <AlertTriangle size={9} className="shrink-0 mt-0.5 text-orange-400/50" />
            {issue}
          </div>
        ))}
      </div>

      {/* defense */}
      {showDefense && (
        <div className="px-3 pb-3 border-t border-white/6 pt-2">
          <p className="text-[11px] text-white/40 leading-relaxed">{node.defense}</p>
        </div>
      )}
    </div>
  )
}

// ── Palette panel ─────────────────────────────────────────────────────────────

function PalettePanel({
  title, subtitle, badge, badgeColor, nodes, showDefense,
}: {
  title: string; subtitle: string
  badge?: string; badgeColor?: string
  nodes: NodeEntry[]
  showDefense: boolean
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#242424] overflow-hidden">
      {/* header */}
      <div className="px-5 pt-5 pb-4 border-b border-white/8 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h2 className="text-[14px] font-bold text-white">{title}</h2>
            {badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: `${badgeColor}20`, color: badgeColor, border: `1px solid ${badgeColor}40` }}>
                {badge}
              </span>
            )}
          </div>
          <p className="text-[12px] text-white/35">{subtitle}</p>
          <div className="flex gap-4 mt-2 text-[10px] text-white/20">
            <span>esq: canvas <code className="font-mono">{LIGHT_BG}</code></span>
            <span>dir: dark <code className="font-mono">{DARK_BG}</code></span>
          </div>
        </div>
        <HueWheel nodes={nodes} />
      </div>

      {/* swatches */}
      <div className="p-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {nodes.map((n) => (
          <NodeSwatch key={n.label} node={n} showDefense={true} />
        ))}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EstudoCoresPage() {
  const [view, setView] = useState<"all" | "a" | "b" | "eder">("all")

  return (
    <div className="min-h-screen bg-[#1a1a1a] px-8 py-12">
      <div className="max-w-[1400px] mx-auto">

        {/* header */}
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-widest text-purple-400/60 mb-1">
            Lab / Estudo de cores
          </p>
          <h1 className="text-[22px] font-bold text-white mb-2">Canvas Nodes — Identidade de Cor</h1>
          <p className="text-[13px] text-white/40 max-w-2xl leading-relaxed">
            Cada tipo de nó precisa de uma cor com defesa — que comunique o que ele faz e que funcione nos dois modos. A paleta atual não tem isso.
          </p>
        </div>

        {/* o problema real */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              label: "Sem identidade",
              desc: "Trigger, Service e Tech Component são visualmente intercambiáveis. Nenhum comunica o que faz pela cor.",
              color: "orange",
            },
            {
              label: "Sem defesa semântica",
              desc: "As cores atuais foram escolhidas sem critério declarado. Não há resposta para 'por que essa cor nesse nó'.",
              color: "orange",
            },
            {
              label: "Sem dark mode",
              desc: "Nenhuma cor da paleta atual foi validada para dark mode. Logical e IA já falham no fundo escuro.",
              color: "orange",
            },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-orange-500/15 bg-orange-500/5 px-4 py-4 flex gap-2.5 items-start">
              <AlertTriangle size={13} className="shrink-0 mt-0.5 text-orange-400/50" />
              <div>
                <p className="text-[12px] font-semibold text-white/70 mb-1">{item.label}</p>
                <p className="text-[11px] text-white/35 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* o objetivo */}
        <div className="mb-8 rounded-xl border border-purple-500/20 bg-purple-500/5 px-5 py-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-purple-400/50 mb-2">Objetivo deste estudo</p>
          <p className="text-[13px] text-white/50 leading-relaxed max-w-2xl">
            Propor uma paleta onde cada nó tem uma cor com defesa semântica — uma razão para ser aquela cor, não outra — e que funcione tanto no canvas claro <code className="font-mono text-white/30">{LIGHT_BG}</code> quanto em dark mode <code className="font-mono text-white/30">{DARK_BG}</code>. Duas abordagens: <strong className="text-white/60">Opção A</strong> (ajuste cirúrgico, menor impacto) e <strong className="text-white/60">Opção B</strong> (redistribuição completa, máxima distinção).
          </p>
        </div>

        {/* controls */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex gap-1 bg-white/5 rounded-lg p-1">
            {(["all", "a", "b", "eder"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${
                  view === v ? "bg-white/10 text-white" : "text-white/30 hover:text-white/55"
                }`}>
                {v === "all" ? "Comparar todas" : v === "a" ? "Opcao A" : v === "b" ? "Opcao B" : "Sugestão Eder"}
              </button>
            ))}
          </div>
        </div>

        {/* panels */}
        <div className="grid grid-cols-1 gap-8">
          {view === "all" && (
            <PalettePanel
              title="Paleta atual" subtitle="Diagnostico — cores em producao"
              badge="atual" badgeColor="#6e6e6e"
              nodes={current} showDefense={true}
            />
          )}
          {(view === "all" || view === "a") && (
            <PalettePanel
              title="Opcao A — Híbrida" subtitle="Ajuste cirúrgico + Tech migra para ciano"
              badge="híbrida" badgeColor="#22c55e"
              nodes={optionA} showDefense={true}
            />
          )}
          {(view === "all" || view === "b") && (
            <PalettePanel
              title="Opcao B — Redistribuicao" subtitle="Maxima distincao, dual-mode nativo"
              badge="recomendada" badgeColor="#a78bfa"
              nodes={optionB} showDefense={true}
            />
          )}
          {(view === "all" || view === "eder") && (
            <PalettePanel
              title="Sugestão Eder" subtitle="Trigger verde, Tech magenta, Logical azul — máxima distinção"
              badge="sugestão" badgeColor="#f59e0b"
              nodes={sugestaoEder} showDefense={true}
            />
          )}
        </div>

        {/* ── Label treatment proposal ─────────────────────────────────── */}
        <div className="mt-10 rounded-xl border border-white/10 bg-[#242424] overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-white/8">
            <h2 className="text-[15px] font-bold text-white mb-1">Proposta: tratamento da label</h2>
            <p className="text-[12px] text-white/40">
              Atualmente as labels acompanham a cor do no (ex: label amarela no Tech, azul no Logical).
              Tres abordagens possiveis — cada uma com trade-offs de legibilidade e ruido visual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/8">

            {/* Opcao 1 — Colorida (atual) */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white/8 text-white/40">Atual</span>
                <h3 className="text-[13px] font-semibold text-white">Label colorida</h3>
              </div>

              {/* preview */}
              <div className="flex gap-4 mb-5 px-2 py-5 rounded-lg" style={{ background: LIGHT_BG }}>
                {[
                  { hex: "#ffc200", label: "TECH" },
                  { hex: "#115da3", label: "LOGIC" },
                  { hex: "#7c3aed", label: "IA" },
                ].map((n) => (
                  <div key={n.label} className="flex flex-col items-center gap-1.5">
                    <div className="rounded-full flex items-center justify-center"
                      style={{ width: 36, height: 36, background: `radial-gradient(circle at 38% 33%, ${n.hex}dd, ${n.hex}88)`, border: `1.5px solid ${n.hex}55` }}>
                      <Zap size={14} color="#fff" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: n.hex }}>{n.label}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex gap-1.5 text-red-400/70"><XCircle size={11} className="shrink-0 mt-0.5" /><span>Amarelo (#ffc200) tem 1.5:1 no canvas — ilegivel</span></div>
                <div className="flex gap-1.5 text-red-400/70"><XCircle size={11} className="shrink-0 mt-0.5" /><span>Canvas denso vira caos cromatico — cada no grita sua cor no texto tambem</span></div>
                <div className="flex gap-1.5 text-red-400/70"><XCircle size={11} className="shrink-0 mt-0.5" /><span>Cada cor precisa de validacao WCAG individual no texto (4.5:1 AA)</span></div>
                <div className="flex gap-1.5 text-emerald-400/70"><CheckCircle2 size={11} className="shrink-0 mt-0.5" /><span>Reforco de categoria — usuario ve cor no circulo e na label</span></div>
              </div>
            </div>

            {/* Opcao 2 — Grey neutro */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Recomendada</span>
                <h3 className="text-[13px] font-semibold text-white">Label neutra</h3>
              </div>

              <div className="flex gap-4 mb-5 px-2 py-5 rounded-lg" style={{ background: LIGHT_BG }}>
                {[
                  { hex: "#ffc200", label: "TECH" },
                  { hex: "#115da3", label: "LOGIC" },
                  { hex: "#7c3aed", label: "IA" },
                ].map((n) => (
                  <div key={n.label} className="flex flex-col items-center gap-1.5">
                    <div className="rounded-full flex items-center justify-center"
                      style={{ width: 36, height: 36, background: `radial-gradient(circle at 38% 33%, ${n.hex}dd, ${n.hex}88)`, border: `1.5px solid ${n.hex}55` }}>
                      <Zap size={14} color="#fff" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#374151" }}>{n.label}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex gap-1.5 text-emerald-400/70"><CheckCircle2 size={11} className="shrink-0 mt-0.5" /><span>#374151 tem 9.7:1 no canvas — WCAG AAA sem esforco</span></div>
                <div className="flex gap-1.5 text-emerald-400/70"><CheckCircle2 size={11} className="shrink-0 mt-0.5" /><span>Canvas denso fica legivel — circulo carrega a cor, label carrega o nome</span></div>
                <div className="flex gap-1.5 text-emerald-400/70"><CheckCircle2 size={11} className="shrink-0 mt-0.5" /><span>Padrao do mercado: Zapier, Make, n8n, Miro usam label neutra</span></div>
                <div className="flex gap-1.5 text-emerald-400/70"><CheckCircle2 size={11} className="shrink-0 mt-0.5" /><span>Um unico token de cor de texto para todos os nos</span></div>
                <div className="flex gap-1.5 text-white/30"><XCircle size={11} className="shrink-0 mt-0.5" /><span>Perde o reforco cromatico da categoria no texto</span></div>
              </div>
            </div>

            {/* Opcao 3 — Tintada */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white/8 text-white/40">Alternativa</span>
                <h3 className="text-[13px] font-semibold text-white">Label tintada</h3>
              </div>

              <div className="flex gap-4 mb-5 px-2 py-5 rounded-lg" style={{ background: LIGHT_BG }}>
                {[
                  { hex: "#ffc200", tint: "#92660a", label: "TECH" },
                  { hex: "#115da3", tint: "#1e4a8a", label: "LOGIC" },
                  { hex: "#7c3aed", tint: "#5b21b6", label: "IA" },
                ].map((n) => (
                  <div key={n.label} className="flex flex-col items-center gap-1.5">
                    <div className="rounded-full flex items-center justify-center"
                      style={{ width: 36, height: 36, background: `radial-gradient(circle at 38% 33%, ${n.hex}dd, ${n.hex}88)`, border: `1.5px solid ${n.hex}55` }}>
                      <Zap size={14} color="#fff" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: n.tint }}>{n.label}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex gap-1.5 text-emerald-400/70"><CheckCircle2 size={11} className="shrink-0 mt-0.5" /><span>Mantem vinculo cromatico com o circulo sem usar a mesma cor</span></div>
                <div className="flex gap-1.5 text-emerald-400/70"><CheckCircle2 size={11} className="shrink-0 mt-0.5" /><span>Tom escurecido garante contraste 4.5:1+ no canvas claro</span></div>
                <div className="flex gap-1.5 text-red-400/70"><XCircle size={11} className="shrink-0 mt-0.5" /><span>Requer token de texto por categoria — mais complexidade</span></div>
                <div className="flex gap-1.5 text-red-400/70"><XCircle size={11} className="shrink-0 mt-0.5" /><span>Cada tom escurecido precisa ser validado individualmente</span></div>
                <div className="flex gap-1.5 text-red-400/70"><XCircle size={11} className="shrink-0 mt-0.5" /><span>Em dark mode exige recalibragem completa</span></div>
              </div>
            </div>

          </div>

          {/* verdict */}
          <div className="px-6 py-4 border-t border-white/8 bg-purple-500/5">
            <p className="text-[12px] text-white/60 leading-relaxed">
              <strong className="text-white/80">Recomendacao:</strong>{" "}
              Label neutra em <code className="font-mono text-white/50">#374151</code> (gray-700).
              O circulo ja comunica a categoria — a label comunica o nome da instancia.
              Hierarquia visual clara: cor no no, texto no label. Menos tokens, mais consistencia, zero problema de contraste.
              Se quiser manter vinculo cromatico, usar a opcao tintada apenas para o tipo de label abreviado (ex: &quot;TECH&quot;, &quot;IA&quot;) e neutro para o nome da instancia.
            </p>
          </div>
        </div>

        {/* footnote */}
        <div className="mt-8 pt-6 border-t border-white/6 text-[11px] text-white/20 space-y-1">
          <p>Contraste calculado pela formula WCAG 2.1 (luminancia relativa). Threshold: 3:1 (AA para componentes de UI).</p>
          <p>Canvas light: <code className="font-mono">{LIGHT_BG}</code> (canvas.tsx:138). Dark projetado: <code className="font-mono">{DARK_BG}</code>.</p>
          <p>badge &quot;dual ok&quot; = aprovado 3:1 nos dois fundos. &quot;light only&quot; = aprovado apenas no canvas atual.</p>
        </div>
      </div>
    </div>
  )
}
