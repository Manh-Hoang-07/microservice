import { ConsoleLogger, LogLevel } from '@nestjs/common';
import { trace } from '@opentelemetry/api';

type Level = LogLevel | 'info';

/**
 * Drop-in replacement for Nest's ConsoleLogger that emits one JSON document
 * per line to stdout in production. Designed to be parsed by Loki / ELK /
 * Datadog without a regex tango. Includes OpenTelemetry trace_id / span_id
 * when an active span exists, so logs and traces correlate without extra
 * wiring.
 *
 * In development the parent ConsoleLogger's pretty/coloured output is kept.
 */
export class JsonLogger extends ConsoleLogger {
  private readonly serviceName: string;
  private readonly jsonMode: boolean;

  constructor(serviceName: string) {
    super();
    this.serviceName = serviceName;
    this.jsonMode = process.env.NODE_ENV === 'production';
  }

  log(message: any, context?: string) {
    this.jsonMode ? this.writeJson('info', message, context) : super.log(message, context);
  }
  error(message: any, stack?: string, context?: string) {
    this.jsonMode ? this.writeJson('error', message, context, stack) : super.error(message, stack, context);
  }
  warn(message: any, context?: string) {
    this.jsonMode ? this.writeJson('warn', message, context) : super.warn(message, context);
  }
  debug(message: any, context?: string) {
    this.jsonMode ? this.writeJson('debug', message, context) : super.debug(message, context);
  }
  verbose(message: any, context?: string) {
    this.jsonMode ? this.writeJson('verbose', message, context) : super.verbose(message, context);
  }
  fatal(message: any, context?: string) {
    if (this.jsonMode) {
      this.writeJson('fatal', message, context);
    } else {
      // Nest 11 has fatal(); fall through to error() if not present.
      const parentFatal = (ConsoleLogger.prototype as any).fatal;
      if (typeof parentFatal === 'function') {
        parentFatal.call(this, message, context);
      } else {
        super.error(message, undefined, context);
      }
    }
  }

  private writeJson(level: Level, message: any, context?: string, stack?: string) {
    const span = trace.getActiveSpan();
    const sc = span?.spanContext();
    const record: Record<string, unknown> = {
      ts: new Date().toISOString(),
      level,
      service: this.serviceName,
      context: context ?? this.context,
      msg: typeof message === 'string' ? message : safeJson(message),
    };
    if (sc?.traceId) record.trace_id = sc.traceId;
    if (sc?.spanId) record.span_id = sc.spanId;
    if (stack) record.stack = stack;
    process.stdout.write(JSON.stringify(record) + '\n');
  }
}

function safeJson(v: unknown): string {
  try { return JSON.stringify(v); } catch { return String(v); }
}
