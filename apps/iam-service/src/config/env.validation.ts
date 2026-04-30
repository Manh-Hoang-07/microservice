import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().port().default(3008),
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
  DATABASE_URL: Joi.string().required(),
  REDIS_URL: Joi.string().optional().allow(''),
  RBAC_CACHE_TTL: Joi.number().default(86400),
  INTERNAL_API_SECRET: Joi.string().optional().allow(''),
}).unknown(true);
