'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRICING_PLANS } from '../../lib/pricing';
import { theme as t } from '../../lib/theme';

export default function Paywall() {
  return (
    <Suspense fallback={null}>
      <PaywallContent />
    </Suspense>
  );
}

function PaywallContent() {
  const searchParams = useSearchParams();
  const lane = searchParams.get('lane') === 'INDIA' ? 'INDIA' : 'INTERNATIONAL';
  const monthly = PRICING_PLANS[lane].monthly;

  return (
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: t.bodyFont, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
      <div style={{ maxWidth: '360px' }}>
        <h1 style={{ fontFamily: t.displayFont, fontSize: '28px', fontWeight: 600, color: t.ivory, marginBottom: '10px' }}>You've hit your free trial limit</h1>
        <p style={{ fontSize: '14px', color: t.ivoryMuted, marginBottom: '26px', lineHeight: 1.6 }}>
          Upgrade to keep going — from {monthly.symbol}{monthly.price}{monthly.period}.
        </p>
        <a href="/pricing" style={{ display: 'inline-block', background: t.gold, color: t.ink, padding: '13px 30px', borderRadius: '999px', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>
          See plans
        </a>
      </div>
    </div>
  );
}
