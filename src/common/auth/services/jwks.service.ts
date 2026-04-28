import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jose from 'jose';

@Injectable()
export class JwksService implements OnModuleInit {
  private readonly logger = new Logger(JwksService.name);
  private jwks: jose.JWTVerifyGetKey | null = null;
  private lastFetch = 0;
  private readonly TTL_MS = 24 * 60 * 60 * 1000; // 24h

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    const url = this.config.get<string>('AUTH_JWKS_URL');
    if (!url) return;
    await this.refresh(url).catch((err) =>
      this.logger.warn(`JWKS initial fetch failed: ${err.message}`),
    );
  }

  async verify(token: string): Promise<jose.JWTPayload> {
    const url = this.config.get<string>('AUTH_JWKS_URL');
    if (!url) throw new Error('AUTH_JWKS_URL not configured');
    if (!this.jwks || Date.now() - this.lastFetch > this.TTL_MS) {
      await this.refresh(url);
    }
    if (!this.jwks) throw new Error('JWKS not available');
    const { payload } = await jose.jwtVerify(token, this.jwks);
    return payload;
  }

  async refresh(url?: string): Promise<void> {
    const jwksUrl = url ?? this.config.get<string>('AUTH_JWKS_URL');
    if (!jwksUrl) return;
    this.jwks = jose.createRemoteJWKSet(new URL(jwksUrl));
    this.lastFetch = Date.now();
    this.logger.log(`JWKS key set initialized from ${jwksUrl}`);
  }
}
