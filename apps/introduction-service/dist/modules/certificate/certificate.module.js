"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateModule = void 0;
const common_1 = require("@nestjs/common");
const certificate_controller_1 = require("./admin/controllers/certificate.controller");
const certificate_service_1 = require("./admin/services/certificate.service");
const certificate_controller_2 = require("./public/controllers/certificate.controller");
const certificate_service_2 = require("./public/services/certificate.service");
let CertificateModule = class CertificateModule {
};
exports.CertificateModule = CertificateModule;
exports.CertificateModule = CertificateModule = __decorate([
    (0, common_1.Module)({
        controllers: [certificate_controller_1.AdminCertificateController, certificate_controller_2.PublicCertificateController],
        providers: [certificate_service_1.AdminCertificateService, certificate_service_2.PublicCertificateService],
        exports: [certificate_service_2.PublicCertificateService],
    })
], CertificateModule);
//# sourceMappingURL=certificate.module.js.map