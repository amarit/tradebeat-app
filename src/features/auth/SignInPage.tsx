import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BrandingPanel } from "./BrandingPanel"
import { LoginView } from "./LoginView"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  ArrowRight,
  Eye,
  EyeOff,
  TrendingUp,
  BarChart3,
  BookOpen,
} from "lucide-react"

type View = "login" | "signup" | "forgot-password"

export function SignInPage() {
//   const router = useRouter()
const navigate = useNavigate()
  const [view, setView] = useState<View>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Dummy login - just navigate to dashboard
    setTimeout(() => {
    //   router.push("/dashboard")
    navigate("/trades")
    }, 600)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
    //   router.push("/dashboard")
    navigate("/trades")
    }, 600)
  }

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setView("login")
    }, 600)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding panel */}
      <BrandingPanel />

      {/* Right side - Form */}
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

        <div className="w-full max-w-sm">
          {/* Login view */}
          {view === "login" && (
            <LoginView
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              isLoading={isLoading}
              onSubmit={handleLogin}
              setView={setView}
            />
          )}

          {/* Sign up view */}
          {view === "signup" && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-foreground tracking-tight">
                  Create your account
                </h2>
                <p className="text-sm text-muted-foreground">
                  Start tracking your trades in minutes
                </p>
              </div>

              <form onSubmit={handleSignup} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium text-foreground">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="signup-password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters
                  </p>
                </div>

                <Button
                  type="submit"
                  className="h-11 w-full mt-2 font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Create account
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-background px-3 text-muted-foreground">
                    Already have an account?
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                className="h-11 w-full font-medium"
                onClick={() => setView("login")}
              >
                Sign in instead
              </Button>
            </div>
          )}

          {/* Forgot password view */}
          {view === "forgot-password" && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-foreground tracking-tight">
                  Reset your password
                </h2>
                <p className="text-sm text-muted-foreground">
                  {"Enter your email and we'll send you a reset link"}
                </p>
              </div>

              <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="reset-email" className="text-sm font-medium text-foreground">
                    Email
                  </Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="h-11 w-full mt-2 font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Sending link...
                    </span>
                  ) : (
                    "Send reset link"
                  )}
                </Button>
              </form>

              <Button
                variant="ghost"
                className="w-full font-medium text-muted-foreground"
                onClick={() => setView("login")}
              >
                Back to sign in
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

