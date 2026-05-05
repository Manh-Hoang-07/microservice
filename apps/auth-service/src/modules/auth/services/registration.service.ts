import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { I18nService } from 'nestjs-i18n';
import { t } from '@package/common';
import { Prisma } from 'src/generated/prisma';
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
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase();
    const username = dto.username ?? email;

    // Validate uniqueness BEFORE consuming the OTP so a failed registration
    // doesn't burn the user's valid code.
    await this.validateUniqueness(email, dto.username, dto.phone);

    const isOtpValid = await this.otpService.verifyAndDelete('register', email, dto.otp);
    if (!isOtpValid) {
      throw new BadRequestException(t(this.i18n,'auth.INVALID_OTP'));
    }

    const rounds = Number(this.config.get('BCRYPT_ROUNDS') ?? 12);
    const hashedPassword = await bcrypt.hash(dto.password, rounds);

    try {
      const user = await this.userRepo.withTransaction(async (tx) => {
        const created = await this.userRepo.create(
          {
            username,
            email,
            phone: dto.phone ?? null,
            password: hashedPassword,
            name: dto.name,
            status: 'active',
            email_verified_at: new Date(),
          },
          tx,
        );
        await this.userRepo.enqueueOutboxEvent(
          'user.registered',
          {
            user_id: String(created.id),
            email: created.email,
            username: created.username,
            name: created.name,
            occurred_at: new Date().toISOString(),
          },
          tx,
        );
        return created;
      });
      return { user: safeUser(user) };
    } catch (err) {
      // Translate concurrent-insert race into a friendly 4xx
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        const target = (err.meta as { target?: string[] | string })?.target;
        const fields = Array.isArray(target) ? target : typeof target === 'string' ? [target] : [];
        if (fields.some((f) => f.includes('email'))) {
          throw new BadRequestException(t(this.i18n,'auth.EMAIL_IN_USE'));
        }
        if (fields.some((f) => f.includes('username'))) {
          throw new BadRequestException(t(this.i18n,'auth.USERNAME_IN_USE'));
        }
        if (fields.some((f) => f.includes('phone'))) {
          throw new BadRequestException(t(this.i18n,'auth.PHONE_IN_USE'));
        }
      }
      throw err;
    }
  }

  private async validateUniqueness(
    email: string,
    username: string | undefined,
    phone: string | undefined,
  ): Promise<void> {
    if (await this.userRepo.findByEmail(email)) {
      throw new BadRequestException(t(this.i18n,'auth.EMAIL_IN_USE'));
    }
    if (username && (await this.userRepo.findByUsername(username))) {
      throw new BadRequestException(t(this.i18n,'auth.USERNAME_IN_USE'));
    }
    if (phone && (await this.userRepo.findByPhone(phone))) {
      throw new BadRequestException(t(this.i18n,'auth.PHONE_IN_USE'));
    }
  }
}
