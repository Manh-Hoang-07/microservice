import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../../database/prisma.service';
import { AuthOtpService } from './auth-otp.service';
import { RegisterDto } from '../dto/register.dto';
import { safeUser } from '../utils/user.util';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly otpService: AuthOtpService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase();

    // 1. Verify OTP
    const isOtpValid = await this.otpService.verifyAndDelete('register', email, dto.otp);
    if (!isOtpValid) {
      throw new BadRequestException('Invalid or expired OTP code.');
    }

    // 2. Uniqueness Checks
    await this.validateUniqueness(dto);

    // 3. Create User
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        username: dto.username ?? email,
        email,
        phone: dto.phone ?? null,
        password: hashedPassword,
        name: dto.name,
        status: 'active',
      },
    });

    return { user: safeUser(user) };
  }

  private async validateUniqueness(dto: RegisterDto): Promise<void> {
    const email = dto.email.toLowerCase();

    if (await this.prisma.user.findUnique({ where: { email } })) {
      throw new BadRequestException('Email is already in use.');
    }
    if (dto.username && await this.prisma.user.findUnique({ where: { username: dto.username } })) {
      throw new BadRequestException('Username is already in use.');
    }
    if (dto.phone && await this.prisma.user.findUnique({ where: { phone: dto.phone } })) {
      throw new BadRequestException('Phone number is already in use.');
    }
  }
}
