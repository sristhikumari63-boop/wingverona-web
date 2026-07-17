'use client';
import React, { useState } from 'react';

const COLORS = {
  bg: '#F8F9FA',
  secondary: '#E8F1F2',
  accent: '#7A4B71',
  text: '#3D3A3F',
  textMuted: '#6B6870',
  border: '#E2E5E1',
};

export default function Home() {
  const [chatInput, setChatInput] = useState('');
  const [showHomeScreenTip, setShowHomeScreenTip] = useState(false);
  const c = COLORS;

  return (
    <div style={{ minHeight: '100vh', background: c.bg, color: c.text, fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: `0.5px solid ${c.border}` }}>
        <span style={{ fontWeight: 700, fontSize: '17px', color: c.accent }}>WingVerona</span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a href="/pricing" style={{ fontSize: '13px', color: c.text, border: `0.5px solid ${c.border}`, padding: '7px 16px', borderRadius: '8px', textDecoration: 'none' }}>Pricing</a>
          <a href="/login" style={{ fontSize: '13px', color: c.text, border: `0.5px solid ${c.border}`, padding: '7px 16px', borderRadius: '8px', textDecoration: 'none' }}>Log in</a>
          <a href="/signup" style={{ fontSize: '13px', background: c.accent, color: '#FFF', padding: '7px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Start free trial</a>
        </div>
      </nav>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 57px)' }}>
        <aside style={{ width: '220px', borderRight: `0.5px solid ${c.border}`, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderRadius: '8px', fontSize: '13px', background: c.secondary, color: c.accent }}>
            <i className="ti ti-message-chatbot"></i> Wing Chat
          </div>

          <a href="/live-date" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderRadius: '8px', fontSize: '13px', color: c.text, textDecoration: 'none' }}>
            <svg width="18" height="18" viewBox="0 0 64 64" style={{ flexShrink: 0 }}>
              <path d="M4 40 C10 22 28 16 42 24 C37 25.5 34 29 35.5 34 C41 31 46.5 32.5 49.5 37.5 C40 44 27 44 18 40 C13 38 8 39.5 4 40 Z" fill={c.text} />
            </svg>
            Live Date
          </a>

          <div style={{ fontSize: '12px', color: c.textMuted, margin: '16px 0 4px' }}>Previous chats</div>
          <div style={{ fontSize: '13px', color: c.textMuted, padding: '6px 8px' }}>No chats yet</div>

          <div style={{ fontSize: '12px', color: c.textMuted, margin: '16px 0 4px' }}>Screenshot checks</div>
          <a href="/screenshots" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: c.accent, padding: '6px 8px', textDecoration: 'none' }}>
            <i className="ti ti-photo"></i> View all screenshots
          </a>

          <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: `0.5px solid ${c.border}`, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button onClick={() => setShowHomeScreenTip(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderRadius: '8px', fontSize: '13px', background: 'transparent', border: 'none', color: c.text, cursor: 'pointer', textAlign: 'left' }}>
              <i className="ti ti-download"></i> Add to home screen
            </button>
            <a href="/profile" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderRadius: '8px', fontSize: '13px', color: c.text, textDecoration: 'none' }}>
              <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: c.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#FFF' }}>P</span>
              Profile
            </a>
          </div>
        </aside>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', alignItems: 'center', justifyContent: 'center', gap: '12px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: c.accent, background: c.secondary, padding: '5px 14px', borderRadius: '999px' }}>Your AI wingman</span>
          <h1 style={{ fontSize: '28px', fontWeight: 700, maxWidth: '340px' }}>Stop overthinking your next text.</h1>
          <p style={{ fontSize: '14px', color: c.textMuted, maxWidth: '300px' }}>Skip the overthink. Skip the cringe.</p>

          <div style={{ width: '320px', marginTop: '16px', display: 'flex', gap: '8px', border: `0.5px solid ${c.border}`, borderRadius: '10px', padding: '6px' }}>
            <button aria-label="Attach screenshot" style={{ border: 'none', background: c.secondary, color: c.accent, borderRadius: '8px', width: '36px', height: '36px' }}>
              <i className="ti ti-paperclip"></i>
            </button>
            <input
              type="text"
              placeholder="You're on. Talk it out."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              style={{ flex: 1, border: 'none', background: 'transparent', color: c.text, outline: 'none' }}
            />
            <button aria-label="Send" style={{ border: 'none', background: c.accent, color: '#FFF', borderRadius: '8px', width: '36px', height: '36px' }}>
              <i className="ti ti-arrow-right"></i>
            </button>
          </div>
        </main>
      </div>

      {showHomeScreenTip && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }} onClick={() => setShowHomeScreenTip(false)}>
          <div style={{ background: c.bg, color: c.text, padding: '24px', borderRadius: '16px', maxWidth: '320px' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: '10px' }}>Add to home screen</h3>
            <p style={{ fontSize: '13px', color: c.textMuted, marginBottom: '8px' }}><strong>iPhone:</strong> Tap Share → Add to Home Screen</p>
            <p style={{ fontSize: '13px', color: c.textMuted, marginBottom: '16px' }}><strong>Android:</strong> Tap ⋮ menu → Add to Home Screen</p>
            <button onClick={() => setShowHomeScreenTip(false)} style={{ background: c.accent, color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: '8px', width: '100%' }}>Got it</button>
          </div>
        </div>
      )}
    </div>
  );
}
