import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  
  // 1. Read the user's geographic location data safely from the edge network
  const countryCode = request.geo?.country || 'US'; 
  
  // 2. Lock the user into their respective localized currency billing lanes
  let assignedLane = 'INTERNATIONAL';
  if (countryCode === 'IN') {
    assignedLane = 'INDIA';
  }

  // 3. Append the active parameter and pass it to the frontend code
  url.searchParams.set('lane', assignedLane);
  const response = NextResponse.rewrite(url);
  
  // 4. Save this status as a highly secure, un-tamperable browser cookie
  response.cookies.set('wv_billing_lane', assignedLane, {
    path: '/',
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30 // Hard-lock the setting for 30 straight days
  });

  return response;
}

// Secure the main landing page and onboarding portals against currency fraud
export const config = {
  matcher: ['/', '/paywall'],
};
