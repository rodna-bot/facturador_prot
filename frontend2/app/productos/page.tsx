'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  TrendingUp,
  Package,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Producto {
  id: string;
  codigo: string;
  descripcion: string;
  precio: number;
  stock: number;
  activo: boolean;
}

interface ProductoMasVendido {
  producto_id: string;
  descripcion: string;
  total_vendido: number;
}

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoMasVendido, setProductoMasVendido] =
    useState<ProductoMasVendido | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductos();
    fetchProductoMasVendido();
  }, []);

  const fetchProductos = async () => {
    try {
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProductos(data || []);
    } catch (error) {
      console.error('Error fetching productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductoMasVendido = async () => {
    try {
      const { data, error } = await supabase
        .from('ventas_detalle')
        .select(
          `
          producto_id,
          cantidad,
          productos (descripcion)
        `
        )
        .limit(1000);

      if (error) throw error;

      if (data && data.length > 0) {
        const ventasPorProducto = data.reduce((acc: any, item: any) => {
          const productoId = item.producto_id;
          if (!acc[productoId]) {
            acc[productoId] = {
              producto_id: productoId,
              descripcion: item.productos?.descripcion || 'Desconocido',
              total_vendido: 0,
            };
          }
          acc[productoId].total_vendido += item.cantidad;
          return acc;
        }, {});

        const masVendido = Object.values(ventasPorProducto).sort(
          (a: any, b: any) => b.total_vendido - a.total_vendido
        )[0] as ProductoMasVendido;

        setProductoMasVendido(masVendido);
      }
    } catch (error) {
      console.error('Error fetching producto más vendido:', error);
    }
  };

  const handleAddProducto = () => {
    console.log('Agregar producto - Conectar al backend');
  };

  const handleEditProducto = (id: string) => {
    console.log('Editar producto:', id, '- Conectar al backend');
  };

  const handleDeleteProducto = async (id: string) => {
    console.log('Eliminar producto:', id, '- Conectar al backend');
  };

  const filteredProductos = productos.filter(
    (producto) =>
      producto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Productos</h1>
        <p className="text-muted-foreground text-lg">
          Gestiona tu catálogo de productos
        </p>
      </div>

      {productoMasVendido && (
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Producto Más Vendido</span>
            </CardTitle>
            <CardDescription>El producto con mayor demanda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {productoMasVendido.descripcion}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Total vendido: {productoMasVendido.total_vendido} unidades
                </p>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Package className="h-4 w-4 mr-2" />
                Top 1
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <CardTitle>Lista de Productos</CardTitle>
              <CardDescription>
                {filteredProductos.length} productos encontrados
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por código o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddProducto} className="flex-1 sm:flex-none">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Código</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-right w-[120px]">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProductos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center space-y-2">
                        <Package className="h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          No se encontraron productos
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProductos.map((producto) => (
                    <TableRow key={producto.id}>
                      <TableCell className="font-mono font-medium">
                        {producto.codigo}
                      </TableCell>
                      <TableCell>{producto.descripcion}</TableCell>
                      <TableCell className="text-right font-semibold">
                        ${Number(producto.precio).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            producto.stock <= 5 ? 'destructive' : 'secondary'
                          }
                        >
                          {producto.stock} unidades
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={producto.activo ? 'default' : 'outline'}
                        >
                          {producto.activo ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditProducto(producto.id)}
                            title="Editar producto"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProducto(producto.id)}
                            title="Eliminar producto"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
