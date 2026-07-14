import { ImageResponse } from 'next/og';

// Define the square dimension rules for the website favicon/logo icon
export const size = { width: 56, height: 56 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      // Render a sharp minimalist black background box with a bold white "W" centered inside
      <div
        style={{
          fontSize: 36,
          background: '#0B0B0F',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F4F4F6',
          fontWeight: 'extrabold',
          borderRadius: '12px',
        }}
      >
        W
      </div>
    ),
    { ...size }
  );
}
