"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateComicDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_comic_dto_1 = require("./create-comic.dto");
class UpdateComicDto extends (0, swagger_1.PartialType)(create_comic_dto_1.CreateComicDto) {
}
exports.UpdateComicDto = UpdateComicDto;
//# sourceMappingURL=update-comic.dto.js.map