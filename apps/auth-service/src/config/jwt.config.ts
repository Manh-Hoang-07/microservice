import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  privateKeyPem: process.env.JWT_PRIVATE_KEY_PEM || '',
  publicKeyPem: process.env.JWT_PUBLIC_KEY_PEM || '',
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  issuer: process.env.JWT_ISSUER || 'auth-service',
  audience: process.env.JWT_AUDIENCE || 'comic-platform',
}));
