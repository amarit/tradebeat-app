import { useState, useMemo, useCallback } from "react"
import { cn } from "@/lib/utils"
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ImageIcon,
  MessageSquare,
  Plus,
  Trash2,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

/* ─── Types ─── */

interface Execution {
  id: number
  dateTime: string
  action: "BUY" | "SELL"
  type: "Share" | "Option" | "Future"
  quantity: number
  price: number
  fee: number
  commission: number
  position: number
  grossPL: number
}

interface Trade {
  id: number
  date: string
  time: string
  asset: string
  direction: "Long" | "Short"
  entry: number
  exit: number
  size: number
  pnl: number
  rr: number
  tags: string[]
  setup: string
  notes: string
  hasScreenshot: boolean
  executions: Execution[]
}

type SortKey = "date" | "asset" | "direction" | "entry" | "exit" | "size" | "pnl" | "rr" | "setup"
type SortDir = "asc" | "desc"

/* ─── Mock data ─── */

const trades: Trade[] = [
  {
    id: 1,
    date: "2026-02-13",
    time: "10:32",
    asset: "AAPL",
    direction: "Long",
    entry: 242.5,
    exit: 244.95,
    size: 100,
    pnl: 245.0,
    rr: 2.4,
    tags: ["Breakout", "High Vol"],
    setup: "Bull Flag Breakout",
    notes: "Clean breakout above resistance at $242.30.",
    hasScreenshot: true,
    executions: [
      { id: 1, dateTime: "2026-02-13 10:32:14", action: "BUY", type: "Share", quantity: 100, price: 242.50, fee: 1.20, commission: 4.95, position: 100, grossPL: 0 },
      { id: 2, dateTime: "2026-02-13 11:45:08", action: "SELL", type: "Share", quantity: -50, price: 244.10, fee: 0.80, commission: 4.95, position: 50, grossPL: 80.00 },
      { id: 3, dateTime: "2026-02-13 12:10:33", action: "SELL", type: "Share", quantity: -50, price: 244.95, fee: 0.80, commission: 4.95, position: 0, grossPL: 165.00 },
    ],
  },
  {
    id: 2,
    date: "2026-02-13",
    time: "11:15",
    asset: "TSLA",
    direction: "Short",
    entry: 318.2,
    exit: 319.1,
    size: 50,
    pnl: -89.5,
    rr: -0.8,
    tags: ["Mean Reversion"],
    setup: "Failed Breakdown",
    notes: "Entered short on break below support. Reversed quickly.",
    hasScreenshot: false,
    executions: [
      { id: 4, dateTime: "2026-02-13 11:15:22", action: "SELL", type: "Share", quantity: -50, price: 318.20, fee: 1.50, commission: 4.95, position: -50, grossPL: 0 },
      { id: 5, dateTime: "2026-02-13 11:42:10", action: "BUY", type: "Share", quantity: 50, price: 319.10, fee: 1.50, commission: 4.95, position: 0, grossPL: -89.50 },
    ],
  },
  {
    id: 3,
    date: "2026-02-12",
    time: "09:45",
    asset: "SPY",
    direction: "Long",
    entry: 605.3,
    exit: 606.62,
    size: 200,
    pnl: 264.0,
    rr: 1.8,
    tags: ["Momentum", "Opening Range"],
    setup: "ORB Long",
    notes: "Opening range breakout. Strong bid on open.",
    hasScreenshot: true,
    executions: [
      { id: 6, dateTime: "2026-02-12 09:45:05", action: "BUY", type: "Share", quantity: 200, price: 605.30, fee: 2.00, commission: 4.95, position: 200, grossPL: 0 },
      { id: 7, dateTime: "2026-02-12 10:20:18", action: "SELL", type: "Share", quantity: -100, price: 606.10, fee: 1.00, commission: 4.95, position: 100, grossPL: 80.00 },
      { id: 8, dateTime: "2026-02-12 10:55:44", action: "SELL", type: "Share", quantity: -100, price: 606.62, fee: 1.00, commission: 4.95, position: 0, grossPL: 184.00 },
    ],
  },
  {
    id: 4,
    date: "2026-02-12",
    time: "13:20",
    asset: "NVDA",
    direction: "Long",
    entry: 890.0,
    exit: 896.2,
    size: 50,
    pnl: 310.0,
    rr: 3.1,
    tags: ["Breakout"],
    setup: "VWAP Reclaim",
    notes: "Strong reclaim of VWAP after morning sell-off.",
    hasScreenshot: true,
    executions: [
      { id: 9, dateTime: "2026-02-12 13:20:11", action: "BUY", type: "Share", quantity: 50, price: 890.00, fee: 2.50, commission: 4.95, position: 50, grossPL: 0 },
      { id: 10, dateTime: "2026-02-12 14:45:30", action: "SELL", type: "Share", quantity: -50, price: 896.20, fee: 2.50, commission: 4.95, position: 0, grossPL: 310.00 },
    ],
  },
  {
    id: 5,
    date: "2026-02-12",
    time: "15:10",
    asset: "AMZN",
    direction: "Short",
    entry: 225.8,
    exit: 226.25,
    size: 100,
    pnl: -45.0,
    rr: -0.5,
    tags: ["Scalp"],
    setup: "Failed Resistance Rejection",
    notes: "Attempted short at resistance. Small loss.",
    hasScreenshot: false,
    executions: [
      { id: 11, dateTime: "2026-02-12 15:10:02", action: "SELL", type: "Share", quantity: -100, price: 225.80, fee: 1.00, commission: 4.95, position: -100, grossPL: 0 },
      { id: 12, dateTime: "2026-02-12 15:28:55", action: "BUY", type: "Share", quantity: 100, price: 226.25, fee: 1.00, commission: 4.95, position: 0, grossPL: -45.00 },
    ],
  },
  {
    id: 6,
    date: "2026-02-11",
    time: "10:05",
    asset: "META",
    direction: "Long",
    entry: 612.4,
    exit: 615.8,
    size: 30,
    pnl: 102.0,
    rr: 1.7,
    tags: ["Gap Fill", "Momentum"],
    setup: "Gap and Go",
    notes: "Gapped up on earnings beat.",
    hasScreenshot: true,
    executions: [
      { id: 13, dateTime: "2026-02-11 10:05:33", action: "BUY", type: "Share", quantity: 30, price: 612.40, fee: 0.90, commission: 4.95, position: 30, grossPL: 0 },
      { id: 14, dateTime: "2026-02-11 11:30:20", action: "SELL", type: "Share", quantity: -30, price: 615.80, fee: 0.90, commission: 4.95, position: 0, grossPL: 102.00 },
    ],
  },
  {
    id: 7,
    date: "2026-02-11",
    time: "14:30",
    asset: "AMD",
    direction: "Short",
    entry: 168.9,
    exit: 166.5,
    size: 75,
    pnl: 180.0,
    rr: 2.0,
    tags: ["Breakdown"],
    setup: "Support Break",
    notes: "Clean break below $169 support on volume.",
    hasScreenshot: false,
    executions: [
      { id: 15, dateTime: "2026-02-11 14:30:45", action: "SELL", type: "Share", quantity: -75, price: 168.90, fee: 1.10, commission: 4.95, position: -75, grossPL: 0 },
      { id: 16, dateTime: "2026-02-11 15:15:10", action: "BUY", type: "Share", quantity: 75, price: 166.50, fee: 1.10, commission: 4.95, position: 0, grossPL: 180.00 },
    ],
  },
  {
    id: 8,
    date: "2026-02-10",
    time: "09:35",
    asset: "MSFT",
    direction: "Long",
    entry: 445.2,
    exit: 444.1,
    size: 40,
    pnl: -44.0,
    rr: -0.6,
    tags: ["Scalp"],
    setup: "Failed ORB",
    notes: "Opening range breakout failed. Hit stop within 3 minutes.",
    hasScreenshot: false,
    executions: [
      { id: 17, dateTime: "2026-02-10 09:35:08", action: "BUY", type: "Share", quantity: 40, price: 445.20, fee: 0.80, commission: 4.95, position: 40, grossPL: 0 },
      { id: 18, dateTime: "2026-02-10 09:38:22", action: "SELL", type: "Share", quantity: -40, price: 444.10, fee: 0.80, commission: 4.95, position: 0, grossPL: -44.00 },
    ],
  },
]

const filterOptions = ["All Setups", "Breakout", "Mean Reversion", "Momentum", "Scalp"]

/* ─── Executions sub-table component ─── */

function ExecutionsPanel({
  executions: initialExecutions,
}: {
  executions: Execution[]
}) {
  const [executions, setExecutions] = useState(initialExecutions)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  const toggleSelect = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const toggleSelectAll = useCallback(() => {
    setSelectedIds((prev) => {
      if (prev.size === executions.length) {
        return new Set()
      }
      return new Set(executions.map((e) => e.id))
    })
  }, [executions])

  const deleteSelected = useCallback(() => {
    setExecutions((prev) => prev.filter((e) => !selectedIds.has(e.id)))
    setSelectedIds(new Set())
  }, [selectedIds])

  const allSelected = executions.length > 0 && selectedIds.size === executions.length

  return (
    <div className="border-b border-border bg-secondary/5">
      <div className="px-5 py-4">
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground tracking-wide">
            Executions
          </h3>
          <div className="flex items-center gap-2">
            {selectedIds.size > 0 && (
              <button
                onClick={deleteSelected}
                className="flex items-center gap-1.5 rounded-md bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
              >
                <Trash2 className="h-3 w-3" />
                Delete selected ({selectedIds.size})
              </button>
            )}
            <button className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary">
              <Plus className="h-3 w-3" />
              Add execution
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/20 text-left">
                <th className="w-10 px-3 py-2.5">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all executions"
                  />
                </th>
                {["Date/Time", "Action", "Type", "Quantity", "Price", "Fee", "Commission", "Position", "Gross P/L"].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-3 py-3.5 text-left text-xs font-medium font-semibold text-muted-foreground tracking-wider"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {executions.map((exec, idx) => {
                const isSelected = selectedIds.has(exec.id)
                const isLast = idx === executions.length - 1
                return (
                  <tr
                    key={exec.id}
                    className={cn(
                      "transition-colors",
                      isSelected
                        ? "bg-accent/40"
                        : "hover:bg-secondary/20",
                      !isLast && "border-b border-border/50"
                    )}
                  >
                    <td className="w-10 px-3 py-3.5">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleSelect(exec.id)}
                        aria-label={`Select execution ${exec.id}`}
                      />
                    </td>
                    <td className="px-3 py-3.5 text-sm font-mono text-muted-foreground whitespace-nowrap">
                      {exec.dateTime}
                    </td>
                    <td className="px-3 py-3.5">
                      <span
                        className={cn(
                          "text-xs font-semibold uppercase tracking-wide",
                          exec.action === "BUY" ? "text-profit" : "text-loss"
                        )}
                      >
                        {exec.action}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-sm text-muted-foreground">
                      {exec.type}
                    </td>
                    <td className="px-3 py-3.5 text-sm font-mono text-foreground">
                      {exec.quantity}
                    </td>
                    <td className="px-3 py-3.5 text-sm font-mono text-foreground">
                      ${exec.price.toFixed(2)}
                    </td>
                    <td className="px-3 py-3.5 text-sm font-mono text-muted-foreground">
                      ${exec.fee.toFixed(2)}
                    </td>
                    <td className="px-3 py-3.5 text-sm font-mono text-muted-foreground">
                      ${exec.commission.toFixed(2)}
                    </td>
                    <td className="px-3 py-3.5 text-sm font-mono text-foreground">
                      {exec.position}
                    </td>
                    <td className="px-3 py-3.5">
                      <span
                        className={cn(
                          "text-sm font-mono font-medium",
                          exec.grossPL > 0 ? "text-profit" : exec.grossPL < 0 ? "text-loss" : "text-muted-foreground"
                        )}
                      >
                        {exec.grossPL > 0 ? "+" : ""}
                        {exec.grossPL === 0 ? "--" : `$${Math.abs(exec.grossPL).toFixed(2)}`}
                      </span>
                    </td>
                  </tr>
                )
              })}
              {executions.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-3 py-8 text-center text-sm text-muted-foreground">
                    No executions yet. Click "Add execution" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ─── Main component ─── */

export function TradeListPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("All Setups")
  const [showFilters, setShowFilters] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>("date")
  const [sortDir, setSortDir] = useState<SortDir>("desc")

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
  }

  const filteredAndSortedTrades = useMemo(() => {
    const filtered = trades.filter((t) => {
      const matchesSearch =
        searchQuery === "" ||
        t.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.setup.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesFilter =
        activeFilter === "All Setups" ||
        t.tags.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase()) ||
        t.setup.toLowerCase().includes(activeFilter.toLowerCase())
      return matchesSearch && matchesFilter
    })

    return [...filtered].sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case "date":
          cmp = (`${a.date} ${a.time}`).localeCompare(`${b.date} ${b.time}`)
          break
        case "asset":
          cmp = a.asset.localeCompare(b.asset)
          break
        case "direction":
          cmp = a.direction.localeCompare(b.direction)
          break
        case "entry":
          cmp = a.entry - b.entry
          break
        case "exit":
          cmp = a.exit - b.exit
          break
        case "size":
          cmp = a.size - b.size
          break
        case "pnl":
          cmp = a.pnl - b.pnl
          break
        case "rr":
          cmp = a.rr - b.rr
          break
        case "setup":
          cmp = a.setup.localeCompare(b.setup)
          break
      }
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [searchQuery, activeFilter, sortKey, sortDir])

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Trades</h1>
          <p className="text-sm text-muted-foreground">
            {trades.length} trades logged
          </p>
        </div>
      </div>

      {/* Search & Filters bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by asset, setup, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm transition-colors",
            showFilters ? "bg-secondary text-foreground" : "bg-card text-muted-foreground hover:text-foreground"
          )}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </button>
      </div>

      {/* Filter chips */}
      {showFilters && (
        <div className="flex items-center gap-2">
          {filterOptions.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                activeFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* Trades table */}
      <div className="rounded-sm bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-0" colSpan={10}>
                  <div className="grid grid-cols-[1.2fr_0.8fr_0.9fr_1fr_1fr_0.7fr_1.1fr_0.7fr_1.6fr_40px] items-center px-4 py-3.5">
                    {([
                      { label: "Date", key: "date" as SortKey },
                      { label: "Asset", key: "asset" as SortKey },
                      { label: "Direction", key: "direction" as SortKey },
                      { label: "Entry", key: "entry" as SortKey },
                      { label: "Exit", key: "exit" as SortKey },
                      { label: "Size", key: "size" as SortKey },
                      { label: "P&L", key: "pnl" as SortKey },
                      { label: "R:R", key: "rr" as SortKey },
                      { label: "Setup", key: "setup" as SortKey },
                      { label: "", key: "" as SortKey },
                    ]).map(({ label, key }) => (
                      <span
                        key={label || "expand"}
                        className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-semibold "
                      >
                        {label && (
                          <button
                            onClick={() => handleSort(key)}
                            className="flex items-center gap-1 hover:text-foreground transition-colors"
                          >
                            {label}
                            {sortKey === key ? (
                              sortDir === "asc" ? (
                                <ArrowUp className="h-3 w-3 text-primary" />
                              ) : (
                                <ArrowDown className="h-3 w-3 text-primary" />
                              )
                            ) : (
                              <ArrowUpDown className="h-3 w-3 opacity-40" />
                            )}
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedTrades.map((trade) => {
                const isExpanded = expandedId === trade.id
                return (
                  <tr key={trade.id} className="group">
                    {/* Main row + expanded detail */}
                    <td colSpan={10} className="p-0">
                      <div
                        className={cn(
                          "border-b transition-colors cursor-pointer",
                          isExpanded ? "border-border bg-secondary/30" : "border-border/50 hover:bg-secondary/20"
                        )}
                        onClick={() => setExpandedId(isExpanded ? null : trade.id)}
                      >
                        <div className="grid grid-cols-[1.2fr_0.8fr_0.9fr_1fr_1fr_0.7fr_1.1fr_0.7fr_1.6fr_40px] items-center px-4 py-3.5">
                          <span className="text-sm text-muted-foreground font-mono">
                            {trade.date.slice(5)}
                            <span className="ml-1 text-xs text-muted-foreground/60">{trade.time}</span>
                          </span>
                          <span className="text-sm font-medium font-mono text-foreground">
                            {trade.asset}
                          </span>
                          <span
                            className={cn(
                              "text-xs font-medium",
                              trade.direction === "Long" ? "text-profit" : "text-loss"
                            )}
                          >
                            {trade.direction}
                          </span>
                          <span className="text-sm font-mono text-muted-foreground">
                            ${trade.entry.toFixed(2)}
                          </span>
                          <span className="text-sm font-mono text-muted-foreground">
                            ${trade.exit.toFixed(2)}
                          </span>
                          <span className="text-sm font-mono text-muted-foreground">
                            {trade.size}
                          </span>
                          <span
                            className={cn(
                              "text-sm font-mono font-medium",
                              trade.pnl >= 0 ? "text-profit" : "text-loss"
                            )}
                          >
                            {trade.pnl >= 0 ? "+" : ""}${Math.abs(trade.pnl).toFixed(2)}
                          </span>
                          <span
                            className={cn(
                              "text-xs font-mono",
                              trade.rr >= 0 ? "text-profit" : "text-loss"
                            )}
                          >
                            {trade.rr >= 0 ? "+" : ""}{trade.rr.toFixed(1)}R
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="rounded-sm bg-secondary px-2 py-0.5 text-xs text-secondary-foreground truncate max-w-[140px]">
                              {trade.setup}
                            </span>
                            {trade.hasScreenshot && <ImageIcon className="h-3 w-3 text-muted-foreground/60" />}
                            {trade.notes && <MessageSquare className="h-3 w-3 text-muted-foreground/60" />}
                          </div>
                          <div className="flex justify-end">
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expanded: Executions panel */}
                      {isExpanded && (
                        <ExecutionsPanel executions={trade.executions} />
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
