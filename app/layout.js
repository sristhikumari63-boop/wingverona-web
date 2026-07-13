export const metadata = {
  title: 'WingVerona | Premium AI Wingman',
  description: 'Elevate your conversation game.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#F4F4F6', margin: 0, padding: 0, fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
