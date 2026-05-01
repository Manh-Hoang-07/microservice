import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  // App
  SERVICE_NAME: Joi.string().default('Post Service'),
  PORT: Joi.number().port().default(3007),
  APP_URL: Joi.string().uri().optional(),
  APP_TIMEZONE: Joi.string().default('Asia/Ho_Chi_Minh'),
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
  GLOBAL_PREFIX: Joi.string().default('api'),
  CORS_ORIGINS: Joi.string().default('*'),

  // Database
  DATABASE_URL: Joi.string().required(),

  // Redis
  REDIS_URL: Joi.string().optional().allow(''),

  // JWT (consumer)
  AUTH_JWKS_URL: Joi.string().optional().allow(''),

  // Internal
  INTERNAL_API_SECRET: Joi.string().optional().allow(''),

  // Kafka
  EVENT_DRIVER: Joi.string().valid('kafka', 'local').default('local'),
  KAFKA_BROKERS: Joi.string().optional().allow(''),

  // Observability
  OTEL_EXPORTER_OTLP_ENDPOINT: Joi.string().optional().allow(''),
}).unknown(true);
