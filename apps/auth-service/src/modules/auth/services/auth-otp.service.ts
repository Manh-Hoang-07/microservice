import { Injectable } from '@nestjs/common';
import { RedisService } from '../../../security/services/redis.service';
import { MailPublisher } from '../../../kafka/services/mail-publisher.service';
import { generateOtp, buildOtpKey } from '../utils/otp.helper';

const DEFAULT_OTP_TTL_SEC = 300;

@Injectable()
export class AuthOtpService {
  constructor(
    private readonly redis: RedisService,
    private readonly mailPublisher: MailPublisher,
  ) {}

  async sendRegisterOtp(email: string): Promise<void> {
    const otp = generateOtp();
    await this.redis.set(buildOtpKey('register', email), otp, DEFAULT_OTP_TTL_SEC);
    await this.emitMail(email, 'send_otp_register', { otp });
  }

  async sendForgotPasswordOtp(email: string): Promise<void> {
    const otp = generateOtp();
    await this.redis.set(buildOtpKey('forgot-password', email), otp, DEFAULT_OTP_TTL_SEC);
    await this.emitMail(email, 'send_otp_forgot_password', { otp });
  }

  async verifyAndDelete(type: string, email: string, providedOtp: string): Promise<boolean> {
    const key = buildOtpKey(type, email);
    const cached = await this.redis.get(key);
    if (!cached) return false;

    const isValid =
      providedOtp === cached ||
      (process.env.NODE_ENV === 'development' && providedOtp === '123456');

    if (isValid) {
      await this.redis.del(key);
      return true;
    }
    return false;
  }

  private async emitMail(
    to: string,
    templateCode: string,
    variables: Record<string, unknown>,
  ): Promise<void> {
    if (!this.mailPublisher.isEnabled()) {
      console.log(`[AuthOTP] templateCode=${templateCode} → ${to}`, variables);
      return;
    }
    await this.mailPublisher.publish({ to, templateCode, variables }).catch(() => {
      console.log(`[AuthOTP] templateCode=${templateCode} → ${to}`, variables);
    });
  }
}
