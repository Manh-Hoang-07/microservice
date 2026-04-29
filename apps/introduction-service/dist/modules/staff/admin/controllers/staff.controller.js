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
exports.AdminStaffController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const staff_service_1 = require("../services/staff.service");
const create_staff_dto_1 = require("../dtos/create-staff.dto");
const update_staff_dto_1 = require("../dtos/update-staff.dto");
let AdminStaffController = class AdminStaffController {
    constructor(staffService) {
        this.staffService = staffService;
    }
    async getList(query) {
        return this.staffService.getList(query);
    }
    async getOne(id) {
        return this.staffService.getOne(BigInt(id));
    }
    async create(dto) {
        return this.staffService.create(dto);
    }
    async update(id, dto) {
        return this.staffService.update(BigInt(id), dto);
    }
    async delete(id) {
        return this.staffService.delete(BigInt(id));
    }
};
exports.AdminStaffController = AdminStaffController;
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminStaffController.prototype, "getList", null);
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminStaffController.prototype, "getOne", null);
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_staff_dto_1.CreateStaffDto]),
    __metadata("design:returntype", Promise)
], AdminStaffController.prototype, "create", null);
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_staff_dto_1.UpdateStaffDto]),
    __metadata("design:returntype", Promise)
], AdminStaffController.prototype, "update", null);
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminStaffController.prototype, "delete", null);
exports.AdminStaffController = AdminStaffController = __decorate([
    (0, swagger_1.ApiTags)('Admin Staff'),
    (0, common_1.Controller)('admin/staff'),
    __metadata("design:paramtypes", [staff_service_1.AdminStaffService])
], AdminStaffController);
//# sourceMappingURL=staff.controller.js.map