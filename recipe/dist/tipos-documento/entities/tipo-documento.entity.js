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
exports.TipoDocumento = void 0;
const typeorm_1 = require("typeorm");
const comprobante_entity_1 = require("../../comprobantes/entities/comprobante.entity");
let TipoDocumento = class TipoDocumento {
    codigo;
    nombre;
    comprobantes;
};
exports.TipoDocumento = TipoDocumento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TipoDocumento.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], TipoDocumento.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comprobante_entity_1.Comprobante, (comprobante) => comprobante.tipo_documento),
    __metadata("design:type", Array)
], TipoDocumento.prototype, "comprobantes", void 0);
exports.TipoDocumento = TipoDocumento = __decorate([
    (0, typeorm_1.Entity)('tipos_documento')
], TipoDocumento);
//# sourceMappingURL=tipo-documento.entity.js.map