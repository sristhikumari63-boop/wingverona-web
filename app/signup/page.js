'use client';

export const dynamic = 'force-dynamic';
import React, { useState } from 'react';
import { createClient } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { theme as t } from '../../lib/theme';

export default function Signup() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError('');
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push('/profile-setup');
  };

  const inputStyle = { width: '100%', padding: '13px 14px', borderRadius: '10px', border: `1px solid ${t.line}`, background: t.bg, color: t.ivory, fontSize: '15px', marginBottom: '16px', outline: 'none', fontFamily: t.bodyFont, boxSizing: 'border-box' };

  return (
    <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.bodyFont, padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '380px', background: t.surfaceSolid, border: `1px solid ${t.line}`, borderRadius: '20px', padding: '38px', boxShadow: t.shadow }}>
        <h1 style={{ fontFamily: t.displayFont, fontSize: '28px', fontWeight: 600, fontStyle: 'italic', color: t.goldSoft, marginBottom: '6px', textAlign: 'center' }}>WingVerona</h1>
        <p style={{ fontSize: '14px', color: t.ivoryMuted, marginBottom: '30px', textAlign: 'center' }}>Create your account to start your free trial.</p>

        <label style={{ fontSize: '13px', fontWeight: 500, color: t.ivoryMuted, display: 'block', marginBottom: '6px' }}>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />

        <label style={{ fontSize: '13px', fontWeight: 500, color: t.ivoryMuted, display: 'block', marginBottom: '6px' }}>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" style={inputStyle} />

        {error && <p style={{ color: '#B4392E', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

        <button onClick={handleSignup} disabled={loading} style={{ width: '100%', background: t.gold, color: t.ink, border: 'none', padding: '14px', borderRadius: '999px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', marginBottom: '18px', fontFamily: t.bodyFont }}>
          {loading ? 'Creating account…' : 'Sign up'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '13px', color: t.ivoryMuted }}>
          Already have an account? <a href="/login" style={{ color: t.gold, fontWeight: 600, textDecoration: 'none' }}>Log in</a>
        </p>
      </div>
    </div>
  );
}
