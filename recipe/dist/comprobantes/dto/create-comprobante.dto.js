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
exports.CreateComprobanteDto = void 0;
const class_validator_1 = require("class-validator");
class CreateComprobanteDto {
    fecha_emision;
    fecha_vencimiento;
    moneda;
    igv;
    tipo_pago;
    nro_cuotas;
    codigo_cliente;
    codigo_usuario;
    codigo_sede;
    codigo_producto_servicio;
    codigo_tipo_documento;
}
exports.CreateComprobanteDto = CreateComprobanteDto;
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateComprobanteDto.prototype, "fecha_emision", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateComprobanteDto.prototype, "fecha_vencimiento", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateComprobanteDto.prototype, "moneda", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateComprobanteDto.prototype, "igv", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateComprobanteDto.prototype, "tipo_pago", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateComprobanteDto.prototype, "nro_cuotas", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateComprobanteDto.prototype, "codigo_cliente", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateComprobanteDto.prototype, "codigo_usuario", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateComprobanteDto.prototype, "codigo_sede", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateComprobanteDto.prototype, "codigo_producto_servicio", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateComprobanteDto.prototype, "codigo_tipo_documento", void 0);
//# sourceMappingURL=create-comprobante.dto.js.map