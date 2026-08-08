'use client';

export const dynamic = 'force-dynamic';
import React, { useEffect, useState } from 'react';
import { createClient } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { theme as t } from '../../lib/theme';

export default function Profile() {
  const supabase = createClient();
  const router = useRouter();
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
    return <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.ivoryMuted, fontFamily: t.bodyFont }}>Loading…</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: t.bg, fontFamily: t.bodyFont, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '380px', background: t.surfaceSolid, border: `1px solid ${t.line}`, borderRadius: '20px', padding: '38px', textAlign: 'center', boxShadow: t.shadow }}>
        <a href="/" style={{ fontSize: '13px', color: t.goldSoft, textDecoration: 'none', fontWeight: 600 }}>← Back to WingVerona</a>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', margin: '18px auto 12px', background: `radial-gradient(circle at 32% 28%, ${t.goldSoft}, ${t.gold} 60%, #9c7830 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.displayFont, fontStyle: 'italic', fontWeight: 700, fontSize: '22px', color: t.ink }}>
          {(profile?.name || 'W')[0].toUpperCase()}
        </div>
        <h1 style={{ fontFamily: t.displayFont, fontSize: '22px', fontWeight: 600, color: t.ivory, margin: '0 0 6px' }}>{profile?.name || 'Your profile'}</h1>
        <p style={{ fontSize: '13px', color: t.ivoryMuted }}>{profile?.age ? `${profile.age} · ${profile.country}` : 'Profile not set up yet.'}</p>
        <button
          onClick={async () => { await supabase.auth.signOut(); router.push('/'); }}
          style={{ marginTop: '22px', background: 'transparent', border: `1px solid ${t.line}`, color: t.ivory, padding: '11px 20px', borderRadius: '999px', cursor: 'pointer', fontSize: '13px', fontFamily: t.bodyFont }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
