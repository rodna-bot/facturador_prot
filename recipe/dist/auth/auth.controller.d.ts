import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("./entities/usuario.entity").Usuario>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            codigo: number;
            email: string;
        };
    }>;
    getProfile(req: any): {
        user: any;
    };
    getRoles(): Promise<string[]>;
    getAdminData(req: any): {
        message: string;
        user: any;
    };
  }
