import { cn } from "@/lib/utils"

interface TooltipProps {
    active?: boolean
    payload?: Array<{ value: number }>
    label?: string
    variant?: "default" | "pnl"
}

export function Tooltip({ active, payload, label, variant = "default" }: TooltipProps) {
    if (active && payload && payload.length) {
        const value = payload[0].value
        const isPnl = variant === "pnl"
        const isPositive = value >= 0

        return (
            <div className="rounded-sm border border-border bg-popover px-3 py-2 text-xs shadow-lg">
                <p className="text-muted-foreground">{label}</p>
                <p
                    className={cn(
                        "font-mono font-semibold",
                        isPnl && isPositive && "text-profit",
                        isPnl && !isPositive && "text-loss",
                        !isPnl && "text-foreground"
                    )}
                >
                    {isPnl && isPositive ? "+" : ""}
                    ${value.toLocaleString()}
                </p>
            </div>
        )
    }
    return null
}
