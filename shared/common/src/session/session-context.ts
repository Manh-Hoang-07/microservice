import { Request } from 'express';

export interface SessionServerInfo {
  name: string;
  environment: string;
  timezone: string;
  hostname: string;
  ip: string | null;
  port: number;
  pid: number;
  uptimeSeconds: number;
}

export class SessionContext {
  readonly userId: string | null;
  readonly userEmail: string | null;
  readonly tokenIssuedAt: string | null;
  readonly tokenExpiresAt: string | null;
  readonly ip: string | null;
  readonly userAgent: string | null;
  readonly language: string | null;
  readonly requestId: string | null;
  readonly server: SessionServerInfo;

  constructor(req: Request, server: SessionServerInfo) {
    const jwt = (req as any).user as Record<string, any> | undefined;

    this.userId      = jwt?.sub   ? String(jwt.sub)   : null;
    this.userEmail   = jwt?.email ? String(jwt.email) : null;
    this.tokenIssuedAt  = jwt?.iat ? new Date(jwt.iat * 1000).toISOString() : null;
    this.tokenExpiresAt = jwt?.exp ? new Date(jwt.exp * 1000).toISOString() : null;

    this.ip        = (req.headers['x-forwarded-for'] as string) ?? req.ip ?? null;
    this.userAgent = (req.headers['user-agent'] as string) ?? null;
    this.language  = (req.headers['accept-language'] as string) ?? null;
    this.requestId = (req as any).requestId ?? (req.headers['x-request-id'] as string) ?? null;

    this.server = server;
  }

  get isAuthenticated(): boolean {
    return this.userId !== null;
  }
}
