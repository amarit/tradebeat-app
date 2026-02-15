import { NavLink, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart3,
  BookOpen,
  Plus,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react"
import { useTheme } from "next-themes"

const navItems = [
  { label: "Dashboard", path: "dashboard", icon: LayoutDashboard },
  { label: "Trades", path: "sv/trades", icon: ArrowLeftRight },
  { label: "Analytics", path: "analytics", icon: BarChart3 },
  { label: "Journal", path: "journal", icon: BookOpen },
]

interface AppSidebarProps {
  onLogTrade: () => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export function Sidebar({
  onLogTrade,
  collapsed,
  onToggleCollapse,
}: AppSidebarProps) {
  const { lang } = useParams()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <aside
        className={cn(
            "flex h-full flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out",
            collapsed ? "w-[72px]" : "w-[240px]"
        )}
        >
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary">
          <ArrowLeftRight className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="text-sm font-semibold text-foreground tracking-tight">
            TradeLog
          </span>
        )}
      </div>

      {/* Log Trade CTA */}
      <div className="px-3 pt-4 pb-2">
        <button
          onClick={onLogTrade}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
            collapsed && "px-0"
          )}
        >
          <Plus className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Log Trade</span>}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
                const Icon = item.icon

                return (
                    <li key={item.path}>
                    <NavLink
                        to={lang ? `/${lang}/${item.path}` : `/${item.path}`}
                        className={({ isActive }) =>
                        cn(
                            "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                            isActive
                            ? "bg-sidebar-accent text-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground",
                            collapsed && "justify-center px-0"
                        )
                        }
                    >
                        <Icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                    </li>
                )
                })}
        </ul>
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-sidebar-border px-3 py-3">
        <button
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        className={cn(
            "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent",
            collapsed && "justify-center px-0"
        )}
        >
        {resolvedTheme === "dark" ? (
            <Sun className="h-4 w-4" />
        ) : (
            <Moon className="h-4 w-4" />
        )}
        {!collapsed && (
            <span>
            {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
        )}
        </button>

        <button
          className={cn(
            "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground",
            collapsed && "justify-center px-0"
          )}
        >
          <Settings className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>
        <button
          onClick={onToggleCollapse}
          className={cn(
            "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground",
            collapsed && "justify-center px-0"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
