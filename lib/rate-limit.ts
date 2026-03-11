import { NextRequest } from 'next/server';
import { verifyApiKey, type Tier } from './api-keys';
import { TIER_LIMITS } from './stripe-config';

export interface RateLimitResult {
  allowed: boolean;
  tier: Tier;
  limit: number;
  remaining?: number;
  showWatermark: boolean;
  allowedTemplates: string[];
}

// Simple in-memory usage tracker (resets on cold start, good enough for MVP)
const usageMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(request: NextRequest): RateLimitResult {
  const apiKey = request.headers.get('x-api-key') ||
    request.nextUrl.searchParams.get('api_key') ||
    request.nextUrl.searchParams.get('_preview_key');

  if (apiKey) {
    const payload = verifyApiKey(apiKey);
    if (!payload) {
      return {
        allowed: false,
        tier: 'free',
        limit: 0,
        showWatermark: true,
        allowedTemplates: [],
      };
    }
    const limits = TIER_LIMITS[payload.tier];
    // For paid tiers, trust the key (soft limit for MVP)
    return {
      allowed: true,
      tier: payload.tier,
      limit: limits.limit,
      showWatermark: limits.watermark,
      allowedTemplates: limits.templates,
    };
  }

  // Free tier: IP-based rate limit
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';
  const now = Date.now();
  const resetAt = new Date().setHours(24, 0, 0, 0);

  const usage = usageMap.get(ip) || { count: 0, resetAt };
  if (now > usage.resetAt) {
    usage.count = 0;
    usage.resetAt = new Date().setHours(24, 0, 0, 0);
  }

  usage.count++;
  usageMap.set(ip, usage);

  const freeLimits = TIER_LIMITS.free;
  return {
    allowed: usage.count <= freeLimits.limit,
    tier: 'free',
    limit: freeLimits.limit,
    remaining: Math.max(0, freeLimits.limit - usage.count),
    showWatermark: true,
    allowedTemplates: freeLimits.templates,
  };
}
