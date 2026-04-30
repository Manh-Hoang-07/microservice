import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { parseDurationToSeconds } from '@package/common';
import { RedisService } from '../../../security/services/redis.service';
import { JwksService } from '../../../jwks/services/jwks.service';

export type PrimaryKey = string | number | bigint;

@Injectable()
export class TokenService {
  private readonly DEFAULT_AT_TTL = 3600;
  private readonly DEFAULT_RT_TTL = 604800;

  constructor(
    private readonly jwksService: JwksService,
    private readonly config: ConfigService,
    private readonly redis: RedisService,
  ) {}

  getAccessTtlSec(): number {
    return parseDurationToSeconds(this.config.get<string>('jwt.expiresIn'), this.DEFAULT_AT_TTL);
  }

  getRefreshTtlSec(): number {
    return parseDurationToSeconds(this.config.get<string>('jwt.refreshExpiresIn'), this.DEFAULT_RT_TTL);
  }

  buildRefreshKey(userId: PrimaryKey, jti: string): string {
    return `auth:refresh:${userId}:${jti}`;
  }

  async generateTokens(userId: PrimaryKey, email?: string) {
    const jti = randomUUID();
    const accessTtlSec = this.getAccessTtlSec();
    const refreshTtlSec = this.getRefreshTtlSec();

    const expiresIn = this.config.get<string>('jwt.expiresIn')!;
    const refreshExpiresIn = this.config.get<string>('jwt.refreshExpiresIn')!;

    const accessToken = await this.jwksService.signToken(
      { sub: String(userId), email },
      expiresIn,
    );

    const refreshToken = await this.jwksService.signToken(
      { sub: String(userId), email, jti, type: 'refresh' },
      refreshExpiresIn,
    );

    return { accessToken, refreshToken, refreshJti: jti, accessTtlSec, refreshTtlSec } as const;
  }

  async verifyAccessToken(token: string) {
    return this.jwksService.verifyToken(token);
  }

  async verifyRefreshToken(token: string) {
    const payload = await this.jwksService.verifyToken(token);
    if ((payload as any).type !== 'refresh') {
      throw new Error('Not a refresh token');
    }
    return payload;
  }

  async decodeRefresh(token: string) {
    try {
      return await this.verifyRefreshToken(token);
    } catch {
      return null;
    }
  }

  async issueAndStoreNewTokens(userId: PrimaryKey, email?: string) {
    const { accessToken, refreshToken, refreshJti, accessTtlSec } =
      await this.generateTokens(userId, email);
    try {
      if (this.redis && this.redis.isEnabled()) {
        const key = this.buildRefreshKey(userId, refreshJti);
        await this.redis.set(key, '1', this.getRefreshTtlSec());
      }
    } catch {
      // intentionally empty
    }
    return { accessToken, refreshToken, accessTtlSec } as const;
  }
}
