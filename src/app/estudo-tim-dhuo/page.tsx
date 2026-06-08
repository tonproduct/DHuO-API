"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"

const sections = [
  { id: "cenario", label: "O cenário" },
  { id: "descobrimos", label: "O que descobrimos" },
  { id: "produzido", label: "O que foi produzido" },
  { id: "proximos", label: "Próximos passos" },
]

export default function EstudoTimDhuoPage() {
  const [collapsed, setCollapsed] = useState(false)
  const [active, setActive] = useState("cenario")

  function scrollTo(id: string) {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-white flex" style={{ fontFamily: "Noto Sans, sans-serif" }}>

      {/* Sidebar */}
      <div className={`shrink-0 border-r border-gray-200 flex flex-col transition-all duration-200 ${collapsed ? "w-12" : "w-52"}`}>
        <div className="flex items-center justify-between px-3 py-4 border-b border-gray-100">
          {!collapsed && <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">Estudo</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1 rounded-md text-gray-400 hover:bg-gray-100 transition-colors"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>
        {!collapsed && (
          <nav className="flex flex-col gap-0.5 px-2 py-3">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`text-left px-3 py-2 rounded-lg text-[13px] transition-colors ${
                  active === s.id
                    ? "font-semibold text-purple-700 bg-purple-50"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        )}
        {collapsed && (
          <nav className="flex flex-col gap-1 px-1.5 py-3">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                title={s.label}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold transition-colors ${
                  active === s.id ? "bg-purple-100 text-purple-700" : "text-gray-400 hover:bg-gray-100"
                }`}
              >
                {s.label[2]}
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-10 py-14 flex flex-col gap-12">

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">DHuO · Dev Portal</span>
            <h1 className="text-[26px] font-bold text-gray-900 mt-2">Resumo da conversa</h1>
          </div>

          {/* O cenário */}
          <section id="cenario" className="flex flex-col gap-3">
            <H2>O cenário</H2>
            <Card>
              <P>A TIM usa o Redmine (que eles chamam de TIM Mine) para gestão de documentação de APIs. Com a migração para o DHuO Dev Portal, perceberam que perderam funcionalidades que usavam no dia a dia.</P>
            </Card>
          </section>

          <Divider />

          {/* O que descobrimos */}
          <section id="descobrimos" className="flex flex-col gap-4">
            <H2>O que descobrimos</H2>

            <Card>
              <H3>Quem faz o quê</H3>
              <Ul items={[
                "A Eng da TIM publica, edita e mantém as docs — no Redmine e precisaria fazer o mesmo no DHuO",
                "A TIM Tim (consumidores / CCC) só lê — igual ao Dev Portal hoje",
                "O modelo de acesso não muda — o problema é outro",
              ]} />
            </Card>

            <Card>
              <H3>Os 3 gaps reais entre Redmine e DHuO</H3>
              <Ul items={[
                "Versionamento — a TIM usa 4 dígitos (Major.Minor.Doc.Fix), o Manager não suporta esse controle hoje",
                "Histórico — no Redmine dá pra comparar duas versões de uma mesma doc (diff). O DHuO não tem isso",
                "Navegação — no Redmine as docs ficam numa wiki com árvore de pastas. O Dev Portal exibe uma doc por versão, sem hierarquia",
              ]} />
            </Card>

          </section>

          <Divider />

          {/* O que foi produzido */}
          <section id="produzido" className="flex flex-col gap-4">
            <H2>O que foi produzido</H2>
            <Card>
              <Ul items={[
                "Bench de concorrentes → /bench-dev-portals — nenhum Dev Portal do mercado tem wiki com histórico editorial. Embasamento para a defesa ao cliente",
                "Protótipo → /dev-portal-tree — mostra como seria o Dev Portal com árvore lateral (Solução 1) e como seria o Manager com os 4 dígitos e seletor de pasta (Solução 2)",
              ]} />
            </Card>
          </section>

          <Divider />

          {/* Próximos passos */}
          <section id="proximos" className="flex flex-col gap-4">
            <H2>Próximos passos pendentes</H2>
            <Card>
              <Ul items={[
                "Sessão com o Jere — mapear o processo completo da Eng da TIM no Redmine",
                "Decisão interna — perfis de usuário no Manager precisam sair do backlog para viabilizar o acesso da Eng da TIM",
                "Defesa ao cliente — com o bench + protótipo + mapeamento do Jere, montar a resposta para o Lupareri",
              ]} />
            </Card>
          </section>

        </div>
      </div>
    </div>
  )
}

// ─── Components ───────────────────────────────────────────────────────────────

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 px-6 py-5 flex flex-col gap-3">
      {children}
    </div>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[18px] font-bold text-gray-900">{children}</h2>
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[14px] font-semibold text-gray-700">{children}</h3>
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[14px] text-gray-500 leading-relaxed">{children}</p>
}

function Divider() {
  return <div className="border-t border-gray-100" />
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#7c22c0" }} />
          <span className="text-[14px] text-gray-500 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}
