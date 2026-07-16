'use client';
import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function HomeContent() {
  const searchParams = useSearchParams();
  const activeLane = searchParams.get('lane') || 'INTERNATIONAL';

  const [billingCycle, setBillingCycle] = useState('monthly');
  const [chatInput, setChatInput] = useState('');

  const PRICING = {
    INDIA: { weekly: { symbol: '₹', price: '149', period: '/week' }, monthly: { symbol: '₹', price: '499', period: '/month' } },
    INTERNATIONAL: { weekly: { symbol: '$', price: '4.99', period: '/week' }, monthly: { symbol: '$', price: '10.99', period: '/month' } },
  };
  const pricing = PRICING[activeLane][billingCycle];

  const handleAttachClick = () => {
    document.getElementById('screenshot-input').click();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .wv-root { min-height: 100vh; position: relative; overflow: hidden; background: #FFF9F4; color: #1A1025; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; align-items: center; padding: 56px 20px 80px; }

        .wv-blob-1, .wv-blob-2, .wv-blob-3 { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.55; z-index: 0; }
        .wv-blob-1 { width: 340px; height: 340px; background: #FF6FA5; top: -120px; left: -100px; }
        .wv-blob-2 { width: 300px; height: 300px; background: #7C5CFF; top: -60px; right: -120px; }
        .wv-blob-3 { width: 260px; height: 260px; background: #34E0A1; bottom: -100px; left: 40%; opacity: 0.35; }

        .wv-content { position: relative; z-index: 1; width: 100%; max-width: 420px; display: flex; flex-direction: column; align-items: center; }

        .wv-back { color: #6B5E73; text-decoration: none; font-size: 0.85rem; font-weight: 600; margin-bottom: 32px; align-self: flex-start; }
        .wv-back:hover { color: #1A1025; }

        .wv-eyebrow { display: inline-flex; align-items: center; gap: 6px; font-size: 0.75rem; letter-spacing: 0.5px; text-transform: uppercase; color: #7C5CFF; font-weight: 700; background: #F0EBFF; padding: 6px 14px; border-radius: 999px; margin-bottom: 20px; }

        .wv-hero { font-family: 'Baloo 2', sans-serif; font-size: clamp(2.2rem, 7vw, 3.2rem); font-weight: 800; line-height: 1.1; text-align: center; margin: 0 0 14px; color: #1A1025; }
        .wv-hero .wv-highlight { background: linear-gradient(90deg, #FF6FA5, #7C5CFF); -webkit-background-clip: text; background-clip: text; color: transparent; }

        .wv-diff-line { font-family: 'Baloo 2', sans-serif; font-size: 1.05rem; font-weight: 600; text-align: center; color: #1A1025; background: #FFFFFF; border: 2px solid #F0EBFF; border-radius: 18px; padding: 16px 20px; margin-bottom: 40px; max-width: 380px; box-shadow: 0 8px 20px rgba(124, 92, 255, 0.08); }
        .wv-diff-line em { font-style: normal; color: #FF6FA5; }

        .wv-section-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #A896C7; margin: 8px 0 14px; align-self: flex-start; }

        .wv-chat-card { background: #FFFFFF; border: 2px solid #F0EBFF; border-radius: 24px; padding: 24px; width: 100%; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(124, 92, 255, 0.08); }
        .wv-chat-card h3 { font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 1.3rem; margin: 0 0 4px; color: #1A1025; }
        .wv-chat-card p.wv-tagline { color: #6B5E73; font-size: 0.88rem; margin: 0 0 18px; font-weight: 500; }

        .wv-chat-box { display: flex; align-items: center; gap: 8px; background: #F5F0FF; border-radius: 16px; padding: 8px 8px 8px 16px; }
        .wv-chat-box input[type="text"] { flex: 1; border: none; background: transparent; outline: none; font-family: 'Inter', sans-serif; font-size: 0.92rem; color: #1A1025; }
        .wv-chat-box input[type="text"]::placeholder { color: #A896C7; }
        .wv-attach-btn { width: 38px; height: 38px; border-radius: 12px; border: none; background: #FFFFFF; color: #7C5CFF; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform 0.15s ease; }
        .wv-attach-btn:hover { transform: scale(1.08); }
        .wv-send-btn { width: 38px; height: 38px; border-radius: 12px; border: none; background: linear-gradient(135deg, #FF6FA5, #7C5CFF); color: #FFFFFF; font-size: 1rem; cursor: pointer; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }

        .wv-card { background: #FFFFFF; border: 2px solid #F0EBFF; border-radius: 24px; padding: 24px; width: 100%; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(124, 92, 255, 0.08); display: flex; align-items: center; gap: 14px; }
        .wv-avatar { width: 46px; height: 46px; border-radius: 14px; background: linear-gradient(135deg, #34E0A1, #7C5CFF); flex-shrink: 0; }
        .wv-card h3 { font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 1.2rem; margin: 0 0 2px; color: #1A1025; }
        .wv-card p { color: #6B5E73; font-size: 0.86rem; margin: 0; font-weight: 500; }

        .wv-divider { width: 100%; height: 1px; background: #F0EBFF; margin: 28px 0 24px; }

        .wv-pricing-card { background: linear-gradient(180deg, #1A1025, #2A1B3D); border-radius: 28px; padding: 36px 30px; width: 100%; text-align: center; box-shadow: 0 16px 40px rgba(26, 16, 37, 0.25); }
        .wv-toggle { display: flex; gap: 6px; margin-bottom: 20px; background: rgba(255,255,255,0.08); border-radius: 999px; padding: 4px; }
        .wv-toggle button { flex: 1; border: none; border-radius: 999px; padding: 8px 14px; font-weight: 700; font-size: 0.82rem; cursor: pointer; background: transparent; color: #C9BEDE; }
        .wv-toggle button.active { background: linear-gradient(90deg, #FF6FA5, #7C5CFF); color: #FFFFFF; }

        .wv-badge { display: inline-block; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; color: #1A1025; background: linear-gradient(90deg, #34E0A1, #6FF0C0); padding: 5px 14px; border-radius: 999px; font-weight: 800; }
        .wv-plan-name { font-family: 'Baloo 2', sans-serif; font-size: 1.3rem; font-weight: 700; margin: 18px 0 4px; color: #FFF9F4; }
        .wv-price-row { display: flex; align-items: baseline; justify-content: center; gap: 4px; margin: 14px 0 24px; }
        .wv-price-symbol { font-size: 1.4rem; font-weight: 700; color: #FF6FA5; }
        .wv-price-amount { font-family: 'Baloo 2', sans-serif; font-size: 3rem; font-weight: 800; color: #FFF9F4; }
        .wv-price-period { color: #C9BEDE; font-size: 0.9rem; font-weight: 600; margin-left: 2px; }

        .wv-cta { display: block; text-decoration: none; width: 100%; background: linear-gradient(90deg, #FF6FA5, #7C5CFF); color: #FFFFFF; padding: 16px; border-radius: 14px; font-size: 0.98rem; font-weight: 700; box-shadow: 0 10px 24px rgba(255, 111, 165, 0.3); }
        .wv-cta:hover { transform: translateY(-2px); }

        @media (max-width: 420px) { .wv-hero { font-size: 1.9rem; } }
      `}</style>

      <div className="wv-root">
        <div className="wv-blob-1"></div>
        <div className="wv-blob-2"></div>
        <div className="wv-blob-3"></div>

        <div className="wv-content">
          <a href="/" className="wv-back">← Exit Date Session</a>

          <div className="wv-eyebrow">💬 Your AI Wingman</div>
          <h1 className="wv-hero">
            Stop overthinking<br />your <span className="wv-highlight">next text</span>.
          </h1>

          <div className="wv-diff-line">
            The AI that saves you from overthinking — and <em>embarrassing yourself</em> in front of your crush.
          </div>

          <div className="wv-section-label">Ask Your Wing</div>
          <div className="wv-chat-card">
            <h3>Text smarter. Date better.</h3>
            <p className="wv-tagline">Drop a chat. Get the move.</p>
            <div className="wv-chat-box">
              <button className="wv-attach-btn" onClick={handleAttachClick} title="Attach a screenshot">📎</button>
              <input
                type="text"
                placeholder="Ask anything, or attach a screenshot…"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button className="wv-send-btn" title="Send">➤</button>
            </div>
            <input id="screenshot-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => alert(`Screenshot attached: ${e.target.files?.[0]?.name}`)} />
          </div>

          <div className="wv-section-label">Practice Mode</div>
          <div className="wv-card">
            <div className="wv-avatar"></div>
            <div>
              <h3>Dry Run</h3>
              <p>Rehearse it. Get the honest recap after.</p>
            </div>
          </div>

          <div className="wv-divider"></div>

          <div className="wv-pricing-card">
            <div className="wv-toggle">
              <button className={billingCycle === 'weekly' ? 'active' : ''} onClick={() => setBillingCycle('weekly')}>Weekly</button>
              <button className={billingCycle === 'monthly' ? 'active' : ''} onClick={() => setBillingCycle('monthly')}>Monthly</button>
            </div>
            <span className="wv-badge">{activeLane === 'INDIA' ? 'Domestic Pass' : 'Global Pass'}</span>
            <h2 className="wv-plan-name">Rizz Pass</h2>
            <div className="wv-price-row">
              <span className="wv-price-symbol">{pricing.symbol}</span>
              <span className="wv-price-amount">{pricing.price}</span>
              <span className="wv-price-period">{pricing.period}</span>
            </div>
            <a href="/talking-stage" className="wv-cta">Start Your Dry Run</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
