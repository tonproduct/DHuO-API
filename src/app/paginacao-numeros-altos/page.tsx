"use client"

import { useMemo, useState, type FormEvent } from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

const sections = [
  { id: "cenario", label: "O cenário" },
  { id: "problema", label: "Por que dói" },
  { id: "mercado", label: "Padrões de mercado" },
  { id: "proposta", label: "Proposta pro DHuO" },
  { id: "bench", label: "Benchmark real" },
  { id: "prototipo", label: "Soluções propostas" },
]

function formatBR(n: number) {
  return n.toLocaleString("pt-BR")
}

// ─── Paginação truncada (proposta) ──────────────────────────────────────────

function TruncatedPagination({
  page,
  totalPages,
  onChange,
}: {
  page: number
  totalPages: number
  onChange: (p: number) => void
}) {
  const [jumpValue, setJumpValue] = useState("")

  const pages = useMemo(() => {
    const delta = 1
    const range: (number | "…")[] = []
    const left = Math.max(2, page - delta)
    const right = Math.min(totalPages - 1, page + delta)

    range.push(1)
    if (left > 2) range.push("…")
    for (let i = left; i <= right; i++) range.push(i)
    if (right < totalPages - 1) range.push("…")
    if (totalPages > 1) range.push(totalPages)

    return range
  }, [page, totalPages])

  function submitJump(e: FormEvent) {
    e.preventDefault()
    const n = parseInt(jumpValue, 10)
    if (!Number.isNaN(n) && n >= 1 && n <= totalPages) {
      onChange(n)
      setJumpValue("")
    }
  }

  return (
    <div className="pg">
      <button className="pg-btn" disabled={page === 1} onClick={() => onChange(1)} aria-label="Primeira página">
        <ChevronsLeft size={14} />
      </button>
      <button className="pg-btn" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Página anterior">
        <ChevronLeft size={14} />
      </button>

      <div className="pg-numbers">
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="pg-ellipsis">…</span>
          ) : (
            <button
              key={p}
              className={`pg-number ${p === page ? "pg-number--current" : ""}`}
              onClick={() => onChange(p)}
              aria-current={p === page}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button className="pg-btn" disabled={page === totalPages} onClick={() => onChange(page + 1)} aria-label="Próxima página">
        <ChevronRight size={14} />
      </button>
      <button className="pg-btn" disabled={page === totalPages} onClick={() => onChange(totalPages)} aria-label="Última página">
        <ChevronsRight size={14} />
      </button>

      <form className="pg-jump" onSubmit={submitJump}>
        <span>Ir para</span>
        <input
          type="text"
          inputMode="numeric"
          value={jumpValue}
          onChange={(e) => setJumpValue(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder={String(page)}
        />
        <span>de {formatBR(totalPages)}</span>
      </form>

      <style jsx>{`
        .pg {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .pg-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          background: #ffffff;
          color: #374151;
          cursor: pointer;
        }

        .pg-btn:hover:not(:disabled) {
          background: #f4f4f5;
          border-color: #9ca3af;
        }

        .pg-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .pg-numbers {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-inline: 4px;
        }

        .pg-number {
          min-width: 28px;
          height: 28px;
          padding-inline: 4px;
          border-radius: 6px;
          border: 1px solid transparent;
          background: none;
          font-size: 13px;
          color: #374151;
          cursor: pointer;
        }

        .pg-number:hover {
          background: #f4f4f5;
        }

        .pg-number--current {
          background: #7c3aed;
          color: #ffffff;
          font-weight: 700;
        }

        .pg-number--current:hover {
          background: #7c3aed;
        }

        .pg-ellipsis {
          width: 20px;
          text-align: center;
          color: #9ca3af;
          font-size: 13px;
        }

        .pg-jump {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-left: 12px;
          padding-left: 12px;
          border-left: 1px solid #e5e7eb;
          font-size: 12px;
          color: #6b7280;
          white-space: nowrap;
        }

        .pg-jump input {
          width: 52px;
          height: 26px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          text-align: center;
          font-size: 12px;
          color: #111827;
        }

        .pg-jump input:focus {
          outline: none;
          border-color: #7c3aed;
        }
      `}</style>
    </div>
  )
}

// ─── Cursor pagination (alternativa) ────────────────────────────────────────

function CursorPagination({
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: {
  hasPrev: boolean
  hasNext: boolean
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div className="cp">
      <button className="cp-btn" disabled={!hasPrev} onClick={onPrev}>
        <ChevronLeft size={14} /> Anterior
      </button>
      <button className="cp-btn" disabled={!hasNext} onClick={onNext}>
        Próxima <ChevronRight size={14} />
      </button>

      <style jsx>{`
        .cp {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cp-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          height: 30px;
          padding-inline: 12px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          background: #ffffff;
          color: #374151;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .cp-btn:hover:not(:disabled) {
          background: #f4f4f5;
          border-color: #9ca3af;
        }

        .cp-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
}

// ─── Seletor de página (estilo Carbon) ──────────────────────────────────────

function PageSelectPagination({
  page,
  totalPages,
  onChange,
}: {
  page: number
  totalPages: number
  onChange: (p: number) => void
}) {
  return (
    <div className="ps">
      <button className="ps-arrow" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Página anterior">
        <ChevronLeft size={14} />
      </button>

      <span className="ps-label">Página</span>
      <select
        className="ps-select"
        value={page}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <span className="ps-label">de {formatBR(totalPages)}</span>

      <button className="ps-arrow" disabled={page === totalPages} onClick={() => onChange(page + 1)} aria-label="Próxima página">
        <ChevronRight size={14} />
      </button>

      <style jsx>{`
        .ps {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ps-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          background: #ffffff;
          color: #374151;
          cursor: pointer;
        }

        .ps-arrow:hover:not(:disabled) {
          background: #f4f4f5;
          border-color: #9ca3af;
        }

        .ps-arrow:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .ps-label {
          font-size: 13px;
          color: #6b7280;
          white-space: nowrap;
        }

        .ps-select {
          height: 28px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding-inline: 6px;
          font-size: 13px;
          font-weight: 700;
          color: #111827;
          background: #ffffff;
          cursor: pointer;
        }

        .ps-select:focus {
          outline: none;
          border-color: #7c3aed;
        }
      `}</style>
    </div>
  )
}

// ─── Antigo padrão (o que existe hoje) ─────────────────────────────────────

function LegacyCrampedPagination({ pages, current }: { pages: number[]; current: number }) {
  return (
    <div className="lg">
      <span className="lg-arrow">«</span>
      <span className="lg-arrow">‹</span>
      <div className="lg-numbers">
        {pages.map((p) => (
          <span key={p} className={`lg-number ${p === current ? "lg-number--current" : ""}`}>
            {p}
          </span>
        ))}
      </div>
      <span className="lg-arrow">›</span>
      <span className="lg-arrow">»</span>

      <style jsx>{`
        .lg {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .lg-arrow {
          font-size: 13px;
          color: #6b7280;
          padding-inline: 2px;
        }

        .lg-numbers {
          display: flex;
          align-items: center;
          position: relative;
        }

        .lg-number {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          white-space: nowrap;
          position: relative;
        }

        .lg-number--current {
          color: #ffffff;
          z-index: 1;
        }

        .lg-number--current::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 30px;
          height: 30px;
          border-radius: 999px;
          background: #6b1d5c;
          transform: translate(-50%, -50%);
          z-index: -1;
        }
      `}</style>
    </div>
  )
}

// ─── Correção mínima do padrão atual (espaçamento, sem redesenho) ──────────

function FixedSpacingPagination({ pages, current }: { pages: number[]; current: number }) {
  return (
    <div className="fx">
      <button className="fx-arrow">«</button>
      <button className="fx-arrow">‹</button>
      <div className="fx-numbers">
        {pages.map((p) => (
          <button key={p} className={`fx-number ${p === current ? "fx-number--current" : ""}`}>
            {p}
          </button>
        ))}
      </div>
      <button className="fx-arrow">›</button>
      <button className="fx-arrow">»</button>

      <style jsx>{`
        .fx {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .fx-arrow {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: none;
          font-size: 13px;
          color: #6b7280;
          border-radius: 999px;
          cursor: pointer;
        }

        .fx-arrow:hover {
          background: #f4f4f5;
        }

        .fx-numbers {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .fx-number {
          min-width: 28px;
          height: 28px;
          padding-inline: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: none;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          color: #111827;
          font-variant-numeric: tabular-nums;
          cursor: pointer;
        }

        .fx-number:hover {
          background: #f4f4f5;
        }

        .fx-number--current {
          background: #6b1d5c;
          color: #ffffff;
        }
      `}</style>
    </div>
  )
}

// ─── Mockups visuais de cada fonte do benchmark ────────────────────────────

function MuiMock() {
  return (
    <div className="mui">
      {["«", "‹", "1", "…", "4", "5", "6", "…", "20", "›", "»"].map((label, i) => (
        <span key={i} className={`mui-btn ${label === "5" ? "mui-btn--active" : ""} ${label === "…" ? "mui-ellipsis" : ""}`}>
          {label}
        </span>
      ))}
      <style jsx>{`
        .mui {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .mui-btn {
          min-width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          font-size: 12px;
          color: #1976d2;
        }
        .mui-btn--active {
          background: rgba(25, 118, 210, 0.12);
          font-weight: 700;
        }
        .mui-ellipsis {
          color: #9ca3af;
        }
      `}</style>
    </div>
  )
}

function AntdMock() {
  return (
    <div className="antd">
      <span className="antd-arrow">‹</span>
      {["1", "2", "3", "4", "5", "…", "20"].map((label, i) => (
        <span key={i} className={`antd-btn ${label === "3" ? "antd-btn--active" : ""} ${label === "…" ? "antd-ellipsis" : ""}`}>
          {label}
        </span>
      ))}
      <span className="antd-arrow">›</span>
      <select className="antd-size" defaultValue="10">
        <option>10 / página</option>
      </select>
      <div className="antd-jump">
        <span>Vá para</span>
        <input defaultValue="" placeholder="3" />
        <span>página</span>
      </div>
      <style jsx>{`
        .antd {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .antd-arrow {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #d9d9d9;
          border-radius: 4px;
          color: #595959;
          font-size: 12px;
        }
        .antd-btn {
          min-width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #d9d9d9;
          border-radius: 4px;
          font-size: 12px;
          color: #262626;
        }
        .antd-btn--active {
          border-color: #1677ff;
          color: #1677ff;
        }
        .antd-ellipsis {
          border-color: transparent;
          color: #9ca3af;
        }
        .antd-size {
          height: 26px;
          border: 1px solid #d9d9d9;
          border-radius: 4px;
          font-size: 12px;
          color: #262626;
          margin-left: 6px;
        }
        .antd-jump {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #595959;
          margin-left: 6px;
        }
        .antd-jump input {
          width: 32px;
          height: 26px;
          border: 1px solid #d9d9d9;
          border-radius: 4px;
          text-align: center;
          font-size: 12px;
        }
      `}</style>
    </div>
  )
}

function CarbonMock() {
  return (
    <div className="carbon">
      <span className="carbon-label">1–10 de 500 itens</span>
      <span className="carbon-sep" />
      <span className="carbon-label">Itens por página:</span>
      <select className="carbon-select" defaultValue="10">
        <option>10</option>
      </select>
      <span className="carbon-sep" />
      <button className="carbon-arrow">‹</button>
      <span className="carbon-label">Página</span>
      <select className="carbon-select" defaultValue="1">
        <option>1</option>
      </select>
      <span className="carbon-label">de 50</span>
      <button className="carbon-arrow">›</button>
      <style jsx>{`
        .carbon {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          font-family: "IBM Plex Sans", sans-serif;
        }
        .carbon-label {
          font-size: 12px;
          color: #161616;
        }
        .carbon-sep {
          width: 1px;
          height: 20px;
          background: #e0e0e0;
        }
        .carbon-select {
          height: 26px;
          border: none;
          border-bottom: 1px solid #161616;
          background: #f4f4f4;
          font-size: 12px;
          border-radius: 0;
          padding-inline: 4px;
        }
        .carbon-arrow {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: #f4f4f4;
          color: #161616;
          border-radius: 0;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

function GithubMock() {
  return (
    <div className="gh">
      <button className="gh-btn" disabled>‹ Previous</button>
      <span className="gh-page">1</span>
      <button className="gh-btn">Next ›</button>
      <style jsx>{`
        .gh {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .gh-btn {
          height: 28px;
          padding-inline: 12px;
          border: 1px solid #d0d7de;
          border-radius: 6px;
          background: #f6f8fa;
          color: #24292f;
          font-size: 12px;
          font-weight: 600;
        }
        .gh-btn:disabled {
          opacity: 0.5;
        }
        .gh-page {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: #24292f;
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
        }
      `}</style>
    </div>
  )
}

function AwsMock() {
  return (
    <div className="aws">
      <button className="aws-btn" disabled>‹ Anterior</button>
      <button className="aws-btn">Próximo ›</button>
      <span className="aws-token">NextToken: eyJrZXk1… <span className="aws-ttl">expira em 24h</span></span>
      <style jsx>{`
        .aws {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .aws-btn {
          height: 28px;
          padding-inline: 12px;
          border: 1px solid #879596;
          border-radius: 4px;
          background: #ffffff;
          color: #16191f;
          font-size: 12px;
          font-weight: 600;
        }
        .aws-btn:disabled {
          opacity: 0.4;
        }
        .aws-token {
          font-size: 11px;
          font-family: monospace;
          color: #6b7280;
          background: #f4f4f5;
          border-radius: 4px;
          padding: 4px 8px;
        }
        .aws-ttl {
          color: #ec7211;
          font-weight: 700;
        }
      `}</style>
    </div>
  )
}

export default function PaginacaoNumerosAltosPage() {
  const [collapsed, setCollapsed] = useState(false)
  const [active, setActive] = useState("cenario")

  const totalItems = 48231
  const pageSize = 20
  const totalPages = Math.ceil(totalItems / pageSize)
  const [page, setPage] = useState(111)
  const rangeStart = (page - 1) * pageSize + 1
  const rangeEnd = Math.min(page * pageSize, totalItems)

  const [cursorIndex, setCursorIndex] = useState(5)

  function scrollTo(id: string) {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-white flex" style={{ fontFamily: "Noto Sans, sans-serif" }}>
      {/* Sidebar */}
      <div className={`shrink-0 border-r border-gray-200 flex flex-col transition-all duration-200 ${collapsed ? "w-12" : "w-56"}`}>
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
                  active === s.id ? "font-semibold text-purple-700 bg-purple-50" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-10 py-14 flex flex-col gap-14">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">DHuO · Geral</span>
            <h1 className="text-[26px] font-bold text-gray-900 mt-2">Paginação para números altos</h1>
            <p className="text-[14px] text-gray-500 mt-2 max-w-2xl">
              Estudo de padrão de paginação para listas de migração de APIs e integrações, onde o volume de itens pode chegar a
              dezenas de milhares — cenário em que a paginação numerada atual não trunca nem espaça os números, e eles colam
              uns nos outros conforme o valor cresce.
            </p>
          </div>

          {/* O cenário */}
          <section id="cenario" className="flex flex-col gap-4">
            <h2 className="text-[18px] font-bold text-gray-900">O cenário</h2>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              Hoje, clientes migram APIs e integrações em massa. O componente atual lista{" "}
              <strong className="text-gray-900">todos os números de página em sequência</strong>, sem truncar e sem espaçamento
              entre eles. Quando os números crescem pra 4 dígitos, eles literalmente colam um no outro — no exemplo abaixo,
              "2005 2006 2007 2008 2009" fica ilegível, e o indicador circular da página atual (2009) sobrepõe os dígitos
              vizinhos em vez de destacar com espaço próprio.
            </p>
            <div className="rounded-lg border border-gray-200 p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">Antes</span>
                <LegacyCrampedPagination pages={[2005, 2006, 2007, 2008, 2009]} current={2009} />
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex items-center justify-between flex-wrap gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700">Depois</span>
                <FixedSpacingPagination pages={[2005, 2006, 2007, 2008, 2009]} current={2009} />
              </div>
            </div>
            <p className="text-[13px] text-gray-500">
              Job do usuário aqui: <em>"quero saber quantos itens ainda preciso revisar/migrar e chegar rápido em qualquer ponto
              da lista"</em> — não "decifrar uma sequência de números colados". Só com espaçamento — cada número com sua
              própria área de toque e o indicador da página atual cabendo dentro do próprio espaço, sem vazar pros vizinhos —
              a leitura já fica clara, sem trocar o componente inteiro.
            </p>
          </section>

          {/* Por que dói */}
          <section id="problema" className="flex flex-col gap-4">
            <h2 className="text-[18px] font-bold text-gray-900">Por que dói (heurísticas)</h2>
            <p className="text-[13px] text-gray-500">
              O print mostra dois problemas empilhados: um de <strong className="text-gray-900">layout</strong> (falta de
              espaçamento — corrigível hoje, sem redesenho) e um de <strong className="text-gray-900">arquitetura de
              informação</strong> (listar toda página sem truncar — só se resolve com a proposta da próxima seção). Separei
              as heurísticas por qual dos dois problemas cada uma explica:
            </p>
            <ul className="flex flex-col gap-3">
              <li className="text-[14px] text-gray-600 leading-relaxed">
                <strong className="text-gray-900">Lei de Miller</strong> <span className="text-[11px] text-red-600 font-semibold uppercase">layout</span> — números de 4 dígitos colados
                exigem que o usuário separe os caracteres de cabeça antes de conseguir "ler" cada página — carga de memória de
                trabalho que nem deveria existir; é resolvida só com espaçamento, sem precisar truncar nada.
              </li>
              <li className="text-[14px] text-gray-600 leading-relaxed">
                <strong className="text-gray-900">Lei de Hick</strong> <span className="text-[11px] text-amber-600 font-semibold uppercase">arquitetura</span> — a UI lista todas as páginas (1 a
                2412) sem truncar. Mesmo com espaçamento correto, o tempo de decisão dispara porque as opções visíveis não têm
                limite — isso só se resolve truncando com "…", não com CSS.
              </li>
              <li className="text-[14px] text-gray-600 leading-relaxed">
                <strong className="text-gray-900">Reconhecimento vs. memorização</strong> <span className="text-[11px] text-amber-600 font-semibold uppercase">arquitetura</span> — mesmo espaçados, números
                brutos como "2009 de 2412" não dizem nada sobre progresso relativo (58%? 82%?). O usuário ainda precisa fazer
                conta de cabeça pra saber onde está — precisa de contexto (ex. contagem total formatada), não só de espaço.
              </li>
            </ul>
          </section>

          {/* Padrões de mercado */}
          <section id="mercado" className="flex flex-col gap-4">
            <h2 className="text-[18px] font-bold text-gray-900">Como o mercado resolve</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-left">
                    <th className="px-4 py-2.5 font-semibold">Produto</th>
                    <th className="px-4 py-2.5 font-semibold">Padrão</th>
                    <th className="px-4 py-2.5 font-semibold">Funciona bem quando...</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-2.5 font-medium text-gray-900">Google Search</td>
                    <td className="px-4 py-2.5 text-gray-600">Numeração truncada com "…" (1 … 4 5 [6] 7 8 … 200)</td>
                    <td className="px-4 py-2.5 text-gray-600">Total é conhecido e o usuário navega por posição, não sequencialmente</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-medium text-gray-900">Gmail</td>
                    <td className="px-4 py-2.5 text-gray-600">Só "Mais antigos / Mais recentes", sem números de página</td>
                    <td className="px-4 py-2.5 text-gray-600">Navegação é majoritariamente sequencial e o total exato não importa pro usuário</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-medium text-gray-900">Stripe / APIs REST</td>
                    <td className="px-4 py-2.5 text-gray-600">Cursor-based (before/after), sem "página X de Y"</td>
                    <td className="px-4 py-2.5 text-gray-600">Contar o total é caro/lento no backend, ou os dados mudam entre páginas</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-medium text-gray-900">Linear / Notion</td>
                    <td className="px-4 py-2.5 text-gray-600">Scroll infinito com carregamento incremental</td>
                    <td className="px-4 py-2.5 text-gray-600">O usuário quer explorar/revisar em sequência, não "pular" pra um ponto específico</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-medium text-gray-900">GitHub (issues/PRs)</td>
                    <td className="px-4 py-2.5 text-gray-600">Numeração truncada + contagem total formatada ("1 de 2.412")</td>
                    <td className="px-4 py-2.5 text-gray-600">Precisa de acesso direto a qualquer página e o total ainda é útil como referência</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Proposta */}
          <section id="proposta" className="flex flex-col gap-4">
            <h2 className="text-[18px] font-bold text-gray-900">Proposta pro DHuO</h2>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              O contexto de migração é de <strong className="text-gray-900">revisão dirigida</strong> — o usuário quer pular
              direto pra um ponto (ex: "quero ver os itens 2200 em diante que falharam") e também entender progresso geral.
              Isso pede acesso direto por posição, então cursor puro (Gmail/Stripe) perde informação importante. A recomendação
              é uma <strong className="text-gray-900">paginação numerada truncada</strong>, com três reforços:
            </p>
            <ol className="flex flex-col gap-2 list-decimal list-inside text-[14px] text-gray-600 leading-relaxed">
              <li><strong className="text-gray-900">Truncamento com "…"</strong> — nunca mais que ~7 controles numéricos visíveis, independente do total ter 200 ou 48.000 itens.</li>
              <li><strong className="text-gray-900">Números com separador de milhar</strong> ("48.231" em vez de "48231") — reduz a carga de leitura em contextos com muitos dígitos.</li>
              <li><strong className="text-gray-900">Campo "Ir para página"</strong> — dá acesso direto sem obrigar o usuário a clicar dezenas de vezes ou adivinhar o próximo "…".</li>
            </ol>
            <p className="text-[13px] text-gray-500">
              Se em algum fluxo o backend não conseguir calcular o total com performance (comum em scans de migração muito
              grandes), a alternativa é cair para o padrão cursor (Anterior/Próxima, sem números) — mas mantendo o rótulo
              "Mostrando X–Y" com números formatados, nunca a faixa crua.
            </p>
          </section>

          {/* Benchmark real */}
          <section id="bench" className="flex flex-col gap-4">
            <h2 className="text-[18px] font-bold text-gray-900">Benchmark real de mercado</h2>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              Fui checar na documentação oficial de bibliotecas e APIs que resolvem exatamente esse problema em produção —
              não são hipóteses, são props e comportamentos hoje documentados:
            </p>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-left">
                    <th className="px-4 py-2.5 font-semibold">Fonte</th>
                    <th className="px-4 py-2.5 font-semibold">O que faz</th>
                    <th className="px-4 py-2.5 font-semibold">Confirma</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-2.5 font-medium text-gray-900">
                      <a href="https://mui.com/material-ui/react-pagination/" target="_blank" rel="noreferrer" className="text-purple-700 hover:underline">MUI Pagination</a>
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">
                      Props <code className="text-[12px] bg-gray-100 px-1 rounded">boundaryCount</code> e{" "}
                      <code className="text-[12px] bg-gray-100 px-1 rounded">siblingCount</code> controlam quantos números
                      aparecem antes/depois do "…"; <code className="text-[12px] bg-gray-100 px-1 rounded">showFirstButton</code>/
                      <code className="text-[12px] bg-gray-100 px-1 rounded">showLastButton</code> pulam pro extremo.
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">Truncamento com "…" é padrão de mercado, não gambiarra.</td>
                  </tr>
                  <tr className="bg-gray-50/60">
                    <td colSpan={3} className="px-4 py-3">
                      <MuiMock />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-medium text-gray-900">
                      <a href="https://ant.design/components/pagination" target="_blank" rel="noreferrer" className="text-purple-700 hover:underline">Ant Design Pagination</a>
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">
                      Prop <code className="text-[12px] bg-gray-100 px-1 rounded">showQuickJumper</code> — campo "Vá para" que
                      salta direto pra qualquer página, embutido no componente oficial.
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">O jump-to-page é feature de primeira classe, não invenção nossa.</td>
                  </tr>
                  <tr className="bg-gray-50/60">
                    <td colSpan={3} className="px-4 py-3">
                      <AntdMock />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-medium text-gray-900">
                      <a href="https://carbondesignsystem.com/components/pagination/usage/" target="_blank" rel="noreferrer" className="text-purple-700 hover:underline">Carbon Design System (IBM)</a>
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">
                      Além do "anterior/próxima", expõe um <em>select</em> de página junto com o de itens por página —
                      variante <code className="text-[12px] bg-gray-100 px-1 rounded">PaginationNav</code> pra navegação
                      direta por número.
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">Acesso direto por número é tratado como parte do componente base, não extra.</td>
                  </tr>
                  <tr className="bg-gray-50/60">
                    <td colSpan={3} className="px-4 py-3">
                      <CarbonMock />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-medium text-gray-900">
                      <a href="https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api" target="_blank" rel="noreferrer" className="text-purple-700 hover:underline">GitHub REST API</a>
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">
                      Pagina via header <code className="text-[12px] bg-gray-100 px-1 rounded">Link</code> com{" "}
                      <code className="text-[12px] bg-gray-100 px-1 rounded">rel="next"/"last"</code>, sem expor número total
                      de páginas — <code className="text-[12px] bg-gray-100 px-1 rounded">per_page</code> limitado a 100.
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">Cursor puro é a escolha certa quando contar o total é caro — não é o caso do DHuO hoje.</td>
                  </tr>
                  <tr className="bg-gray-50/60">
                    <td colSpan={3} className="px-4 py-3">
                      <GithubMock />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-medium text-gray-900">
                      <a href="https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-pagination.html" target="_blank" rel="noreferrer" className="text-purple-700 hover:underline">AWS APIs</a>
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">
                      Usam token de continuação (<code className="text-[12px] bg-gray-100 px-1 rounded">NextToken</code>/
                      <code className="text-[12px] bg-gray-100 px-1 rounded">Marker</code>) em vez de números de página; token expira em 24h.
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">Cursor tem custo: perde-se acesso randômico e o "salto" tem prazo de validade.</td>
                  </tr>
                  <tr className="bg-gray-50/60">
                    <td colSpan={3} className="px-4 py-3">
                      <AwsMock />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[13px] text-gray-500">
              Leitura direta pro DHuO: a proposta (truncada + separador de milhar + jump) não é experimental — é o mesmo
              contrato que MUI, Ant Design e Carbon já shippam como padrão pra listas grandes. Cursor (GitHub/AWS) só
              entra em jogo se o volume de itens por integração passar da casa das centenas de milhares, ou se contar o total
              ficar caro no backend — não é o cenário relatado hoje.
            </p>
          </section>

          {/* Protótipo */}
          <section id="prototipo" className="flex flex-col gap-8 pb-20">
            <h2 className="text-[18px] font-bold text-gray-900">Soluções propostas</h2>

            <div className="flex flex-col gap-3">
              <span className="text-[12px] font-semibold uppercase tracking-widest text-gray-400">
                Numerada truncada + jump (recomendado)
              </span>
              <div className="rounded-lg border border-gray-200 p-5 flex flex-col gap-4">
                <p className="text-[13px] text-gray-500">
                  Mostrando <strong className="text-gray-900">{formatBR(rangeStart)}–{formatBR(rangeEnd)}</strong> de{" "}
                  <strong className="text-gray-900">{formatBR(totalItems)}</strong> itens
                </p>
                <TruncatedPagination page={page} totalPages={totalPages} onChange={setPage} />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[12px] font-semibold uppercase tracking-widest text-gray-400">
                Seletor de página (estilo Carbon)
              </span>
              <div className="rounded-lg border border-gray-200 p-5 flex flex-col gap-4">
                <p className="text-[13px] text-gray-500">
                  Mesmo estado da opção acima — mude aqui e veja a truncada se mover em sincronia. Em vez de uma fileira de
                  botões, usa um único <em>select</em> nativo pro número da página. Não precisa de "…" porque não renderiza
                  nada em largura fixa — o dropdown escala pra qualquer total sem crescer no layout, então é a opção mais
                  compacta pra espaços curtos como dentro de um header ou toolbar.
                </p>
                <PageSelectPagination page={page} totalPages={totalPages} onChange={setPage} />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[12px] font-semibold uppercase tracking-widest text-gray-400">
                Cursor-based (fallback sem total)
              </span>
              <div className="rounded-lg border border-gray-200 p-5 flex flex-col gap-4">
                <p className="text-[13px] text-gray-500">
                  Mostrando página <strong className="text-gray-900">{cursorIndex}</strong> — total não calculado
                </p>
                <CursorPagination
                  hasPrev={cursorIndex > 1}
                  hasNext={cursorIndex < 999}
                  onPrev={() => setCursorIndex((v) => Math.max(1, v - 1))}
                  onNext={() => setCursorIndex((v) => v + 1)}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
