import { NextResponse } from 'next/server';
import { supabaseServerAdmin } from '@/lib/supabase-server';

export async function GET(req: Request) {
  // Extract token from cookie or Authorization header
  const cookieHeader = req.headers.get('cookie') || '';
  const match = cookieHeader.match(/sb-access-token=([^;]+)/);
  const token =
    match?.[1] ?? req.headers.get('authorization')?.replace('Bearer ', '') ?? null;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const supabase = supabaseServerAdmin();
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: data.user }, { status: 200 });
}
