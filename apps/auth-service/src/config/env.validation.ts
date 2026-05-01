import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  SERVICE_NAME: Joi.string().default('Auth Service'),
  PORT: Joi.number().port().default(3002),
  APP_URL: Joi.string().optional().allow(''),
  APP_TIMEZONE: Joi.string().default('Asia/Ho_Chi_Minh'),
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
  GLOBAL_PREFIX: Joi.string().default('api'),
  CORS_ORIGINS: Joi.string().default('*'),

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

  INTERNAL_API_SECRET: Joi.string().optional().allow(''),

  SECURITY_ATTEMPT_MAX: Joi.number().default(5),
  SECURITY_ATTEMPT_WINDOW_SECONDS: Joi.number().default(900),
  SECURITY_ATTEMPT_LOCKOUT_SECONDS: Joi.number().default(1800),
  OTP_TTL_SECONDS: Joi.number().default(300),

  KAFKA_BROKERS: Joi.string().optional().allow(''),
  KAFKA_GROUP_ID: Joi.string().optional().allow(''),
  EVENT_DRIVER: Joi.string().valid('local', 'kafka').default('local'),
}).unknown(true);
