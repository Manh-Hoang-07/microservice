import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseUtil } from '../response/response.util';

const IGNORED_404_PATHS = [
  '/favicon.ico',
  '/.well-known/appspecific/com.chrome.devtools.json',
  '/robots.txt',
];

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // Already in ApiResponse format → send directly
      if (isApiResponseFormat(exceptionResponse)) {
        response.status(status).json(exceptionResponse);
        return;
      }

      const { message, errors } = extractErrorDetails(exception, exceptionResponse);

      if (this.shouldLog(status, request.url)) {
        this.logger.error(`HTTP ${status} – ${message}`, exception.stack);
      }

      response.status(status).json(ResponseUtil.error(message, 'ERROR', status, errors));
      return;
    }

    // Unhandled (non-HTTP) exception
    this.logger.error(
      `Unhandled exception on ${request.method} ${request.url}`,
      exception instanceof Error ? exception.stack : String(exception),
    );

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(ResponseUtil.error('Internal server error', 'INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR));
  }

  private shouldLog(status: number, url: string): boolean {
    if (status !== HttpStatus.NOT_FOUND) return true;
    return !IGNORED_404_PATHS.some((path) => url.includes(path));
  }
}

function isApiResponseFormat(res: any): boolean {
  return res !== null && typeof res === 'object' && 'success' in res && 'code' in res && 'timestamp' in res;
}

function extractErrorDetails(exception: HttpException, exceptionResponse: string | object): { message: string; errors: any } {
  let message = exception.message;
  let errors: any = null;

  if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
    const errorObj = exceptionResponse as Record<string, any>;
    message = errorObj.message || message;
    errors = errorObj.errors || errorObj.error || null;

    if (Array.isArray(errorObj.message)) {
      message = errorObj.message.length > 0 ? errorObj.message[0] : 'Validation failed';
      errors = errorObj.message;
    }
  }

  return { message, errors };
}
