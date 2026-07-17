'use client';
import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRICING_PLANS } from '@/lib/pricing';

const COLORS = { bg: '#F8F9FA', secondary: '#E8F1F2', accent: '#7A4B71', text: '#3D3A3F', textMuted: '#6B6870' };

function PricingContent() {
  const searchParams = useSearchParams();
  const activeLane = searchParams.get('lane') || 'INTERNATIONAL';
  const [billingCycle, setBillingCycle] = useState('weekly');
  const c = COLORS;
  const pricing = PRICING_PLANS[activeLane][billingCycle];

  const features = [
    { icon: 'ti-message-chatbot', label: `${pricing.questions} questions` },
    { icon: 'ti-photo', label: `${pricing.screenshots} screenshot checks` },
    { icon: 'ti-heart', label: `${pricing.liveDateMinutesPerDay} min Live Date, every day` },
    { icon: 'ti-flag', label: 'Red flag and green flag breakdowns' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: c.bg, color: c.text, fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ maxWidth: '420px', width: '100%' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, textAlign: 'center', marginBottom: '8px', color: c.accent }}>Cheaper than one bad date.</h1>
        <p style={{ textAlign: 'center', fontSize: '16px', color: c.textMuted, marginBottom: '26px' }}>Everything you get with the Rizz Pass</p>

        <div style={{ display: 'flex', gap: '8px', background: c.secondary, borderRadius: '999px', padding: '6px', marginBottom: '26px' }}>
          <button onClick={() => setBillingCycle('weekly')} style={{ flex: 1, border: 'none', borderRadius: '999px', padding: '12px', fontSize: '16px', fontWeight: 700, background: billingCycle === 'weekly' ? c.accent : 'transparent', color: billingCycle === 'weekly' ? '#FFF' : c.text }}>Weekly</button>
          <button onClick={() => setBillingCycle('monthly')} style={{ flex: 1, border: 'none', borderRadius: '999px', padding: '12px', fontSize: '16px', fontWeight: 700, background: billingCycle === 'monthly' ? c.accent : 'transparent', color: billingCycle === 'monthly' ? '#FFF' : c.text }}>Monthly</button>
        </div>

        <div style={{ textAlign: 'center', fontSize: '48px', fontWeight: 800, color: c.accent, marginBottom: '26px' }}>
          {pricing.symbol}{pricing.price}<span style={{ fontSize: '18px', color: c.textMuted }}>{pricing.period}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '26px' }}>
          {features.map((f) => (
            <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: c.secondary, padding: '14px 16px', borderRadius: '12px', fontSize: '16px' }}>
              <i className={`ti ${f.icon}`} style={{ color: c.accent, fontSize: '22px' }}></i>
              {f.label}
            </div>
          ))}
        </div>

        <a href="/signup" style={{ display: 'block', textAlign: 'center', background: c.accent, color: '#FFF', padding: '16px', borderRadius: '12px', fontSize: '17px', fontWeight: 700, textDecoration: 'none' }}>Start free trial</a>
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <Suspense fallback={null}>
      <PricingContent />
    </Suspense>
  );
}
