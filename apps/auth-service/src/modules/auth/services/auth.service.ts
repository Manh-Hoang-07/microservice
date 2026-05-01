import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
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
import { UserRepository } from '../repositories/user.repository';
import { PrimaryKey } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly loginService: LoginService,
    private readonly registrationService: RegistrationService,
    private readonly passwordService: PasswordService,
    private readonly otpService: AuthOtpService,
    private readonly socialAuthService: SocialAuthService,
    private readonly i18n: I18nService,
  ) {}

  private t(key: string): string {
    const lang = I18nContext.current()?.lang ?? 'en';
    return this.i18n.t(key, { lang }) as string;
  }

  async login(dto: LoginDto) {
    return this.loginService.login(dto);
  }

  async logout(accessToken?: string, refreshToken?: string) {
    return this.loginService.logout(accessToken, refreshToken);
  }

  async logoutAll(userId: PrimaryKey, accessToken?: string) {
    return this.loginService.logoutAll(userId, accessToken);
  }

  async refreshTokenByValue(refreshToken: string) {
    return this.loginService.refreshTokenByValue(refreshToken);
  }

  async me(userId: PrimaryKey) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new NotFoundException(this.t('auth.USER_NOT_FOUND'));
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
    const existing = await this.userRepo.findByEmail(dto.email.toLowerCase());
    if (existing) throw new BadRequestException(this.t('auth.EMAIL_IN_USE'));
    await this.otpService.sendRegisterOtp(dto.email);
    return { message: this.t('auth.OTP_SENT') };
  }

  async sendOtpForForgotPassword(dto: SendOtpDto) {
    const existing = await this.userRepo.findByEmail(dto.email.toLowerCase());
    if (existing) {
      await this.otpService.sendForgotPasswordOtp(dto.email);
    }
    return { message: this.t('auth.OTP_SENT') };
  }

  async handleGoogleAuth(profile: any) {
    return this.socialAuthService.handleGoogleAuth(profile);
  }
}
