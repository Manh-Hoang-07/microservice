import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { I18nService } from 'nestjs-i18n';
import { t } from '@package/common';
import { TokenBlacklistService } from '../../../core/security/services/token-blacklist.service';
import { AttemptLimiterService } from '../../../core/security/services/attempt-limiter.service';
import { TokenService } from './token.service';
import { LoginDto } from '../dto/login.dto';
import { UserRepository } from '../repositories/user.repository';
import { PrimaryKey, toPrimaryKey } from 'src/types';

@Injectable()
export class LoginService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly tokenBlacklistService: TokenBlacklistService,
    private readonly tokenService: TokenService,
    private readonly accountLockoutService: AttemptLimiterService,
    private readonly i18n: I18nService,
  ) {}

  async login(dto: LoginDto) {
    const identifier = dto.email.toLowerCase();
    const scope = 'auth:login';

    const lockout = await this.accountLockoutService.check(scope, identifier);
    if (lockout.isLocked) {
      throw new ForbiddenException(
        t(this.i18n,'auth.ACCOUNT_TEMPORARILY_LOCKED', { minutes: lockout.remainingMinutes }),
      );
    }

    const user = await this.userRepo.findByEmailSelect(identifier);

    if (!user || !user.password) {
      await this.accountLockoutService.add(scope, identifier);
      throw new UnauthorizedException(t(this.i18n,'auth.INVALID_CREDENTIALS'));
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      await this.accountLockoutService.add(scope, identifier);
      throw new UnauthorizedException(t(this.i18n,'auth.INVALID_CREDENTIALS'));
    }

    if (user.status !== 'active') {
      throw new ForbiddenException(t(this.i18n,'auth.ACCOUNT_LOCKED'));
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
        if ((accessPayload as any)?.type === 'refresh') {
          accessSub = undefined;
        } else {
          accessSub = accessPayload.sub as string | undefined;
          await this.tokenBlacklistService.add(accessToken, this.tokenService.getAccessTtlSec());
        }
      } catch { /* ignore invalid token */ }
    }
    if (refreshToken) {
      const decoded = await this.tokenService.decodeRefresh(refreshToken);
      const refreshSub = decoded?.sub as string | undefined;
      const jti = (decoded as any)?.jti as string | undefined;
      if (refreshSub && jti && (!accessSub || accessSub === refreshSub)) {
        await this.tokenService.revokeRefreshJti(toPrimaryKey(refreshSub), jti);
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
    if (!decoded) throw new UnauthorizedException(t(this.i18n,'auth.INVALID_TOKEN'));

    const sub = decoded.sub as string | undefined;
    const jti = (decoded as any).jti as string | undefined;

    if (!sub || !jti) {
      throw new UnauthorizedException(t(this.i18n,'auth.INVALID_REFRESH_TOKEN'));
    }

    const userId: PrimaryKey = toPrimaryKey(sub);
    const isActive = await this.tokenService.isRefreshActive(userId, jti);
    if (!isActive) {
      await this.tokenService.revokeAllUserSessions(userId);
      throw new UnauthorizedException(t(this.i18n,'auth.REFRESH_TOKEN_REUSE_DETECTED'));
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
