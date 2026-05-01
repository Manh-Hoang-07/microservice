import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@package/redis';
import { MailPublisher } from '../../../kafka/services/mail-publisher.service';
import { generateOtp, buildOtpKey } from '../utils/otp.helper';

@Injectable()
export class AuthOtpService {
  private readonly otpTtlSec: number;

  constructor(
    private readonly redis: RedisService,
    private readonly mailPublisher: MailPublisher,
    private readonly config: ConfigService,
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
    const key = buildOtpKey(type, email);
    const cached = await this.redis.get(key);
    if (!cached || cached !== providedOtp) return false;
    await this.redis.del(key);
    return true;
  }

  private async sendOtp(type: string, email: string, templateCode: string): Promise<void> {
    const otp = generateOtp();
    await this.redis.set(buildOtpKey(type, email), otp, this.otpTtlSec);
    await this.mailPublisher.publish({
      to: email,
      templateCode,
      variables: { otp },
    });
  }
}
