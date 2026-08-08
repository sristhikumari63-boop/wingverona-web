'use client';
import React, { useState, useRef, useEffect } from 'react';
import { theme as t } from '../lib/theme';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [sending, setSending] = useState(false);
  const [sealPressed, setSealPressed] = useState(false);
  const [showHomeScreenTip, setShowHomeScreenTip] = useState(false);
  const listEndRef = useRef(null);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  const send = async () => {
    const text = chatInput.trim();
    if (!text || sending) return;
    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setChatInput('');
    setSending(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: `Sorry — ${err.message}` }]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.ivory, fontFamily: t.bodyFont }}>
      <style>{`
        @keyframes riseIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .rise-1 { animation: riseIn 0.6s cubic-bezier(.2,.7,.3,1) both; }
        .rise-2 { animation: riseIn 0.6s cubic-bezier(.2,.7,.3,1) 0.1s both; }
        .rise-3 { animation: riseIn 0.6s cubic-bezier(.2,.7,.3,1) 0.2s both; }
        .bubble-in { animation: riseIn 0.35s cubic-bezier(.2,.7,.3,1) both; }
        .seal-btn { transition: transform 0.22s cubic-bezier(.2,.8,.3,1.3); }
        .seal-btn:hover:not(:disabled) { transform: translateY(-2px) scale(1.05); }
        .seal-btn:active:not(:disabled) { transform: translateY(1px) scale(0.95); }
        .nav-link { transition: color 0.2s ease, border-color 0.2s ease; }
        .nav-link:hover { color: ${t.gold} !important; border-color: ${t.gold} !important; }
        .composer-wrap:focus-within { border-color: ${t.gold} !important; box-shadow: 0 0 0 3px ${t.gold}1A; }
        .cta-btn { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .cta-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 18px -8px ${t.gold}66; }
        @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .dot { display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: ${t.ivoryMuted}; animation: bob 1s ease-in-out infinite; }
        .dot:nth-child(2) { animation-delay: 0.15s; }
        .dot:nth-child(3) { animation-delay: 0.3s; }
        @media (prefers-reduced-motion: reduce) {
          .rise-1, .rise-2, .rise-3, .bubble-in { animation: none; }
          .seal-btn, .cta-btn, .composer-wrap { transition: none; }
        }
      `}</style>

      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 28px', maxWidth: '1080px', margin: '0 auto' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Monogram size={26} />
          <span style={{ fontFamily: t.displayFont, fontWeight: 600, fontSize: '21px', color: t.rose, letterSpacing: '0.2px' }}>WingVerona</span>
        </span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a href="/pricing" className="nav-link" style={{ fontSize: '14px', color: t.ivory, textDecoration: 'none', padding: '8px 6px' }}>Pricing</a>
          <a href="/profile" className="nav-link" style={{ fontSize: '14px', color: t.ivory, textDecoration: 'none', padding: '8px 6px' }}>Profile</a>
          <a href="/login" className="nav-link" style={{ fontSize: '14px', color: t.ivory, border: `1px solid ${t.line}`, padding: '9px 18px', borderRadius: '999px', textDecoration: 'none' }}>Log in</a>
          <a href="/signup" className="cta-btn" style={{ fontSize: '14px', background: t.gold, color: t.ink, padding: '9px 20px', borderRadius: '999px', textDecoration: 'none', fontWeight: 600 }}>Start free trial</a>
        </div>
      </nav>

      <main style={{ maxWidth: '640px', margin: '0 auto', padding: '30px 20px 70px', textAlign: 'center' }}>
        <span className="rise-1" style={{ display: 'inline-block', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: t.gold, border: `1px solid ${t.line}`, padding: '6px 16px', borderRadius: '999px', marginBottom: '18px' }}>
          Your AI wingman
        </span>

        <h1 className="rise-2" style={{ fontFamily: t.displayFont, fontWeight: 600, fontSize: '42px', lineHeight: 1.15, color: t.ivory, margin: '0 0 12px' }}>
          Never leave them <em style={{ color: t.rose, fontStyle: 'italic' }}>on read.</em>
        </h1>

        <p className="rise-3" style={{ fontWeight: 300, fontSize: '15px', color: t.ivoryMuted, maxWidth: '380px', margin: '0 auto 30px', lineHeight: 1.6 }}>
          Tell it what's going on, get a reply worth sending. No overthinking, no cringe.
        </p>

        <div className="rise-3" style={{
          background: t.surfaceSolid, border: `1px solid ${t.line}`, borderRadius: '22px',
          boxShadow: t.shadow, overflow: 'hidden', textAlign: 'left',
        }}>
          <div style={{ minHeight: messages.length ? '220px' : '0', maxHeight: '360px', overflowY: 'auto', padding: messages.length ? '20px 20px 4px' : '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.length === 0 && (
              <div style={{ padding: '28px 24px', color: t.ivoryMuted, fontSize: '13px', fontStyle: 'italic', textAlign: 'center' }}>
                Try: "She said 'haha yeah maybe' to my dinner idea — what do I say back?"
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className="bubble-in" style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%', padding: '10px 16px', borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: m.role === 'user' ? t.surfaceRaised : `${t.rose}0F`,
                  border: `1px solid ${m.role === 'user' ? t.line : t.rose + '33'}`,
                  color: t.ivory, fontSize: '14px', lineHeight: 1.5, whiteSpace: 'pre-wrap',
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '12px 16px', borderRadius: '16px 16px 16px 4px', background: `${t.rose}0F`, border: `1px solid ${t.rose}33` }}>
                  <span className="dot"></span> <span className="dot"></span> <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={listEndRef} />
          </div>

          <div className="composer-wrap" style={{
            display: 'flex', alignItems: 'flex-end', gap: '10px', padding: '10px 10px 10px 18px',
            borderTop: messages.length ? `1px solid ${t.line}` : 'none', transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}>
            <textarea
              rows={1}
              placeholder="You're on. Talk it out."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ flex: 1, border: 'none', background: 'transparent', color: t.ivory, outline: 'none', fontFamily: t.bodyFont, fontSize: '14px', resize: 'none', padding: '10px 0', minWidth: 0 }}
            />
            <button
              aria-label="Send"
              className="seal-btn"
              disabled={sending || !chatInput.trim()}
              onMouseDown={() => setSealPressed(true)}
              onMouseUp={() => setSealPressed(false)}
              onMouseLeave={() => setSealPressed(false)}
              onClick={send}
              style={{
                border: 'none', cursor: sending ? 'default' : 'pointer', width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                background: `radial-gradient(circle at 32% 28%, ${t.goldSoft}, ${t.gold} 60%, #6f4c1b 100%)`,
                opacity: !chatInput.trim() && !sending ? 0.5 : 1,
                boxShadow: sealPressed ? 'inset 0 2px 4px rgba(0,0,0,0.3)' : '0 3px 10px rgba(43,27,22,0.3), inset 0 1px 0 rgba(255,255,255,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <MonogramMark size={16} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
          <a href="/live-date" className="nav-link" style={{ fontSize: '13px', color: t.ivoryMuted, textDecoration: 'none', border: `1px solid ${t.line}`, padding: '8px 16px', borderRadius: '999px' }}>Live Date</a>
          <a href="/screenshots" className="nav-link" style={{ fontSize: '13px', color: t.ivoryMuted, textDecoration: 'none', border: `1px solid ${t.line}`, padding: '8px 16px', borderRadius: '999px' }}>Screenshot checks</a>
          <button onClick={() => setShowHomeScreenTip(true)} className="nav-link" style={{ fontSize: '13px', color: t.ivoryMuted, background: 'transparent', border: `1px solid ${t.line}`, padding: '8px 16px', borderRadius: '999px', cursor: 'pointer' }}>Add to home screen</button>
        </div>
      </main>

      {showHomeScreenTip && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(43,27,22,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }} onClick={() => setShowHomeScreenTip(false)}>
          <div style={{ background: t.surfaceSolid, border: `1px solid ${t.line}`, color: t.ivory, padding: '26px', borderRadius: '18px', maxWidth: '320px', boxShadow: t.shadow }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: '10px', fontFamily: t.displayFont, fontWeight: 600, fontSize: '20px', color: t.rose }}>Add to home screen</h3>
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
      <circle cx="20" cy="20" r="19" stroke="#7A2E3A" strokeWidth="1.2" />
      <text x="20" y="27" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontWeight="600" fontSize="20" fill="#7A2E3A">W</text>
    </svg>
  );
}

function MonogramMark({ size = 16 }) {
  return (
    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 700, fontSize: `${size}px`, color: '#FFF9EE' }}>W</span>
  );
}
