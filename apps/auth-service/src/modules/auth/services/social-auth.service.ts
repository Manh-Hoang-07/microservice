import { Injectable, ForbiddenException } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { UserRepository } from '../repositories/user.repository';
import { RedisService } from '../../../security/services/redis.service';
import { TokenService, PrimaryKey } from './token.service';
import { safeUser } from '../utils/user.util';

@Injectable()
export class SocialAuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly tokenService: TokenService,
    private readonly redis: RedisService,
    private readonly i18n: I18nService,
  ) {}

  async handleGoogleAuth(profile: {
    googleId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
  }) {
    const lang = I18nContext.current()?.lang ?? 'en';
    const email = profile.email.toLowerCase();
    const now = new Date();

    let dbUser = await this.userRepo.findByEmail(email);

    const userData = {
      name: this.resolveFullName(profile),
      image: profile.picture ?? null,
      status: 'active',
      googleId: profile.googleId,
      email_verified_at: now,
      last_login_at: now,
    };

    if (dbUser) {
      dbUser = await this.userRepo.update(dbUser.id, userData);
    } else {
      const username = this.generateUsername(email);
      dbUser = await this.userRepo.create({ ...userData, email, username });
    }

    if (dbUser.status !== 'active') {
      throw new ForbiddenException(this.i18n.t('auth.ACCOUNT_LOCKED', { lang }));
    }

    const userId = dbUser.id as unknown as PrimaryKey;
    const tokens = await this.tokenService.generateTokens(userId, dbUser.email!);

    await this.redis
      .set(
        `auth:refresh:${userId}:${tokens.refreshJti}`,
        '1',
        this.tokenService.getRefreshTtlSec(),
      )
      .catch(() => undefined);

    return {
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.accessTtlSec,
      user: safeUser(dbUser),
    };
  }

  private resolveFullName(profile: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }): string {
    return (
      [profile.firstName, profile.lastName].filter(Boolean).join(' ') ||
      (profile.email ? profile.email.split('@')[0] : '') ||
      'User'
    );
  }

  private generateUsername(email: string): string {
    return email.split('@')[0] + '_' + Date.now().toString().slice(-6);
  }
}
