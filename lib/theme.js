// Design direction: a real, warm, everyday product — a well-loved stationery
// shop, not a "dark-mode AI tool." Warm paper background, deep wine and
// muted gold as accents, dark ink text. Light and legible, not moody.
export const theme = {
  bg: '#FBF3E7',            // warm paper
  surface: 'rgba(255,255,255,0.6)',
  surfaceSolid: '#FFFFFF',
  surfaceRaised: '#F3E6D2',  // deeper parchment for hover/raised bits
  gold: '#9C6B26',           // deep amber-gold — accents, buttons, links
  goldSoft: '#C99A4E',       // lighter gold — glows, hover
  rose: '#7A2E3A',           // deep wine — secondary accent
  ivory: '#2B1B16',          // primary ink text (light theme: dark ink)
  ivoryMuted: '#8A7566',     // muted secondary text
  ink: '#FFF9EE',            // text color for use ON gold/dark accent surfaces
  line: 'rgba(43,27,22,0.14)',
  lineSoft: 'rgba(43,27,22,0.07)',
  shadow: '0 20px 44px -22px rgba(43,27,22,0.28)',
  shadowSoft: '0 10px 26px -16px rgba(43,27,22,0.2)',
  displayFont: "'Cormorant Garamond', 'Times New Roman', serif",
  bodyFont: "'Jost', 'Helvetica Neue', Arial, sans-serif",
};
