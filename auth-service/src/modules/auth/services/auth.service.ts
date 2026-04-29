import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { SendOtpDto } from '../dto/send-otp.dto';
import { RegistrationService } from './registration.service';
import { PasswordService } from './password.service';
import { AuthOtpService } from './auth-otp.service';
import { SocialAuthService } from './social-auth.service';
import { LoginService } from './login.service';
import { safeUser } from '../utils/user.util';

type PrimaryKey = string | number | bigint;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly loginService: LoginService,
    private readonly registrationService: RegistrationService,
    private readonly passwordService: PasswordService,
    private readonly otpService: AuthOtpService,
    private readonly socialAuthService: SocialAuthService,
  ) {}

  async login(dto: LoginDto) {
    return this.loginService.login(dto);
  }

  async logout(userId: PrimaryKey | null, token?: string) {
    return this.loginService.logout(userId, token);
  }

  async refreshTokenByValue(refreshToken: string) {
    return this.loginService.refreshTokenByValue(refreshToken);
  }

  async me(userId: PrimaryKey) {
    const user = await this.prisma.user.findUnique({
      where: { id: BigInt(String(userId)) },
      include: { profile: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return safeUser(user);
  }

  async register(dto: RegisterDto) {
    return this.registrationService.register(dto);
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    return this.passwordService.forgotPassword(dto);
  }

  async resetPassword(dto: ResetPasswordDto) {
    return this.passwordService.resetPassword(dto);
  }

  async sendOtpForRegister(dto: SendOtpDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (existing) throw new BadRequestException('Email is already in use.');
    await this.otpService.sendRegisterOtp(dto.email);
    return { message: 'OTP has been sent to your email.' };
  }

  async sendOtpForForgotPassword(dto: SendOtpDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (!existing) throw new NotFoundException('Email does not exist in the system.');
    await this.otpService.sendForgotPasswordOtp(dto.email);
    return { message: 'OTP has been sent to your email.' };
  }

  async handleGoogleAuth(profile: any) {
    return this.socialAuthService.handleGoogleAuth(profile);
  }
}
