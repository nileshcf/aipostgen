import { NextResponse } from 'next/server';
import { supabaseServerAdmin } from '@/lib/supabase-server';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const supabase = supabaseServerAdmin();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ user: data.user, session: data.session });
}
