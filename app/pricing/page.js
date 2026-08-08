'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { PRICING_PLANS, FREE_TRIAL_LIMITS } from '../../lib/pricing';

const COLORS = { bg: '#F8F9FA', secondary: '#E8F1F2', accent: '#7A4B71', text: '#3D3A3F', textMuted: '#6B6870', border: '#E2E5E1' };

export default function Pricing() {
  const searchParams = useSearchParams();
  const lane = searchParams.get('lane') === 'INDIA' ? 'INDIA' : 'INTERNATIONAL';
  const plans = PRICING_PLANS[lane];
  const c = COLORS;

  const [checkoutError, setCheckoutError] = React.useState('');
  const [checkoutLoading, setCheckoutLoading] = React.useState('');

  const startCheckout = async (planKey) => {
    setCheckoutError('');
    setCheckoutLoading(planKey);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lane, plan: planKey }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      window.location.href = data.url;
    } catch (err) {
      setCheckoutError(err.message);
    } finally {
      setCheckoutLoading('');
    }
  };

  const Card = ({ planKey, plan, highlight }) => (
    <div style={{
      flex: 1, minWidth: '260px', background: '#FFFFFF', border: `1px solid ${highlight ? c.accent : c.border}`,
      borderRadius: '18px', padding: '28px', textAlign: 'left',
    }}>
      <h3 style={{ fontSize: '15px', color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
        {planKey === 'weekly' ? 'Weekly' : 'Monthly'}
      </h3>
      <p style={{ fontSize: '32px', fontWeight: 800, color: c.text, marginBottom: '18px' }}>
        {plan.symbol}{plan.price} <span style={{ fontSize: '15px', color: c.textMuted, fontWeight: 500 }}>{plan.period}</span>
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: c.text, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>{plan.questions} questions / period</li>
        <li>{plan.screenshots} screenshot checks / period</li>
        <li>{plan.liveDateMinutesPerDay > 0 ? `${plan.liveDateMinutesPerDay} live date minutes / day` : 'No live date access'}</li>
      </ul>
      <button
        onClick={() => startCheckout(planKey)}
        disabled={checkoutLoading === planKey}
        style={{
          display: 'block', width: '100%', marginTop: '22px', textAlign: 'center', background: highlight ? c.accent : c.secondary,
          color: highlight ? '#FFF' : c.accent, padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px',
        }}
      >
        {checkoutLoading === planKey ? 'Redirecting…' : `Choose ${planKey === 'weekly' ? 'Weekly' : 'Monthly'}`}
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: c.bg, fontFamily: 'Inter, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
        <a href="/" style={{ fontSize: '15px', color: c.accent, textDecoration: 'none', fontWeight: 700 }}>WingVerona</a>
        <h1 style={{ fontSize: '30px', fontWeight: 800, color: c.text, margin: '18px 0 8px' }}>Simple pricing</h1>
        <p style={{ fontSize: '15px', color: c.textMuted, marginBottom: '8px' }}>
          Prices shown for {lane === 'INDIA' ? 'India' : 'International'}.
        </p>
        <p style={{ fontSize: '13px', color: c.textMuted, marginBottom: '32px' }}>
          Free trial: {FREE_TRIAL_LIMITS.messagesPerDay} messages/day, {FREE_TRIAL_LIMITS.screenshotsPerDay} screenshot/day.
        </p>
        <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
          <Card planKey="weekly" plan={plans.weekly} />
          <Card planKey="monthly" plan={plans.monthly} highlight />
        </div>
        {checkoutError && <p style={{ color: '#D9534F', fontSize: '14px', marginTop: '16px' }}>{checkoutError}</p>}
      </div>
    </div>
  );
}
