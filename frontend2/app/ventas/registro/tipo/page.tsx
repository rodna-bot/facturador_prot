'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Camera,
  Upload,
  Trash2,
  Plus,
  ChevronRight,
  Save,
  X,
} from 'lucide-react';

interface Producto {
  id: string;
  codigo: string;
  descripcion: string;
  precio: number;
}

interface Cliente {
  id: string;
  nombre: string;
  email: string;
}

interface Sede {
  id: string;
  nombre: string;
}

interface LineaDocumento {
  id: string;
  producto_id: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

export default function RegistroDocumentoPage() {
  const params = useParams();
  const router = useRouter();
  const tipoDocumento = params.tipo as string;

  const [formData, setFormData] = useState({
    numeroDocumento: '',
    fechaEmision: new Date().toISOString().split('T')[0],
    fechaVencimiento: '',
    moneda: 'PEN',
    igv: 18,
    tipoPago: 'al_contado',
    numeroCuotas: 1,
    clienteId: '',
    sedeId: '',
    observaciones: '',
  });

  const [productos, setProductos] = useState<Producto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [lineas, setLineas] = useState<LineaDocumento[]>([]);
  const [loading, setLoading] = useState(true);
  const [productoBusqueda, setProductoBusqueda] = useState('');
  const [clienteBusqueda, setClienteBusqueda] = useState('');
  const [mostrarProductos, setMostrarProductos] = useState(false);
  const [mostrarClientes, setMostrarClientes] = useState(false);
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [generarGuia, setGenerarGuia] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [{ data: productosData }, { data: clientesData }, { data: sedesData }] =
        await Promise.all([
          supabase.from('productos').select('*').eq('activo', true),
          supabase.from('clientes').select('*').eq('activo', true),
          supabase.from('sedes').select('*').eq('activo', true),
        ]);

      setProductos(productosData as Producto[]);
      setClientes(clientesData as Cliente[]);
      setSedes(sedesData as Sede[]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const productosFiltrrados = productos.filter(
    (p) =>
      p.codigo.toLowerCase().includes(productoBusqueda.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(productoBusqueda.toLowerCase())
  );

  const clientesFiltrrados = clientes.filter(
    (c) =>
      c.nombre.toLowerCase().includes(clienteBusqueda.toLowerCase()) ||
      c.email?.toLowerCase().includes(clienteBusqueda.toLowerCase())
  );

  const handleAgregarProducto = (producto: Producto) => {
    const existente = lineas.find((l) => l.producto_id === producto.id);

    if (existente) {
      setLineas(
        lineas.map((l) =>
          l.producto_id === producto.id
            ? {
                ...l,
                cantidad: l.cantidad + 1,
                subtotal: (l.cantidad + 1) * l.precio_unitario,
              }
            : l
        )
      );
    } else {
      setLineas([
        ...lineas,
        {
          id: Math.random().toString(),
          producto_id: producto.id,
          cantidad: 1,
          precio_unitario: producto.precio,
          subtotal: producto.precio,
        },
      ]);
    }
    setProductoBusqueda('');
    setMostrarProductos(false);
  };

  const handleEliminarLinea = (id: string) => {
    setLineas(lineas.filter((l) => l.id !== id));
  };

  const handleCambiarCantidad = (id: string, cantidad: number) => {
    setLineas(
      lineas.map((l) =>
        l.id === id
          ? {
              ...l,
              cantidad: Math.max(1, cantidad),
              subtotal: Math.max(1, cantidad) * l.precio_unitario,
            }
          : l
      )
    );
  };

  const handleImagenCapturada = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImagenes([...imagenes, ...files]);
  };

  const handleEliminarImagen = (index: number) => {
    setImagenes(imagenes.filter((_, i) => i !== index));
  };

  const handleGuardar = async () => {
    if (!formData.clienteId || !formData.sedeId || lineas.length === 0) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    try {
      const subtotal = lineas.reduce((sum, l) => sum + l.subtotal, 0);
      const totalIgv = (subtotal * formData.igv) / 100;
      const total = subtotal + totalIgv;

      const { data: documentoData, error: docError } = await supabase
        .from('documentos')
        .insert([
          {
            numero_documento: formData.numeroDocumento || `DOC-${Date.now()}`,
            tipo_documento: tipoDocumento,
            cliente_id: formData.clienteId,
            sede_id: formData.sedeId,
            fecha_emision: formData.fechaEmision,
            fecha_vencimiento: formData.fechaVencimiento,
            moneda: formData.moneda,
            igv: formData.igv,
            subtotal,
            total_igv: totalIgv,
            total,
            tipo_pago: formData.tipoPago,
            numero_cuotas: parseInt(formData.numeroCuotas.toString()),
            estado: 'borrador',
            observaciones: formData.observaciones,
          },
        ])
        .select();

      if (docError) throw docError;

      const documentoId = documentoData?.[0]?.id;

      if (documentoId && lineas.length > 0) {
        const detalles = lineas.map((l) => ({
          documento_id: documentoId,
          producto_id: l.producto_id,
          cantidad: l.cantidad,
          precio_unitario: l.precio_unitario,
          subtotal: l.subtotal,
        }));

        const { error: detalleError } = await supabase
          .from('documentos_detalle')
          .insert(detalles);

        if (detalleError) throw detalleError;
      }

      console.log('Documento guardado:', documentoId);
      console.log('Generar guía automática:', generarGuia);
      console.log('Imágenes a subir:', imagenes);

      alert('Documento guardado correctamente');
      router.push('/ventas');
    } catch (error) {
      console.error('Error guardando documento:', error);
      alert('Error al guardar el documento');
    }
  };

  if (loading) {
    return <Skeleton className="h-screen" />;
  }

  const subtotal = lineas.reduce((sum, l) => sum + l.subtotal, 0);
  const totalIgv = (subtotal * formData.igv) / 100;
  const total = subtotal + totalIgv;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            {tipoDocumento.charAt(0).toUpperCase() + tipoDocumento.slice(1)}
          </h1>
          <p className="text-muted-foreground">Crear nuevo documento</p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push('/ventas')}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Cerrar
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información del Documento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Fecha de Emisión</Label>
                  <Input
                    type="date"
                    value={formData.fechaEmision}
                    onChange={(e) =>
                      setFormData({ ...formData, fechaEmision: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Fecha de Vencimiento</Label>
                  <Input
                    type="date"
                    value={formData.fechaVencimiento}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fechaVencimiento: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Moneda</Label>
                  <Select
                    value={formData.moneda}
                    onValueChange={(value) =>
                      setFormData({ ...formData, moneda: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PEN">Soles (PEN)</SelectItem>
                      <SelectItem value="USD">Dólares (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>IGV (%)</Label>
                  <Input
                    type="number"
                    value={formData.igv}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        igv: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <h3 className="font-semibold">Tipo de Pago</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Modalidad</Label>
                    <Select
                      value={formData.tipoPago}
                      onValueChange={(value) =>
                        setFormData({ ...formData, tipoPago: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="al_contado">Al Contado</SelectItem>
                        <SelectItem value="credito">Crédito</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.tipoPago === 'credito' && (
                    <div>
                      <Label>Número de Cuotas</Label>
                      <Input
                        type="number"
                        min="1"
                        value={formData.numeroCuotas}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            numeroCuotas: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Label>Buscar Cliente</Label>
                <Input
                  placeholder="Buscar por nombre o email"
                  value={clienteBusqueda}
                  onChange={(e) => setClienteBusqueda(e.target.value)}
                  onFocus={() => setMostrarClientes(true)}
                  className="mt-2"
                />
                {mostrarClientes && clienteBusqueda && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {clientesFiltrrados.map((cliente) => (
                      <div
                        key={cliente.id}
                        className="p-3 hover:bg-slate-100 cursor-pointer border-b last:border-b-0"
                        onClick={() => {
                          setFormData({ ...formData, clienteId: cliente.id });
                          setClienteBusqueda(cliente.nombre);
                          setMostrarClientes(false);
                        }}
                      >
                        <p className="font-medium text-sm">{cliente.nombre}</p>
                        <p className="text-xs text-muted-foreground">
                          {cliente.email}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {formData.clienteId && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm">
                    Cliente: <strong>{clienteBusqueda}</strong>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Productos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Label>Buscar Producto</Label>
                <Input
                  placeholder="Buscar por código o descripción"
                  value={productoBusqueda}
                  onChange={(e) => setProductoBusqueda(e.target.value)}
                  onFocus={() => setMostrarProductos(true)}
                  className="mt-2"
                />
                {mostrarProductos && productoBusqueda && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {productosFiltrrados.map((producto) => (
                      <div
                        key={producto.id}
                        className="p-3 hover:bg-slate-100 cursor-pointer border-b last:border-b-0"
                        onClick={() => handleAgregarProducto(producto)}
                      >
                        <p className="font-medium text-sm">{producto.codigo}</p>
                        <p className="text-xs text-muted-foreground">
                          {producto.descripcion}
                        </p>
                        <p className="text-sm font-semibold">
                          ${producto.precio.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {lineas.length > 0 && (
                <div className="overflow-x-auto border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Subtotal</TableHead>
                        <TableHead className="text-right">Acción</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lineas.map((linea) => {
                        const producto = productos.find(
                          (p) => p.id === linea.producto_id
                        );
                        return (
                          <TableRow key={linea.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium text-sm">
                                  {producto?.codigo}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {producto?.descripcion}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                min="1"
                                value={linea.cantidad}
                                onChange={(e) =>
                                  handleCambiarCantidad(
                                    linea.id,
                                    parseInt(e.target.value)
                                  )
                                }
                                className="w-20"
                              />
                            </TableCell>
                            <TableCell>
                              ${linea.precio_unitario.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              ${linea.subtotal.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEliminarLinea(linea.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Evidencia / Adjuntos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => document.getElementById('camera')?.click()}
                >
                  <Camera className="h-4 w-4" />
                  Tomar Foto
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => document.getElementById('upload')?.click()}
                >
                  <Upload className="h-4 w-4" />
                  Subir Imagen
                </Button>
              </div>

              <input
                id="camera"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImagenCapturada}
                className="hidden"
              />
              <input
                id="upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagenCapturada}
                className="hidden"
              />

              {imagenes.length > 0 && (
                <div className="grid gap-2">
                  {imagenes.map((img, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 bg-slate-50 rounded-lg"
                    >
                      <span className="text-sm">{img.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEliminarImagen(idx)}
                        className="text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Observaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Notas adicionales del documento"
                value={formData.observaciones}
                onChange={(e) =>
                  setFormData({ ...formData, observaciones: e.target.value })
                }
                rows={4}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sede</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={formData.sedeId}
                onValueChange={(value) =>
                  setFormData({ ...formData, sedeId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar sede" />
                </SelectTrigger>
                <SelectContent>
                  {sedes.map((sede) => (
                    <SelectItem key={sede.id} value={sede.id}>
                      {sede.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cambiar Tipo</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => router.push('/ventas')}
              >
                <ChevronRight className="h-4 w-4" />
                Cambiar Documento
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guía de Remisión</CardTitle>
            </CardHeader>
            <CardContent>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={generarGuia}
                  onChange={(e) => setGenerarGuia(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">
                  Generar guía automáticamente
                </span>
              </label>
              <p className="text-xs text-muted-foreground mt-2">
                Se creará una guía de remisión automática vinculada
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">Resumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span className="font-semibold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>IGV ({formData.igv}%):</span>
                <span className="font-semibold">
                  ${totalIgv.toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Moneda: {formData.moneda}
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleGuardar}
            className="w-full bg-green-600 hover:bg-green-700 gap-2 h-12 text-base"
            disabled={!formData.clienteId || !formData.sedeId || lineas.length === 0}
          >
            <Save className="h-5 w-5" />
            Guardar Documento
          </Button>
        </div>
      </div>
    </div>
  );
}
