import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from '../database/entities/empresa.entity';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

type EmpresaSafe = Omit<Empresa, 'sol_clave' | 'cert_password' | 'cert_pfx'>;

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async create(dto: CreateEmpresaDto): Promise<EmpresaSafe> {
    const existe = await this.empresaRepository.findOneBy({ ruc: dto.ruc });
    if (existe) {
      throw new ConflictException(`Ya existe una empresa registrada con el RUC ${dto.ruc}`);
    }

    const empresa = this.empresaRepository.create(dto);
    const guardada = await this.empresaRepository.save(empresa);
    return this.sanitize(guardada);
  }

  async findAll(soloActivos = true): Promise<EmpresaSafe[]> {
    const empresas = await this.empresaRepository.find({
      where: soloActivos ? { activo: true } : {},
      order: { razon_social: 'ASC' },
    });
    return empresas.map((e) => this.sanitize(e));
  }

  async findOne(id: string): Promise<EmpresaSafe> {
    const empresa = await this.empresaRepository.findOneBy({ id });
    if (!empresa) {
      throw new NotFoundException(`Empresa con id ${id} no encontrada`);
    }
    return this.sanitize(empresa);
  }

  async update(id: string, dto: UpdateEmpresaDto): Promise<EmpresaSafe> {
    if (dto.ruc) {
      const duplicado = await this.empresaRepository.findOneBy({ ruc: dto.ruc });
      if (duplicado && duplicado.id !== id) {
        throw new ConflictException(`Ya existe otra empresa registrada con el RUC ${dto.ruc}`);
      }
    }

    const empresa = await this.empresaRepository.preload({ id, ...dto });
    if (!empresa) {
      throw new NotFoundException(`Empresa con id ${id} no encontrada`);
    }

    const actualizada = await this.empresaRepository.save(empresa);
    return this.sanitize(actualizada);
  }

  async deactivate(id: string): Promise<{ message: string }> {
    const empresa = await this.empresaRepository.findOneBy({ id });
    if (!empresa) {
      throw new NotFoundException(`Empresa con id ${id} no encontrada`);
    }
    if (!empresa.activo) {
      throw new ConflictException(`La empresa con id ${id} ya está desactivada`);
    }

    await this.empresaRepository.update(id, { activo: false });
    return { message: `Empresa ${empresa.razon_social} desactivada correctamente` };
  }

  private sanitize(empresa: Empresa): EmpresaSafe {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sol_clave, cert_password, cert_pfx, ...safe } = empresa;
    return safe;
  }
}
