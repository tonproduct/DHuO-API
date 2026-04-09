import { Handle, Position, type NodeProps } from "@xyflow/react"
import { COMPONENT_TYPES } from "../component-types"

export type ComponentNodeData = {
  compId: string
}

export function ComponentNode({ data }: NodeProps) {
  const comp =
    COMPONENT_TYPES.find((c) => c.id === (data as ComponentNodeData).compId) ??
    COMPONENT_TYPES[0]

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        height: 54,
        minWidth: 180,
        padding: "0 12px 0 8px",
        background: "#ffffff",
        border: "1px solid #cbcbcb",
        borderRadius: 4,
        fontFamily: "Noto Sans, sans-serif",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#8e3ccb", width: 8, height: 8, border: "none" }}
      />

      {/* Icon badge */}
      <div
        style={{
          width: 40,
          height: 28,
          borderRadius: 4,
          background: comp.bg,
          color: comp.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {comp.abbr}
      </div>

      {/* Label */}
      <span
        style={{
          fontSize: 13,
          fontWeight: 400,
          color: "#6e6e6e",
          textTransform: "uppercase",
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
        }}
      >
        {comp.label}
      </span>

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#8e3ccb", width: 8, height: 8, border: "none" }}
      />
    </div>
  )
}

export const nodeTypes = { componentNode: ComponentNode }
