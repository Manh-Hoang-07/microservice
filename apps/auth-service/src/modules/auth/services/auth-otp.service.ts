import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
import { t } from '@package/common';
import { RedisService } from '@package/redis';
import { MailPublisher } from '../../../kafka/services/mail-publisher.service';
import { AttemptLimiterService } from '../../../core/security/services/attempt-limiter.service';
import { generateOtp, buildOtpKey } from '../utils/otp.helper';

@Injectable()
export class AuthOtpService {
  private readonly otpTtlSec: number;

  constructor(
    private readonly redis: RedisService,
    private readonly mailPublisher: MailPublisher,
    private readonly config: ConfigService,
    private readonly attemptLimiter: AttemptLimiterService,
    private readonly i18n: I18nService,
  ) {
    this.otpTtlSec = Number(this.config.get('OTP_TTL_SECONDS') ?? 300);
  }

  async sendRegisterOtp(email: string): Promise<void> {
    await this.sendOtp('register', email, 'send_otp_register');
  }

  async sendForgotPasswordOtp(email: string): Promise<void> {
    await this.sendOtp('forgot-password', email, 'send_otp_forgot_password');
  }

  async verifyAndDelete(type: string, email: string, providedOtp: string): Promise<boolean> {
    const scope = `otp:verify:${type}`;
    const lockout = await this.attemptLimiter.check(scope, email);
    if (lockout.isLocked) {
      throw new ForbiddenException(
        t(this.i18n,'auth.OTP_VERIFY_LOCKED', { minutes: lockout.remainingMinutes }),
      );
    }
    const key = buildOtpKey(type, email);
    const cached = await this.redis.getdel(key);
    if (!cached || !safeEqual(cached, providedOtp)) {
      // Record failed attempt (max 5 tries, then 15-min lockout)
      await this.attemptLimiter.add(scope, email, {
        maxAttempts: 5,
        lockoutSeconds: 900,
        windowSeconds: 300,
      });
      return false;
    }

    // Success — clear attempt counter
    await this.attemptLimiter.reset(scope, email);
    return true;
  }

  private async sendOtp(type: string, email: string, templateCode: string): Promise<void> {
    const otp = generateOtp();
    const key = buildOtpKey(type, email);
    try {
      // Publish first so a Kafka failure leaves no orphan OTP in Redis.
      await this.mailPublisher.publish({
        to: email,
        templateCode,
        variables: { otp },
      });
    } catch (err) {
      // Best-effort cleanup of any prior key to keep cache consistent
      await this.redis.del(key).catch(() => undefined);
      throw err;
    }
    await this.redis.set(key, otp, this.otpTtlSec);
  }
}

function safeEqual(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}
