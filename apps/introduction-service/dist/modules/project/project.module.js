"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const common_1 = require("@nestjs/common");
const project_controller_1 = require("./admin/controllers/project.controller");
const project_service_1 = require("./admin/services/project.service");
const project_controller_2 = require("./public/controllers/project.controller");
const project_service_2 = require("./public/services/project.service");
let ProjectModule = class ProjectModule {
};
exports.ProjectModule = ProjectModule;
exports.ProjectModule = ProjectModule = __decorate([
    (0, common_1.Module)({
        controllers: [project_controller_1.AdminProjectController, project_controller_2.PublicProjectController],
        providers: [project_service_1.AdminProjectService, project_service_2.PublicProjectService],
        exports: [project_service_2.PublicProjectService],
    })
], ProjectModule);
//# sourceMappingURL=project.module.js.map