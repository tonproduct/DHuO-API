"use client"

import dynamic from "next/dynamic"

export const ReactFlowCanvas = dynamic(
  () => import("./react-flow-canvas").then((m) => m.ReactFlowCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 h-full" style={{ backgroundColor: "#f1f5f9" }} />
    ),
  }
)
