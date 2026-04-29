import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3002', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  globalPrefix: process.env.GLOBAL_PREFIX || 'api',
  corsOrigins: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((s) => s.trim())
    : ['*'],
  internalApiSecret: process.env.INTERNAL_API_SECRET || '',
  frontendUrl: process.env.GOOGLE_FRONTEND_URL || 'http://localhost:3000',
}));
