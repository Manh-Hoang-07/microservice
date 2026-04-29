import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().port().default(3003),
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
  STORAGE_TYPE: Joi.string().valid('local', 's3', 'cloudinary').default('local'),
  STORAGE_MAX_FILE_SIZE: Joi.number().default(10485760),
  AUTH_JWKS_URL: Joi.string().uri().optional().allow(''),
}).unknown(true);
