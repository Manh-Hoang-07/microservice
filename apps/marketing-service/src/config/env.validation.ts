import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().port().default(3009),
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
  DATABASE_URL: Joi.string().required(),
  AUTH_JWKS_URL: Joi.string().optional().allow(''),
  KAFKA_BROKERS: Joi.string().optional().allow(''),
  EVENT_DRIVER: Joi.string().optional().allow(''),
}).unknown(true);
