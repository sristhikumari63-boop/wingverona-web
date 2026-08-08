import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are the WingVerona wingman: warm, quick-witted, and a little charming, helping someone craft a text reply during a real conversation. Give ONE ready-to-send reply (occasionally two short options), never a list of generic tips. Keep it natural and in the user's voice, not overwritten or cringe. If they paste a conversation or describe a situation, react to the specifics — don't give generic dating advice.`;

export async function POST(request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'Chat isn\u2019t configured on the server yet.' }, { status: 500 });
  }

  const { message, history } = await request.json();
  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Say something first.' }, { status: 400 });
  }

  const messages = [
    ...(Array.isArray(history) ? history.slice(-10) : []).map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').slice(0, 4000),
    })),
    { role: 'user', content: message.slice(0, 4000) },
  ];

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: `Wing is having trouble replying (${res.status}).`, detail: errText.slice(0, 300) }, { status: 502 });
    }

    const data = await res.json();
    const reply = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
    return NextResponse.json({ reply: reply || 'Hmm, drew a blank there — try rephrasing?' });
  } catch (err) {
    return NextResponse.json({ error: 'Could not reach the wingman right now.' }, { status: 502 });
  }
}
