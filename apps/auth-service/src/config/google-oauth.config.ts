import { registerAs } from '@nestjs/config';

export default registerAs('googleOAuth', () => {
  const appUrl = (process.env.APP_URL || 'http://localhost:3002').replace(/\/$/, '');
  const apiPrefix = process.env.GLOBAL_PREFIX || 'api';

  let callbackURL =
    process.env.GOOGLE_CALLBACK_URL || `/${apiPrefix}/auth/google/callback`;

  if (callbackURL.startsWith('/')) {
    callbackURL = `${appUrl}${callbackURL}`;
  }

  return {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL,
    frontendUrl: process.env.GOOGLE_FRONTEND_URL || 'http://localhost:3000',
  };
});
