"use client"

import { useCallback, useEffect, useRef } from "react"
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Node,
  type Edge,
  type OnConnect,
} from "@xyflow/react"
import { Save } from "lucide-react"
import { nodeTypes } from "./nodes/component-node"

// ─── Inner flow component ───

function FlowInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const { screenToFlowPosition } = useReactFlow()
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Keep latest refs so native listeners always have fresh values
  const stfpRef = useRef(screenToFlowPosition)
  const setNodesRef = useRef(setNodes)
  stfpRef.current = screenToFlowPosition
  setNodesRef.current = setNodes

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  // Native DOM listeners — bypass React event system to avoid React Flow eating the events
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const onDragOver = (e: DragEvent) => {
      e.preventDefault()
      if (e.dataTransfer) e.dataTransfer.dropEffect = "move"
    }

    const onDrop = (e: DragEvent) => {
      e.preventDefault()
      const compId = e.dataTransfer?.getData("text/plain") ?? ""
      if (!compId) return

      const position = stfpRef.current({ x: e.clientX, y: e.clientY })
      setNodesRef.current((nds) => [
        ...nds,
        {
          id: `${compId}-${Date.now()}`,
          type: "componentNode",
          position,
          data: { compId },
        },
      ])
    }

    el.addEventListener("dragover", onDragOver)
    el.addEventListener("drop", onDrop)
    return () => {
      el.removeEventListener("dragover", onDragOver)
      el.removeEventListener("drop", onDrop)
    }
  }, []) // mount once — values accessed via ref

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView={false}
        deleteKeyCode="Delete"
        style={{ background: "#f1f5f9", width: "100%", height: "100%" }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={48}
          size={1}
          color="#94a3b8"
          style={{ backgroundColor: "#f1f5f9" }}
        />

        <Controls
          position="bottom-left"
          style={{
            borderRadius: 0,
            border: "1px solid #eeeeee",
            boxShadow: "none",
          }}
        />

        <MiniMap
          position="bottom-right"
          style={{ border: "1px solid #eaeaea", borderRadius: 0 }}
          maskColor="rgba(241,245,249,0.7)"
        />

        <Panel position="top-right">
          <button
            className="flex items-center gap-2 rounded-full px-5 py-2 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#bcbcbc" }}
          >
            <Save size={18} color="white" />
            <span
              className="text-white font-bold text-sm"
              style={{ fontFamily: "Noto Sans, sans-serif", fontWeight: 700 }}
            >
              Salvar
            </span>
          </button>
        </Panel>
      </ReactFlow>
    </div>
  )
}

// ─── Public component ───

export function ReactFlowCanvas() {
  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
      <ReactFlowProvider>
        <FlowInner />
      </ReactFlowProvider>
    </div>
  )
}
