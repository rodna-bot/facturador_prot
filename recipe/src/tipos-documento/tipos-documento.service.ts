import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoDocumento } from './entities/tipo-documento.entity';
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento.dto';

@Injectable()
export class TiposDocumentoService {
  constructor(
    @InjectRepository(TipoDocumento)
    private readonly repository: Repository<TipoDocumento>,
  ) {}

  async create(dto: CreateTipoDocumentoDto) {
    const nuevo = this.repository.create(dto);
    return await this.repository.save(nuevo);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(codigo: number) {
    const tipo = await this.repository.findOneBy({ codigo });
    if (!tipo) throw new NotFoundException('Tipo de documento no encontrado');
    return tipo;
  }
}