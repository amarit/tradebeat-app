import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  TrendingUp,
  TrendingDown,
  Target,
  Flame,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { useChartColors } from "@/hooks/use-chart-colors"

const periods = ["Today", "This Week", "This Month"] as const
type Period = (typeof periods)[number]

const equityCurveData = [
  { date: "Mon", balance: 24800 },
  { date: "Tue", balance: 25120 },
  { date: "Wed", balance: 24950 },
  { date: "Thu", balance: 25400 },
  { date: "Fri", balance: 25830 },
  { date: "Sat", balance: 25830 },
  { date: "Sun", balance: 25830 },
]

const dailyPnlData = [
  { date: "Feb 3", pnl: 320 },
  { date: "Feb 4", pnl: -170 },
  { date: "Feb 5", pnl: 450 },
  { date: "Feb 6", pnl: -80 },
  { date: "Feb 7", pnl: 430 },
  { date: "Feb 10", pnl: 210 },
  { date: "Feb 11", pnl: -120 },
  { date: "Feb 12", pnl: 380 },
  { date: "Feb 13", pnl: 0 },
]

const recentTrades = [
  { id: 1, asset: "AAPL", direction: "Long", pnl: 245.0, time: "10:32 AM", tags: ["Breakout"] },
  { id: 2, asset: "TSLA", direction: "Short", pnl: -89.5, time: "11:15 AM", tags: ["Mean Reversion"] },
  { id: 3, asset: "SPY", direction: "Long", pnl: 132.0, time: "1:45 PM", tags: ["Momentum"] },
  { id: 4, asset: "NVDA", direction: "Long", pnl: 310.0, time: "2:20 PM", tags: ["Breakout"] },
  { id: 5, asset: "AMZN", direction: "Short", pnl: -45.0, time: "3:10 PM", tags: ["Scalp"] },
]

function MetricCard({
  label,
  value,
  change,
  changeLabel,
  icon: Icon,
  variant = "default",
}: {
  label: string
  value: string
  change?: string
  changeLabel?: string
  icon: typeof TrendingUp
  variant?: "default" | "profit" | "loss"
}) {
  return (
    <div className="flex flex-col gap-3 rounded-sm bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-[9px] tracking-wide font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex items-end justify-between">
        <span
          className={cn(
            "text-3xl font-semibold font-mono tracking-tight",
            variant === "profit" && "text-profit",
            variant === "loss" && "text-loss",
            variant === "default" && "text-foreground"
          )}
        >
          {value}
        </span>
        {change && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium",
              change.startsWith("+") ? "text-profit" : "text-loss"
            )}
          >
            {change.startsWith("+") ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {change}
            {changeLabel && (
              <span className="ml-1 text-muted-foreground">{changeLabel}</span>
            )}
          </span>
        )}
      </div>
    </div>
  )
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-sm border border-border bg-popover px-3 py-2 text-xs shadow-lg">
        <p className="text-muted-foreground">{label}</p>
        <p className={cn("font-mono font-semibold", payload[0].value >= 0 ? "text-profit" : "text-loss")}>
          {payload[0].value >= 0 ? "+" : ""}
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

function EquityTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-sm border border-border bg-popover px-3 py-2 text-xs shadow-lg">
        <p className="text-muted-foreground">{label}</p>
        <p className="font-mono font-semibold text-foreground">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

export function DashboardPage() {
  const [period, setPeriod] = useState<Period>("This Week")
  const chartColors = useChartColors()

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Thursday, Feb 13, 2026
          </p>
        </div>
        <div className="flex items-center rounded-sm border border-border bg-card p-0.5">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "rounded-sm px-3 py-1.5 text-xs font-medium transition-colors",
                period === p
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-4 text-5xl">
        <MetricCard
          label="Net P&L"
          value="+$1,030"
          change="+12.4%"
          changeLabel="vs last week"
          icon={TrendingUp}
          variant="profit"
        />
        <MetricCard
          label="Win Rate"
          value="68%"
          change="+3.2%"
          icon={Target}
        />
        <MetricCard
          label="Trades"
          value="14"
          change="+2"
          changeLabel="vs avg"
          icon={Flame}
        />
        <MetricCard
          label="Avg R:R"
          value="2.1x"
          change="-0.3x"
          icon={TrendingDown}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-5 gap-4">
        {/* Equity Curve */}
        <div className="col-span-3 rounded-sm bg-card shadow-sm p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm text-base font-semibold tracking-tight text-foreground">
              Equity Curve
            </h2>
            <span className="font-mono text-sm text-muted-foreground">
              $25,830
            </span>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={equityCurveData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: chartColors.tick }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: chartColors.tick }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
                  domain={["dataMin - 200", "dataMax + 200"]}
                />
                <Tooltip content={<EquityTooltip />} />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke={chartColors.primary}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: chartColors.primary, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily P&L */}
        <div className="col-span-2 rounded-sm bg-card shadow-sm p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm text-base font-semibold tracking-tight text-foreground">Daily P&L</h2>
            <span className="text-xs text-muted-foreground">Last 9 days</span>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyPnlData}>
                <CartesianGrid strokeDasharray="2 4" stroke={chartColors.grid} vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: chartColors.tick }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: chartColors.tick }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="pnl" radius={[3, 3, 0, 0]}>
                  {dailyPnlData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.pnl >= 0 ? chartColors.profit : chartColors.loss}
                      opacity={0.85}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Trades */}
      <div className="rounded-sm bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
          <h2 className="text-sm text-base font-semibold tracking-tight text-foreground">
            Recent Trades
          </h2>
          <button className="text-xs font-medium text-primary hover:underline">
            View All
          </button>
        </div>
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/10 text-left">
                <th className="px-4 py-2.5 text-xs font-semibold font-medium text-muted-foreground uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-4 py-2.5 text-xs font-semibold font-medium text-muted-foreground uppercase tracking-wider">
                  Direction
                </th>
                <th className="px-4 py-2.5 text-xs font-semibold font-medium text-muted-foreground uppercase tracking-wider">
                  P&L
                </th>
                <th className="px-4 py-2.5 text-xs font-semibold font-medium text-muted-foreground uppercase tracking-wider">
                  Time
                </th>
                <th className="px-4 py-2.5 text-xs font-semibold font-medium text-muted-foreground uppercase tracking-wider">
                  Tags
                </th>
              </tr>
            </thead>
            <tbody>
              {recentTrades.map((trade) => (
                <tr
                  key={trade.id}
                  className="border-b border-border/50 transition-colors last:border-0 hover:bg-secondary/20"
                >
                  <td className="px-4 py-2.5 text-sm font-medium font-mono text-foreground">
                    {trade.asset}
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={cn(
                        "text-xs font-medium",
                        trade.direction === "Long"
                          ? "text-profit"
                          : "text-loss"
                      )}
                    >
                      {trade.direction}
                    </span>
                  </td>
                  <td
                    className={cn(
                      "px-4 py-2.5 font-mono text-sm font-medium",
                      trade.pnl >= 0 ? "text-profit" : "text-loss"
                    )}
                  >
                    {trade.pnl >= 0 ? "+" : ""}${Math.abs(trade.pnl).toFixed(2)}
                  </td>
                  <td className="px-4 py-2.5 text-sm text-muted-foreground font-mono">
                    {trade.time}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-1.5">
                      {trade.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-sm bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}