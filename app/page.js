'use client';
import React, { useState } from 'react';
import { theme as t } from '../lib/theme';

export default function Home() {
  const [chatInput, setChatInput] = useState('');
  const [showHomeScreenTip, setShowHomeScreenTip] = useState(false);
  const [sealPressed, setSealPressed] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.ivory, fontFamily: t.bodyFont, position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes riseIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .rise-1 { animation: riseIn 0.7s cubic-bezier(.2,.7,.3,1) both; }
        .rise-2 { animation: riseIn 0.7s cubic-bezier(.2,.7,.3,1) 0.12s both; }
        .rise-3 { animation: riseIn 0.7s cubic-bezier(.2,.7,.3,1) 0.24s both; }
        .rise-4 { animation: riseIn 0.7s cubic-bezier(.2,.7,.3,1) 0.36s both; }
        .seal-btn { transition: transform 0.25s cubic-bezier(.2,.8,.3,1.3), box-shadow 0.25s ease; }
        .seal-btn:hover { transform: perspective(300px) rotateX(4deg) translateY(-2px) scale(1.04); }
        .seal-btn:active { transform: perspective(300px) rotateX(8deg) translateY(1px) scale(0.96); }
        .nav-link { transition: color 0.2s ease, border-color 0.2s ease; }
        .nav-link:hover { color: ${t.gold} !important; border-color: ${t.gold} !important; }
        .sidebar-item { transition: background 0.2s ease, color 0.2s ease; }
        .sidebar-item:hover { background: ${t.surfaceRaised}; color: ${t.goldSoft}; }
        .composer-wrap:focus-within { border-color: ${t.gold} !important; box-shadow: 0 0 0 1px ${t.gold}33, ${t.shadow}; }
        @media (prefers-reduced-motion: reduce) {
          .rise-1, .rise-2, .rise-3, .rise-4 { animation: none; }
          .seal-btn, .composer-wrap { transition: none; }
        }
        @media (max-width: 720px) {
          .app-sidebar { display: none; }
        }
      `}</style>

      {/* ambient candlelight glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '640px', height: '640px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,162,75,0.14) 0%, rgba(201,162,75,0) 70%)',
        pointerEvents: 'none',
      }} />

      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 28px', borderBottom: `1px solid ${t.line}`, position: 'relative', zIndex: 2 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Monogram size={26} />
          <span style={{ fontFamily: t.displayFont, fontWeight: 600, fontSize: '20px', color: t.goldSoft, letterSpacing: '0.3px' }}>WingVerona</span>
        </span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a href="/pricing" className="nav-link" style={{ fontSize: '13px', color: t.ivoryMuted, border: `1px solid ${t.line}`, padding: '8px 16px', borderRadius: '999px', textDecoration: 'none' }}>Pricing</a>
          <a href="/login" className="nav-link" style={{ fontSize: '13px', color: t.ivoryMuted, border: `1px solid ${t.line}`, padding: '8px 16px', borderRadius: '999px', textDecoration: 'none' }}>Log in</a>
          <a href="/signup" style={{ fontSize: '13px', background: t.gold, color: t.ink, padding: '8px 18px', borderRadius: '999px', textDecoration: 'none', fontWeight: 600 }}>Start free trial</a>
        </div>
      </nav>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 61px)', position: 'relative', zIndex: 2 }}>
        <aside className="app-sidebar" style={{ width: '230px', borderRight: `1px solid ${t.line}`, padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', fontSize: '13px', background: t.surfaceRaised, color: t.goldSoft, border: `1px solid ${t.line}` }}>
            <i className="ti ti-message-chatbot"></i> Wing Chat
          </div>

          <a href="/live-date" className="sidebar-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', fontSize: '13px', color: t.ivoryMuted, textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 64 64" style={{ flexShrink: 0 }}>
              <path d="M4 40 C10 22 28 16 42 24 C37 25.5 34 29 35.5 34 C41 31 46.5 32.5 49.5 37.5 C40 44 27 44 18 40 C13 38 8 39.5 4 40 Z" fill="currentColor" />
            </svg>
            Live Date
          </a>

          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', color: t.ivoryMuted, opacity: 0.6, margin: '18px 0 4px', padding: '0 12px' }}>Previous chats</div>
          <div style={{ fontSize: '13px', color: t.ivoryMuted, opacity: 0.5, padding: '6px 12px' }}>No chats yet</div>

          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', color: t.ivoryMuted, opacity: 0.6, margin: '18px 0 4px', padding: '0 12px' }}>Screenshot checks</div>
          <a href="/screenshots" className="sidebar-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: t.rose, padding: '8px 12px', borderRadius: '10px', textDecoration: 'none' }}>
            <i className="ti ti-photo"></i> View all screenshots
          </a>

          <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: `1px solid ${t.line}`, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button onClick={() => setShowHomeScreenTip(true)} className="sidebar-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', fontSize: '13px', background: 'transparent', border: 'none', color: t.ivoryMuted, cursor: 'pointer', textAlign: 'left' }}>
              <i className="ti ti-download"></i> Add to home screen
            </button>
            <a href="/profile" className="sidebar-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', fontSize: '13px', color: t.ivoryMuted, textDecoration: 'none' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: `linear-gradient(145deg, ${t.goldSoft}, ${t.gold})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: t.ink, fontWeight: 700 }}>P</span>
              Profile
            </a>
          </div>
        </aside>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', alignItems: 'center', justifyContent: 'center', gap: '14px', textAlign: 'center' }}>
          <span className="rise-1" style={{ fontFamily: t.bodyFont, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: t.gold, border: `1px solid ${t.line}`, padding: '6px 16px', borderRadius: '999px' }}>Your AI wingman</span>

          <h1 className="rise-2" style={{ fontFamily: t.displayFont, fontWeight: 600, fontSize: '40px', lineHeight: 1.15, maxWidth: '440px', color: t.ivory, margin: 0 }}>
            Never leave them <em style={{ color: t.gold, fontStyle: 'italic' }}>on read.</em>
          </h1>

          <p className="rise-3" style={{ fontFamily: t.bodyFont, fontWeight: 300, fontSize: '15px', color: t.ivoryMuted, maxWidth: '320px', lineHeight: 1.6 }}>
            Send a screenshot, get the perfect line. No overthinking, no cringe — just the reply you'd send if you weren't panicking.
          </p>

          <div className="rise-4 composer-wrap" style={{
            width: '360px', maxWidth: '92vw', marginTop: '18px', display: 'flex', alignItems: 'center', gap: '10px',
            border: `1px solid ${t.line}`, borderRadius: '16px', padding: '8px 8px 8px 18px',
            background: `linear-gradient(180deg, ${t.surfaceSolid}, ${t.bg})`, boxShadow: t.shadowSoft, transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}>
            <button aria-label="Attach screenshot" style={{ border: 'none', background: 'transparent', color: t.ivoryMuted, width: '30px', height: '30px', cursor: 'pointer', flexShrink: 0 }}>
              <i className="ti ti-paperclip"></i>
            </button>
            <input
              type="text"
              placeholder="You're on. Talk it out."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              style={{ flex: 1, border: 'none', background: 'transparent', color: t.ivory, outline: 'none', fontFamily: t.bodyFont, fontSize: '14px', fontStyle: 'italic', minWidth: 0 }}
            />
            <button
              aria-label="Send"
              className="seal-btn"
              onMouseDown={() => setSealPressed(true)}
              onMouseUp={() => setSealPressed(false)}
              onMouseLeave={() => setSealPressed(false)}
              style={{
                border: 'none', cursor: 'pointer', width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                background: `radial-gradient(circle at 32% 28%, ${t.goldSoft}, ${t.gold} 55%, #9c7830 100%)`,
                boxShadow: sealPressed ? 'inset 0 2px 4px rgba(0,0,0,0.35)' : '0 3px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <MonogramMark size={16} />
            </button>
          </div>
        </main>
      </div>

      {showHomeScreenTip && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }} onClick={() => setShowHomeScreenTip(false)}>
          <div style={{ background: t.surfaceSolid, border: `1px solid ${t.line}`, color: t.ivory, padding: '26px', borderRadius: '18px', maxWidth: '320px', boxShadow: t.shadow, fontFamily: t.bodyFont }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: '10px', fontFamily: t.displayFont, fontWeight: 600, fontSize: '20px', color: t.goldSoft }}>Add to home screen</h3>
            <p style={{ fontSize: '13px', color: t.ivoryMuted, marginBottom: '8px' }}><strong style={{ color: t.ivory }}>iPhone:</strong> Tap Share → Add to Home Screen</p>
            <p style={{ fontSize: '13px', color: t.ivoryMuted, marginBottom: '18px' }}><strong style={{ color: t.ivory }}>Android:</strong> Tap ⋮ menu → Add to Home Screen</p>
            <button onClick={() => setShowHomeScreenTip(false)} style={{ background: t.gold, color: t.ink, border: 'none', padding: '10px 16px', borderRadius: '10px', width: '100%', fontWeight: 600, cursor: 'pointer' }}>Got it</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Monogram({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="19" stroke="#C9A24B" strokeWidth="1.2" />
      <text x="20" y="27" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontWeight="600" fontSize="20" fill="#C9A24B">W</text>
    </svg>
  );
}

function MonogramMark({ size = 16 }) {
  return (
    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 700, fontSize: `${size}px`, color: '#241019' }}>W</span>
  );
}
