import { TrendingUp } from "lucide-react"

type AuthPanelProps = {
  children: React.ReactNode
}

export function AuthPanel({ children }: AuthPanelProps) {
  return (
    <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-6 py-12">
      {/* Mobile logo */}
      <div className="mb-8 flex items-center gap-3 lg:hidden">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <TrendingUp className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-semibold text-foreground tracking-tight">
          TradeLog
        </span>
      </div>

      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
