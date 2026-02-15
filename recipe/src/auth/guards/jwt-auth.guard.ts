import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Este método maneja qué sucede cuando hay un error o el usuario no está autenticado
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('No estás autorizado para acceder a este recurso');
    }
    return user;
  }
}