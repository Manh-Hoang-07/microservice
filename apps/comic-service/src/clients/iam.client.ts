import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const IAM_TIMEOUT_MS = 5_000;

@Injectable()
export class IamClient {
  private readonly logger = new Logger(IamClient.name);
  private readonly baseUrl: string;
  private readonly internalSecret: string;

  constructor(private readonly config: ConfigService) {
    this.baseUrl = config.get<string>('IAM_INTERNAL_URL', 'http://localhost:3002/api/iam');
    this.internalSecret =
      config.get<string>('INTERNAL_API_SECRET') ||
      config.get<string>('app.internalApiSecret') ||
      '';
  }

  async getGroupMembership(
    userId: string,
    groupId: string,
  ): Promise<{ isMember: boolean; isOwner: boolean }> {
    const url = new URL(`${this.baseUrl}/internal/groups/membership`);
    url.searchParams.set('userId', userId);
    url.searchParams.set('groupId', groupId);

    try {
      const data = await this.doGet(url.toString());
      return data ?? { isMember: false, isOwner: false };
    } catch (err: any) {
      this.logger.warn(`IamClient getGroupMembership failed: ${(err as Error).message}`);
      return { isMember: false, isOwner: false };
    }
  }

  private async doGet(url: string): Promise<any> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), IAM_TIMEOUT_MS);

    try {
      const headers: Record<string, string> = { Accept: 'application/json' };
      if (this.internalSecret) headers['x-internal-secret'] = this.internalSecret;

      const res = await fetch(url, { signal: controller.signal, headers });

      if (!res.ok) {
        if (res.status >= 500) throw new Error(`IAM returned ${res.status}`);
        this.logger.warn(`IamClient GET ${url} → ${res.status}`);
        return null;
      }

      const body = await res.json();
      return body?.data ?? body;
    } catch (err: any) {
      this.logger.warn(`IamClient GET ${url} failed: ${(err as Error).message}`);
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }
}
