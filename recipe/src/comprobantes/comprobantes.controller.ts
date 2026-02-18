import { Controller, Get, Post, Body, UseGuards ,Query} from '@nestjs/common';
import { ComprobantesService } from './comprobantes.service';
import { CreateComprobanteDto } from './dto/create-comprobante.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorators';

@Controller('comprobantes')
@UseGuards(JwtAuthGuard) 
export class ComprobantesController {
  constructor(private readonly comprobantesService: ComprobantesService) {}
  @Roles('usuario','admin')
  @Post('/register')
  create(@Body() createComprobanteDto: CreateComprobanteDto) {
    return this.comprobantesService.create(createComprobanteDto);
  }
  @Roles('usuario','admin')
  @Get('/list')
  findAll() {
    return this.comprobantesService.findAll();
  }
  @Roles('usuario')
  @Get('/filter-by-dates')
  findByDates(
    @Query('inicio') inicio: string, 
    @Query('fin') fin: string
  ) {
    // Llamamos a la función que creamos para el service
    return this.comprobantesService.findByDateRange(inicio, fin);
  }
}