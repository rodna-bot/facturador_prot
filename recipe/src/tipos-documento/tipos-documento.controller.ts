import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TiposDocumentoService } from './tipos-documento.service';
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento.dto';
import { Roles } from '../auth_old/decorators/roles.decorators';
@Controller('tipos-documento')
export class TiposDocumentoController {
  constructor(private readonly service: TiposDocumentoService) {}
  @Roles('admin')
  @Post('/register')
  create(@Body() dto: CreateTipoDocumentoDto) {
    return this.service.create(dto);
  }
  @Roles('usuario', 'admin')
  @Get('/list')
  findAll() {
    return this.service.findAll();
  }
  @Roles('usuario', 'admin')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
}
