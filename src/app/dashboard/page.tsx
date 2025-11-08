"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Activity,
  TrendingUp,
  DollarSign,
  Package,
  Moon
} from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Load user data
    const userName = localStorage.getItem("userName") || "User"
    const userEmail = localStorage.getItem("userEmail") || "user@example.com"
    setUser({ name: userName, email: userEmail })
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-950 via-red-950 to-black">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-400"></div>
      </div>
    )
  }

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      icon: DollarSign,
      gradient: "from-red-500/20 to-orange-500/20",
      iconColor: "text-red-400"
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+180",
      icon: Users,
      gradient: "from-rose-500/20 to-pink-500/20",
      iconColor: "text-rose-400"
    },
    {
      title: "Products Sold",
      value: "12,234",
      change: "+19%",
      icon: Package,
      gradient: "from-orange-500/20 to-amber-500/20",
      iconColor: "text-orange-400"
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+4.2%",
      icon: TrendingUp,
      gradient: "from-red-500/20 to-rose-500/20",
      iconColor: "text-red-400"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950/30 via-red-950/20 to-black relative overflow-hidden">
      {/* Red Moon Background Effect */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-40 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-red-900/20 bg-black/40 backdrop-blur-xl supports-[backdrop-filter]:bg-black/30">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Moon className="h-6 w-6 text-red-400" />
              <div className="absolute inset-0 blur-md bg-red-500/50 -z-10" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
              Red Moon Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hover:bg-red-500/10 hover:text-red-400">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="hover:bg-red-500/10 hover:text-red-400">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 sm:px-8 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16 ring-2 ring-red-500/50">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" />
                <AvatarFallback className="bg-gradient-to-br from-red-600 to-rose-600 text-white">
                  {user?.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 blur-lg bg-red-500/30 -z-10" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-red-200 to-rose-300 bg-clip-text text-transparent">
                Welcome back, {user?.name}!
              </h2>
              <p className="text-red-300/60 mt-1">
                {user?.email}
              </p>
              <Badge className="mt-2 bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30">
                <Activity className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-red-900/30" />

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden border-red-900/30 bg-black/40 backdrop-blur-sm hover:border-red-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-50`} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-red-100/90">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-2xl font-bold text-red-50">{stat.value}</div>
                <p className="text-xs text-red-300/60 mt-1">
                  <span className="text-red-400 font-semibold">
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
          <Card className="col-span-full lg:col-span-2 border-red-900/30 bg-black/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-red-100">Recent Activity</CardTitle>
              <CardDescription className="text-red-300/60">
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
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-red-500/5 transition-colors">
                    <div className={`h-2 w-2 rounded-full ${
                      activity.type === 'success' 
                        ? 'bg-red-400 shadow-lg shadow-red-400/50' 
                        : activity.type === 'warning' 
                        ? 'bg-orange-400 shadow-lg shadow-orange-400/50' 
                        : 'bg-rose-400 shadow-lg shadow-rose-400/50'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-100">{activity.action}</p>
                      <p className="text-xs text-red-300/50">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-900/30 bg-black/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-red-100">Quick Actions</CardTitle>
              <CardDescription className="text-red-300/60">
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start bg-red-500/10 hover:bg-red-500/20 text-red-200 border border-red-500/30" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button className="w-full justify-start bg-red-500/10 hover:bg-red-500/20 text-red-200 border border-red-500/30" variant="outline">
                <Package className="h-4 w-4 mr-2" />
                View Products
              </Button>
              <Button className="w-full justify-start bg-red-500/10 hover:bg-red-500/20 text-red-200 border border-red-500/30" variant="outline">
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