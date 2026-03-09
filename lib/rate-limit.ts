import { NextRequest } from "next/server";
import { validateApiKey, incrementUsage, getLimit, type Tier } from "./api-keys";

interface RateLimitResult {
  allowed: boolean;
  tier: Tier;
  remaining: number;
  limit: number;
  showWatermark: boolean;
}

const ipUsage = new Map<string, { count: number; date: string }>();

export function checkRateLimit(request: NextRequest): RateLimitResult {
  const apiKey = request.headers.get("x-api-key") ||
    request.nextUrl.searchParams.get("api_key");

  if (apiKey) {
    const record = validateApiKey(apiKey);
    if (!record) {
      return { allowed: false, tier: "free", remaining: 0, limit: 0, showWatermark: true };
    }

    const limit = getLimit(record.tier);
    const today = new Date().toISOString().split("T")[0];
    const currentUsage = record.lastUsedDate === today ? record.usageToday : 0;

    if (currentUsage >= limit) {
      return { allowed: false, tier: record.tier, remaining: 0, limit, showWatermark: record.tier === "free" };
    }

    const updated = incrementUsage(apiKey);
    return {
      allowed: true,
      tier: record.tier,
      remaining: limit - (updated?.usageToday || currentUsage + 1),
      limit,
      showWatermark: false,
    };
  }

  // No API key — free tier with IP-based tracking
  const ip = request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "anonymous";

  const today = new Date().toISOString().split("T")[0];
  const usage = ipUsage.get(ip);

  if (!usage || usage.date !== today) {
    ipUsage.set(ip, { count: 1, date: today });
    return { allowed: true, tier: "free", remaining: 49, limit: 50, showWatermark: true };
  }

  if (usage.count >= 50) {
    return { allowed: false, tier: "free", remaining: 0, limit: 50, showWatermark: true };
  }

  usage.count++;
  return {
    allowed: true,
    tier: "free",
    remaining: 50 - usage.count,
    limit: 50,
    showWatermark: true,
  };
}
