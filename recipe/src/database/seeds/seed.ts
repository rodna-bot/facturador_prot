import { DataSource } from 'typeorm';
import { dataSourceConfig } from '../typeorm.config';
import { Rol } from '../entities/rol.entity';
import { TipoIdentificacion } from '../entities/tipo-identificacion.entity';
import { TipoComprobante } from '../entities/tipo-comprobante.entity';
import { Usuario } from '../entities/usuario.entity';
import { Empresa } from '../entities/empresa.entity';
import { UsuarioEmpresa } from '../entities/usuario-empresa.entity';
import { Sede } from '../entities/sede.entity';
import { UsuarioEmpresaRol } from '../entities/usuario-rol-empresa.entity';
import { Cliente } from '../entities/cliente.entity';
import { Serie } from '../entities/serie.entity';
import { ProductoServicio } from '../entities/producto-servicio.entity';
import { Comprobante } from '../entities/comprobante.entity';
import { ComprobanteDetalle } from '../entities/comprobante-detalle.entity';
import { EstadoComprobante } from 'src/shared/enums/estado-comprobante.enum';

async function runSeed(dataSource: DataSource): Promise<void> {
  const rolRepo = dataSource.getRepository(Rol);
  const tipoIdentRepo = dataSource.getRepository(TipoIdentificacion);
  const tipoCompRepo = dataSource.getRepository(TipoComprobante);
  const usuarioRepo = dataSource.getRepository(Usuario);
  const empresaRepo = dataSource.getRepository(Empresa);
  const usuarioEmpresaRepo = dataSource.getRepository(UsuarioEmpresa);
  const sedeRepo = dataSource.getRepository(Sede);
  const usuarioEmpresaRolRepo = dataSource.getRepository(UsuarioEmpresaRol);
  const clienteRepo = dataSource.getRepository(Cliente);
  const serieRepo = dataSource.getRepository(Serie);
  const productoRepo = dataSource.getRepository(ProductoServicio);
  const comprobanteRepo = dataSource.getRepository(Comprobante);
  const detalleRepo = dataSource.getRepository(ComprobanteDetalle);

  const yaExiste = await rolRepo.count();
  if (yaExiste > 0) {
    console.log('El seed ya fue ejecutado anteriormente. Saltando...');
    return;
  }

  // ─── 1. ROLES ────────────────────────────────────────────────────────────────
  console.log('Seeding roles...');
  const [rolAdmin, , , rolVendedor] = await rolRepo.save([
    rolRepo.create({ nombre: 'ADMIN', descripcion: 'Administrador del sistema' }),
    rolRepo.create({ nombre: 'CAJERO', descripcion: 'Operador de caja' }),
    rolRepo.create({ nombre: 'CONTADOR', descripcion: 'Acceso contable y reportes' }),
    rolRepo.create({ nombre: 'VENDEDOR', descripcion: 'Emisión de comprobantes' }),
  ]);

  // ─── 2. TIPOS DE IDENTIFICACIÓN (catálogo SUNAT) ─────────────────────────────
  console.log('Seeding tipos de identificacion...');
  const tiposIdent = await tipoIdentRepo.save([
    tipoIdentRepo.create({ codigo_sunat: '01', nombre: 'DNI', es_empresa: false }),
    tipoIdentRepo.create({ codigo_sunat: '06', nombre: 'RUC', es_empresa: true }),
    tipoIdentRepo.create({ codigo_sunat: '04', nombre: 'Carnet de Extranjería', es_empresa: false }),
    tipoIdentRepo.create({ codigo_sunat: '07', nombre: 'Pasaporte', es_empresa: false }),
  ]);
  const tipoIdentDni = tiposIdent[0];
  const tipoIdentRuc = tiposIdent[1];

  // ─── 3. TIPOS DE COMPROBANTE (catálogo SUNAT) ─────────────────────────────────
  console.log('Seeding tipos de comprobante...');
  const tiposComp = await tipoCompRepo.save([
    tipoCompRepo.create({
      codigo_sunat: '01',
      nombre: 'Factura Electrónica',
      requiere_cliente: true,
      permite_credito: true,
    }),
    tipoCompRepo.create({
      codigo_sunat: '03',
      nombre: 'Boleta de Venta Electrónica',
      requiere_cliente: true,
      permite_credito: false,
    }),
    tipoCompRepo.create({
      codigo_sunat: '07',
      nombre: 'Nota de Crédito Electrónica',
      requiere_cliente: true,
      permite_credito: false,
    }),
    tipoCompRepo.create({
      codigo_sunat: '08',
      nombre: 'Nota de Débito Electrónica',
      requiere_cliente: true,
      permite_credito: false,
    }),
  ]);
  const tipoFactura = tiposComp[0];
  const tipoBoleta = tiposComp[1];

  // ─── 4. USUARIO ────────────────────────────────────────────────────────────────
  console.log('Seeding usuario...');
  const usuario = await usuarioRepo.save(
    usuarioRepo.create({
      auth0_id: 'auth0|seed_demo_admin',
      email: 'admin@demo.com',
      nombre: 'Admin Demo',
      activo: true,
    }),
  );

  // ─── 5. EMPRESA ────────────────────────────────────────────────────────────────
  console.log('Seeding empresa...');
  const empresa = await empresaRepo.save(
    empresaRepo.create({
      ruc: '20512345678',
      razon_social: 'Demo Empresa SAC',
      nombre_comercial: 'Demo',
      ubigeo: '150101',
      direccion_fiscal: 'Av. Lima 123, Lima',
      sunat_env: 'BETA',
      sol_usuario: 'DEMO20512345678',
      sol_clave: 'demo_clave',
      activo: true,
    }),
  );

  // ─── 6. USUARIO ↔ EMPRESA ──────────────────────────────────────────────────────
  console.log('Seeding usuario-empresa...');
  await usuarioEmpresaRepo.save(
    usuarioEmpresaRepo.create({
      usuario_id: usuario.id,
      empresa_id: empresa.id,
      activo: true,
    }),
  );

  // ─── 7. SEDE ──────────────────────────────────────────────────────────────────
  console.log('Seeding sede...');
  const sede = await sedeRepo.save(
    sedeRepo.create({
      empresa_id: empresa.id,
      nombre: 'Sede Principal',
      ubigeo: '150101',
      direccion: 'Av. Lima 123, Lima',
      activo: true,
    }),
  );

  // ─── 8. USUARIO-EMPRESA-ROL ────────────────────────────────────────────────────
  console.log('Seeding usuario-empresa-rol...');
  await usuarioEmpresaRolRepo.save(
    usuarioEmpresaRolRepo.create({
      usuario_id: usuario.id,
      empresa_id: empresa.id,
      rol_id: rolAdmin.id,
      sede_id: null, // rol global en la empresa
      activo: true,
    }),
  );

  // ─── 9. CLIENTES ──────────────────────────────────────────────────────────────
  console.log('Seeding clientes...');
  const clientes = await clienteRepo.save([
    clienteRepo.create({
      tipo_identificacion_id: tipoIdentDni.id,
      nro_doc: '12345678',
      razon_social_nombre: 'Juan Pérez García',
      email: 'juan.perez@email.com',
      telefono: '987654321',
      activo: true,
    }),
    clienteRepo.create({
      tipo_identificacion_id: tipoIdentRuc.id,
      nro_doc: '20523456789',
      razon_social_nombre: 'Corporación ABC SAC',
      direccion: 'Av. Empresarial 456, Lima',
      email: 'contacto@corporacionabc.com',
      activo: true,
    }),
  ]);
  const clientePersona = clientes[0];
  const clienteEmpresa = clientes[1];

  // ─── 10. SERIES ───────────────────────────────────────────────────────────────
  console.log('Seeding series...');
  const [serieFactura, serieBoleta] = await serieRepo.save([
    serieRepo.create({
      empresa_id: empresa.id,
      tipo_comprobante_id: tipoFactura.id,
      serie: 'F001',
      correlativo_actual: 0,
      activo: true,
    }),
    serieRepo.create({
      empresa_id: empresa.id,
      tipo_comprobante_id: tipoBoleta.id,
      serie: 'B001',
      correlativo_actual: 0,
      activo: true,
    }),
  ]);

  // ─── 11. PRODUCTOS / SERVICIOS ────────────────────────────────────────────────
  console.log('Seeding productos y servicios...');
  const [productoPara, productoConsulta] = await productoRepo.save([
    productoRepo.create({
      empresa_id: empresa.id,
      codigo_interno: 'P001',
      descripcion: 'Paracetamol 500mg',
      unidad_medida: 'NIU', // unidad
      precio_unitario: '12.71',
      afectacion_igv: '10', // gravado con IGV
      es_servicio: false,
      activo: true,
    }),
    productoRepo.create({
      empresa_id: empresa.id,
      codigo_interno: 'S001',
      descripcion: 'Consulta Médica General',
      unidad_medida: 'ZZ', // servicio
      precio_unitario: '50.00',
      afectacion_igv: '10', // gravado con IGV
      es_servicio: true,
      activo: true,
    }),
  ]);

  // ─── 12. COMPROBANTE DEMO (Factura) ───────────────────────────────────────────
  console.log('Seeding comprobante demo...');

  // Calcular totales para 2 líneas:
  //   Línea 1: Paracetamol 10 x 12.71 = 127.10  → IGV 18% = 22.88  → total línea = 150.00 (precio unitario c/igv = 15.00)
  //   Línea 2: Consulta    1  x 50.00 = 50.00   → IGV 18% = 9.00   → total línea = 59.00  (precio unitario c/igv = 59.00)
  // total_gravadas = 177.10, total_igv = 31.88, total = 208.98

  const comprobante = await comprobanteRepo.save(
    comprobanteRepo.create({
      empresa_id: empresa.id,
      sede_id: sede.id,
      serie_id: serieFactura.id,
      cliente_id: clienteEmpresa.id,
      tipo_comprobante_id: tipoFactura.id,
      tipo_comprobante_codigo: '01',
      serie: 'F001',
      correlativo: 1,
      fecha_emision: new Date(),
      moneda: 'PEN',
      total_gravadas: '177.10',
      total_inafectas: '0.00',
      total_exoneradas: '0.00',
      total_igv: '31.88',
      total_isc: '0.00',
      total_descuentos: '0.00',
      total: '208.98',
      estado: EstadoComprobante.EMITIDO,
      created_by: usuario.id,
    }),
  );

  // Actualizar correlativo de la serie
  await serieRepo.update(serieFactura.id, { correlativo_actual: 1 });

  // ─── 13. DETALLE DEL COMPROBANTE ──────────────────────────────────────────────
  console.log('Seeding detalle del comprobante...');
  await detalleRepo.save([
    detalleRepo.create({
      comprobante_id: comprobante.id,
      empresa_id: empresa.id,
      item: 1,
      producto_id: productoPara.id,
      descripcion: 'Paracetamol 500mg',
      unidad_medida: 'NIU',
      cantidad: '10.000',
      valor_unitario: '12.710000', // sin IGV
      precio_unitario: '15.000000', // con IGV
      descuento: '0.00',
      afectacion_igv: '10',
      igv_monto: '22.88',
      isc_monto: '0.00',
      total_linea: '150.00',
    }),
    detalleRepo.create({
      comprobante_id: comprobante.id,
      empresa_id: empresa.id,
      item: 2,
      producto_id: productoConsulta.id,
      descripcion: 'Consulta Médica General',
      unidad_medida: 'ZZ',
      cantidad: '1.000',
      valor_unitario: '50.000000', // sin IGV
      precio_unitario: '59.000000', // con IGV
      descuento: '0.00',
      afectacion_igv: '10',
      igv_monto: '9.00',
      isc_monto: '0.00',
      total_linea: '59.00',
    }),
  ]);

  console.log('');
  console.log('Seed completado exitosamente!');
  console.log('  Roles: ADMIN, CAJERO, CONTADOR, VENDEDOR');
  console.log('  Tipos de identificacion: DNI, RUC, Carnet, Pasaporte');
  console.log('  Tipos de comprobante: Factura, Boleta, NC, ND');
  console.log('  Empresa: Demo Empresa SAC (RUC 20512345678)');
  console.log('  Usuario: admin@demo.com (auth0|seed_demo_admin)');
  console.log('  Series: F001 (Factura), B001 (Boleta)');
  console.log('  Clientes: Juan Perez (DNI), Corporacion ABC SAC (RUC)');
  console.log('  Productos: Paracetamol, Consulta Medica');
  console.log('  Comprobante demo: F001-1 por S/ 208.98');
}

async function seed(): Promise<void> {
  const dataSource = new DataSource(dataSourceConfig);
  await dataSource.initialize();
  console.log('Conexion a base de datos establecida');
  try {
    await runSeed(dataSource);
  } finally {
    await dataSource.destroy();
  }
}

seed().catch((err) => {
  console.error('Error ejecutando seed:', err);
  process.exit(1);
});
