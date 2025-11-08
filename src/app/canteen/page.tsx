"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  AlertCircle, 
  Check,
  ShoppingCart, 
  Coffee,
  UtensilsCrossed,
  Moon,
  Clock,
  IndianRupee,
  Trash2,
  CreditCard,
  QrCode,
  Heart,
  User,
  ShieldCheck,
  Home
} from "lucide-react"
import { toast } from "sonner"

interface MenuItem {
  id: string
  name: string
  price: number
  category: "breakfast" | "lunch" | "dinner"
}

const menuItems: MenuItem[] = [
  { id: "coffee", name: "Coffee", price: 15, category: "breakfast" },
  { id: "tea", name: "Tea", price: 10, category: "breakfast" },
  { id: "snacks", name: "Snacks", price: 25, category: "breakfast" },
  { id: "idly", name: "Idly", price: 20, category: "breakfast" },
  { id: "veg-meals", name: "Veg Meals", price: 60, category: "lunch" },
  { id: "non-veg-meals", name: "Non-Veg Meals", price: 80, category: "lunch" },
  { id: "curd-rice", name: "Curd Rice", price: 40, category: "lunch" },
  { id: "chapati", name: "Chapati", price: 30, category: "dinner" },
  { id: "chicken-curry", name: "Chicken Curry", price: 50, category: "dinner" },
  { id: "fried-rice", name: "Fried Rice", price: 70, category: "dinner" },
]

export default function CanteenPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<{ name: string; email: string; id: string; role: string } | null>(null)
  
  const [selectedMeal, setSelectedMeal] = useState<"breakfast" | "lunch" | "dinner">("breakfast")
  const [cart, setCart] = useState<MenuItem[]>([])
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showOTPVerification, setShowOTPVerification] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpStatus, setOtpStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus === "true") {
      const userName = localStorage.getItem("userName") || "User"
      const userEmail = localStorage.getItem("userEmail") || "user@example.com"
      const userId = localStorage.getItem("userID") || "EMP001"
      const userRole = localStorage.getItem("userRole") || "employee"
      setUser({ name: userName, email: userEmail, id: userId, role: userRole })
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const toggleCartItem = (item: MenuItem) => {
    if (cart.find((i) => i.id === item.id)) {
      setCart(cart.filter((i) => i.id !== item.id))
      toast.error(`${item.name} removed from cart`)
    } else {
      setCart([...cart, item])
      toast.success(`${item.name} added to cart`)
    }
  }

  const removeFromCart = (itemId: string) => {
    const item = cart.find((i) => i.id === itemId)
    setCart(cart.filter((i) => i.id !== itemId))
    if (item) {
      toast.error(`${item.name} removed from cart`)
    }
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0)
  }

  const verifyOTP = () => {
    if (otp === "1234") {
      setOtpStatus("success")
      setTimeout(() => {
        setShowOTPVerification(false)
        setShowPaymentModal(true)
        setOtpStatus("idle")
        setOtp("")
      }, 1000)
    } else {
      setOtpStatus("error")
      toast.error("Invalid OTP! Please try again.")
    }
  }

  const confirmOrder = () => {
    toast.success("✅ Payment received via Student Account QR! Order Confirmed.")
    setShowPaymentModal(false)
    setCart([])
  }

  const currentMenuItems = menuItems.filter((item) => item.category === selectedMeal)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Authentication Required
            </CardTitle>
            <CardDescription>
              Please sign in to access the canteen ordering system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/")} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <Heart className="h-3 w-3 text-red-500 absolute -top-1 -right-1 fill-red-500 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Company Canteen</h1>
              <p className="text-xs text-muted-foreground">Order your meals</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
              <Home className="h-5 w-5" />
            </Button>
            <Badge variant="secondary" className="gap-2">
              <User className="h-3 w-3" />
              <span className="font-semibold">{user.role.toUpperCase()}</span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-xs">ID: {user.id}</span>
            </Badge>
          </div>
        </div>
      </header>

      <main className="container px-4 sm:px-8 py-8 max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Welcome, {user.name}!
            <Heart className="h-6 w-6 text-red-500 fill-red-500 animate-pulse" />
          </h2>
          <p className="text-muted-foreground mt-1">
            Order delicious meals from our in-house canteen
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Menu Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* OTP Verification Card */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  OTP Verification
                </CardTitle>
                <CardDescription>
                  Verify your identity before placing an order
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Enter OTP (1234)"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={4}
                    />
                  </div>
                  <Button onClick={verifyOTP} disabled={!otp}>
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    Verify
                  </Button>
                </div>
                {otpStatus === "success" && (
                  <Alert className="mt-3 border-green-500/50 bg-green-500/10">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertDescription className="text-green-600 dark:text-green-400">
                      ✅ OTP Verified Successfully!
                    </AlertDescription>
                  </Alert>
                )}
                {otpStatus === "error" && (
                  <Alert variant="destructive" className="mt-3">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      ❌ Invalid OTP! Please try again.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Menu Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UtensilsCrossed className="h-5 w-5" />
                  Select Your Meal
                </CardTitle>
                <CardDescription>
                  Choose from our daily menu options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedMeal} onValueChange={(val) => setSelectedMeal(val as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="breakfast" className="gap-2">
                      <Coffee className="h-4 w-4" />
                      <span className="hidden sm:inline">Breakfast</span>
                      <span className="sm:hidden">🌅</span>
                    </TabsTrigger>
                    <TabsTrigger value="lunch" className="gap-2">
                      <UtensilsCrossed className="h-4 w-4" />
                      <span className="hidden sm:inline">Lunch</span>
                      <span className="sm:hidden">🌞</span>
                    </TabsTrigger>
                    <TabsTrigger value="dinner" className="gap-2">
                      <Moon className="h-4 w-4" />
                      <span className="hidden sm:inline">Dinner</span>
                      <span className="sm:hidden">🌙</span>
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-6 space-y-3">
                    {currentMenuItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={item.id}
                            checked={!!cart.find((i) => i.id === item.id)}
                            onCheckedChange={() => toggleCartItem(item)}
                          />
                          <Label
                            htmlFor={item.id}
                            className="text-base font-medium cursor-pointer"
                          >
                            {item.name}
                          </Label>
                        </div>
                        <Badge variant="secondary" className="gap-1">
                          <IndianRupee className="h-3 w-3" />
                          {item.price}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Your Cart
                  </span>
                  <Badge variant="secondary">{cart.length}</Badge>
                </CardTitle>
                <CardDescription>
                  Review your order before checkout
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-sm text-muted-foreground">Your cart is empty</p>
                    <p className="text-xs text-muted-foreground mt-1">Add items from the menu</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-4">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <IndianRupee className="h-3 w-3" />
                              {item.price}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="flex items-center gap-1 text-primary">
                          <IndianRupee className="h-5 w-5" />
                          {calculateTotal()}
                        </span>
                      </div>

                      <Button
                        className="w-full gap-2"
                        size="lg"
                        onClick={() => setShowPaymentModal(true)}
                        disabled={cart.length === 0}
                      >
                        <CreditCard className="h-4 w-4" />
                        Proceed to Payment
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-primary" />
              Payment Gateway
            </DialogTitle>
            <DialogDescription>
              Scan the QR code to complete your payment
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center p-6 bg-muted/50 rounded-lg">
              <div className="text-center">
                <QrCode className="h-32 w-32 mx-auto text-primary mb-3" />
                <p className="text-sm font-medium">Student Account QR</p>
                <p className="text-xs text-muted-foreground">Scan with your payment app</p>
              </div>
            </div>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items</span>
                    <span className="font-medium">{cart.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium flex items-center gap-1">
                      <IndianRupee className="h-3 w-3" />
                      {calculateTotal()}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base font-bold">
                    <span>Total Amount</span>
                    <span className="text-primary flex items-center gap-1">
                      <IndianRupee className="h-4 w-4" />
                      {calculateTotal()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowPaymentModal(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={confirmOrder} className="w-full sm:w-auto gap-2">
              <Check className="h-4 w-4" />
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
