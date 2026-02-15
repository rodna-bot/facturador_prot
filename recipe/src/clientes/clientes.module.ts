import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { Cliente } from './entities/cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]) // Registra la entidad para este módulo
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService] // Permite que otros módulos usen este servicio
})
export class ClientesModule {}