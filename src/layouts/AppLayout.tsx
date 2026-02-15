import { useState } from "react"
import { Sidebar } from "@/components/core/Sidebar"
import { Outlet } from "react-router-dom"

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onLogTrade={() => {}}
      />

      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}