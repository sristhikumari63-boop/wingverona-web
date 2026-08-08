export const metadata = {
  title: 'WingVerona | Your AI Wingman',
  description: 'Never send a text you regret. WingVerona drafts your replies, reads the room from a screenshot, and stays with you through the date.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
      </head>
      <body style={{ backgroundColor: '#241019', margin: 0, padding: 0, fontFamily: "'Jost', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
