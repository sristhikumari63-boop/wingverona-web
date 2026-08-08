'use client';

export const dynamic = 'force-dynamic';
import React, { useState } from 'react';
import { createClient } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { theme as t } from '../../lib/theme';

export default function ProfileSetup() {
  const supabase = createClient();
  const router = useRouter();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('India');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    const ageNum = parseInt(age);
    if (!ageNum || ageNum < 13) {
      setError('You must be at least 13 to use WingVerona.');
      return;
    }

    setLoading(true);

    await supabase.from('profiles').upsert({
      user_id: user.id,
      name: name.trim(),
      age: ageNum,
      country,
    });

    const { data: existing } = await supabase
      .from('usage_limits')
      .select('trial_started_at')
      .eq('user_id', user.id)
      .single();

    if (!existing?.trial_started_at) {
      await supabase.from('usage_limits').upsert({
        user_id: user.id,
        trial_started_at: new Date().toISOString(),
        scans_used: 0,
        messages_used: 0,
      });
    }

    setLoading(false);
    router.push('/');
  };

  const inputStyle = { width: '100%', padding: '13px 14px', borderRadius: '10px', border: `1px solid ${t.line}`, background: t.bg, color: t.ivory, fontSize: '15px', marginBottom: '16px', outline: 'none', fontFamily: t.bodyFont, boxSizing: 'border-box' };

  return (
    <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.bodyFont, padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '380px', background: t.surfaceSolid, border: `1px solid ${t.line}`, borderRadius: '20px', padding: '38px', boxShadow: t.shadow }}>
        <h1 style={{ fontFamily: t.displayFont, fontSize: '24px', fontWeight: 600, color: t.goldSoft, marginBottom: '6px', textAlign: 'center' }}>Set up your profile</h1>
        <p style={{ fontSize: '14px', color: t.ivoryMuted, marginBottom: '30px', textAlign: 'center' }}>Your free trial starts once this is done.</p>

        <label style={{ fontSize: '13px', fontWeight: 500, color: t.ivoryMuted, display: 'block', marginBottom: '6px' }}>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={inputStyle} />

        <label style={{ fontSize: '13px', fontWeight: 500, color: t.ivoryMuted, display: 'block', marginBottom: '6px' }}>Age</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="18" style={inputStyle} />

        <label style={{ fontSize: '13px', fontWeight: 500, color: t.ivoryMuted, display: 'block', marginBottom: '6px' }}>Country</label>
        <select value={country} onChange={(e) => setCountry(e.target.value)} style={inputStyle}>
          <option value="India">India</option>
          <option value="United States">United States</option>
          <option value="Other">Other</option>
        </select>

        {error && <p style={{ color: '#B4392E', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

        <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', background: t.gold, color: t.ink, border: 'none', padding: '14px', borderRadius: '999px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: t.bodyFont }}>
          {loading ? 'Saving…' : 'Start free trial'}
        </button>
      </div>
    </div>
  );
}
