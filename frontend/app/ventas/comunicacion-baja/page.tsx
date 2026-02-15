"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function ComunicacionBajaPage() {
  const router = useRouter()
  const [ruc, setRuc] = useState("")
  const [clienteData, setClienteData] = useState<any>(null)
  const [tipo, setTipo] = useState("factura")
  const [serie, setSerie] = useState("")
  const [numeroInicio, setNumeroInicio] = useState("")
  const [numeroFin, setNumeroFin] = useState("")
  const [motivo, setMotivo] = useState("")
  const [items, setItems] = useState<any[]>([])

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

  const agregarRango = () => {
    if (!serie || !numeroInicio || !numeroFin) return
    const inicio = parseInt(numeroInicio)
    const fin = parseInt(numeroFin)
    if (inicio > fin) return

    const nuevoItem = {
      id: Date.now(),
      tipo,
      serie,
      numeroInicio: inicio,
      numeroFin: fin,
      cantidad: fin - inicio + 1,
    }

    setItems([...items, nuevoItem])
    setSerie("")
    setNumeroInicio("")
    setNumeroFin("")
  }

  const eliminarItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const totalComprobantes = items.reduce((sum, item) => sum + item.cantidad, 0)

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-to-b from-red-50 to-transparent border-b border-red-200 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/ventas">
            <Button variant="ghost" size="sm" className="h-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Comunicación de Baja ❌</h1>
        </div>
        <p className="text-sm text-muted-foreground ml-10">
          Para dar de baja comprobantes no utilizados ante SUNAT (Requiere RUC)
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        {/* Datos del Cliente */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Datos de la Empresa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>RUC (Requerido)</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ingresa RUC de la empresa"
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
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
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

        {/* Datos de la Comunicación */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Datos de la Comunicación de Baja</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Fecha de Comunicación</Label>
              <Input type="date" defaultValue="2024-12-21" />
            </div>
            <div className="space-y-2">
              <Label>Motivo de Baja</Label>
              <Select value={motivo} onValueChange={setMotivo}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-utilizados">No utilizados</SelectItem>
                  <SelectItem value="inutilizados">Inutilizados</SelectItem>
                  <SelectItem value="perdida">Pérdida</SelectItem>
                  <SelectItem value="robo">Robo</SelectItem>
                  <SelectItem value="defectuosos">Defectuosos</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Referencia</Label>
              <Input placeholder="Número de referencia (opcional)" />
            </div>
          </CardContent>
        </Card>

        {/* Agregar Rango de Comprobantes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Rangos de Comprobantes a dar de Baja</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="space-y-2">
                <Label>Tipo de Comprobante</Label>
                <Select value={tipo} onValueChange={setTipo}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="factura">Factura</SelectItem>
                    <SelectItem value="boleta">Boleta</SelectItem>
                    <SelectItem value="nota-credito">Nota Crédito</SelectItem>
                    <SelectItem value="nota-debito">Nota Débito</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Serie</Label>
                <Input
                  placeholder="F001"
                  value={serie}
                  onChange={(e) => setSerie(e.target.value)}
                  maxLength={10}
                />
              </div>
              <div className="space-y-2">
                <Label>Número Inicio</Label>
                <Input
                  type="number"
                  placeholder="000001"
                  value={numeroInicio}
                  onChange={(e) => setNumeroInicio(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Número Fin</Label>
                <Input
                  type="number"
                  placeholder="000010"
                  value={numeroFin}
                  onChange={(e) => setNumeroFin(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={agregarRango} className="w-full">
                  <Plus className="h-4 w-4 mr-1" />
                  Agregar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detalle de Rangos */}
        {items.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Comprobantes a Dar de Baja ({totalComprobantes})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Serie</TableHead>
                      <TableHead className="text-right">Desde</TableHead>
                      <TableHead className="text-right">Hasta</TableHead>
                      <TableHead className="text-right">Cantidad</TableHead>
                      <TableHead>Acción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium capitalize">{item.tipo}</TableCell>
                        <TableCell>{item.serie}</TableCell>
                        <TableCell className="text-right">{String(item.numeroInicio).padStart(6, "0")}</TableCell>
                        <TableCell className="text-right">{String(item.numeroFin).padStart(6, "0")}</TableCell>
                        <TableCell className="text-right font-semibold">{item.cantidad}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => eliminarItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Separator className="my-4" />
              <div className="flex justify-end gap-2">
                <span className="font-semibold">Total de Comprobantes:</span>
                <span className="text-lg font-bold text-primary">{totalComprobantes}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Acciones */}
        <div className="flex gap-2 justify-end sticky bottom-24">
          <Link href="/ventas">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button disabled={!clienteData || items.length === 0 || !motivo} className="gap-2">
            <Send className="h-4 w-4" />
            Comunicar Baja a SUNAT
          </Button>
        </div>
      </div>
    </div>
  )
}
