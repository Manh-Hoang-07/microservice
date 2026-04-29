"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostTagDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_post_tag_dto_1 = require("./create-post-tag.dto");
class UpdatePostTagDto extends (0, swagger_1.PartialType)(create_post_tag_dto_1.CreatePostTagDto) {
}
exports.UpdatePostTagDto = UpdatePostTagDto;
//# sourceMappingURL=update-post-tag.dto.js.map