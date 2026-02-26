import { IsEmail, IsNotEmpty, IsString, MinLength, IsNumber, IsOptional, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsNumber({}, { message: 'El RUC debe ser un número' })
  @IsOptional() // Según tu diagrama, el RUC puede ser NULL
  ruc?: number;

  @IsString()
  @IsOptional() // Según tu diagrama, la razón social puede ser NULL
  razonSocial?: string;
}