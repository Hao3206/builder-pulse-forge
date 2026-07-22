import { RequestHandler } from "express";

interface RateLimitOptions {
  windowMs: number;
  max: number;
  message: string;
}

export function createRateLimiter({
  windowMs,
  max,
  message,
}: RateLimitOptions): RequestHandler {
  const attempts = new Map<string, { count: number; resetAt: number }>();
  let lastCleanup = Date.now();

  return (req, res, next) => {
    const now = Date.now();
    if (now - lastCleanup >= windowMs || attempts.size > 1000) {
      for (const [key, value] of attempts) {
        if (value.resetAt <= now) attempts.delete(key);
      }
      lastCleanup = now;
    }
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const current = attempts.get(key);
    const entry =
      !current || current.resetAt <= now
        ? { count: 0, resetAt: now + windowMs }
        : current;
    entry.count += 1;
    attempts.set(key, entry);

    res.setHeader("RateLimit-Limit", max);
    res.setHeader("RateLimit-Remaining", Math.max(0, max - entry.count));
    res.setHeader("RateLimit-Reset", Math.ceil(entry.resetAt / 1000));

    if (entry.count > max)
      return res.status(429).json({ success: false, error: message });
    next();
  };
}
