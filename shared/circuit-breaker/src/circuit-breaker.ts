import {
  Policy,
  ConsecutiveBreaker,
  CircuitBreakerPolicy,
} from 'cockatiel';

export interface CircuitBreakerOptions {
  halfOpenAfterMs?: number;
  maxConsecutiveFailures?: number;
}

export function createCircuitBreaker(
  options: CircuitBreakerOptions = {},
): CircuitBreakerPolicy {
  const {
    halfOpenAfterMs = 10_000,
    maxConsecutiveFailures = 5,
  } = options;

  return Policy.handleAll().circuitBreaker(
    halfOpenAfterMs,
    new ConsecutiveBreaker(maxConsecutiveFailures),
  );
}
