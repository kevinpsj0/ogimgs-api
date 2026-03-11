import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { generateApiKey, type Tier } from '@/lib/api-keys';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// GET: Called by Stripe after successful checkout
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id');
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price'],
    });

    if (session.payment_status !== 'paid' && session.status !== 'complete') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 402 });
    }

    const priceId = (session.line_items?.data[0]?.price as Stripe.Price | undefined)?.id;
    const tier = getTierFromPriceId(priceId || '');
    const apiKey = generateApiKey(tier, session.customer as string);

    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Your API Key — ogimgs</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: system-ui, sans-serif; max-width: 600px; margin: 80px auto; padding: 20px; color: #111; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    .tier { display: inline-block; background: #6366f1; color: white; padding: 2px 10px; border-radius: 999px; font-size: 0.85rem; text-transform: capitalize; margin-bottom: 1rem; }
    .key { background: #f4f4f4; padding: 16px; border-radius: 8px; font-family: monospace; word-break: break-all; font-size: 14px; border: 1px solid #e0e0e0; }
    .note { color: #555; font-size: 0.9rem; margin-top: 1rem; }
    a { color: #6366f1; }
  </style>
</head>
<body>
  <h1>🎉 You're all set!</h1>
  <span class="tier">${tier}</span>
  <p>Your API key:</p>
  <div class="key">${apiKey}</div>
  <p class="note">⚠️ Save this key now — it won't be shown again.</p>
  <p class="note">Use it as the <code>x-api-key</code> header in your requests.</p>
  <p><a href="https://ogimage-api.vercel.app">← Back to docs</a></p>
</body>
</html>`;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST: Admin/manual key generation (keep for backward compat)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tier = 'free', customerId } = body;

    const validTiers: Tier[] = ['free', 'starter', 'growth', 'scale'];
    if (!validTiers.includes(tier)) {
      return NextResponse.json(
        { error: `Invalid tier. Must be one of: ${validTiers.join(', ')}` },
        { status: 400 }
      );
    }

    const apiKey = generateApiKey(tier as Tier, customerId);

    return NextResponse.json({
      success: true,
      apiKey,
      tier,
      message: "Store this API key securely — it won't be shown again.",
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function getTierFromPriceId(priceId: string): 'starter' | 'growth' | 'scale' {
  const map: Record<string, 'starter' | 'growth' | 'scale'> = {
    [process.env.STRIPE_PRICE_STARTER!]: 'starter',
    [process.env.STRIPE_PRICE_GROWTH!]: 'growth',
    [process.env.STRIPE_PRICE_SCALE!]: 'scale',
  };
  return map[priceId] || 'starter';
}
