"use client"

import { useState, useEffect, Suspense, useMemo } from "react"
import Link from "next/link"
import { X, FlaskConical, RotateCcw, Folder, Search, ArrowLeft } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { artifacts } from "./artifacts"
import type { Artifact, ArtifactCategory } from "./artifacts"

const STORAGE_KEY = "lab:hidden"
const MODULO_ORDER = ["API", "Integra"]
const CATEGORIES: ArtifactCategory[] = ["IA", "Integração", "API", "UI", "Outro"]

// ─── Tree ────────────────────────────────────────────────────────────────────

type EpicoData = { direct: Artifact[]; features: Record<string, Artifact[]> }
type ModuloData = { direct: Artifact[]; epicos: Record<string, EpicoData> }
type Tree = { moduloMap: Record<string, ModuloData>; noModulo: Artifact[] }

function buildTree(items: Artifact[]): Tree {
  const moduloMap: Record<string, ModuloData> = {}
  const noModulo: Artifact[] = []

  for (const a of items) {
    if (!a.modulo) { noModulo.push(a); continue }
    if (!moduloMap[a.modulo]) moduloMap[a.modulo] = { direct: [], epicos: {} }
    if (!a.epico) { moduloMap[a.modulo].direct.push(a); continue }
    const ep = moduloMap[a.modulo].epicos
    if (!ep[a.epico]) ep[a.epico] = { direct: [], features: {} }
    if (!a.feature) { ep[a.epico].direct.push(a); continue }
    if (!ep[a.epico].features[a.feature]) ep[a.epico].features[a.feature] = []
    ep[a.epico].features[a.feature].push(a)
  }
  return { moduloMap, noModulo }
}

function countEpico(e: EpicoData) {
  return e.direct.length + Object.values(e.features).reduce((s, arr) => s + arr.length, 0)
}
function countModulo(m: ModuloData) {
  return m.direct.length + Object.values(m.epicos).reduce((s, e) => s + countEpico(e), 0)
}

type LevelContent = { folders: { name: string; count: number }[]; items: Artifact[] }

function getLevelContent(tree: Tree, path: string[]): LevelContent {
  if (path.length === 0) {
    const folders = [
      ...MODULO_ORDER.filter((m) => tree.moduloMap[m]).map((m) => ({ name: m, count: countModulo(tree.moduloMap[m]) })),
      ...Object.keys(tree.moduloMap).filter((m) => !MODULO_ORDER.includes(m)).map((m) => ({ name: m, count: countModulo(tree.moduloMap[m]) })),
    ]
    if (tree.noModulo.length > 0) folders.push({ name: "Geral", count: tree.noModulo.length })
    return { folders, items: [] }
  }

  if (path[0] === "Geral") return { folders: [], items: tree.noModulo }

  const mData = tree.moduloMap[path[0]]
  if (!mData) return { folders: [], items: [] }

  if (path.length === 1) {
    const folders = Object.entries(mData.epicos).map(([name, e]) => ({ name, count: countEpico(e) }))
    return { folders, items: mData.direct }
  }

  const eData = mData.epicos[path[1]]
  if (!eData) return { folders: [], items: [] }

  if (path.length === 2) {
    const folders = Object.entries(eData.features).map(([name, arr]) => ({ name, count: arr.length }))
    return { folders, items: eData.direct }
  }

  return { folders: [], items: eData.features[path[2]] ?? [] }
}

// ─── Components ───────────────────────────────────────────────────────────────

function FolderCard({ name, count, onClick }: { name: string; count: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col justify-between p-4 rounded-lg border border-white/10 bg-[#2a2a2a] hover:border-purple-500/50 hover:bg-[#2f2f2f] transition-all text-left aspect-[4/3]"
    >
      <Folder size={26} className="text-white/25 group-hover:text-purple-400 transition-colors" />
      <div>
        <p className="text-[13px] font-medium text-white/80 group-hover:text-white transition-colors leading-tight">{name}</p>
        <p className="text-[11px] text-white/25 mt-0.5">{count} {count === 1 ? "artefato" : "artefatos"}</p>
      </div>
    </button>
  )
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

// ─── Lab Content ─────────────────────────────────────────────────────────────

function LabContent() {
  const [hidden, setHidden] = useState<string[]>([])
  const [path, setPath] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState<ArtifactCategory | null>(null)
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

  function navigate(folder: string) {
    setPath((p) => [...p, folder])
    setSearch("")
  }

  function goBack() {
    setPath((p) => p.slice(0, -1))
    setSearch("")
  }

  function breadcrumbTo(index: number) {
    setPath((p) => p.slice(0, index))
    setSearch("")
  }

  const visible = artifacts.filter((a) => !hidden.includes(a.href))
  const tree = buildTree(visible)
  const isSearching = search.trim().length > 0
  const { folders, items } = getLevelContent(tree, path)
  const filteredItems = activeFilter ? items.filter((a) => a.category === activeFilter) : items

  const searchResults = useMemo(() => {
    if (!isSearching) return null
    const q = search.toLowerCase()
    let results = visible.filter(
      (a) => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
    )
    if (activeFilter) results = results.filter((a) => a.category === activeFilter)
    return results
  }, [search, visible, activeFilter, isSearching])

  const usedCategories = useMemo(() => {
    const all = isSearching ? visible : items
    return CATEGORIES.filter((c) => all.some((a) => a.category === c))
  }, [items, visible, isSearching])

  if (!mounted) return null

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar artefatos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg pl-8 pr-3 py-2 text-[13px] text-white/80 placeholder-white/25 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>

        {usedCategories.length > 0 && (
          <div className="flex items-center gap-1.5">
            {usedCategories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveFilter(activeFilter === c ? null : c)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                  activeFilter === c
                    ? "bg-purple-500/30 border-purple-500/50 text-purple-300"
                    : "border-white/10 text-white/30 hover:text-white/50 hover:border-white/20"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {canEdit && hidden.length > 0 && (
          <button onClick={restoreAll} className="ml-auto flex items-center gap-1.5 text-[12px] text-white/30 hover:text-white/60 transition-colors">
            <RotateCcw size={12} />
            Restaurar ({hidden.length})
          </button>
        )}
      </div>

      {/* Breadcrumb + back */}
      {!isSearching && (
        <div className="flex items-center gap-2 mb-6">
          {path.length > 0 && (
            <button onClick={goBack} className="p-1.5 rounded-md text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors">
              <ArrowLeft size={14} />
            </button>
          )}
          <nav className="flex items-center gap-1 text-[12px]">
            <button onClick={() => breadcrumbTo(0)} className="text-white/30 hover:text-white/60 transition-colors">
              Lab
            </button>
            {path.map((segment, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="text-white/15">/</span>
                {i < path.length - 1 ? (
                  <button onClick={() => breadcrumbTo(i + 1)} className="text-white/30 hover:text-white/60 transition-colors">
                    {segment}
                  </button>
                ) : (
                  <span className="text-white/60 font-medium">{segment}</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      )}

      {/* Search results */}
      {isSearching && searchResults !== null && (
        <div>
          <p className="text-[11px] text-white/25 mb-4">
            {searchResults.length === 0 ? "Nenhum resultado" : `${searchResults.length} resultado${searchResults.length > 1 ? "s" : ""}`}
          </p>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
            {searchResults.map((a) => (
              <ArtifactCard key={a.href} a={a} canEdit={canEdit} onHide={() => hide(a.href)} />
            ))}
          </ul>
        </div>
      )}

      {/* Folder view */}
      {!isSearching && (
        <div className="space-y-8">
          {folders.length > 0 && (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
              {folders.map((f) => (
                <li key={f.name}>
                  <FolderCard name={f.name} count={f.count} onClick={() => navigate(f.name)} />
                </li>
              ))}
            </ul>
          )}

          {filteredItems.length > 0 && (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
              {filteredItems.map((a) => (
                <ArtifactCard key={a.href} a={a} canEdit={canEdit} onHide={() => hide(a.href)} />
              ))}
            </ul>
          )}

          {folders.length === 0 && filteredItems.length === 0 && (
            <p className="text-[13px] text-white/20">Nenhum artefato aqui.</p>
          )}
        </div>
      )}
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LabPage() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] px-10 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5 mb-8">
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
