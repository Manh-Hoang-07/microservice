import { registerAs } from '@nestjs/config';

export default registerAs('googleOAuth', () => {
  const explicitCallback = process.env.GOOGLE_CALLBACK_URL;
  const appUrl = process.env.APP_URL || `http://localhost:${process.env.PORT || 3002}`;
  const prefix = process.env.GLOBAL_PREFIX || process.env.PREFIX || 'api';

  let callbackURL = explicitCallback || `/${prefix}/auth/google/callback`;
  if (callbackURL.startsWith('/')) {
    callbackURL = `${appUrl.replace(/\/+$/, '')}${callbackURL}`;
  }

  return {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL,
    frontendUrl: process.env.GOOGLE_FRONTEND_URL || '',
  };
});
