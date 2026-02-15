"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClientDialog } from "@/components/client-dialog"
import { DownloadButton } from "@/components/download-button"

const mockClients = [
  {
    id: 1,
    nombre: "Juan Pérez",
    telefono: "555-0101",
    email: "juan@email.com",
    direccion: "Calle Principal 123",
    distrito: "Lima",
    fechaNacimiento: "1985-03-15",
    edad: 39,
    compras: 15,
    total: 1250.5,
    tipo: "Frecuente",
  },
  {
    id: 2,
    nombre: "María García",
    telefono: "555-0102",
    email: "maria@email.com",
    direccion: "Av. Central 456",
    distrito: "San Isidro",
    fechaNacimiento: "1990-07-22",
    edad: 34,
    compras: 8,
    total: 680.0,
    tipo: "Regular",
  },
  {
    id: 3,
    nombre: "Carlos López",
    telefono: "555-0103",
    email: "carlos@email.com",
    direccion: "Plaza Mayor 789",
    distrito: "Miraflores",
    fechaNacimiento: "1978-11-08",
    edad: 46,
    compras: 25,
    total: 3200.75,
    tipo: "VIP",
  },
  {
    id: 4,
    nombre: "Ana Martínez",
    telefono: "555-0104",
    email: "ana@email.com",
    direccion: "Calle Secundaria 321",
    distrito: "Surco",
    fechaNacimiento: "2000-01-30",
    edad: 24,
    compras: 3,
    total: 180.0,
    tipo: "Nuevo",
  },
  {
    id: 5,
    nombre: "Pedro Sánchez",
    telefono: "555-0105",
    email: "pedro@email.com",
    direccion: "Av. Norte 654",
    distrito: "Carabayllo",
    fechaNacimiento: "1992-05-18",
    edad: 32,
    compras: 12,
    total: 1450.25,
    tipo: "Frecuente",
  },
]

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<(typeof mockClients)[0] | null>(null)

  /* Added client type filter */
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.telefono.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || client.tipo === typeFilter

    return matchesSearch && matchesType
  })

  const handleEdit = (client: (typeof mockClients)[0]) => {
    setEditingClient(client)
    setIsDialogOpen(true)
  }

  const handleNew = () => {
    setEditingClient(null)
    setIsDialogOpen(true)
  }

  /* Calculate stats */
  const vipCount = mockClients.filter((c) => c.tipo === "VIP").length
  const frecuenteCount = mockClients.filter((c) => c.tipo === "Frecuente").length
  const totalSpent = mockClients.reduce((acc, c) => acc + c.total, 0)

  return (
    <div className="pb-16">
      <div className="bg-gradient-to-b from-primary/10 to-transparent border-b border-border/40 p-4">
        <h2 className="text-2xl font-bold">Gestión de Clientes</h2>
        <p className="text-sm text-muted-foreground mt-1">Administra tu base de datos de clientes</p>
      </div>

      <main className="p-3 md:p-4 space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
          <Card className="border">
            <CardContent className="p-3 md:p-4">
              <p className="text-xs font-medium text-muted-foreground">Total</p>
              <p className="text-2xl font-bold mt-1">{mockClients.length}</p>
              <p className="text-xs text-muted-foreground mt-1">clientes registrados</p>
            </CardContent>
          </Card>
          <Card className="border bg-gradient-to-br from-yellow-50 to-transparent dark:from-yellow-950/20">
            <CardContent className="p-3 md:p-4">
              <p className="text-xs font-medium text-muted-foreground">VIP</p>
              <p className="text-2xl font-bold mt-1 text-yellow-600 dark:text-yellow-400">{vipCount}</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">premium</p>
            </CardContent>
          </Card>
          <Card className="border bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-950/20">
            <CardContent className="p-3 md:p-4">
              <p className="text-xs font-medium text-muted-foreground">Frecuentes</p>
              <p className="text-2xl font-bold mt-1 text-emerald-600 dark:text-emerald-400">{frecuenteCount}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">activos</p>
            </CardContent>
          </Card>
          <Card className="border bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20">
            <CardContent className="p-3 md:p-4">
              <p className="text-xs font-medium text-muted-foreground">Total Gasto</p>
              <p className="text-2xl font-bold mt-1">S/ {(totalSpent / 1000).toFixed(1)}k</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">acumulado</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border">
          <CardHeader className="p-3 md:p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Clientes
                </CardTitle>
                <DownloadButton title="Clientes" data={filteredClients} />
              </div>
              <div className="flex gap-2 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, teléfono o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-9 text-sm"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="h-9 w-24 md:w-32 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="VIP">VIP</SelectItem>
                    <SelectItem value="Frecuente">Frecuente</SelectItem>
                    <SelectItem value="Regular">Regular</SelectItem>
                    <SelectItem value="Nuevo">Nuevo</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" onClick={handleNew} className="h-9">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1">Nuevo</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-2">
            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="h-9 py-2 text-xs font-semibold whitespace-nowrap">Nombre</TableHead>
                    <TableHead className="h-9 py-2 text-xs font-semibold whitespace-nowrap">Teléfono</TableHead>
                    <TableHead className="h-9 py-2 text-xs font-semibold whitespace-nowrap">Email</TableHead>
                    <TableHead className="h-9 py-2 text-xs font-semibold whitespace-nowrap">Compras</TableHead>
                    <TableHead className="h-9 py-2 text-xs font-semibold whitespace-nowrap text-right">Total</TableHead>
                    <TableHead className="h-9 py-2 text-xs font-semibold whitespace-nowrap">Tipo</TableHead>
                    <TableHead className="h-9 py-2 text-xs font-semibold text-right whitespace-nowrap">
                      Acción
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id} className="h-10 hover:bg-secondary/30">
                      <TableCell className="font-medium text-sm py-2 whitespace-nowrap">{client.nombre}</TableCell>
                      <TableCell className="text-xs py-2 whitespace-nowrap">{client.telefono}</TableCell>
                      <TableCell className="text-xs py-2 whitespace-nowrap">{client.email}</TableCell>
                      <TableCell className="py-2 whitespace-nowrap">
                        <Badge variant="outline" className="text-xs">
                          {client.compras}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm font-semibold py-2 whitespace-nowrap text-right">
                        S/ {client.total.toFixed(2)}
                      </TableCell>
                      <TableCell className="py-2">
                        <Badge
                          className={`text-xs ${
                            client.tipo === "VIP"
                              ? "bg-yellow-600 hover:bg-yellow-700"
                              : client.tipo === "Frecuente"
                                ? "bg-emerald-600 hover:bg-emerald-700"
                                : client.tipo === "Nuevo"
                                  ? "bg-blue-600 hover:bg-blue-700"
                                  : "bg-gray-600 hover:bg-gray-700"
                          }`}
                        >
                          {client.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right py-2">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7" onClick={() => handleEdit(client)}>
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
      </main>

      <ClientDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} client={editingClient} />
    </div>
  )
}
