import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  SERVICE_NAME: Joi.string().default('IAM Service'),
  PORT: Joi.number().port().default(3008),
  APP_URL: Joi.string().optional().allow(''),
  APP_TIMEZONE: Joi.string().default('Asia/Ho_Chi_Minh'),
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
  GLOBAL_PREFIX: Joi.string().default('api'),
  CORS_ORIGINS: Joi.string().default('*'),

  DATABASE_URL: Joi.string().required(),
  REDIS_URL: Joi.string().optional().allow(''),

  AUTH_JWKS_URL: Joi.string().optional().allow(''),
  INTERNAL_API_SECRET: Joi.string().optional().allow(''),

  RBAC_CACHE_TTL: Joi.number().default(86400),
}).unknown(true);
