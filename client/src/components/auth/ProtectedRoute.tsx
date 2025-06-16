"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const PUBLIC_ROUTES = [
  /^\/campaign\/applicants\/[^/]+$/, // Regex for /campaign/applicants/[id]
  /^\/signin$/, // Signin page
  /^\/signup$/, // Signup page
  
  // Add more public route patterns here if needed
];

function isPublicRoute(path: string) {
  return PUBLIC_ROUTES.some((regex) => regex.test(path));
}

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");


  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If the route is public, skip auth check
    if (isPublicRoute(pathname)) {
      setLoading(false);
      return;
    }

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
  }, [router, pathname]);

  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
} 