import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleOauthStateService } from '../../../src/modules/auth/services/google-state.service';

describe('GoogleOauthStateService', () => {
  const mockConfig = { get: jest.fn(() => 'test-secret-32-chars-long-enough!!') } as unknown as ConfigService;
  let service: GoogleOauthStateService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new GoogleOauthStateService(mockConfig);
  });

  describe('issue', () => {
    it('should set cookie and return state in nonce.signature format', () => {
      const res = { cookie: jest.fn(), clearCookie: jest.fn() } as any;

      const state = service.issue(res, false);

      expect(state).toMatch(/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/);
      expect(res.cookie).toHaveBeenCalledTimes(1);

      const [cookieName, cookieValue, cookieOpts] = res.cookie.mock.calls[0];
      expect(cookieName).toBe('google_oauth_state');
      expect(cookieValue).toBe(state);
      expect(cookieOpts).toMatchObject({
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      });
    });

    it('should set secure cookie in production', () => {
      const res = { cookie: jest.fn(), clearCookie: jest.fn() } as any;

      service.issue(res, true);

      const cookieOpts = res.cookie.mock.calls[0][2];
      expect(cookieOpts.secure).toBe(true);
    });

    it('should set non-secure cookie in non-production', () => {
      const res = { cookie: jest.fn(), clearCookie: jest.fn() } as any;

      service.issue(res, false);

      const cookieOpts = res.cookie.mock.calls[0][2];
      expect(cookieOpts.secure).toBe(false);
    });
  });

  describe('verify', () => {
    it('should succeed when cookie matches query state and signature is valid', () => {
      const res = { cookie: jest.fn(), clearCookie: jest.fn() } as any;
      const state = service.issue(res, false);

      const req = { cookies: { google_oauth_state: state }, query: { state } } as any;

      expect(() => service.verify(req)).not.toThrow();
    });

    it('should throw when cookie is missing', () => {
      const req = { cookies: {}, query: { state: 'nonce.sig' } } as any;

      expect(() => service.verify(req)).toThrow(BadRequestException);
      expect(() => service.verify(req)).toThrow('Missing OAuth state');
    });

    it('should throw when query state is missing', () => {
      const req = { cookies: { google_oauth_state: 'nonce.sig' }, query: {} } as any;

      expect(() => service.verify(req)).toThrow(BadRequestException);
      expect(() => service.verify(req)).toThrow('Missing OAuth state');
    });

    it('should throw when cookie and query state do not match', () => {
      const res = { cookie: jest.fn(), clearCookie: jest.fn() } as any;
      const state1 = service.issue(res, false);
      const state2 = service.issue(res, false);

      const req = {
        cookies: { google_oauth_state: state1 },
        query: { state: state2 },
      } as any;

      expect(() => service.verify(req)).toThrow(BadRequestException);
      expect(() => service.verify(req)).toThrow('OAuth state mismatch');
    });

    it('should throw when signature is invalid (tampered)', () => {
      const res = { cookie: jest.fn(), clearCookie: jest.fn() } as any;
      const state = service.issue(res, false);
      const [nonce] = state.split('.');
      const tampered = `${nonce}.tampered_signature`;

      const req = {
        cookies: { google_oauth_state: tampered },
        query: { state: tampered },
      } as any;

      expect(() => service.verify(req)).toThrow(BadRequestException);
      expect(() => service.verify(req)).toThrow('OAuth state signature invalid');
    });

    it('should throw when nonce contains invalid characters', () => {
      const invalidState = 'invalid nonce with spaces.fakesig';

      const req = {
        cookies: { google_oauth_state: invalidState },
        query: { state: invalidState },
      } as any;

      expect(() => service.verify(req)).toThrow(BadRequestException);
      expect(() => service.verify(req)).toThrow('Malformed OAuth state');
    });
  });

  describe('clear', () => {
    it('should clear the cookie', () => {
      const res = { cookie: jest.fn(), clearCookie: jest.fn() } as any;

      service.clear(res);

      expect(res.clearCookie).toHaveBeenCalledWith('google_oauth_state', { path: '/' });
    });
  });
});
