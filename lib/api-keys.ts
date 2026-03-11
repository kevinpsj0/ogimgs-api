import crypto from 'crypto';

const SECRET = process.env.API_KEY_SECRET || 'dev-secret-change-in-prod';

export type Tier = 'free' | 'starter' | 'growth' | 'scale';

export interface ApiKeyPayload {
  tier: Tier;
  keyId: string;
  createdAt: number;
  customerId?: string;
}

export function generateApiKey(tier: Tier, customerId?: string): string {
  const payload: ApiKeyPayload = {
    tier,
    keyId: crypto.randomUUID(),
    createdAt: Date.now(),
    customerId,
  };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
  return `ogk_${data}.${sig}`;
}

export function verifyApiKey(key: string): ApiKeyPayload | null {
  try {
    if (!key.startsWith('ogk_')) return null;
    const rest = key.slice(4);
    const dotIdx = rest.lastIndexOf('.');
    if (dotIdx === -1) return null;
    const data = rest.slice(0, dotIdx);
    const sig = rest.slice(dotIdx + 1);
    const expected = crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
    if (sig !== expected) return null;
    return JSON.parse(Buffer.from(data, 'base64url').toString());
  } catch {
    return null;
  }
}
