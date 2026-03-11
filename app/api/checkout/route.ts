import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { STRIPE_CONFIG } from '@/lib/stripe-config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  try {
    const { plan } = await request.json();

    const priceId = STRIPE_CONFIG.prices[plan as keyof typeof STRIPE_CONFIG.prices];
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400, headers: CORS_HEADERS });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/keys/generate?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?cancelled=true`,
    });

    return NextResponse.json({ url: session.url }, { headers: CORS_HEADERS });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500, headers: CORS_HEADERS });
  }
}
