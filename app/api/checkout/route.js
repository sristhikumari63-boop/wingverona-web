import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { PRICING_PLANS } from '../../../lib/pricing';

// Requires STRIPE_SECRET_KEY to be set in your Vercel project's Environment Variables.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe is not configured on the server yet.' }, { status: 500 });
  }

  const { lane, plan } = await request.json();
  const validLane = lane === 'INDIA' ? 'INDIA' : 'INTERNATIONAL';
  const validPlan = plan === 'weekly' ? 'weekly' : 'monthly';
  const selected = PRICING_PLANS[validLane][validPlan];

  const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || '';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: validLane === 'INDIA' ? 'inr' : 'usd',
            product_data: { name: `WingVerona ${validPlan} (${validLane})` },
            unit_amount: Math.round(parseFloat(selected.price) * 100),
            recurring: { interval: validPlan === 'weekly' ? 'week' : 'month' },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/?checkout=success`,
      cancel_url: `${origin}/pricing?checkout=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
