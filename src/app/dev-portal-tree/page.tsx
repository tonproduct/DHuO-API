"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, FileText, Search, Bell } from "lucide-react"

type TreeNode = {
  id: string
  label: string
  children?: TreeNode[]
}

const tree: TreeNode[] = [
  {
    id: "catalogo",
    label: "Catálogo de Serviços",
    children: [
      { id: "proxies", label: "Proxies" },
      { id: "mediators", label: "Mediators" },
      { id: "provedores", label: "Provedores" },
      {
        id: "kafka",
        label: "Tópicos e Producers Kafka",
        children: [
          { id: "kafka-prod", label: "Producers" },
          { id: "kafka-cons", label: "Consumers" },
        ],
      },
      { id: "brms", label: "BRMS" },
      { id: "rabbitmq", label: "FILA RabbitMQ" },
    ],
  },
  {
    id: "especificacoes",
    label: "Especificações Técnicas",
    children: [
      { id: "portabilidade", label: "Portabilidade" },
      { id: "pwid", label: "PWID" },
      { id: "payone", label: "PayOne" },
      { id: "apigee", label: "APIGEE" },
    ],
  },
]

const docs: Record<string, { title: string; version: string; updatedAt: string; content: string }> = {
  proxies: {
    title: "Proxies",
    version: "v5.3.1.0",
    updatedAt: "03/06/2026",
    content: `## Visão Geral

O serviço de Proxies atua como intermediário entre os sistemas da TIM e os serviços externos, gerenciando autenticação, throttling e transformação de payload.

## Endpoint

\`POST /proxy/v1/execute\`

## Headers obrigatórios

| Header | Descrição |
|---|---|
| Authorization | Bearer token de autenticação |
| X-Correlation-ID | ID único da requisição |
| Content-Type | application/json |

## Exemplo de request

\`\`\`json
{
  "serviceId": "svc-001",
  "payload": {
    "action": "execute",
    "data": {}
  }
}
\`\`\`

## Códigos de retorno

| Código | Descrição |
|---|---|
| 200 | Sucesso |
| 401 | Não autorizado |
| 503 | Serviço indisponível |`,
  },
  mediators: {
    title: "Mediators",
    version: "v4.1.2.0",
    updatedAt: "28/05/2026",
    content: `## Visão Geral

Os Mediators são responsáveis pela orquestração de chamadas entre múltiplos serviços, garantindo a consistência das transações distribuídas.

## Endpoint

\`POST /mediator/v1/orchestrate\`

## Fluxo de execução

1. Recebe a requisição do sistema originador
2. Valida o payload contra o schema definido
3. Executa as chamadas aos serviços dependentes em sequência
4. Consolida as respostas e retorna ao originador`,
  },
}

function TreeItem({ node, depth = 0, selected, onSelect, expanded, onToggle }: {
  node: TreeNode
  depth?: number
  selected: string
  onSelect: (id: string) => void
  expanded: Record<string, boolean>
  onToggle: (id: string) => void
}) {
  const hasChildren = node.children && node.children.length > 0
  const isExpanded = expanded[node.id]
  const isSelected = selected === node.id

  return (
    <div>
      <button
        onClick={() => {
          if (hasChildren) onToggle(node.id)
          else onSelect(node.id)
        }}
        className={`w-full flex items-center gap-1.5 px-3 py-1.5 text-left rounded-md transition-colors text-[13px] ${
          isSelected
            ? "bg-purple-50 text-purple-700 font-medium"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        {hasChildren ? (
          isExpanded ? <ChevronDown size={13} className="shrink-0 text-gray-400" /> : <ChevronRight size={13} className="shrink-0 text-gray-400" />
        ) : (
          <FileText size={12} className="shrink-0 text-gray-300" />
        )}
        <span className="truncate">{node.label}</span>
      </button>

      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              selected={selected}
              onSelect={onSelect}
              expanded={expanded}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function renderMarkdown(content: string) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-[18px] font-bold text-gray-900 mt-8 mb-3 first:mt-0">{line.replace("## ", "")}</h2>)
    } else if (line.startsWith("| ")) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!lines[i].includes("---")) tableLines.push(lines[i])
        i++
      }
      elements.push(
        <div key={i} className="mt-3 rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {tableLines[0].split("|").filter(Boolean).map((cell, j) => (
                  <th key={j} className="text-left px-4 py-2.5 font-semibold text-gray-600">{cell.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableLines.slice(1).map((row, j) => (
                <tr key={j} className="border-b border-gray-100 last:border-0">
                  {row.split("|").filter(Boolean).map((cell, k) => (
                    <td key={k} className="px-4 py-2.5 text-gray-600">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    } else if (line.startsWith("```")) {
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      elements.push(
        <pre key={i} className="mt-3 rounded-lg bg-gray-900 text-gray-100 px-5 py-4 text-[12px] leading-relaxed overflow-x-auto">
          <code>{codeLines.join("\n")}</code>
        </pre>
      )
    } else if (line.match(/^\d+\. /)) {
      const items: string[] = []
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ""))
        i++
      }
      elements.push(
        <ol key={i} className="mt-3 flex flex-col gap-1.5 list-decimal list-inside">
          {items.map((item, j) => (
            <li key={j} className="text-[14px] text-gray-600 leading-relaxed">{item}</li>
          ))}
        </ol>
      )
      continue
    } else if (line.startsWith("`") && line.endsWith("`")) {
      elements.push(
        <p key={i} className="mt-3">
          <code className="bg-gray-100 px-2 py-1 rounded text-[13px] text-gray-800">{line.replace(/`/g, "")}</code>
        </p>
      )
    } else if (line.trim() !== "") {
      elements.push(<p key={i} className="text-[14px] text-gray-600 leading-relaxed mt-3">{line}</p>)
    }

    i++
  }

  return elements
}

function SolutionToggle({ view, setView }: { view: "consumer" | "manager"; setView: (v: "consumer" | "manager") => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-white border border-gray-200 rounded-full px-1.5 py-1.5 shadow-lg">
      <button
        onClick={() => setView("consumer")}
        className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${view === "consumer" ? "text-white" : "text-gray-400 hover:text-gray-600"}`}
        style={view === "consumer" ? { backgroundColor: "#7c22c0" } : {}}
      >
        Solução 1 — Dev Portal
      </button>
      <button
        onClick={() => setView("manager")}
        className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${view === "manager" ? "text-white" : "text-gray-400 hover:text-gray-600"}`}
        style={view === "manager" ? { backgroundColor: "#7c22c0" } : {}}
      >
        Solução 2 — Manager
      </button>
    </div>
  )
}

function ManagerView() {
  const [digit1, setDigit1] = useState("5")
  const [digit2, setDigit2] = useState("3")
  const [digit3, setDigit3] = useState("1")
  const [digit4, setDigit4] = useState("0")
  const [folder, setFolder] = useState("catalogo")
  const [subfolder, setSubfolder] = useState("proxies")
  const [published, setPublished] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: "Noto Sans, sans-serif" }}>

      {/* Manager top bar */}
      <div className="h-12 bg-white border-b border-gray-200 flex items-center px-6 gap-4 shrink-0">
        <span className="font-bold text-[15px]" style={{ color: "#7c22c0" }}>DHuO.</span>
        <span className="text-[12px] text-gray-400 ml-2">Manager</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white text-[11px] font-bold">JF</div>
          <span className="text-[12px] text-gray-600">Ian Felix · Eng TIM</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full px-8 py-10 flex flex-col gap-6">

        {/* Header */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">Publicar documentação</p>
          <h1 className="text-[22px] font-bold text-gray-900 mt-1">Proxies</h1>
        </div>

        {/* Versionamento */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-[13px] font-semibold text-gray-800 mb-1">Versão</p>
          <p className="text-[12px] text-gray-400 mb-4">Cada dígito representa um tipo de alteração. Incremente apenas o dígito correspondente ao que foi alterado.</p>
          <div className="flex items-center gap-2">
            {[
              { label: "Major", value: digit1, set: setDigit1, desc: "Mudança estrutural" },
              { label: "Minor", value: digit2, set: setDigit2, desc: "Nova funcionalidade" },
              { label: "Doc", value: digit3, set: setDigit3, desc: "Alteração de documentação" },
              { label: "Fix", value: digit4, set: setDigit4, desc: "Correção de bug" },
            ].map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => d.set(String(Math.max(0, Number(d.value) - 1)))} className="px-2 py-1.5 text-gray-400 hover:bg-gray-50 text-[13px]">−</button>
                  <span className="w-8 text-center text-[14px] font-semibold text-gray-800">{d.value}</span>
                  <button onClick={() => d.set(String(Number(d.value) + 1))} className="px-2 py-1.5 text-gray-400 hover:bg-gray-50 text-[13px]">+</button>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">{d.label}</p>
                <p className="text-[10px] text-gray-300 text-center w-20 leading-tight">{d.desc}</p>
              </div>
            ))}
            <div className="ml-3 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200">
              <p className="text-[11px] text-gray-400 mb-0.5">Versão resultante</p>
              <p className="text-[16px] font-bold text-gray-800">v{digit1}.{digit2}.{digit3}.{digit4}</p>
            </div>
          </div>
        </div>

        {/* Localização na árvore */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-[13px] font-semibold text-gray-800 mb-1">Localização na árvore</p>
          <p className="text-[12px] text-gray-400 mb-4">Defina onde esta documentação aparece na navegação do Dev Portal.</p>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Pasta</label>
              <select value={folder} onChange={e => setFolder(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 bg-white">
                <option value="catalogo">Catálogo de Serviços</option>
                <option value="especificacoes">Especificações Técnicas</option>
              </select>
            </div>
            <ChevronRight size={16} className="text-gray-300 mt-5 shrink-0" />
            <div className="flex-1">
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Subpasta</label>
              <select value={subfolder} onChange={e => setSubfolder(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 bg-white">
                <option value="proxies">Proxies</option>
                <option value="mediators">Mediators</option>
                <option value="kafka">Tópicos e Producers Kafka</option>
              </select>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-[12px] text-gray-500 flex items-center gap-2">
            <span className="text-gray-300">📁</span>
            {folder === "catalogo" ? "Catálogo de Serviços" : "Especificações Técnicas"}
            <ChevronRight size={12} className="text-gray-300" />
            <span className="font-medium text-gray-700">{subfolder === "proxies" ? "Proxies" : subfolder === "mediators" ? "Mediators" : "Tópicos e Producers Kafka"}</span>
          </div>
        </div>

        {/* Resumo da alteração */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-[13px] font-semibold text-gray-800 mb-1">Resumo da alteração <span className="text-red-400">*</span></p>
          <p className="text-[12px] text-gray-400 mb-3">Será enviado por e-mail para quem acompanha esta documentação.</p>
          <textarea
            placeholder="Ex: Corrigido o método do endpoint /auth/token de POST para PUT."
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[13px] text-gray-700 resize-none outline-none focus:border-purple-400 transition-colors"
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button className="text-[13px] text-gray-400 hover:text-gray-600 transition-colors">Cancelar</button>
          <button
            onClick={() => setPublished(true)}
            className="px-6 py-2.5 rounded-lg text-[13px] font-semibold text-white transition-colors"
            style={{ backgroundColor: published ? "#16a34a" : "#7c22c0" }}
          >
            {published ? "✓ Publicado" : "Publicar no Dev Portal"}
          </button>
        </div>

      </div>
    </div>
  )
}

export default function DevPortalTreePage() {
  const [view, setView] = useState<"consumer" | "manager">("consumer")
  const [selected, setSelected] = useState("proxies")
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ catalogo: true, especificacoes: false })
  const [watching, setWatching] = useState(false)

  const doc = docs[selected]

  function toggle(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  if (view === "manager") {
    return (
      <div className="relative">
        <SolutionToggle view={view} setView={setView} />
        <ManagerView />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col relative" style={{ fontFamily: "Noto Sans, sans-serif" }}>

      {/* Top bar */}
      <div className="h-12 border-b border-gray-200 flex items-center px-6 gap-6 shrink-0">
        <span className="font-bold text-[15px]" style={{ color: "#7c22c0" }}>DHuO.</span>
        <nav className="flex gap-5 ml-4">
          <span className="text-[13px] font-semibold" style={{ color: "#7c22c0" }}>Catálogo de APIs</span>
          <span className="text-[13px] text-gray-400">Catálogo de Integrações</span>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5">
            <Search size={13} className="text-gray-400" />
            <input placeholder="Buscar documentação..." className="bg-transparent text-[12px] text-gray-600 outline-none w-48" />
          </div>
          <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white text-[11px] font-bold">LM</div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div className="w-64 shrink-0 border-r border-gray-200 overflow-y-auto py-4 px-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-3 mb-3">Documentação</p>
          <div className="flex flex-col gap-0.5">
            {tree.map((node) => (
              <TreeItem
                key={node.id}
                node={node}
                selected={selected}
                onSelect={setSelected}
                expanded={expanded}
                onToggle={toggle}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {doc ? (
            <>
              {/* Doc header */}
              <div className="border-b border-gray-200 px-10 py-5 flex items-start justify-between gap-6">
                <div>
                  <h1 className="text-[22px] font-bold text-gray-900">{doc.title}</h1>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[12px] text-gray-400">Versão</span>
                    <select className="text-[12px] text-gray-700 border border-gray-200 rounded px-2 py-0.5 bg-white">
                      <option>{doc.version}</option>
                      <option>v5.2.1.0</option>
                      <option>v5.1.0.0</option>
                    </select>
                    <span className="text-[12px] text-gray-300">·</span>
                    <span className="text-[12px] text-gray-400">Atualizado em {doc.updatedAt}</span>
                  </div>
                </div>
                <button
                  onClick={() => setWatching(!watching)}
                  className={`flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-lg border transition-colors ${
                    watching
                      ? "border-purple-300 bg-purple-50 text-purple-700"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <Bell size={13} />
                  {watching ? "Acompanhando" : "Acompanhar"}
                </button>
              </div>

              {/* Doc content */}
              <div className="px-10 py-8 max-w-3xl">
                {renderMarkdown(doc.content)}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-[14px]">
              Selecione uma documentação
            </div>
          )}
        </div>

      </div>
      <SolutionToggle view={view} setView={setView} />
    </div>
  )
}
