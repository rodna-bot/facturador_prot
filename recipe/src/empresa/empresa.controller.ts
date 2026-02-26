import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth_old/decorators/roles.decorators';
import { RolesGuard } from '../auth_old/guards/roles.guard';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { EmpresaService } from './empresa.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Roles('admin')
  @Post()
  create(@Body() dto: CreateEmpresaDto) {
    return this.empresaService.create(dto);
  }

  @Roles('admin', 'usuario')
  @Get()
  findAll(@Query('activo') activo?: string) {
    const soloActivos = activo !== 'false';
    return this.empresaService.findAll(soloActivos);
  }

  @Roles('admin', 'usuario')
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.empresaService.findOne(id);
  }

  @Roles('admin')
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateEmpresaDto,
  ) {
    return this.empresaService.update(id, dto);
  }

  @Roles('admin')
  @Delete(':id')
  deactivate(@Param('id', ParseUUIDPipe) id: string) {
    return this.empresaService.deactivate(id);
  }
}
