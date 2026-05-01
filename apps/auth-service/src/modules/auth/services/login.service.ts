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

  async login(dto: LoginDto) {
    const lang = I18nContext.current()?.lang ?? 'en';
    const identifier = dto.email.toLowerCase();
    const scope = 'auth:login';

    const lockout = await this.accountLockoutService.check(scope, identifier);
    if (lockout.isLocked) {
      throw new ForbiddenException(
        this.i18n.t('auth.ACCOUNT_TEMPORARILY_LOCKED', { lang, args: { minutes: lockout.remainingMinutes } }),
      );
    }

    const user = await this.userRepo.findByEmailSelect(identifier);

    if (!user || !user.password) {
      await this.accountLockoutService.add(scope, identifier);
      throw new UnauthorizedException(this.i18n.t('auth.INVALID_CREDENTIALS', { lang }));
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      await this.accountLockoutService.add(scope, identifier);
      throw new UnauthorizedException(this.i18n.t('auth.INVALID_CREDENTIALS', { lang }));
    }

    if (user.status !== 'active') {
      throw new ForbiddenException(this.i18n.t('auth.ACCOUNT_LOCKED', { lang }));
    }

    await this.accountLockoutService.reset(scope, identifier);
    this.userRepo.updateLastLogin(user.id);

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
    if (accessToken) {
      await this.tokenBlacklistService.add(accessToken, this.tokenService.getAccessTtlSec());
    }
    if (refreshToken) {
      const decoded = await this.tokenService.decodeRefresh(refreshToken);
      const sub = decoded?.sub as string | undefined;
      const jti = (decoded as any)?.jti as string | undefined;
      if (sub && jti) {
        await this.tokenService.revokeRefreshJti(BigInt(sub), jti);
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
    const lang = I18nContext.current()?.lang ?? 'en';
    const decoded = await this.tokenService.decodeRefresh(refreshToken);
    if (!decoded) throw new UnauthorizedException(this.i18n.t('auth.INVALID_TOKEN', { lang }));

    const sub = decoded.sub as string | undefined;
    const jti = (decoded as any).jti as string | undefined;

    if (!sub || !jti) {
      throw new UnauthorizedException(this.i18n.t('auth.INVALID_REFRESH_TOKEN', { lang }));
    }

    const userId: PrimaryKey = BigInt(sub);
    const isActive = await this.tokenService.isRefreshActive(userId, jti);
    if (!isActive) {
      throw new UnauthorizedException(this.i18n.t('auth.REFRESH_TOKEN_REVOKED', { lang }));
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
