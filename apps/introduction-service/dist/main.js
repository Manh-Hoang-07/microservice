"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tracing_1 = require("@package/tracing");
(0, tracing_1.initTracing)('introduction-service');
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    const port = parseInt(process.env.PORT ?? '3008', 10);
    const prefix = process.env.GLOBAL_PREFIX ?? 'api';
    app.setGlobalPrefix(prefix);
    const corsOrigins = process.env.CORS_ORIGINS?.split(',').map((s) => s.trim()) ?? '*';
    app.enableCors({ origin: corsOrigins });
    app.enableShutdownHooks();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
    }));
    if (process.env.NODE_ENV !== 'production') {
        const doc = new swagger_1.DocumentBuilder()
            .setTitle('Introduction Service')
            .setDescription('Introduction domain microservice — Comic Platform')
            .setVersion('1.0')
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
            .build();
        swagger_1.SwaggerModule.setup(`${prefix}/docs`, app, swagger_1.SwaggerModule.createDocument(app, doc));
    }
    await app.listen(port);
    console.log(`Introduction Service running on http://localhost:${port}/${prefix}`);
}
bootstrap().catch((err) => {
    console.error('Introduction Service failed to start', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map