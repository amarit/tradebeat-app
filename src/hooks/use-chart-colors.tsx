import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

function getCSSVar(name: string): string {
  if (typeof window === "undefined") return ""
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value ? `hsl(${value})` : ""
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
    // Small delay to ensure CSS variables are updated after theme switch
    const timer = setTimeout(() => {
      setColors({
        grid: getCSSVar("--chart-grid"),
        tick: getCSSVar("--chart-tick"),
        primary: getCSSVar("--primary"),
        profit: getCSSVar("--profit"),
        loss: getCSSVar("--loss"),
      })
    }, 50)
    return () => clearTimeout(timer)
  }, [resolvedTheme])

  return colors
}