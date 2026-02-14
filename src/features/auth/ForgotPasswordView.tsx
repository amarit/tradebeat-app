import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

type ForgotPasswordViewProps = {
    email: string
    setEmail: (value: string) => void
    isLoading: boolean
    onSubmit: (e: React.FormEvent) => void
    setView: (view: "login" | "signup" | "forgot-password") => void
}

export function ForgotPasswordView({
    email,
    setEmail,
    isLoading,
    onSubmit,
    setView,
}: ForgotPasswordViewProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-foreground tracking-tight">
                    Reset your password
                </h2>
                <p className="text-sm text-muted-foreground">
                    {"Enter your email and we'll send you a reset link"}
                </p>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
    )
}
