import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuario } from './entities/usuario.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  // ✅ REGISTER
  async register(registerDto: RegisterDto) {

    const existe = await this.usuarioRepository.findOneBy({
      email: registerDto.email
    });

    if (existe) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const nuevoUsuario = this.usuarioRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    const savedUser = await this.usuarioRepository.save(nuevoUsuario);

    // 🔒 No devolver password
    const { password, ...userWithoutPassword } = savedUser;

    return userWithoutPassword;
  }

  // ✅ LISTAR USUARIOS (sin password)
  async findAll() {
    return await this.usuarioRepository.find({
      select: ['codigo', 'email']
    });
  }

  // ✅ LOGIN
  async login(loginDto: LoginDto) {

    const usuario = await this.usuarioRepository.findOneBy({
      email: loginDto.email
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      usuario.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: usuario.codigo,
      email: usuario.email
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        codigo: usuario.codigo,
        email: usuario.email
      }
    };
  }

  // ✅ Roles (estático por ahora)
  async getRoles() {
    return ['admin', 'user'];
  }
}
