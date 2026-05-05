import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { I18nService } from 'nestjs-i18n';
import { t } from '@package/common';
import { FileLogger } from '@package/bootstrap';
import { UserRepository } from '../repositories/user.repository';
import { AttemptLimiterService } from '../../../core/security/services/attempt-limiter.service';
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
    private readonly fileLogger: FileLogger,
  ) {}

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const email = dto.email.toLowerCase();
    const log = this.fileLogger.create('auth/forgot-password', { email });

    try {
      const user = await this.userRepo.findByEmail(email);
      if (user && user.status === 'active') {
        log.addDebug('sending OTP');
        await this.otpService.sendForgotPasswordOtp(email);
      } else {
        log.addDebug('skipped', { reason: !user ? 'user_not_found' : 'user_not_active' });
      }
    } catch (err) {
      log.addException(err);
      throw err;
    } finally {
      log.save();
    }
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    const email = dto.email.toLowerCase();
    const log = this.fileLogger.create('auth/reset-password', { email });
    let result: any = null;

    try {
      if (dto.password !== dto.confirmPassword) {
        throw new BadRequestException(t(this.i18n, 'auth.PASSWORDS_NOT_MATCH'));
      }

      log.addDebug('verifying OTP');
      const isValid = await this.otpService.verifyAndDelete('forgot-password', email, dto.otp);
      if (!isValid) {
        throw new BadRequestException(t(this.i18n, 'auth.INVALID_OTP'));
      }

      log.addDebug('finding user');
      const user = await this.userRepo.findByEmail(email);
      if (!user || user.status !== 'active') {
        throw new BadRequestException(t(this.i18n, 'auth.INVALID_OTP'));
      }

      log.addDebug('hashing password');
      const rounds = Number(this.config.get('BCRYPT_ROUNDS') ?? 12);
      const hashedPassword = await bcrypt.hash(dto.password, rounds);

      log.addDebug('updating password in transaction');
      await this.userRepo.withTransaction(async (tx) => {
        await this.userRepo.update(user.id, { password: hashedPassword }, tx);
        await this.userRepo.enqueueOutboxEvent(
          'user.password.reset',
          { user_id: String(user.id), email: user.email, occurred_at: new Date().toISOString() },
          tx,
        );
      });

      log.addDebug('revoking all sessions');
      await this.tokenService.revokeAllUserSessions(user.id);
      await this.accountLockoutService.reset('auth:login', email);

      result = { userId: String(user.id), status: 'success' };
    } catch (err) {
      log.addException(err);
      throw err;
    } finally {
      log.save(result);
    }
  }
}
