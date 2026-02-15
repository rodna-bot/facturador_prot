import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {

    const { tipo , dni, ruc } = createClienteDto;

    if (tipo) {
      // 🔹 true = Empresa → requiere RUC
      if (!ruc) {
        throw new BadRequestException('Si el cliente es empresa debe ingresar RUC');
      }

      if (ruc.length !== 11) {
        throw new BadRequestException('El RUC debe tener 11 dígitos');
      }

    } else {
      // 🔹 false = Persona → requiere DNI
      if (!dni) {
        throw new BadRequestException('Si el cliente es persona debe ingresar DNI');
      }

      if (dni.length !== 8) {
        throw new BadRequestException('El DNI debe tener 8 dígitos');
      }
    }

    const nuevoCliente = this.clienteRepository.create(createClienteDto);
    return await this.clienteRepository.save(nuevoCliente);
  }

  async findAll() {
    return await this.clienteRepository.find();
  }

  async findOne(codigo: number) {
    const cliente = await this.clienteRepository.findOneBy({ codigo });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    return cliente;
  }

  async update(codigo: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.findOne(codigo);
    const actualizado = Object.assign(cliente, updateClienteDto);
    return await this.clienteRepository.save(actualizado);
  }

  async remove(codigo: number) {
    const cliente = await this.findOne(codigo);
    return await this.clienteRepository.remove(cliente);
  }
}
