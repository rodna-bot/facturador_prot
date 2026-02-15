"use client"
import { useState, Suspense } from "react"
import {
  TrendingUp,
  AlertTriangle,
  Package,
  Clock,
  BarChart3,
  FileText,
  DollarSign,
  CheckCircle,
  ShoppingCart,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DownloadButton } from "@/components/download-button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockProducts } from "@/components/shared-products"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { AdvancedDateFilter } from "@/components/advanced-date-filter"

const productSalesHistory = [
  {
    date: "2024-01-01",
    productId: 1,
    quantitySold: 5,
    amount: 142.5,
    stockAtEnd: 145,
  },
  {
    date: "2024-01-01",
    productId: 2,
    quantitySold: 3,
    amount: 85.5,
    stockAtEnd: 117,
  },
  {
    date: "2024-01-02",
    productId: 1,
    quantitySold: 8,
    amount: 228,
    stockAtEnd: 137,
  },
  {
    date: "2024-01-02",
    productId: 3,
    quantitySold: 4,
    amount: 114,
    stockAtEnd: 91,
  },
  {
    date: "2024-01-03",
    productId: 1,
    quantitySold: 6,
    amount: 171,
    stockAtEnd: 131,
  },
  {
    date: "2024-01-03",
    productId: 4,
    quantitySold: 2,
    amount: 90,
    stockAtEnd: 78,
  },
  {
    date: "2024-01-04",
    productId: 2,
    quantitySold: 5,
    amount: 142.5,
    stockAtEnd: 112,
  },
  {
    date: "2024-01-04",
    productId: 1,
    quantitySold: 7,
    amount: 199.5,
    stockAtEnd: 124,
  },
  {
    date: "2024-01-05",
    productId: 5,
    quantitySold: 3,
    amount: 120,
    stockAtEnd: 57,
  },
  {
    date: "2024-01-05",
    productId: 3,
    quantitySold: 2,
    amount: 57,
    stockAtEnd: 89,
  },
  {
    date: "2024-01-06",
    productId: 1,
    quantitySold: 4,
    amount: 114,
    stockAtEnd: 120,
  },
  {
    date: "2024-01-06",
    productId: 4,
    quantitySold: 3,
    amount: 135,
    stockAtEnd: 75,
  },
  {
    date: "2024-01-07",
    productId: 2,
    quantitySold: 6,
    amount: 171,
    stockAtEnd: 106,
  },
  {
    date: "2024-01-07",
    productId: 5,
    quantitySold: 2,
    amount: 80,
    stockAtEnd: 55,
  },
]

const invoices = [
  {
    id: "FAC-001",
    code: "F001-2024-000001",
    date: "2024-01-15",
    client: "Hospital Central",
    product: "Jarabe Vitamina C",
    flavor: "Cereza",
    quantity: 12,
    amount: 15000,
    paymentMethod: "Transferencia",
    vouchers: "REC-001, REC-002",
    observation: "Entrega complete",
    document: "Factura",
    status: "Pagada",
    items: 5,
    total: 15000,
    dueDate: "2024-02-15",
  },
  {
    id: "FAC-002",
    code: "B001-2024-000002",
    date: "2024-01-14",
    client: "Farmacia San José",
    product: "Gel Antibacterial",
    flavor: "Neutro",
    quantity: 24,
    amount: 8500,
    paymentMethod: "Efectivo",
    vouchers: "REC-003",
    observation: "Urgente",
    document: "Boleta",
    status: "Pendiente",
    items: 3,
    total: 8500,
    dueDate: "2024-02-14",
  },
  {
    id: "FAC-003",
    code: "F001-2024-000003",
    date: "2024-01-13",
    client: "Clínica del Norte",
    product: "Suero Fisiológico",
    flavor: "N/A",
    quantity: 50,
    amount: 22000,
    paymentMethod: "Cheque",
    vouchers: "REC-004, REC-005, REC-006",
    observation: "Entrega parcial",
    document: "Factura",
    status: "Pagada",
    items: 8,
    total: 22000,
    dueDate: "2024-02-13",
  },
  {
    id: "FAC-004",
    code: "NV001-2024-000001",
    date: "2024-01-12",
    client: "Farmacia Popular",
    product: "Vitamina D3",
    flavor: "Menta",
    quantity: 8,
    amount: 4200,
    paymentMethod: "Tarjeta",
    vouchers: "REC-007",
    observation: "Pendiente pago",
    document: "Nota de Venta",
    status: "Vencida",
    items: 2,
    total: 4200,
    dueDate: "2024-01-10",
  },
  {
    id: "FAC-005",
    code: "F001-2024-000004",
    date: "2024-01-11",
    client: "Hospital del Sur",
    product: "Antiséptico",
    flavor: "Eucalipto",
    quantity: 30,
    amount: 31500,
    paymentMethod: "Transferencia",
    vouchers: "REC-008, REC-009",
    observation: "Entrega complete",
    document: "Factura",
    status: "Pagada",
    items: 12,
    total: 31500,
    dueDate: "2024-02-11",
  },
  {
    id: "FAC-006",
    code: "F001-2024-000005",
    date: "2024-01-10",
    client: "Clínica Metropolitana",
    product: "Desinfectante",
    flavor: "N/A",
    quantity: 40,
    amount: 18750,
    paymentMethod: "Transferencia",
    vouchers: "REC-010",
    observation: "Entrega complete",
    document: "Factura",
    status: "Pendiente",
    items: 6,
    total: 18750,
    dueDate: "2024-02-10",
  },
]

const lowStockProducts = mockProducts.filter((p) => p.stock < p.minStock)
const expiringProducts = mockProducts
  .map((p) => {
    const venceFecha = new Date(p.vencimiento)
    const hoy = new Date()
    const dias = Math.ceil((venceFecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24))
    return { ...p, dias }
  })
  .filter((p) => p.dias < 100)

function getProductMetricsByPeriod(period: string) {
  let filteredData = productSalesHistory
  const today = new Date("2024-01-07")

  if (period === "day") {
    filteredData = productSalesHistory.filter((d) => d.date === "2024-01-07")
  } else if (period === "week") {
    filteredData = productSalesHistory.filter((d) => {
      const date = new Date(d.date)
      const daysDiff = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
      return daysDiff <= 7
    })
  } else if (period === "month") {
    filteredData = productSalesHistory.filter((d) => {
      const date = new Date(d.date)
      const daysDiff = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
      return daysDiff <= 30
    })
  }

  const metrics = mockProducts.map((product) => {
    const sales = filteredData.filter((d) => d.productId === product.id)
    const totalQuantity = sales.reduce((sum, s) => sum + s.quantitySold, 0)
    const totalAmount = sales.reduce((sum, s) => sum + s.amount, 0)

    return {
      id: product.id,
      nombre: product.nombre,
      sabor: product.sabor,
      precio: product.precio,
      cantidadVendida: totalQuantity,
      montoVendido: totalAmount,
      stockActual: product.stock,
      ingresoTotal: 50, // Unidades que entraron (simulado)
      salidaTotal: totalQuantity, // Unidades que salieron (vendidas)
    }
  })

  return metrics.filter((m) => m.cantidadVendida > 0 || period === "all")
}

function getStockTrendData(productId: number) {
  return productSalesHistory
    .filter((d) => d.productId === productId)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((d) => ({
      date: new Date(d.date).toLocaleDateString("es-PE", { month: "short", day: "numeric" }),
      stock: d.stockAtEnd,
      vendido: d.quantitySold,
    }))
}

function ReportesContent() {
  const [periodFilter, setPeriodFilter] = useState("week")
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null })
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<number | null>(1)

  const productMetrics = getProductMetricsByPeriod(periodFilter)
  const totalVendido = productMetrics.reduce((sum, p) => sum + p.cantidadVendida, 0)
  const totalMonto = productMetrics.reduce((sum, p) => sum + p.montoVendido, 0)
  const totalIngreso = productMetrics.reduce((sum, p) => sum + p.ingresoTotal, 0)
  const stockPromedio = Math.round(mockProducts.reduce((sum, p) => sum + p.stock, 0) / mockProducts.length)

  const totalPagadas = invoices.filter((inv) => inv.status === "Pagada").reduce((sum, inv) => sum + inv.total, 0)
  const totalPendientes = invoices.filter((inv) => inv.status === "Pendiente").reduce((sum, inv) => sum + inv.total, 0)
  const totalVencidas = invoices.filter((inv) => inv.status === "Vencida").reduce((sum, inv) => sum + inv.total, 0)
  const ingresos = totalPagadas

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stockTrendData = selectedProduct ? getStockTrendData(selectedProduct) : []

  return (
    <div className="pb-16">
      <div className="bg-gradient-to-b from-primary/10 to-transparent border-b border-border/40 p-4">
        <h2 className="text-2xl font-bold">Reportes y Facturación</h2>
        <p className="text-sm text-muted-foreground mt-1">Análisis de datos y gestión de documentos de venta</p>
      </div>

      <main className="p-3 md:p-4 space-y-4">
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Análisis</span>
            </TabsTrigger>
            <TabsTrigger value="invoicing" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Facturación</span>
            </TabsTrigger>
          </TabsList>

          {/* ANALYTICS TAB */}
          <TabsContent value="analytics" className="space-y-4 mt-4">
            <div className="flex gap-2 w-full md:w-auto">
              <AdvancedDateFilter
                value={periodFilter}
                onChange={setPeriodFilter}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
              <Card className="border bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-950/20">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Monto Vendido</p>
                      <p className="text-lg md:text-2xl font-bold mt-1">S/ {totalMonto.toFixed(2)}</p>
                      <div className="flex items-center gap-1 mt-1 text-emerald-600 text-xs">
                        <TrendingUp className="h-3 w-3" />
                        <span>+12% vs período anterior</span>
                      </div>
                    </div>
                    <DollarSign className="h-8 w-8 text-emerald-600/20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Cantidad Vendida</p>
                      <p className="text-lg md:text-2xl font-bold mt-1">{totalVendido} unid</p>
                      <div className="flex items-center gap-1 mt-1 text-blue-600 text-xs">
                        <ShoppingCart className="h-3 w-3" />
                        <span>+8% vs período anterior</span>
                      </div>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-blue-600/20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-950/20">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Stock Promedio</p>
                      <p className="text-lg md:text-2xl font-bold mt-1">{stockPromedio} unid</p>
                      <div className="flex items-center gap-1 mt-1 text-purple-600 text-xs">
                        <Package className="h-3 w-3" />
                        <span>Disponible</span>
                      </div>
                    </div>
                    <Package className="h-8 w-8 text-purple-600/20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-gradient-to-br from-orange-50 to-transparent dark:from-orange-950/20">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Unidades en Ingreso</p>
                      <p className="text-lg md:text-2xl font-bold mt-1">{productMetrics.reduce((sum, p) => sum + p.ingresoTotal, 0)} unid</p>
                      <div className="flex items-center gap-1 mt-1 text-orange-600 text-xs">
                        <Package className="h-3 w-3" />
                        <span>Total período</span>
                      </div>
                    </div>
                    <Package className="h-8 w-8 text-orange-600/20" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Análisis por Producto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table className="text-xs md:text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead>Sabor</TableHead>
                        <TableHead className="text-right">Cant. Vendida</TableHead>
                        <TableHead className="text-right">Monto</TableHead>
                        <TableHead className="text-right">Stock Actual</TableHead>
                        <TableHead className="text-right">Ingreso</TableHead>
                        <TableHead className="text-right">Salida</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productMetrics.map((metric) => (
                        <TableRow
                          key={metric.id}
                          onClick={() => setSelectedProduct(metric.id)}
                          className="cursor-pointer hover:bg-muted/50"
                        >
                          <TableCell className="font-medium">{metric.nombre}</TableCell>
                          <TableCell>
                            {metric.sabor && metric.sabor !== "Natural" ? (
                              <Badge variant="outline" className="text-xs">
                                {metric.sabor}
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">{metric.cantidadVendida}</TableCell>
                          <TableCell className="text-right">S/ {metric.montoVendido.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={metric.stockActual < 50 ? "destructive" : "secondary"}>
                              {metric.stockActual}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right text-emerald-600 font-semibold">
                            {metric.ingresoTotal} unid
                          </TableCell>
                          <TableCell className="text-right text-red-600 font-semibold">
                            {metric.salidaTotal} unid
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {selectedProduct && stockTrendData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Tendencia de Stock - {mockProducts.find((p) => p.id === selectedProduct)?.nombre}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={stockTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="stock" stroke="#10b981" name="Stock" strokeWidth={2} />
                      <Line type="monotone" dataKey="vendido" stroke="#ef4444" name="Vendido" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Stock Bajo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {lowStockProducts.length > 0 ? (
                      lowStockProducts.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div>
                            <p className="font-medium text-sm">
                              {product.nombre}
                              {product.sabor && product.sabor !== "Natural" && ` (${product.sabor})`}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Stock: {product.stock} / Mínimo: {product.minStock}
                            </p>
                          </div>
                          <Badge variant="destructive">Bajo</Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">Sin alertas de stock bajo</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                    <Clock className="h-5 w-5 text-orange-600" />
                    Próximo a Vencer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {expiringProducts.length > 0 ? (
                      expiringProducts.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div>
                            <p className="font-medium text-sm">
                              {product.nombre}
                              {product.sabor && product.sabor !== "Natural" && ` (${product.sabor})`}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Vence en {product.dias} días - Lote: {product.lote}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {product.dias}d
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">Sin productos próximos a vencer</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* INVOICING TAB */}
          <TabsContent value="invoicing" className="space-y-4 mt-4">
            {/* ... existing invoicing content ... */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
              <Card className="border bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-950/20">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Ingresos</p>
                      <p className="text-lg md:text-2xl font-bold mt-1">S/ {(ingresos / 1000).toFixed(1)}k</p>
                      <div className="flex items-center gap-1 mt-1"></div>
                    </div>
                    <CheckCircle className="h-8 w-8 text-emerald-600/20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-gradient-to-br from-orange-50 to-transparent dark:from-orange-950/20">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Pendientes</p>
                      <p className="text-lg md:text-2xl font-bold mt-1">S/ {(totalPendientes / 1000).toFixed(1)}k</p>
                      <div className="flex items-center gap-1 mt-1"></div>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600/20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-gradient-to-br from-red-50 to-transparent dark:from-red-950/20">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Vencidas</p>
                      <p className="text-lg md:text-2xl font-bold mt-1">S/ {(totalVencidas / 1000).toFixed(1)}k</p>
                      <div className="flex items-center gap-1 mt-1"></div>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600/20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Total</p>
                      <p className="text-lg md:text-2xl font-bold mt-1">
                        S/ {((ingresos + totalPendientes + totalVencidas) / 1000).toFixed(1)}k
                      </p>
                      <div className="flex items-center gap-1 mt-1"></div>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-600/20" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-base">Documentos de Venta</CardTitle>
                <DownloadButton />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Buscar por código, cliente o documento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-8 text-xs"
                  />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48 h-8 text-xs">
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="Pagada">Pagadas</SelectItem>
                      <SelectItem value="Pendiente">Pendientes</SelectItem>
                      <SelectItem value="Vencida">Vencidas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto">
                  <Table className="text-xs md:text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Documento</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead className="text-right">Monto</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-mono text-xs">{invoice.code}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {invoice.document === "Factura" ? "Fac" : invoice.document === "Boleta" ? "Bol" : "NV"}
                            </Badge>
                          </TableCell>
                          <TableCell className="truncate max-w-[120px]">{invoice.client}</TableCell>
                          <TableCell>{invoice.quantity}</TableCell>
                          <TableCell className="text-right font-semibold">
                            S/ {invoice.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                invoice.status === "Pagada"
                                  ? "default"
                                  : invoice.status === "Pendiente"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className="text-xs"
                            >
                              {invoice.status}
                            </Badge>
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
      </main>
    </div>
  )
}

export default function ReportesPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Cargando reportes...</div>}>
      <ReportesContent />
    </Suspense>
  )
}
