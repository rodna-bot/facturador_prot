"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Download, Eye, FileText, DollarSign, Clock, CheckCircle } from "lucide-react"
import { DownloadButton } from "@/components/download-button"
import { AdvancedDateFilter } from "@/components/advanced-date-filter"

// Datos de ejemplo
const invoices = [
  {
    id: "FAC-001",
    code: "F001-2024-000001",
    date: "2024-01-15",
    client: "Hospital Central",
    total: 15000,
    status: "Pagada",
    items: 5,
    method: "Transferencia",
    dueDate: "2024-02-15",
  },
  {
    id: "FAC-002",
    code: "B001-2024-000002",
    date: "2024-01-14",
    client: "Farmacia San José",
    total: 8500,
    status: "Pendiente",
    items: 3,
    method: "Efectivo",
    dueDate: "2024-02-14",
  },
  {
    id: "FAC-003",
    code: "F001-2024-000003",
    date: "2024-01-13",
    client: "Clínica del Norte",
    total: 22000,
    status: "Pagada",
    items: 8,
    method: "Cheque",
    dueDate: "2024-02-13",
  },
  {
    id: "FAC-004",
    code: "NV001-2024-000001",
    date: "2024-01-12",
    client: "Farmacia Popular",
    total: 4200,
    status: "Vencida",
    items: 2,
    method: "Tarjeta",
    dueDate: "2024-01-10",
  },
  {
    id: "FAC-005",
    code: "F001-2024-000004",
    date: "2024-01-11",
    client: "Hospital del Sur",
    total: 31500,
    status: "Pagada",
    items: 12,
    method: "Transferencia",
    dueDate: "2024-02-11",
  },
  {
    id: "FAC-006",
    code: "F001-2024-000005",
    date: "2024-01-10",
    client: "Clínica Metropolitana",
    total: 18750,
    status: "Pendiente",
    items: 6,
    method: "Transferencia",
    dueDate: "2024-02-10",
  },
]

export default function FacturacionPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [periodFilter, setPeriodFilter] = useState("month")
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null })

  /* Calculate metrics */
  const totalPagadas = invoices.filter((inv) => inv.status === "Pagada").reduce((sum, inv) => sum + inv.total, 0)
  const totalPendientes = invoices.filter((inv) => inv.status === "Pendiente").reduce((sum, inv) => sum + inv.total, 0)
  const totalVencidas = invoices.filter((inv) => inv.status === "Vencida").reduce((sum, inv) => sum + inv.total, 0)

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="pb-16">
      <div className="bg-gradient-to-b from-primary/10 to-transparent border-b border-border/40 p-4">
        <h2 className="text-2xl font-bold">Gestión de Facturación</h2>
        <p className="text-sm text-muted-foreground mt-1">Administra facturas, boletas y notas de venta</p>
      </div>

      <main className="p-3 md:p-4 space-y-4">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
          <Card className="border bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-950/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Pagadas</p>
                  <p className="text-lg md:text-2xl font-bold mt-1">S/ {(totalPagadas / 1000).toFixed(1)}k</p>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      {invoices.filter((i) => i.status === "Pagada").length} documentos
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border bg-gradient-to-br from-yellow-50 to-transparent dark:from-yellow-950/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Pendientes</p>
                  <p className="text-lg md:text-2xl font-bold mt-1">S/ {(totalPendientes / 1000).toFixed(1)}k</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-3.5 w-3.5 text-yellow-600" />
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">
                      {invoices.filter((i) => i.status === "Pendiente").length} por cobrar
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border bg-gradient-to-br from-red-50 to-transparent dark:from-red-950/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Vencidas</p>
                  <p className="text-lg md:text-2xl font-bold mt-1">S/ {(totalVencidas / 1000).toFixed(1)}k</p>
                  <div className="flex items-center gap-1 mt-1">
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {invoices.filter((i) => i.status === "Vencida").length} atrasadas
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Total</p>
                  <p className="text-lg md:text-2xl font-bold mt-1">
                    S/ {((totalPagadas + totalPendientes + totalVencidas) / 1000).toFixed(1)}k
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <DollarSign className="h-3.5 w-3.5 text-blue-600" />
                    <p className="text-xs text-blue-600 dark:text-blue-400">{invoices.length} documentos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card className="border">
          <CardHeader className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Documentos de Venta
                </CardTitle>
                <div className="flex gap-2">
                  <DownloadButton title="Facturación" data={filteredInvoices} />
                  <Button size="sm" className="h-9">
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline ml-1">Nuevo</span>
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap items-end">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por código, N°, o cliente..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-9 text-sm"
                    />
                  </div>
                </div>
                <AdvancedDateFilter
                  value={periodFilter}
                  onChange={setPeriodFilter}
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-9 w-24 md:w-32 text-xs md:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Pagada">Pagadas</SelectItem>
                    <SelectItem value="Pendiente">Pendientes</SelectItem>
                    <SelectItem value="Vencida">Vencidas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-2">
            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="h-9 py-2 text-xs font-semibold whitespace-nowrap">N°</TableHead>
                    <TableHead className="h-9 py-2 text-xs font-semibold whitespace-nowrap">Código</TableHead>
                    <TableHead className="h-9 py-2 text-xs font-semibold whitespace-nowrap">Cliente</TableHead>
                    <TableHead className="h-9 py-2 text-xs font-semibold whitespace-nowrap">Fecha</TableHead>
                    <TableHead className="h-9 py-2 text-xs font-semibold whitespace-nowrap text-right">Total</TableHead>
                    <TableHead className="h-9 py-2 text-xs font-semibold whitespace-nowrap">Estado</TableHead>
                    <TableHead className="h-9 py-2 text-xs font-semibold text-right whitespace-nowrap">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="h-10 hover:bg-secondary/30">
                      <TableCell className="font-bold text-xs py-2 text-primary">{invoice.id}</TableCell>
                      <TableCell className="font-mono text-xs py-2 whitespace-nowrap">{invoice.code}</TableCell>
                      <TableCell className="font-medium text-sm py-2">{invoice.client}</TableCell>
                      <TableCell className="text-xs py-2">{invoice.date}</TableCell>
                      <TableCell className="text-sm py-2 text-right font-bold">
                        S/ {invoice.total.toLocaleString("es-PE")}
                      </TableCell>
                      <TableCell className="py-2">
                        <Badge
                          className={`text-xs ${
                            invoice.status === "Pagada"
                              ? "bg-emerald-600 hover:bg-emerald-700"
                              : invoice.status === "Pendiente"
                                ? "bg-yellow-600 hover:bg-yellow-700"
                                : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right py-2">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7" title="Ver detalles">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7" title="Descargar PDF">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Mostrando {filteredInvoices.length} de {invoices.length} documentos
            </div>
          </CardContent>
        </Card>

        {/* Documents Distribution */}
        <div className="grid md:grid-cols-3 gap-3">
          <Card className="border">
            <CardHeader className="p-4 pb-3">
              <CardTitle className="text-sm">Facturas</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">{invoices.filter((i) => i.code.startsWith("F")).length}</p>
              <p className="text-xs text-muted-foreground mt-1">Documentos tributarios</p>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader className="p-4 pb-3">
              <CardTitle className="text-sm">Boletas</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">{invoices.filter((i) => i.code.startsWith("B")).length}</p>
              <p className="text-xs text-muted-foreground mt-1">Comprobantes simplificados</p>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader className="p-4 pb-3">
              <CardTitle className="text-sm">Notas de Venta</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">{invoices.filter((i) => i.code.startsWith("NV")).length}</p>
              <p className="text-xs text-muted-foreground mt-1">Documentos internos</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
