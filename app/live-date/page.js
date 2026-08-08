'use client';
import React from 'react';

const COLORS = { bg: '#F8F9FA', accent: '#7A4B71', text: '#3D3A3F', textMuted: '#6B6870', border: '#E2E5E1' };

export default function LiveDate() {
  const c = COLORS;
  return (
    <div style={{ minHeight: '100vh', background: c.bg, fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
      <div>
        <a href="/" style={{ fontSize: '14px', color: c.accent, textDecoration: 'none', fontWeight: 700 }}>← Back to WingVerona</a>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: c.text, margin: '18px 0 8px' }}>Live Date</h1>
        <p style={{ fontSize: '14px', color: c.textMuted, maxWidth: '320px' }}>
          This feature is coming soon. It'll use your plan's live date minutes to give real-time suggestions during a date.
        </p>
      </div>
    </div>
  );
}
