import { Package, ShoppingCart, Users, AlertTriangle, TrendingUp, Activity } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const stats = [
    {
      label: "Total Productos",
      value: "1,234",
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      label: "Ventas Hoy",
      value: "S/ 12,450",
      icon: ShoppingCart,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      trend: "+12%",
    },
    {
      label: "Stock Bajo",
      value: "23",
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50 dark:bg-red-950/30",
    },
    {
      label: "Clientes",
      value: "567",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950/30",
      trend: "+8%",
    },
  ]

  const recentActivity = [
    { action: "Venta registrada", product: "Paracetamol 500mg", time: "5 min", icon: "💊" },
    { action: "Stock actualizado", product: "Amoxicilina 500mg", time: "15 min", icon: "📦" },
    { action: "Nuevo cliente", product: "María González", time: "1 hora", icon: "👤" },
    { action: "Alerta de vencimiento", product: "Ibuprofeno 600mg", time: "2 horas", icon: "⏰" },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/10 to-transparent border-b border-border/40 p-4 md:p-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Panel de Control</h1>
          <p className="text-sm text-muted-foreground">Bienvenido al sistema de gestión de inventario médico</p>
        </div>
      </div>

      <main className="container mx-auto px-3 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className={`p-4 ${stat.bg}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</p>
                    <p className="text-lg md:text-2xl font-bold mt-1 text-foreground">{stat.value}</p>
                    {stat.trend && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {stat.trend}
                      </p>
                    )}
                  </div>
                  <stat.icon className={`h-6 w-6 md:h-8 md:w-8 flex-shrink-0 opacity-80 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Activity Section */}
        <Card className="border">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="text-base md:text-lg font-semibold">Actividad Reciente</h3>
            </div>
            <div className="space-y-2 md:space-y-3">
              {recentActivity.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.action}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.product}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0 whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          <Button variant="outline" className="h-10 md:h-12 bg-transparent">
            <Package className="h-4 w-4 mr-2" />
            <span className="text-xs md:text-sm">Productos</span>
          </Button>
          <Button variant="outline" className="h-10 md:h-12 bg-transparent">
            <ShoppingCart className="h-4 w-4 mr-2" />
            <span className="text-xs md:text-sm">Ventas</span>
          </Button>
          <Button variant="outline" className="h-10 md:h-12 bg-transparent">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-xs md:text-sm">Clientes</span>
          </Button>
          <Button variant="outline" className="h-10 md:h-12 bg-transparent">
            <TrendingUp className="h-4 w-4 mr-2" />
            <span className="text-xs md:text-sm">Reportes</span>
          </Button>
        </div>
      </main>
    </div>
  )
}
