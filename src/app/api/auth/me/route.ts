import { NextResponse } from 'next/server';
import { supabaseClient } from '@/lib/supabase-client';

export async function GET() {
  const { data, error } = await supabaseClient.auth.getUser();

  if (error || !data.user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: data.user }, { status: 200 });
}
