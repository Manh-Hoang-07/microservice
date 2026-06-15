import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const AUTH_TIMEOUT_MS = 5_000;
// Chia nho danh sach id de tranh URL qua dai (HTTP 414). ~200 id * ~12 ky tu = ~2.4KB.
const ID_BATCH_SIZE = 200;

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  name: string;
  image: string | null;
  status: string;
}

@Injectable()
export class AuthClient {
  private readonly logger = new Logger(AuthClient.name);
  private readonly baseUrl: string;
  private readonly internalSecret: string;

  constructor(private readonly config: ConfigService) {
    this.baseUrl = config.get<string>('AUTH_INTERNAL_URL', 'http://localhost:3001');
    this.internalSecret =
      config.get<string>('INTERNAL_API_SECRET') ||
      config.get<string>('app.internalApiSecret') ||
      '';
  }

  async getUsersByIds(ids: string[]): Promise<UserInfo[]> {
    if (!ids.length) return [];

    const batches: string[][] = [];
    for (let i = 0; i < ids.length; i += ID_BATCH_SIZE) {
      batches.push(ids.slice(i, i + ID_BATCH_SIZE));
    }

    try {
      const results = await Promise.all(
        batches.map((batch) =>
          this.doGet(`${this.baseUrl}/internal/users?ids=${batch.join(',')}`),
        ),
      );
      return results.flatMap((data) => (Array.isArray(data) ? data : []));
    } catch (err: any) {
      this.logger.warn(`AuthClient getUsersByIds failed: ${(err as Error).message}`);
      return [];
    }
  }

  async lookupByEmail(email: string): Promise<UserInfo | null> {
    try {
      const url = new URL(`${this.baseUrl}/internal/users/lookup`);
      url.searchParams.set('email', email);
      return await this.doGet(url.toString());
    } catch (err: any) {
      this.logger.warn(`AuthClient lookupByEmail failed: ${(err as Error).message}`);
      return null;
    }
  }

  async lookupByUsername(username: string): Promise<UserInfo | null> {
    try {
      const url = new URL(`${this.baseUrl}/internal/users/lookup`);
      url.searchParams.set('username', username);
      return await this.doGet(url.toString());
    } catch (err: any) {
      this.logger.warn(`AuthClient lookupByUsername failed: ${(err as Error).message}`);
      return null;
    }
  }

  private async doGet(url: string): Promise<any> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), AUTH_TIMEOUT_MS);

    try {
      const headers: Record<string, string> = { Accept: 'application/json' };
      if (this.internalSecret) headers['x-internal-secret'] = this.internalSecret;

      const res = await fetch(url, { signal: controller.signal, headers });

      if (!res.ok) {
        if (res.status >= 500) throw new Error(`Auth returned ${res.status}`);
        this.logger.warn(`AuthClient GET ${url} → ${res.status}`);
        return null;
      }

      const body = await res.json();
      return body?.data ?? body;
    } catch (err: any) {
      this.logger.warn(`AuthClient GET ${url} failed: ${(err as Error).message}`);
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }
}
