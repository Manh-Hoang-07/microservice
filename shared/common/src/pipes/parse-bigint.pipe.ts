import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

const NUMERIC_RE = /^\d{1,20}$/;

/**
 * Parse a route param / query as a positive bigint. Returns 400 on invalid
 * input instead of letting `BigInt('abc')` throw a raw `SyntaxError` that
 * surfaces as a 500 to the client.
 */
@Injectable()
export class ParseBigIntPipe implements PipeTransform<string, bigint> {
  transform(value: string, metadata: ArgumentMetadata): bigint {
    if (typeof value !== 'string' || !NUMERIC_RE.test(value)) {
      throw new BadRequestException(
        `Validation failed: ${metadata.data ?? 'param'} must be a positive integer`,
      );
    }
    try {
      const result = BigInt(value);
      if (result <= BigInt(0)) {
        throw new BadRequestException(
          `Validation failed: ${metadata.data ?? 'param'} must be > 0`,
        );
      }
      return result;
    } catch {
      throw new BadRequestException(
        `Validation failed: ${metadata.data ?? 'param'} must be a positive integer`,
      );
    }
  }
}
