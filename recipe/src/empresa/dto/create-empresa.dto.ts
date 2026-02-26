import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  @IsNotEmpty({ message: 'El RUC es obligatorio' })
  @Length(11, 11, { message: 'El RUC debe tener exactamente 11 dígitos' })
  @Matches(/^\d{11}$/, {
    message: 'El RUC solo debe contener dígitos numéricos',
  })
  ruc: string;

  @IsString()
  @IsNotEmpty({ message: 'La razón social es obligatoria' })
  @Length(3, 200, {
    message: 'La razón social debe tener entre 3 y 200 caracteres',
  })
  razon_social: string;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  nombre_comercial?: string;

  @IsOptional()
  @IsString()
  @Length(6, 6, { message: 'El ubigeo debe tener exactamente 6 caracteres' })
  ubigeo?: string;

  @IsOptional()
  @IsString()
  direccion_fiscal?: string;

  @IsOptional()
  @IsIn(['DEV', 'PRODUCCION'], {
    message: 'El entorno SUNAT debe ser DEV o PRODUCCION',
  })
  sunat_env?: string;

  @IsOptional()
  @IsString()
  sol_usuario?: string;

  @IsOptional()
  @IsString()
  sol_clave?: string;

  @IsOptional()
  @IsString()
  cert_password?: string;
}
