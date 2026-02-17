import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuario } from './entities/usuario.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Rol } from './entities/rol.entity';
import { Roles } from './decorators/roles.decorators';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
     @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    private readonly jwtService: JwtService,
  ) {}

  // ✅ REGISTER
  async register(registerDto: RegisterDto) {

    const existe = await this.usuarioRepository.findOne({
    where:{  email: registerDto.email},
    });

    if (existe) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const rolUsuario = await this.rolRepository.findOne({
      where: { nombre: 'usuario' }, // asegúrate que tu columna se llame "nombre"
    });

    if (!rolUsuario) {
      throw new BadRequestException('No existe el rol "usuario" en la base de datos');
    }

    const nuevoUsuario = this.usuarioRepository.create({
      ...registerDto,
      password: hashedPassword,
      roles : [rolUsuario],
    });

    const savedUser = await this.usuarioRepository.save(nuevoUsuario);

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

    const usuario = await this.usuarioRepository.findOne(
      {where:{email: loginDto.email},
      relations: ['roles'],
  
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

    
    const roles = (usuario.roles ?? []).map((r) => r.nombre);
    
    const payload = {
      sub: usuario.codigo,
      email: usuario.email,
      roles, 
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        codigo: usuario.codigo,
        email: usuario.email,
       roles, 
      }
    };
  }

  // ✅ Roles (estático por ahora)
  async getRoles() {
    return ['admin', 'usuario'];
  }
}
