import { DataSource } from 'typeorm';
import { Rol } from '../../auth/entities/rol.entity';
import { Usuario } from '../../auth/entities/usuario.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { Sede } from '../../sedes/entities/sede.entity';
import { TipoDocumento } from '../../tipos-documento/entities/tipo-documento.entity';

export const runSeed = async (dataSource: DataSource) => {
  const rolRepo = dataSource.getRepository(Rol);
  const usuarioRepo = dataSource.getRepository(Usuario);
  const productoRepo = dataSource.getRepository(Producto);
  const sedeRepo = dataSource.getRepository(Sede);
  const tipoDocRepo = dataSource.getRepository(TipoDocumento);

  // 1. VERIFICACIÓN DE SEGURIDAD
  // Si ya existen usuarios, asumimos que el seed ya corrió y salimos
  const existingUsers = await usuarioRepo.count();
  if (existingUsers > 0) {
    console.log('✅ La base de datos ya tiene datos. Saltando Seeding...');
    return;
  }

 
  
  console.log('🌱 Iniciando carga de datos (Seeding)...');

  // 2. CREAR ROLES (Guardamos las instancias para usarlas luego)
  const roles = await rolRepo.save([
    rolRepo.create({ nombre: 'admin' }),
    rolRepo.create({ nombre: 'usuario' }),
  ]);
 const rolAdmin = roles.find((r) => r.nombre === 'admin');
  const rolUsuario = roles.find((r) => r.nombre === 'usuario');
if (!rolAdmin || !rolUsuario) {
    throw new Error('No se pudieron crear/encontrar roles');
  }
  // 3. CREAR TIPOS DE DOCUMENTO
  await tipoDocRepo.save([
    { nombre: 'Factura Electrónica' },
    { nombre: 'Boleta de Venta' },
    { nombre: 'Nota de Crédito' },
    { nombre: 'Nota de Débito' },
  ]);

  // 4. CREAR USUARIOS (Usando tus hashes corregidos)
  await usuarioRepo.save([
    usuarioRepo.create({
      email: 'admin@farmacia.com',
      password: '$2a$12$XG/m85akr4G2Il3EY./Z/eZtEtp6qNA4wW6IzzHA3..HPkyAGROtm',// admin123password
      /*razonSocial: 'Farmacia Salud S.A.C.',
      ruc: 20123456789,*/
      roles: [rolAdmin],
    }),
    usuarioRepo.create({
      email: 'user@farmacia.com',
      password: '$2a$12$YY6B0y4KObM5WiSmcIVxzOmRrgj6NsM4sZhNZ/pHpWjwOa9DaeHbK',// user123password
     /* razonSocial: 'Farmacia SinSalud S.A.C.',
      ruc: 20604128541,*/
      roles: [rolUsuario],
    })
  ]);

  // 5. CREAR SEDES
  await sedeRepo.save([
    {
      direccion: 'Av. Las Medicinas 123',
      departamento: 'Lima',
      provincia: 'Lima',
      distrito: 'San Martín de Porres',
      telefono: 987654321,
    },
  ]);

  // 6. CREAR PRODUCTOS (PASTILLAS)
  await productoRepo.save([
    { descripcion: 'Paracetamol 500mg - Caja x 100', precio: 15.50, precio_total: 18.29 },
    { descripcion: 'Amoxicilina 500mg - Blister x 10', precio: 12.00, precio_total: 14.16 },
    { descripcion: 'Ibuprofeno 400mg - Caja x 50', precio: 25.00, precio_total: 29.50 },
    { descripcion: 'Cetirizina 10mg - Blister x 10', precio: 8.50, precio_total: 10.03 },
    { descripcion: 'Omeprazol 20mg - Caja x 30', precio: 45.00, precio_total: 53.10 },
  ]);

  console.log('✅ Seeding completado con éxito.');
};