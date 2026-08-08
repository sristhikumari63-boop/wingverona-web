'use client';
import React from 'react';
import { theme as t } from '../../lib/theme';

export default function Screenshots() {
  return (
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: t.bodyFont, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
      <div>
        <a href="/" style={{ fontSize: '13px', color: t.goldSoft, textDecoration: 'none', fontWeight: 600 }}>← Back to WingVerona</a>
        <h1 style={{ fontFamily: t.displayFont, fontSize: '28px', fontWeight: 600, color: t.ivory, margin: '18px 0 10px' }}>Screenshot checks</h1>
        <p style={{ fontSize: '14px', color: t.ivoryMuted, maxWidth: '320px', lineHeight: 1.6 }}>No screenshots yet. Attach one from the chat on the home page to see it here.</p>
      </div>
    </div>
  );
}
