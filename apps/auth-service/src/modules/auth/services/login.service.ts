import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { RedisService } from '../../../security/services/redis.service';
import { TokenBlacklistService } from '../../../security/services/token-blacklist.service';
import { AttemptLimiterService } from '../../../security/services/attempt-limiter.service';
import { TokenService, PrimaryKey } from './token.service';
import { LoginDto } from '../dto/login.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class LoginService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly redis: RedisService,
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

    const userPk = user.id as unknown as PrimaryKey;
    const { accessToken, refreshToken, refreshJti, accessTtlSec } =
      await this.tokenService.generateTokens(userPk, user.email!);

    await this.redis
      .set(
        `auth:refresh:${userPk}:${refreshJti}`,
        '1',
        this.tokenService.getRefreshTtlSec(),
      )
      .catch(() => undefined);

    return { token: accessToken, refreshToken, expiresIn: accessTtlSec };
  }

  async logout(_userId: PrimaryKey | null, token?: string) {
    if (token) {
      const ttlSeconds = this.tokenService.getAccessTtlSec();
      await this.tokenBlacklistService.add(token, ttlSeconds);
    }
    return null;
  }

  async refreshTokenByValue(refreshToken: string) {
    const lang = I18nContext.current()?.lang ?? 'en';
    const decoded = await this.tokenService.decodeRefresh(refreshToken);
    if (!decoded) throw new UnauthorizedException(this.i18n.t('auth.INVALID_TOKEN', { lang }));

    const userId = decoded.sub as PrimaryKey;
    const jti = (decoded as any).jti as string | undefined;

    if (!userId || !jti) {
      throw new UnauthorizedException(this.i18n.t('auth.INVALID_REFRESH_TOKEN', { lang }));
    }

    const refreshKey = `auth:refresh:${userId}:${jti}`;
    const isActive = await this.redis.get(refreshKey);
    if (!isActive) throw new UnauthorizedException(this.i18n.t('auth.REFRESH_TOKEN_REVOKED', { lang }));

    await this.redis.del(refreshKey);

    const tokens = await this.tokenService.issueAndStoreNewTokens(
      userId,
      (decoded as any).email,
    );

    return {
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.accessTtlSec,
    };
  }
}
