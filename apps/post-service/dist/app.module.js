"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const core_2 = require("@nestjs/core");
const Joi = __importStar(require("joi"));
const app_config_1 = __importDefault(require("./config/app.config"));
const kafka_config_1 = __importDefault(require("./config/kafka.config"));
const redis_config_1 = __importDefault(require("./config/redis.config"));
const database_module_1 = require("./database/database.module");
const redis_1 = require("@package/redis");
const common_2 = require("@package/common");
const common_3 = require("@package/common");
const health_module_1 = require("./health/health.module");
const kafka_module_1 = require("./kafka/kafka.module");
const post_module_1 = require("./modules/post/post.module");
const post_category_module_1 = require("./modules/post-category/post-category.module");
const post_tag_module_1 = require("./modules/post-tag/post-tag.module");
const post_comment_module_1 = require("./modules/post-comment/post-comment.module");
const post_stats_module_1 = require("./modules/post-stats/post-stats.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env', '.env.local'],
                load: [app_config_1.default, kafka_config_1.default, redis_config_1.default],
                validationSchema: Joi.object({
                    PORT: Joi.number().port().default(3007),
                    NODE_ENV: Joi.string()
                        .valid('development', 'staging', 'production')
                        .default('development'),
                    DATABASE_URL: Joi.string().required(),
                    REDIS_URL: Joi.string().optional().allow(''),
                    AUTH_JWKS_URL: Joi.string().optional().allow(''),
                    KAFKA_BROKERS: Joi.string().optional().allow(''),
                    EVENT_DRIVER: Joi.string().optional().allow(''),
                }).unknown(true),
            }),
            schedule_1.ScheduleModule.forRoot(),
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
            database_module_1.DatabaseModule,
            redis_1.RedisModule,
            health_module_1.HealthModule,
            kafka_module_1.KafkaModule,
            post_module_1.PostModule,
            post_category_module_1.PostCategoryModule,
            post_tag_module_1.PostTagModule,
            post_comment_module_1.PostCommentModule,
            post_stats_module_1.PostStatsModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useFactory: (reflector, config) => new common_2.JwtGuard(reflector, config),
                inject: [core_2.Reflector, config_1.ConfigService],
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: common_3.BigIntSerializationInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map