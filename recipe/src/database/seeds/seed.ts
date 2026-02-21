import { DataSource } from 'typeorm';
import { Rol } from 'src/auth/entities/rol.entity';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Sede } from 'src/sedes/entities/sede.entity';
import { TipoDocumento } from 'src/tipos-documento/entities/tipo-documento.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Comprobante } from 'src/comprobantes/entities/comprobante.entity';
import dataSource from 'src/database/data-source';

const runSeed = async (dataSource: DataSource) => {
  const rolRepo = dataSource.getRepository(Rol);
  const usuarioRepo = dataSource.getRepository(Usuario);
  const productoRepo = dataSource.getRepository(Producto);
  const sedeRepo = dataSource.getRepository(Sede);
  const tipoDocRepo = dataSource.getRepository(TipoDocumento);
  const clienteRepo = dataSource.getRepository(Cliente);
  const comprobanteRepo = dataSource.getRepository(Comprobante);

  // 1. VERIFICACIÓN DE SEGURIDAD (Idempotencia)
  const existingComprobantes = await comprobanteRepo.count();
  if (existingComprobantes > 0) {
    console.log('✅ El seed de comprobantes ya existe. Saltando...');
    return;
  }

  console.log('🌱 Iniciando carga de datos completa...');

  // 2. CREAR ROLES Y TIPOS DOC
  const rolAdmin = rolRepo.create({ nombre: 'admin' });
  const rolUser = rolRepo.create({ nombre: 'usuario' });
  await rolRepo.save([rolAdmin, rolUser]);

  const tiposDoc = await tipoDocRepo.save([
    { nombre: 'Factura Electrónica' }, // ID 1
    { nombre: 'Boleta de Venta' }, // ID 2
  ]);

  // 3. CREAR SEDE, PRODUCTO Y CLIENTE
  const sede = await sedeRepo.save({
    direccion: 'Av. Las Medicinas 123',
    departamento: 'Lima',
    provincia: 'Lima',
    distrito: 'San Martín de Porres',
    telefono: 987654321,
  });

  const producto = await productoRepo.save({
    descripcion: 'Paracetamol 500mg',
    precio: 15.5,
    precio_total: 18.29,
  });

  const cliente = await clienteRepo.save({
    nombre: 'Juan Pérez',
    esEmpresa: false,
    dni: '77778888',
  });

  // 4. CREAR USUARIO ADMIN
  const adminUser = await usuarioRepo.save(
    usuarioRepo.create({
      email: 'admin@farmacia.com',
      password: '$2a$12$XG/m85akr4G2Il3EY./Z/eZtEtp6qNA4wW6IzzHA3..HPkyAGROtm',
      /*razonSocial: 'Farmacia Salud S.A.C.',
    ruc: 20123456789,*/
      roles: [rolAdmin],
    }),
  );
  const User = usuarioRepo.create({
    email: 'user@farmacia.com',
    password: '$2a$12$YY6B0y4KObM5WiSmcIVxzOmRrgj6NsM4sZhNZ/pHpWjwOa9DaeHbK', // user123password
    /* razonSocial: 'Farmacia SinSalud S.A.C.',
    ruc: 20604128541,*/
    roles: [rolUser],
  });
  await usuarioRepo.save(User);

  // 5. INSERTAR COMPROBANTE DE PRUEBA
  // Usamos la lógica de tu Service: asignar objetos con el ID obtenido
  await comprobanteRepo.save(
    comprobanteRepo.create({
      fecha_emision: new Date(),
      fecha_vencimiento: new Date(),
      moneda: 'SOLES',
      igv: 18.0,
      tipo_pago: 'CONTADO',
      nro_cuotas: 0,
      cliente: cliente,
      usuario: adminUser,
      sede: sede,
      producto: producto,
      tipo_documento: tiposDoc[0], // Factura
    }),
  );

  console.log('✅ Seeding de comprobantes y dependencias completado.');
};

async function run() {
  await dataSource.initialize();
  console.log('🌱 Ejecutando seed...');
  await runSeed(dataSource);
  console.log('✅ Seed completado');
  await dataSource.destroy();
}

run().catch(console.error);
