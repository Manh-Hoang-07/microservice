import { registerAs } from '@nestjs/config';

export default registerAs('gateway', () => ({
  port: parseInt(process.env.PORT || '3006', 10),
  comicServiceUrl: process.env.COMIC_SERVICE_URL || 'http://localhost:3001/api',
  postServiceUrl: process.env.POST_SERVICE_URL || 'http://localhost:3007/api',
  redisUrl: process.env.GATEWAY_REDIS_URL || '',
  serviceTimeoutMs: parseInt(process.env.SERVICE_TIMEOUT_MS || '5000', 10),
  jwksUrl: process.env.AUTH_JWKS_URL || '',
  corsOrigins: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean)
    : ['*'],
}));
