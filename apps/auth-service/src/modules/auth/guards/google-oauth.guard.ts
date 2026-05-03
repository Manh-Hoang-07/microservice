import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { GoogleOauthStateService } from '../services/google-state.service';

/**
 * Wraps `AuthGuard('google')` so the initial `/auth/google` redirect carries
 * a CSRF state token (cookie + URL param) and the `/auth/google/callback`
 * leg verifies it before passport exchanges the code. Without this, an
 * attacker can force a victim's browser to complete OAuth flow with the
 * attacker's Google account, binding the victim session to attacker's
 * identity ("login CSRF").
 */
@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {
  constructor(
    private readonly stateService: GoogleOauthStateService,
    private readonly config: ConfigService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request & { _googleState?: string }>();
    const res = context.switchToHttp().getResponse<Response>();
    const isProd =
      this.config.get<string>('app.nodeEnv') === 'production' ||
      process.env.NODE_ENV === 'production';

    const queryState = (req.query?.state as string | undefined) ?? '';
    if (!queryState) {
      // Initial leg → mint a state token, stash it in the cookie, hand it
      // to passport via getAuthenticateOptions().
      req._googleState = this.stateService.issue(res, isProd);
    } else {
      // Callback leg → must match the cookie. Throws BadRequestException
      // before passport exchanges the code.
      this.stateService.verify(req);
      // Drop the cookie regardless of downstream success.
      this.stateService.clear(res);
    }

    return (await super.canActivate(context)) as boolean;
  }

  /** Inject `state` into the redirect URL on the initial leg. */
  getAuthenticateOptions(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request & { _googleState?: string }>();
    if (req._googleState) {
      return { state: req._googleState };
    }
    return undefined;
  }
}
