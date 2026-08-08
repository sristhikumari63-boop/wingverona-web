import { createBrowserClient } from '@supabase/ssr';

// Falls back to placeholders so a missing env var can't crash the build.
// Real Supabase URL + anon key must still be set in Vercel → Settings →
// Environment Variables for signup/login/etc. to actually work at runtime.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
  );
}
