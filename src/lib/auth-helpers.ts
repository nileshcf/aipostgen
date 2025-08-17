import { NextResponse } from 'next/server';
import { supabaseServerAdmin } from './supabase-server';

export async function getUserFromRequest(req: Request) {
  // Try cookie
  const cookieHeader = req.headers.get('cookie') || '';
  const match = cookieHeader.match(/sb_access_token=([^;]+)/);
  const token = match?.[1] ?? (req.headers.get('authorization')?.replace('Bearer ', '') ?? null);
  if (!token) return null;

  const supabase = supabaseServerAdmin();
  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) return null;
    return data.user;
  } catch (e) {
    return null;
  }
}
