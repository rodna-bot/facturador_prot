"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function NotaCreditoPage() {
  const router = useRouter()
  const [ruc, setRuc] = useState("")
  const [clienteData, setClienteData] = useState<any>(null)
  const [numeroFacturaOriginal, setNumeroFacturaOriginal] = useState("")
  const [motivoDevolucion, setMotivoDevolucion] = useState("")
  const [montoOriginal, setMontoOriginal] = useState("0")
  const [porcentajeDevolucion, setPorcentajeDevolucion] = useState("50")
  const [observaciones, setObservaciones] = useState("")

  const sunatDatabase: Record<string, any> = {
    "20123456789": {
      razonSocial: "HEALTHVIT PERU SAC",
      direccion: "Av. Larco 1234, Piso 5",
      distrito: "Miraflores",
      provincia: "Lima",
      departamento: "Lima",
    },
  }

  const buscarRUC = async () => {
    if (!ruc || ruc.length < 11) return
    const data = sunatDatabase[ruc]
    setClienteData(data || null)
  }

  const montoDevolucion = (parseFloat(montoOriginal) * parseFloat(porcentajeDevolucion)) / 100
  const igv = montoDevolucion * 0.18

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-to-b from-purple-50 to-transparent border-b border-purple-200 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/ventas">
            <Button variant="ghost" size="sm" className="h-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Crear Nota de Crédito ↩️</h1>
        </div>
        <p className="text-sm text-muted-foreground ml-10">
          Para devolver dinero o rebajas en operaciones (Requiere RUC)
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        {/* Datos del Cliente */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Datos del Cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>RUC (Requerido)</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ingresa RUC del cliente"
                    value={ruc}
                    onChange={(e) => setRuc(e.target.value)}
                    maxLength={11}
                  />
                  <Button onClick={buscarRUC} disabled={ruc.length < 11}>
                    Buscar
                  </Button>
                </div>
              </div>
            </div>

            {clienteData && (
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Razón Social</p>
                    <p className="font-semibold">{clienteData.razonSocial}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Dirección</p>
                    <p className="font-semibold">{clienteData.direccion}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Distrito</p>
                    <p className="font-semibold">{clienteData.distrito}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Departamento</p>
                    <p className="font-semibold">{clienteData.departamento}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Datos de la Nota de Crédito */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Datos de la Nota de Crédito</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Serie</Label>
              <Input placeholder="NC01" value="NC01" disabled />
            </div>
            <div className="space-y-2">
              <Label>Número</Label>
              <Input placeholder="000001" value="000001" disabled />
            </div>
            <div className="space-y-2">
              <Label>Fecha de Emisión</Label>
              <Input type="date" defaultValue="2024-12-21" />
            </div>
            <div className="space-y-2">
              <Label>Motivo de Devolución</Label>
              <Select value={motivoDevolucion} onValueChange={setMotivoDevolucion}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="producto-defectuoso">Producto Defectuoso</SelectItem>
                  <SelectItem value="producto-vencido">Producto Vencido</SelectItem>
                  <SelectItem value="cantidad-incorrecta">Cantidad Incorrecta</SelectItem>
                  <SelectItem value="especificacion-incorrecta">Especificación Incorrecta</SelectItem>
                  <SelectItem value="acuerdo-comercial">Acuerdo Comercial</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Información de la Factura Original */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Referencia del Comprobante Original</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Número de Factura Original</Label>
                <Input
                  placeholder="Ej: F001-000123"
                  value={numeroFacturaOriginal}
                  onChange={(e) => setNumeroFacturaOriginal(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha de Factura Original</Label>
                <Input type="date" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monto de Devolución */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monto de Devolución</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Monto Original de Factura (S/)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={montoOriginal}
                  onChange={(e) => setMontoOriginal(e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label>% de Devolución</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={porcentajeDevolucion}
                  onChange={(e) => setPorcentajeDevolucion(e.target.value)}
                  placeholder="50"
                />
              </div>
              <div className="space-y-2">
                <Label>Monto a Devolver (S/)</Label>
                <Input value={montoDevolucion.toFixed(2)} disabled className="bg-blue-50 font-semibold" />
              </div>
            </div>

            {/* Resumen */}
            <Separator className="my-4" />
            <div className="bg-purple-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Monto a Devolver:</span>
                <span className="font-semibold">S/ {montoDevolucion.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>IGV (18%):</span>
                <span className="font-semibold">S/ {igv.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-bold text-primary">
                <span>Total Devolución:</span>
                <span>S/ {(montoDevolucion + igv).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Observaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Observaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Agrega notas adicionales sobre la devolución..."
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              className="min-h-24"
            />
          </CardContent>
        </Card>

        {/* Acciones */}
        <div className="flex gap-2 justify-end sticky bottom-24">
          <Link href="/ventas">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button disabled={!clienteData || !numeroFacturaOriginal} className="gap-2">
            <Send className="h-4 w-4" />
            Emitir Nota de Crédito
          </Button>
        </div>
      </div>
    </div>
  )
}
