import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth-helpers';
import { buildUserPrompt, baseSystemPrompt } from '@/lib/prompts';

export async function POST(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const prompt = buildUserPrompt({
      topic: String(body.topic || '').slice(0, 400),
      notes: body.notes || '',
      tone: body.tone || 'thought',
      length: body.length || 'medium',
      hashtags: Number(body.hashtags ?? 3),
      emojis: Boolean(body.emojis ?? true),
      cta: body.cta || 'comment',
      variants: Math.max(1, Math.min(5, Number(body.variants ?? 3))),
      brandVoice: body.brandVoice || 'concise, practical, friendly'
    });

    // Call OpenAI (chat completions)
    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) return NextResponse.json({ error: 'Missing OpenAI key' }, { status: 500 });

    const payload = {
      model: 'gpt-4o-mini', // adjust in prod if needed
      messages: [
        { role: 'system', content: baseSystemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 800
    };

    const openaiResp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!openaiResp.ok) {
      const text = await openaiResp.text();
      return NextResponse.json({ error: 'OpenAI error', detail: text }, { status: 502 });
    }

    const data = await openaiResp.json();
    const content = data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text ?? '';
    return NextResponse.json({ text: String(content) });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
