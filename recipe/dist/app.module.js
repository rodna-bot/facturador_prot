"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const usuario_entity_1 = require("./auth/entities/usuario.entity");
const rol_entity_1 = require("./auth/entities/rol.entity");
const sede_entity_1 = require("./sedes/entities/sede.entity");
const producto_entity_1 = require("./productos/entities/producto.entity");
const cliente_entity_1 = require("./clientes/entities/cliente.entity");
const comprobante_entity_1 = require("./comprobantes/entities/comprobante.entity");
const tipo_documento_entity_1 = require("./tipos-documento/entities/tipo-documento.entity");
const auth_module_1 = require("./auth/auth.module");
const clientes_module_1 = require("./clientes/clientes.module");
const sedes_module_1 = require("./sedes/sedes.module");
const productos_module_1 = require("./productos/productos.module");
const comprobantes_module_1 = require("./comprobantes/comprobantes.module");
const tipos_documento_module_1 = require("./tipos-documento/tipos-documento.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'recipe',
                password: 'RecipePassword',
                database: 'recipe_db',
                entities: [
                    usuario_entity_1.Usuario, rol_entity_1.Rol, sede_entity_1.Sede,
                    producto_entity_1.Producto, cliente_entity_1.Cliente, comprobante_entity_1.Comprobante,
                    tipo_documento_entity_1.TipoDocumento
                ],
                synchronize: true,
                autoLoadEntities: true,
                retryAttempts: 5,
                retryDelay: 3000,
            }),
            auth_module_1.AuthModule,
            clientes_module_1.ClientesModule,
            sedes_module_1.SedesModule,
            productos_module_1.ProductosModule,
            comprobantes_module_1.ComprobantesModule,
            tipos_documento_module_1.TiposDocumentoModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map