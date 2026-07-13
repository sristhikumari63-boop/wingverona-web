'use client';
import React, { useState } from 'react';

export default function TalkingStage() {
  const [selectedVoice, setSelectedVoice] = useState('af_bella');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#F4F4F6', color: '#0B0B0F', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Dynamic Back Navigation Link */}
      <a href="/" style={{ color: '#55555A', textDecoration: 'none', marginBottom: '40px', fontSize: '0.9rem', fontWeight: 'bold' }}>
        ← Exit Date Session
      </a>

      {/* Main Voice Calling Hub Panel */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '40px', width: '100%', maxWidth: '400px', border: '1px solid #D1D1D6', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
        
        {/* Visual Pulse Indicator - Solid Royal Green */}
        <div style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: '#0A5C36', borderRadius: '50%', marginBottom: '16px' }}></div>
        
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 8px 0', color: '#0B0B0F' }}>The Talking Stage</h2>
        <p style={{ color: '#55555A', fontSize: '0.9rem', marginBottom: '32px' }}>Real-Time Voice Simulation Pipeline</p>
        
        {/* Custom Star Voice Choice Modality Dropdown */}
        <div style={{ margin: '20px 0 32px 0', textAlign: 'left' }}>
          <label style={{ display: 'block', color: '#55555A', fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.5px' }}>
            Partner Voice Profile:
          </label>
          <select value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)} style={{ backgroundColor: '#F4F4F6', color: '#0B0B0F', border: '1px solid #D1D1D6', padding: '12px', borderRadius: '8px', width: '100%', cursor: 'pointer', fontSize: '0.95rem', outline: 'none' }}>
            <option value="af_bella">Standard Female Accent (Bella)</option>
            <option value="am_adam">Standard Male Accent (Adam)</option>
            <option value="star_movie_female">Celebrity Film Star Profile A (Female)</option>
            <option value="star_movie_male">Celebrity Film Star Profile B (Male)</option>
          </select>
        </div>

        {/* Large Premium Circular Microphone Button - Royal Green High-Utility Accent Anchor */}
        <button style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#0A5C36', color: '#FFFFFF', border: 'none', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 8px 16px rgba(10,92,54,0.3)', marginBottom: '32px', transition: '0.2s' }}>
          Start Call
        </button>

        <p style={{ color: '#55555A', fontSize: '0.85rem', lineHeight: '1.4' }}>
          All voice data generated inside this secure session is completely wiped automatically after 15 days.
        </p>
      </div>

    </div>
  );
}
