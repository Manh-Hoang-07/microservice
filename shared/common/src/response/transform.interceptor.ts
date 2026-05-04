import {
  HttpException,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ResponseUtil } from './response.util';
import { mapExceptionToResponse } from './exception-mapper.helper';

function deepConvertBigInt(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'bigint') return Number(obj);
  if (typeof obj !== 'object') return obj;
  if (Object.prototype.toString.call(obj) === '[object Date]') return obj;
  if (Array.isArray(obj)) return obj.map((v) => deepConvertBigInt(v));
  const isPlainObject = obj.constructor === undefined || obj.constructor.name === 'Object';
  if (!isPlainObject) return obj;
  const res: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res[key] = deepConvertBigInt(obj[key]);
    }
  }
  return res;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((raw) => this.handleSuccess(raw)),
      catchError((err) => this.handleError(err)),
    );
  }

  private handleSuccess(raw: any): any {
    const safeData = deepConvertBigInt(raw);

    if (isApiResponse(safeData)) return safeData;

    if (
      safeData &&
      typeof safeData === 'object' &&
      'data' in safeData &&
      'meta' in safeData
    ) {
      const { data, meta } = safeData;
      return ResponseUtil.paginated(
        data,
        meta.page || meta.currentPage || 1,
        meta.limit || meta.itemsPerPage || 10,
        meta.totalItems || 0,
      );
    }

    return ResponseUtil.success(safeData);
  }

  private handleError(err: any): Observable<never> {
    if (isApiResponse(err?.response)) {
      return throwError(() => err);
    }

    const { message, code, status, errors } = mapExceptionToResponse(err);
    const apiError = ResponseUtil.error(message, code, status, errors);
    const httpStatus = apiError.httpStatus ?? status;

    return throwError(() => new HttpException(apiError, httpStatus));
  }
}

function isApiResponse(obj: any): boolean {
  return (
    obj && typeof obj === 'object' && 'success' in obj && 'timestamp' in obj
  );
}
