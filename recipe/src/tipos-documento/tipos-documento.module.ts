import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDocumento } from './entities/tipo-documento.entity';
import { TiposDocumentoService } from './tipos-documento.service';
import { TiposDocumentoController } from './tipos-documento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TipoDocumento])],
  controllers: [TiposDocumentoController],
  providers: [TiposDocumentoService],
  exports: [TiposDocumentoService], // IMPORTANTE: Exportar para que Comprobantes lo use
})
export class TiposDocumentoModule {}