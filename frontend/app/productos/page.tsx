"use client"

import { useState } from "react"
import { Plus, Search, Scan, Edit, Trash2, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductDialog } from "@/components/product-dialog"
import { BarcodeScannerDialog } from "@/components/barcode-scanner-dialog"
import { DownloadButton } from "@/components/download-button"
import { mockProducts } from "@/components/shared-products"

export default function ProductosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [products] = useState(mockProducts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<(typeof mockProducts)[0] | null>(null)

  /* Added advanced filters */
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [stockFilter, setStockFilter] = useState<string>("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.codigo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || product.categoria === categoryFilter

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "bajo" && product.stock < product.minStock) ||
      (stockFilter === "normal" && product.stock >= product.minStock) ||
      (stockFilter === "alto" && product.stock > product.minStock * 2)

    return matchesSearch && matchesCategory && matchesStock
  })

  const handleEdit = (product: (typeof mockProducts)[0]) => {
    setEditingProduct(product)
    setIsDialogOpen(true)
  }

  const handleNew = () => {
    setEditingProduct(null)
    setIsDialogOpen(true)
  }

  const categories = ["Producto"]

  return (
    <div className="pb-16">
      <div className="bg-gradient-to-b from-primary/10 to-transparent border-b border-border/40 p-4">
        <h2 className="text-2xl font-bold">Gestión de Productos</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {filteredProducts.length} de {products.length} productos
        </p>
      </div>

      <div className="p-3 md:p-4 space-y-3">
        <Card className="border">
          <CardHeader className="p-3 md:p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base md:text-lg">Productos</CardTitle>
                <DownloadButton title="Productos" data={filteredProducts} />
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre o código..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-9 text-sm"
                  />
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsScannerOpen(true)} className="h-9">
                  <Scan className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={handleNew} className="h-9">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Categoría</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Stock</label>
                  <Select value={stockFilter} onValueChange={setStockFilter}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todo</SelectItem>
                      <SelectItem value="alto">Stock Alto</SelectItem>
                      <SelectItem value="normal">Stock Normal</SelectItem>
                      <SelectItem value="bajo">Stock Bajo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="hidden md:block space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Estado</label>
                  <Button variant="outline" size="sm" className="h-8 w-full text-xs bg-transparent">
                    <Filter className="h-3 w-3 mr-1" />
                    Más filtros
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-2">
            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="h-9 py-2 text-xs font-semibold">Código</TableHead>
                    <TableHead className="h-9 py-2 text-xs font-semibold">Descripción</TableHead>
                    <TableHead className="h-9 py-2 text-xs font-semibold text-right">Precio</TableHead>
                    <TableHead className="h-9 py-2 text-xs font-semibold text-right">Stock</TableHead>
                    <TableHead className="h-9 py-2 text-xs font-semibold">Vencimiento</TableHead>
                    <TableHead className="h-9 py-2 text-xs font-semibold text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} className="h-10 hover:bg-secondary/30">
                      <TableCell className="font-mono text-xs py-2 font-semibold">{product.codigo}</TableCell>
                      <TableCell className="font-medium text-sm py-2">{product.nombre}</TableCell>
                      <TableCell className="text-xs py-2 text-right font-semibold">
                        S/ {product.precio.toFixed(2)}
                      </TableCell>
                      <TableCell className="py-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs font-semibold">{product.stock}</span>
                          {product.stock < product.minStock && (
                            <Badge variant="destructive" className="text-xs">
                              Bajo
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs py-2">{product.vencimiento}</TableCell>
                      <TableCell className="text-right py-2">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7" onClick={() => handleEdit(product)}>
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7">
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <ProductDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} product={editingProduct} />
      <BarcodeScannerDialog open={isScannerOpen} onOpenChange={setIsScannerOpen} />
    </div>
  )
}
