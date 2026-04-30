import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  SERVICE_NAME: Joi.string().default('Notification Service'),
  PORT: Joi.number().port().default(3004),
  APP_URL: Joi.string().optional().allow(''),
  APP_TIMEZONE: Joi.string().default('Asia/Ho_Chi_Minh'),
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
  GLOBAL_PREFIX: Joi.string().default('api'),
  CORS_ORIGINS: Joi.string().default('*'),
  DATABASE_URL: Joi.string().required(),
  REDIS_URL: Joi.string().optional().allow(''),
  AUTH_JWKS_URL: Joi.string().optional().allow(''),
  KAFKA_BROKERS: Joi.string().optional().allow(''),
  KAFKA_GROUP_ID: Joi.string().optional().allow(''),
  CONFIG_INTERNAL_URL: Joi.string().optional().allow(''),
  INTERNAL_SECRET: Joi.string().optional().allow(''),
}).unknown(true);
