import { registerAs } from '@nestjs/config';

export default registerAs('gateway', () => ({
  port: parseInt(process.env.PORT || '3006', 10),
  comicServiceUrl: process.env.COMIC_SERVICE_URL || 'http://localhost:3001/api',
  postServiceUrl: process.env.POST_SERVICE_URL || 'http://localhost:3007/api',
  redisUrl: process.env.REDIS_URL || '',
  serviceTimeoutMs: parseInt(process.env.SERVICE_TIMEOUT_MS || '5000', 10),
  jwksUrl: process.env.AUTH_JWKS_URL || '',
  // Server-side internal secret used when calling upstream `/public/*`. NEVER
  // forward an attacker-supplied `x-internal-secret` header — populate from
  // env only.
  internalApiSecret: process.env.INTERNAL_API_SECRET || '',
  corsOrigins: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean)
    : ['*'],
}));
