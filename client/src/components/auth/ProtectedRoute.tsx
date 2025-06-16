"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");


  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/signin");
      }
      if (session && session.user) {
        const email = session.user.email ?? null;
        const displayName = session.user.user_metadata?.full_name ?? null;
        localStorage.setItem(
          "user",
          JSON.stringify({ email, displayName })
        );
      }
      setLoading(false);
    });
  }, [router]);

  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
} 