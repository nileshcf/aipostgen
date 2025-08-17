import { NextResponse } from 'next/server';
import { supabaseServerAdmin } from '@/lib/supabase-server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || '').trim();
    const password = String(body.password || '');

    if (!email || !password || password.length < 8) {
      return NextResponse.json({ error: 'Invalid email/password (password >= 8 chars)' }, { status: 400 });
    }

    const supabase = supabaseServerAdmin();
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ user: { id: data.user?.id, email: data.user?.email } }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
