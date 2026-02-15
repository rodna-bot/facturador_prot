"use client"

import { useState } from "react"
import { Plus, TrendingUp, DollarSign, ShoppingCart, Calendar, X, FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { DownloadButton } from "@/components/download-button"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdvancedDateFilter } from "@/components/advanced-date-filter"

const mockSales = [
  {
    id: 1,
    fecha: "2024-12-21",
    cliente: "Juan Pérez",
    total: 125.5,
    items: 5,
    estado: "Completada",
    metodo: "Efectivo",
  },
  {
    id: 2,
    fecha: "2024-12-21",
    cliente: "María García",
    total: 85.0,
    items: 3,
    estado: "Completada",
    metodo: "Tarjeta",
  },
  {
    id: 3,
    fecha: "2024-12-20",
    cliente: "Carlos López",
    total: 250.75,
    items: 8,
    estado: "Completada",
    metodo: "Transferencia",
  },
  {
    id: 4,
    fecha: "2024-12-20",
    cliente: "Ana Martínez",
    total: 45.0,
    items: 2,
    estado: "Completada",
    metodo: "Efectivo",
  },
]

const documentTypes = [
  {
    id: "factura",
    nombre: "Factura",
    descripcion: "Comprobante de pago para operaciones comerciales",
    icono: "🧾",
    color: "from-blue-50 to-blue-50/50",
    borderColor: "border-blue-200",
    requiereRUC: true,
  },
  {
    id: "nota-venta",
    nombre: "Nota de Venta",
    descripcion: "Comprobante interno para registro de ventas",
    icono: "📝",
    color: "from-green-50 to-green-50/50",
    borderColor: "border-green-200",
    requiereRUC: false,
  },
  {
    id: "boleta",
    nombre: "Boleta",
    descripcion: "Comprobante de pago para pequeñas operaciones",
    icono: "📋",
    color: "from-emerald-50 to-emerald-50/50",
    borderColor: "border-emerald-200",
    requiereRUC: false,
  },
  {
    id: "nota-credito",
    nombre: "Nota de Crédito",
    descripcion: "Para devolver dinero o rebajas en operaciones",
    icono: "↩️",
    color: "from-purple-50 to-purple-50/50",
    borderColor: "border-purple-200",
    requiereRUC: true,
  },
  {
    id: "nota-debito",
    nombre: "Nota de Débito",
    descripcion: "Para cobros adicionales en operaciones",
    icono: "⤴️",
    color: "from-orange-50 to-orange-50/50",
    borderColor: "border-orange-200",
    requiereRUC: true,
  },
  {
    id: "comunicacion-baja",
    nombre: "Comunicación de Baja",
    descripcion: "Para dar de baja comprobantes no utilizados",
    icono: "❌",
    color: "from-red-50 to-red-50/50",
    borderColor: "border-red-200",
    requiereRUC: true,
  },
]

export default function VentasPage() {
  const [filterPeriod, setFilterPeriod] = useState("today")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [customDateOpen, setCustomDateOpen] = useState(false)
  const [filterType, setFilterType] = useState<"day" | "month" | "year">("day")
  const [monthYear, setMonthYear] = useState({ month: new Date().getMonth(), year: new Date().getFullYear() })
  const [activeTab, setActiveTab] = useState("gestionar")

  /* Filter sales based on period or custom date range */
  const getFilteredSales = () => {
    const today = new Date("2024-12-21")
    const week = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const month = new Date(today.getFullYear(), today.getMonth(), 1)

    if (dateRange.from || dateRange.to) {
      return mockSales.filter((sale) => {
        const saleDate = new Date(sale.fecha)
        const fromDate = dateRange.from ? new Date(dateRange.from) : new Date("2000-01-01")
        const toDate = dateRange.to ? new Date(dateRange.to) : new Date("2099-12-31")
        return saleDate >= fromDate && saleDate <= toDate
      })
    }

    switch (filterPeriod) {
      case "today":
        return mockSales.filter((s) => s.fecha === "2024-12-21")
      case "week":
        return mockSales.filter((s) => {
          const saleDate = new Date(s.fecha)
          return saleDate >= week && saleDate <= today
        })
      case "month":
        return mockSales.filter((s) => {
          const saleDate = new Date(s.fecha)
          return saleDate >= month && saleDate <= today
        })
      default:
        return mockSales
    }
  }

  const filteredSales = getFilteredSales()

  /* Calculate metrics */
  const totalSales = filteredSales.reduce((acc, sale) => acc + sale.total, 0)
  const avgSale = filteredSales.length > 0 ? totalSales / filteredSales.length : 0
  const todaySales = mockSales.filter((s) => s.fecha === "2024-12-21")

  return (
    <div className="min-h-screen bg-background">
      <div className="p-2 md:p-3 space-y-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-2 h-8">
            <TabsTrigger value="gestionar" className="text-xs">Crear Documento</TabsTrigger>
            <TabsTrigger value="historial" className="text-xs">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="gestionar" className="space-y-2 mt-2">
            {/* Crear Documento Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {documentTypes.map((doc) => (
                <Link href={`/ventas/${doc.id}`} key={doc.id}>
                  <Card className="border">
                    <CardContent className="space-y-2">
                      <div className="flex items-start justify-between">
                        <span className="text-3xl">{doc.icono}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm md:text-base">{doc.nombre}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{doc.descripcion}</p>
                      </div>
                      <div className="pt-2">
                        <Badge variant="outline" className="text-xs">
                          {doc.requiereRUC ? "Requiere RUC" : "Requiere DNI/RUC"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="historial" className="space-y-2 mt-2">
            <div className="grid grid-cols-3 gap-1.5 md:gap-2">
              <Card className="border bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-950/20">
                <CardContent className="p-2 md:p-3">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">
                        {dateRange.from || dateRange.to ? "Ventas (Filtro)" : "Ventas Hoy"}
                      </p>
                      <p className="text-base md:text-lg font-bold mt-0.5">S/ {totalSales.toFixed(2)}</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {filteredSales.length} {filteredSales.length === 1 ? "venta" : "ventas"}
                      </p>
                    </div>
                    <DollarSign className="h-6 w-6 text-emerald-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20">
                <CardContent className="p-2 md:p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Transacciones</p>
                      <p className="text-base md:text-lg font-bold mt-0.5">{mockSales.length}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">{todaySales.length} hoy</p>
                    </div>
                    <ShoppingCart className="h-6 w-6 text-blue-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-950/20">
                <CardContent className="p-2 md:p-3">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Promedio</p>
                      <p className="text-base md:text-lg font-bold mt-0.5">S/ {avgSale.toFixed(2)}</p>
                      <p className="text-xs text-purple-600 dark:text-purple-400 mt-0.5">Por venta</p>
                    </div>
                    <TrendingUp className="h-6 w-6 text-purple-600 opacity-20" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border">
              <CardHeader className="p-2 md:p-3 pb-2">
                <div className="flex items-center justify-between gap-1 flex-wrap">
                  <CardTitle className="text-sm md:text-base">Historial de Ventas</CardTitle>
                  <div className="flex gap-1 flex-wrap items-end">
                    <AdvancedDateFilter
                      value={filterPeriod}
                      onChange={setFilterPeriod}
                      dateRange={dateRange}
                      onDateRangeChange={setDateRange}
                    />
                    <DownloadButton title="Ventas" data={filteredSales} />
                    <Link href="/ventas/nueva">
                      <Button size="sm" className="h-8">
                        <Plus className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline ml-1">Nueva</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-2">
                <div className="rounded-lg border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="h-9 py-2 text-xs font-semibold">ID</TableHead>
                        <TableHead className="h-9 py-2 text-xs font-semibold">Cliente</TableHead>
                        <TableHead className="h-9 py-2 text-xs font-semibold text-right">Total</TableHead>
                        <TableHead className="h-9 py-2 text-xs font-semibold">Items</TableHead>
                        <TableHead className="h-9 py-2 text-xs font-semibold">Método</TableHead>
                        <TableHead className="h-9 py-2 text-xs font-semibold">Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSales.map((sale) => (
                        <TableRow key={sale.id} className="h-10 hover:bg-secondary/30">
                          <TableCell className="font-mono text-xs py-2 font-semibold text-primary">
                            #{sale.id.toString().padStart(4, "0")}
                          </TableCell>
                          <TableCell className="font-medium text-sm py-2">{sale.cliente}</TableCell>
                          <TableCell className="py-2 text-right font-bold">S/ {sale.total.toFixed(2)}</TableCell>
                          <TableCell className="text-xs py-2">
                            <Badge variant="outline">{sale.items}</Badge>
                          </TableCell>
                          <TableCell className="text-xs py-2">{sale.metodo}</TableCell>
                          <TableCell className="py-2">
                            <Badge className="bg-emerald-600 hover:bg-emerald-700">{sale.estado}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
