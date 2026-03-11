export const STRIPE_CONFIG = {
  secretKey: process.env.STRIPE_SECRET_KEY!,
  prices: {
    starter: process.env.STRIPE_PRICE_STARTER!, // $9/mo
    growth: process.env.STRIPE_PRICE_GROWTH!,   // $29/mo
    scale: process.env.STRIPE_PRICE_SCALE!,     // $99/mo
  }
};

export const TIER_LIMITS = {
  free:    { limit: 100,    watermark: true,  templates: ['default', 'minimal'] },
  starter: { limit: 5000,   watermark: false, templates: ['default', 'minimal', 'blog', 'product'] },
  growth:  { limit: 25000,  watermark: false, templates: ['default', 'minimal', 'blog', 'product'] },
  scale:   { limit: 100000, watermark: false, templates: ['default', 'minimal', 'blog', 'product'] },
};
