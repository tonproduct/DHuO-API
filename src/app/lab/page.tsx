"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { X, FlaskConical, RotateCcw, ChevronDown, ChevronRight } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { artifacts } from "./artifacts"
import type { Artifact } from "./artifacts"

const STORAGE_KEY = "lab:hidden"
const MODULO_ORDER = ["API", "Integra"]

type EpicoData = { direct: Artifact[]; features: Record<string, Artifact[]> }
type ModuloData = { direct: Artifact[]; epicos: Record<string, EpicoData> }

function buildTree(items: Artifact[]) {
  const moduloMap: Record<string, ModuloData> = {}
  const noModulo: Artifact[] = []

  for (const a of items) {
    if (!a.modulo) { noModulo.push(a); continue }

    if (!moduloMap[a.modulo]) moduloMap[a.modulo] = { direct: [], epicos: {} }
    if (!a.epico) { moduloMap[a.modulo].direct.push(a); continue }

    const epicos = moduloMap[a.modulo].epicos
    if (!epicos[a.epico]) epicos[a.epico] = { direct: [], features: {} }
    if (!a.feature) { epicos[a.epico].direct.push(a); continue }

    if (!epicos[a.epico].features[a.feature]) epicos[a.epico].features[a.feature] = []
    epicos[a.epico].features[a.feature].push(a)
  }

  return { moduloMap, noModulo }
}

function ArtifactCard({ a, canEdit, onHide }: { a: Artifact; canEdit: boolean; onHide: () => void }) {
  return (
    <li className="group flex flex-col">
      <Link
        href={a.href}
        className="block relative rounded-lg overflow-hidden border border-white/10 bg-[#2c2c2c] aspect-[4/3] hover:border-purple-500/60 transition-colors"
      >
        <iframe
          src={a.href}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ transform: "scale(0.5)", transformOrigin: "top left", width: "200%", height: "200%" }}
          tabIndex={-1}
        />
        <div className="absolute inset-0" />
      </Link>
      <div className="flex items-start justify-between gap-2 mt-2.5 px-0.5">
        <Link href={a.href} className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <p className="text-[13px] font-medium text-white/90 truncate group-hover:text-purple-300 transition-colors">{a.name}</p>
            {a.category && (
              <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">{a.category}</span>
            )}
          </div>
          <p className="text-[12px] text-white/35 leading-snug line-clamp-2">{a.description}</p>
          {a.date && (
            <p className="mt-1.5 text-[11px] text-white/20">
              {new Date(a.date + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
            </p>
          )}
        </Link>
        {canEdit && (
          <button onClick={onHide} title="Remover do lab" className="shrink-0 mt-0.5 p-1 rounded text-white/20 hover:bg-red-500/20 hover:text-red-400 transition-colors">
            <X size={13} />
          </button>
        )}
      </div>
    </li>
  )
}

function CardGrid({ items, canEdit, onHide }: { items: Artifact[]; canEdit: boolean; onHide: (href: string) => void }) {
  if (!items.length) return null
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
      {items.map((a) => (
        <ArtifactCard key={a.href} a={a} canEdit={canEdit} onHide={() => onHide(a.href)} />
      ))}
    </ul>
  )
}

function LabContent() {
  const [hidden, setHidden] = useState<string[]>([])
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)
  const searchParams = useSearchParams()
  const canEdit = searchParams.get("edit") === "true"

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setHidden(JSON.parse(stored))
    setMounted(true)
  }, [])

  function hide(href: string) {
    const next = [...hidden, href]
    setHidden(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  function restoreAll() {
    setHidden([])
    localStorage.removeItem(STORAGE_KEY)
  }

  function toggle(key: string) {
    setCollapsed((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  if (!mounted) return null

  const visible = artifacts.filter((a) => !hidden.includes(a.href))
  const { moduloMap, noModulo } = buildTree(visible)

  const orderedModulos = [
    ...MODULO_ORDER.filter((m) => moduloMap[m]),
    ...Object.keys(moduloMap).filter((m) => !MODULO_ORDER.includes(m)),
  ]

  return (
    <>
      {canEdit && hidden.length > 0 && (
        <button onClick={restoreAll} className="flex items-center gap-1.5 mb-6 text-[12px] text-white/30 hover:text-white/60 transition-colors">
          <RotateCcw size={12} />
          Restaurar todos ({hidden.length} oculto{hidden.length > 1 ? "s" : ""})
        </button>
      )}

      <div className="space-y-10">
        {orderedModulos.map((modulo) => {
          const mKey = modulo
          const isCollapsed = collapsed.has(mKey)
          const mData = moduloMap[modulo]

          return (
            <div key={modulo}>
              <button
                onClick={() => toggle(mKey)}
                className="flex items-center gap-2 mb-5 text-[11px] font-semibold uppercase tracking-widest text-white/40 hover:text-white/60 transition-colors"
              >
                {isCollapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
                {modulo}
              </button>

              {!isCollapsed && (
                <div className="space-y-8 pl-4 border-l border-white/10">
                  <CardGrid items={mData.direct} canEdit={canEdit} onHide={hide} />

                  {Object.entries(mData.epicos).map(([epico, eData]) => {
                    const eKey = `${mKey}/${epico}`
                    const eCollapsed = collapsed.has(eKey)

                    return (
                      <div key={epico}>
                        <button
                          onClick={() => toggle(eKey)}
                          className="flex items-center gap-2 mb-4 text-[11px] font-medium uppercase tracking-wider text-white/25 hover:text-white/45 transition-colors"
                        >
                          {eCollapsed ? <ChevronRight size={11} /> : <ChevronDown size={11} />}
                          {epico}
                        </button>

                        {!eCollapsed && (
                          <div className="space-y-6 pl-4 border-l border-white/[0.06]">
                            <CardGrid items={eData.direct} canEdit={canEdit} onHide={hide} />

                            {Object.entries(eData.features).map(([feature, fItems]) => (
                              <div key={feature}>
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/20 mb-3">{feature}</p>
                                <CardGrid items={fItems} canEdit={canEdit} onHide={hide} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {noModulo.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/20 mb-5">Geral</p>
            <CardGrid items={noModulo} canEdit={canEdit} onHide={hide} />
          </div>
        )}
      </div>
    </>
  )
}

export default function LabPage() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] px-10 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5 mb-10">
          <FlaskConical size={18} className="text-purple-400" />
          <h1 className="text-[15px] font-semibold text-white">Lab</h1>
          <span className="text-[13px] text-white/30">— artefatos de estudo</span>
        </div>
        <Suspense>
          <LabContent />
        </Suspense>
      </div>
    </div>
  )
}
