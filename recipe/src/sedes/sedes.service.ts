import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sede } from './entities/sede.entity';
import { CreateSedeDto } from './dto/create-sede.dto';
import { UpdateSedeDto } from './dto/update-sede.dto';

@Injectable()
export class SedesService {
  constructor(
    @InjectRepository(Sede)
    private readonly sedeRepository: Repository<Sede>,
  ) {}

  async create(createSedeDto: CreateSedeDto) {
    const nuevaSede = this.sedeRepository.create(createSedeDto);
    return await this.sedeRepository.save(nuevaSede);
  }

  async findAll() {
    return await this.sedeRepository.find();
  }

  async findOne(codigo: number) {
    const sede = await this.sedeRepository.findOneBy({ codigo });
    if (!sede) throw new NotFoundException(`Sede con código ${codigo} no encontrada`);
    return sede;
  }

  async remove(codigo: number) {
    const sede = await this.findOne(codigo);
    return await this.sedeRepository.remove(sede);
  }
}