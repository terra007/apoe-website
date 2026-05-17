import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// 5 Anfragen pro 10 Minuten pro IP – reicht für echte Nutzer, blockiert Spam
export const contactRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  analytics: false,
  prefix: "apo:contact",
});

// 3 Bewerbungen pro Stunde pro IP
export const bewerberRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "60 m"),
  analytics: false,
  prefix: "apo:bewerber",
});
