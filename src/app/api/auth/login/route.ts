import { NextResponse } from 'next/server';
import { supabaseClient } from '@/lib/supabase-client'; // uses anon key

export async function POST(req: Request) {
  try {
    console.log("[Auth/Login] Incoming request");

    const body = await req.json();
    console.log("[Auth/Login] Request body:", body);

    const { email, password } = body;

    if (!email || !password) {
      console.warn("[Auth/Login] Missing email or password");
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    console.log("[Auth/Login] Attempting sign in for:", email);
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("[Auth/Login] Supabase signIn error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("[Auth/Login] User signed in successfully:", data.user?.id);

    // ✅ Create a response object
    const res = NextResponse.json(
      { user: data.user, session: data.session },
      { status: 200 }
    );

    // ✅ Set cookie with access token
    if (data.session) {
      res.cookies.set("sb-access-token", data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      res.cookies.set("sb-refresh-token", data.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    return res;
  } catch (err: any) {
    console.error("[Auth/Login] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
