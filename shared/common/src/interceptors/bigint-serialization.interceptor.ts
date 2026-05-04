import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

/**
 * Converts BigInt values to strings in response payloads.
 *
 * JavaScript Number only safely represents integers up to 2^53 - 1.
 * Converting BigInt → Number silently loses precision for large IDs.
 * Using strings preserves the exact value for all ID ranges.
 *
 * Uses a single-pass approach: checks AND converts in one traversal.
 * If no BigInts are found the original object is returned untouched (no clone).
 */
function serializeBigIntSinglePass(data: any): { result: any; changed: boolean } {
  if (data === null || data === undefined) return { result: data, changed: false };
  if (typeof data === 'bigint') return { result: String(data), changed: true };
  if (data instanceof Date) return { result: data, changed: false };
  if (Array.isArray(data)) {
    let anyChanged = false;
    const arr = data.map(item => {
      const { result, changed } = serializeBigIntSinglePass(item);
      if (changed) anyChanged = true;
      return result;
    });
    return { result: anyChanged ? arr : data, changed: anyChanged };
  }
  if (typeof data === 'object') {
    let anyChanged = false;
    const obj: any = {};
    for (const key of Object.keys(data)) {
      const { result, changed } = serializeBigIntSinglePass(data[key]);
      obj[key] = result;
      if (changed) anyChanged = true;
    }
    return { result: anyChanged ? obj : data, changed: anyChanged };
  }
  return { result: data, changed: false };
}

@Injectable()
export class BigIntSerializationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => serializeBigIntSinglePass(data).result),
    );
  }
}
