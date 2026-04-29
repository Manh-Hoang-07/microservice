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
exports.PublicContactController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const contact_service_1 = require("../services/contact.service");
const create_contact_dto_1 = require("../../admin/dtos/create-contact.dto");
let PublicContactController = class PublicContactController {
    constructor(contactService) {
        this.contactService = contactService;
    }
    async create(dto) {
        return this.contactService.create(dto);
    }
};
exports.PublicContactController = PublicContactController;
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_dto_1.CreateContactDto]),
    __metadata("design:returntype", Promise)
], PublicContactController.prototype, "create", null);
exports.PublicContactController = PublicContactController = __decorate([
    (0, swagger_1.ApiTags)('Public Contacts'),
    (0, common_1.Controller)('public/contacts'),
    __metadata("design:paramtypes", [contact_service_1.PublicContactService])
], PublicContactController);
//# sourceMappingURL=contact.controller.js.map