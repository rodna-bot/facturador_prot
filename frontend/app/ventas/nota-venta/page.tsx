"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Trash2, Download, Send, X, Camera, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { mockProducts } from "@/components/shared-products"
import { Separator } from "@/components/ui/separator"

const kits = ["Kit 1", "Kit 2", "Kit 3"]

export default function NotaVentaPage() {
  const router = useRouter()
  const [clienteNombre, setClienteNombre] = useState("")
  const [clienteDNI, setClienteDNI] = useState("")
  const [items, setItems] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [cantidad, setCantidad] = useState("1")
  const [descuentoItem, setDescuentoItem] = useState("0")
  const [observaciones, setObservaciones] = useState("")
  const [fotos, setFotos] = useState<string[]>([])
  const [selectedKit, setSelectedKit] = useState("")

  const manejarFotos = (e: any) => {
    const files = e.target.files
    if (!files) return
    
    for (let file of files) {
      const reader = new FileReader()
      reader.onload = (event: any) => {
        setFotos(prev => [...prev, event.target.result])
      }
      reader.readAsDataURL(file)
    }
  }

  const eliminarFoto = (index: number) => {
    setFotos(fotos.filter((_, i) => i !== index))
  }

  const agregarProducto = () => {
    if (!selectedProduct || !cantidad) return
    const product = mockProducts.find((p) => p.id === parseInt(selectedProduct))
    if (!product) return

    const precioBase = parseInt(cantidad) * product.precio
    const descuento = (precioBase * parseFloat(descuentoItem || "0")) / 100
    const subtotal = precioBase - descuento

    const nuevoItem = {
      id: Date.now(),
      producto: product,
      cantidad: parseInt(cantidad),
      unitario: product.precio,
      descuentoPorcentaje: parseFloat(descuentoItem || "0"),
      descuentoMonto: descuento,
      subtotal: subtotal,
      kit: selectedKit,
    }

    setItems([...items, nuevoItem])
    setSelectedProduct("")
    setCantidad("1")
    setDescuentoItem("0")
    setSelectedKit("")
  }

  const actualizarDescuentoItem = (id: number, descuento: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const precioBase = item.cantidad * item.unitario
        const descuentoMonto = (precioBase * descuento) / 100
        const subtotal = precioBase - descuentoMonto
        return { ...item, descuentoPorcentaje: descuento, descuentoMonto, subtotal }
      }
      return item
    }))
  }

  const eliminarItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0)
  const descuentoTotal = items.reduce((sum, item) => sum + item.descuentoMonto, 0)

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-to-b from-green-50 to-transparent border-b border-green-200 p-2">
        <div className="flex items-center gap-2 mb-1">
          <Link href="/ventas">
            <Button variant="ghost" size="sm" className="h-7">
              <ArrowLeft className="h-3 w-3" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold">Crear Nota de Venta 📝 - Sistema de Inventario</h1>
        </div>
        <p className="text-xs text-muted-foreground ml-9">
          Comprobante no fiscal para registro interno de operaciones y detalles de venta
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-3 py-2 space-y-2">
        {/* Datos del Cliente */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Datos del Cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs">Nombre del Cliente</Label>
                <Input
                  placeholder="Ingresa nombre del cliente"
                  value={clienteNombre}
                  onChange={(e) => setClienteNombre(e.target.value)}
                  className="h-7 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">DNI del Cliente</Label>
                <Input
                  placeholder="Ingresa DNI"
                  value={clienteDNI}
                  onChange={(e) => setClienteDNI(e.target.value)}
                  className="h-7 text-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Datos de la Nota de Venta */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Datos de la Nota de Venta</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-0">
            <div className="space-y-1">
              <Label className="text-xs">Serie</Label>
              <Input placeholder="NV01" value="NV01" disabled className="h-7 text-xs" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Número</Label>
              <Input placeholder="000001" value="000001" disabled className="h-7 text-xs" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Fecha de Emisión</Label>
              <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="h-7 text-xs" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Hora</Label>
              <Input type="time" defaultValue="12:00" className="h-7 text-xs" />
            </div>
          </CardContent>
        </Card>

        {/* Agregar Productos */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Agregar Productos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
              <div className="space-y-1">
                <Label className="text-xs">Producto</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProducts.map((p) => (
                      <SelectItem key={p.id} value={p.id.toString()}>
                        {p.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Cantidad</Label>
                <Input
                  type="number"
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  placeholder="1"
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Descuento %</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={descuentoItem}
                  onChange={(e) => setDescuentoItem(e.target.value)}
                  placeholder="0"
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Kit</Label>
                <Select value={selectedKit} onValueChange={setSelectedKit}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Opcional" />
                  </SelectTrigger>
                  <SelectContent>
                    {kits.map((kit) => (
                      <SelectItem key={kit} value={kit}>
                        {kit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end pt-1">
                <Button onClick={agregarProducto} size="sm" className="w-full h-8 text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  Agregar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detalle de Items */}
        {items.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Detalle de Ítems</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Descripción</TableHead>
                      <TableHead className="text-right text-xs">Cant.</TableHead>
                      <TableHead className="text-right text-xs">P.U.</TableHead>
                      <TableHead className="text-right text-xs">Desc %</TableHead>
                      <TableHead className="text-xs">Kit</TableHead>
                      <TableHead className="text-right text-xs">Subtotal</TableHead>
                      <TableHead className="text-xs">Acción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium text-xs">{item.producto.nombre}</TableCell>
                        <TableCell className="text-right text-xs">{item.cantidad}</TableCell>
                        <TableCell className="text-right text-xs">S/ {item.unitario.toFixed(2)}</TableCell>
                        <TableCell className="text-right text-xs">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={item.descuentoPorcentaje}
                            onChange={(e) => actualizarDescuentoItem(item.id, parseFloat(e.target.value))}
                            className="h-6 text-xs text-right w-14"
                          />
                        </TableCell>
                        <TableCell className="text-xs">{item.kit || "-"}</TableCell>
                        <TableCell className="text-right text-xs">S/ {item.subtotal.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => eliminarItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Resumen */}
              <Separator className="my-2" />
              <div className="space-y-0.5 text-right text-xs">
                <div className="flex justify-end gap-2">
                  <span className="font-semibold">Subtotal Bruto:</span>
                  <span>S/ {(subtotal + descuentoTotal).toFixed(2)}</span>
                </div>
                {descuentoTotal > 0 && (
                  <div className="flex justify-end gap-2 text-red-600">
                    <span className="font-semibold">Descuentos:</span>
                    <span>-S/ {descuentoTotal.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-end gap-2 text-sm font-bold text-primary">
                  <span>Total a Pagar:</span>
                  <span>S/ {subtotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Documentos Adjuntos */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Fotos Adjuntas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            <div className="space-y-1">
              <Label className="text-xs">Cargar Fotos</Label>
              <div className="flex gap-1 flex-col md:flex-row">
                <label className="flex-1">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={manejarFotos}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed rounded-lg p-3 cursor-pointer hover:bg-secondary transition-colors text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Upload className="h-4 w-4" />
                      <span className="text-xs">Cargar fotos</span>
                    </div>
                  </div>
                </label>
                <button className="border-2 border-dashed rounded-lg p-3 hover:bg-secondary transition-colors flex items-center justify-center gap-2 md:w-24">
                  <Camera className="h-4 w-4" />
                  <span className="text-xs">Cámara</span>
                </button>
              </div>

              {fotos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 mt-2">
                  {fotos.map((foto, idx) => (
                    <div key={idx} className="relative">
                      <img src={foto || "/placeholder.svg"} alt={`Foto ${idx + 1}`} className="w-full h-20 object-cover rounded-lg" />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-5 w-5 p-0"
                        onClick={() => eliminarFoto(idx)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Observaciones */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Observaciones</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Textarea
              placeholder="Ingresa observaciones adicionales..."
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              rows={2}
              className="text-xs"
            />
          </CardContent>
        </Card>

        {/* Acciones */}
        <div className="flex flex-col md:flex-row gap-1">
          <Link href="/ventas" className="flex-1">
            <Button variant="outline" className="w-full bg-transparent h-8 text-xs">
              Volver a Gestión de Ventas
            </Button>
          </Link>
          <Button variant="outline" onClick={() => router.back()} className="flex-1 h-8 text-xs">
            Cancelar
          </Button>
          <Button className="flex-1 h-8 text-xs">
            <Download className="h-3 w-3 mr-1" />
            Guardar
          </Button>
        </div>
      </div>
    </div>
  )
}
