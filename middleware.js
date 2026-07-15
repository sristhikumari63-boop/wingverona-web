import { NextResponse } from 'next/server';
import { geolocation } from '@vercel/functions';

export function middleware(request) {
  const url = request.nextUrl.clone();

  // Get real geolocation (works on Vercel's edge network)
  const { country } = geolocation(request);
  const countryCode = country || 'US';

  // Lock user into their billing lane based on real location
  const assignedLane = countryCode === 'IN' ? 'INDIA' : 'INTERNATIONAL';

  url.searchParams.set('lane', assignedLane);
  const response = NextResponse.rewrite(url);

  response.cookies.set('wv_billing_lane', assignedLane, {
    path: '/',
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return response;
}

export const config = {
  matcher: ['/', '/paywall'],
};

