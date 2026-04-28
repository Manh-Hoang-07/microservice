import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jose from 'jose';

@Injectable()
export class JwksService implements OnModuleInit {
  private readonly logger = new Logger(JwksService.name);
  private privateKey: jose.KeyLike | null = null;
  private publicKey: jose.KeyLike | null = null;
  private kid = 'auth-key-1';

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    const privatePem = this.config.get<string>('jwt.privateKeyPem');
    const publicPem = this.config.get<string>('jwt.publicKeyPem');

    if (privatePem && publicPem) {
      this.privateKey = await jose.importPKCS8(privatePem, 'RS256');
      this.publicKey = await jose.importSPKI(publicPem, 'RS256');
      this.logger.log('Loaded RSA keys from environment');
    } else {
      const { privateKey, publicKey } = await jose.generateKeyPair('RS256');
      this.privateKey = privateKey;
      this.publicKey = publicKey;
      this.logger.warn(
        'Generated ephemeral RSA key pair (dev only — tokens invalid after restart)',
      );
    }
  }

  hasKeys(): boolean {
    return this.publicKey !== null;
  }

  getPrivateKey(): jose.KeyLike {
    return this.privateKey!;
  }

  async getPublicKey(): Promise<jose.KeyLike> {
    return this.publicKey!;
  }

  async getJwkSet(): Promise<{ keys: jose.JWK[] }> {
    const jwk = await jose.exportJWK(this.publicKey!);
    return { keys: [{ ...jwk, kid: this.kid, use: 'sig', alg: 'RS256' }] };
  }

  async signToken(payload: jose.JWTPayload, expiresIn: string): Promise<string> {
    const issuer = this.config.get<string>('jwt.issuer') || 'auth-service';
    const audience = this.config.get<string>('jwt.audience') || 'comic-platform';
    return new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'RS256', kid: this.kid })
      .setIssuedAt()
      .setIssuer(issuer)
      .setAudience(audience)
      .setExpirationTime(expiresIn)
      .sign(this.privateKey!);
  }

  async verifyToken(token: string): Promise<jose.JWTPayload> {
    const { payload } = await jose.jwtVerify(token, this.publicKey!, {
      issuer: this.config.get<string>('jwt.issuer') || 'auth-service',
      audience: this.config.get<string>('jwt.audience') || 'comic-platform',
    });
    return payload;
  }
}
