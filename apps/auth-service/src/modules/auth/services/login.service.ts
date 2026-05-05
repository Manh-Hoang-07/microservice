import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { I18nService } from 'nestjs-i18n';
import { t } from '@package/common';
import { FileLogger } from '@package/bootstrap';
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
    private readonly fileLogger: FileLogger,
  ) {}

  async login(dto: LoginDto) {
    const identifier = dto.email.toLowerCase();
    const scope = 'auth:login';
    const log = this.fileLogger.create('auth/login', { email: identifier });

    log.addDebug('checking lockout');
    const lockout = await this.accountLockoutService.check(scope, identifier);
    if (lockout.isLocked) {
      log.addException(new Error('account_locked'));
      log.save();
      throw new ForbiddenException(
        t(this.i18n, 'auth.ACCOUNT_TEMPORARILY_LOCKED', { minutes: lockout.remainingMinutes }),
      );
    }

    log.addDebug('finding user');
    const user = await this.userRepo.findByEmailSelect(identifier);

    if (!user || !user.password) {
      await this.accountLockoutService.add(scope, identifier);
      log.addException(new Error('invalid_credentials'));
      log.save();
      throw new UnauthorizedException(t(this.i18n, 'auth.INVALID_CREDENTIALS'));
    }

    log.addDebug('verifying password');
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      await this.accountLockoutService.add(scope, identifier);
      log.addException(new Error('wrong_password'));
      log.save();
      throw new UnauthorizedException(t(this.i18n, 'auth.INVALID_CREDENTIALS'));
    }

    if (user.status !== 'active') {
      log.addException(new Error('account_not_active'));
      log.save();
      throw new ForbiddenException(t(this.i18n, 'auth.ACCOUNT_LOCKED'));
    }

    log.addDebug('generating tokens');
    await this.accountLockoutService.reset(scope, identifier);
    await this.userRepo.updateLastLogin(user.id);

    const userPk: PrimaryKey = user.id;
    const tokens = await this.tokenService.generateTokens(userPk, user.email!);
    await this.tokenService.storeRefreshJti(userPk, tokens.refreshJti, tokens.refreshTtlSec);

    log.save({ userId: String(user.id) });
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
    if (!decoded) throw new UnauthorizedException(t(this.i18n, 'auth.INVALID_TOKEN'));

    const sub = decoded.sub as string | undefined;
    const jti = (decoded as any).jti as string | undefined;

    if (!sub || !jti) {
      throw new UnauthorizedException(t(this.i18n, 'auth.INVALID_REFRESH_TOKEN'));
    }

    const userId: PrimaryKey = toPrimaryKey(sub);
    const log = this.fileLogger.create('auth/refresh-token', { userId: sub, jti });

    log.addDebug('checking JTI active');
    const isActive = await this.tokenService.isRefreshActive(userId, jti);
    if (!isActive) {
      log.addDebug('reuse detected — revoking all sessions');
      await this.tokenService.revokeAllUserSessions(userId);
      log.addException(new Error('refresh_token_reuse'));
      log.save();
      throw new UnauthorizedException(t(this.i18n, 'auth.REFRESH_TOKEN_REUSE_DETECTED'));
    }

    log.addDebug('revoking old JTI');
    await this.tokenService.revokeRefreshJti(userId, jti);

    log.addDebug('generating new tokens');
    const tokens = await this.tokenService.generateTokens(
      userId,
      (decoded as any).email,
    );
    await this.tokenService.storeRefreshJti(userId, tokens.refreshJti, tokens.refreshTtlSec);

    log.save({ userId: sub });
    return {
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.accessTtlSec,
    };
  }
}
