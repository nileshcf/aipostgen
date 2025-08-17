import { NextResponse } from 'next/server';
import { supabaseServerAdmin } from '@/lib/supabase-server';

function makeSetCookieHeader(name: string, value: string, maxAge = 3600, secure = false) {
  const securePart = secure ? '; Secure' : '';
  return `${name}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${securePart}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || '').trim();
    const password = String(body.password || '');

    if (!email || !password) return NextResponse.json({ error: 'Email/password required' }, { status: 400 });

    const supabase = supabaseServerAdmin();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.session) {
      return NextResponse.json({ error: error?.message ?? 'Invalid credentials' }, { status: 401 });
    }

    const accessToken = data.session.access_token!;
    const expiresIn = data.session.expires_in ?? 3600;
    const res = NextResponse.json({
      user: { id: data.user?.id, email: data.user?.email }
    }, { status: 200 });

    const cookie = makeSetCookieHeader('sb_access_token', accessToken, expiresIn, process.env.NODE_ENV === 'production');
    res.headers.set('Set-Cookie', cookie);
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
