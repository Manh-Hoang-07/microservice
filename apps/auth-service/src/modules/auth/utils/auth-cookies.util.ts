import { UnauthorizedException } from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';

export const ACCESS_COOKIE = 'auth_token';
export const REFRESH_COOKIE = 'auth_refresh_token';

/** Build the refresh-cookie path from the runtime global prefix. */
export function buildRefreshCookiePath(): string {
  const prefix = (process.env.GLOBAL_PREFIX || 'api').replace(/^\/+|\/+$/g, '');
  return `/${prefix}/auth/refresh`;
}

function cookieOptions(_req: Request, maxAgeMs: number, isProd: boolean): CookieOptions {
  // Do NOT set `domain` for localhost — modern browsers reject `domain=localhost`.
  // Leaving it undefined scopes the cookie to the current host, which is correct.
  return {
    maxAge: maxAgeMs,
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    path: '/',
  };
}

export function setAuthCookies(
  req: Request,
  res: Response,
  accessToken: string,
  refreshToken: string,
  ttl: { accessMs: number; refreshMs: number },
  isProd: boolean,
): void {
  res.cookie(ACCESS_COOKIE, accessToken, cookieOptions(req, ttl.accessMs, isProd));
  res.cookie(REFRESH_COOKIE, refreshToken, {
    ...cookieOptions(req, ttl.refreshMs, isProd),
    path: buildRefreshCookiePath(),
  });
}

export function clearAuthCookies(req: Request, res: Response, isProd: boolean): void {
  const opts = cookieOptions(req, 0, isProd);
  res.clearCookie(ACCESS_COOKIE, { ...opts, maxAge: undefined });
  res.clearCookie(REFRESH_COOKIE, {
    ...opts,
    maxAge: undefined,
    path: buildRefreshCookiePath(),
  });
}

export function extractBearer(authHeader?: string): string | undefined {
  if (!authHeader?.startsWith('Bearer ')) return undefined;
  return authHeader.slice(7);
}

export function requireUserId(req: Request): string {
  const user = (req as any).user;
  const sub = user?.sub ?? user?.id;
  if (!sub) throw new UnauthorizedException('Authentication required');
  return String(sub);
}
