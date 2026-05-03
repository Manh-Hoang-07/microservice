import * as Joi from 'joi';

const isProd = Joi.string().valid('production');

export const envValidationSchema = Joi.object({
  PORT: Joi.number().port().default(3005),
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

  DATABASE_URL: Joi.string().required(),

  AUTH_JWKS_URL: Joi.alternatives().conditional('NODE_ENV', {
    is: isProd,
    then: Joi.string().uri().required(),
    otherwise: Joi.string().uri().optional().allow(''),
  }),
  IAM_INTERNAL_URL: Joi.alternatives().conditional('NODE_ENV', {
    is: isProd,
    then: Joi.string().uri().required(),
    otherwise: Joi.string().uri().optional().allow(''),
  }),
  INTERNAL_API_SECRET: Joi.alternatives().conditional('NODE_ENV', {
    is: isProd,
    then: Joi.string().min(16).required(),
    otherwise: Joi.string().optional().allow(''),
  }),
}).unknown(true);
