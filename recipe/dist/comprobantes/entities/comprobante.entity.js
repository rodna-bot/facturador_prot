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
exports.Comprobante = void 0;
const typeorm_1 = require("typeorm");
const cliente_entity_1 = require("../../clientes/entities/cliente.entity");
const usuario_entity_1 = require("../../auth/entities/usuario.entity");
const sede_entity_1 = require("../../sedes/entities/sede.entity");
const producto_entity_1 = require("../../productos/entities/producto.entity");
const tipo_documento_entity_1 = require("../../tipos-documento/entities/tipo-documento.entity");
let Comprobante = class Comprobante {
    codigo;
    fecha_emision;
    fecha_vencimiento;
    moneda;
    igv;
    tipo_pago;
    nro_cuotas;
    cliente;
    usuario;
    sede;
    producto;
    tipo_documento;
};
exports.Comprobante = Comprobante;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Comprobante.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Comprobante.prototype, "fecha_emision", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Comprobante.prototype, "fecha_vencimiento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comprobante.prototype, "moneda", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Comprobante.prototype, "igv", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comprobante.prototype, "tipo_pago", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Comprobante.prototype, "nro_cuotas", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_entity_1.Cliente),
    (0, typeorm_1.JoinColumn)({ name: 'codigo_cliente' }),
    __metadata("design:type", cliente_entity_1.Cliente)
], Comprobante.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'codigo_usuario' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Comprobante.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sede_entity_1.Sede),
    (0, typeorm_1.JoinColumn)({ name: 'codigo_sede' }),
    __metadata("design:type", sede_entity_1.Sede)
], Comprobante.prototype, "sede", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto),
    (0, typeorm_1.JoinColumn)({ name: 'codigo_producto_servicio' }),
    __metadata("design:type", producto_entity_1.Producto)
], Comprobante.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tipo_documento_entity_1.TipoDocumento),
    (0, typeorm_1.JoinColumn)({ name: 'codigo_tipo_documento' }),
    __metadata("design:type", tipo_documento_entity_1.TipoDocumento)
], Comprobante.prototype, "tipo_documento", void 0);
exports.Comprobante = Comprobante = __decorate([
    (0, typeorm_1.Entity)('comprobantes')
], Comprobante);
//# sourceMappingURL=comprobante.entity.js.map