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

export default function DevPortalTreePage() {
  const [selected, setSelected] = useState("proxies")
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ catalogo: true, especificacoes: false })
  const [watching, setWatching] = useState(false)

  const doc = docs[selected]

  function toggle(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "Noto Sans, sans-serif" }}>

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
    </div>
  )
}
