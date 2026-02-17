import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
    label: string
    value: string
    change?: string
    changeLabel?: string
    icon: LucideIcon
    variant?: "default" | "profit" | "loss"
}

export function MetricCard({
    label,
    value,
    change,
    changeLabel,
    icon: Icon,
    variant = "default",
}: MetricCardProps) {
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
