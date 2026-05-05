import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import type { CookieOptions, Request, Response } from 'express';

const COOKIE_NAME = 'google_oauth_state';
const STATE_TTL_SECONDS = 10 * 60;
const SAFE_NONCE_RE = /^[A-Za-z0-9_-]{1,64}$/;

/**
 * CSRF state for Google OAuth.
 *
 * Issues a stateless `state` token of the form `<nonce>.<hmac-base64url>`
 * and sets it as a HttpOnly cookie on the same response. On callback, the
 * cookie value MUST match the `state` query param, defeating login-CSRF
 * (attacker forces victim's browser to complete OAuth flow with attacker's
 * Google account, binding the victim's session to attacker's identity).
 */
@Injectable()
export class GoogleOauthStateService {
  private readonly secret: string;

  constructor(config: ConfigService) {
    this.secret = config.get<string>('GOOGLE_OAUTH_STATE_SECRET') || '';
  }

  /** Issue a fresh state, set the cookie, return the state token. */
  issue(res: Response, isProd: boolean): string {
    const nonce = randomBytes(24).toString('base64url');
    const sig = this.sign(nonce);
    const state = `${nonce}.${sig}`;
    const cookieOpts: CookieOptions = {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: STATE_TTL_SECONDS * 1000,
      path: '/',
    };
    res.cookie(COOKIE_NAME, state, cookieOpts);
    return state;
  }

  /** Verify the cookie value matches the query state and HMAC checks out. */
  verify(req: Request): void {
    const cookieState = (req.cookies?.[COOKIE_NAME] as string | undefined) ?? '';
    const queryState = (req.query?.state as string | undefined) ?? '';
    if (!cookieState || !queryState) {
      throw new BadRequestException('Missing OAuth state');
    }
    // Constant-time compare to avoid timing side-channels on the cookie.
    if (!this.timingEqual(cookieState, queryState)) {
      throw new BadRequestException('OAuth state mismatch');
    }
    const [nonce, sig] = cookieState.split('.');
    if (!nonce || !sig || !SAFE_NONCE_RE.test(nonce)) {
      throw new BadRequestException('Malformed OAuth state');
    }
    const expected = this.sign(nonce);
    if (!this.timingEqual(sig, expected)) {
      throw new BadRequestException('OAuth state signature invalid');
    }
  }

  /** Drop the cookie after a successful or failed callback. */
  clear(res: Response): void {
    res.clearCookie(COOKIE_NAME, { path: '/' });
  }

  private sign(nonce: string): string {
    return createHmac('sha256', this.secret).update(nonce).digest('base64url');
  }

  private timingEqual(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    try {
      return timingSafeEqual(Buffer.from(a), Buffer.from(b));
    } catch {
      return false;
    }
  }
}
