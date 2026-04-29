"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBLIC_POST_STATUSES = exports.PostType = exports.PostStatus = void 0;
var PostStatus;
(function (PostStatus) {
    PostStatus["draft"] = "draft";
    PostStatus["scheduled"] = "scheduled";
    PostStatus["published"] = "published";
    PostStatus["archived"] = "archived";
})(PostStatus || (exports.PostStatus = PostStatus = {}));
var PostType;
(function (PostType) {
    PostType["text"] = "text";
    PostType["video"] = "video";
    PostType["image"] = "image";
    PostType["audio"] = "audio";
})(PostType || (exports.PostType = PostType = {}));
exports.PUBLIC_POST_STATUSES = [PostStatus.published, PostStatus.scheduled];
//# sourceMappingURL=enums.js.map