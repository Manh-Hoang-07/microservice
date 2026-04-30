// Decorators
export { Permission, Public, Internal, PERMS_KEY } from './decorators/permission.decorator';

// Filters
export { GlobalExceptionFilter } from './filters/global-exception.filter';

// Guards
export { JwtGuard } from './guards/jwt.guard';
export { InternalGuard } from './guards/internal.guard';
export { RbacGuard } from './guards/rbac.guard';

// Interceptors
export { BigIntSerializationInterceptor } from './interceptors/bigint-serialization.interceptor';

// Helpers
export { createPaginationMeta, parseQueryOptions, type PaginationMeta, type QueryOptions } from './helpers/pagination.helper';
export { parseDurationToSeconds } from './helpers/duration.helper';
export { SlugHelper } from './helpers/slug.helper';
export { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
export { ImageValidator } from './validators/image-validator';

// Database — PrismaService/DatabaseModule stay LOCAL in each service
// because each service generates its own PrismaClient from its own schema.

// Repository pattern
export { PrismaRepository, PrismaDelegate, IPaginatedResult, IPaginationOptions, prepareQuery } from './repository/prisma.repository';

// Base service
export { BaseService, IRepository } from './services/base.service';

// Health
export { HealthModule } from './health/health.module';
export { HealthController } from './health/health.controller';

// Kafka outbox
export { OutboxRelayService, OutboxRelayOptions } from './kafka/outbox-relay.service';
