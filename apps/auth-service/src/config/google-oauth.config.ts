import { registerAs } from '@nestjs/config';

export default registerAs('googleOAuth', () => {
  const appHost = process.env.APP_HOST;
  if (!appHost) throw new Error('APP_HOST is required');

  const port = process.env.PORT;
  const prefix = process.env.PREFIX || 'api';
  const baseUrl = port ? `${appHost}:${port}` : appHost;

  let callbackURL = process.env.GOOGLE_CALLBACK_URL || `/${prefix}/auth/google/callback`;
  if (callbackURL.startsWith('/')) {
    callbackURL = `${baseUrl}${callbackURL}`;
  }

  return {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL,
    frontendUrl: process.env.GOOGLE_FRONTEND_URL,
  };
});
