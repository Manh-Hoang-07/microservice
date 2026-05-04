import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Prisma } from 'src/generated/prisma';
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

  private t(key: string): string {
    const lang = I18nContext.current()?.lang ?? 'en';
    return this.i18n.t(key, { lang }) as string;
  }

  async handleGoogleAuth(profile: {
    googleId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
  }) {
    const email = profile.email.toLowerCase();
    const now = new Date();

    const existing = await this.userRepo.findByEmail(email);

    // Block silent account merge: if a user exists for this email but it has
    // already been linked to a DIFFERENT Google account, refuse the link
    // attempt instead of overwriting the bound googleId.
    if (existing && existing.googleId && existing.googleId !== profile.googleId) {
      throw new ForbiddenException(this.t('auth.ACCOUNT_LINKED_TO_OTHER'));
    }

    // Status must be checked BEFORE writing — locked/banned users should not
    // have profile fields refreshed by an attempted login.
    if (existing && existing.status !== 'active') {
      throw new ForbiddenException(this.t('auth.ACCOUNT_LOCKED'));
    }

    const fullName = this.resolveFullName(profile);
    const dbUser = existing
      ? await this.userRepo.update(existing.id, {
          name: fullName,
          image: profile.picture ?? null,
          googleId: profile.googleId,
          email_verified_at: existing.email_verified_at ?? now,
          last_login_at: now,
        })
      : await this.createWithUniqueUsername(email, profile.googleId, fullName, profile.picture, now);

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

  private async createWithUniqueUsername(
    email: string,
    googleId: string,
    name: string,
    picture: string | undefined,
    now: Date,
  ) {
    const base = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '').slice(0, 40) || 'user';
    // Up to 5 retries on username collisions, then fall back to a long suffix.
    for (let i = 0; i < 6; i++) {
      const suffix = i < 5 ? randomBytes(3).toString('hex') : randomBytes(8).toString('hex');
      const candidate = `${base}_${suffix}`;
      try {
        return await this.userRepo.withTransaction(async (tx) => {
          const created = await this.userRepo.create(
            {
              email,
              username: candidate,
              name,
              image: picture ?? null,
              googleId,
              status: 'active',
              email_verified_at: now,
              last_login_at: now,
            },
            tx,
          );
          await this.userRepo.enqueueOutboxEvent(
            'user.registered',
            {
              user_id: String(created.id),
              email: created.email,
              username: created.username,
              name: created.name,
              source: 'google',
              occurred_at: new Date().toISOString(),
            },
            tx,
          );
          return created;
        });
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
          continue;
        }
        throw err;
      }
    }
    throw new ConflictException(this.t('auth.USERNAME_GENERATION_FAILED'));
  }
}
