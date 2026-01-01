"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/lib/context";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToken, isAuthenticated } = useApp();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      setToken(token);
      // Redirect to login page with token
      router.replace(`/login?token=${token}`);
    } else {
      // Check if we have a stored token
      const storedToken = sessionStorage.getItem("smart_restaurant_qr_token");
      if (storedToken) {
        if (isAuthenticated) {
          router.replace(`/menu?token=${storedToken}`);
        } else {
          router.replace(`/login?token=${storedToken}`);
        }
      } else {
        // No token available, show error page
        router.replace("/login");
      }
    }
  }, [searchParams, router, setToken, isAuthenticated]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#fa4a0c] border-t-transparent rounded-full spinner mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#fa4a0c] border-t-transparent rounded-full spinner mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
