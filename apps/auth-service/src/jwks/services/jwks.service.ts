import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jose from 'jose';

@Injectable()
export class JwksService implements OnModuleInit {
  private privateKey: CryptoKey | null = null;
  private publicKey: CryptoKey | null = null;
  private kid = 'auth-key-1';

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    const privatePem = this.config.get<string>('jwt.privateKeyPem');
    const publicPem = this.config.get<string>('jwt.publicKeyPem');

    if (privatePem && publicPem) {
      this.privateKey = await jose.importPKCS8(privatePem, 'RS256');
      this.publicKey = await jose.importSPKI(publicPem, 'RS256');
    } else {
      const { privateKey, publicKey } = await jose.generateKeyPair('RS256');
      this.privateKey = privateKey;
      this.publicKey = publicKey;
    }
  }

  hasKeys(): boolean {
    return this.publicKey !== null;
  }

  getPrivateKey(): CryptoKey {
    return this.privateKey!;
  }

  async getPublicKey(): Promise<CryptoKey> {
    return this.publicKey!;
  }

  async getJwkSet(): Promise<{ keys: jose.JWK[] }> {
    const jwk = await jose.exportJWK(this.publicKey!);
    return { keys: [{ ...jwk, kid: this.kid, use: 'sig', alg: 'RS256' }] };
  }

  async signToken(payload: jose.JWTPayload, expiresIn: string): Promise<string> {
    return new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'RS256', kid: this.kid })
      .setIssuedAt()
      .setIssuer(this.config.get<string>('jwt.issuer')!)
      .setAudience(this.config.get<string>('jwt.audience')!)
      .setExpirationTime(expiresIn)
      .sign(this.privateKey!);
  }

  async verifyToken(token: string): Promise<jose.JWTPayload> {
    const { payload } = await jose.jwtVerify(token, this.publicKey!, {
      issuer: this.config.get<string>('jwt.issuer'),
      audience: this.config.get<string>('jwt.audience'),
    });
    return payload;
  }
}
