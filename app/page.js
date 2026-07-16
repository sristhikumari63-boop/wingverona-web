'use client';
import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function HomeContent() {
  const searchParams = useSearchParams();
  const activeLane = searchParams.get('lane') || 'INTERNATIONAL';

  const [adWatched, setAdWatched] = useState(false);
  const [loadingAd, setLoadingAd] = useState(false);

  const pricing = activeLane === 'INDIA'
    ? { symbol: '₹', price: '149', label: 'Domestic Pass' }
    : { symbol: '$', price: '4.99', label: 'Global Pass' };

  const handleReceiptButtonClick = () => {
    if (adWatched) {
      document.getElementById('receipt-file-input').click();
      return;
    }
    setLoadingAd(true);
    setTimeout(() => {
      setLoadingAd(false);
      setAdWatched(true);
      alert("Advertisement complete! Your 'Drop a Receipt' upload canvas is unlocked.");
    }, 5000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .wv-root {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: #FFF9F4;
          color: #1A1025;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 56px 20px 80px;
        }

        .wv-blob-1, .wv-blob-2, .wv-blob-3 {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.55;
          z-index: 0;
        }
        .wv-blob-1 { width: 340px; height: 340px; background: #FF6FA5; top: -120px; left: -100px; }
        .wv-blob-2 { width: 300px; height: 300px; background: #7C5CFF; top: -60px; right: -120px; }
        .wv-blob-3 { width: 260px; height: 260px; background: #34E0A1; bottom: -100px; left: 40%; opacity: 0.35; }

        .wv-content { position: relative; z-index: 1; width: 100%; display: flex; flex-direction: column; align-items: center; }

        .wv-back { color: #6B5E73; text-decoration: none; font-size: 0.85rem; font-weight: 600; margin-bottom: 36px; transition: color 0.2s ease; }
        .wv-back:hover { color: #1A1025; }

        .wv-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.75rem; letter-spacing: 0.5px; text-transform: uppercase;
          color: #7C5CFF; font-weight: 700; background: #F0EBFF;
          padding: 6px 14px; border-radius: 999px; margin-bottom: 20px;
        }

        .wv-hero {
          font-family: 'Baloo 2', sans-serif;
          font-size: clamp(2.4rem, 7vw, 3.6rem);
          font-weight: 800; line-height: 1.08; text-align: center;
          max-width: 620px; margin: 0 0 16px; color: #1A1025;
        }
        .wv-hero .wv-highlight {
          background: linear-gradient(90deg, #FF6FA5, #7C5CFF);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }

        .wv-sub { color: #6B5E73; font-size: 1.05rem; text-align: center; max-width: 440px; margin-bottom: 44px; line-height: 1.55; font-weight: 500; }

        .wv-bubble-row { display: flex; gap: 8px; margin-bottom: 48px; }
        .wv-dot { width: 8px; height: 8px; border-radius: 50%; background: #C9BEDE; animation: wv-bounce 1.2s infinite ease-in-out; }
        .wv-dot:nth-child(2) { animation-delay: 0.15s; }
        .wv-dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes wv-bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-6px); opacity: 1; } }

        .wv-card { background: #FFFFFF; border: 2px solid #F0EBFF; border-radius: 24px; padding: 28px; width: 100%; max-width: 380px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(124, 92, 255, 0.08); }
        .wv-card-tag { display: inline-block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #FF6FA5; margin-bottom: 10px; }
        .wv-card h3 { font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 1.3rem; margin: 0 0 6px; color: #1A1025; }
        .wv-card p { color: #6B5E73; font-size: 0.88rem; margin: 0 0 20px; line-height: 1.5; font-weight: 500; }

        .wv-btn { width: 100%; border: none; border-radius: 14px; padding: 14px 24px; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .wv-btn:hover { transform: translateY(-1px) scale(1.01); }
        .wv-btn-muted { background: #F5F0FF; color: #7C5CFF; }
        .wv-btn-active { background: linear-gradient(90deg, #FF6FA5, #7C5CFF); color: #FFFFFF; box-shadow: 0 8px 20px rgba(255, 111, 165, 0.35); }

        .wv-mockdate { display: flex; align-items: center; gap: 12px; }
        .wv-avatar { width: 44px; height: 44px; border-radius: 14px; background: linear-gradient(135deg, #34E0A1, #7C5CFF); flex-shrink: 0; }

        .wv-pricing-card { background: linear-gradient(180deg, #1A1025, #2A1B3D); border-radius: 28px; padding: 40px 32px; width: 100%; max-width: 380px; text-align: center; box-shadow: 0 16px 40px rgba(26, 16, 37, 0.25); }
        .wv-badge { display: inline-block; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; color: #1A1025; background: linear-gradient(90deg, #34E0A1, #6FF0C0); padding: 5px 14px; border-radius: 999px; font-weight: 800; }
        .wv-plan-name { font-family: 'Baloo 2', sans-serif; font-size: 1.4rem; font-weight: 700; margin: 20px 0 4px; color: #FFF9F4; }
        .wv-price-row { display: flex; align-items: baseline; justify-content: center; gap: 4px; margin: 16px 0 26px; }
        .wv-price-symbol { font-size: 1.5rem; font-weight: 700; color: #FF6FA5; }
        .wv-price-amount { font-family: 'Baloo 2', sans-serif; font-size: 3.2rem; font-weight: 800; color: #FFF9F4; }

        .wv-cta { display: block; text-decoration: none; width: 100%; background: linear-gradient(90deg, #FF6FA5, #7C5CFF); color: #FFFFFF; padding: 16px; border-radius: 14px; font-size: 0.98rem; font-weight: 700; box-shadow: 0 10px 24px rgba(255, 111, 165, 0.3); transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .wv-cta:hover { transform: translateY(-2px) scale(1.01); box-shadow: 0 14px 32px rgba(255, 111, 165, 0.4); }

        @media (max-width: 420px) { .wv-hero { font-size: 2.1rem; } }
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
          <p className="wv-sub">
            Screenshot the convo, get the perfect reply, and practice the real date before it happens — all in one place.
          </p>

          <div className="wv-bubble-row">
            <div className="wv-dot"></div>
            <div className="wv-dot"></div>
            <div className="wv-dot"></div>
          </div>

          <div className="wv-card">
            <span className="wv-card-tag">Screenshot Scan</span>
            <h3>Drop a Receipt</h3>
            <p>Upload a chat screenshot for an instant strategy scan.</p>
            <button
              onClick={handleReceiptButtonClick}
              className={`wv-btn ${adWatched ? 'wv-btn-active' : 'wv-btn-muted'}`}
            >
              {loadingAd ? 'Streaming Ad Unit…' : adWatched ? 'Select Image File' : 'Watch Video Ad to Scan'}
            </button>
            <input
              id="receipt-file-input"
              type="file"
              accept="image/*"
              disabled={!adWatched}
              style={{ display: 'none' }}
              onChange={(e) => alert(`File staging complete: ${e.target.files?.[0]?.name}`)}
            />
          </div>

          <div className="wv-card wv-mockdate">
            <div className="wv-avatar"></div>
            <div>
              <span className="wv-card-tag">Practice Mode</span>
              <h3 style={{ marginBottom: 2 }}>Mock Date</h3>
              <p style={{ marginBottom: 0 }}>Talk it out with an AI before the real thing.</p>
            </div>
          </div>

          <div className="wv-pricing-card">
            <span className="wv-badge">{pricing.label}</span>
            <h2 className="wv-plan-name">Weekly Rizz Pass</h2>
            <div className="wv-price-row">
              <span className="wv-price-symbol">{pricing.symbol}</span>
              <span className="wv-price-amount">{pricing.price}</span>
            </div>
            <a href="/talking-stage" className="wv-cta">Enter the Talking Stage</a>
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
