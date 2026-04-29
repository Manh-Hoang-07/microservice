"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAboutDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_about_dto_1 = require("./create-about.dto");
class UpdateAboutDto extends (0, swagger_1.PartialType)(create_about_dto_1.CreateAboutDto) {
}
exports.UpdateAboutDto = UpdateAboutDto;
//# sourceMappingURL=update-about.dto.js.map