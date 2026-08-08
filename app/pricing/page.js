'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRICING_PLANS, FREE_TRIAL_LIMITS } from '../../lib/pricing';
import { theme as t } from '../../lib/theme';

export default function Pricing() {
  return (
    <Suspense fallback={null}>
      <PricingContent />
    </Suspense>
  );
}

function PricingContent() {
  const searchParams = useSearchParams();
  const lane = searchParams.get('lane') === 'INDIA' ? 'INDIA' : 'INTERNATIONAL';
  const plans = PRICING_PLANS[lane];

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
    <div className="plan-card" style={{
      flex: 1, minWidth: '250px', background: highlight
        ? `linear-gradient(165deg, ${t.surfaceRaised}, ${t.surfaceSolid})`
        : t.surfaceSolid,
      border: `1px solid ${highlight ? t.gold : t.line}`,
      borderRadius: '20px', padding: '30px', textAlign: 'left', position: 'relative',
      boxShadow: highlight ? t.shadow : t.shadowSoft,
    }}>
      {highlight && (
        <span style={{ position: 'absolute', top: '-12px', right: '24px', background: t.gold, color: t.ink, fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px', padding: '4px 12px', borderRadius: '999px' }}>
          Most chosen
        </span>
      )}
      <h3 style={{ fontFamily: t.bodyFont, fontSize: '12px', color: t.ivoryMuted, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>
        {planKey === 'weekly' ? 'Weekly' : 'Monthly'}
      </h3>
      <p style={{ fontFamily: t.displayFont, fontSize: '38px', fontWeight: 600, color: t.ivory, marginBottom: '20px' }}>
        {plan.symbol}{plan.price} <span style={{ fontFamily: t.bodyFont, fontSize: '14px', color: t.ivoryMuted, fontWeight: 400 }}>{plan.period}</span>
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: t.ivoryMuted, display: 'flex', flexDirection: 'column', gap: '11px' }}>
        <li>· {plan.questions} questions / period</li>
        <li>· {plan.screenshots} screenshot checks / period</li>
        <li>· {plan.liveDateMinutesPerDay > 0 ? `${plan.liveDateMinutesPerDay} live date minutes / day` : 'No live date access'}</li>
      </ul>
      <button
        onClick={() => startCheckout(planKey)}
        disabled={checkoutLoading === planKey}
        style={{
          display: 'block', width: '100%', marginTop: '26px', textAlign: 'center',
          background: highlight ? t.gold : 'transparent',
          color: highlight ? t.ink : t.goldSoft,
          border: highlight ? 'none' : `1px solid ${t.line}`,
          padding: '13px', borderRadius: '999px', cursor: 'pointer', fontWeight: 600, fontSize: '14px', fontFamily: t.bodyFont,
        }}
      >
        {checkoutLoading === planKey ? 'Redirecting…' : `Choose ${planKey === 'weekly' ? 'Weekly' : 'Monthly'}`}
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: t.bodyFont, padding: '50px 20px', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .plan-card { transition: transform 0.3s cubic-bezier(.2,.8,.3,1), box-shadow 0.3s ease; }
        .plan-card:hover { transform: perspective(800px) rotateX(2deg) translateY(-6px); }
        @media (prefers-reduced-motion: reduce) { .plan-card { transition: none; } .plan-card:hover { transform: none; } }
      `}</style>
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-8%', left: '50%', transform: 'translateX(-50%)',
        width: '560px', height: '560px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,162,75,0.12) 0%, rgba(201,162,75,0) 70%)', pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <a href="/" style={{ fontFamily: t.displayFont, fontSize: '16px', color: t.goldSoft, textDecoration: 'none', fontWeight: 600, fontStyle: 'italic' }}>WingVerona</a>
        <h1 style={{ fontFamily: t.displayFont, fontSize: '36px', fontWeight: 600, color: t.ivory, margin: '20px 0 10px' }}>Simple, honest pricing</h1>
        <p style={{ fontSize: '14px', color: t.ivoryMuted, marginBottom: '6px' }}>
          Prices shown for {lane === 'INDIA' ? 'India' : 'International'}.
        </p>
        <p style={{ fontSize: '13px', color: t.ivoryMuted, opacity: 0.8, marginBottom: '40px' }}>
          Free trial: {FREE_TRIAL_LIMITS.messagesPerDay} messages/day, {FREE_TRIAL_LIMITS.screenshotsPerDay} screenshot/day.
        </p>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <Card planKey="weekly" plan={plans.weekly} />
          <Card planKey="monthly" plan={plans.monthly} highlight />
        </div>
        {checkoutError && <p style={{ color: '#E08A8A', fontSize: '14px', marginTop: '18px' }}>{checkoutError}</p>}
      </div>
    </div>
  );
}
