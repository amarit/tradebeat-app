import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowRight, Eye, EyeOff } from "lucide-react"

type LoginViewProps = {
  email: string
  password: string
  setEmail: (value: string) => void
  setPassword: (value: string) => void
  showPassword: boolean
  setShowPassword: (value: boolean) => void
  isLoading: boolean
  onSubmit: (e: React.FormEvent) => void
  setView: (view: "login" | "signup" | "forgot-password") => void
}

export function LoginView({
  email,
  password,
  setEmail,
  setPassword,
  showPassword,
  setShowPassword,
  isLoading,
  onSubmit,
  setView,
}: LoginViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">
          Welcome back
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <button
              type="button"
              onClick={() => setView("forgot-password")}
              className="text-xs text-primary font-medium"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <Button type="submit" className="h-11 w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
          {!isLoading && <ArrowRight className="h-4 w-4 ml-2" />}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
            <span className="bg-background px-3 text-muted-foreground">
            New to TradeLog?
            </span>
        </div>
    </div>
    <Button
        variant="outline"
        className="h-11 w-full font-medium"
        onClick={() => setView("signup")}
        >
        Create an account
    </Button>
    </div>
  )
}
