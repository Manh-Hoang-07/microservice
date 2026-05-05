import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCircuitBreaker } from '@package/circuit-breaker';
import type { CircuitBreakerPolicy } from 'cockatiel';

const IAM_TIMEOUT_MS = 5_000;

@Injectable()
export class IamClient implements OnModuleInit {
  private readonly logger = new Logger(IamClient.name);
  private readonly baseUrl: string;
  private readonly internalSecret: string;
  private breaker!: CircuitBreakerPolicy;

  constructor(private readonly config: ConfigService) {
    this.baseUrl = config.get<string>('IAM_INTERNAL_URL', 'http://localhost:3004/api');
    this.internalSecret =
      config.get<string>('INTERNAL_API_SECRET') ||
      config.get<string>('app.internalApiSecret') ||
      '';
  }

  onModuleInit() {
    this.breaker = createCircuitBreaker({
      halfOpenAfterMs: 10_000,
      maxConsecutiveFailures: 5,
    });
  }

  async getUserPermissions(userId: string, groupId?: string): Promise<Set<string>> {
    const url = new URL(`${this.baseUrl}/internal/rbac/permissions`);
    url.searchParams.set('userId', userId);
    if (groupId) url.searchParams.set('groupId', groupId);

    try {
      const data = await this.breaker.execute(() => this.doGet(url.toString()));
      return new Set(data?.permissions ?? []);
    } catch (err) {
      this.logger.warn(`IamClient circuit open: ${(err as Error).message}`);
      return new Set();
    }
  }

  private async doGet(url: string): Promise<any> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), IAM_TIMEOUT_MS);

    try {
      const headers: Record<string, string> = { Accept: 'application/json' };
      if (this.internalSecret) headers['x-internal-secret'] = this.internalSecret;

      const res = await fetch(url, {
        signal: controller.signal,
        headers,
      });

      if (!res.ok) {
        if (res.status >= 500) throw new Error(`IAM returned ${res.status}`);
        this.logger.warn(`IamClient GET ${url} → ${res.status}`);
        return null;
      }

      return await res.json();
    } catch (err) {
      this.logger.warn(`IamClient GET ${url} failed: ${(err as Error).message}`);
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }
}
