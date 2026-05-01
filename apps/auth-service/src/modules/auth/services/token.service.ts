import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { parseDurationToSeconds } from '@package/common';
import { RedisService } from '@package/redis';
import { JwksService } from '../../../jwks/services/jwks.service';
import { PrimaryKey } from 'src/types';

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

  private userJtisKey(userId: PrimaryKey): string {
    return `auth:user:${userId}:refresh-jtis`;
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

  async storeRefreshJti(userId: PrimaryKey, jti: string, ttlSec: number): Promise<void> {
    if (!this.redis.isEnabled()) return;
    await this.redis.set(this.buildRefreshKey(userId, jti), '1', ttlSec);
    await this.redis.sadd(this.userJtisKey(userId), jti);
    await this.redis.expire(this.userJtisKey(userId), ttlSec);
  }

  async isRefreshActive(userId: PrimaryKey, jti: string): Promise<boolean> {
    if (!this.redis.isEnabled()) return false;
    return (await this.redis.get(this.buildRefreshKey(userId, jti))) !== null;
  }

  async revokeRefreshJti(userId: PrimaryKey, jti: string): Promise<void> {
    if (!this.redis.isEnabled()) return;
    await this.redis.del(this.buildRefreshKey(userId, jti));
  }

  async revokeAllUserSessions(userId: PrimaryKey): Promise<void> {
    if (!this.redis.isEnabled()) return;
    const setKey = this.userJtisKey(userId);
    const jtis = await this.redis.smembers(setKey);
    for (const jti of jtis) {
      await this.redis.del(this.buildRefreshKey(userId, jti));
    }
    await this.redis.del(setKey);
  }
}
