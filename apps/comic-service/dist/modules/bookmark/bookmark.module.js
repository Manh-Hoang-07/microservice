"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkModule = void 0;
const common_1 = require("@nestjs/common");
const bookmarks_controller_1 = require("./user/controllers/bookmarks.controller");
const bookmarks_service_1 = require("./user/services/bookmarks.service");
let BookmarkModule = class BookmarkModule {
};
exports.BookmarkModule = BookmarkModule;
exports.BookmarkModule = BookmarkModule = __decorate([
    (0, common_1.Module)({
        controllers: [bookmarks_controller_1.UserBookmarkController],
        providers: [bookmarks_service_1.UserBookmarkService],
    })
], BookmarkModule);
//# sourceMappingURL=bookmark.module.js.map