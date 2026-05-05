import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { parseDurationToSeconds } from '@package/common';
import { RedisService } from '@package/redis';
import { JwksService } from '../../../jwks/services/jwks.service';
import { PrimaryKey } from 'src/types';

@Injectable()
export class TokenService {
  private readonly accessExpiresIn: string;
  private readonly refreshExpiresIn: string;
  private readonly accessTtlSec: number;
  private readonly refreshTtlSec: number;

  constructor(
    private readonly jwksService: JwksService,
    config: ConfigService,
    private readonly redis: RedisService,
  ) {
    this.accessExpiresIn = config.get<string>('jwt.expiresIn') || '1h';
    this.refreshExpiresIn = config.get<string>('jwt.refreshExpiresIn') || '7d';
    this.accessTtlSec = parseDurationToSeconds(this.accessExpiresIn, 3600);
    this.refreshTtlSec = parseDurationToSeconds(this.refreshExpiresIn, 604800);
  }

  getAccessTtlSec(): number {
    return this.accessTtlSec;
  }

  getRefreshTtlSec(): number {
    return this.refreshTtlSec;
  }

  buildRefreshKey(userId: PrimaryKey, jti: string): string {
    return `auth:refresh:${userId}:${jti}`;
  }

  private userJtisKey(userId: PrimaryKey): string {
    return `auth:user:${userId}:refresh-jtis`;
  }

  async generateTokens(userId: PrimaryKey, email?: string) {
    const jti = randomUUID();

    const accessToken = await this.jwksService.signToken(
      { sub: String(userId), email },
      this.accessExpiresIn,
    );

    const refreshToken = await this.jwksService.signToken(
      { sub: String(userId), email, jti, type: 'refresh' },
      this.refreshExpiresIn,
    );

    return { accessToken, refreshToken, refreshJti: jti, accessTtlSec: this.accessTtlSec, refreshTtlSec: this.refreshTtlSec } as const;
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

  /**
   * Refresh-token storage is REQUIRED — sessions cannot be revoked without it.
   * If Redis is unavailable, fail-closed by raising so login is rejected
   * rather than silently issuing a non-revocable refresh token.
   */
  async storeRefreshJti(userId: PrimaryKey, jti: string, ttlSec: number): Promise<void> {
    if (!this.redis.isEnabled()) {
      throw new Error('Refresh-token store unavailable (Redis disabled)');
    }
    const key = this.buildRefreshKey(userId, jti);
    const setKey = this.userJtisKey(userId);
    await this.redis.multi([
      ['SET', key, '1', 'EX', ttlSec],
      ['SADD', setKey, jti],
      ['EXPIRE', setKey, ttlSec],
    ]);
  }

  async isRefreshActive(userId: PrimaryKey, jti: string): Promise<boolean> {
    if (!this.redis.isEnabled()) return false;
    return (await this.redis.get(this.buildRefreshKey(userId, jti))) !== null;
  }

  async revokeRefreshJti(userId: PrimaryKey, jti: string): Promise<void> {
    if (!this.redis.isEnabled()) return;
    await this.redis.multi([
      ['DEL', this.buildRefreshKey(userId, jti)],
      ['SREM', this.userJtisKey(userId), jti],
    ]);
  }

  /**
   * Atomically revoke every refresh JTI for a user via Lua. Falls back to a
   * pipeline if no Lua endpoint. New JTIs added concurrently are not lost
   * because the SET is renamed (snapshot) before iteration.
   */
  async revokeAllUserSessions(userId: PrimaryKey): Promise<void> {
    if (!this.redis.isEnabled()) return;
    const setKey = this.userJtisKey(userId);
    const snapshotKey = `${setKey}:revoke:${Date.now()}`;
    // Atomic rename: any concurrent SADD after this lands on a fresh key.
    try {
      await this.redis.multi([['RENAME', setKey, snapshotKey]]);
    } catch {
      // setKey didn't exist — nothing to revoke
      return;
    }
    const jtis = await this.redis.smembers(snapshotKey);
    if (jtis.length) {
      const keys = jtis.map((jti) => this.buildRefreshKey(userId, jti));
      await this.redis.deleteMany(keys);
    }
    await this.redis.del(snapshotKey);
  }
}
