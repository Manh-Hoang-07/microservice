import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().port().default(3005),
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
  DATABASE_URL: Joi.string().required(),
  AUTH_JWKS_URL: Joi.string().uri().optional().allow(''),
  INTERNAL_API_SECRET: Joi.string().optional().allow(''),
}).unknown(true);
