// Design direction: "a balcony in Verona, after dark" — warm, classic,
// unmistakably romantic without being saccharine. Deep wine instead of
// the generic cream-and-terracotta AI-app palette; antique gold instead
// of a bright accent color.
export const theme = {
  bg: '#241019',          // deep wine-black — the night
  bgElevated: '#33162239', // unused fallback, kept for reference
  surface: '#33172447',
  surfaceSolid: '#331722',
  surfaceRaised: '#3D1C29',
  gold: '#C9A24B',         // antique gold — the signature accent
  goldSoft: '#E4CD93',
  rose: '#C97B84',         // secondary accent, quieter than gold
  ivory: '#F4EAD9',        // body text on dark
  ivoryMuted: '#C9B7A8',   // secondary text on dark
  ink: '#241019',          // text on light/gold surfaces
  line: 'rgba(201,162,75,0.22)',
  lineSoft: 'rgba(244,234,217,0.10)',
  shadow: '0 20px 50px -20px rgba(0,0,0,0.65)',
  shadowSoft: '0 10px 30px -14px rgba(0,0,0,0.5)',
  displayFont: "'Cormorant Garamond', 'Times New Roman', serif",
  bodyFont: "'Jost', 'Helvetica Neue', Arial, sans-serif",
};
