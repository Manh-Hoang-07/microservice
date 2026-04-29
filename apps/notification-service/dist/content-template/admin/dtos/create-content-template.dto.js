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
exports.CreateContentTemplateDto = exports.TemplateCategory = exports.TemplateType = void 0;
const class_validator_1 = require("class-validator");
var TemplateType;
(function (TemplateType) {
    TemplateType["email"] = "email";
    TemplateType["telegram"] = "telegram";
    TemplateType["zalo"] = "zalo";
    TemplateType["sms"] = "sms";
})(TemplateType || (exports.TemplateType = TemplateType = {}));
var TemplateCategory;
(function (TemplateCategory) {
    TemplateCategory["render"] = "render";
    TemplateCategory["file"] = "file";
})(TemplateCategory || (exports.TemplateCategory = TemplateCategory = {}));
class CreateContentTemplateDto {
}
exports.CreateContentTemplateDto = CreateContentTemplateDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateContentTemplateDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateContentTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TemplateCategory),
    __metadata("design:type", String)
], CreateContentTemplateDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(TemplateType),
    __metadata("design:type", String)
], CreateContentTemplateDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContentTemplateDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateContentTemplateDto.prototype, "file_path", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateContentTemplateDto.prototype, "metadata", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateContentTemplateDto.prototype, "variables", void 0);
//# sourceMappingURL=create-content-template.dto.js.map