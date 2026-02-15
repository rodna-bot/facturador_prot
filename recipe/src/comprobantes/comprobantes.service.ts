import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comprobante } from './entities/comprobante.entity';
import { CreateComprobanteDto } from './dto/create-comprobante.dto';

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

  async findAll() {
    // 'relations' permite que el JSON devuelto traiga los datos del cliente, producto, etc.
    return await this.comprobanteRepository.find({
      relations: ['cliente', 'usuario', 'sede', 'producto', 'tipo_documento']
    });
  }
}