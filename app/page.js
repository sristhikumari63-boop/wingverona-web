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
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .wv-root {
          min-height: 100vh;
          background:
            radial-gradient(circle at 50% 0%, rgba(232,167,152,0.10), transparent 55%),
            radial-gradient(circle at 85% 15%, rgba(212,175,55,0.06), transparent 45%),
            #0F1E17;
          color: #F5EFE6;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 64px 20px 80px;
        }

        .wv-back {
          color: #A8B8AC;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 48px;
          transition: color 0.2s ease;
        }
        .wv-back:hover { color: #F5EFE6; }

        .wv-eyebrow {
          font-size: 0.75rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #E8A798;
          font-weight: 600;
          margin-bottom: 18px;
        }

        .wv-hero {
          font-family: 'Fraunces', serif;
          font-size: clamp(2.6rem, 6vw, 4.2rem);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.02em;
          text-align: center;
          max-width: 720px;
          margin: 0 0 20px;
          color: #F5EFE6;
        }
        .wv-hero em {
          font-style: italic;
          font-weight: 500;
          color: #E8A798;
        }

        .wv-sub {
          color: #A8B8AC;
          font-size: 1.05rem;
          text-align: center;
          max-width: 480px;
          margin-bottom: 56px;
          line-height: 1.5;
        }

        .wv-card {
          background: rgba(245, 239, 230, 0.04);
          border: 1px solid rgba(245, 239, 230, 0.10);
          border-radius: 20px;
          padding: 32px;
          width: 100%;
          max-width: 380px;
          margin-bottom: 24px;
          backdrop-filter: blur(6px);
        }

        .wv-card h3 {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 1.3rem;
          margin: 0 0 8px;
          color: #F5EFE6;
        }
        .wv-card p {
          color: #A8B8AC;
          font-size: 0.88rem;
          margin: 0 0 24px;
          line-height: 1.5;
        }

        .wv-btn {
          width: 100%;
          border: none;
          border-radius: 10px;
          padding: 14px 24px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .wv-btn:hover { transform: translateY(-1px); }

        .wv-btn-muted {
          background: rgba(245, 239, 230, 0.08);
          color: #F5EFE6;
        }
        .wv-btn-active {
          background: linear-gradient(135deg, #E8A798, #D4877A);
          color: #12140F;
          box-shadow: 0 8px 24px rgba(232, 167, 152, 0.25);
        }

        .wv-pricing-card {
          background: linear-gradient(180deg, rgba(245,239,230,0.05), rgba(245,239,230,0.02));
          border: 1px solid rgba(212, 175, 55,
