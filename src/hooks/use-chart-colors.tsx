import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

function getCSSVar(name: string): string {
  if (typeof window === "undefined") return ""
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value ? `${value}` : ""
}

  export function useChartColors() {
  const { resolvedTheme } = useTheme()
  const [colors, setColors] = useState({
    grid: "hsl(220 12% 18%)",
    tick: "hsl(215 12% 50%)",
    primary: "hsl(199 89% 48%)",
    profit: "hsl(152 69% 46%)",
    loss: "hsl(0 72% 51%)",
  })

  useEffect(() => {
    const style = getComputedStyle(document.documentElement)

    const get = (name: string, fallback: string) => {
      const value = style.getPropertyValue(name).trim()
      return value || fallback
    }

    setColors({
      grid: get("--border", colors.grid),
      tick: get("--muted-foreground", colors.tick),
      primary: get("--chart-1", colors.primary),
      profit: get("--profit", colors.profit),
      loss: get("--loss", colors.loss),
    })
  }, [resolvedTheme])

  return colors
}