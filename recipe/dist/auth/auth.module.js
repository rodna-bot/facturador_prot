"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const roles_guard_1 = require("./guards/roles.guard");
const usuario_entity_1 = require("./entities/usuario.entity");
const rol_entity_1 = require("./entities/rol.entity");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([usuario_entity_1.Usuario, rol_entity_1.Rol]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule.forRoot({ isGlobal: true, }), config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET') || 'your-secret-key',
                    signOptions: { expiresIn: '24h' },
                }),
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            roles_guard_1.RolesGuard
        ],
        exports: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            passport_1.PassportModule,
            jwt_1.JwtModule
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map