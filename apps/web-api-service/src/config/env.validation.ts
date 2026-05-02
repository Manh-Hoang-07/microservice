import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  // App
  SERVICE_NAME: Joi.string().default('Gateway Service'),
  PORT: Joi.number().port().default(3006),
  APP_URL: Joi.string().uri().optional(),
  APP_TIMEZONE: Joi.string().default('Asia/Ho_Chi_Minh'),
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
  GLOBAL_PREFIX: Joi.string().default('api'),
  CORS_ORIGINS: Joi.string().default('*'),

  // Upstream services
  COMIC_SERVICE_URL: Joi.string().uri().default('http://localhost:3001/api'),
  POST_SERVICE_URL: Joi.string().uri().default('http://localhost:3007/api'),
  SERVICE_TIMEOUT_MS: Joi.number().default(5000),

  // Redis (cache, optional)
  GATEWAY_REDIS_URL: Joi.string().optional().allow(''),

  // JWT (consumer)
  AUTH_JWKS_URL: Joi.string().uri().optional().allow(''),

  // Internal
  INTERNAL_API_SECRET: Joi.string().optional().allow(''),

  // Observability
  OTEL_EXPORTER_OTLP_ENDPOINT: Joi.string().optional().allow(''),
}).unknown(true);
