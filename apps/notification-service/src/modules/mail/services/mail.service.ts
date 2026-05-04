import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { RedisService } from '@package/redis';
import { ContentTemplateRepository } from '../../content-template/repositories/content-template.repository';
import { SendMailOptions } from '../interfaces/send-mail-options.interface';

const VAR_PATTERN = /\{\{\s*([\w.]{1,80})\s*\}\}/g;
const MAX_VAR_VALUE_LEN = 5000;
// Per-recipient sliding-window rate limit so one user can't be spammed via
// replayed events. Tunable via env if needed.
const RECIPIENT_RATE_LIMIT_PER_HOUR = 10;
const RECIPIENT_RATE_LIMIT_TTL_S = 3600;

/** Hard-bounce / permanent SMTP errors — retrying these wastes attempts. */
export class PermanentMailError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'PermanentMailError';
  }
}

function isPermanentSmtpError(err: any): boolean {
  // 5xx response codes from the SMTP server are policy/hard-bounce errors.
  const code = typeof err?.responseCode === 'number' ? err.responseCode : null;
  if (code != null && code >= 500 && code < 600) return true;
  const strCode = typeof err?.code === 'string' ? err.code : '';
  return strCode === 'EENVELOPE' || strCode === 'EAUTH' || strCode === 'EMESSAGE';
}

/**
 * Escape characters that would allow stored XSS / HTML injection when
 * interpolating an attacker-supplied value into an HTML template. We don't
 * escape the template body itself (admin-authored) — only `{{var}}`
 * substitutions, whose values come from Kafka payloads.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Strip CR/LF from values destined for SMTP headers (subject / from name)
 * to defeat header injection. nodemailer encodes most combinations
 * correctly, but we belt-and-brace it because subject is template-rendered
 * and may contain user-supplied vars.
 */
function safeHeader(value: string): string {
  return String(value).replace(/[\r\n\t]+/g, ' ').slice(0, 998);
}

@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter | null = null;
  private fromAddress: string | undefined;
  private fromName: string | undefined;
  private adminEmail: string | undefined;
  private lastConfigLoadMs = 0;
  private readonly configReloadIntervalMs = 5 * 60 * 1000; // 5 minutes

  constructor(
    private readonly config: ConfigService,
    private readonly contentTemplateRepo: ContentTemplateRepository,
    private readonly redis: RedisService,
  ) {}

  async onModuleInit() {
    await this.reloadConfig();
  }

  /**
   * Trusted admin notification address — sourced from config-service, never
   * from event payloads. Handlers that previously read `payload.admin_email`
   * must use this instead so the destination cannot be redirected by anyone
   * who can produce a Kafka message.
   */
  getAdminEmail(): string | undefined {
    return this.adminEmail;
  }

  async ensureFreshConfig(): Promise<void> {
    if (Date.now() - this.lastConfigLoadMs > this.configReloadIntervalMs) {
      await this.reloadConfig();
    }
  }

  async reloadConfig(): Promise<void> {
    const configUrl = this.config.get<string>('CONFIG_INTERNAL_URL');
    if (!configUrl) return;

    try {
      const secret =
        this.config.get<string>('INTERNAL_SECRET') ||
        this.config.get<string>('INTERNAL_API_SECRET');
      const ac = new AbortController();
      const timer = setTimeout(() => ac.abort(), 5000);
      let res: Response;
      try {
        res = await fetch(`${configUrl}/config/email`, {
          headers: secret ? { 'x-internal-secret': secret } : {},
          signal: ac.signal,
        });
      } finally {
        clearTimeout(timer);
      }
      if (!res.ok) {
        this.logger.warn(`Config-service returned ${res.status} when fetching email config`);
        return;
      }

      const cfg = (await res.json()) as any;
      if (!cfg?.smtp_host || !cfg?.smtp_username) {
        this.logger.warn('Email config incomplete — mail disabled');
        return;
      }

      this.fromName = cfg.from_name ? safeHeader(cfg.from_name) : undefined;
      if (cfg.from_email) {
        this.fromAddress = this.fromName
          ? `${this.fromName} <${cfg.from_email}>`
          : cfg.from_email;
      }
      this.adminEmail = cfg.reply_to_email || cfg.from_email;

      this.transporter = nodemailer.createTransport({
        host: cfg.smtp_host,
        port: Number(cfg.smtp_port) || 587,
        secure: cfg.smtp_secure ?? false,
        auth: { user: cfg.smtp_username, pass: cfg.smtp_password },
        // Connection hardening: pool reuses sockets, bounded timeouts
        // prevent a stuck SMTP server from parking Bull workers forever.
        pool: true,
        maxConnections: 5,
        maxMessages: 100,
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 30_000,
      });
      this.lastConfigLoadMs = Date.now();
    } catch (err: any) {
      this.logger.warn(`Email config reload failed: ${err?.message ?? err}`);
    }
  }

  async send(options: SendMailOptions): Promise<void> {
    await this.ensureFreshConfig();
    if (!this.transporter) throw new Error('Mail transport not configured');

    // Per-recipient rate limit: drop sends to recipients that already
    // received >N mails in the last hour. Defends against replay-spamming
    // a user inbox via repeated `mail.send` events.
    const recipients = Array.isArray(options.to) ? options.to : [options.to];
    const allowed = await this.filterRateLimited(recipients);
    if (!allowed.length) {
      this.logger.warn(`All recipients rate-limited; skipping ${recipients.join(',')}`);
      return;
    }

    try {
      await this.transporter.sendMail({
        from: this.fromAddress,
        to: allowed.length === 1 ? allowed[0] : allowed,
        subject: safeHeader(options.subject),
        html: options.html,
        text: options.text,
      });
    } catch (err) {
      if (isPermanentSmtpError(err)) {
        // Wrap so the queue processor can mark the job permanently failed
        // instead of consuming all retry attempts on a hard bounce.
        throw new PermanentMailError(
          `SMTP permanent failure: ${(err as Error).message}`,
          err,
        );
      }
      throw err;
    }
  }

  /**
   * Drop recipients who've already exceeded the per-hour quota. Returns the
   * subset that's still within budget. Fail-open if Redis is unavailable —
   * we'd rather over-deliver than lose legitimate transactional mail.
   */
  private async filterRateLimited(recipients: string[]): Promise<string[]> {
    if (!this.redis.isEnabled()) return recipients;
    const survivors: string[] = [];
    for (const to of recipients) {
      const key = `mail:rl:${to.toLowerCase()}`;
      try {
        const count = await this.redis.incr(key);
        if (count === 1) {
          // First hit in this window — set TTL.
          await this.redis.expire(key, RECIPIENT_RATE_LIMIT_TTL_S);
        }
        if (count <= RECIPIENT_RATE_LIMIT_PER_HOUR) {
          survivors.push(to);
        } else {
          this.logger.warn(`Rate-limited recipient ${to} (${count}/${RECIPIENT_RATE_LIMIT_PER_HOUR})`);
        }
      } catch (err) {
        // Fail-open on Redis error — preserve legitimate mail delivery.
        this.logger.warn(`Rate-limit check failed for ${to}: ${(err as Error).message}`);
        survivors.push(to);
      }
    }
    return survivors;
  }

  async sendTemplate(
    templateCode: string,
    options: { to: string | string[]; variables?: Record<string, any>; subject?: string },
  ): Promise<void> {
    const template = await this.contentTemplateRepo.findActiveByCode(templateCode);
    if (!template?.content) {
      this.logger.warn(`Template ${templateCode} not found or empty`);
      return;
    }

    const rendered = this.render(template.content, options.variables ?? {});
    const metadata = template.metadata as any;
    const subject = options.subject ?? metadata?.subject ?? template.name;

    await this.send({ to: options.to, subject, html: rendered });
  }

  /**
   * Replace `{{path.to.var}}` placeholders. EVERY substituted value is HTML-
   * escaped because `variables` originates from Kafka payloads which are
   * attacker-controllable. Without escaping, anyone who can produce a
   * `mail.send` event (or trigger the contact form) injects HTML into
   * outgoing mail.
   */
  private render(content: string, variables: Record<string, any>): string {
    return content.replace(VAR_PATTERN, (match, key: string) => {
      const parts = key.split('.');
      let value: any = variables;
      for (const part of parts) {
        if (value == null) return match;
        value = value[part];
      }
      if (value == null) return match;
      const str = String(value).slice(0, MAX_VAR_VALUE_LEN);
      return escapeHtml(str);
    });
  }
}
