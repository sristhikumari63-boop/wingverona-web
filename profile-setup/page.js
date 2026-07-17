'use client';
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const COLORS = { bg: '#F8F9FA', secondary: '#E8F1F2', accent: '#7A4B71', text: '#3D3A3F', textMuted: '#6B6870', border: '#E2E5E1' };

export default function ProfileSetup() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('India');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const c = COLORS;

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

  return (
    <div style={{ minHeight: '100vh', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '380px', background: '#FFFFFF', border: `1px solid ${c.border}`, borderRadius: '18px', padding: '36px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: c.text, marginBottom: '6px', textAlign: 'center' }}>Set up your profile</h1>
        <p style={{ fontSize: '14px', color: c.textMuted, marginBottom: '28px', textAlign: 'center' }}>Your free trial starts once this is done.</p>

        <label style={{ fontSize: '14px', fontWeight: 600, color: c.text, display: 'block', marginBottom: '6px' }}>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: `1px solid ${c.border}`, fontSize: '16px', marginBottom: '16px', outline: 'none' }}
        />

        <label style={{ fontSize: '14px', fontWeight: 600, color: c.text, display: 'block', marginBottom: '6px' }}>Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="18"
          style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: `1px solid ${c.border}`, fontSize: '16px', marginBottom: '16px', outline: 'none' }}
        />

        <label style={{ fontSize: '14px', fontWeight: 600, color: c.text, display: 'block', marginBottom: '6px' }}>Country</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: `1px solid ${c.border}`, fontSize: '16px', marginBottom: '16px', outline: 'none' }}
        >
          <option value="India">India</option>
          <option value="United States">United States</option>
          <option value="Other">Other</option>
        </select>

        {error && <p style={{ color: '#D9534F', fontSize: '14px', marginBottom: '12px' }}>{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ width: '100%', background: c.accent, color: '#FFF', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}
        >
          {loading ? 'Saving…' : 'Start free trial'}
        </button>
      </div>
    </div>
  );
}
