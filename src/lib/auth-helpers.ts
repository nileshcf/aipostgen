import { createClient } from '@supabase/supabase-js';

export async function getUserFromRequest(req: Request) {
  // Check cookies first
  const cookieHeader = req.headers.get('cookie') || '';
  const match = cookieHeader.match(/sb-access-token=([^;]+)/);

  // Fallback to Authorization header
  const token = match?.[1] ?? req.headers.get('authorization')?.replace('Bearer ', '') ?? null;

  if (!token) return null;

  // Create a client scoped to this user's token
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${token}` } },
    }
  );

  try {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) return null;
    return data.user;
  } catch {
    return null;
  }
}
