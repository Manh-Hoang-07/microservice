"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostCategoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_post_category_dto_1 = require("./create-post-category.dto");
class UpdatePostCategoryDto extends (0, swagger_1.PartialType)(create_post_category_dto_1.CreatePostCategoryDto) {
}
exports.UpdatePostCategoryDto = UpdatePostCategoryDto;
//# sourceMappingURL=update-post-category.dto.js.map