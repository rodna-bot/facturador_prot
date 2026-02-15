import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly usuarioRepository;
    private readonly jwtService;
    constructor(usuarioRepository: Repository<Usuario>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<Usuario>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            codigo: number;
            email: string;
        };
    }>;
    getRoles(): Promise<string[]>;


}
