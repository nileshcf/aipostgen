import { NextResponse } from 'next/server';
import { supabaseServerAdmin } from '@/lib/supabase-server';

export async function GET(req: Request) {
  try {
    console.log("[Auth/Me] Incoming request");

    // Extract token from cookie or Authorization header
    const cookieHeader = req.headers.get("cookie") || "";
    console.log("[Auth/Me] Cookie header:", cookieHeader);

    const match = cookieHeader.match(/sb-access-token=([^;]+)/);
    const token =
      match?.[1] ??
      req.headers.get("authorization")?.replace("Bearer ", "") ??
      null;

    if (!token) {
      console.warn("[Auth/Me] No token found in cookies or headers");
      return NextResponse.json({ user: null }, { status: 401 });
    }

    console.log("[Auth/Me] Token found, verifying...");
    const supabase = supabaseServerAdmin();
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error("[Auth/Me] Supabase getUser error:", error.message);
      return NextResponse.json({ user: null, error: error.message }, { status: 401 });
    }

    if (!data?.user) {
      console.warn("[Auth/Me] No user found for provided token");
      return NextResponse.json({ user: null }, { status: 401 });
    }

    console.log("[Auth/Me] User verified successfully:", data.user.id);
    return NextResponse.json({ user: data.user }, { status: 200 });
  } catch (err: any) {
    console.error("[Auth/Me] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
