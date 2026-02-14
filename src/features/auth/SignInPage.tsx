import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BrandingPanel } from "./BrandingPanel"
import { AuthPanel } from "./AuthPanel"
import { LoginView } from "./LoginView"
import { SignupView } from "./SignupView"
import { ForgotPasswordView } from "./ForgotPasswordView"

type View = "login" | "signup" | "forgot-password"

export function SignInPage() {
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
      navigate("/trades")
    }, 600)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
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
      <BrandingPanel />

      <AuthPanel>
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

        {view === "signup" && (
          <SignupView
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
            onSubmit={handleSignup}
            setView={setView}
          />
        )}

        {view === "forgot-password" && (
          <ForgotPasswordView
            email={email}
            setEmail={setEmail}
            isLoading={isLoading}
            onSubmit={handleForgotPassword}
            setView={setView}
          />
        )}
      </AuthPanel>
    </div>
  )
}

