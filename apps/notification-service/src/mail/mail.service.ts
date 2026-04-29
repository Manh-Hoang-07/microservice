import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor(private readonly config: ConfigService) {
    const host = config.get<string>('mail.host');
    const user = config.get<string>('mail.user');

    if (host && user) {
      const port = config.get<number>('mail.port') || 587;
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass: config.get<string>('mail.pass') },
      });
      this.logger.log(`Mail transporter configured: ${host}:${port}`);
    } else {
      this.logger.warn('Mail not configured — emails will be logged only');
    }
  }

  async send(options: SendMailOptions): Promise<void> {
    const from = this.config.get<string>('mail.from') || 'noreply@comic-platform.com';

    if (!this.transporter) {
      this.logger.log(`[DRY RUN] Email to ${options.to}: ${options.subject}`);
      return;
    }

    try {
      await this.transporter.sendMail({
        from,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });
      this.logger.log(`Email sent to ${options.to}: ${options.subject}`);
    } catch (err) {
      this.logger.error(`Failed to send email to ${options.to}`, err);
      throw err;
    }
  }
}
