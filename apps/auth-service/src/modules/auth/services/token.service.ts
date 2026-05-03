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
