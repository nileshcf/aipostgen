# LinkPost Studio

Next.js (App Router) + Supabase + OpenAI — Apple aesthetic LinkedIn post generator.

## Quick start
1. `npm install`
2. Copy `.env.local.example` -> `.env.local` and fill keys (Supabase and OpenAI).
3. `npm run dev`
4. Visit http://localhost:3000

## Endpoints
- POST `/api/auth/register` {email, password}
- POST `/api/auth/login` {email, password} → sets `sb_access_token` HttpOnly cookie
- GET  `/api/auth/me` → reads cookie or bearer token
- POST `/api/generate` {topic, notes, tone, length, hashtags, emojis, variants} (requires auth cookie)

## Deploy
Import repo into Vercel. Add environment variables in Vercel dashboard per `.env.local.example`.

## Notes
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-only (do not expose).
- For production: enable email verification and RLS policies for any stored tables.



my-linkedin-ai/
├─ src/
│  ├─ app/
│  │  ├─ api/
│  │  │  ├─ auth/
│  │  │  │  ├─ register/route.ts
│  │  │  │  ├─ login/route.ts
│  │  │  │  └─ me/route.ts
│  │  │  └─ generate/route.ts
│  │  ├─ (auth)/
│  │  │  └─ login/page.tsx
│  │  ├─ (app)/
│  │  │  └─ dashboard/page.tsx
│  │  ├─ layout.tsx
│  │  └─ globals.css
│  ├─ components/
│  │  ├─ brand-header.tsx
│  │  ├─ glass-card.tsx
│  │  └─ post-variant.tsx
│  ├─ lib/
│  │  ├─ supabase-client.ts
│  │  ├─ supabase-server.ts
│  │  ├─ auth-helpers.ts
│  │  └─ prompts.ts
│  └─ middleware.ts
├─ package.json
├─ tsconfig.json
├─ next.config.js
├─ tailwind.config.ts
├─ postcss.config.js
├─ .env.local.example
└─ README.md
