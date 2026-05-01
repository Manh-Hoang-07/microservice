import { Injectable, ForbiddenException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { UserRepository } from '../repositories/user.repository';
import { TokenService } from './token.service';
import { safeUser } from '../utils/user.util';
import { PrimaryKey } from 'src/types';

@Injectable()
export class SocialAuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly tokenService: TokenService,
    private readonly i18n: I18nService,
  ) {}

  async handleGoogleAuth(profile: {
    googleId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
  }) {
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
      const username = await this.generateUniqueUsername(email);
      dbUser = await this.userRepo.create({ ...userData, email, username });
    }

    if (dbUser.status !== 'active') {
      const lang = I18nContext.current()?.lang ?? 'en';
      throw new ForbiddenException(this.i18n.t('auth.ACCOUNT_LOCKED', { lang }));
    }

    const userId: PrimaryKey = dbUser.id;
    const tokens = await this.tokenService.generateTokens(userId, dbUser.email!);
    await this.tokenService.storeRefreshJti(userId, tokens.refreshJti, tokens.refreshTtlSec);

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

  private async generateUniqueUsername(email: string): Promise<string> {
    const base = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '').slice(0, 40) || 'user';
    for (let i = 0; i < 5; i++) {
      const candidate = `${base}_${randomBytes(3).toString('hex')}`;
      const existing = await this.userRepo.findByUsername(candidate);
      if (!existing) return candidate;
    }
    return `${base}_${randomBytes(6).toString('hex')}`;
  }
}
