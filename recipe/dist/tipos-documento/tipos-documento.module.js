"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiposDocumentoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tipo_documento_entity_1 = require("./entities/tipo-documento.entity");
const tipos_documento_service_1 = require("./tipos-documento.service");
const tipos_documento_controller_1 = require("./tipos-documento.controller");
let TiposDocumentoModule = class TiposDocumentoModule {
};
exports.TiposDocumentoModule = TiposDocumentoModule;
exports.TiposDocumentoModule = TiposDocumentoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tipo_documento_entity_1.TipoDocumento])],
        controllers: [tipos_documento_controller_1.TiposDocumentoController],
        providers: [tipos_documento_service_1.TiposDocumentoService],
        exports: [tipos_documento_service_1.TiposDocumentoService],
    })
], TiposDocumentoModule);
//# sourceMappingURL=tipos-documento.module.js.map