import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { UserRepository } from '../repositories/user.repository';
import { AttemptLimiterService } from '../../../security/services/attempt-limiter.service';
import { AuthOtpService } from './auth-otp.service';
import { TokenService } from './token.service';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Injectable()
export class PasswordService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly otpService: AuthOtpService,
    private readonly accountLockoutService: AttemptLimiterService,
    private readonly tokenService: TokenService,
    private readonly i18n: I18nService,
    private readonly config: ConfigService,
  ) {}

  private t(key: string): string {
    const lang = I18nContext.current()?.lang ?? 'en';
    return this.i18n.t(key, { lang }) as string;
  }

  /**
   * Always returns success to prevent email enumeration. Sends OTP only if
   * the account exists and is active.
   */
  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const email = dto.email.toLowerCase();
    const user = await this.userRepo.findByEmail(email);
    if (user && user.status === 'active') {
      await this.otpService.sendForgotPasswordOtp(email);
    }
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    const email = dto.email.toLowerCase();

    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException(this.t('auth.PASSWORDS_NOT_MATCH'));
    }

    const isValid = await this.otpService.verifyAndDelete('forgot-password', email, dto.otp);
    if (!isValid) {
      throw new BadRequestException(this.t('auth.INVALID_OTP'));
    }

    const user = await this.userRepo.findByEmail(email);
    if (!user || user.status !== 'active') {
      throw new BadRequestException(this.t('auth.INVALID_OTP'));
    }

    const rounds = Number(this.config.get('BCRYPT_ROUNDS') ?? 12);
    const hashedPassword = await bcrypt.hash(dto.password, rounds);

    await this.userRepo.withTransaction(async (tx) => {
      await this.userRepo.update(user.id, { password: hashedPassword }, tx);
      await this.userRepo.enqueueOutboxEvent(
        'user.password.reset',
        {
          user_id: String(user.id),
          email: user.email,
          occurred_at: new Date().toISOString(),
        },
        tx,
      );
    });

    await this.tokenService.revokeAllUserSessions(user.id);
    await this.accountLockoutService.reset('auth:login', email);
  }
}
