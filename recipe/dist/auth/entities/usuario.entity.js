"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const typeorm_1 = require("typeorm");
const rol_entity_1 = require("./rol.entity");
const comprobante_entity_1 = require("../../comprobantes/entities/comprobante.entity");
let Usuario = class Usuario {
    codigo;
    ruc;
    razonSocial;
    email;
    password;
    roles;
    comprobantes;
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuario.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], Usuario.prototype, "ruc", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'razon_social', nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "razonSocial", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => rol_entity_1.Rol, (rol) => rol.usuarios),
    (0, typeorm_1.JoinTable)({ name: 'usuarios_roles' }),
    __metadata("design:type", Array)
], Usuario.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comprobante_entity_1.Comprobante, (comprobante) => comprobante.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "comprobantes", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)('usuarios')
], Usuario);
//# sourceMappingURL=usuario.entity.js.map