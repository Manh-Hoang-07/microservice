import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { RedisService } from '../../../security/services/redis.service';
import { generateOtp, buildOtpKey } from '../utils/otp.helper';

const DEFAULT_OTP_TTL_SEC = 300; // 5 minutes

@Injectable()
export class AuthOtpService {
  private transporter: nodemailer.Transporter | null = null;

  constructor(
    private readonly redis: RedisService,
    private readonly configService: ConfigService,
  ) {
    const host = this.configService.get<string>('mail.host');
    const port = this.configService.get<number>('mail.port') || 587;
    const user = this.configService.get<string>('mail.user');
    const pass = this.configService.get<string>('mail.pass');

    if (host && user) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        auth: { user, pass },
      });
    }
  }

  async sendRegisterOtp(email: string): Promise<void> {
    const otp = generateOtp();
    const key = buildOtpKey('register', email);
    await this.redis.set(key, otp, DEFAULT_OTP_TTL_SEC);
    await this.sendOtpEmail(email, otp, 'Registration OTP');
  }

  async sendForgotPasswordOtp(email: string): Promise<void> {
    const otp = generateOtp();
    const key = buildOtpKey('forgot-password', email);
    await this.redis.set(key, otp, DEFAULT_OTP_TTL_SEC);
    await this.sendOtpEmail(email, otp, 'Password Reset OTP');
  }

  async verifyAndDelete(type: string, email: string, providedOtp: string): Promise<boolean> {
    const key = buildOtpKey(type, email);
    const cached = await this.redis.get(key);
    if (!cached) return false;

    const nodeEnv = this.configService.get<string>('NODE_ENV');
    const isValid =
      providedOtp === cached ||
      (nodeEnv === 'development' && providedOtp === '123456');

    if (isValid) {
      await this.redis.del(key);
      return true;
    }
    return false;
  }

  private async sendOtpEmail(to: string, otp: string, subject: string): Promise<void> {
    if (!this.transporter) {
      // Dev mode: log OTP
      console.log(`[AuthOTP] ${subject} to ${to}: ${otp}`);
      return;
    }
    const from = this.configService.get<string>('mail.from') || 'noreply@comic-platform.com';
    await this.transporter.sendMail({
      from,
      to,
      subject,
      text: `Your OTP code is: ${otp}. It expires in 5 minutes.`,
      html: `<p>Your OTP code is: <strong>${otp}</strong></p><p>It expires in 5 minutes.</p>`,
    });
  }
}
