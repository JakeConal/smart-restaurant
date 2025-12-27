"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CustomerHome() {
  const router = useRouter();

  useEffect(() => {
    // For now, redirect to a placeholder
    // Later this can be the guest menu
    router.push("/customer/menu");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700 mx-auto mb-4"></div>
        <p className="text-gray-500">Loading customer menu...</p>
      </div>
    </div>
  );
}
