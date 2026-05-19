"use client"

import { useState, useRef } from "react"
import { GripHorizontal } from "lucide-react"
import { IntegrationHeader } from "./header"
import { LeftNav }           from "./left-nav"
import { CanvasToolbar }     from "./canvas-toolbar"
import { IntegrationCanvas } from "./canvas"
import { ComponentPanel }    from "./panel"
import { TriggerSidebar }    from "@/components/ui/trigger-sidebar"
import { ConfigureDrawer }   from "./configure-drawer"
import { IntegrationContext } from "./integration-context"
import { TabDocumentacao }   from "./tab-docs"
import { TabImplantacao }    from "./tab-deploy"
import { TabConfiguracao }   from "./tab-config"
import { ALL_COMPONENTS }    from "./types"
import type { Section, ComponentDef } from "./types"

const PANEL_VARIANTS = [
  {
    value: "classic",
    label: "A — Classic",
    pros: ["Hierarquia clara de navegação", "Mais espaço p/ o conteúdo"],
    cons: ["Tabs somem — usuário perde referência", "2 cliques pra trocar de aba"],
  },
  {
    value: "back-title",
    label: "B — Back + título",
    pros: ["Linha clicável clara e legível", "Não compete com a busca"],
    cons: ["Ocupa uma linha extra", "Pode parecer redundante com o conteúdo abaixo"],
  },
  {
    value: "chip",
    label: "C — Chip de filtro",
    pros: ["Familiar (padrão de filtros)", "Comunica 'você está filtrando'", "Compacto"],
    cons: ["Pode não ser óbvio que é o back", "Metáfora de filtro nem sempre encaixa na navegação"],
  },
  {
    value: "separator",
    label: "D — Separator",
    pros: ["Header de seção limpo", "Separa visualmente contexto do conteúdo"],
    cons: ["Back pequeno — área de clique reduzida", "Uppercase pode parecer rígido demais"],
  },
] as const

type PanelVariant = typeof PANEL_VARIANTS[number]["value"]

export function IntegrationShell() {
  const [section, setSection] = useState<Section>("canvas")
  const [panelVariant, setPanelVariant] = useState<PanelVariant>("classic")
  const [floatPos, setFloatPos] = useState({ x: 16, y: 16 })
  const dragOffset = useRef({ x: 0, y: 0 })
  const [triggerPanelOpen, setTriggerPanelOpen] = useState(false)
  const [hasTrigger, setHasTrigger] = useState(false)

  // add mode
  const [configComp, setConfigComp] = useState<ComponentDef | null>(null)
  const [pendingNode, setPendingNode] = useState<{ compId: string; label: string } | null>(null)

  // edit mode
  const [editTarget, setEditTarget] = useState<{ nodeId: string; compId: string; label: string } | null>(null)
  const [pendingUpdate, setPendingUpdate] = useState<{ nodeId: string; label: string } | null>(null)

  const drawerOpen = configComp !== null || editTarget !== null
  const drawerComp = editTarget
    ? (ALL_COMPONENTS.find((c) => c.id === editTarget.compId) ?? null)
    : configComp

  function closeDrawer() {
    setConfigComp(null)
    setEditTarget(null)
  }

  return (
    <IntegrationContext.Provider value={{
      openEdit: (nodeId, compId, label) => setEditTarget({ nodeId, compId, label }),
    }}>
      {/* Floating variant picker */}
      <div
        className="fixed z-50 flex flex-col rounded-lg shadow-lg border border-gray-200 bg-white select-none overflow-hidden"
        style={{ left: floatPos.x, top: floatPos.y, fontFamily: "Noto Sans, sans-serif" }}
      >
        {/* Drag handle */}
        <div
          className="flex items-center justify-center py-1.5 bg-gray-50 border-b border-gray-100 cursor-grab active:cursor-grabbing"
          style={{ borderColor: "#f3f4f6" }}
          onMouseDown={(e) => {
            dragOffset.current = { x: e.clientX - floatPos.x, y: e.clientY - floatPos.y }
            const onMove = (ev: MouseEvent) => setFloatPos({ x: ev.clientX - dragOffset.current.x, y: ev.clientY - dragOffset.current.y })
            const onUp = () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp) }
            window.addEventListener("mousemove", onMove)
            window.addEventListener("mouseup", onUp)
          }}
        >
          <GripHorizontal size={14} className="text-gray-300" />
        </div>
        <div className="px-3 py-2.5">
        <div className="flex flex-col gap-2" onMouseDown={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af" }}>Variante</span>
            <select
              value={panelVariant}
              onChange={(e) => setPanelVariant(e.target.value as PanelVariant)}
              className="text-[12px] rounded border border-gray-200 bg-white px-2 py-0.5 outline-none cursor-pointer"
              style={{ color: "#374151" }}
            >
              {PANEL_VARIANTS.map((v) => (
                <option key={v.value} value={v.value}>{v.label}</option>
              ))}
            </select>
          </div>

          {(() => {
            const active = PANEL_VARIANTS.find((v) => v.value === panelVariant)!
            return (
              <div className="flex gap-3" style={{ fontSize: 11, fontFamily: "Noto Sans, sans-serif" }}>
                <div className="flex flex-col gap-1">
                  <span style={{ fontWeight: 700, color: "#16a34a" }}>Prós</span>
                  {active.pros.map((p) => (
                    <span key={p} style={{ color: "#374151" }}>+ {p}</span>
                  ))}
                </div>
                <div style={{ width: 1, backgroundColor: "#f3f4f6", flexShrink: 0 }} />
                <div className="flex flex-col gap-1">
                  <span style={{ fontWeight: 700, color: "#dc2626" }}>Contras</span>
                  {active.cons.map((c) => (
                    <span key={c} style={{ color: "#374151" }}>− {c}</span>
                  ))}
                </div>
              </div>
            )
          })()}
        </div>
        </div>
      </div>

      <div className="flex h-screen overflow-hidden" style={{ fontFamily: "Noto Sans, sans-serif" }}>
        <LeftNav active={section} onChange={(s) => { setSection(s); if (s !== "canvas") setTriggerPanelOpen(false) }} />

        <div className="flex flex-col flex-1 overflow-hidden">
          <IntegrationHeader />

          {section === "canvas" && (
            <>
              <CanvasToolbar
                triggerPanelOpen={triggerPanelOpen}
                onAddTrigger={() => setTriggerPanelOpen((v) => !v)}
              />
              <div className="relative flex flex-1 overflow-hidden">
                {triggerPanelOpen && (
                  <TriggerSidebar
                    onClose={() => setTriggerPanelOpen(false)}
                    onSelect={(id) => {
                      console.log("Trigger selecionado:", id)
                      setTriggerPanelOpen(false)
                    }}
                  />
                )}
                <IntegrationCanvas
                  pendingNode={pendingNode}
                  onPendingConsumed={() => setPendingNode(null)}
                  pendingUpdate={pendingUpdate}
                  onPendingUpdateConsumed={() => setPendingUpdate(null)}
                  onTriggerChange={setHasTrigger}
                />
                <ComponentPanel
                  variant={panelVariant}
                  hasTrigger={hasTrigger}
                  onAddTrigger={() => setTriggerPanelOpen(true)}
                  onConfigure={(comp) => setConfigComp(comp)}
                />
                <ConfigureDrawer
                  open={drawerOpen}
                  comp={drawerComp}
                  editTarget={editTarget}
                  onClose={closeDrawer}
                  onAdd={(comp, name) => setPendingNode({ compId: comp.id, label: name || comp.label })}
                  onEdit={(nodeId, name) => setPendingUpdate({ nodeId, label: name })}
                />
              </div>
            </>
          )}

          {section === "documentacao" && <TabDocumentacao />}
          {section === "implantacao"  && <TabImplantacao />}
          {section === "configuracao" && <TabConfiguracao />}

          {section === "publicacao" && (
            <div className="flex-1 flex items-center justify-center bg-white">
              <p style={{ fontSize: 13, color: "#9ca3af", fontFamily: "Noto Sans, sans-serif" }}>
                Publicação — em breve
              </p>
            </div>
          )}
        </div>
      </div>
    </IntegrationContext.Provider>
  )
}
