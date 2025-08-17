import { NextResponse } from 'next/server';
import { supabaseClient } from '@/lib/supabase-client'; // uses anon key

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(
    { user: data.user, session: data.session },
    { status: 200 }
  );
}
