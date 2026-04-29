import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().port().default(3004),
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
  DATABASE_URL: Joi.string().required(),
  REDIS_URL: Joi.string().optional().allow(''),
  AUTH_JWKS_URL: Joi.string().optional().allow(''),
  KAFKA_BROKERS: Joi.string().optional().allow(''),
  KAFKA_GROUP_ID: Joi.string().optional().allow(''),
  MAIL_HOST: Joi.string().optional().allow(''),
  MAIL_PORT: Joi.number().default(587),
  MAIL_USER: Joi.string().optional().allow(''),
  MAIL_PASS: Joi.string().optional().allow(''),
  MAIL_FROM: Joi.string().optional().allow(''),
}).unknown(true);
