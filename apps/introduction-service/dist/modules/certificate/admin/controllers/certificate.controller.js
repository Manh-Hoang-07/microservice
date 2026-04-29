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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCertificateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const certificate_service_1 = require("../services/certificate.service");
const create_certificate_dto_1 = require("../dtos/create-certificate.dto");
const update_certificate_dto_1 = require("../dtos/update-certificate.dto");
let AdminCertificateController = class AdminCertificateController {
    constructor(certificateService) {
        this.certificateService = certificateService;
    }
    async getList(query) {
        return this.certificateService.getList(query);
    }
    async getOne(id) {
        return this.certificateService.getOne(BigInt(id));
    }
    async create(dto) {
        return this.certificateService.create(dto);
    }
    async update(id, dto) {
        return this.certificateService.update(BigInt(id), dto);
    }
    async delete(id) {
        return this.certificateService.delete(BigInt(id));
    }
};
exports.AdminCertificateController = AdminCertificateController;
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminCertificateController.prototype, "getList", null);
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCertificateController.prototype, "getOne", null);
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_certificate_dto_1.CreateCertificateDto]),
    __metadata("design:returntype", Promise)
], AdminCertificateController.prototype, "create", null);
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_certificate_dto_1.UpdateCertificateDto]),
    __metadata("design:returntype", Promise)
], AdminCertificateController.prototype, "update", null);
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCertificateController.prototype, "delete", null);
exports.AdminCertificateController = AdminCertificateController = __decorate([
    (0, swagger_1.ApiTags)('Admin Certificates'),
    (0, common_1.Controller)('admin/certificates'),
    __metadata("design:paramtypes", [certificate_service_1.AdminCertificateService])
], AdminCertificateController);
//# sourceMappingURL=certificate.controller.js.map