import { TrendingUp, BarChart3, BookOpen } from "lucide-react"
import { FeatureItem } from "./FeatureItem" // om du bryter ut den, annars ta bort denna rad

export function BrandingPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-card flex-col justify-between p-12 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Logo */}
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground tracking-tight">
            TradeLog
          </span>
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-md">
        <h1 className="text-4xl font-bold text-foreground leading-tight text-balance">
          Log fast. Review clearly. Learn continuously.
        </h1>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          The trading journal built for serious traders who want to track
          performance, spot patterns, and improve every day.
        </p>

        <div className="mt-10 flex flex-col gap-4">
          <FeatureItem
            icon={<TrendingUp className="h-4 w-4" />}
            title="Real-time P&L tracking"
            description="Instantly see your profit and loss across all trades"
          />
          <FeatureItem
            icon={<BarChart3 className="h-4 w-4" />}
            title="In-depth analytics"
            description="Discover which setups and strategies perform best"
          />
          <FeatureItem
            icon={<BookOpen className="h-4 w-4" />}
            title="Daily journal"
            description="Capture your thoughts, emotions, and market notes"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <p className="text-sm text-muted-foreground">
          Trusted by traders worldwide
        </p>
      </div>
    </div>
  )
}
