import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { UserRepository } from '../repositories/user.repository';
import { AuthOtpService } from './auth-otp.service';
import { RegisterDto } from '../dto/register.dto';
import { safeUser } from '../utils/user.util';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly otpService: AuthOtpService,
    private readonly i18n: I18nService,
  ) {}

  private t(key: string): string {
    const lang = I18nContext.current()?.lang ?? 'en';
    return this.i18n.t(key, { lang }) as string;
  }

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase();

    const isOtpValid = await this.otpService.verifyAndDelete('register', email, dto.otp);
    if (!isOtpValid) {
      throw new BadRequestException(this.t('auth.INVALID_OTP'));
    }

    await this.validateUniqueness(dto);

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepo.create({
      username: dto.username ?? email,
      email,
      phone: dto.phone ?? null,
      password: hashedPassword,
      name: dto.name,
      status: 'active',
    });

    return { user: safeUser(user) };
  }

  private async validateUniqueness(dto: RegisterDto): Promise<void> {
    const email = dto.email.toLowerCase();

    if (await this.userRepo.findByEmail(email)) {
      throw new BadRequestException(this.t('auth.EMAIL_IN_USE'));
    }
    if (dto.username && await this.userRepo.findByUsername(dto.username)) {
      throw new BadRequestException(this.t('auth.USERNAME_IN_USE'));
    }
    if (dto.phone && await this.userRepo.findByPhone(dto.phone)) {
      throw new BadRequestException(this.t('auth.PHONE_IN_USE'));
    }
  }
}
