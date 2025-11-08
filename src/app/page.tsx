"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  AlertCircle, 
  Check,
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Activity,
  TrendingUp,
  DollarSign,
  Package,
  Zap,
  UtensilsCrossed,
  Heart
} from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  // Login state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [isLoginLoading, setIsLoginLoading] = useState(false)

  // Register state
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("")
  const [registerError, setRegisterError] = useState("")
  const [isRegisterLoading, setIsRegisterLoading] = useState(false)

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus === "true") {
      const userName = localStorage.getItem("userName") || "User"
      const userEmail = localStorage.getItem("userEmail") || "user@example.com"
      setUser({ name: userName, email: userEmail })
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    setIsLoginLoading(true)

    // Validation
    if (!loginEmail || !loginPassword) {
      setLoginError("Please fill in all fields")
      setIsLoginLoading(false)
      return
    }

    if (!/\S+@\S+\.\S+/.test(loginEmail)) {
      setLoginError("Please enter a valid email address")
      setIsLoginLoading(false)
      return
    }

    // Simulate login
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userEmail", loginEmail)
      localStorage.setItem("userName", loginEmail.split("@")[0])
      localStorage.setItem("userID", "EMP" + Math.floor(Math.random() * 1000))
      localStorage.setItem("userRole", "employee")
      setUser({ 
        name: loginEmail.split("@")[0], 
        email: loginEmail 
      })
      setIsAuthenticated(true)
      setIsLoginLoading(false)
    }, 1000)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterError("")
    setIsRegisterLoading(true)

    // Validation
    if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
      setRegisterError("Please fill in all fields")
      setIsRegisterLoading(false)
      return
    }

    if (!/\S+@\S+\.\S+/.test(registerEmail)) {
      setRegisterError("Please enter a valid email address")
      setIsRegisterLoading(false)
      return
    }

    if (registerPassword.length < 8) {
      setRegisterError("Password must be at least 8 characters long")
      setIsRegisterLoading(false)
      return
    }

    if (registerPassword !== registerConfirmPassword) {
      setRegisterError("Passwords do not match")
      setIsRegisterLoading(false)
      return
    }

    // Simulate registration
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userEmail", registerEmail)
      localStorage.setItem("userName", registerName)
      localStorage.setItem("userID", "EMP" + Math.floor(Math.random() * 1000))
      localStorage.setItem("userRole", "employee")
      setUser({ name: registerName, email: registerEmail })
      setIsAuthenticated(true)
      setIsRegisterLoading(false)
    }, 1000)
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userID")
    localStorage.removeItem("userRole")
    setIsAuthenticated(false)
    setUser(null)
    setLoginEmail("")
    setLoginPassword("")
    setRegisterName("")
    setRegisterEmail("")
    setRegisterPassword("")
    setRegisterConfirmPassword("")
  }

  const passwordRequirements = [
    { met: registerPassword.length >= 8, text: "At least 8 characters" },
    { met: /[A-Z]/.test(registerPassword), text: "One uppercase letter" },
    { met: /[a-z]/.test(registerPassword), text: "One lowercase letter" },
    { met: /[0-9]/.test(registerPassword), text: "One number" },
  ]

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      icon: DollarSign,
      color: "text-green-600 dark:text-green-400"
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+180",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Products Sold",
      value: "12,234",
      change: "+19%",
      icon: Package,
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+4.2%",
      icon: TrendingUp,
      color: "text-orange-600 dark:text-orange-400"
    }
  ]

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Show Dashboard if authenticated
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-6 w-6" />
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => router.push("/canteen")}
                className="gap-2"
              >
                <UtensilsCrossed className="h-4 w-4" />
                <span className="hidden sm:inline">Canteen</span>
                <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <main className="container px-4 sm:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" />
                <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-3xl font-bold tracking-tight">
                  Welcome back, {user.name}!
                </h2>
                <p className="text-muted-foreground mt-1">
                  {user.email}
                </p>
                <Badge className="mt-2" variant="secondary">
                  <Activity className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-600 dark:text-green-400">
                      {stat.change}
                    </span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-full lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest updates and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "New user registration", time: "2 minutes ago", type: "success" },
                    { action: "Product updated", time: "1 hour ago", type: "info" },
                    { action: "Payment received", time: "3 hours ago", type: "success" },
                    { action: "System maintenance scheduled", time: "5 hours ago", type: "warning" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`h-2 w-2 rounded-full ${
                        activity.type === 'success' 
                          ? 'bg-green-500' 
                          : activity.type === 'warning' 
                          ? 'bg-orange-500' 
                          : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  className="w-full justify-start gap-2" 
                  variant="outline"
                  onClick={() => router.push("/canteen")}
                >
                  <UtensilsCrossed className="h-4 w-4" />
                  Order from Canteen
                  <Heart className="h-3 w-3 text-red-500 fill-red-500 ml-auto animate-pulse" />
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Package className="h-4 w-4 mr-2" />
                  View Products
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  // Show Login/Register if not authenticated
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Zap className="h-4 w-4" />
          <span>Welcome to our platform</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground text-center mb-3">
          Build something <span className="text-primary">amazing</span> today
        </h1>
        <p className="text-muted-foreground text-center mb-8 max-w-md">
          Join thousands of users who trust our platform to manage their projects efficiently
        </p>

        {/* Auth Card */}
        <Card className="w-full max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <CardHeader className="space-y-1 pb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>
            </CardHeader>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="text-center mb-2">
                    <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                    <CardDescription className="mt-1">
                      Enter your credentials to access your account
                    </CardDescription>
                  </div>
                  
                  {loginError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{loginError}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      disabled={isLoginLoading}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      disabled={isLoginLoading}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoginLoading}
                  >
                    {isLoginLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </CardContent>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="text-center mb-2">
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription className="mt-1">
                      Enter your information to get started
                    </CardDescription>
                  </div>

                  {registerError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{registerError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="John Doe"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      disabled={isRegisterLoading}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="you@example.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      disabled={isRegisterLoading}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      disabled={isRegisterLoading}
                      required
                    />
                    {registerPassword && (
                      <div className="space-y-1 pt-2">
                        {passwordRequirements.map((req, index) => (
                          <div 
                            key={index}
                            className="flex items-center gap-2 text-xs"
                          >
                            <Check 
                              className={`h-3 w-3 ${
                                req.met 
                                  ? "text-green-600 dark:text-green-400" 
                                  : "text-muted-foreground"
                              }`} 
                            />
                            <span 
                              className={
                                req.met 
                                  ? "text-green-600 dark:text-green-400" 
                                  : "text-muted-foreground"
                              }
                            >
                              {req.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirm Password</Label>
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      disabled={isRegisterLoading}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isRegisterLoading}
                  >
                    {isRegisterLoading ? "Creating account..." : "Create account"}
                  </Button>
                </CardContent>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}