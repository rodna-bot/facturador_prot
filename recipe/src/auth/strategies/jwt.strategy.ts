import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Usamos la misma clave que el resto del sistema
      secretOrKey: configService.get<string>('JWT_SECRET') || 'CLAVE_POR_DEFECTO', 
    });
  }

  async validate(payload: any) {
    // IMPORTANTE: Asegúrate de que los nombres coincidan con lo que pusiste en el login
    return { 
      userId: payload.sub, 
      email: payload.email,
      role: payload.role  
    };
  }
}