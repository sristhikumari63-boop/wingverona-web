'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Home() {
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', color: '#0B0B0F', backgroundColor: '#F4F4F6' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', letterSpacing: '-1px', marginBottom: '8px', color: '#0B0B0F' }}>WingVerona</h1>
      <p style={{ color: '#55555A', fontSize: '1.1rem', marginBottom: '40px' }}>Your premium AI wingman framework.</p>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '32px', textAlign: 'center', border: '1px solid #D1D1D6', width: '100%', maxWidth: '360px', marginBottom: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h3 style={{ color: '#0B0B0F', margin: '0 0 8px 0' }}>Drop a Receipt</h3>
        <p style={{ color: '#55555A', fontSize: '0.85rem', marginBottom: '24px' }}>Upload chat screenshots for instant strategy scans.</p>
        <button onClick={handleReceiptButtonClick} style={{ backgroundColor: adWatched ? '#0A5C36' : '#E5E5EA', color: adWatched ? '#FFFFFF' : '#0B0B0F', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', width: '100%', transition: '0.2s' }}>
          {loadingAd ? "Streaming Ad Unit..." : adWatched ? "Select Image File" : "Watch Video Ad to Scan"}
        </button>
        <input id="receipt-file-input" type="file" accept="image/*" disabled={!adWatched} style={{ display: 'none' }} onChange={(e) => alert(`File staging complete: ${e.target.files?.[0]?.name}`)} />
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '360px', border: '1px solid #D1D1D6', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#FFFFFF', backgroundColor: '#0A5C36', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
          {pricing.label}
        </span>
        <h2 style={{ fontSize: '1.5rem', marginTop: '24px', marginBottom: '8px', color: '#0B0B0F' }}>Weekly Rizz Pass</h2>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', margin: '20px 0' }}>
          <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{pricing.symbol}</span>
          <span style={{ fontSize: '4rem', fontWeight: 'extrabold', marginLeft: '4px' }}>{pricing.price}</span>
        </div>
        <a href="/talking-stage" style={{ display: 'block', textDecoration: 'none', width: '90%', backgroundColor: '#0A5C36', color: '#FFFFFF', padding: '16px', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', margin: '0 auto', transition: '0.2s' }}>
          Enter the Talking Stage
        </a>
      </div>
    </div>
  );
}
