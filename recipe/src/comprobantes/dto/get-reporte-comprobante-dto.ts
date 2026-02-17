import { IsOptional, IsDateString, IsEnum, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class GetReporteComprobantesDto {
  @IsOptional()
  @IsDateString()
  fecha_inicio?: string;

  @IsOptional()
  @IsDateString()
  fecha_fin?: string;

  @IsOptional()
  // Si tienes el ID del tipo de documento (1 para Factura, 2 para Nota de Crédito, etc.)
  @IsArray()
  @Type(() => Number)
  tipos_documento?: number[]; 

  @IsOptional()
  @IsEnum(['SOLES', 'DOLARES'], { message: 'Moneda no válida' })
  moneda?: string;
}