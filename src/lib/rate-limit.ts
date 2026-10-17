/**
 * In-memory sliding-window rate limiter.
 *
 * Single-instance (Vercel serverless shares one instance per warm lambda).
 * Good enough for a test-grade production deployment; swap for Redis/Upstash
 * if you scale to multiple regions.
 */

type Bucket = { hits: number[] };

const store = globalThis as typeof globalThis & { __rateBuckets?: Map<string, Bucket> };
const buckets: Map<string, Bucket> = store.__rateBuckets ?? new Map();
store.__rateBuckets = buckets;

export interface RateResult {
  ok: boolean;
  remaining: number;
}

export function rateLimit(key: string, limit: number, windowMs: number): RateResult {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);

  if (bucket.hits.length >= limit) {
    buckets.set(key, bucket);
    return { ok: false, remaining: 0 };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);

  // Opportunistic cleanup to avoid unbounded growth
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) {
      if (b.hits.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }

  return { ok: true, remaining: limit - bucket.hits.length };
}

/** Best-effort client IP for rate-limit keys (honors Vercel/CF headers). */
export function clientKey(req: Request, scope: string): string {
  const fwd =
    req.headers.get("x-vercel-forwarded-for") ??
    req.headers.get("x-forwarded-for") ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const ip = fwd.split(",")[0]?.trim() ?? "unknown";
  return `${scope}:${ip}`;
}
