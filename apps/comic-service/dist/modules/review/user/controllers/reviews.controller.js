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
exports.UserReviewController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const reviews_service_1 = require("../services/reviews.service");
const create_review_dto_1 = require("../dtos/create-review.dto");
let UserReviewController = class UserReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async createOrUpdate(req, dto) {
        const userId = BigInt(req.user.sub);
        return this.reviewService.createOrUpdate(userId, dto);
    }
    async delete(req, id) {
        const userId = BigInt(req.user.sub);
        return this.reviewService.delete(userId, BigInt(id));
    }
};
exports.UserReviewController = UserReviewController;
__decorate([
    (0, common_2.Permission)('user'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], UserReviewController.prototype, "createOrUpdate", null);
__decorate([
    (0, common_2.Permission)('user'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserReviewController.prototype, "delete", null);
exports.UserReviewController = UserReviewController = __decorate([
    (0, swagger_1.ApiTags)('User Reviews'),
    (0, common_1.Controller)('user/reviews'),
    __metadata("design:paramtypes", [reviews_service_1.UserReviewService])
], UserReviewController);
//# sourceMappingURL=reviews.controller.js.map