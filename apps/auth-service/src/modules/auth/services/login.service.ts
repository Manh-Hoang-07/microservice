import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { TokenBlacklistService } from '../../../security/services/token-blacklist.service';
import { AttemptLimiterService } from '../../../security/services/attempt-limiter.service';
import { TokenService } from './token.service';
import { LoginDto } from '../dto/login.dto';
import { UserRepository } from '../repositories/user.repository';
import { PrimaryKey } from 'src/types';

@Injectable()
export class LoginService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly tokenBlacklistService: TokenBlacklistService,
    private readonly tokenService: TokenService,
    private readonly accountLockoutService: AttemptLimiterService,
    private readonly i18n: I18nService,
  ) {}

  private t(key: string, args?: Record<string, unknown>): string {
    const lang = I18nContext.current()?.lang ?? 'en';
    return this.i18n.t(key, { lang, args }) as string;
  }

  async login(dto: LoginDto) {
    const identifier = dto.email.toLowerCase();
    const scope = 'auth:login';

    const lockout = await this.accountLockoutService.check(scope, identifier);
    if (lockout.isLocked) {
      throw new ForbiddenException(
        this.t('auth.ACCOUNT_TEMPORARILY_LOCKED', { minutes: lockout.remainingMinutes }),
      );
    }

    const user = await this.userRepo.findByEmailSelect(identifier);

    if (!user || !user.password) {
      await this.accountLockoutService.add(scope, identifier);
      throw new UnauthorizedException(this.t('auth.INVALID_CREDENTIALS'));
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      await this.accountLockoutService.add(scope, identifier);
      throw new UnauthorizedException(this.t('auth.INVALID_CREDENTIALS'));
    }

    if (user.status !== 'active') {
      throw new ForbiddenException(this.t('auth.ACCOUNT_LOCKED'));
    }

    await this.accountLockoutService.reset(scope, identifier);
    await this.userRepo.updateLastLogin(user.id);

    const userPk: PrimaryKey = user.id;
    const tokens = await this.tokenService.generateTokens(userPk, user.email!);
    await this.tokenService.storeRefreshJti(userPk, tokens.refreshJti, tokens.refreshTtlSec);

    return {
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.accessTtlSec,
    };
  }

  async logout(accessToken?: string, refreshToken?: string) {
    let accessSub: string | undefined;
    if (accessToken) {
      try {
        const accessPayload = await this.tokenService.verifyAccessToken(accessToken);
        // Reject refresh tokens presented as access tokens (cannot blacklist
        // someone else's session via this endpoint).
        if ((accessPayload as any)?.type === 'refresh') {
          accessSub = undefined;
        } else {
          accessSub = accessPayload.sub as string | undefined;
          await this.tokenBlacklistService.add(accessToken, this.tokenService.getAccessTtlSec());
        }
      } catch {
        // Invalid access token — silently ignore; logout still tries refresh
      }
    }
    if (refreshToken) {
      const decoded = await this.tokenService.decodeRefresh(refreshToken);
      const refreshSub = decoded?.sub as string | undefined;
      const jti = (decoded as any)?.jti as string | undefined;
      // If both tokens were supplied, ensure they belong to the same subject
      // before revoking — prevents using a stolen refresh-token to revoke
      // someone else's session via a forged access-token.
      if (refreshSub && jti && (!accessSub || accessSub === refreshSub)) {
        await this.tokenService.revokeRefreshJti(BigInt(refreshSub), jti);
      }
    }
    return null;
  }

  async logoutAll(userId: PrimaryKey, accessToken?: string) {
    if (accessToken) {
      await this.tokenBlacklistService.add(accessToken, this.tokenService.getAccessTtlSec());
    }
    await this.tokenService.revokeAllUserSessions(userId);
    return null;
  }

  async refreshTokenByValue(refreshToken: string) {
    const decoded = await this.tokenService.decodeRefresh(refreshToken);
    if (!decoded) throw new UnauthorizedException(this.t('auth.INVALID_TOKEN'));

    const sub = decoded.sub as string | undefined;
    const jti = (decoded as any).jti as string | undefined;

    if (!sub || !jti) {
      throw new UnauthorizedException(this.t('auth.INVALID_REFRESH_TOKEN'));
    }

    const userId: PrimaryKey = BigInt(sub);
    const isActive = await this.tokenService.isRefreshActive(userId, jti);
    if (!isActive) {
      throw new UnauthorizedException(this.t('auth.REFRESH_TOKEN_REVOKED'));
    }

    await this.tokenService.revokeRefreshJti(userId, jti);

    const tokens = await this.tokenService.generateTokens(
      userId,
      (decoded as any).email,
    );
    await this.tokenService.storeRefreshJti(userId, tokens.refreshJti, tokens.refreshTtlSec);

    return {
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.accessTtlSec,
    };
  }
}
