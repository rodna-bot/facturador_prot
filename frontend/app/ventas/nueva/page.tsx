"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { mockProducts } from "@/components/shared-products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Plus, Trash2, Upload, Camera, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock SUNAT data
const sunatDatabase: Record<string, any> = {
  "20123456789": {
    nombre: "HEALTHVIT PERU SAC",
    razonSocial: "HEALTHVIT PERU SAC",
    direccion: "Av. Larco 1234, Piso 5",
    distrito: "Miraflores",
    provincia: "Lima",
    departamento: "Lima",
    tipo: "RUC",
  },
  "12345678": {
    nombre: "Juan Pérez García",
    razonSocial: "Juan Pérez García",
    direccion: "Jr. Principal 567",
    distrito: "San Isidro",
    provincia: "Lima",
    departamento: "Lima",
    tipo: "DNI",
  },
  "87654321": {
    nombre: "María González López",
    razonSocial: "María González López",
    direccion: "Av. Paseo de la República 890",
    distrito: "Surquillo",
    provincia: "Lima",
    departamento: "Lima",
    tipo: "DNI",
  },
}

export default function NuevaVentaPage() {
  const router = useRouter()
  const { handleSubmit } = useForm()
  const [products, setProducts] = useState<any[]>([])
  const [photos, setPhotos] = useState<string[]>([])
  const [discount, setDiscount] = useState(0)
  const [documento, setDocumento] = useState("")
  const [clienteData, setClienteData] = useState<any>(null)
  const [buscando, setBuscando] = useState(false)

  const buscarClienteSUNAT = async (doc: string) => {
    if (!doc || doc.trim().length === 0) return

    setBuscando(true)
    // Simulamos delay de API
    setTimeout(() => {
      const data = sunatDatabase[doc]
      if (data) {
        setClienteData(data)
      } else {
        setClienteData(null)
      }
      setBuscando(false)
    }, 800)
  }

  const addProduct = () => {
    setProducts([
      ...products,
      { id: Date.now(), quantity: 1, price: 0, discount: 0, isKit: false, productId: null, stock: 0 },
    ])
  }

  const removeProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const updateProduct = (id: number, field: string, value: any) => {
    setProducts(
      products.map((p) => {
        if (p.id === id) {
          if (field === "productId" && value) {
            const selectedProduct = mockProducts.find((mp) => mp.id === value)
            if (selectedProduct) {
              return {
                ...p,
                [field]: value,
                name: selectedProduct.nombre,
                price: selectedProduct.precio,
                stock: selectedProduct.stock,
                codigo: selectedProduct.codigo,
              }
            }
          }
          return { ...p, [field]: value }
        }
        return p
      }),
    )
  }

  const calculateTotal = () => {
    const subtotal = products.reduce((sum, p) => sum + p.quantity * p.price * (1 - p.discount / 100), 0)
    const igv = subtotal * 0.18
    const discountAmount = (subtotal + igv) * (discount / 100)
    return {
      subtotal: subtotal,
      igv: igv,
      discount: discountAmount,
      total: subtotal + igv - discountAmount,
    }
  }

  const totals = calculateTotal()

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPhotos([...photos, e.target?.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  return (
    <div className="pb-16">
      <div className="p-2 sm:p-3 md:p-4 lg:p-6">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="h-8 md:h-9">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Nueva Venta</h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              Registra venta conforme a normativas tributarias peruanas
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(() => {})} className="space-y-4 sm:space-y-5 md:space-y-6">
          {/* Información General */}
          <Card>
            <CardContent className="p-3 md:p-4">
              <h3 className="font-bold text-sm md:text-base mb-3">Información del Cliente (SUNAT)</h3>
              
              {/* RUC/DNI Input */}
              <div className="mb-4 pb-4 border-b">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs md:text-sm font-semibold">RUC / DNI</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ingresa RUC o DNI"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            buscarClienteSUNAT(documento)
                          }
                        }}
                        className="h-8 md:h-9 text-xs md:text-sm"
                      />
                      <Button
                        type="button"
                        onClick={() => buscarClienteSUNAT(documento)}
                        disabled={!documento || buscando}
                        className="h-8 md:h-9 text-xs md:text-sm"
                      >
                        {buscando ? "Buscando..." : "Buscar"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información del Cliente desde SUNAT */}
              {clienteData && (
                <div className="mb-4 pb-4 border-b bg-gradient-to-r from-emerald-50 to-emerald-50/50 p-3 rounded-lg">
                  <div className="flex items-start gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs md:text-sm font-semibold text-emerald-900">Datos del Cliente Encontrados</p>
                      <p className="text-xs text-emerald-700">{clienteData.tipo}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Nombre / Razón Social</p>
                      <p className="text-sm font-semibold">{clienteData.razonSocial}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Dirección</p>
                      <p className="text-sm font-semibold">{clienteData.direccion}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Distrito</p>
                      <p className="text-sm font-semibold">{clienteData.distrito}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Departamento</p>
                      <p className="text-sm font-semibold">{clienteData.departamento}</p>
                    </div>
                  </div>
                </div>
              )}

              {documento && !clienteData && !buscando && (
                <div className="mb-4 pb-4 border-b bg-gradient-to-r from-amber-50 to-amber-50/50 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs md:text-sm font-semibold text-amber-900">Cliente no encontrado en SUNAT</p>
                      <p className="text-xs text-amber-700">Verifica el número ingresado</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Método de Pago y Comprobante */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs md:text-sm">Método de Pago</Label>
                  <Select defaultValue="efectivo">
                    <SelectTrigger className="h-8 md:h-9 text-xs md:text-sm">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="efectivo">Efectivo</SelectItem>
                      <SelectItem value="yape">Yape</SelectItem>
                      <SelectItem value="plin">Plin</SelectItem>
                      <SelectItem value="izipay">IZIPAY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs md:text-sm">Comprobante Fiscal</Label>
                  <Select defaultValue="boleta">
                    <SelectTrigger className="h-8 md:h-9 text-xs md:text-sm">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="factura">Factura</SelectItem>
                      <SelectItem value="boleta">Boleta</SelectItem>
                      <SelectItem value="nota-credito">Nota de Crédito</SelectItem>
                      <SelectItem value="nota-debito">Nota de Débito</SelectItem>
                      <SelectItem value="comunicacion-baja">Comunicación de Baja</SelectItem>
                      <SelectItem value="factura-electronica">Factura Electrónica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fotos de Comprobante */}
          <Card>
            <CardContent className="p-3 md:p-4">
              <h3 className="font-bold text-sm md:text-base mb-3">Fotos de Comprobante de Pago</h3>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 flex-wrap">
                  <label className="flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer hover:bg-gray-50 text-xs md:text-sm">
                    <Upload className="h-4 w-4" />
                    Subir Foto
                    <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer hover:bg-gray-50 text-xs md:text-sm">
                    <Camera className="h-4 w-4" />
                    Cámara
                    <input
                      type="file"
                      capture="environment"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {photos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {photos.map((photo, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={photo || "/placeholder.svg"}
                          alt={`Comprobante ${idx + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                        <button
                          onClick={() => setPhotos(photos.filter((_, i) => i !== idx))}
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        >
                          <Trash2 className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Productos */}
          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="font-bold text-sm md:text-base">Productos / Servicios</h3>
                <Button size="sm" onClick={addProduct} className="h-7 md:h-9 text-xs md:text-sm">
                  <Plus className="h-3 w-3 mr-1" />
                  Agregar Producto
                </Button>
              </div>

              {products.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-[10px] md:text-xs">Producto</TableHead>
                        <TableHead className="text-[10px] md:text-xs">Stock</TableHead>
                        <TableHead className="text-[10px] md:text-xs">Cantidad</TableHead>
                        <TableHead className="text-[10px] md:text-xs">Precio</TableHead>
                        <TableHead className="text-[10px] md:text-xs">Kit</TableHead>
                        <TableHead className="text-[10px] md:text-xs">Desc %</TableHead>
                        <TableHead className="text-[10px] md:text-xs">Total</TableHead>
                        <TableHead className="w-8"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="text-[10px] md:text-xs">
                            <Select
                              value={product.productId?.toString() || ""}
                              onValueChange={(value) => updateProduct(product.id, "productId", Number.parseInt(value))}
                            >
                              <SelectTrigger className="h-7 md:h-8 text-[10px] md:text-xs">
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockProducts.map((mp) => (
                                  <SelectItem key={mp.id} value={mp.id.toString()}>
                                    {mp.nombre} ({mp.codigo})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-[10px] md:text-xs font-semibold">
                            <span className={product.stock < 50 ? "text-red-600" : "text-green-600"}>
                              {product.stock}
                            </span>
                          </TableCell>
                          <TableCell className="text-[10px] md:text-xs">
                            <Input
                              type="number"
                              placeholder="1"
                              className="h-7 md:h-8 text-[10px] md:text-xs w-16"
                              onChange={(e) =>
                                updateProduct(product.id, "quantity", Number.parseFloat(e.target.value) || 1)
                              }
                              defaultValue="1"
                            />
                          </TableCell>
                          <TableCell className="text-[10px] md:text-xs">
                            <Input
                              type="number"
                              placeholder="0.00"
                              className="h-7 md:h-8 text-[10px] md:text-xs w-20"
                              value={product.price}
                              onChange={(e) =>
                                updateProduct(product.id, "price", Number.parseFloat(e.target.value) || 0)
                              }
                            />
                          </TableCell>
                          <TableCell className="text-[10px] md:text-xs">
                            <input
                              type="checkbox"
                              className="h-4 w-4"
                              onChange={(e) => updateProduct(product.id, "isKit", e.target.checked)}
                            />
                          </TableCell>
                          <TableCell className="text-[10px] md:text-xs">
                            <Input
                              type="number"
                              placeholder="0"
                              className="h-7 md:h-8 text-[10px] md:text-xs w-16"
                              onChange={(e) =>
                                updateProduct(product.id, "discount", Number.parseFloat(e.target.value) || 0)
                              }
                            />
                          </TableCell>
                          <TableCell className="text-[10px] md:text-xs font-semibold">
                            S/ {(product.quantity * product.price * (1 - product.discount / 100)).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <button
                              onClick={() => removeProduct(product.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-xs md:text-sm text-muted-foreground text-center py-4">Sin productos agregados</p>
              )}
            </CardContent>
          </Card>

          {/* Resumen */}
          <Card className="bg-gray-50">
            <CardContent className="p-3 md:p-4">
              <h3 className="font-bold text-sm md:text-base mb-3">Resumen</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Subtotal</p>
                  <p className="text-base md:text-xl font-bold">S/ {totals.subtotal.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">IGV (18%)</p>
                  <p className="text-base md:text-xl font-bold">S/ {totals.igv.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Desc. General %</p>
                  <Input
                    type="number"
                    placeholder="0"
                    className="h-8 md:h-9 text-xs md:text-sm"
                    onChange={(e) => setDiscount(Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Descuento</p>
                  <p className="text-base md:text-xl font-bold text-red-600">-S/ {totals.discount.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-3 p-2 bg-white rounded border border-green-200">
                <p className="text-xs md:text-sm text-muted-foreground">Total a Pagar</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600">S/ {totals.total.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Guía de Remisión Electrónica */}
          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm md:text-base">Guía de Remisión Electrónica (GRE)</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Se emitirá automáticamente</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={() => router.back()} className="text-xs md:text-sm h-8 md:h-9">
              Cancelar
            </Button>
            <Button className="text-xs md:text-sm h-8 md:h-9">Guardar Venta</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
