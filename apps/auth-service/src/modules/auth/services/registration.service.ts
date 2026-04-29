import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/user.repository';
import { AuthOtpService } from './auth-otp.service';
import { RegisterDto } from '../dto/register.dto';
import { safeUser } from '../utils/user.util';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly userRepo: UserRepository,
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
      throw new BadRequestException('Email is already in use.');
    }
    if (dto.username && await this.userRepo.findByUsername(dto.username)) {
      throw new BadRequestException('Username is already in use.');
    }
    if (dto.phone && await this.userRepo.findByPhone(dto.phone)) {
      throw new BadRequestException('Phone number is already in use.');
    }
  }
}
