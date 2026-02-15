import { Injectable } from '@nestjs/common';

@Injectable() // Los servicios siempre usan @Injectable, NO @Module
export class AppService {
  getHello(): string {
    return '¡Backend del Facturador funcionando correctamente!';
  }
}