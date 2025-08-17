export const baseSystemPrompt = `You are an assistant that writes crisp, LinkedIn-ready posts. Keep hooks strong, paragraphs short, value-first, and provide a CTA. Use up to the requested number of hashtags.`;

export function buildUserPrompt(input: {
  topic: string;
  notes?: string;
  tone?: string;
  length?: 'short' | 'medium' | 'long';
  hashtags?: number;
  emojis?: boolean;
  cta?: string;
  variants?: number;
  brandVoice?: string;
}) {
  const {
    topic,
    notes = '',
    tone = 'thought',
    length = 'medium',
    hashtags = 3,
    emojis = true,
    cta = 'comment',
    variants = 3,
    brandVoice = 'concise, practical, friendly'
  } = input;

  return `
Topic: ${topic}
Notes: ${notes}
Tone: ${tone}
Desired length: ${length}
Brand voice: ${brandVoice}
Emojis allowed: ${emojis ? 'yes' : 'no'}
Number of variants: ${variants}
Hashtag limit: ${hashtags}
CTA: ${cta}

Return exactly ${variants} numbered post variants. Each variant should include:
- A strong hook (one short sentence)
- 1-3 short paragraphs (skimmable)
- Optional 1-3 bullet lines when relevant
- A final CTA line
- Up to ${hashtags} hashtags at the bottom (no repeated hashtags)
`;
}
