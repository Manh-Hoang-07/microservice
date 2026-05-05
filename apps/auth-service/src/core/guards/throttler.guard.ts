import { Injectable } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class I18nThrottlerGuard extends ThrottlerGuard {
  protected throwThrottlingException(): Promise<void> {
    const lang = I18nContext.current()?.lang ?? 'vi';
    const message = lang === 'vi'
      ? 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.'
      : 'Too many requests. Please try again later.';
    throw new ThrottlerException(message);
  }
}
