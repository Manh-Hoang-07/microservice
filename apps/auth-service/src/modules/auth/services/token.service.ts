import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { RedisService } from '../../../security/redis.service';
import { JwksService } from '../../../jwks/jwks.service';

export type PrimaryKey = string | number | bigint;

@Injectable()
export class TokenService {
  private readonly DEFAULT_AT_TTL = 3600; // 1h
  private readonly DEFAULT_RT_TTL = 604800; // 7d

  constructor(
    private readonly jwksService: JwksService,
    private readonly config: ConfigService,
    private readonly redis: RedisService,
  ) {}

  private parseDurationToSeconds(input: string | undefined | null, fallback: number): number {
    if (!input) return fallback;
    const match = /^(\d+)([smhd])?$/.exec(input.trim());
    if (!match) return fallback;
    const val = parseInt(match[1], 10);
    const unit = match[2] || 's';
    switch (unit) {
      case 's': return val;
      case 'm': return val * 60;
      case 'h': return val * 3600;
      case 'd': return val * 86400;
      default: return fallback;
    }
  }

  getAccessTtlSec(): number {
    const exp = this.config.get<string>('jwt.expiresIn');
    return this.parseDurationToSeconds(exp, this.DEFAULT_AT_TTL);
  }

  getRefreshTtlSec(): number {
    const exp = this.config.get<string>('jwt.refreshExpiresIn');
    return this.parseDurationToSeconds(exp, this.DEFAULT_RT_TTL);
  }

  buildRefreshKey(userId: PrimaryKey, jti: string): string {
    return `auth:refresh:${userId}:${jti}`;
  }

  async generateTokens(userId: PrimaryKey, email?: string) {
    const jti = randomUUID();
    const accessTtlSec = this.getAccessTtlSec();
    const refreshTtlSec = this.getRefreshTtlSec();

    const expiresIn = this.config.get<string>('jwt.expiresIn') || '1h';
    const refreshExpiresIn = this.config.get<string>('jwt.refreshExpiresIn') || '7d';

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
