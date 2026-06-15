import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { RedisService } from '@package/redis';
import { FileLogger } from '@package/bootstrap';
import { ConfigClient } from '../../../clients/config.client';
import { ContentTemplateRepository } from '../../content-template/repositories/content-template.repository';
import { SendMailOptions } from '../interfaces/send-mail-options.interface';

const VAR_PATTERN = /\{\{\s*([\w.]{1,80})\s*\}\}/g;
const MAX_VAR_VALUE_LEN = 5000;
const RECIPIENT_RATE_LIMIT_PER_HOUR = 10;
const RECIPIENT_RATE_LIMIT_TTL_S = 3600;
/** Active render templates are near-static; cache them to avoid a DB hit per mail job. */
const TEMPLATE_CACHE_TTL_S = 300;
const TEMPLATE_CACHE_PREFIX = 'mail:tpl:';

/** Minimal shape persisted in the template cache (only what sendTemplate needs). */
interface CachedTemplate {
  name: string;
  content: string;
  metadata: any;
}

/** BigInt-safe JSON replacer for caching template payloads. */
function bigintReplacer(_key: string, value: unknown): unknown {
  return typeof value === 'bigint' ? String(value) : value;
}

/** Hard-bounce / permanent SMTP errors — retrying these wastes attempts. */
export class PermanentMailError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'PermanentMailError';
  }
}

function isPermanentSmtpError(err: any): boolean {
  const code = typeof err?.responseCode === 'number' ? err.responseCode : null;
  if (code != null && code >= 500 && code < 600) return true;
  const strCode = typeof err?.code === 'string' ? err.code : '';
  return strCode === 'EENVELOPE' || strCode === 'EAUTH' || strCode === 'EMESSAGE';
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeHeader(value: string): string {
  return String(value).replace(/[\r\n\t]+/g, ' ').slice(0, 998);
}

@Injectable()
export class MailService implements OnModuleInit {
  private transporter: nodemailer.Transporter | null = null;
  private fromAddress: string | undefined;
  private fromName: string | undefined;
  private adminEmail: string | undefined;
  private lastConfigLoadMs = 0;
  private readonly configReloadIntervalMs = 5 * 60 * 1000;
  private reloadInFlight: Promise<void> | null = null;

  constructor(
    private readonly configClient: ConfigClient,
    private readonly contentTemplateRepo: ContentTemplateRepository,
    private readonly redis: RedisService,
    private readonly fileLogger: FileLogger,
  ) {}

  async onModuleInit() {
    await this.reloadConfig();
  }

  getAdminEmail(): string | undefined {
    return this.adminEmail;
  }

  async ensureFreshConfig(): Promise<void> {
    if (Date.now() - this.lastConfigLoadMs > this.configReloadIntervalMs) {
      if (this.reloadInFlight) {
        await this.reloadInFlight;
        return;
      }
      this.reloadInFlight = this.reloadConfig();
      try {
        await this.reloadInFlight;
      } finally {
        this.reloadInFlight = null;
      }
    }
  }

  async reloadConfig(): Promise<void> {
    const log = this.fileLogger.create('mail/reload_config', {});
    const cfg = await this.configClient.getEmailConfig();
    if (!cfg) {
      log.addDebug('config_null');
      log.save();
      return;
    }

    if (!cfg.smtpHost || !cfg.smtpUsername) {
      log.addDebug('config_incomplete', { smtpHost: cfg.smtpHost ?? '', smtpUsername: cfg.smtpUsername ?? '' });
      log.save();
      return;
    }

    this.fromName = cfg.fromName ? safeHeader(cfg.fromName) : undefined;
    if (cfg.fromEmail) {
      this.fromAddress = this.fromName
        ? `${this.fromName} <${cfg.fromEmail}>`
        : cfg.fromEmail;
    }
    this.adminEmail = cfg.replyToEmail || cfg.fromEmail;

    this.transporter = nodemailer.createTransport({
      host: cfg.smtpHost,
      port: Number(cfg.smtpPort) || 587,
      secure: cfg.smtpSecure ?? false,
      auth: { user: cfg.smtpUsername, pass: cfg.smtpPassword },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 30_000,
    });
    this.lastConfigLoadMs = Date.now();
    log.addDebug('transport_ready', { host: cfg.smtpHost, port: cfg.smtpPort, from: this.fromAddress });
    log.save();
  }

  async sendTemplate(
    templateCode: string,
    options: { to: string | string[]; variables?: Record<string, any>; subject?: string },
  ): Promise<void> {
    const to = Array.isArray(options.to) ? options.to.join(',') : options.to;
    const log = this.fileLogger.create('mail/send_template', { templateCode, to });

    const template = await this.resolveTemplate(templateCode);
    if (!template?.content) {
      log.addDebug('template_not_found');
      log.save();
      return;
    }

    log.addDebug('template_resolved', { templateName: template.name });
    const rendered = this.render(template.content, options.variables ?? {});
    const metadata = template.metadata;
    const subject = options.subject ?? metadata?.subject ?? template.name;

    try {
      await this.send({ to: options.to, subject, html: rendered });
      log.addDebug('done');
    } catch (err: any) {
      log.addException(err);
      log.addDebug('failed');
      throw err;
    } finally {
      log.save();
    }
  }

  /**
   * Resolve an active render template by code, backed by a short-lived Redis cache.
   * Only valid templates are cached — inactive/missing codes always re-query so a
   * transient "not found" never gets cached as a negative result.
   */
  private async resolveTemplate(templateCode: string): Promise<CachedTemplate | null> {
    const cacheKey = `${TEMPLATE_CACHE_PREFIX}${templateCode}`;

    if (this.redis?.isEnabled?.()) {
      try {
        const raw = await this.redis.get(cacheKey);
        if (raw) return JSON.parse(raw) as CachedTemplate;
      } catch {
        // cache read failure → fall through to DB
      }
    }

    const template = await this.contentTemplateRepo.findActiveByCode(templateCode);
    if (!template?.content) return null;

    const cached: CachedTemplate = {
      name: template.name,
      content: template.content,
      metadata: template.metadata,
    };

    if (this.redis?.isEnabled?.()) {
      try {
        await this.redis.set(cacheKey, JSON.stringify(cached, bigintReplacer), TEMPLATE_CACHE_TTL_S);
      } catch {
        // cache write failure is non-fatal
      }
    }

    return cached;
  }

  /** Drop a cached template (called when admin create/update/delete a template). */
  async invalidateTemplate(code: string): Promise<void> {
    if (!code || !this.redis?.isEnabled?.()) return;
    try {
      await this.redis.del(`${TEMPLATE_CACHE_PREFIX}${code}`);
    } catch {
      // best-effort invalidation
    }
  }

  async send(options: SendMailOptions): Promise<void> {
    await this.ensureFreshConfig();
    const to = Array.isArray(options.to) ? options.to.join(',') : options.to;
    const log = this.fileLogger.create('mail/send', { to, subject: options.subject });

    if (!this.transporter) {
      log.addDebug('transport_not_configured');
      log.save();
      throw new Error('Mail transport not configured');
    }

    const recipients = Array.isArray(options.to) ? options.to : [options.to];
    const allowed = await this.filterRateLimited(recipients);
    if (!allowed.length) {
      log.addDebug('all_rate_limited');
      log.save();
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
      log.addDebug('smtp_sent');
    } catch (err: any) {
      log.addException(err);
      log.addDebug('smtp_failed');
      if (isPermanentSmtpError(err)) {
        throw new PermanentMailError(
          `SMTP permanent failure: ${(err as Error).message}`,
          err,
        );
      }
      throw err;
    } finally {
      log.save();
    }
  }

  private async filterRateLimited(recipients: string[]): Promise<string[]> {
    if (!this.redis.isEnabled()) return recipients;
    const survivors: string[] = [];
    for (const to of recipients) {
      const key = `mail:rl:${to.toLowerCase()}`;
      try {
        const count = await this.redis.incr(key);
        if (count === 1) {
          await this.redis.expire(key, RECIPIENT_RATE_LIMIT_TTL_S);
        }
        if (count <= RECIPIENT_RATE_LIMIT_PER_HOUR) {
          survivors.push(to);
        }
      } catch {
        survivors.push(to);
      }
    }
    return survivors;
  }

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
