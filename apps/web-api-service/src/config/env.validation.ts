import * as Joi from 'joi';

const isProd = Joi.string().valid('production');

export const envValidationSchema = Joi.object({
  SERVICE_NAME: Joi.string().default('Gateway Service'),
  PORT: Joi.number().port().default(3006),
  APP_URL: Joi.string().uri().optional(),
  APP_TIMEZONE: Joi.string().default('Asia/Ho_Chi_Minh'),
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
  GLOBAL_PREFIX: Joi.string().default('api'),
  CORS_ORIGINS: Joi.alternatives().conditional('NODE_ENV', {
    is: isProd,
    then: Joi.string()
      .required()
      .pattern(/^(?!\*$).+/, { name: 'no-wildcard' })
      .messages({
        'string.pattern.name':
          'CORS_ORIGINS must be an explicit comma-separated origin list in production (no "*").',
      }),
    otherwise: Joi.string().default('*'),
  }),

  // Upstream services
  COMIC_SERVICE_URL: Joi.string().uri().default('http://localhost:3001/api'),
  POST_SERVICE_URL: Joi.string().uri().default('http://localhost:3007/api'),
  SERVICE_TIMEOUT_MS: Joi.number().default(5000),

  // Redis (cache, optional)
  GATEWAY_REDIS_URL: Joi.string().optional().allow(''),

  // JWT (consumer) — required in prod
  AUTH_JWKS_URL: Joi.alternatives().conditional('NODE_ENV', {
    is: isProd,
    then: Joi.string().uri().required(),
    otherwise: Joi.string().uri().optional().allow(''),
  }),

  // Internal — gateway forwards `x-internal-secret` to upstream services.
  INTERNAL_API_SECRET: Joi.alternatives().conditional('NODE_ENV', {
    is: isProd,
    then: Joi.string().min(16).required(),
    otherwise: Joi.string().optional().allow(''),
  }),

  OTEL_EXPORTER_OTLP_ENDPOINT: Joi.string().optional().allow(''),
}).unknown(true);
