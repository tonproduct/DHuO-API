"use client"

import { useState, useEffect } from "react"
import { Search, ChevronRight, ArrowLeft, Star, Zap, Globe, Layers, Radio, Clock, Rss, Waves, Server, Database, Table2, Settings2, Cpu, Mail, Code2, Plug, Bot, GitBranch, Repeat2, FileCode2, Building2, Cloud, CloudUpload, Activity, ArrowLeftRight, Network } from "lucide-react"
import { cn } from "@/lib/utils"
import { ALL_COMPONENTS, type ComponentDef } from "./types"

const SECTIONS = [
  { key: "trigger",  label: "Triggers",     icon: Zap       },
  { key: "agentes",  label: "Agentes & IA", icon: Bot       },
  { key: "tecnico",  label: "Técnicos",     icon: Server    },
  { key: "logico",   label: "Lógicos",      icon: GitBranch },
  { key: "business", label: "Business",     icon: Building2 },
] as const

type SectionKey = typeof SECTIONS[number]["key"] | "favoritos"

// ─── Icon + description map ──────────────────────────────────────────────────

const META: Record<string, { icon: React.ReactNode; description: string }> = {
  // Triggers
  grpc:       { icon: <Zap size={18} />,           description: "Inicia o fluxo ao receber uma chamada gRPC"              },
  http:       { icon: <Globe size={18} />,          description: "Inicia o fluxo ao receber uma requisição HTTP/REST"      },
  kafka:      { icon: <Layers size={18} />,         description: "Consome mensagens de um tópico Apache Kafka"             },
  rabbitmq:   { icon: <Radio size={18} />,          description: "Consome mensagens de uma fila RabbitMQ"                  },
  scheduler:  { icon: <Clock size={18} />,          description: "Executa o fluxo em um intervalo configurado"             },
  pubsub:     { icon: <Rss size={18} />,            description: "Assina tópicos do Google Cloud Pub/Sub"                  },
  mqtt:       { icon: <Waves size={18} />,          description: "Consome mensagens de um broker MQTT (IoT)"               },
  mcpserver:  { icon: <Server size={18} />,         description: "Expõe ferramentas via Model Context Protocol"            },
  // Técnicos
  postgresql: { icon: <Database size={18} />,       description: "Lê e escreve dados em um banco PostgreSQL"               },
  "rmq-c":    { icon: <Radio size={18} />,          description: "Publica mensagens em uma fila RabbitMQ"                  },
  bigtable:   { icon: <Table2 size={18} />,         description: "Acessa tabelas no Google Cloud Bigtable"                 },
  oam:        { icon: <Settings2 size={18} />,      description: "Integra com o protocolo Open Application Model"          },
  "kafka-t":  { icon: <Layers size={18} />,         description: "Publica mensagens em um tópico Kafka"                    },
  "mqtt-t":   { icon: <Waves size={18} />,          description: "Publica mensagens em um broker MQTT"                     },
  opcua:      { icon: <Cpu size={18} />,            description: "Comunica com dispositivos via OPC UA"                    },
  mailsender: { icon: <Mail size={18} />,           description: "Envia e-mails via SMTP ou provedor configurado"          },
  sqlserver:  { icon: <Database size={18} />,       description: "Lê e escreve dados em um banco SQL Server"               },
  javaapp:    { icon: <Code2 size={18} />,          description: "Invoca uma aplicação Java via integração customizada"     },
  mcpclient:  { icon: <Plug size={18} />,           description: "Consome ferramentas via Model Context Protocol"          },
  aiagent:    { icon: <Bot size={18} />,            description: "Constrói e executa agentes de IA generativa"             },
  // Agentes & IA
  "ag-mcpserver": { icon: <Server size={18} />,    description: "Expõe ferramentas via Model Context Protocol"            },
  "ag-mcpclient": { icon: <Plug size={18} />,      description: "Consome ferramentas via Model Context Protocol"          },
  "ag-builder":   { icon: <Bot size={18} />,       description: "Constrói e orquestra agentes de IA"                      },
  // Lógicos
  choice:     { icon: <GitBranch size={18} />,      description: "Roteia o fluxo com base em condições WHEN/DEFAULT"       },
  datatransf: { icon: <ArrowLeftRight size={18} />, description: "Transforma e mapeia dados entre formatos"                },
  datatransf2:{ icon: <ArrowLeftRight size={18} />, description: "Transforma e mapeia dados entre formatos (v2)"           },
  foreach:    { icon: <Repeat2 size={18} />,        description: "Itera sobre uma lista de itens"                          },
  xslttransf: { icon: <FileCode2 size={18} />,      description: "Transforma XML usando folhas de estilo XSLT"             },
  // Business
  sap:        { icon: <Building2 size={18} />,      description: "Integra com sistemas SAP via RFC ou OData"               },
  saphana:    { icon: <Database size={18} />,       description: "Acessa banco de dados SAP HANA"                          },
  onedrive:   { icon: <Cloud size={18} />,          description: "Gerencia arquivos no Microsoft OneDrive"                 },
  awss3:      { icon: <CloudUpload size={18} />,    description: "Armazena e recupera objetos no Amazon S3"                },
  azureadls2: { icon: <CloudUpload size={18} />,    description: "Acessa o Azure Data Lake Storage Gen2"                   },
  gcloud:     { icon: <Cloud size={18} />,          description: "Integra com serviços do Google Cloud Platform"           },
  pisystem:   { icon: <Activity size={18} />,       description: "Coleta dados de séries temporais do OSIsoft PI"          },
}

// ─── Mock services ───────────────────────────────────────────────────────────

const MOCK_SERVICES = [
  { id: "svc-crm-sync",       name: "CRM Sync",            description: undefined, tags: ["CRM", "Vendas"]         },
  { id: "svc-order-proc",     name: "Order Processing",    description: undefined, tags: ["ERP", "Pedidos"]        },
  { id: "svc-email-dispatch", name: "Email Dispatch",      description: undefined, tags: ["Email"]                 },
  { id: "svc-invoice-gen",    name: "Invoice Generator",   description: undefined, tags: ["Financeiro", "ERP"]     },
  { id: "svc-data-backup",    name: "Data Backup",         description: undefined, tags: ["Storage", "Arquivos"]   },
]

// ─── Item ────────────────────────────────────────────────────────────────────

function PanelItem({
  comp,
  onConfigure,
  isFavorite,
  onToggleFavorite,
}: {
  comp: ComponentDef
  onConfigure?: (comp: ComponentDef) => void
  isFavorite?: boolean
  onToggleFavorite?: (id: string) => void
}) {
  const meta = META[comp.id]

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", comp.id)
        e.dataTransfer.effectAllowed = "move"
      }}
      className="w-full flex items-start gap-3 px-3 py-3 rounded-lg transition-colors hover:bg-gray-50 cursor-grab active:cursor-grabbing select-none group"
    >
      {/* Ghost icon */}
      <div className="shrink-0 mt-0.5 text-gray-400 group-hover:text-gray-600 transition-colors">
        {meta?.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className="leading-snug"
          style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: "Noto Sans, sans-serif" }}
        >
          {comp.label}
        </p>
        {meta?.description && (
          <p
            className="mt-0.5 leading-snug"
            style={{ fontSize: 11.5, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif" }}
          >
            {meta.description}
          </p>
        )}
      </div>

      {/* Favorite button */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(comp.id) }}
        className={cn(
          "shrink-0 self-center transition-opacity flex items-center justify-center",
          isFavorite ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
        style={{ width: 22, height: 22, background: "transparent", border: "none", cursor: "pointer", flexShrink: 0 }}
        title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <Star
          size={13}
          style={{ color: isFavorite ? "#f59e0b" : "#d1d5db" }}
          fill={isFavorite ? "#f59e0b" : "none"}
        />
      </button>

      {/* Add button */}
      <button
        onClick={(e) => { e.stopPropagation(); onConfigure?.(comp) }}
        className="shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:border-gray-400 active:scale-95"
        style={{
          width: 26, height: 26,
          border: "1.5px dashed #d1d5db",
          borderRadius: 6,
          background: "transparent",
          cursor: "pointer",
          flexShrink: 0,
        }}
        title={`Adicionar ${comp.label}`}
      >
        <span style={{ fontSize: 16, lineHeight: 1, fontWeight: 300 }}>+</span>
      </button>
    </div>
  )
}

// ─── Category list ───────────────────────────────────────────────────────────

function CategoryList({
  onSelect,
  favoritesCount,
  hasTrigger,
}: {
  onSelect: (key: SectionKey) => void
  favoritesCount: number
  hasTrigger: boolean
}) {
  const visibleSections = hasTrigger ? SECTIONS.filter((s) => s.key !== "trigger") : SECTIONS

  return (
    <div className="flex flex-col py-1">
      {visibleSections.map(({ key, label, icon: Icon }) => {
        const count = ALL_COMPONENTS.filter((c) => c.category === key).length
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="flex items-center gap-3 w-full px-3 py-3 text-left hover:bg-gray-50 transition-colors group cursor-pointer"
          >
            <div
              className="shrink-0 flex items-center justify-center rounded-lg"
              style={{ width: 34, height: 34, backgroundColor: "#f3f4f6" }}
            >
              <Icon size={16} style={{ color: "#6b7280" }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: "Noto Sans, sans-serif", flex: 1 }}>
              {label}
            </span>
            <span style={{ fontSize: 11, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif" }}>
              {count}
            </span>
            <ChevronRight size={14} style={{ color: "#d1d5db" }} className="group-hover:text-gray-400 transition-colors" />
          </button>
        )
      })}

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: "#f3f4f6", margin: "4px 12px" }} />

      {/* Favoritos */}
      <button
        onClick={() => onSelect("favoritos")}
        className="flex items-center gap-3 w-full px-3 py-3 text-left hover:bg-gray-50 transition-colors group"
      >
        <div
          className="shrink-0 flex items-center justify-center rounded-lg"
          style={{ width: 34, height: 34, backgroundColor: favoritesCount > 0 ? "#fffbeb" : "#f3f4f6" }}
        >
          <Star size={16} style={{ color: favoritesCount > 0 ? "#f59e0b" : "#6b7280" }} fill={favoritesCount > 0 ? "#f59e0b" : "none"} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: "Noto Sans, sans-serif", flex: 1 }}>
          Favoritos
        </span>
        <span style={{ fontSize: 11, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif" }}>
          {favoritesCount}
        </span>
        <ChevronRight size={14} style={{ color: "#d1d5db" }} className="group-hover:text-gray-400 transition-colors" />
      </button>
    </div>
  )
}

// ─── Panel ───────────────────────────────────────────────────────────────────

type PanelTab = "componentes" | "servicos"

type ComponentPanelProps = {
  onConfigure?: (comp: ComponentDef) => void
  hasTrigger?: boolean
  onAddTrigger?: () => void
  fixedTabs?: boolean
}

export function ComponentPanel({ onConfigure, hasTrigger = false, onAddTrigger, fixedTabs = false }: ComponentPanelProps) {
  const [tab, setTab] = useState<PanelTab>("componentes")
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<SectionKey | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (hasTrigger) {
      setActiveCategory(null)
      setSearch("")
    }
  }, [hasTrigger])

  const activeSection = SECTIONS.find((s) => s.key === activeCategory)
  const activeSectionLabel = activeCategory === "favoritos" ? "Favoritos" : activeSection?.label

  const filtered = ALL_COMPONENTS.filter((c) => {
    if (activeCategory === "favoritos") {
      const matchesSearch = search === "" || c.label.toLowerCase().includes(search.toLowerCase())
      return favorites.has(c.id) && matchesSearch
    }
    const matchesSearch = c.label.toLowerCase().includes(search.toLowerCase())
    if (search !== "") return matchesSearch
    return activeCategory ? c.category === activeCategory : false
  })

  function handleCategorySelect(key: SectionKey) {
    setActiveCategory(key)
    setSearch("")
  }

  function handleBack() {
    setActiveCategory(null)
    setSearch("")
  }

  function toggleFavorite(id: string) {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleTabChange(next: PanelTab) {
    setTab(next)
    setActiveCategory(null)
    setSearch("")
  }

  const showCategories = !activeCategory && search === ""
  const showResults = search !== "" || activeCategory !== null

  return (
    <aside
      className="shrink-0 flex flex-col bg-white border-l overflow-hidden"
      style={{ width: 280, borderColor: "#e5e7eb" }}
    >
      {/* Header: tabs fixas ou back substituindo */}
      <div className="shrink-0 px-3 pt-3 pb-2">
        {!fixedTabs && activeCategory ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleBack}
              className="flex items-center justify-center rounded hover:bg-gray-200 transition-colors shrink-0 cursor-pointer"
              style={{ width: 26, height: 26 }}
            >
              <ArrowLeft size={14} style={{ color: "#6b7280" }} />
            </button>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: "Noto Sans, sans-serif", flex: 1 }}>
              {activeSectionLabel}
            </span>
            <span style={{ fontSize: 11, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif" }}>
              {activeCategory === "favoritos"
                ? favorites.size
                : ALL_COMPONENTS.filter((c) => c.category === activeCategory).length}
            </span>
          </div>
        ) : (
          <div className="flex p-1" style={{ backgroundColor: "#f3f4f6", borderRadius: 8, gap: 4 }}>
            {(["componentes", "servicos"] as PanelTab[]).map((t) => (
              <button
                key={t}
                onClick={() => handleTabChange(t)}
                className="flex-1 cursor-pointer transition-colors"
                style={{
                  fontFamily: "Noto Sans, sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  height: 32,
                  padding: 0,
                  border: "none",
                  borderRadius: 4,
                  backgroundColor: tab === t ? "#7c22c0" : "#fff",
                  color: tab === t ? "#fff" : "#374151",
                }}
              >
                {t === "componentes" ? "Componentes" : "Serviços"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Busca */}
      <div className="shrink-0 px-3 pb-2.5">
        <div className="flex items-center gap-2 rounded-md px-3 py-2 bg-white border" style={{ borderColor: "#e5e7eb" }}>
          <input
            type="text"
            placeholder={tab === "componentes" ? "Buscar componente" : "Buscar serviço"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-[13px] outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
            style={{ fontFamily: "Noto Sans, sans-serif" }}
          />
          <Search size={13} className="text-gray-400 shrink-0" />
        </div>
      </div>

      {/* Conteúdo */}
      <div key={`${tab}-${activeCategory ?? "root"}`} className="flex flex-col flex-1 overflow-hidden animate-in slide-in-from-right-4 fade-in duration-200">
        {fixedTabs && activeCategory && (
          <div className="shrink-0 flex items-center gap-2 px-3 pb-2">
            <button
              onClick={handleBack}
              className="flex items-center justify-center rounded hover:bg-gray-200 transition-colors shrink-0 cursor-pointer"
              style={{ width: 26, height: 26 }}
            >
              <ArrowLeft size={14} style={{ color: "#6b7280" }} />
            </button>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: "Noto Sans, sans-serif", flex: 1 }}>
              {activeSectionLabel}
            </span>
            <span style={{ fontSize: 11, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif" }}>
              {activeCategory === "favoritos"
                ? favorites.size
                : ALL_COMPONENTS.filter((c) => c.category === activeCategory).length}
            </span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {tab === "servicos" ? (
            <div className="px-1 py-1">
              {MOCK_SERVICES.map((svc) => (
                <div
                  key={svc.id}
                  draggable
                  onDragStart={(e) => { e.dataTransfer.setData("text/plain", svc.id); e.dataTransfer.effectAllowed = "move" }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors hover:bg-gray-50 cursor-grab active:cursor-grabbing select-none group"
                >
                  <div className="shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors">
                    <Network size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: "Noto Sans, sans-serif" }}>
                      {svc.name}
                    </p>
                    {svc.description && (
                      <p style={{ fontSize: 11.5, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif" }}>
                        {svc.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : showCategories ? (
            <CategoryList onSelect={handleCategorySelect} favoritesCount={favorites.size} hasTrigger={hasTrigger} />
          ) : showResults ? (
            filtered.length === 0 ? (
              <p className="text-center pt-6" style={{ fontSize: 12, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif" }}>
                {activeCategory === "favoritos" ? "Nenhum favorito ainda" : "Nenhum componente encontrado"}
              </p>
            ) : (
              <div className="px-1 py-1">
                {filtered.map((comp) => (
                  <PanelItem
                    key={comp.id}
                    comp={comp}
                    onConfigure={onConfigure}
                    isFavorite={favorites.has(comp.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )
          ) : null}
        </div>
      </div>
      {/* Add trigger footer — shown only when canvas already has a trigger */}
      {hasTrigger && !activeCategory && (
        <div className="shrink-0 border-t px-3 py-3 animate-in slide-in-from-right-4 fade-in duration-200" style={{ borderColor: "#f3f4f6" }}>
          <button
            onClick={() => handleCategorySelect("trigger")}
            className="w-full flex items-center gap-2.5 rounded-lg py-2.5 px-3 border transition-colors hover:bg-gray-50 group cursor-pointer"
            style={{ borderColor: "#e5e7eb", backgroundColor: "#fafafa" }}
          >
            <Zap size={12} style={{ color: "#9ca3af", flexShrink: 0 }} />
            <div className="flex-1 min-w-0 text-left">
              <span style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif", display: "block" }}>
                Trigger
              </span>
              <span style={{ fontSize: 10, color: "#c4c9d4", fontFamily: "Noto Sans, sans-serif", lineHeight: 1.4, display: "block" }}>
                Atenção: apenas um trigger por fluxo
              </span>
            </div>
            <ChevronRight size={12} style={{ color: "#d1d5db", flexShrink: 0 }} />
          </button>
        </div>
      )}
    </aside>
  )
}
