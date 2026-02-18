import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between,Repository } from 'typeorm';
import { Comprobante } from './entities/comprobante.entity';
import { CreateComprobanteDto } from './dto/create-comprobante.dto';
import { GetReporteComprobantesDto } from './dto/get-reporte-comprobante-dto';

@Injectable()
export class ComprobantesService {
  constructor(
    @InjectRepository(Comprobante)
    private readonly comprobanteRepository: Repository<Comprobante>,
  ) {}

  async create(dto: CreateComprobanteDto) {
    // Creamos la instancia. TypeORM mapeará los códigos a las FK automáticamente
    // siempre que los nombres coincidan con la configuración de tu Entity.
    const nuevo = this.comprobanteRepository.create({
      ...dto,
      cliente: { codigo: dto.codigo_cliente },
      usuario: { codigo: dto.codigo_usuario },
      sede: { codigo: dto.codigo_sede },
      producto: { codigo: dto.codigo_producto_servicio },
      tipo_documento: { codigo: dto.codigo_tipo_documento }
    });
    
    return await this.comprobanteRepository.save(nuevo);
  }
    async generarReporte(query: GetReporteComprobantesDto) {
  const { fecha_inicio, fecha_fin, tipos_documento } = query;
  
  const queryBuilder = this.comprobanteRepository.createQueryBuilder('comprobante')
    .leftJoinAndSelect('comprobante.tipo_documento', 'tipoDoc')
    .leftJoinAndSelect('comprobante.cliente', 'cliente');

  if (fecha_inicio && fecha_fin) {
    queryBuilder.andWhere('comprobante.fecha_emision BETWEEN :inicio AND :fin', {
      inicio: fecha_inicio,
      fin: fecha_fin,
    });
  }

  if (tipos_documento && tipos_documento.length > 0) {
    queryBuilder.andWhere('comprobante.codigo_tipo_documento IN (:...ids)', {
      ids: tipos_documento,
    });
  }

  return await queryBuilder.getMany();
  }
  async findByDateRange(fechaInicioStr: string, fechaFinStr: string) {
    // Función interna para convertir dd-mm-yyyy a objeto Date
    const parseDate = (dateStr: string, endOfDay = false) => {
      const [day, month, year] = dateStr.split('-').map(Number);
      // Los meses en JS van de 0 a 11
      const date = new Date(year, month - 1, day);
      if (endOfDay) {
        date.setHours(23, 59, 59, 999);
      } else {
        date.setHours(0, 0, 0, 0);
      }
      return date;
    };

    const inicio = parseDate(fechaInicioStr);
    const fin = parseDate(fechaFinStr, true);

    return await this.comprobanteRepository.find({
      where: {
        fecha_emision: Between(inicio, fin),
      },
      // Traemos las relaciones para que el listado sea útil
      relations: ['cliente', 'usuario', 'sede', 'producto', 'tipo_documento'],
      order: {
        fecha_emision: 'DESC',
      },
    });
  }

  async findAll() {
    // 'relations' permite que el JSON devuelto traiga los datos del cliente, producto, etc.
    return await this.comprobanteRepository.find({
      relations: ['cliente', 'usuario', 'sede', 'producto', 'tipo_documento']
    });
  }
}