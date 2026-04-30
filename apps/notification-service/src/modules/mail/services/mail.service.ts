import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../../../database/prisma.service';
import { SendMailOptions } from '../interfaces/send-mail-options.interface';

@Injectable()
export class MailService implements OnModuleInit {
  private transporter: nodemailer.Transporter | null = null;
  private fromAddress: string | undefined;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    await this.reloadConfig();
  }

  async reloadConfig(): Promise<void> {
    const configUrl = this.config.get<string>('CONFIG_INTERNAL_URL');
    if (!configUrl) return;

    try {
      const secret = this.config.get<string>('INTERNAL_SECRET');
      const res = await fetch(`${configUrl}/config/email`, {
        headers: secret ? { 'x-internal-secret': secret } : {},
      });
      if (!res.ok) return;

      const cfg = await res.json() as any;
      if (!cfg?.smtp_host || !cfg?.smtp_username) return;

      if (cfg.from_email) {
        this.fromAddress = cfg.from_name ? `${cfg.from_name} <${cfg.from_email}>` : cfg.from_email;
      }

      this.transporter = nodemailer.createTransport({
        host: cfg.smtp_host,
        port: Number(cfg.smtp_port) || 587,
        secure: cfg.smtp_secure ?? false,
        auth: { user: cfg.smtp_username, pass: cfg.smtp_password },
      });
    } catch {
      // config-service unavailable — mail disabled
    }
  }

  async send(options: SendMailOptions): Promise<void> {
    if (!this.transporter) return;

    await this.transporter.sendMail({
      from: this.fromAddress,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
  }

  async sendTemplate(
    templateCode: string,
    options: { to: string | string[]; variables?: Record<string, any>; subject?: string },
  ): Promise<void> {
    const template = await this.prisma.contentTemplate.findFirst({
      where: { code: templateCode, status: 'active', category: 'render', type: 'email' },
    });
    if (!template?.content) return;

    const rendered = this.render(template.content, options.variables ?? {});
    const metadata = template.metadata as any;
    const subject = options.subject ?? metadata?.subject ?? template.name;

    await this.send({ to: options.to, subject, html: rendered });
  }

  private render(content: string, variables: Record<string, any>): string {
    return content.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, key: string) => {
      const parts = key.split('.');
      let value: any = variables;
      for (const part of parts) {
        if (value == null) return match;
        value = value[part];
      }
      return value != null ? String(value) : match;
    });
  }
}
