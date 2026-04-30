import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { UserRepository } from '../repositories/user.repository';
import { AttemptLimiterService } from '../../../security/services/attempt-limiter.service';
import { AuthOtpService } from './auth-otp.service';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Injectable()
export class PasswordService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly otpService: AuthOtpService,
    private readonly accountLockoutService: AttemptLimiterService,
    private readonly i18n: I18nService,
  ) {}

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const lang = I18nContext.current()?.lang ?? 'en';
    const email = dto.email.toLowerCase();
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new NotFoundException(this.i18n.t('auth.EMAIL_NOT_FOUND', { lang }));
    }
    await this.otpService.sendForgotPasswordOtp(email);
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    const lang = I18nContext.current()?.lang ?? 'en';
    const email = dto.email.toLowerCase();

    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException(this.i18n.t('auth.PASSWORDS_NOT_MATCH', { lang }));
    }

    const isValid = await this.otpService.verifyAndDelete('forgot-password', email, dto.otp);
    if (!isValid) {
      throw new BadRequestException(this.i18n.t('auth.INVALID_OTP', { lang }));
    }

    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new NotFoundException(this.i18n.t('auth.USER_DOES_NOT_EXIST', { lang }));
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    await this.userRepo.update(user.id, { password: hashedPassword });

    await this.accountLockoutService.reset('auth:login', email);
  }
}
