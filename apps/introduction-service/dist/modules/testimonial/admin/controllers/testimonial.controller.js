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
exports.AdminTestimonialController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const testimonial_service_1 = require("../services/testimonial.service");
const create_testimonial_dto_1 = require("../dtos/create-testimonial.dto");
const update_testimonial_dto_1 = require("../dtos/update-testimonial.dto");
let AdminTestimonialController = class AdminTestimonialController {
    constructor(testimonialService) {
        this.testimonialService = testimonialService;
    }
    async getList(query) {
        return this.testimonialService.getList(query);
    }
    async getOne(id) {
        return this.testimonialService.getOne(BigInt(id));
    }
    async create(dto) {
        return this.testimonialService.create(dto);
    }
    async update(id, dto) {
        return this.testimonialService.update(BigInt(id), dto);
    }
    async delete(id) {
        return this.testimonialService.delete(BigInt(id));
    }
};
exports.AdminTestimonialController = AdminTestimonialController;
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminTestimonialController.prototype, "getList", null);
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminTestimonialController.prototype, "getOne", null);
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_testimonial_dto_1.CreateTestimonialDto]),
    __metadata("design:returntype", Promise)
], AdminTestimonialController.prototype, "create", null);
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_testimonial_dto_1.UpdateTestimonialDto]),
    __metadata("design:returntype", Promise)
], AdminTestimonialController.prototype, "update", null);
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminTestimonialController.prototype, "delete", null);
exports.AdminTestimonialController = AdminTestimonialController = __decorate([
    (0, swagger_1.ApiTags)('Admin Testimonials'),
    (0, common_1.Controller)('admin/testimonials'),
    __metadata("design:paramtypes", [testimonial_service_1.AdminTestimonialService])
], AdminTestimonialController);
//# sourceMappingURL=testimonial.controller.js.map