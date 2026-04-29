"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBLIC_CHAPTER_STATUSES = exports.PUBLIC_COMIC_STATUSES = exports.ChapterStatus = exports.ComicStatus = void 0;
var ComicStatus;
(function (ComicStatus) {
    ComicStatus["draft"] = "draft";
    ComicStatus["published"] = "published";
    ComicStatus["scheduled"] = "scheduled";
})(ComicStatus || (exports.ComicStatus = ComicStatus = {}));
var ChapterStatus;
(function (ChapterStatus) {
    ChapterStatus["draft"] = "draft";
    ChapterStatus["published"] = "published";
    ChapterStatus["scheduled"] = "scheduled";
})(ChapterStatus || (exports.ChapterStatus = ChapterStatus = {}));
exports.PUBLIC_COMIC_STATUSES = [ComicStatus.published, ComicStatus.scheduled];
exports.PUBLIC_CHAPTER_STATUSES = [ChapterStatus.published, ChapterStatus.scheduled];
//# sourceMappingURL=enums.js.map