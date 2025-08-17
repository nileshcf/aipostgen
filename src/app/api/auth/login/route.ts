import { NextResponse } from 'next/server';
import { supabaseClient } from '@/lib/supabase-client';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ user: data.user, session: data.session }, { status: 200 });
}
