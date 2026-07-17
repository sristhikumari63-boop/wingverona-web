'use client';
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const COLORS = { bg: '#F8F9FA', secondary: '#E8F1F2', accent: '#7A4B71', text: '#3D3A3F', textMuted: '#6B6870', border: '#E2E5E1' };

export default function Signup() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const c = COLORS;

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

  return (
    <div style={{ minHeight: '100vh', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '380px', background: '#FFFFFF', border: `1px solid ${c.border}`, borderRadius: '18px', padding: '36px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: c.accent, marginBottom: '6px', textAlign: 'center' }}>WingVerona</h1>
        <p style={{ fontSize: '15px', color: c.textMuted, marginBottom: '28px', textAlign: 'center' }}>Create your account to start your free trial.</p>

        <label style={{ fontSize: '14px', fontWeight: 600, color: c.text, display: 'block', marginBottom: '6px' }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: `1px solid ${c.border}`, fontSize: '16px', marginBottom: '16px', outline: 'none' }}
        />

        <label style={{ fontSize: '14px', fontWeight: 600, color: c.text, display: 'block', marginBottom: '6px' }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: `1px solid ${c.border}`, fontSize: '16px', marginBottom: '16px', outline: 'none' }}
        />

        {error && <p style={{ color: '#D9534F', fontSize: '14px', marginBottom: '12px' }}>{error}</p>}

        <button
          onClick={handleSignup}
          disabled={loading}
          style={{ width: '100%', background: c.accent, color: '#FFF', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', marginBottom: '16px' }}
        >
          {loading ? 'Creating account…' : 'Sign up'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '14px', color: c.textMuted }}>
          Already have an account? <a href="/login" style={{ color: c.accent, fontWeight: 600, textDecoration: 'none' }}>Log in</a>
        </p>
      </div>
    </div>
  );
}
