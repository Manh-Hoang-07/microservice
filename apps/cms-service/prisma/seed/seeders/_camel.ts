// Data files dung snake_case; Prisma model dung camelCase. Doi key cap 1.
export function toCamelKeys(obj: Record<string, any>): any {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k.replace(/_([a-z])/g, (_, c) => c.toUpperCase())] = v;
  }
  return out;
}
