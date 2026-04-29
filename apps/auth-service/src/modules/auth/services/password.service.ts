import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../../database/prisma.service';
import { AttemptLimiterService } from '../../../security/services/attempt-limiter.service';
import { AuthOtpService } from './auth-otp.service';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Injectable()
export class PasswordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly otpService: AuthOtpService,
    private readonly accountLockoutService: AttemptLimiterService,
  ) {}

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const email = dto.email.toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('Email does not exist in the system.');
    }
    await this.otpService.sendForgotPasswordOtp(email);
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    const email = dto.email.toLowerCase();

    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match.');
    }

    const isValid = await this.otpService.verifyAndDelete('forgot-password', email, dto.otp);
    if (!isValid) {
      throw new BadRequestException('Invalid or expired OTP code.');
    }

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User does not exist.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    await this.prisma.user.update({ where: { id: user.id }, data: { password: hashedPassword } });

    await this.accountLockoutService.reset('auth:login', email);
  }
}
