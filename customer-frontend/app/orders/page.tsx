"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ClipboardList } from "lucide-react";

export default function OrdersPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="bg-[#f5cb58] px-6 py-8">
        <h1 className="text-[#f8f8f8] font-bold text-[28px] text-center">
          My Orders
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center py-20 px-6">
        <ClipboardList className="w-20 h-20 text-[#e95322] mb-6" />
        <h2 className="text-[#391713] text-xl font-semibold mb-2">
          No Orders Yet
        </h2>
        <p className="text-[#252525] text-center mb-8">
          Start ordering delicious food from our menu!
        </p>
        <button
          onClick={() => router.push("/menu")}
          className="bg-[#e95322] hover:bg-[#d4441a] text-white font-medium text-lg px-8 py-3 rounded-full transition-colors"
        >
          Browse Menu
        </button>
      </div>
    </div>
  );
}
