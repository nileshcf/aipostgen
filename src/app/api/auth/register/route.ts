import { NextResponse } from 'next/server';
import { supabaseServerAdmin } from '@/lib/supabase-server';

export async function POST(req: Request) {
  try {
    console.log("[Auth/Register] Incoming request");

    const body = await req.json();
    console.log("[Auth/Register] Request body:", body);

    const { email, password } = body;
    if (!email || !password) {
      console.warn("[Auth/Register] Missing email or password");
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    console.log("[Auth/Register] Creating Supabase admin client");
    const supabase = supabaseServerAdmin();

    console.log("[Auth/Register] Signing up user:", email);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("[Auth/Register] Supabase signUp error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("[Auth/Register] User created successfully:", data.user?.id);
    return NextResponse.json({ user: data.user });
  } catch (err: any) {
    console.error("[Auth/Register] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
