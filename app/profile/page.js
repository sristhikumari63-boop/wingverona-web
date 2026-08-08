'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

const COLORS = { bg: '#F8F9FA', accent: '#7A4B71', text: '#3D3A3F', textMuted: '#6B6870', border: '#E2E5E1' };

export default function Profile() {
  const supabase = createClient();
  const router = useRouter();
  const c = COLORS;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      const { data } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();
      setProfile(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return <div style={{ minHeight: '100vh', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.textMuted, fontFamily: 'Inter, sans-serif' }}>Loading…</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: c.bg, fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '380px', background: '#FFFFFF', border: `1px solid ${c.border}`, borderRadius: '18px', padding: '36px', textAlign: 'center' }}>
        <a href="/" style={{ fontSize: '14px', color: c.accent, textDecoration: 'none', fontWeight: 700 }}>← Back to WingVerona</a>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: c.text, margin: '18px 0 8px' }}>{profile?.name || 'Your profile'}</h1>
        <p style={{ fontSize: '14px', color: c.textMuted }}>{profile?.age ? `${profile.age} · ${profile.country}` : 'Profile not set up yet.'}</p>
        <button
          onClick={async () => { await supabase.auth.signOut(); router.push('/'); }}
          style={{ marginTop: '20px', background: 'transparent', border: `1px solid ${c.border}`, color: c.text, padding: '10px 18px', borderRadius: '10px', cursor: 'pointer', fontSize: '14px' }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
