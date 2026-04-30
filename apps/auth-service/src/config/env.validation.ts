import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().port().default(3002),
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
  APP_HOST: Joi.string().required(),
  PREFIX: Joi.string().optional().allow(''),
  DATABASE_URL: Joi.string().required(),
  REDIS_URL: Joi.string().optional().allow(''),
  JWT_PRIVATE_KEY_PEM: Joi.string().optional().allow(''),
  JWT_PUBLIC_KEY_PEM: Joi.string().optional().allow(''),
  JWT_EXPIRES_IN: Joi.string().default('1h'),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
  JWT_ISSUER: Joi.string().default('auth-service'),
  JWT_AUDIENCE: Joi.string().default('comic-platform'),
  GOOGLE_CLIENT_ID: Joi.string().optional().allow(''),
  GOOGLE_CLIENT_SECRET: Joi.string().optional().allow(''),
  GOOGLE_CALLBACK_URL: Joi.string().optional().allow(''),
  GOOGLE_FRONTEND_URL: Joi.string().optional().allow(''),
  KAFKA_BROKERS: Joi.string().optional().allow(''),
  EVENT_DRIVER: Joi.string().optional().allow(''),
  INTERNAL_API_SECRET: Joi.string().optional().allow(''),
}).unknown(true);
