import { CookieOptions, Request, Response } from 'express';

export const ACCESS_COOKIE = 'auth_token';
export const REFRESH_COOKIE = 'auth_refresh_token';
export const REFRESH_COOKIE_PATH = '/api/auth/refresh';

function cookieOptions(req: Request, maxAgeMs: number, isProd: boolean): CookieOptions {
  return {
    maxAge: maxAgeMs,
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    domain: req.hostname === 'localhost' ? 'localhost' : undefined,
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
    path: REFRESH_COOKIE_PATH,
  });
}

export function clearAuthCookies(req: Request, res: Response, isProd: boolean): void {
  const opts = cookieOptions(req, 0, isProd);
  res.clearCookie(ACCESS_COOKIE, { ...opts, maxAge: undefined });
  res.clearCookie(REFRESH_COOKIE, { ...opts, maxAge: undefined, path: REFRESH_COOKIE_PATH });
}

export function extractBearer(authHeader?: string): string | undefined {
  if (!authHeader?.startsWith('Bearer ')) return undefined;
  return authHeader.slice(7);
}

export function requireUserId(req: Request): string {
  const user = (req as any).user;
  const sub = user?.sub ?? user?.id;
  if (!sub) throw new Error('Authenticated user missing from request');
  return String(sub);
}
