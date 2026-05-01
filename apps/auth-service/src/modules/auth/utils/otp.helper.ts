import { randomInt } from 'crypto';

export function generateOtp(): string {
  return randomInt(100_000, 1_000_000).toString();
}

export function buildOtpKey(type: string, email: string): string {
  return `otp:${type}:${email.toLowerCase()}`;
}
