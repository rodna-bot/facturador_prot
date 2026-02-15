import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
export declare class ClientesService {
    private readonly clienteRepository;
    constructor(clienteRepository: Repository<Cliente>);
    create(createClienteDto: CreateClienteDto): Promise<Cliente>;
    findAll(): Promise<Cliente[]>;
    findOne(codigo: number): Promise<Cliente>;
    update(codigo: number, updateClienteDto: UpdateClienteDto): Promise<Cliente & UpdateClienteDto>;
    remove(codigo: number): Promise<Cliente>;
}
