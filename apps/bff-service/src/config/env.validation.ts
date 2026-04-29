import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().port().default(3006),
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
  COMIC_SERVICE_URL: Joi.string().uri().default('http://localhost:3001/api'),
  MAIN_SERVICE_URL: Joi.string().uri().default('http://localhost:8000/api'),
  BFF_REDIS_URL: Joi.string().optional().allow(''),
  SERVICE_TIMEOUT_MS: Joi.number().default(5000),
  AUTH_JWKS_URL: Joi.string().uri().optional().allow(''),
}).unknown(true);
