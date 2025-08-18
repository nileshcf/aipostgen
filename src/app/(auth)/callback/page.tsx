"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase-client";

export default function CallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Confirming your email...");

  useEffect(() => {
    const confirmUser = async () => {
      // This pulls the session from the fragment (#access_token) in the URL
      const { data, error } = await supabaseClient.auth.getSession();

      if (error) {
        console.error("Email confirmation error:", error);
        setStatus("❌ Error confirming email. Try logging in.");
        return;
      }

      if (data?.session) {
        setStatus("✅ Email confirmed! Redirecting to dashboard...");
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        setStatus("✅ Email confirmed! Please login.");
        setTimeout(() => router.push("/login"), 1500);
      }
    };

    confirmUser();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg font-medium">{status}</p>
    </div>
  );
}
