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
exports.PublicReviewController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const reviews_service_1 = require("../services/reviews.service");
let PublicReviewController = class PublicReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async getList(query) {
        return this.reviewService.getList(query);
    }
};
exports.PublicReviewController = PublicReviewController;
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicReviewController.prototype, "getList", null);
exports.PublicReviewController = PublicReviewController = __decorate([
    (0, swagger_1.ApiTags)('Public Reviews'),
    (0, common_1.Controller)('public/reviews'),
    __metadata("design:paramtypes", [reviews_service_1.PublicReviewService])
], PublicReviewController);
//# sourceMappingURL=reviews.controller.js.map