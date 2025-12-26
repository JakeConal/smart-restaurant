"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect based on auth status
    if (authApi.isAuthenticated()) {
      router.push("/tables");
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700 mx-auto mb-4"></div>
        <p className="text-gray-500">Redirecting...</p>
      </div>
    </div>
  );
}
