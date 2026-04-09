import { LeftSidebar } from "./_components/left-sidebar"
import { SectionHeader } from "./_components/section-header"
import { CanvasSearchBar } from "./_components/canvas-area"
import { ReactFlowCanvas } from "./_components/react-flow-canvas-loader"
import { ComponentPanel } from "./_components/component-panel"

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: "Noto Sans, sans-serif" }}>
      <LeftSidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <SectionHeader />

        {/* Full-width canvas search bar (header-info) */}
        <CanvasSearchBar />

        {/* Canvas row: React Flow + right component panel */}
        <div className="flex flex-1 overflow-hidden">
          <ReactFlowCanvas />
          <ComponentPanel />
        </div>
      </div>
    </div>
  )
}
