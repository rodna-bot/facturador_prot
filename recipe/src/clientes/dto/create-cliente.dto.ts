import { IsBoolean, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  nombre: string;

  @IsBoolean()
  tipo: boolean;

  @IsOptional()
  @Length(8, 8)
  dni?: string;

  @IsOptional()
  @Length(11, 11)
  ruc?: string;
}
