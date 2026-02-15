"use client"
import { AlertTriangle, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DownloadButton } from "@/components/download-button"
import { mockProducts } from "@/components/shared-products"

const lowStockProducts = mockProducts.filter((p) => p.stock < p.minStock)
const expiringProducts = mockProducts
  .map((p) => {
    const venceFecha = new Date(p.vencimiento)
    const hoy = new Date()
    const dias = Math.ceil((venceFecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24))
    return { ...p, dias }
  })
  .filter((p) => p.dias < 100)

const recentMovements = [
  { tipo: "Entrada", producto: "Paracetamol 500mg", cantidad: 100, fecha: "2024-12-21 10:30", usuario: "Admin" },
  {
    tipo: "Salida",
    producto: "Guantes Látex Caja x100",
    cantidad: 20,
    fecha: "2024-12-21 09:15",
    usuario: "Vendedor1",
  },
  { tipo: "Entrada", producto: "Amoxicilina 500mg", cantidad: 50, fecha: "2024-12-20 16:45", usuario: "Admin" },
  { tipo: "Salida", producto: "Ibuprofeno 400mg", cantidad: 15, fecha: "2024-12-20 14:20", usuario: "Vendedor2" },
  { tipo: "Ajuste", producto: "Mascarillas KN95 x50", cantidad: -5, fecha: "2024-12-20 11:00", usuario: "Admin" },
]

export default function InventarioPage() {
  const totalItems = mockProducts.reduce((sum, p) => sum + p.stock, 0)

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="border-b bg-card">
        <div className="container mx-auto px-2 py-2">
          <div className="flex items-center justify-between gap-1">
            <h1 className="text-base md:text-2xl font-bold">Control Inventario</h1>
            <DownloadButton title="Inventario" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-2 py-1.5">
        <div className="grid grid-cols-3 gap-1 mb-1.5">
          <Card className="border">
            <CardContent className="p-2">
              <p className="text-[9px] md:text-xs text-muted-foreground">Items Total</p>
              <p className="text-sm md:text-xl font-bold mt-0.5">{totalItems}</p>
            </CardContent>
          </Card>
          <Card className="border">
            <CardContent className="p-2">
              <p className="text-[9px] md:text-xs text-muted-foreground">Stock Bajo</p>
              <p className="text-sm md:text-xl font-bold mt-0.5 text-red-600">{lowStockProducts.length}</p>
            </CardContent>
          </Card>
          <Card className="border">
            <CardContent className="p-2">
              <p className="text-[9px] md:text-xs text-muted-foreground">Por Vencer</p>
              <p className="text-sm md:text-xl font-bold mt-0.5 text-orange-600">{expiringProducts.length}</p>
            </CardContent>
          </Card>
        </div>

        {lowStockProducts.length > 0 && (
          <Card className="border border-red-200 bg-red-50 mb-2">
            <CardContent className="p-1.5">
              <div className="flex items-start gap-1">
                <AlertTriangle className="h-3.5 w-3.5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] md:text-sm font-semibold text-red-900">Alertas</p>
                  <p className="text-[9px] md:text-xs text-red-700">
                    {lowStockProducts.length} productos requieren reabastecimiento
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-1">
          {lowStockProducts.length > 0 && (
            <Card className="border">
              <CardHeader className="p-2 pb-1">
                <CardTitle className="text-xs md:text-sm flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
                  Stock Bajo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-1.5 pt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="h-7 md:h-9 py-1 text-[9px] md:text-xs">Producto</TableHead>
                        <TableHead className="h-7 md:h-9 py-1 text-[9px] md:text-xs">Stock</TableHead>
                        <TableHead className="h-7 md:h-9 py-1 text-[9px] md:text-xs">Mínimo</TableHead>
                        <TableHead className="h-7 md:h-9 py-1 text-[9px] md:text-xs">Urgencia</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lowStockProducts.map((product) => (
                        <TableRow key={product.codigo} className="h-7 md:h-9">
                          <TableCell className="py-1">
                            <div>
                              <p className="font-medium text-[9px] md:text-xs">{product.nombre}</p>
                              <p className="text-[8px] md:text-[10px] text-muted-foreground">{product.codigo}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold text-red-600 py-1 text-[9px] md:text-xs">
                            {product.stock}
                          </TableCell>
                          <TableCell className="py-1 text-[9px] md:text-xs">{product.minStock}</TableCell>
                          <TableCell className="py-1">
                            <Badge
                              variant={product.stock < product.minStock / 2 ? "destructive" : "default"}
                              className="text-[7px] md:text-[8px] px-1 py-0"
                            >
                              {product.stock < product.minStock / 2 ? "Alta" : "Media"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {expiringProducts.length > 0 && (
            <Card className="border">
              <CardHeader className="p-2 pb-1">
                <CardTitle className="text-xs md:text-sm flex items-center gap-1">
                  <TrendingDown className="h-3.5 w-3.5 text-orange-600" />
                  Próximos a Vencer
                </CardTitle>
              </CardHeader>
              <CardContent className="p-1.5 pt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="h-7 md:h-9 py-1 text-[9px] md:text-xs">Producto</TableHead>
                        <TableHead className="h-7 md:h-9 py-1 text-[9px] md:text-xs">Vence</TableHead>
                        <TableHead className="h-7 md:h-9 py-1 text-[9px] md:text-xs">Días</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expiringProducts.map((product) => (
                        <TableRow key={product.codigo} className="h-7 md:h-9">
                          <TableCell className="py-1">
                            <p className="font-medium text-[9px] md:text-xs">{product.nombre}</p>
                          </TableCell>
                          <TableCell className="py-1 text-[9px] md:text-xs">{product.vencimiento}</TableCell>
                          <TableCell className="py-1">
                            <Badge
                              variant={product.dias < 30 ? "destructive" : "secondary"}
                              className="text-[7px] md:text-[8px] px-1 py-0"
                            >
                              {product.dias}d
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border">
            <CardHeader className="p-2">
              <CardTitle className="text-xs md:text-sm">Movimientos Recientes</CardTitle>
            </CardHeader>
            <CardContent className="p-1.5">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[9px] md:text-xs">Tipo</TableHead>
                      <TableHead className="text-[9px] md:text-xs">Producto</TableHead>
                      <TableHead className="text-[9px] md:text-xs">Cantidad</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentMovements.map((movement, index) => (
                      <TableRow key={index} className="h-7 md:h-9">
                        <TableCell className="py-1">
                          <Badge
                            variant={
                              movement.tipo === "Entrada"
                                ? "default"
                                : movement.tipo === "Salida"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-[7px] md:text-[8px] px-1 py-0"
                          >
                            {movement.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-[9px] md:text-xs">{movement.producto}</TableCell>
                        <TableCell className="text-[9px] md:text-xs">
                          <span className={movement.cantidad > 0 ? "text-green-600" : "text-red-600"}>
                            {movement.cantidad > 0 ? "+" : ""}
                            {movement.cantidad}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
