"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialModule = void 0;
const common_1 = require("@nestjs/common");
const testimonial_controller_1 = require("./admin/controllers/testimonial.controller");
const testimonial_service_1 = require("./admin/services/testimonial.service");
const testimonial_controller_2 = require("./public/controllers/testimonial.controller");
const testimonial_service_2 = require("./public/services/testimonial.service");
let TestimonialModule = class TestimonialModule {
};
exports.TestimonialModule = TestimonialModule;
exports.TestimonialModule = TestimonialModule = __decorate([
    (0, common_1.Module)({
        controllers: [testimonial_controller_1.AdminTestimonialController, testimonial_controller_2.PublicTestimonialController],
        providers: [testimonial_service_1.AdminTestimonialService, testimonial_service_2.PublicTestimonialService],
        exports: [testimonial_service_2.PublicTestimonialService],
    })
], TestimonialModule);
//# sourceMappingURL=testimonial.module.js.map