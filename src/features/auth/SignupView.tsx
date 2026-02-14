import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowRight, Eye, EyeOff } from "lucide-react"

type SignupViewProps = {
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

export function SignupView({
    email,
    password,
    setEmail,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    onSubmit,
    setView,
}: SignupViewProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-foreground tracking-tight">
                    Create your account
                </h2>
                <p className="text-sm text-muted-foreground">
                    Start tracking your trades in minutes
                </p>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
    )
}
