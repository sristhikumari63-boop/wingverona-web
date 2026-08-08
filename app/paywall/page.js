'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRICING_PLANS } from '../../lib/pricing';

const COLORS = { bg: '#F8F9FA', accent: '#7A4B71', text: '#3D3A3F', textMuted: '#6B6870', border: '#E2E5E1' };

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
  const c = COLORS;

  return (
    <div style={{ minHeight: '100vh', background: c.bg, fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
      <div style={{ maxWidth: '360px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: c.text, marginBottom: '8px' }}>You've hit your free trial limit</h1>
        <p style={{ fontSize: '14px', color: c.textMuted, marginBottom: '24px' }}>
          Upgrade to keep going — from {monthly.symbol}{monthly.price}{monthly.period}.
        </p>
        <a href="/pricing" style={{ display: 'inline-block', background: c.accent, color: '#FFF', padding: '12px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>
          See plans
        </a>
      </div>
    </div>
  );
}
