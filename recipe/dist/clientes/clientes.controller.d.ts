import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
export declare class ClientesController {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    create(createClienteDto: CreateClienteDto): Promise<import("./entities/cliente.entity").Cliente>;
    findAll(): Promise<import("./entities/cliente.entity").Cliente[]>;
    findOne(id: number): Promise<import("./entities/cliente.entity").Cliente>;
    update(id: number, updateClienteDto: UpdateClienteDto): Promise<import("./entities/cliente.entity").Cliente & UpdateClienteDto>;
    remove(id: number): Promise<import("./entities/cliente.entity").Cliente>;
}
