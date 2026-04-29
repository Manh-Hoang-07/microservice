"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTIVE_STATUS = exports.CertificateType = exports.AboutSectionType = exports.ProjectStatus = void 0;
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["planning"] = "planning";
    ProjectStatus["in_progress"] = "in_progress";
    ProjectStatus["completed"] = "completed";
    ProjectStatus["cancelled"] = "cancelled";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
var AboutSectionType;
(function (AboutSectionType) {
    AboutSectionType["general"] = "general";
    AboutSectionType["mission"] = "mission";
    AboutSectionType["vision"] = "vision";
    AboutSectionType["history"] = "history";
    AboutSectionType["values"] = "values";
})(AboutSectionType || (exports.AboutSectionType = AboutSectionType = {}));
var CertificateType;
(function (CertificateType) {
    CertificateType["iso"] = "iso";
    CertificateType["quality"] = "quality";
    CertificateType["safety"] = "safety";
    CertificateType["environment"] = "environment";
    CertificateType["other"] = "other";
})(CertificateType || (exports.CertificateType = CertificateType = {}));
exports.ACTIVE_STATUS = 'active';
//# sourceMappingURL=enums.js.map