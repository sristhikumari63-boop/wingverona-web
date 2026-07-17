'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const COLORS = { bg: '#F8F9FA', secondary: '#E8F1F2', accent: '#7A4B71', text: '#3D3A3F', textMuted: '#6B6870' };

export default function Pricing() {
  const searchParams = useSearchParams();
  const activeLane = searchParams.get('lane') || 'INTERNATIONAL';
  const [billingCycle, setBillingCycle] = useState('weekly');
  const c = COLORS;

  const PRICING = {
    INDIA: { weekly: { symbol: '₹', price: '149', period: '/week' }, monthly: { symbol: '₹', price: '499', period: '/month' } },
    INTERNATIONAL: { weekly: { symbol: '$', price: '4.99', period: '/week' }, monthly: { symbol: '$', price: '10.99', period: '/month' } },
  };
  const pricing = PRICING[activeLane][billingCycle];

  const features = [
    { icon: 'ti-message-chatbot', label: 'Unlimited Wing Chat' },
    { icon: 'ti-photo', label: 'Unlimited screenshot checks' },
    { icon: 'ti-cat', label: 'Unlimited Live Date sessions' },
    { icon: 'ti-flag', label: 'Full red flag and green flag breakdowns' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: c.bg, color: c.text, fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ maxWidth: '380px', width: '100%' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, textAlign: 'center', marginBottom: '6px', color: c.accent }}>Cheaper than one bad date.</h1>
        <p style={{ textAlign: 'center', fontSize: '13px', color: c.textMuted, marginBottom: '24px' }}>Everything you get with the Rizz Pass</p>

        <div style={{ display: 'flex', gap: '6px', background: c.secondary, borderRadius: '999px', padding: '4px', marginBottom: '24px' }}>
          <button onClick={() => setBillingCycle('weekly')} style={{ flex: 1, border: 'none', borderRadius: '999px', padding: '10px', fontSize: '13px', fontWeight: 600, background: billingCycle === 'weekly' ? c.accent : 'transparent', color: billingCycle === 'weekly' ? '#FFF' : c.text }}>Weekly</button>
          <button onClick={() => setBillingCycle('monthly')} style={{ flex: 1, border: 'none', borderRadius: '999px', padding: '10px', fontSize: '13px', fontWeight: 600, background: billingCycle === 'monthly' ? c.accent : 'transparent', color: billingCycle === 'monthly' ? '#FFF' : c.text }}>Monthly</button>
        </div>

        <div style={{ textAlign: 'center', fontSize: '40px', fontWeight: 700, color: c.accent, marginBottom: '24px' }}>
          {pricing.symbol}{pricing.price}<span style={{ fontSize: '15px', color: c.textMuted }}>{pricing.period}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          {features.map((f) => (
            <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: c.secondary, padding: '12px 14px', borderRadius: '10px', fontSize: '13px' }}>
              <i className={`ti ${f.icon}`} style={{ color: c.accent }}></i>
              {f.label}
            </div>
          ))}
        </div>

        <a href="/signup" style={{ display: 'block', textAlign: 'center', background: c.accent, color: '#FFF', padding: '14px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none' }}>Start free trial</a>
      </div>
    </div>
  );
}
