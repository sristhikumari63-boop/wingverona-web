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
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 32px', borderBottom: `1px solid ${c.border}` }}>
        <span style={{ fontWeight: 800, fontSize: '24px', color: c.accent }}>WingVerona</span>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <a href="/pricing" style={{ fontSize: '16px', color: c.text, border: `1px solid ${c.border}`, padding: '10px 22px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600 }}>Pricing</a>
          <a href="/login" style={{ fontSize: '16px', color: c.text, border: `1px solid ${c.border}`, padding: '10px 22px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600 }}>Log in</a>
          <a href="/signup" style={{ fontSize: '16px', background: c.accent, color: '#FFF', padding: '10px 24px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 }}>Start free trial</a>
        </div>
      </nav>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 77px)' }}>
        <aside style={{ width: '280px', borderRight: `1px solid ${c.border}`, padding: '24px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '12px', fontSize: '17px', fontWeight: 600, background: c.secondary, color: c.accent }}>
            <i className="ti ti-message-chatbot" style={{ fontSize: '22px' }}></i> Wing Chat
          </div>

          <a href="/live-date" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '12px', fontSize: '17px', fontWeight: 600, color: c.text, textDecoration: 'none' }}>
            <svg width="24" height="24" viewBox="0 0 64 64" style={{ flexShrink: 0 }}>
              <path d="M4 40 C10 22 28 16 42 24 C37 25.5 34 29 35.5 34 C41 31 46.5 32.5 49.5 37.5 C40 44 27 44 18 40 C13 38 8 39.5 4 40 Z" fill={c.text} />
            </svg>
            Live Date
          </a>

          <div style={{ fontSize: '15px', fontWeight: 600, color: c.textMuted, margin: '22px 0 8px' }}>Previous chats</div>
          <div style={{ fontSize: '16px', color: c.textMuted, padding: '10px 14px' }}>No chats yet</div>

          <div style={{ fontSize: '15px', fontWeight: 600, color: c.textMuted, margin: '22px 0 8px' }}>Screenshot checks</div>
          <a href="/screenshots" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', fontWeight: 600, color: c.accent, padding: '10px 14px', textDecoration: 'none' }}>
            <i className="ti ti-photo" style={{ fontSize: '20px' }}></i> View all screenshots
          </a>

          <div style={{ marginTop: 'auto', paddingTop: '18px', borderTop: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={() => setShowHomeScreenTip(true)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '12px', fontSize: '16px', fontWeight: 600, background: 'transparent', border: 'none', color: c.text, cursor: 'pointer', textAlign: 'left' }}>
              <i className="ti ti-download" style={{ fontSize: '20px' }}></i> Add to home screen
            </button>
            <a href="/profile" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '12px', fontSize: '16px', fontWeight: 600, color: c.text, textDecoration: 'none' }}>
              <span style={{ width: '30px', height: '30px', borderRadius: '50%', background: c.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#FFF', fontWeight: 700 }}>P</span>
              Profile
            </a>
          </div>
        </aside>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '40px', alignItems: 'center', justifyContent: 'center', gap: '20px', textAlign: 'center' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: c.accent, background: c.secondary, padding: '8px 20px', borderRadius: '999px' }}>Your AI wingman</span>
          <h1 style={{ fontSize: '44px', fontWeight: 800, maxWidth: '520px', lineHeight: 1.15 }}>Stop overthinking your next text.</h1>
          <p style={{ fontSize: '20px', color: c.textMuted, maxWidth: '420px' }}>Skip the overthink. Skip the cringe.</p>

          <div style={{ width: '480px', marginTop: '20px', display: 'flex', gap: '12px', border: `1.5px solid ${c.border}`, borderRadius: '14px', padding: '10px' }}>
            <button aria-label="Attach screenshot" style={{ border: 'none', background: c.secondary, color: c.accent, borderRadius: '10px', width: '48px', height: '48px', fontSize: '20px' }}>
              <i className="ti ti-paperclip"></i>
            </button>
            <input
              type="text"
              placeholder="You're on. Talk it out."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              style={{ flex: 1, border: 'none', background: 'transparent', color: c.text, outline: 'none', fontSize: '18px' }}
            />
            <button aria-label="Send" style={{ border: 'none', background: c.accent, color: '#FFF', borderRadius: '10px', width: '48px', height: '48px', fontSize: '20px' }}>
              <i className="ti ti-arrow-right"></i>
            </button>
          </div>
        </main>
      </div>

      {showHomeScreenTip && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }} onClick={() => setShowHomeScreenTip(false)}>
          <div style={{ background: c.bg, color: c.text, padding: '32px', borderRadius: '18px', maxWidth: '380px' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: '14px', fontSize: '20px' }}>Add to home screen</h3>
            <p style={{ fontSize: '16px', color: c.textMuted, marginBottom: '10px' }}><strong>iPhone:</strong> Tap Share → Add to Home Screen</p>
            <p style={{ fontSize: '16px', color: c.textMuted, marginBottom: '20px' }}><strong>Android:</strong> Tap ⋮ menu → Add to Home Screen</p>
            <button onClick={() => setShowHomeScreenTip(false)} style={{ background: c.accent, color: '#FFF', border: 'none', padding: '12px 20px', borderRadius: '10px', width: '100%', fontSize: '16px', fontWeight: 600 }}>Got it</button>
          </div>
        </div>
      )}
    </div>
  );
}
