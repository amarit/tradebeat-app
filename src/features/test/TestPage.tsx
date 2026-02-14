import { Button } from "@/components/ui/button"

export function TestPage() {
  return (
    <div className="p-10">
        <Button>Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
    </div>
  )
}