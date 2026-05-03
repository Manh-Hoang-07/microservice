import * as jose from 'jose';
import { JwksService } from '../../../src/jwks/services/jwks.service';

/**
 * Generates a fresh PEM key pair for each test that exercises real signing.
 * Avoids the `jose.generateKeyPair()` dev-only fallback in JwksService and
 * pins us to the real PKCS8/SPKI loading paths the production env uses.
 */
async function genPemPair(): Promise<{ priv: string; pub: string }> {
  const { privateKey, publicKey } = await jose.generateKeyPair('RS256', { extractable: true });
  const priv = await jose.exportPKCS8(privateKey);
  const pub = await jose.exportSPKI(publicKey);
  return { priv, pub };
}

function makeConfig(values: Record<string, string | undefined>) {
  return { get: jest.fn((k: string) => values[k]) } as any;
}

const ENV_BACKUP = { ...process.env };
beforeEach(() => {
  process.env = { ...ENV_BACKUP };
  // Default to dev so init() doesn't refuse to boot when tests don't supply keys.
  process.env.NODE_ENV = 'test';
});
afterAll(() => { process.env = ENV_BACKUP; });

describe('JwksService', () => {
  describe('signing + verifying', () => {
    it('signs with the current key and verifies it', async () => {
      const { priv, pub } = await genPemPair();
      const svc = new JwksService(makeConfig({
        'jwt.privateKeyPem': priv,
        'jwt.publicKeyPem': pub,
        'jwt.issuer': 'auth-service',
        'jwt.audience': 'comic-platform',
        'app.nodeEnv': 'test',
      }));

      await svc.onModuleInit();
      const token = await svc.signToken({ sub: 'user-1' }, '1h');

      const payload = await svc.verifyToken(token);
      expect(payload.sub).toBe('user-1');
      expect(payload.iss).toBe('auth-service');
      expect(payload.aud).toBe('comic-platform');
    });

    it('emits the kid as a SHA-256 thumbprint of the public JWK', async () => {
      const { priv, pub } = await genPemPair();
      const svc = new JwksService(makeConfig({
        'jwt.privateKeyPem': priv,
        'jwt.publicKeyPem': pub,
        'jwt.issuer': 'i',
        'jwt.audience': 'a',
      }));
      await svc.onModuleInit();

      const token = await svc.signToken({ sub: 'u' }, '1h');
      const header = JSON.parse(Buffer.from(token.split('.')[0], 'base64url').toString());

      const expectedKid = await jose.calculateJwkThumbprint(
        await jose.exportJWK(await jose.importSPKI(pub, 'RS256')),
      );
      expect(header.kid).toBe(expectedKid);
      expect(header.alg).toBe('RS256');
    });
  });

  describe('JWKS endpoint', () => {
    it('exposes the current public key by kid', async () => {
      const { priv, pub } = await genPemPair();
      const svc = new JwksService(makeConfig({
        'jwt.privateKeyPem': priv,
        'jwt.publicKeyPem': pub,
        'jwt.issuer': 'i', 'jwt.audience': 'a',
      }));
      await svc.onModuleInit();

      const set = await svc.getJwkSet();
      expect(set.keys).toHaveLength(1);
      expect(set.keys[0]).toMatchObject({ use: 'sig', alg: 'RS256' });
      expect(set.keys[0].kid).toBeDefined();
    });

    it('exposes both current AND previous keys during a rotation window', async () => {
      const current = await genPemPair();
      const previous = await genPemPair();
      process.env.JWT_PRIVATE_KEY_PEM_PREVIOUS = previous.priv;
      process.env.JWT_PUBLIC_KEY_PEM_PREVIOUS = previous.pub;

      const svc = new JwksService(makeConfig({
        'jwt.privateKeyPem': current.priv,
        'jwt.publicKeyPem': current.pub,
        'jwt.issuer': 'i', 'jwt.audience': 'a',
      }));
      await svc.onModuleInit();

      const set = await svc.getJwkSet();
      expect(set.keys).toHaveLength(2);
      const kids = set.keys.map((k) => k.kid);
      expect(new Set(kids).size).toBe(2); // distinct
    });
  });

  describe('rotation: verifying a token signed with the OLD key', () => {
    it('verifies tokens signed by the previous key as long as it is configured', async () => {
      // 1. Issue a token with the OLD key alone
      const old = await genPemPair();
      const oldOnly = new JwksService(makeConfig({
        'jwt.privateKeyPem': old.priv,
        'jwt.publicKeyPem': old.pub,
        'jwt.issuer': 'i', 'jwt.audience': 'a',
      }));
      await oldOnly.onModuleInit();
      const token = await oldOnly.signToken({ sub: 'legacy-user' }, '1h');

      // 2. Rotate: install a new key as CURRENT, keep OLD as PREVIOUS
      const fresh = await genPemPair();
      process.env.JWT_PRIVATE_KEY_PEM_PREVIOUS = old.priv;
      process.env.JWT_PUBLIC_KEY_PEM_PREVIOUS = old.pub;
      const rotated = new JwksService(makeConfig({
        'jwt.privateKeyPem': fresh.priv,
        'jwt.publicKeyPem': fresh.pub,
        'jwt.issuer': 'i', 'jwt.audience': 'a',
      }));
      await rotated.onModuleInit();

      // 3. The OLD token must still verify after rotation
      const payload = await rotated.verifyToken(token);
      expect(payload.sub).toBe('legacy-user');
    });

    it('rejects tokens signed by an UNKNOWN key (after PREVIOUS is dropped)', async () => {
      const fresh = await genPemPair();
      const stranger = await genPemPair();

      // Token signed by stranger
      const strangerSvc = new JwksService(makeConfig({
        'jwt.privateKeyPem': stranger.priv,
        'jwt.publicKeyPem': stranger.pub,
        'jwt.issuer': 'i', 'jwt.audience': 'a',
      }));
      await strangerSvc.onModuleInit();
      const tokenFromStranger = await strangerSvc.signToken({ sub: 'mallory' }, '1h');

      // Auth-service running with a totally different key, no PREVIOUS configured
      const realSvc = new JwksService(makeConfig({
        'jwt.privateKeyPem': fresh.priv,
        'jwt.publicKeyPem': fresh.pub,
        'jwt.issuer': 'i', 'jwt.audience': 'a',
      }));
      await realSvc.onModuleInit();

      await expect(realSvc.verifyToken(tokenFromStranger)).rejects.toThrow();
    });
  });

  describe('production guardrails', () => {
    it('refuses to boot in production without JWT key envs', async () => {
      const svc = new JwksService(makeConfig({
        'jwt.privateKeyPem': undefined,
        'jwt.publicKeyPem': undefined,
        'app.nodeEnv': 'production',
      }));

      await expect(svc.onModuleInit()).rejects.toThrow(/production/i);
    });

    it('throws if PREVIOUS keys are malformed', async () => {
      const { priv, pub } = await genPemPair();
      process.env.JWT_PRIVATE_KEY_PEM_PREVIOUS = '-----BEGIN MUMBO-----\nnotapem\n-----END MUMBO-----';
      process.env.JWT_PUBLIC_KEY_PEM_PREVIOUS = pub;

      const svc = new JwksService(makeConfig({
        'jwt.privateKeyPem': priv,
        'jwt.publicKeyPem': pub,
      }));

      await expect(svc.onModuleInit()).rejects.toThrow(/PREVIOUS/);
    });
  });
});
