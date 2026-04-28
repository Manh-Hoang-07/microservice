import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../../database/prisma.service';
import { RedisService } from '../../../security/redis.service';
import { TokenBlacklistService } from '../../../security/token-blacklist.service';
import { AttemptLimiterService } from '../../../security/attempt-limiter.service';
import { TokenService, PrimaryKey } from './token.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly tokenBlacklistService: TokenBlacklistService,
    private readonly tokenService: TokenService,
    private readonly accountLockoutService: AttemptLimiterService,
  ) {}

  async login(dto: LoginDto) {
    const identifier = dto.email.toLowerCase();
    const scope = 'auth:login';

    // 1. Check Lockout
    const lockout = await this.accountLockoutService.check(scope, identifier);
    if (lockout.isLocked) {
      throw new ForbiddenException(
        `Account temporarily locked due to too many failed attempts. Try again in ${lockout.remainingMinutes} minutes.`,
      );
    }

    // 2. Validate Credentials
    const user = await this.prisma.user.findUnique({
      where: { email: identifier },
      select: { id: true, email: true, status: true, password: true },
    });

    if (!user || !user.password) {
      await this.accountLockoutService.add(scope, identifier);
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      await this.accountLockoutService.add(scope, identifier);
      throw new UnauthorizedException('Invalid email or password.');
    }

    // 3. Check Account Status
    if (user.status !== 'active') {
      throw new ForbiddenException('Account is locked or inactive.');
    }

    // 4. Success Tasks
    await this.accountLockoutService.reset(scope, identifier);
    this.prisma.user
      .update({ where: { id: user.id }, data: { last_login_at: new Date() } })
      .catch(() => undefined);

    // 5. Issue Tokens
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
    const decoded = await this.tokenService.decodeRefresh(refreshToken);
    if (!decoded) throw new UnauthorizedException('Invalid or expired token');

    const userId = decoded.sub as PrimaryKey;
    const jti = (decoded as any).jti as string | undefined;

    if (!userId || !jti) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const refreshKey = `auth:refresh:${userId}:${jti}`;
    const isActive = await this.redis.get(refreshKey);
    if (!isActive) throw new UnauthorizedException('Refresh token revoked or expired');

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
